
import React, { useState } from 'react';
import type { User } from '../types';
import { AppLogoIcon, EyeIcon, EyeSlashIcon } from './icons/EditorIcons';
import { findUserByEmail } from '../localStorageService';
import { AppView } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onSwitchView: (view: AppView) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onSwitchView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const user = findUserByEmail(email);
      // IMPORTANT: Plain text password comparison. DO NOT USE IN PRODUCTION.
      // In a real app, the backend would compare hashed passwords.
      if (user && user.passwordHash === password) { 
        onLoginSuccess(user);
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-page-light dark:bg-background-page-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <AppLogoIcon className="w-20 h-20 mx-auto text-messengerBlue-DEFAULT" />
            <h1 className="text-4xl font-bold text-messengerBlue-DEFAULT mt-2">TitanChat</h1>
        </div>

        <div className="bg-background-light dark:bg-background-sidebar-dark p-6 md:p-8 rounded-xl shadow-2xl">
          <h2 className="text-xl font-semibold text-center text-text-light dark:text-text-dark mb-6">
            Log in to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
             <input type="text" name="username" autoComplete="username" className="hidden" /> {/* For browser autofill hint */}
            <div>
              <label htmlFor="emailLogin" className="sr-only">Email address</label>
              <input
                id="emailLogin"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-md border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark placeholder-text-placeholder-light dark:placeholder-text-placeholder-dark focus:ring-2 focus:ring-messengerBlue-DEFAULT focus:border-messengerBlue-DEFAULT outline-none transition-shadow"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="relative">
              <label htmlFor="passwordLogin" className="sr-only">Password</label>
              <input
                id="passwordLogin"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-md border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark placeholder-text-placeholder-light dark:placeholder-text-placeholder-dark focus:ring-2 focus:ring-messengerBlue-DEFAULT focus:border-messengerBlue-DEFAULT outline-none transition-shadow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary-light dark:text-text-secondary-dark hover:text-messengerBlue-DEFAULT"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-messengerBlue-DEFAULT hover:bg-messengerBlue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-messengerBlue-DEFAULT disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => alert("Forgot password clicked - TBD")} className="text-sm font-medium text-messengerBlue-DEFAULT hover:underline">
              Forgot password?
            </button>
          </div>

          <hr className="my-6 border-gray-300 dark:border-gray-700" />

          <div className="text-center">
            <button
              onClick={() => onSwitchView(AppView.REGISTER)}
              disabled={loading}
              className="w-auto inline-flex justify-center py-2.5 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-successGreen-DEFAULT hover:bg-successGreen-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 transition-colors"
            >
              Create New Account
            </button>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
          &copy; {new Date().getFullYear()} TitanChat Web. Inspired by Messenger.
        </p>
      </div>
    </div>
  );
};
