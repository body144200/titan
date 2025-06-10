import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainArea } from './components/MainArea';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { EditProfileModal } from './components/EditProfileModal';
import { ViewProfileModal } from './components/ViewProfileModal';
import { AppSettingsPage } from './components/AppSettingsPage'; // New
import { AdminDashboardPage } from './components/AdminDashboardPage'; // New
import type { Chat, User, Message } from './types';
import { AppView } from './types';
import { useTheme } from './contexts/ThemeContext';
import { MenuIcon, CloseIcon, AppLogoIcon, ShieldExclamationIcon } from './components/icons/EditorIcons';
import * as Storage from './localStorageService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [viewingProfileUser, setViewingProfileUser] = useState<User | null>(null);


  useEffect(() => {
    Storage.initializeDB(); // Ensures DB is set up, admin exists etc.
    const userId = Storage.getCurrentUserId();
    if (userId) {
      const user = Storage.findUserById(userId);
      if (user) {
        handleLoginSuccess(user); // This will also handle admin redirection
      } else { // User ID exists but user not found (e.g., deleted in another session)
        Storage.setCurrentUserId(null);
        setCurrentView(AppView.LOGIN);
      }
    } else {
      setCurrentView(AppView.LOGIN);
    }
  }, []);
  
  const loadUserData = useCallback(() => {
    if (!currentUser) return;
    const userChats = Storage.getChats()
      .filter(chat => chat.participants.includes(currentUser.id))
      .map(chat => {
        if (chat.type === 'individual') {
          const partnerId = chat.participants.find(pId => pId !== currentUser.id);
          const partner = partnerId ? Storage.findUserById(partnerId) : null;
          return {
            ...chat,
            name: partner?.nickname || partner?.name || chat.name || 'Chat User',
            avatarUrl: partner?.avatarUrl,
            avatarBgColor: partner?.avatarBgColor, // Add this
            participantDetails: {
              ...(partner && partnerId && { [partnerId]: { name: partner.name, nickname: partner.nickname, avatarUrl: partner.avatarUrl, avatarBgColor: partner.avatarBgColor } }),
              ...(currentUser && { [currentUser.id]: { name: currentUser.name, nickname: currentUser.nickname, avatarUrl: currentUser.avatarUrl, avatarBgColor: currentUser.avatarBgColor } }),
            }
          };
        }
        return chat; // For group chats, name/avatar are on the chat object itself
      })
      .sort((a,b) => new Date(b.lastMessageTimestamp || 0).getTime() - new Date(a.lastMessageTimestamp || 0).getTime());
    setChats(userChats);
    setMessages(Storage.getMessages());
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && (currentView === AppView.CHAT || currentView === AppView.SETTINGS || currentView === AppView.ADMIN_DASHBOARD)) {
      loadUserData();
    }
  }, [currentUser, currentView, loadUserData]);

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = `bg-background-page-light dark:bg-background-page-dark text-text-light dark:text-text-dark transition-colors duration-300`;
  }, [theme]);

  const handleLoginSuccess = (loggedInUser: User) => {
    setCurrentUser(loggedInUser);
    Storage.setCurrentUserId(loggedInUser.id);
    if (loggedInUser.isAdmin) {
      setCurrentView(AppView.ADMIN_DASHBOARD);
    } else {
      setCurrentView(AppView.CHAT);
    }
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    Storage.setCurrentUserId(null);
    setChats([]);
    setMessages({});
    setSelectedChat(null);
    setCurrentView(AppView.LOGIN);
    setIsEditProfileModalOpen(false);
    setViewingProfileUser(null);
    setIsMobileSidebarOpen(false);
  };

  const handleRegistrationSuccess = () => {
    setCurrentView(AppView.LOGIN);
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    if(currentView !== AppView.ADMIN_DASHBOARD && currentView !== AppView.SETTINGS){
        setCurrentView(AppView.CHAT);
    }
    setIsMobileSidebarOpen(false);
  };

  const handleSendMessage = (chatId: string, content: string) => {
    if (!currentUser) return;
    const newMessageData: Omit<Message, 'id'> = {
      chatId: chatId,
      senderId: currentUser.id,
      content: content,
      timestamp: new Date().toISOString(),
      type: 'text',
    };
    const newMessage = Storage.addMessage(chatId, newMessageData);
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));
    loadUserData(); 
    setTimeout(() => {
      const chatView = document.querySelector('.overflow-y-auto.bg-background-chat-light'); 
      if (chatView) chatView.scrollTop = chatView.scrollHeight;
    }, 100);
  };
  
  const handleStartNewChat = (targetUser: User) => {
    if (!currentUser) return;
    const newChat = Storage.createOrGetIndividualChat(currentUser.id, targetUser.id);
    if (newChat) {
      loadUserData(); 
      const partner = Storage.findUserById(targetUser.id);
      const displayChat = {
        ...newChat,
        name: partner?.nickname || partner?.name || newChat.name,
        avatarUrl: partner?.avatarUrl,
        avatarBgColor: partner?.avatarBgColor,
      };
      setSelectedChat(displayChat);
      setCurrentView(AppView.CHAT); // Switch to chat view
      setIsMobileSidebarOpen(false);
    }
  };

  const handleProfileUpdate = (updatedProfileData: Partial<Omit<User, 'id' | 'email' | 'isAdmin'>>) => {
    if (!currentUser) return;
    try {
      const updatedUser = Storage.updateUser(currentUser.id, updatedProfileData);
      if (updatedUser) {
        setCurrentUser(updatedUser);
        loadUserData(); 
        if (selectedChat && selectedChat.participants.includes(currentUser.id)) {
            const partnerId = selectedChat.participants.find(pId => pId !== currentUser.id);
            const partner = partnerId ? Storage.findUserById(partnerId) : null;
            setSelectedChat(prev => prev ? ({
                ...prev,
                name: selectedChat.type === 'individual' && partner ? (partner.nickname || partner.name) : updatedUser.nickname || updatedUser.name,
                avatarUrl: selectedChat.type === 'individual' && partner ? partner.avatarUrl : updatedUser.avatarUrl,
                avatarBgColor: selectedChat.type === 'individual' && partner ? partner.avatarBgColor : updatedUser.avatarBgColor,
                participantDetails: {
                  ...(partner && partnerId && { [partnerId]: { name: partner.name, nickname: partner.nickname, avatarUrl: partner.avatarUrl, avatarBgColor: partner.avatarBgColor } }),
                  [updatedUser.id]: { name: updatedUser.name, nickname: updatedUser.nickname, avatarUrl: updatedUser.avatarUrl, avatarBgColor: updatedUser.avatarBgColor },
                }
            }) : null);
        }
        setIsEditProfileModalOpen(false);
        alert("Profile updated successfully!");
      }
    } catch (error: any) {
      alert(`Profile update failed: ${error.message}`);
    }
  };
  
  const openViewProfileModal = (userToView: User) => {
      setViewingProfileUser(userToView);
  };

  const handleDeleteCurrentUser = () => {
    if (!currentUser) return;
    if (currentUser.isAdmin) {
        alert("Admin accounts cannot be deleted this way for safety. Please manage through other means or demote first.");
        return;
    }
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      const success = Storage.deleteUser(currentUser.id);
      if (success) {
        alert("Account deleted successfully.");
        handleLogout(); // This will set currentView to LOGIN
      } else {
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  const handleAdminDeleteUser = (userIdToDelete: string) => {
    if (!currentUser || !currentUser.isAdmin) {
      alert("Unauthorized action.");
      return;
    }
    if (currentUser.id === userIdToDelete) {
      alert("Admin cannot delete themselves from this panel.");
      return;
    }
    const userToDelete = Storage.findUserById(userIdToDelete);
    if (!userToDelete) {
        alert("User not found.");
        return;
    }
    if (window.confirm(`Are you sure you want to delete user: ${userToDelete.nickname || userToDelete.name}? This action cannot be undone.`)) {
        try {
            Storage.adminDeleteUser(currentUser.id, userIdToDelete);
            alert(`User ${userToDelete.nickname || userToDelete.name} deleted successfully.`);
            loadUserData(); // Refresh admin's chat list if they had chats with deleted user
            // If admin was chatting with the deleted user, clear selectedChat
            if(selectedChat && selectedChat.participants.includes(userIdToDelete)) {
                setSelectedChat(null);
            }
            // The AdminDashboardPage will re-fetch users, so its list will update.
        } catch (error: any) {
            alert(`Failed to delete user: ${error.message}`);
        }
    }
  };

  const switchView = (view: AppView) => {
      setSelectedChat(null); // Clear selected chat when switching main views generally
      setCurrentView(view);
  }


  if (currentView === AppView.LOGIN) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchView={switchView} />;
  }

  if (currentView === AppView.REGISTER) {
    return <RegistrationPage onRegistrationSuccess={handleRegistrationSuccess} onSwitchView={switchView} />;
  }

  if (!currentUser) { // Should be caught by initial useEffect, but as a fallback
     setCurrentView(AppView.LOGIN); // redirect to login
     return <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchView={switchView} />; // Render login, don't return null
  }
  
  // Main App Layout for CHAT, SETTINGS, ADMIN_DASHBOARD
  return (
    <>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
        <div className="md:hidden p-2 bg-background-sidebarNav-light dark:bg-background-sidebarNav-dark shadow-md flex items-center space-x-2 border-b border-border-light dark:border-border-dark">
          <button 
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
              className="text-icon-light dark:text-icon-dark p-1.5 rounded hover:bg-background-hover-light dark:hover:bg-background-hover-dark"
              aria-label={isMobileSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isMobileSidebarOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
          <span className="font-semibold text-lg text-text-light dark:text-text-dark truncate">
              {currentView === AppView.CHAT && selectedChat && !isMobileSidebarOpen ? selectedChat.name : 
               currentView === AppView.SETTINGS ? "Settings" :
               currentView === AppView.ADMIN_DASHBOARD ? "Admin Dashboard" :
               "TitanChat"}
          </span>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className={`
            ${isMobileSidebarOpen ? 'block' : 'hidden'} md:flex
            fixed md:static inset-0 z-20 md:z-auto
            h-full
            md:w-[360px] xl:w-[400px]
            flex-shrink-0
            transition-transform duration-300 ease-in-out transform md:transform-none
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <Sidebar
              currentUser={currentUser}
              chats={chats}
              selectedChat={selectedChat}
              onSelectChat={handleSelectChat}
              onClose={() => setIsMobileSidebarOpen(false)} 
              onStartNewChat={handleStartNewChat}
              onLogout={handleLogout}
              onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
              onSwitchView={switchView}
              currentAppView={currentView}
            />
          </div>
          
          <div className={`flex-1 flex flex-col bg-background-chat-light dark:bg-background-chat-dark overflow-hidden ${isMobileSidebarOpen && (currentView === AppView.CHAT && selectedChat) ? 'hidden' : 'flex'} md:flex`}>
            {currentView === AppView.CHAT && selectedChat && (
              <MainArea
                key={selectedChat.id} 
                chat={selectedChat}
                currentUser={currentUser}
                messages={messages[selectedChat.id] || []}
                onSendMessage={handleSendMessage}
                onViewProfile={openViewProfileModal}
              />
            )}
            {currentView === AppView.CHAT && !selectedChat && (
              <div className={`flex-1 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark ${isMobileSidebarOpen ? 'hidden md:flex' : 'flex'}`}>
                <div className="text-center p-4">
                  <AppLogoIcon className="w-20 h-20 mx-auto mb-4 opacity-50 text-primary dark:text-primary" />
                  <h2 className="text-xl font-light">TitanChat Web</h2>
                  <p className="mt-2 text-sm">Select a chat to start messaging, or search for users to begin a new conversation.</p>
                </div>
              </div>
            )}
            {currentView === AppView.SETTINGS && (
              <AppSettingsPage 
                currentUser={currentUser} 
                onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
                onDeleteAccount={handleDeleteCurrentUser}
              />
            )}
            {currentView === AppView.ADMIN_DASHBOARD && currentUser.isAdmin && (
                <AdminDashboardPage 
                    currentUser={currentUser} 
                    onAdminDeleteUser={handleAdminDeleteUser}
                    onViewUserProfile={openViewProfileModal}
                />
            )}
             {currentView === AppView.ADMIN_DASHBOARD && !currentUser.isAdmin && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-red-50 dark:bg-red-900/20">
                    <ShieldExclamationIcon className="w-16 h-16 text-red-500 dark:text-red-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300">Access Denied</h2>
                    <p className="text-red-600 dark:text-red-400 mt-2">You do not have permission to view this page.</p>
                    <button 
                        onClick={() => switchView(AppView.CHAT)}
                        className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-accent-hover"
                    >
                        Go to Chats
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
      {isEditProfileModalOpen && currentUser && (
        <EditProfileModal
          currentUser={currentUser}
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
      {viewingProfileUser && (
        <ViewProfileModal
            user={viewingProfileUser}
            isOpen={!!viewingProfileUser}
            onClose={() => setViewingProfileUser(null)}
        />
      )}
    </>
  );
};

export default App;