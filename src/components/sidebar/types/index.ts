export interface ChatHistoryItem {
  chat_id: string;
  first_message: string;
  timestamp: string;
}

export interface SidebarProps {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isScrolled: boolean;
  handleNewChat: () => void;
  projects: any[]; // Replace with proper Project type
  setIsProjectListOpen: (isOpen: boolean) => void;
  handleAddProject: () => void;
  collapsedProjects: { [key: string]: boolean };
  handleProjectCollapse: (projectId: string, e: React.MouseEvent) => void;
  handleProjectNameEdit: (projectId: string, newName: string) => void;
  handleProjectNameEditStart: (projectId: string) => void;
  handleNewProjectChat: (projectId: string) => void;
  handleDeleteProject: (projectId: string, e: React.MouseEvent) => void;
  handleChatSelect: (chat: any) => void;
  handleProjectChatTitleEdit: (projectId: string, chatId: string, newTitle: string) => void;
  handleProjectChatTitleEditStart: (projectId: string, chatId: string) => void;
  handleDeleteProjectChat: (projectId: string, chatId: string, e: React.MouseEvent) => void;
  chats: any[];
  setChatListInitialTab: (tab: "starred" | "all") => void;
  setIsChatListOpen: (isOpen: boolean) => void;
  handleStarChat: (chatId: string, e: React.MouseEvent) => void;
  handleDeleteChat: (chatId: string, e: React.MouseEvent) => void;
  isChatDropdownOpen: boolean;
  setIsChatDropdownOpen: (isOpen: boolean) => void;
  userProfile: { name: string } | null;
  isAuthenticated: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
  handleLogout: () => void;
  toggleDarkMode: () => void;
  username?: string;
  storedUsername?: string;
  onOpenHistoryModal: (history: ChatHistoryItem[]) => void;
}
