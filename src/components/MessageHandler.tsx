import React, { useMemo } from 'react';
import { UserIcon, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageHandlerProps {
  content: string;
  type: 'user' | 'assistant';
  isDarkMode: boolean;
  file?: any;
  status?: string;
  timestamp?: Date;
  renderMessageStatus?: (status: any) => React.ReactNode;
  parseMessageContent?: (content: string) => any[];
  handleCodeBlockClick?: (content: string, language: string) => void;
}

const MessageHandler: React.FC<MessageHandlerProps> = ({
  content,
  type,
  isDarkMode,
  file,
  status,
  renderMessageStatus,
  parseMessageContent,
  handleCodeBlockClick,
}) => {
  // Clean up content by removing undefined placeholders
  const cleanContent = useMemo(() => {
    if (!content) return '';
    
    // Handle malformed content
    if (content === 'undefined' || content.includes('undefined\n\nReasoning:')) {
      return "I'm processing your request...";
    }
    
    // Extract just the response if needed
    if (content.includes('Response:')) {
      const parts = content.split('Response:');
      if (parts.length > 1) {
        return parts[1].trim();
      }
    }
    
    return content;
  }, [content]);

  // Handle code blocks if present
  const renderedContent = useMemo(() => {
    if (!cleanContent) return null;
    
    if (parseMessageContent) {
      try {
        const parts = parseMessageContent(cleanContent);
        
        if (!parts || parts.length === 0) {
          return <p className="whitespace-pre-wrap">{cleanContent}</p>;
        }
        
        return parts.map((part, i) => {
          if (part.type === 'text') {
            return <p key={i} className="whitespace-pre-wrap">{part.content}</p>;
          } 
          else if (part.type === 'code' && handleCodeBlockClick) {
            return (
              <div 
                key={i} 
                className="my-2 p-3 bg-black/20 rounded-md cursor-pointer hover:bg-black/30"
                onClick={() => handleCodeBlockClick(part.content, part.language || 'text')}
              >
                <div className="flex items-center mb-1">
                  <i className="fas fa-code mr-2"></i>
                  <span className="text-sm font-medium">{part.language || 'Code'}</span>
                </div>
                <pre className="overflow-x-auto max-h-60">
                  <code>{part.content}</code>
                </pre>
              </div>
            );
          }
          return null;
        });
      } catch (error) {
        return <p className="whitespace-pre-wrap">{cleanContent}</p>;
      }
    }
    
    return <p className="whitespace-pre-wrap">{cleanContent}</p>;
  }, [cleanContent, parseMessageContent, handleCodeBlockClick]);

  // User message bubble
  if (type === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 mb-6 justify-end"
      >
        <div className={`rounded-lg p-4 max-w-[80%] ${isDarkMode ? 'bg-blue-700' : 'bg-blue-500 text-white'}`}>
          {renderedContent}
          {renderMessageStatus && status && (
            <div className="mt-2 text-right text-xs opacity-75">
              {renderMessageStatus(status)}
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      </motion.div>
    );
  }

  // Assistant message bubble
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 mb-6"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
        <Bot className="w-5 h-5 text-white" />
      </div>
      
      <div className={`rounded-lg p-4 max-w-[80%] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {renderedContent}
        {renderMessageStatus && status && (
          <div className="mt-2 text-right text-xs opacity-75">
            {renderMessageStatus(status)}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(MessageHandler);
