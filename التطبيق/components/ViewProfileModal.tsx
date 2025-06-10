import React from 'react';
import type { User } from '../types';
import { CloseIcon, UserCircleIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon, WifiIcon, WifiSlashIcon } from './icons/EditorIcons'; 

interface ViewProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const getInitials = (name: string | undefined, nickname?: string | undefined): string => {
  const nameToUse = nickname || name;
  if (!nameToUse || nameToUse.trim() === '') return '?';
  const words = nameToUse.trim().split(' ').filter(w => w);
  return words.length > 0 && words[0] ? words[0][0].toUpperCase() : '?';
};


export const ViewProfileModal: React.FC<ViewProfileModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
      <div className="bg-background-light dark:bg-background-sidebar-dark rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">User Profile</h2>
          <button onClick={onClose} className="text-icon-light dark:text-icon-dark hover:text-red-500 p-1">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div className="flex flex-col items-center text-center">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-28 h-28 rounded-full object-cover border-4 border-primary mb-3" 
                   onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nickname || user.name)}&background=random&size=112`)}
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-5xl font-bold text-text-light dark:text-text-dark mb-3">
                {getInitials(user.name, user.nickname)}
              </div>
            )}
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">{user.name}</h3>
            <p className="text-md text-primary dark:text-accent-DEFAULT">@{user.nickname}</p>
          </div>
          
          <div className="space-y-3 text-sm">
            {user.email && (
              <div className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 mr-3 text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0" />
                <span className="text-text-light dark:text-text-dark break-all">{user.email}</span>
              </div>
            )}

            {user.bio && (
              <div className="flex items-start">
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mr-3 mt-0.5 text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0" />
                <p className="text-text-light dark:text-text-dark whitespace-pre-wrap">{user.bio}</p>
              </div>
            )}

            <div className="flex items-center">
              {user.status === 'online' ? 
                <WifiIcon className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" /> : 
                <WifiSlashIcon className="w-5 h-5 mr-3 text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0" />
              }
              <span className={`capitalize font-medium ${user.status === 'online' ? 'text-green-600 dark:text-green-400' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                {user.status || 'Offline'}
              </span>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium rounded-md border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-hover-light dark:hover:bg-background-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-background-dark"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
