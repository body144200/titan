import React, { useState, useRef } from 'react';
import { PlusIcon, FaceSmileIcon, ThumbsUpIcon, PaperAirplaneIcon, PaperClipIcon } from './icons/EditorIcons'; // Assuming ThumbsUpIcon exists or is added
import { useTheme } from '../contexts/ThemeContext';

interface MessageInputProps {
  chatId: string;
  onSendMessage: (chatId: string, content: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ chatId, onSendMessage, disabled }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const simpleEmojis = ['😀', '😂', '😍', '🤔', '👍', '❤️', '🎉', '🙏', '😊', '🥳', '😥', '😠'];


  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSendMessage(chatId, text.trim());
      setText('');
    }
  };
  
  const handleSendLike = () => {
    if (!disabled) {
        onSendMessage(chatId, '👍'); // Send a thumbs up emoji as a message
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachFileClick = () => {
    setShowAttachmentOptions(false); // Close an attachment options menu if it were open
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !disabled) {
      // Mock sending file: In a real app, upload then send message with file URL
      onSendMessage(chatId, `Attachment: ${file.name}`); // Simple text representation
      // Reset file input to allow selecting the same file again
      if (event.target) {
        event.target.value = ""; 
      }
    }
  };
  
  const handleEmojiSelect = (emoji: string) => {
    setText(prevText => prevText + emoji);
    setShowEmojiPicker(false);
  };


  return (
    <div className={`p-2 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
      <div className="flex items-center space-x-2">
        {/* Attachment Button - Plus Icon */}
         <div className="relative">
            <button 
                title="Attach"
                onClick={() => !disabled && setShowAttachmentOptions(!showAttachmentOptions)}
                className="p-2 text-accent-DEFAULT dark:text-accent-DEFAULT hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full disabled:opacity-50"
                disabled={disabled}
            >
                <PlusIcon className="w-5 h-5" />
            </button>
            {showAttachmentOptions && (
                 <div className={`absolute bottom-full left-0 mb-2 p-2 rounded-lg shadow-xl border ${theme === 'dark' ? 'bg-background-dark border-gray-700' : 'bg-white border-gray-200'} flex flex-col space-y-1`}>
                    <button 
                        onClick={handleAttachFileClick}
                        className="flex items-center p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 rounded w-full text-left text-text-light dark:text-text-dark"
                    >
                        <PaperClipIcon className="w-4 h-4 mr-2"/> File or Photo
                    </button>
                    {/* Add more attachment options here if needed */}
                 </div>
            )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileSelected} className="hidden" disabled={disabled} />

        {/* Message Text Input */}
        <div className="flex-1 relative">
          <textarea
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Messaging disabled" : "Type a message..."}
            className="w-full p-2.5 pr-10 rounded-full bg-background-input-light dark:bg-background-input-dark border-none resize-none focus:outline-none text-sm text-text-light dark:text-text-dark placeholder-text-placeholder-light dark:placeholder-text-placeholder-dark"
            style={{ maxHeight: '100px', scrollbarWidth: 'none' }}
            disabled={disabled}
          />
           {/* Emoji Button inside input area */}
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <button 
                title="Emoji"
                onClick={() => !disabled && setShowEmojiPicker(!showEmojiPicker)} 
                className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-accent-DEFAULT dark:hover:text-accent-DEFAULT rounded-full disabled:opacity-50"
                disabled={disabled}
            >
              <FaceSmileIcon className="w-5 h-5" />
            </button>
            {showEmojiPicker && (
                <div 
                    className={`absolute bottom-full right-0 mb-2 p-2 rounded-lg shadow-xl border z-10
                                ${theme === 'dark' ? 'bg-background-dark border-gray-700' : 'bg-white border-gray-200'} 
                                grid grid-cols-6 gap-1 w-max max-h-48 overflow-y-auto`}
                >
                    {simpleEmojis.map(emoji => (
                        <button 
                            key={emoji} 
                            onClick={() => handleEmojiSelect(emoji)} 
                            className="p-1 text-xl hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                            aria-label={`Emoji ${emoji}`}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}
          </div>
        </div>
        
        {/* Send Button or Like Button */}
        {text.trim() ? (
          <button 
              title="Send Message"
              onClick={handleSend} 
              className="p-2 text-accent-DEFAULT dark:text-accent-DEFAULT hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full disabled:opacity-50"
              disabled={disabled}
          >
            <PaperAirplaneIcon className="w-5 h-5 transform" />
          </button>
        ) : (
          <button 
              title="Send a Like"
              onClick={handleSendLike}
              className="p-2 text-accent-DEFAULT dark:text-accent-DEFAULT hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full disabled:opacity-50"
              disabled={disabled}
          >
            <ThumbsUpIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};