import React, { useState, useEffect, useCallback } from 'react';
import { type User, type Chat, AppView } from '../types'; // Modified AppView import
import { ChatList } from './ChatList';
import { 
  SearchIcon, 
  CreateNewMessageIcon,
  ChatBubbleOvalLeftEllipsisSolidIcon, 
  UsersGroupSolidIcon,                 
  Cog6ToothFilledIcon, // Confirmed this is used for Settings
  ArrowLeftOnRectangleIcon,
  ShieldCheckIcon 
} from './icons/EditorIcons';
import * as Storage from '../localStorageService';

interface SidebarProps {
  currentUser: User;
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onClose: () => void; 
  onStartNewChat: (targetUser: User) => void;
  onLogout: () => void;
  onOpenEditProfile: () => void; // For opening EditProfileModal from avatar
  onSwitchView: (view: AppView) => void; 
  currentAppView: AppView; 
}

interface NavItemProps {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  hasNotification?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ title, icon, isActive, onClick, hasNotification }) => (
  <button
    title={title}
    onClick={onClick}
    className={`
      p-3 w-full flex justify-center items-center rounded-lg relative group
      transition-colors duration-150
      ${isActive 
        ? 'bg-accent-DEFAULT/20 dark:bg-accent-DEFAULT/30 text-icon-active' 
        : 'text-icon-light dark:text-icon-dark hover:bg-accent-DEFAULT/10 dark:hover:bg-accent-DEFAULT/20'}
    `}
    aria-label={title}
    aria-current={isActive ? "page" : undefined}
  >
    {icon}
    {hasNotification && (
      <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-background-sidebarNav-light dark:border-background-sidebarNav-dark group-hover:border-transparent transition-all"></span>
    )}
  </button>
);

const getInitials = (name: string | undefined, count = 1): string => {
  if (!name || name.trim() === '') return '?';
  const words = name.trim().split(' ').filter(w => w);
  if (words.length === 0 || !words[0]) return '??';
  if (count === 1) return words[0][0].toUpperCase();
  if (words.length > 1 && words[1]) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return name.substring(0, count).toUpperCase();
};


export const Sidebar: React.FC<SidebarProps> = ({ 
    currentUser, 
    chats, 
    selectedChat, 
    onSelectChat, 
    onClose, 
    onStartNewChat, 
    onLogout, 
    onOpenEditProfile,
    onSwitchView,      
    currentAppView     
}) => {
  const [activeTopNav, setActiveTopNav] = useState('chats'); 
  const [avatarErrorTop, setAvatarErrorTop] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userSearchResults, setUserSearchResults] = useState<User[]>([]);
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  
  const currentUserEffectiveAvatarUrl = currentUser.avatarUrl && currentUser.avatarUrl.trim() !== '' ? currentUser.avatarUrl : null;
  const currentUserAvatarBg = currentUser.avatarBgColor || '#AAAAAA'; // Fallback color

  const handleUserSearch = useCallback(() => {
    if (userSearchQuery.trim().length < 2) {
      setUserSearchResults([]);
      setIsSearchingUsers(false);
      return;
    }
    setIsSearchingUsers(true);
    const allUsers = Storage.getUsers();
    const results = allUsers.filter(user => 
      user.id !== currentUser.id && 
      (user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
       user.nickname.toLowerCase().includes(userSearchQuery.toLowerCase()))
    );
    setUserSearchResults(results);
  }, [userSearchQuery, currentUser.id]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (userSearchQuery.trim()) {
        handleUserSearch();
      } else {
        setUserSearchResults([]);
        setIsSearchingUsers(false);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [userSearchQuery, handleUserSearch]);

  const handleSelectUserToChat = (user: User) => {
    onStartNewChat(user);
    setUserSearchQuery('');
    setUserSearchResults([]);
    setIsSearchingUsers(false);
    setActiveTopNav('chats');
    if (currentAppView !== AppView.CHAT) {
        onSwitchView(AppView.CHAT);
    }
  };

  useEffect(() => {
    setAvatarErrorTop(false);
  }, [currentUser.avatarUrl, currentUser.id]);
  
  useEffect(() => {
    if (currentAppView !== AppView.CHAT && activeTopNav !== 'chats') {
      // This logic primarily ensures that if the user navigates away from the CHAT view 
      // (e.g., to SETTINGS or ADMIN_DASHBOARD) and then returns to CHAT view by clicking a chat,
      // the sidebar's internal panel correctly shows 'chats' (the chat list).
    } else if (currentAppView === AppView.CHAT && activeTopNav !== 'chats' && activeTopNav !== 'people') {
        // If we switch to AppView.CHAT, and the sidebar's panel is not on 'chats' or 'people', default it to 'chats'.
        setActiveTopNav('chats'); 
    }
  }, [currentAppView, activeTopNav]);


  return (
    <div className="h-full flex w-full">
      <div className="w-[72px] h-full bg-background-sidebarNav-light dark:bg-background-sidebarNav-dark flex flex-col items-center py-4 px-2 space-y-1 border-r border-border-light dark:border-border-dark flex-shrink-0">
        <button 
          title={currentUser.nickname || currentUser.name} 
          onClick={onOpenEditProfile} 
          className="mb-4 focus:outline-none focus:ring-2 focus:ring-accent-DEFAULT rounded-full"
        >
          {currentUserEffectiveAvatarUrl && !avatarErrorTop ? (
            <img 
              src={currentUserEffectiveAvatarUrl} 
              alt={`${currentUser.nickname || currentUser.name} avatar`}
              className="w-10 h-10 rounded-full object-cover"
              onError={() => setAvatarErrorTop(true)}
            />
          ) : (
            <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold text-text-white"
                style={{ backgroundColor: currentUserAvatarBg }}
            >
              {getInitials(currentUser.nickname || currentUser.name, 1)}
            </div>
          )}
        </button>

        <NavItem 
          title="Chats" 
          icon={<ChatBubbleOvalLeftEllipsisSolidIcon className="w-6 h-6" />} 
          isActive={currentAppView === AppView.CHAT && activeTopNav === 'chats'} 
          onClick={() => { setActiveTopNav('chats'); if (currentAppView !== AppView.CHAT) onSwitchView(AppView.CHAT); }}
          hasNotification={chats.some(c => (c.unreadCount || 0) > 0)}
        />
        <NavItem 
          title="People" 
          icon={<UsersGroupSolidIcon className="w-6 h-6" />} 
          isActive={currentAppView === AppView.CHAT && activeTopNav === 'people'}
          onClick={() => { setActiveTopNav('people'); if (currentAppView !== AppView.CHAT) onSwitchView(AppView.CHAT); }}
        />

        {currentUser.isAdmin && (
           <NavItem 
            title="Admin Dashboard" 
            icon={<ShieldCheckIcon className="w-6 h-6" />} 
            isActive={currentAppView === AppView.ADMIN_DASHBOARD}
            onClick={() => onSwitchView(AppView.ADMIN_DASHBOARD)}
          />
        )}
      
        <div className="flex-grow"></div>

        <NavItem 
            title="Settings" 
            icon={<Cog6ToothFilledIcon className="w-6 h-6" />} 
            isActive={currentAppView === AppView.SETTINGS}
            onClick={() => onSwitchView(AppView.SETTINGS)}
        />
        <NavItem title="Logout" icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />} onClick={onLogout} />
      </div>

      {/* Main Sidebar Content Area */}
      <div className="h-full flex flex-col flex-1 bg-background-sidebar-light dark:bg-background-sidebar-dark text-text-light dark:text-text-dark">
        <div className="p-4 h-[60px] flex items-center justify-between border-b border-border-light dark:border-border-dark">
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
            {activeTopNav === 'people' ? 'Find People' : 'Chats'}
          </h1>
           {activeTopNav === 'chats' && currentAppView === AppView.CHAT && (
            <button 
              title="New Message / Find User"
              onClick={() => setActiveTopNav('people')}
              className="p-2 rounded-full hover:bg-background-hover-light dark:hover:bg-background-hover-dark text-icon-light dark:text-icon-dark"
            >
              <CreateNewMessageIcon className="w-5 h-5" />
            </button>
           )}
        </div>

        <div className="p-2 border-b border-border-light dark:border-border-dark">
          <div className="relative">
            <input
              type="text"
              placeholder={activeTopNav === 'people' ? "Search users by name or nickname" : "Search chats (Ctrl+K)"}
              className="w-full p-2 pr-8 pl-3 rounded-lg bg-background-input-light dark:bg-background-input-dark border-none focus:outline-none focus:ring-1 focus:ring-accent-DEFAULT text-sm text-text-light dark:text-text-dark placeholder-text-placeholder-light dark:placeholder-text-placeholder-dark"
              value={activeTopNav === 'people' ? userSearchQuery : ''}
              onChange={(e) => activeTopNav === 'people' ? setUserSearchQuery(e.target.value) : {}}
              onFocus={() => { if (currentAppView !== AppView.CHAT) onSwitchView(AppView.CHAT); if(activeTopNav !== 'people') setActiveTopNav('people');}}
            />
            <SearchIcon className="w-4 h-4 absolute right-2.5 top-1/2 transform -translate-y-1/2 text-text-placeholder-light dark:text-text-placeholder-dark" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {activeTopNav === 'chats' && (
            <ChatList chats={chats} selectedChat={selectedChat} onSelectChat={onSelectChat} />
          )}
          {activeTopNav === 'people' && (
            <div className="p-2">
              {isSearchingUsers && userSearchResults.length === 0 && userSearchQuery.trim() && (
                <p className="text-center text-sm text-text-secondary-light dark:text-text-secondary-dark py-4">No users found matching "{userSearchQuery}".</p>
              )}
              {!isSearchingUsers && userSearchResults.length === 0 && !userSearchQuery.trim() && (
                 <p className="text-center text-sm text-text-secondary-light dark:text-text-secondary-dark py-4">Type to search for users.</p>
              )}
              {userSearchResults.map(user => (
                <div 
                  key={user.id} 
                  onClick={() => handleSelectUserToChat(user)}
                  className="flex items-center p-2.5 mx-2 my-0.5 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover mr-3"
                         onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null; // prevent infinite loop
                            target.style.display='none'; // Hide broken img
                            // Potentially show initials div instead, but that's more complex here
                            const initialsDiv = document.createElement('div');
                            initialsDiv.className = "w-10 h-10 rounded-full flex items-center justify-center text-md font-semibold text-text-white mr-3";
                            initialsDiv.style.backgroundColor = user.avatarBgColor || '#AAAAAA';
                            initialsDiv.innerText = getInitials(user.nickname || user.name, 1);
                            target.parentNode?.insertBefore(initialsDiv, target);

                         }}
                    />
                  ) : (
                    <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-md font-semibold text-text-white mr-3"
                        style={{backgroundColor: user.avatarBgColor || '#AAAAAA'}}
                    >
                      {getInitials(user.nickname || user.name, 1)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-sm text-text-light dark:text-text-dark">{user.name}</h3>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">@{user.nickname}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};