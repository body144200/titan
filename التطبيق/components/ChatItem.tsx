import React, { useState, useEffect } from 'react';
import type { Chat, User } from '../types'; 
import * as Storage from '../localStorageService'; 

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
}

const getInitials = (name?: string, nickname?: string): string => {
  const nameToUse = nickname || name;
  if (!nameToUse || nameToUse.trim() === '') return '?';
  const words = nameToUse.trim().split(' ').filter(w => w);
  if (words.length === 0 || !words[0]) return '??';
  if (words.length > 1 && words[1]) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return nameToUse.substring(0, 2).toUpperCase();
};

export const ChatItem: React.FC<ChatItemProps> = ({ chat, isSelected, onSelect }) => {
  const [avatarError, setAvatarError] = useState(false);
  const [partner, setPartner] = useState<User | null>(null);

  useEffect(() => {
    setAvatarError(false); // Reset error when chat changes
    if (chat.type === 'individual') {
      const currentUserId = Storage.getCurrentUserId();
      const partnerId = chat.participants.find(pId => pId !== currentUserId);
      if (partnerId) {
        const foundPartner = Storage.findUserById(partnerId);
        setPartner(foundPartner || null);
      }
    } else {
      setPartner(null); // Not an individual chat
    }
  }, [chat]);
  
  // App.tsx now pre-populates chat.name and chat.avatarUrl for individual chats based on partner
  const displayName = chat.name;
  const displayAvatarUrl = chat.avatarUrl;
  const partnerNickname = partner?.nickname; // Get fresh nickname

  const truncate = (str: string | undefined, num: number) => {
    if (!str) return '';
    return str.length > num ? str.slice(0, num) + "..." : str;
  };

  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()) {
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.getFullYear() === yesterday.getFullYear() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getDate() === yesterday.getDate()) {
      return 'Yesterday';
    }
    
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  const effectiveAvatarUrl = displayAvatarUrl && displayAvatarUrl.trim() !== '' ? displayAvatarUrl : null;

  return (
    <div
      className={`
        flex items-center p-2.5 mx-2 my-0.5 rounded-lg cursor-pointer transition-colors duration-150
        hover:bg-gray-200 dark:hover:bg-gray-700
        ${isSelected ? 'bg-background-selected-light dark:bg-background-selected-dark' : ''}
      `}
      onClick={onSelect}
      role="button"
      aria-selected={isSelected}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className="relative mr-3 flex-shrink-0">
        {effectiveAvatarUrl && !avatarError ? (
          <img 
            src={effectiveAvatarUrl} 
            alt={displayName} 
            className="w-12 h-12 rounded-full object-cover"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-semibold text-text-light dark:text-text-dark">
            {getInitials(displayName, partnerNickname)}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate text-text-light dark:text-text-dark text-sm">
            {displayName} {partnerNickname && displayName !== partnerNickname && chat.type === 'individual' ? `(@${partnerNickname})` : ''}
          </h3>
          <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0 ml-2">
            {formatTimestamp(chat.lastMessageTimestamp)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
            {truncate(chat.lastMessage, 30)}
          </p>
          {chat.unreadCount && chat.unreadCount > 0 && (
            <span className="ml-2 w-2.5 h-2.5 bg-accent-DEFAULT rounded-full flex-shrink-0">
            </span>
          )}
        </div>
      </div>
    </div>
  );
};