
import React from 'react';
import type { Chat, User } from '../types';
import { MOCK_USERS } from '../constants';
import { UserCircleIcon, UsersIcon, BellIcon, PhotoIcon, DocumentTextIcon, Cog6ToothFilledIcon, ShieldCheckIcon, ArrowLeftOnRectangleIcon } from './icons/EditorIcons';

interface InfoBarProps {
  chat: Chat;
  currentUser: User; // Assuming this is the logged-in user
}

export const InfoBar: React.FC<InfoBarProps> = ({ chat, currentUser }) => {
  const getChatPartner = (): User | undefined => {
    if (chat.type === 'individual') {
      const partnerId = chat.participants.find(pId => pId !== currentUser.id);
      return MOCK_USERS.find(u => u.id === partnerId);
    }
    return undefined;
  };

  const displayEntity = chat.type === 'individual' ? getChatPartner() : chat;
  const entityName = chat.type === 'individual' ? (displayEntity as User)?.name : (displayEntity as Chat)?.name;
  const entityAvatar = chat.type === 'individual' ? (displayEntity as User)?.avatarUrl : (displayEntity as Chat)?.avatarUrl;


  const commonFiles = [
    { name: "project_brief.pdf", type: "pdf", size: "2.3MB", icon: <DocumentTextIcon className="w-5 h-5 text-red-500"/> },
    { name: "logo_final.png", type: "img", size: "800KB", icon: <PhotoIcon className="w-5 h-5 text-blue-500"/> },
    { name: "meeting_notes.docx", type: "doc", size: "150KB", icon: <DocumentTextIcon className="w-5 h-5 text-blue-600"/> }
  ];

  return (
    <div className="h-full flex flex-col p-4 bg-background-sidebar-light dark:bg-background-sidebar-dark text-text-light dark:text-text-dark overflow-y-auto">
      {/* Entity Info */}
      <div className="flex flex-col items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
        {entityAvatar ? (
          <img src={entityAvatar} alt={entityName} className="w-24 h-24 rounded-full mb-3 object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-3xl font-semibold text-text-light dark:text-text-dark mb-3">
            {chat.type === 'group' || chat.type === 'channel' ? <UsersIcon className="w-12 h-12" /> : <UserCircleIcon className="w-12 h-12" />}
          </div>
        )}
        <h2 className="text-xl font-semibold">{entityName}</h2>
        {chat.type === 'individual' && (displayEntity as User)?.status && (
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark capitalize">{(displayEntity as User).status}</p>
        )}
        {chat.type === 'group' && (
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{(displayEntity as Chat).participants.length} members</p>
        )}
      </div>

      {/* Shared Media (Placeholder) */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark mb-2">SHARED MEDIA</h3>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <img key={i} src={`https://picsum.photos/seed/${chat.id}_media_${i}/100/100`} alt={`Shared media ${i}`} className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"/>
          ))}
        </div>
        <button className="text-sm text-primary-DEFAULT dark:text-primary-DEFAULT hover:underline mt-2">View all</button>
      </div>
      
      {/* Shared Files (Placeholder) */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark mb-2">SHARED FILES</h3>
        <ul className="space-y-2">
            {commonFiles.map(file => (
                 <li key={file.name} className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                    {file.icon}
                    <span className="ml-2 text-sm truncate flex-1">{file.name}</span>
                    <span className="text-xs text-text-muted-light dark:text-text-muted-dark">{file.size}</span>
                 </li>
            ))}
        </ul>
         <button className="text-sm text-primary-DEFAULT dark:text-primary-DEFAULT hover:underline mt-2">View all</button>
      </div>

      {/* Actions & Settings */}
      <div className="space-y-2">
        <button className="w-full flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          <BellIcon className="w-5 h-5 mr-3 text-text-muted-light dark:text-text-muted-dark" /> Mute Notifications
        </button>
        {chat.type === 'individual' && (
          <button className="w-full flex items-center p-2 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30">
            <ShieldCheckIcon className="w-5 h-5 mr-3" /> Block User
          </button>
        )}
        {chat.type === 'group' && (
          <button className="w-full flex items-center p-2 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30">
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" /> Leave Group
          </button>
        )}
         <button className="w-full flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          <Cog6ToothFilledIcon className="w-5 h-5 mr-3 text-text-muted-light dark:text-text-muted-dark" /> Chat Settings
        </button>
      </div>
    </div>
  );
};
