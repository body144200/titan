import type { User, Chat, Message } from './types';
import { MOCK_USERS as INITIAL_USERS } from './constants'; // For seeding

const DB_KEYS = {
  USERS: 'titanChatUsers_v4', // Incremented version for schema changes
  CHATS: 'titanChatChats_v4',
  MESSAGES: 'titanChatMessages_v4',
  CURRENT_USER_ID: 'titanChatCurrentUserId_v4',
};

const DEFAULT_AVATAR_COLORS = [
  '#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#F44336', 
  '#00BCD4', '#E91E63', '#FF9800', '#8BC34A', '#673AB7',
  '#795548', '#607D8B', '#009688', '#FF5722', '#3F51B5'
];

const getRandomBgColor = () => DEFAULT_AVATAR_COLORS[Math.floor(Math.random() * DEFAULT_AVATAR_COLORS.length)];


// --- Utility Functions ---
const generateId = (prefix: string = ''): string => {
  return `${prefix}${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
};

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

// --- User Management ---
export const getUsers = (): User[] => getFromStorage<User[]>(DB_KEYS.USERS, []);
export const saveUsers = (users: User[]): void => saveToStorage<User[]>(DB_KEYS.USERS, users);

export const addUser = (newUser: Omit<User, 'id' | 'status' | 'isAdmin' | 'avatarBgColor'> & {avatarUrl?:string, avatarBgColor?: string, isAdmin?: boolean}): User | null => {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
    throw new Error("Email already exists.");
  }
  if (users.find(u => u.nickname.toLowerCase() === newUser.nickname.toLowerCase())) {
    throw new Error("Nickname already exists.");
  }
  const userWithId: User = { 
    ...newUser, 
    id: generateId('user_'), 
    status: 'online', // Default status
    bio: newUser.bio || '',
    avatarUrl: newUser.avatarUrl || undefined,
    avatarBgColor: newUser.avatarBgColor || getRandomBgColor(),
    isAdmin: newUser.isAdmin || false, // Default to not admin
  };
  saveUsers([...users, userWithId]);
  return userWithId;
};

export const findUserByEmail = (email: string): User | undefined => {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (userId: string): User | undefined => {
  return getUsers().find(u => u.id === userId);
};

export const updateUser = (userId: string, updates: Partial<Omit<User, 'id' | 'email' | 'isAdmin'>>): User | null => {
  let users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    throw new Error("User not found.");
  }

  const existingUser = users[userIndex];

  if (updates.nickname && updates.nickname.toLowerCase() !== existingUser.nickname.toLowerCase()) {
    if (users.find(u => u.id !== userId && u.nickname.toLowerCase() === updates.nickname!.toLowerCase())) {
      throw new Error("Nickname is already taken by another user.");
    }
  }
  
  const updatedUser = { 
    ...existingUser, 
    ...updates,
    avatarUrl: updates.avatarUrl === '' ? undefined : (updates.avatarUrl || existingUser.avatarUrl),
    bio: updates.bio === '' ? undefined : (updates.bio || existingUser.bio),
    avatarBgColor: updates.avatarBgColor || existingUser.avatarBgColor,
  };
  users[userIndex] = updatedUser;
  saveUsers(users);

  let chats = getChats();
  chats.forEach(chat => {
    if (chat.participants.includes(userId)) {
      if (chat.participantDetails && chat.participantDetails[userId]) {
        chat.participantDetails[userId] = {
          name: updatedUser.name,
          nickname: updatedUser.nickname,
          avatarUrl: updatedUser.avatarUrl,
          avatarBgColor: updatedUser.avatarBgColor,
        };
      }
    }
  });
  saveChats(chats);

  return updatedUser;
};

export const deleteUser = (userIdToDelete: string): boolean => {
  let users = getUsers();
  const userIndex = users.findIndex(u => u.id === userIdToDelete);
  if (userIndex === -1) return false; // User not found

  users.splice(userIndex, 1);
  saveUsers(users);

  let chats = getChats();
  chats = chats.filter(chat => !chat.participants.includes(userIdToDelete));
  // Update participantDetails in remaining chats if needed (though less critical if entire chat is gone)
  chats.forEach(chat => {
      if (chat.participantDetails && chat.participantDetails[userIdToDelete]) {
          delete chat.participantDetails[userIdToDelete];
      }
  });
  saveChats(chats);


  let messagesData = getMessages();
  Object.keys(messagesData).forEach(chatId => {
    if (!chats.find(c => c.id === chatId)) { // If chat was removed
        delete messagesData[chatId];
    } else { // Filter messages from deleted user in remaining chats
        messagesData[chatId] = messagesData[chatId].filter(msg => msg.senderId !== userIdToDelete);
    }
  });
  saveMessages(messagesData);
  
  if (getCurrentUserId() === userIdToDelete) {
      setCurrentUserId(null);
  }
  return true;
};

export const adminDeleteUser = (adminUserId: string, userIdToDelete: string): boolean => {
    const adminUser = findUserById(adminUserId);
    if (!adminUser || !adminUser.isAdmin) {
        throw new Error("Unauthorized: Only admins can perform this action.");
    }
    if (adminUserId === userIdToDelete) {
        throw new Error("Admin cannot delete themselves using this function.");
    }
    const userToDelete = findUserById(userIdToDelete);
    if (!userToDelete) {
        throw new Error("User to delete not found.");
    }
    // Admin can delete any non-admin user.
    // Optional: Add logic here if admin should not be able to delete other admins.
    // For now, allow deleting any user *except self through this specific function*.
    return deleteUser(userIdToDelete);
};


// --- Chat Management ---
export const getChats = (): Chat[] => getFromStorage<Chat[]>(DB_KEYS.CHATS, []);
export const saveChats = (chats: Chat[]): void => saveToStorage<Chat[]>(DB_KEYS.CHATS, chats);

export const createOrGetIndividualChat = (userId1: string, userId2: string): Chat | null => {
  const user1 = findUserById(userId1);
  const user2 = findUserById(userId2);
  if (!user1 || !user2) return null;

  let chats = getChats();
  const existingChat = chats.find(chat => 
    chat.type === 'individual' && 
    chat.participants.includes(userId1) && 
    chat.participants.includes(userId2)
  );

  if (existingChat) {
      existingChat.participantDetails = {
        [user1.id]: { name: user1.name, nickname: user1.nickname, avatarUrl: user1.avatarUrl, avatarBgColor: user1.avatarBgColor },
        [user2.id]: { name: user2.name, nickname: user2.nickname, avatarUrl: user2.avatarUrl, avatarBgColor: user2.avatarBgColor },
      };
      // These properties represent the *other* user from the perspective of who initiated/is viewing.
      // App.tsx's loadUserData correctly determines these for the currentUser.
      // Storing user2's details here is a convention if user1 initiated.
      existingChat.name = user2.nickname || user2.name;
      existingChat.avatarUrl = user2.avatarUrl; 
      existingChat.avatarBgColor = user2.avatarBgColor;
      saveChats(chats);
      return existingChat;
  }

  const newChat: Chat = {
    id: generateId('chat_'),
    type: 'individual',
    participants: [userId1, userId2],
    name: user2.nickname || user2.name, // Name of the partner
    avatarUrl: user2.avatarUrl,         // Avatar of the partner
    avatarBgColor: user2.avatarBgColor, // BG Color of the partner
    lastMessage: "Chat started.",
    lastMessageTimestamp: new Date().toISOString(),
    unreadCount: 0,
    participantDetails: {
      [user1.id]: { name: user1.name, nickname: user1.nickname, avatarUrl: user1.avatarUrl, avatarBgColor: user1.avatarBgColor },
      [user2.id]: { name: user2.name, nickname: user2.nickname, avatarUrl: user2.avatarUrl, avatarBgColor: user2.avatarBgColor },
    }
  };
  chats.push(newChat);
  saveChats(chats);
  return newChat;
};


// --- Message Management ---
export const getMessages = (): { [chatId: string]: Message[] } => getFromStorage(DB_KEYS.MESSAGES, {});
export const saveMessages = (messages: { [chatId: string]: Message[] }): void => saveToStorage(DB_KEYS.MESSAGES, messages);

export const addMessage = (chatId: string, message: Omit<Message, 'id'>): Message => {
  const allMessages = getMessages();
  const newMessage: Message = { ...message, id: generateId('msg_') };
  const chatMessages = allMessages[chatId] || [];
  allMessages[chatId] = [...chatMessages, newMessage];
  saveMessages(allMessages);

  const chats = getChats();
  const chatIndex = chats.findIndex(c => c.id === chatId);
  if (chatIndex > -1) {
    chats[chatIndex].lastMessage = newMessage.content.length > 30 ? newMessage.content.substring(0,27) + "..." : newMessage.content;
    chats[chatIndex].lastMessageTimestamp = newMessage.timestamp;
    saveChats(chats);
  }
  return newMessage;
};


// --- Current User Session ---
export const getCurrentUserId = (): string | null => getFromStorage<string | null>(DB_KEYS.CURRENT_USER_ID, null);
export const setCurrentUserId = (userId: string | null): void => saveToStorage<string | null>(DB_KEYS.CURRENT_USER_ID, userId);


// --- Initialization ---
export const initializeDB = (): void => {
  let users = getUsers();
  let usersModified = false;

  if (users.length === 0) { // Seed only if completely empty
    INITIAL_USERS.forEach(u => {
      users.push({
        ...u,
        id: generateId('user_'),
        bio: u.bio || '',
        avatarUrl: undefined, // Start without picsum URLs
        avatarBgColor: u.avatarBgColor || getRandomBgColor(),
        isAdmin: u.isAdmin || false,
      });
    });
    usersModified = true;
  }
  
  const adminEmail = 'admin@example.com';
  let adminUser = users.find(u => u.email === adminEmail);
  if (!adminUser) {
    adminUser = {
      id: generateId('admin_'),
      name: 'Application Administrator',
      nickname: 'Admin',
      email: adminEmail,
      passwordHash: 'admin', // Plain text for mock
      avatarUrl: undefined,
      avatarBgColor: '#D32F2F', // Distinct color for admin
      status: 'online',
      bio: 'System Administrator for TitanChat.',
      isAdmin: true,
    };
    users.push(adminUser);
    usersModified = true;
  } else { // Ensure existing admin user has all admin properties
      if (!adminUser.isAdmin) {
          adminUser.isAdmin = true;
          usersModified = true;
      }
      if (!adminUser.avatarBgColor) {
          adminUser.avatarBgColor = '#D32F2F';
          usersModified = true;
      }
  }

  users = users.map(u => {
    let modified = false;
    if (u.bio === undefined) { u.bio = ''; modified = true; }
    if (u.avatarBgColor === undefined) { u.avatarBgColor = getRandomBgColor(); modified = true; }
    if (u.avatarUrl && u.avatarUrl.includes('picsum.photos')) { u.avatarUrl = undefined; modified = true; }
    if (u.isAdmin === undefined) { u.isAdmin = false; modified = true; } // Default non-admins
    if (modified) usersModified = true;
    return u;
  });

  if (usersModified) {
    saveUsers(users);
    console.log("Database users initialized/updated.");
  }

  // Ensure chats have avatarBgColor if they are group chats and don't have one (for future use)
  let chats = getChats();
  let chatsModified = false;
  chats = chats.map(chat => {
    if ((chat.type === 'group' || chat.type === 'channel') && !chat.avatarBgColor) {
        // chat.avatarBgColor = getRandomBgColor(); // Or a default group color
        // For now, let's not auto-assign, but the field is available.
    }
    // For individual chats, avatarBgColor is derived from participant or set via createOrGetIndividualChat.
    // If it's missing from old stored data for an individual chat, App.tsx's loadUserData will fill it.
    return chat;
  });

  if (chatsModified) {
      saveChats(chats);
      console.log("Chats updated with avatarBgColor where applicable.");
  }


  if (getChats().length === 0) {
    saveChats([]); 
  }
  if (Object.keys(getMessages()).length === 0) {
    saveMessages({});
  }
};

initializeDB();