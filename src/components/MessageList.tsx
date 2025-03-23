import React from 'react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
}

interface MessageListProps {
  messages: Message[];
  renderReasoning: (messageId: string) => React.ReactNode;
}

const MessageList: React.FC<MessageListProps> = ({ messages, renderReasoning }) => {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <div 
          key={message.id}
          className={`flex flex-col ${
            message.type === 'user' ? 'items-end' : 'items-start'
          }`}
        >
          <div 
            className={`max-w-[80%] rounded-lg p-3 ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-bl-none'
            }`}
          >
            {message.content}
            {message.status === 'sending' && (
              <span className="ml-2 text-xs opacity-70">
                <i className="fas fa-circle-notch fa-spin"></i>
              </span>
            )}
            {message.status === 'error' && (
              <span className="ml-2 text-xs text-red-400">
                <i className="fas fa-exclamation-circle"></i>
              </span>
            )}
          </div>
          
          {/* Display reasoning for assistant messages */}
          {message.type === 'assistant' && renderReasoning(message.id)}
          
          <div className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
