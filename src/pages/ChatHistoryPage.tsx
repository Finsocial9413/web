import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatHistoryItem {
  chat_id: string;
  first_message: string;
  timestamp: string;
}

interface ChatHistoryPageProps {
  isDarkMode: boolean;
  chats: ChatHistoryItem[];
  onClose: () => void;
  onSelect: (chat: { id: string; title: string }) => void;
  onDelete: (chatId: string, e: React.MouseEvent) => void;
}

const ChatHistoryPage: React.FC<ChatHistoryPageProps> = ({
  isDarkMode,
  chats,
  onClose,
  onSelect,
  onDelete
}) => {
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredChats = useMemo(() => {
    // First strictly filter out empty or invalid messages
    let filtered = chats.filter(chat => {
      // If first_message is empty string, undefined, or null, filter it out
      if (!chat.first_message || chat.first_message === "") return false;
      
      const cleanMessage = chat.first_message.trim();
      
      // Check if message starts with "Chat" followed by a date
      if (cleanMessage.startsWith("Chat ") && 
          // Match date patterns like "3/22/2025", "03-22-2025", etc.
          /Chat \d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(cleanMessage)) {
        return false;
      }
      
      // Return false for any of these invalid conditions
      if (!cleanMessage) return false;                    // empty after trim
      if (cleanMessage === '""') return false;           // empty quotes
      if (cleanMessage === '"') return false;            // single quote
      if (cleanMessage === 'undefined') return false;    // undefined string
      if (cleanMessage.length <= 1) return false;        // single character
      if (cleanMessage === '[]') return false;           // empty array
      if (cleanMessage === '{}') return false;           // empty object
      if (cleanMessage === 'null') return false;         // null string
      
      return true; // include only if passed all conditions
    });

    // Then apply search and date filters
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(chat => 
        chat.first_message?.toLowerCase().includes(searchLower)
      );
    }
    
    if (startDate) {
      filtered = filtered.filter(chat => 
        new Date(chat.timestamp) >= new Date(startDate)
      );
    }
    
    if (endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59);
      filtered = filtered.filter(chat => 
        new Date(chat.timestamp) <= endDateTime
      );
    }
    
    return filtered;
  }, [chats, search, startDate, endDate]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const chatCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: isDarkMode 
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)" 
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const filterBarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, delay: 0.2 }
    }
  };

  // Add new animation variants for search input
  const searchAnimationVariants = {
    idle: {
      width: "100%",
      boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
    },
    focus: {
      width: "100%",
      boxShadow: isDarkMode 
        ? "0 0 0 2px rgba(59, 130, 246, 0.3)"
        : "0 0 0 2px rgba(59, 130, 246, 0.2)",
    },
    hover: {
      scale: 1.01,
    }
  };

  const searchIconVariants = {
    idle: { rotate: 0 },
    focus: { rotate: 90 },
    hover: { scale: 1.1 }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={`fixed inset-0 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Main Container with Scroll */}
      <div className="h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header - Fixed at Top */}
          <motion.div 
            className="sticky top-0 z-10 pb-4 pt-2 backdrop-blur-sm bg-opacity-90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Chat History
              </h1>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-3 rounded-full hover:bg-opacity-80 ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                <i className="fas fa-times"></i>
              </motion.button>
            </div>

            {/* Modified Search and Filters Section */}
            <motion.div 
              variants={filterBarVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              {/* Enhanced Search Input with Fixed Icon Position */}
              <div className="relative w-full">
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 left-4 flex items-center justify-center pointer-events-none ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  variants={searchIconVariants}
                  initial="idle"
                  animate={search ? "focus" : "idle"}
                  whileHover="hover"
                >
                  <motion.i 
                    className="fas fa-search text-lg"
                    animate={{ rotate: search ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <motion.input
                  type="text"
                  placeholder="Search chats..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  variants={searchAnimationVariants}
                  initial="idle"
                  animate={search ? "focus" : "idle"}
                  whileHover="hover"
                  transition={{ duration: 0.2 }}
                  className={`w-full h-12 pl-12 pr-10 rounded-lg border text-base transition-colors duration-200 
                    ${isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 focus:border-blue-400'
                    } placeholder-gray-400`}
                />
                <AnimatePresence>
                  {search && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSearch('')}
                      className={`absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center ${
                        isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <i className="fas fa-times"></i>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Date Inputs Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full h-11 px-4 rounded-lg border transition-all duration-200 
                      ${isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-300 focus:border-blue-400'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full h-11 px-4 rounded-lg border transition-all duration-200 
                      ${isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-300 focus:border-blue-400'}`}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Chat Grid - Scrollable Content */}
          <div className="mt-6">
            <motion.div 
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {filteredChats.map((chat, index) => (
                  <motion.div
                    key={chat.chat_id}
                    custom={index}
                    variants={chatCardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    layout
                    className={`p-4 rounded-lg cursor-pointer backdrop-blur-sm ${
                      isDarkMode 
                        ? 'bg-gray-800/90 hover:bg-gray-700/90' 
                        : 'bg-white/90 hover:bg-gray-50/90 shadow-sm'
                    }`}
                    onClick={() => onSelect({
                      id: chat.chat_id,
                      title: chat.first_message
                    })}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`font-medium line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {chat.first_message || "New Chat"}
                      </h3>
                      {/* <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(chat.chat_id, e);
                        }}
                        className="p-2 rounded-full text-red-500 hover:bg-red-500/10"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </motion.button> */}
                    </div>
                    <div className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <i className="fas fa-calendar-alt"></i>
                    {new Date(chat.timestamp).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State - Keep inside scrollable area */}
            {filteredChats.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className={`rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <i className={`fas fa-history text-2xl ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}></i>
                </div>
                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  No chat history found
                </h3>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {search || startDate || endDate 
                    ? "Try adjusting your filters"
                    : "Start a new chat to see it here"}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHistoryPage;
