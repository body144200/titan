export interface User {
  id: string;
  name: string; // Real name
  nickname: string; // Unique alias/nickname
  email: string; 
  passwordHash: string; // In mock/localStorage, will be plain text or simple encoding
  avatarUrl?: string;
  avatarBgColor?: string; // Hex color for initials avatar background
  status?: 'online' | 'offline' | 'away';
  bio?: string; // User's biography
  isAdmin?: boolean; // To identify admin users
}

export type MessageType = 'text' | 'image' | 'file' | 'audio' | 'link' | 'location' | 'system';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: MessageType;
  fileName?: string;
  fileUrl?: string;
  reactions?: { [emoji: string]: string[] }; // emoji: [userIds]
}

export type ChatType = 'individual' | 'group' | 'channel';

export interface Chat {
  id:string;
  name: string; // For individual chat, this will be the partner's name/nickname
  type: ChatType;
  participants: string[]; // array of user IDs
  avatarUrl?: string; // for group/channel or user if individual
  avatarBgColor?: string; // Optional: background color for group/channel avatar if no image
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount?: number;
  admins?: string[]; // for group/channel
  owner?: string; // for group/channel
  // For individual chats, store the participant IDs to derive chat name/avatar
  participantDetails?: { [userId: string]: { name: string, nickname: string, avatarUrl?: string, avatarBgColor?: string } };
}

export type Theme = 'light' | 'dark';

// Enum for different views in the app
export enum AppView {
  LOGIN = 'login',
  REGISTER = 'register',
  CHAT = 'chat',
  SETTINGS = 'settings', // New view for app settings
  ADMIN_DASHBOARD = 'admin_dashboard', // New view for admin
}