
import React, { useState } from 'react';
import { AppLogoIcon, EyeIcon, EyeSlashIcon } from './icons/EditorIcons';
import { addUser } from '../localStorageService';
import { AppView } from '../types'; // Assuming AppView is in types

interface RegistrationPageProps {
  onSwitchView: (view: AppView) => void;
  onRegistrationSuccess: () => void; // Callback for successful registration
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onSwitchView, onRegistrationSuccess }) => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !nickname.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (nickname.trim().length < 3) {
      setError('Nickname must be at least 3 characters long.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      // In a real app, password would be hashed here before sending to backend
      // For localStorage simulation, we store it as is or simple encoding
      // The addUser function in localStorageService will handle checking for existing email/nickname
      const newUser = await addUser({ 
        email, 
        nickname, 
        passwordHash: password, // Storing plain password for mock, DO NOT DO THIS IN PRODUCTION
        name: nickname, // Using nickname as name for now, can be separated later
        // avatarUrl: `https://picsum.photos/seed/${nickname}/100/100` // REMOVED - addUser will handle avatarBgColor
      }); 

      if (newUser) {
        alert('Registration successful! Please log in.');
        onRegistrationSuccess(); // This should trigger App.tsx to switch view to LOGIN
      } else {
        // This case should ideally be caught by specific errors from addUser
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during registration.');
    } finally {
      setLoading(false);
    }
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
            Create New Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" autoComplete="name" className="hidden" /> {/* Hidden name field for browser autofill hint */}
            <div>
              <label htmlFor="emailReg" className="sr-only">Email address</label>
              <input
                id="emailReg"
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
             <div>
              <label htmlFor="nicknameReg" className="sr-only">Nickname</label>
              <input
                id="nicknameReg"
                name="nickname"
                type="text"
                autoComplete="nickname"
                required
                className="w-full px-4 py-3 rounded-md border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark placeholder-text-placeholder-light dark:placeholder-text-placeholder-dark focus:ring-2 focus:ring-messengerBlue-DEFAULT focus:border-messengerBlue-DEFAULT outline-none transition-shadow"
                placeholder="Nickname (e.g., CoolUser123)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="relative">
              <label htmlFor="passwordReg" className="sr-only">Password</label>
              <input
                id="passwordReg"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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
            <div className="relative">
              <label htmlFor="confirmPasswordReg" className="sr-only">Confirm Password</label>
              <input
                id="confirmPasswordReg"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 rounded-md border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark placeholder-text-placeholder-light dark:placeholder-text-placeholder-dark focus:ring-2 focus:ring-messengerBlue-DEFAULT focus:border-messengerBlue-DEFAULT outline-none transition-shadow"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary-light dark:text-text-secondary-dark hover:text-messengerBlue-DEFAULT"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-successGreen-DEFAULT hover:bg-successGreen-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-successGreen-DEFAULT disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <hr className="my-5 border-gray-300 dark:border-gray-700" />

          <div className="text-center">
             <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Already have an account?{' '}
                <button
                    onClick={() => onSwitchView(AppView.LOGIN)}
                    className="font-medium text-messengerBlue-DEFAULT hover:underline"
                    disabled={loading}
                >
                    Log In
                </button>
            </p>
          </div>
        </div>
         <p className="mt-8 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
          &copy; {new Date().getFullYear()} TitanChat Web. Inspired by Messenger.
        </p>
      </div>
    </div>
  );
};
