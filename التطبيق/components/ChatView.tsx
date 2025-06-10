
import React, { useEffect, useRef } from 'react';
import type { Message, User, ChatType } from '../types';
import { MessageItem } from './MessageItem';

interface ChatViewProps {
  messages: Message[];
  currentUser: User;
  chatType: ChatType; // Added to pass to MessageItem
}

export const ChatView: React.FC<ChatViewProps> = ({ messages, currentUser, chatType }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("auto"); 
  }, [currentUser, messages.length > 0 ? messages[0]?.chatId : null]); 

  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => scrollToBottom("smooth"), 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return (
    <div 
        className="flex-1 px-4 md:px-8 lg:px-12 pt-4 pb-2 space-y-1 overflow-y-auto bg-background-chat-light dark:bg-background-chat-dark"
    >
      {messages.map(msg => (
        <MessageItem key={msg.id} message={msg} isCurrentUser={msg.senderId === currentUser.id} chatType={chatType} />
      ))}
      {messages.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-text-secondary-light dark:text-text-secondary-dark p-4 rounded-lg bg-background-sidebar-light dark:bg-background-sidebar-dark text-sm">
            This is the beginning of your conversation.
          </p>
        </div>
      )}
      <div ref={messagesEndRef} style={{ height: '1px' }} />
    </div>
  );
};
