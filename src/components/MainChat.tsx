import { useState, useEffect, useRef } from 'react';
import { generateResponse } from '../services/api';
import { useReasoningStore } from '../stores/reasoningStore';
import ReasoningDisplay from './ReasoningDisplay';
import ReasoningDebugger from './ReasoningDebugger';
import MessageList from './MessageList';

// Define necessary interfaces
interface User {
  username: string;
  // Add other user properties as needed
}

interface Language {
  code: string;
  name: string;
}

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

const MainChat = () => {
  // State management
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User>({ username: 'guest' });
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ code: 'eng_Latn', name: 'English' });
  const [enableSearch, setEnableSearch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { addReasoning, setActiveReasoningId, getCurrentReasoning } = useReasoningStore();
  const [debugMode, setDebugMode] = useState(true); // Set to false in production
  
  const currentReasoning = getCurrentReasoning();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    try {
      setIsGenerating(true);
      const messageId = `msg_${Date.now()}`;
      setActiveReasoningId(messageId);
      
      console.log("Sending message with reasoning callback");
      
      // Add a user message to the UI immediately for better UX
      const userMessage: Message = {
        id: messageId,
        content: message,
        type: 'user',
        timestamp: new Date(),
        status: 'sending'
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Create a new chat if none exists
      if (!currentChat) {
        const newChat: Chat = {
          id: `chat_${Date.now()}`,
          title: message.length > 30 ? `${message.substring(0, 30)}...` : message,
          messages: [userMessage]
        };
        setCurrentChat(newChat);
      } else {
        // Update existing chat
        setCurrentChat({
          ...currentChat,
          messages: [...currentChat.messages, userMessage]
        });
      }
      
      const response = await generateResponse(
        message,
        user.username || 'guest',
        currentChat?.id,
        selectedLanguage?.code || 'eng_Latn',
        selectedLanguage?.name || 'English',
        enableSearch || false,
        (reasoning) => {
          if (reasoning) {
            addReasoning(messageId, reasoning);
          }
        }
      );
      
      // Process the final response
      const assistantMessage: Message = {
        id: `resp_${Date.now()}`,
        content: response.text || "I'm sorry, I couldn't generate a response.",
        type: 'assistant',
        timestamp: new Date(),
        status: 'sent'
      };
      
      // Update user message status
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'sent' } : msg
        ).concat(assistantMessage)
      );
      
      // Update chat with both messages
      if (currentChat) {
        setCurrentChat({
          ...currentChat,
          messages: [...currentChat.messages.map(msg => 
            msg.id === messageId ? { ...msg, status: 'sent' } : msg
          ), assistantMessage]
        });
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      // Update failed message status
      setMessages(prev => 
        prev.map(msg => 
          msg.id === `msg_${Date.now()}` ? { ...msg, status: 'error' } : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {console.log('Rendering MainChat with messages: *********************', messages)}
      {console.log('Current reasoning:', currentReasoning)}
      
      <MessageList 
        messages={messages}
        renderReasoning={(messageId) => {
          console.log('Rendering reasoning for message:', messageId);
          return (
            <ReasoningDisplay
              messageId={messageId}
              isGenerating={isGenerating}
              isDarkMode={isDarkMode}
              reasoning={currentReasoning}
              isCurrentMessage={messageId === currentReasoning?.messageId}
            />
          );
        }}
      />
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            className={`flex-grow p-2 rounded-l border ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              console.log('Key pressed:', e.key);
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                console.log('Sending message via Enter key:', e.currentTarget.value);
                handleSendMessage(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <button
            className={`p-2 rounded-r ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            onClick={(e) => {
              const input = e.currentTarget.previousSibling as HTMLInputElement;
              console.log('Sending message via button click:', input.value);
              handleSendMessage(input.value);
              input.value = '';
            }}
          >
            Send
          </button>
        </div>
      </div>
      
      {/* Include the debugger in development */}
      {debugMode && (
        <ReasoningDebugger 
          reasoning={currentReasoning} 
          isGenerating={isGenerating} 
        />
      )}
    </div>
  );
};

export default MainChat;
