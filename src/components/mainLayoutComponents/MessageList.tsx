import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Message } from "./types"
import LoadingDots from '../LoadingDots';
import MessageHandler from '../MessageHandler';
import { Bot } from 'lucide-react';

interface MessageListProps {
  messages: Message[]
  isDarkMode: boolean
  isGenerating: boolean
  parseMessageContent: (content: string) => { type: string; content: string; language?: string }[]
  handleCodeBlockClick: (content: string, language: string) => void
  renderMessageStatus: (status: Message["status"]) => React.ReactNode
  messagesEndRef: React.RefObject<HTMLDivElement>
  // Keep necessary props
  username: string
  chatId?: string
  setIsCodeSliderOpen?: (isOpen: boolean) => void
}

const MessageList: React.FC<MessageListProps> = ({
  messages = [],
  isDarkMode,
  isGenerating,
  parseMessageContent,
  handleCodeBlockClick,
  renderMessageStatus,
  messagesEndRef,
  username,
  chatId,
  setIsCodeSliderOpen,
}) => {
  // Add safety check at the start of component
  if (!Array.isArray(messages)) {
    console.error('Messages is not an array:', messages);
    return null;
  }
  
  // Simplified function to handle code detection and slider
  const handleCodeDetection = useCallback((content: string, language: string) => {
    handleCodeBlockClick(content, language);
    if (setIsCodeSliderOpen) {
      setIsCodeSliderOpen(true);
    }
  }, [handleCodeBlockClick, setIsCodeSliderOpen]);

  // Simplified renderMessage function - keep only one implementation
  const renderMessage = useCallback((message: Message, index: number) => {
    // Simple logging for debugging
    console.log(`Rendering message ${index}:`, { 
      id: message.id, 
      type: message.type,
      status: message.status
    });

    // Skip malformed messages
    if (!message.content || message.content === 'undefined') {
      return null;
    }

    return (
      <MessageHandler
        key={`${message.type}-${message.id || Date.now()}-${index}`}
        content={message.content || ''}
        type={message.type}
        isDarkMode={isDarkMode}
        file={message.file}
        status={message.status}
        timestamp={message.timestamp}
        renderMessageStatus={renderMessageStatus}
        parseMessageContent={parseMessageContent}
        handleCodeBlockClick={handleCodeDetection}
      />
    );
  }, [isDarkMode, renderMessageStatus, parseMessageContent, handleCodeDetection]);

  // Simple effect to scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, messagesEndRef]);

  return (
    <div className="flex-1 overflow-y-auto px-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">No messages yet</div>
      ) : (
        <>
          {messages.map((message, index) => renderMessage(message, index))}
        </>
      )}

      {/* Show loading indicator only when actually generating */}
      {isGenerating && (
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <LoadingDots isDarkMode={isDarkMode} />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

// Use simple memo for performance
export default React.memo(MessageList);
