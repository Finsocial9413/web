import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatHistoryItem } from '../sidebar/types';

interface ChatHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  chats: ChatHistoryItem[];
  isDarkMode: boolean;
  handleChatSelect: (chat: any) => void;
  handleDeleteChat: (chatId: string, e: React.MouseEvent) => void;
  formatTimestamp: (timestamp: string) => string;
}

const ChatHistoryModal: React.FC<ChatHistoryModalProps> = ({
  isOpen,
  onClose,
  chats,
  isDarkMode,
  handleChatSelect,
  handleDeleteChat,
  formatTimestamp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Animation variants for modal
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      y: -50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  // Chat item animation variants
  const chatItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  const filteredChats = useMemo(() => {
    return chats.filter(chat => 
      chat.first_message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chats, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Full screen overlay with blur */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container - Made wider and centered */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full max-w-4xl mx-auto h-[85vh] rounded-2xl overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-900/95 border border-gray-700' 
                : 'bg-white/95'
            } shadow-2xl`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 ${
              isDarkMode ? 'border-gray-800' : 'border-gray-100'
            } border-b backdrop-blur-sm`}>
              <div className="flex items-center space-x-4">
                <i className="fas fa-history text-2xl text-blue-500"></i>
                <h2 className="text-2xl font-semibold">Chat History</h2>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                }`}>
                  {filteredChats.length} chats
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-3 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <i className="fas fa-times text-xl"></i>
              </motion.button>
            </div>

            {/* Search Bar - Enhanced */}
            <div className="p-6 pb-4">
              <div className={`max-w-2xl mx-auto relative rounded-xl overflow-hidden shadow-sm`}>
                <input
                  type="search"
                  placeholder="Search chat history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 outline-none border-2 text-lg
                    transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 text-gray-200 border-gray-700 focus:border-blue-500' 
                      : 'bg-gray-50/80 text-gray-800 border-gray-200 focus:border-blue-500'
                  }`}
                />
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              </div>
            </div>

            {/* Chat List - Grid layout */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredChats.map((chat) => (
                  <motion.div
                    key={chat.chat_id}
                    variants={chatItemVariants}
                    whileHover="hover"
                    className={`group p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                      isDarkMode 
                        ? 'hover:bg-gray-800 border-gray-800 hover:border-gray-700' 
                        : 'hover:bg-gray-50 border-gray-100 hover:border-gray-200'
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate mb-1">{chat.first_message || "New Chat"}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatTimestamp(chat.timestamp)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(chat.chat_id, e);
                        }}
                        className={`ml-4 p-2 rounded-full opacity-0 group-hover:opacity-100 
                          transition-all duration-200 ${
                          isDarkMode 
                            ? 'hover:bg-red-500/20 text-red-400' 
                            : 'hover:bg-red-50 text-red-500'
                        }`}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatHistoryModal;
