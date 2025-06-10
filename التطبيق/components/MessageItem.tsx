
import React from 'react';
import type { Message, ChatType } from '../types'; // Added ChatType
import { ArrowDownTrayIcon, PhotoIcon, DocumentTextIcon, PlayCircleIcon, LinkIcon, MapPinIcon } from './icons/EditorIcons';
import * as Storage from '../localStorageService'; // To get sender info

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
  chatType: ChatType; // Added to know if it's a group chat
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser, chatType }) => {
  const sender = Storage.findUserById(message.senderId); 

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="mt-1">
            <img src={message.content} alt={message.fileName || 'Image'} className="max-w-xs max-h-64 rounded-lg object-cover" />
            {message.fileName && <p className="text-xs opacity-80 mt-1">{message.fileName}</p>}
          </div>
        );
      case 'file':
        return (
          <a 
            href={message.fileUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-1 flex items-center p-2 bg-opacity-20 bg-black rounded-lg hover:bg-opacity-30"
          >
            <DocumentTextIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="font-medium text-sm truncate">{message.fileName || 'File Attachment'}</span>
            <ArrowDownTrayIcon className="w-4 h-4 ml-auto flex-shrink-0 opacity-70"/>
          </a>
        );
      case 'audio':
        return <div className="mt-1 flex items-center"><PlayCircleIcon className="w-5 h-5 mr-1"/> Audio: {message.fileName || 'Recording'}</div>;
      case 'link':
        return <div className="mt-1"><LinkIcon className="w-4 h-4 inline mr-1"/> <a href={message.content} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">{message.content}</a></div>;
      case 'location':
        return <div className="mt-1 flex items-center"><MapPinIcon className="w-4 h-4 mr-1"/> Location Shared</div>;
      case 'system':
        return <p className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark italic my-2">{message.content}</p>;
      case 'text':
      default:
        return <p className={`whitespace-pre-wrap break-words ${isCurrentUser ? 'text-text-white' : 'text-text-light dark:text-text-dark'}`}>{message.content}</p>;
    }
  };
  
  if (message.type === 'system') {
    return (
        <div className="py-2 text-center">
            {renderContent()}
        </div>
    );
  }

  const bubbleClasses = `
    p-2.5 px-3.5 rounded-2xl text-sm
    ${isCurrentUser 
      ? 'bg-message-sent-light dark:bg-message-sent-dark text-text-white rounded-br-lg' 
      : 'bg-message-received-light dark:bg-message-received-dark text-text-light dark:text-text-dark rounded-bl-lg'}
  `;

  return (
    <div className={`flex mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end max-w-[70%] md:max-w-[60%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar for received messages (optional, can be enabled) */}
        {/* {!isCurrentUser && sender?.avatarUrl && (
          <img src={sender.avatarUrl} alt={sender.name} className="w-7 h-7 rounded-full mr-2 self-end mb-0.5 object-cover" />
        )}
        {!isCurrentUser && !sender?.avatarUrl && sender && (
           <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold text-text-light dark:text-text-dark mr-2 self-end mb-0.5">
            {sender?.nickname?.substring(0,1).toUpperCase() || sender?.name.substring(0,1).toUpperCase() || '?'}
          </div>
        )} */}

        <div className={bubbleClasses}>
          {!isCurrentUser && (chatType === 'group' || chatType === 'channel') && sender && (
            <p className="text-xs font-semibold mb-1 text-accent-DEFAULT dark:text-accent-DEFAULT">
              {sender.nickname || sender.name}
            </p>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
