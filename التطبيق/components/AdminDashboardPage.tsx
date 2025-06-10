import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import * as Storage from '../localStorageService';
import { TrashCanSolidIcon, UserCircleIcon, ShieldExclamationIcon, SearchIcon } from './icons/EditorIcons';

interface AdminDashboardPageProps {
  currentUser: User;
  onAdminDeleteUser: (userIdToDelete: string) => void;
  onViewUserProfile: (user: User) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ 
    currentUser, 
    onAdminDeleteUser,
    onViewUserProfile 
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState<User | null>(null); // For confirmation modal

  useEffect(() => {
    if (currentUser.isAdmin) {
      setUsers(Storage.getUsers().filter(u => u.id !== currentUser.id)); // Exclude current admin
    }
  }, [currentUser]);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user); // Open confirmation
  };

  const confirmDelete = () => {
    if (userToDelete) {
      onAdminDeleteUser(userToDelete.id);
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null); // Close confirmation
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string | undefined, nickname?: string | undefined): string => {
    const nameToUse = nickname || name;
    if (!nameToUse || nameToUse.trim() === '') return '?';
    const words = nameToUse.trim().split(' ').filter(w => w);
    return words.length > 0 && words[0] ? words[0][0].toUpperCase() : '?';
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 bg-background-chat-light dark:bg-background-chat-dark text-text-light dark:text-text-dark overflow-y-auto">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
          Manage users and application settings. Welcome, {currentUser.nickname}!
        </p>
      </header>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search users by name, nickname, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg bg-background-input-light dark:bg-background-input-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-placeholder-light dark:text-text-placeholder-dark" />
      </div>

      <div className="bg-background-light dark:bg-background-sidebar-dark shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
            <thead className="bg-background-sidebar-light dark:bg-background-sidebarNav-dark">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">User</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider hidden sm:table-cell">Email</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider hidden md:table-cell">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Role</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-background-hover-light dark:hover:bg-background-hover-dark transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatarUrl ? (
                          <img className="h-10 w-10 rounded-full object-cover" src={user.avatarUrl} alt={user.name} 
                               onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nickname)}&background=${user.avatarBgColor?.substring(1) || 'random'}&color=fff&size=40`)}
                          />
                        ) : (
                          <div 
                            className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold"
                            style={{ backgroundColor: user.avatarBgColor || '#CCCCCC' }}
                          >
                            {getInitials(user.name, user.nickname)}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-text-light dark:text-text-dark">{user.name}</div>
                        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">@{user.nickname}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark hidden sm:table-cell">{user.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'online' 
                        ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`}>
                      {user.status || 'offline'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {user.isAdmin ? (
                      <span className="font-semibold text-red-500 dark:text-red-400">Admin</span>
                    ) : (
                      'User'
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                     <button 
                        onClick={() => onViewUserProfile(user)}
                        className="text-primary dark:text-accent-DEFAULT hover:underline focus:outline-none"
                        title="View Profile"
                    >
                        View
                    </button>
                    {!user.isAdmin && ( // Prevent deleting other admins from this UI for now
                        <button 
                            onClick={() => handleDeleteClick(user)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                            title="Delete User"
                        >
                            <TrashCanSolidIcon className="w-5 h-5 inline" />
                        </button>
                    )}
                    {user.isAdmin && (
                         <ShieldExclamationIcon className="w-5 h-5 inline text-gray-400 dark:text-gray-600" title="Admin user, cannot be deleted here"/>
                    )}
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        No users found matching your search criteria.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-background-light dark:bg-background-sidebar-dark p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">Confirm Deletion</h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Are you sure you want to delete user <span className="font-bold">{userToDelete.nickname}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 text-sm font-medium rounded-md border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-hover-light dark:hover:bg-background-hover-dark"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
