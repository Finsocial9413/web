import React, { useState, useEffect, useCallback } from "react";
import { useSessionContext } from "../../contexts/SessionContext";
import { clearAuthUsername } from '../../utils/auth';
import Sidebar from '../mainLayoutComponents/Sidebar'; // Change this line to import the correct Sidebar
import ChatHistoryModal from '../modals/ChatHistoryModal';

const MainLayout = () => {
  const { isAuthenticated, userName, userProfile } = useSessionContext();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [modalChatHistory, setModalChatHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Save username to localStorage on mount and when it changes
  useEffect(() => {
    if (isAuthenticated && userProfile?.name) {
      console.log('Setting username in localStorage:', userProfile.name);
      localStorage.setItem('chatUsername', userProfile.name);
    }
  }, [isAuthenticated, userProfile]);

  // Log state for debugging
  useEffect(() => {
    console.log('MainLayout render state:', {
      isAuthenticated,
      userName,
      storedUsername: localStorage.getItem('chatUsername')
    });
  }, [isAuthenticated, userName]);

  // Clear on logout
  useEffect(() => {
    if (!isAuthenticated) {
      clearAuthUsername();
    }
  }, [isAuthenticated]);

  // Handler for opening chat history modal
  const handleOpenHistoryModal = useCallback((history: any[]) => {
    console.log('MainLayout: Opening history modal with history:', history);
    try {
      setModalChatHistory(history || []);
      setIsHistoryModalOpen(true);
    } catch (error) {
      console.error('Error opening history modal:', error);
    }
  }, []);

  const handleChatSelect = useCallback((chat: any) => {
    console.log("Selected chat:", chat);
    // Your implementation...
  }, []);

  const handleDeleteChat = useCallback((chatId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete chat:", chatId);
    // Your implementation...
  }, []);

  const formatTimestamp = useCallback((timestamp: string) => {
    // Your implementation...
    return new Date(timestamp).toLocaleString();
  }, []);

  // Create a complete props object for Sidebar
  const sidebarProps = {
    isDarkMode,
    isSidebarOpen,
    setIsSidebarOpen,
    isScrolled: false,
    handleNewChat: () => {},
    projects: [],
    setIsProjectListOpen: () => {},
    handleAddProject: () => {},
    collapsedProjects: {},
    handleProjectCollapse: () => {},
    handleProjectNameEdit: () => {},
    handleProjectNameEditStart: () => {},
    handleNewProjectChat: () => {},
    handleDeleteProject: () => {},
    handleChatSelect: () => {},
    handleProjectChatTitleEdit: () => {},
    handleProjectChatTitleEditStart: () => {},
    handleDeleteProjectChat: () => {},
    chats: [],
    setChatListInitialTab: () => {},
    setIsChatListOpen: () => {},
    handleStarChat: () => {},
    handleDeleteChat: () => {},
    isChatDropdownOpen: false,
    setIsChatDropdownOpen: () => {},
    userProfile,
    isAuthenticated,
    setIsLoginModalOpen: () => {},
    setIsLogin: () => {},
    handleLogout: () => {},
    toggleDarkMode: () => {},
    username: userProfile?.name || userName,
    storedUsername: localStorage.getItem('chatUsername'),
    onOpenHistoryModal: handleOpenHistoryModal
  };

  return (
    <>
      <div className={`flex h-screen w-screen relative ${isDarkMode ? "bg-[#001F3F] text-gray-100" : "bg-gray-50 text-gray-800"}`}>
        <Sidebar
          {...sidebarProps}
          onOpenHistoryModal={handleOpenHistoryModal}
        />
        
        {/* Main content */}
        {/* ...existing main content code... */}
      </div>

      {/* Chat History Modal - Rendered outside the main container */}
      <ChatHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        chats={modalChatHistory}
        isDarkMode={isDarkMode}
        handleChatSelect={(chat) => {
          handleChatSelect(chat);
          setIsHistoryModalOpen(false);
        }}
        handleDeleteChat={handleDeleteChat}
        formatTimestamp={formatTimestamp}
      />
    </>
  );
};

export default MainLayout;