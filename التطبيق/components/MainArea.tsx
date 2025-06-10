import React, { useState, useEffect } from 'react';
import type { Chat, User, Message } from '../types';
import { ChatView } from './ChatView';
import { MessageInput } from './MessageInput';
import { 
    UsersIcon, 
    MegaphoneIcon, 
    UserCircleIcon,
    PhoneFilledIcon,      // Added
    VideoCameraIcon,      // Added
    InformationCircleIcon // Added
} from './icons/EditorIcons';
import * as Storage from '../localStorageService';

interface MainAreaProps {
  chat: Chat;
  currentUser: User;
  messages: Message[];
  onSendMessage: (chatId: string, content: string) => void;
  onViewProfile: (user: User) => void; // Callback to open view profile modal
}

const getInitials = (name: string | undefined, nickname?: string | undefined, count = 1): string => {
  const nameToUse = nickname || name;
  if (!nameToUse) return '?';
  const words = nameToUse.trim().split(' ');
  if (words.length === 0 || !words[0]) return '??';
  if (count === 1) return words[0][0].toUpperCase();
  if (words.length > 1 && words[1]) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return nameToUse.substring(0, count).toUpperCase();
};

export const MainArea: React.FC<MainAreaProps> = ({ chat, currentUser, messages, onSendMessage, onViewProfile }) => {
  const [headerAvatarError, setHeaderAvatarError] = useState(false);
  const [profileAvatarError, setProfileAvatarError] = useState(false);
  const [chatPartner, setChatPartner] = useState<User | null>(null);

  useEffect(() => {
    if (chat.type === 'individual') {
      const partnerId = chat.participants.find(pId => pId !== currentUser.id);
      if (partnerId) {
        const partner = Storage.findUserById(partnerId); // Get fresh partner data
        setChatPartner(partner || null);
      } else {
        setChatPartner(null);
      }
    } else {
      setChatPartner(null);
    }
     setHeaderAvatarError(false); // Reset error on chat change
     setProfileAvatarError(false);
  }, [chat, currentUser.id]);
  
  const chatDisplayName = chatPartner?.nickname || chatPartner?.name || chat.name; 
  const effectiveChatDisplayAvatar = chatPartner?.avatarUrl || chat.avatarUrl;
  
  const profileViewData = {
    name: chatPartner?.name || chat.name,
    nickname: chatPartner?.nickname,
    avatar: chatPartner?.avatarUrl || chat.avatarUrl || `https://picsum.photos/seed/${chat.id}/200/200`, // Fallback, though picsum is removed elsewhere
    subtitle: chat.type === 'group' ? `${chat.participants.length} members` : (chatPartner?.status ? `Status: ${chatPartner.status}` : "Active"),
    description: chatPartner?.bio || (chat.type === 'individual' ? `This is ${chatPartner?.nickname || chatPartner?.name}. Say hi!` : "Welcome to the group!"),
    category: chat.type === 'individual' && chatPartner?.name.includes("Store") ? "Store" : undefined,
  };
  
  const effectiveProfileViewAvatar = profileViewData.avatar && !profileViewData.avatar.startsWith('https://picsum.photos/seed/undefined') && !profileViewData.avatar.includes('picsum.photos')
                                     ? profileViewData.avatar 
                                     : `https://ui-avatars.com/api/?name=${encodeURIComponent(profileViewData.nickname || profileViewData.name)}&background=${chatPartner?.avatarBgColor?.substring(1) || 'random'}&color=fff&size=96`;


  const headerSubtitleText = chat.type === 'group' ? `${chat.participants.length} members` :
                         chatPartner?.status ? chatPartner.status : 
                         (chatPartner?.nickname ? `@${chatPartner.nickname}` : 'Online');

  const handleViewProfileClick = () => {
    if (chatPartner) {
        onViewProfile(chatPartner);
    } else if (chat.type === 'group' || chat.type === 'channel') {
        // Potentially view group/channel info modal in future
        // For now, if no chatPartner, and it's a group, maybe we can pass the chat object itself
        // to a modal that can display group info.
        // For simplicity, we can make the info icon do nothing or be disabled if not an individual chat with a partner.
        console.log("View group/channel info for:", chat.name);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-chat-light dark:bg-background-chat-dark">
      <div className="p-3 h-[60px] flex items-center justify-between bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark shadow-sm">
        <div className="flex items-center overflow-hidden">
          {effectiveChatDisplayAvatar && !headerAvatarError ? (
            <img 
              src={effectiveChatDisplayAvatar} 
              alt={chatDisplayName} 
              className="w-10 h-10 rounded-full mr-3 object-cover flex-shrink-0"
              onError={() => setHeaderAvatarError(true)}
            />
          ) : (
            <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 text-lg font-semibold"
                style={{ backgroundColor: chatPartner?.avatarBgColor || chat.avatarBgColor || '#AAAAAA' }}
            >
              {chat.type === 'group' && <UsersIcon className="w-6 h-6" />}
              {chat.type === 'channel' && <MegaphoneIcon className="w-6 h-6" />}
              {chat.type === 'individual' && getInitials(chatDisplayName, chatPartner?.nickname, 1)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-md font-semibold text-text-light dark:text-text-dark truncate">
                {chatDisplayName}
            </h2>
            {headerSubtitleText && <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate capitalize">{headerSubtitleText}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
            <button 
                title="Call"
                className="p-2 text-icon-light dark:text-icon-dark hover:bg-background-hover-light dark:hover:bg-background-hover-dark rounded-full"
                onClick={() => alert('Voice call feature coming soon!')}
            >
                <PhoneFilledIcon className="w-5 h-5 text-primary dark:text-accent-DEFAULT"/>
            </button>
            <button 
                title="Video Call"
                className="p-2 text-icon-light dark:text-icon-dark hover:bg-background-hover-light dark:hover:bg-background-hover-dark rounded-full"
                onClick={() => alert('Video call feature coming soon!')}
            >
                <VideoCameraIcon className="w-5 h-5 text-primary dark:text-accent-DEFAULT"/>
            </button>
            <button 
                title="View Info"
                onClick={handleViewProfileClick}
                disabled={chat.type === 'individual' && !chatPartner} // Disable if no partner to view
                className="p-2 text-icon-light dark:text-icon-dark hover:bg-background-hover-light dark:hover:bg-background-hover-dark rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <InformationCircleIcon className="w-5 h-5 text-primary dark:text-accent-DEFAULT"/>
            </button>
        </div>
      </div>

      {messages.length === 0 && chat.type === 'individual' && chatPartner ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-background-chat-light dark:bg-background-chat-dark">
          {profileViewData.avatar && !profileAvatarError && !profileViewData.avatar.includes('picsum.photos') ? (
            <img 
              src={profileViewData.avatar}
              alt={profileViewData.name} 
              className="w-24 h-24 rounded-full mb-4 object-cover"
              onError={() => setProfileAvatarError(true)}
            />
          ) : (
             <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-semibold text-white mb-3"
                style={{ backgroundColor: chatPartner?.avatarBgColor || '#AAAAAA' }}
             >
                {getInitials(profileViewData.name, profileViewData.nickname, 2)}
            </div>
          )}
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
            {profileViewData.name} {profileViewData.nickname && profileViewData.name !== profileViewData.nickname ? `(@${profileViewData.nickname})` : ''}
          </h2>
          {profileViewData.category && <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">{profileViewData.category}</p>}
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2 max-w-md whitespace-pre-wrap">
            {profileViewData.description || "No bio available."}
          </p>
           <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-8">
            No messages yet. Send a message to start the conversation.
          </p>
        </div>
      ) : (
        <ChatView messages={messages} currentUser={currentUser} chatType={chat.type} />
      )}

      <MessageInput 
        chatId={chat.id} 
        onSendMessage={onSendMessage}
        disabled={chat.type === 'channel' && chat.owner !== currentUser.id}
      />
    </div>
  );
};