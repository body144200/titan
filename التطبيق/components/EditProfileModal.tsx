import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { CameraIcon, CloseIcon } from './icons/EditorIcons';
import * as Storage from '../localStorageService';

interface EditProfileModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate: (updatedUserData: Partial<Omit<User, 'id' | 'email'>>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ currentUser, isOpen, onClose, onProfileUpdate }) => {
  const [name, setName] = useState(currentUser.name);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setNickname(currentUser.nickname);
      setAvatarUrl(currentUser.avatarUrl || '');
      setBio(currentUser.bio || '');
      setError(null);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (nickname.trim().length < 3) {
      setError("Nickname must be at least 3 characters.");
      setLoading(false);
      return;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      setLoading(false);
      return;
    }

    const updates: Partial<Omit<User, 'id' | 'email'>> = {
      name: name.trim(),
      nickname: nickname.trim(),
      avatarUrl: avatarUrl.trim() || undefined, // Store as undefined if empty
      bio: bio.trim() || undefined,
    };

    try {
      onProfileUpdate(updates); // App.tsx handles actual storage update & state
      // onClose(); // App.tsx should close modal on successful update
    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };
  
  const getInitials = (nameStr: string | undefined, nicknameStr?: string | undefined): string => {
    const nameToUse = nicknameStr || nameStr;
    if (!nameToUse || nameToUse.trim() === '') return '?';
    const words = nameToUse.trim().split(' ').filter(w => w);
    return words.length > 0 && words[0] ? words[0][0].toUpperCase() : '?';
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
      <div className="bg-background-light dark:bg-background-sidebar-dark rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Edit Profile</h2>
          <button onClick={onClose} className="text-icon-light dark:text-icon-dark hover:text-red-500 p-1">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="flex flex-col items-center space-y-3">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-primary" 
                   onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nickname || name)}&background=random&size=96`)}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-text-light dark:text-text-dark">
                {getInitials(name, nickname)}
              </div>
            )}
            <div className="relative w-full">
               <label htmlFor="avatarUrl" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Avatar URL</label>
              <div className="flex items-center">
                <CameraIcon className="w-5 h-5 text-text-placeholder-light dark:text-text-placeholder-dark absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                <input
                  id="avatarUrl"
                  type="url"
                  placeholder="https://example.com/avatar.png"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark placeholder-text-placeholder-light focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-md border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark placeholder-text-placeholder-light focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
          </div>

          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Nickname</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              minLength={3}
              className="w-full px-3 py-2.5 rounded-md border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark placeholder-text-placeholder-light focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell us a little about yourself..."
              className="w-full px-3 py-2.5 rounded-md border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark placeholder-text-placeholder-light focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
          
          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-md border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-hover-light dark:hover:bg-background-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-background-dark disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
