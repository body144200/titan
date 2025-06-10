import React from 'react';
import type { User } from '../types';
import { EditProfileModal } from './EditProfileModal'; // Assuming it will be used or linked
import { TrashCanSolidIcon, UserCircleIcon } from './icons/EditorIcons';

interface AppSettingsPageProps {
  currentUser: User;
  onOpenEditProfile: () => void;
  onDeleteAccount: () => void;
}

export const AppSettingsPage: React.FC<AppSettingsPageProps> = ({ 
    currentUser, 
    onOpenEditProfile,
    onDeleteAccount
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 bg-background-chat-light dark:bg-background-chat-dark text-text-light dark:text-text-dark overflow-y-auto">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center md:text-left">
          <h1 className="text-3xl font-bold">Application Settings</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
            Manage your application preferences and account settings.
          </p>
        </header>

        {/* Profile Section */}
        <section className="bg-background-light dark:bg-background-sidebar-dark p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-3">
            <button
              onClick={onOpenEditProfile}
              className="w-full flex items-center justify-between p-3 text-left text-text-light dark:text-text-dark hover:bg-background-hover-light dark:hover:bg-background-hover-dark rounded-md transition-colors"
            >
              <div className="flex items-center">
                <UserCircleIcon className="w-6 h-6 mr-3 text-primary" />
                <span>Edit Your Profile</span>
              </div>
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">&rarr;</span>
            </button>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark px-3">
                Update your name, nickname, avatar, and bio.
            </p>
          </div>
        </section>

        {/* Account Management Section */}
        <section className="bg-background-light dark:bg-background-sidebar-dark p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Account Management</h2>
          <div className="space-y-3">
             {!currentUser.isAdmin && (
                <>
                    <button
                    onClick={onDeleteAccount}
                    className="w-full flex items-center justify-between p-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                    >
                    <div className="flex items-center">
                        <TrashCanSolidIcon className="w-5 h-5 mr-3" />
                        <span>Delete My Account</span>
                    </div>
                    <span className="text-sm">&rarr;</span>
                    </button>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark px-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                </>
             )}
             {currentUser.isAdmin && (
                 <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-300 dark:border-yellow-700">
                    Admin accounts cannot be deleted through this panel for security reasons.
                 </p>
             )}
          </div>
        </section>

        {/* More settings can be added here (e.g., Theme, Notifications) */}

      </div>
    </div>
  );
};
