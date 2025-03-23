import React, { useState, useEffect, useCallback, useMemo, useRef, useReducer } from "react"
import UserAvatar from "../UserAvatar"
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Add this import
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // If not available, you may need to install this package

interface ChatHistoryItem {
  chat_id: string;
  first_message: string;
  timestamp: string;
}

interface SidebarProps {
  isDarkMode: boolean
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
  isScrolled: boolean
  handleNewChat: () => void
  projects: any[] // Replace with proper Project type
  setIsProjectListOpen: (isOpen: boolean) => void
  handleAddProject: () => void
  collapsedProjects: { [key: string]: boolean }
  handleProjectCollapse: (projectId: string, e: React.MouseEvent) => void
  handleProjectNameEdit: (projectId: string, newName: string) => void
  handleProjectNameEditStart: (projectId: string) => void
  handleNewProjectChat: (projectId: string) => void
  handleDeleteProject: (projectId: string, e: React.MouseEvent) => void
  handleChatSelect: (chat: any) => void // Replace with proper Chat type
  handleProjectChatTitleEdit: (projectId: string, chatId: string, newTitle: string) => void
  handleProjectChatTitleEditStart: (projectId: string, chatId: string) => void
  handleDeleteProjectChat: (projectId: string, chatId: string, e: React.MouseEvent) => void
  chats: any[] // Replace with proper Chat type
  setChatListInitialTab: (tab: "starred" | "all") => void
  setIsChatListOpen: (isOpen: boolean) => void
  handleStarChat: (chatId: string, e: React.MouseEvent) => void
  handleDeleteChat: (chatId: string, e: React.MouseEvent) => void
  isChatDropdownOpen: boolean
  setIsChatDropdownOpen: (isOpen: boolean) => void
  userProfile: { name: string } | null
  isAuthenticated: boolean
  setIsLoginModalOpen: (isOpen: boolean) => void
  setIsLogin: (isLogin: boolean) => void
  handleLogout: () => void
  toggleDarkMode: () => void
  username?: string;
  storedUsername?: string; // Add new prop
  onOpenHistoryModal: (history: ChatHistoryItem[]) => void;
}

// Add new helper function near the top
const truncateProfileName = (name: string, maxLength: number = 10): string => {
  if (!name) return "Guest";
  return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
};

const Sidebar: React.FC<SidebarProps> = ({
  isDarkMode,
  isSidebarOpen,
  setIsSidebarOpen,
  isScrolled,
  handleNewChat,
  projects,
  setIsProjectListOpen,
  handleAddProject,
  collapsedProjects,
  handleProjectCollapse,
  handleProjectNameEdit,
  handleProjectNameEditStart,
  handleNewProjectChat,
  handleDeleteProject,
  handleChatSelect,
  handleProjectChatTitleEdit,
  handleProjectChatTitleEditStart,
  handleDeleteProjectChat,
  chats,
  setChatListInitialTab,
  setIsChatListOpen,
  handleStarChat,
  handleDeleteChat,
  isChatDropdownOpen,
  setIsChatDropdownOpen,
  userProfile,
  isAuthenticated,
  setIsLoginModalOpen,
  setIsLogin,
  handleLogout,
  toggleDarkMode,
  username,
  storedUsername,
  onOpenHistoryModal,
}) => {
  const navigate = useNavigate();
  
  // State for storing chat history
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [errorLoadingHistory, setErrorLoadingHistory] = useState<string | null>(null);
  const [showChatHistory, setShowChatHistory] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  // Track the current valid username
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  // Add new state for retry count
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 10;
  const RETRY_DELAY = 1000; // 1 second between retries

  // Add new states for refresh popup
  const [showRefreshPopup, setShowRefreshPopup] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Add new state for local modal fallback
  const [isLocalHistoryModalOpen, setIsLocalHistoryModalOpen] = useState(false);
  const [selectedHistoryItems, setSelectedHistoryItems] = useState<ChatHistoryItem[]>([]);

  // Add new state for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredHistoryItems, setFilteredHistoryItems] = useState<ChatHistoryItem[]>([]);

  // Add ref for modal
  const modalRef = useRef<HTMLDivElement>(null);

  // Create a stable reducer for modal state to prevent re-renders
  const initialModalState = {
    isOpen: false,
    items: [],
    search: "",
    startDate: "",
    endDate: "",
    filtered: []
  };

  const modalReducer = useCallback((state, action) => {
    switch (action.type) {
      case 'OPEN_MODAL': {
        const filteredItems = action.items.filter(item => 
          item.first_message && item.first_message.trim().length > 0
        );
        return { 
          ...state, 
          isOpen: true, 
          items: filteredItems,
          filtered: filteredItems,
          search: "",
          startDate: "",
          endDate: ""
        };
      }
      case 'SET_FILTERS': {
        const { search, startDate, endDate } = action;
        let filtered = [...state.items];
        
        if (search) {
          const lowerSearchTerm = search.toLowerCase();
          filtered = filtered.filter(chat => 
            chat.first_message?.toLowerCase().includes(lowerSearchTerm)
          );
        }
        
        if (startDate) {
          const startTimestamp = new Date(startDate).getTime();
          filtered = filtered.filter(chat => 
            new Date(chat.timestamp).getTime() >= startTimestamp
          );
        }
        
        if (endDate) {
          const endDateObj = new Date(endDate);
          endDateObj.setDate(endDateObj.getDate() + 1);
          const endTimestamp = endDateObj.getTime();
          filtered = filtered.filter(chat => 
            new Date(chat.timestamp).getTime() <= endTimestamp
          );
        }

        return {
          ...state,
          search,
          startDate,
          endDate,
          filtered
        };
      }
      case 'CLOSE_MODAL':
        return { ...state, isOpen: false };
      case 'CLEAR_FILTERS':
        return { 
          ...state, 
          search: "", 
          startDate: "", 
          endDate: "",
          filtered: state.items 
        };
      case 'REMOVE_ITEM':
        const newItems = state.items.filter(item => item.chat_id !== action.id);
        const newFiltered = state.filtered.filter(item => item.chat_id !== action.id);
        return { ...state, items: newItems, filtered: newFiltered };
      default:
        return state;
    }
  }, []);

  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);
  
  // Keep only the isModalOpen line
  const isModalOpen = modalState.isOpen;
  
  // Add memoized filter function
  const getFilteredItems = useMemo(() => {
    if (!modalState.items.length) return [];
    
    let filtered = modalState.items;
    
    if (modalState.search) {
      const lowerSearchTerm = modalState.search.toLowerCase();
      filtered = filtered.filter(chat => 
        chat.first_message?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    if (modalState.startDate) {
      const startTimestamp = new Date(modalState.startDate).getTime();
      filtered = filtered.filter(chat => 
        new Date(chat.timestamp).getTime() >= startTimestamp
      );
    }
    
    if (modalState.endDate) {
      const endDateObj = new Date(modalState.endDate);
      endDateObj.setDate(endDateObj.getDate() + 1);
      const endTimestamp = endDateObj.getTime();
      filtered = filtered.filter(chat => 
        new Date(chat.timestamp).getTime() <= endTimestamp
      );
    }
    
    return filtered;
  }, [modalState.items, modalState.search, modalState.startDate, modalState.endDate]);

  // Modified username validation that prioritizes userProfile.name
  const validUsername = useMemo(() => {
    const potentialUsername = userProfile?.name || username || storedUsername || localStorage.getItem('chatUsername');
    console.log('Username validation:', {
      userProfileName: userProfile?.name,
      providedUsername: username,
      storedUsername,
      localStorageUsername: localStorage.getItem('chatUsername'),
      finalUsername: potentialUsername
    });
    return potentialUsername;
  }, [username, storedUsername, userProfile]);

  // Update currentUsername when any username source changes
  useEffect(() => {
    const newUsername = userProfile?.name || username;
    if (newUsername && typeof newUsername === 'string' && newUsername.trim().length > 0) {
      setCurrentUsername(newUsername.trim());
      setHasFetched(false);
    }
  }, [username, userProfile]);

  // Debug the incoming username prop
  useEffect(() => {
    console.log("Received props in Sidebar:", {
      username,
      isAuthenticated,
      userProfile
    });
  }, [username, isAuthenticated, userProfile]);

  // Modified fetch history function
  const fetchHistory = useCallback(async (retry = 0) => {
    const usernameToUse = validUsername;
    
    if (!usernameToUse) {
      console.error("Cannot fetch history - no username available:", {
        validUsername,
        username,
        storedUsername,
        localStorage: localStorage.getItem('chatUsername')
      });
      setRefreshStatus('error');
      setShowRefreshPopup(true);
      setErrorLoadingHistory('No username available');
      return;
    }

    setRefreshStatus('loading');
    setShowRefreshPopup(true);
    setIsLoadingHistory(true);
    setErrorLoadingHistory(null);

    try {
      console.log('Fetching chat history with username:', usernameToUse);
      
      const response = await fetch('http://saveai.tech/chat/all', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameToUse }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw chat history response:', data);

      if (data && Array.isArray(data.chats)) {
        const processedChats = data.chats
          .map(chat => ({
            chat_id: chat.chat_id,
            // Set default message for empty first_message
            first_message: chat.first_message || `Chat ${new Date(chat.timestamp).toLocaleDateString()}`,
            timestamp: chat.timestamp
          }))
          .filter(chat => chat.chat_id) // Only keep chats with valid IDs
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        console.log('Processed chats:', processedChats);
        setChatHistory(processedChats);
        setHasFetched(true);
        setRefreshStatus('success');
        return true;
      } else {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Chat history fetch error:', error);
      
      if (retry < MAX_RETRIES - 1) {
        console.log(`Retrying (${retry + 1}/${MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchHistory(retry + 1);
      }
      
      setErrorLoadingHistory(`Failed to load chat history: ${error.message}`);
      setRefreshStatus('error');
      return false;
    } finally {
      if (retry === MAX_RETRIES - 1) {
        setIsLoadingHistory(false);
      }
    }
  }, [validUsername]);

  // Fetch history when username becomes valid
  useEffect(() => {
    if (validUsername && isAuthenticated && !hasFetched) {
      console.log("Initiating fetch with validated username:", validUsername);
      fetchHistory(0);
    }
  }, [validUsername, isAuthenticated, hasFetched, fetchHistory]);

  // Reset state when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setChatHistory([]);
      setHasFetched(false);
      setErrorLoadingHistory(null);
      setCurrentUsername(null);
    }
  }, [isAuthenticated]);

  // Debug username changes
  useEffect(() => {
    console.log("Username updated in Sidebar:", {
      username,
      isAuthenticated,
      currentUsername
    });
  }, [username, isAuthenticated, currentUsername]);

  // Format timestamp to a more readable format
  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
  
      if (date >= today) {
        return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else if (date >= yesterday) {
        return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Date error";
    }
  };

  // Modified truncateMessage function
  const truncateMessage = (message: string, maxLength: number = 25): string => {
    if (!message || message.trim().length === 0) {
      // Return a default message based on current date/time
      return "New Chat";
    }
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  // Add Refresh Popup Component
  const RefreshPopup = () => {
    if (!showRefreshPopup) return null;

    return (
      <div className={`absolute top-24 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {refreshStatus === 'loading' && (
          <div className="flex items-center space-x-2">
            <i className="fas fa-circle-notch fa-spin text-blue-500"></i>
            <span>Refreshing chat history...</span>
          </div>
        )}
      
      </div>
    );
  };

  // Animation variants
  const sidebarVariants = {
    open: {
      width: "15rem",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    closed: {
      width: "4rem",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const chatItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // Update the recentChats filtering
  const recentChats = useMemo(() => {
    return chatHistory
      .filter(chat => {
        if (!chat.first_message || chat.first_message === "") return false;
        
        const cleanMessage = chat.first_message.trim();
        
        // Check if message starts with "Chat" followed by a date
        if (cleanMessage.startsWith("Chat ") && 
            // Match date patterns like "3/22/2025", "03-22-2025", etc.
            /Chat \d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(cleanMessage)) {
          return false;
        }
        
        // Other invalid conditions
        if (!cleanMessage) return false;                    // empty after trim
        if (cleanMessage === '""') return false;           // empty quotes
        if (cleanMessage === '"') return false;            // single quote
        if (cleanMessage === 'undefined') return false;    // undefined string
        if (cleanMessage.length <= 1) return false;        // single character
        if (cleanMessage === '[]') return false;           // empty array
        if (cleanMessage === '{}') return false;           // empty object
        if (cleanMessage === 'null') return false;         // null string
        if (cleanMessage === 'undefined') return false;    // undefined string
        if (cleanMessage === '[]') return false;           // empty array string
        if (cleanMessage === '{}') return false;           // empty object string
        
        return true; // include only if passed all conditions
      })
      .slice(0, 4);
  }, [chatHistory]);

  // Add this new effect to handle filtering
  useEffect(() => {
    if (!selectedHistoryItems.length) {
      setFilteredHistoryItems([]);
      return;
    }
    
    let filtered = [...selectedHistoryItems];
    
    // Apply date filtering if dates are set
    if (startDate) {
      const startTimestamp = new Date(startDate).getTime();
      filtered = filtered.filter(chat => 
        new Date(chat.timestamp).getTime() >= startTimestamp
      );
    }
    
    if (endDate) {
      // Add 1 day to include the entire end date
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 1);
      const endTimestamp = endDateObj.getTime();
      filtered = filtered.filter(chat => 
        new Date(chat.timestamp).getTime() <= endTimestamp
      );
    }
    
    // Apply search term filtering
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(chat => 
        (chat.first_message && chat.first_message.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    setFilteredHistoryItems(filtered);
  }, [selectedHistoryItems, searchTerm, startDate, endDate]);

  // Modify the View All button click handler
  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/chat-history', { state: { chats: chatHistory } });
  };

  return (
    <>
      <motion.div
        initial={isSidebarOpen ? "open" : "closed"}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`${
          isSidebarOpen ? "w-60" : "w-16"
        } fixed md:relative h-full transition-colors duration-300 ${
          isDarkMode ? "border-r-2 border-blue-950" : "bg-white/90"
        } backdrop-blur-sm flex flex-col shadow-lg overflow-hidden z-40`} // Changed overflow-y-auto to overflow-hidden
      >
        {/* Top section with animated toggle */}
        <motion.div
          className={`flex items-center p-4 sticky top-0 z-50 transition-all duration-300 ${
            isScrolled
              ? isDarkMode
                ? "bg-[#001F3F]/80 text-gray-100"
                : "bg-white shadow-lg"
              : isDarkMode
                ? "bg-[#001F3F]/80 text-gray-100"
                : "bg-gray-200/50"
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
          >
            <motion.i
              animate={{ rotate: isSidebarOpen ? 0 : 180 }}
              className={`fas ${isSidebarOpen ? "fa-chevron-left" : "fa-chevron-right"}`}
            />
          </motion.button>
        </motion.div>

        {/* Main navigation with animated items */}
        <nav className="flex-1 px-2 overflow-y-auto scrollbar-hide">
          {/* Add this CSS class to your global styles or tailwind config */}
          <style jsx="true" global="true">{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center p-2 mb-2 rounded-lg hover:bg-gray-200 dark:hover:bg-blue-950/30"
            onClick={handleNewChat}
          >
            <i className="fa-solid fa-plus w-8" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="ml-2"
                >
                  New Chat
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Recent Chats Section - Modified */}
          <div className="w-full mt-4 overflow-hidden">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center">
                <i className="fa-solid fa-clock-rotate-left w-8"></i>
                {isSidebarOpen && (
                  <span className="text-sm font-medium ml-2">Recent Chats</span>
                )}
              </div>
              {isSidebarOpen && (
                <button
                  onClick={handleViewAllClick}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  View All
                </button>
              )}
            </div>

            {/* Recent chats list */}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-2 pl-4"
                >
                  {recentChats.map((chat, index) => (
                    <motion.div
                      key={chat.chat_id}
                      variants={chatItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: index * 0.05 }}
                      className="group flex flex-col p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-950/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChatSelect({
                        id: chat.chat_id,
                        title: chat.first_message || `Chat from ${formatTimestamp(chat.timestamp)}`
                      })}
                    >
                      <div className="flex items-center">
                        <i className="fa-regular fa-comment w-6"></i>
                        <span className="ml-2 truncate flex-1 font-medium">
                          {chat.first_message 
                            ? truncateMessage(chat.first_message)
                            : `Chat from ${formatTimestamp(chat.timestamp)}`
                          }
                        </span>
                      </div>
                      <div className="ml-8 text-xs text-gray-500">
                        {formatTimestamp(chat.timestamp)}
                      </div>
                      <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100 mt-1">
                        {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChat(chat.chat_id, e);
                          }}
                          className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <i className="fas fa-trash text-xs"></i>
                        </button> */}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* All Chats Section */}
          <div className="w-full">
            

            {/* Chat list section */}
            {isSidebarOpen && isChatDropdownOpen && (
              <div className="space-y-1 pl-4">
                {chats
                  .filter((chat) => !chat.isStarred)
                  .map((chat, index) => (
                    <div
                      key={chat.id || `all_${index}`}
                      className="group flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-950/50"
                      onClick={() => handleChatSelect(chat)}
                    >
                      <i className="fa-regular fa-comment w-8"></i>

                      <>
                        {chat.isEditing ? (
                          <input
                            type="text"
                            defaultValue={chat.title}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            onBlur={(e) => handleProjectChatTitleEdit("", chat.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleProjectChatTitleEdit("", chat.id, e.currentTarget.value)
                              }
                            }}
                            className={`text-sm px-2 py-1 rounded flex-1 mr-2 ${
                              isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-800"
                            }`}
                          />
                        ) : (
                          <span
                            className="ml-2 truncate flex-1"
                            onDoubleClick={(e) => {
                              e.stopPropagation()
                              handleProjectChatTitleEditStart("", chat.id)
                            }}
                          >
                            {chat.title}
                          </span>
                        )}

                        {/* Action buttons - Visible only on hover */}
                        <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProjectChatTitleEditStart("", chat.id)
                            }}
                            className={`p-1 rounded-full transition-colors ${
                              isDarkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"
                            }`}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={(e) => handleStarChat(chat.id, e)}
                            className={`p-1 rounded-full transition-colors ${
                              chat.isStarred ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                            }`}
                          >
                            <i className="fas fa-star"></i>
                          </button>
                          <button
                            onClick={(e) => handleDeleteChat(chat.id, e)}
                            className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </nav>

        {/* Auth section at bottom */}
        <motion.div
          className="mt-auto p-2 border-t border-gray-700/50"
          variants={itemVariants}
        >
          {isAuthenticated ? (
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center p-2 rounded-lg">
                <UserAvatar userName={userProfile?.name || "Guest"} />
                <span className={`${!isSidebarOpen ? "hidden" : "block"} ml-2 truncate`}>
                  {truncateProfileName(userProfile?.name || "Guest")}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
              >
                <i className="fa-solid fa-right-from-bracket w-8"> </i>
                <span className={`${!isSidebarOpen ? "hidden" : "block"} ml-2`}>Logout</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button className="w-full flex items-center p-2" onClick={() => setIsLoginModalOpen(true)}>
                <i className="fa-solid fa-right-to-bracket w-8"> </i>
                <span className={`${!isSidebarOpen ? "hidden" : "block"} ml-2`}>Login</span>
              </button>
              <button
                className="w-full flex items-center p-2 text-indigo-500"
                onClick={() => {
                  setIsLogin(false)
                  setTimeout(() => setIsLoginModalOpen(true), 50)
                }}
              >
                <i className="fa-solid fa-user-plus w-8"> </i>
                <span className={`${!isSidebarOpen ? "hidden" : "block"} ml-2`}>Sign Up</span>
              </button>
            </motion.div>
          )}

          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
          >
            <i className={`fa-solid ${isDarkMode ? "fa-sun" : "fa-moon"} w-8`}></i>
            <span className={`${!isSidebarOpen ? "hidden" : "block"} ml-2`}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default React.memo(Sidebar);
