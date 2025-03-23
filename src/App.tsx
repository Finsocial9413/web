import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { SessionProvider } from "./context/SessionContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ChatHistoryPage from './pages/ChatHistoryPage';
import { fetchDetailedChatHistory } from './services/chatService';

import "./index.css";
import "./styles/auth.css";
import "./styles/animations.css";

interface ChatHistoryItem {
  chat_id: string;
  first_message: string;
  timestamp: string;
}

interface ChatHistoryResponse {
  messages: {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
  }[];
}

interface ChatMessage {
  prompt: string;
  reasoning: string;
  response: string;
  timestamp: string;
}

interface DetailedChatResponse {
  chat_id: string;
  messages: ChatMessage[];
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const [currentChat, setCurrentChat] = useState<DetailedChatResponse | null>(null);
  const navigate = useNavigate();
  
  // Get chat history from route state
  const chatHistory = location.state?.chats || [];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Add navigation handlers
  const handleChatSelect = async (chat: { id: string; title: string }) => {
    try {
      const username = localStorage.getItem('email') || localStorage.getItem('username');
      if (!username) {
        throw new Error('No username found');
      }

      console.log('Selecting chat:', { id: chat.id, title: chat.title });
      
      const chatDetails = await fetchDetailedChatHistory(username, chat.id);
      console.log('Fetched chat details (new format):', chatDetails);

      if (!chatDetails.messages.length) {
        console.warn('No messages in chat history');
        return;
      }

      // Verify we have the correct format
      if (!chatDetails.messages[0].prompt) {
        console.error('Unexpected response format:', chatDetails);
        return;
      }

      setCurrentChat(chatDetails);
      navigate('/');
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.preventDefault();
    // Implement delete logic here
    console.log("Delete chat:", chatId);
  };

  return (
    <ErrorBoundary>
      <SessionProvider>
        <Routes>
          <Route 
            path="/" 
            element={
              <ErrorBoundary>
                <MainLayout 
                  isDarkMode={isDarkMode} 
                  toggleDarkMode={toggleDarkMode}
                  currentChat={currentChat}
                  setCurrentChat={setCurrentChat}  // Add this line
                />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/chat-history" 
            element={
              <ChatHistoryPage
                isDarkMode={isDarkMode}
                chats={chatHistory}
                onClose={() => window.history.back()}
                onSelect={handleChatSelect}
                onDelete={handleDeleteChat}
              />
            }
          />
        </Routes>
      </SessionProvider>
    </ErrorBoundary>
  );
};

// Wrap App with Router
const AppWithRouter: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
