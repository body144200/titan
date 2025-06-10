import type { User, Chat, Message } from './types';

const DEFAULT_AVATAR_COLORS = [
  '#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#F44336', 
  '#00BCD4', '#E91E63', '#FF9800', '#8BC34A', '#673AB7',
  '#795548', '#607D8B', '#009688', '#FF5722', '#3F51B5'
];

const getRandomBgColor = () => DEFAULT_AVATAR_COLORS[Math.floor(Math.random() * DEFAULT_AVATAR_COLORS.length)];

// MOCK_USERS are now primarily for initial seeding if localStorage is empty
export const MOCK_USERS: User[] = [
  { id: 'user1', name: 'Alice Wonderland', nickname: 'WonderAlice', email: 'alice@example.com', passwordHash: 'password123', avatarUrl: undefined, avatarBgColor: getRandomBgColor(), status: 'online', bio: 'Curiouser and curiouser! Exploring the digital rabbit hole.' , isAdmin: false},
  { id: 'user2', name: 'Bob The Builder', nickname: 'BobBuilds', email: 'bob@example.com', passwordHash: 'password456', avatarUrl: undefined, avatarBgColor: getRandomBgColor(), status: 'offline', bio: 'Can we fix it? Yes, we can! Building things, one line of code at a time.' , isAdmin: false},
  { id: 'user3', name: 'Charlie Chaplin', nickname: 'TheTramp', email: 'charlie@example.com', passwordHash: 'password789', avatarUrl: undefined, avatarBgColor: getRandomBgColor(), status: 'away', bio: 'A day without laughter is a day wasted.' , isAdmin: false},
  { id: 'user4', name: 'Diana Prince', nickname: 'WonderWoman', email: 'diana@example.com', passwordHash: 'securepass', avatarUrl: undefined, avatarBgColor: getRandomBgColor(), status: 'online', bio: 'Fighting for those who cannot fight for themselves.' , isAdmin: false},
  { id: 'user5', name: 'Mattress Store', nickname: 'ComfySleeps', email: 'store@example.com', passwordHash: 'storepass', avatarUrl: undefined, avatarBgColor: getRandomBgColor(), status: 'online', bio: 'Your best night\'s sleep starts here. Quality mattresses and bedding.' , isAdmin: false},
];

// Chats will be dynamically created and stored in localStorage
export const MOCK_CHATS: Chat[] = [];

// Messages will be dynamically created and stored in localStorage
export const MOCK_MESSAGES: { [key: string]: Message[] } = {};

export const AI_SUGGESTED_REPLIES = [
  "Okay, sounds good!",
  "I'll take a look.",
  "Thanks for letting me know.",
  "Can we discuss this further?",
  "I'm not sure, let me check."
];