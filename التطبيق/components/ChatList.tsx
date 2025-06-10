
import React from 'react';
import type { Chat } from '../types';
import { ChatItem } from './ChatItem';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onSelectChat }) => {
  if (chats.length === 0) {
    return <div className="p-4 text-center text-text-muted-light dark:text-text-muted-dark">No chats yet.</div>;
  }

  return (
    <div className="py-2">
      {chats.map(chat => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isSelected={selectedChat?.id === chat.id}
          onSelect={() => onSelectChat(chat)}
        />
      ))}
    </div>
  );
};
