interface ChatMessage {
  type: 'user' | 'assistant';
  message: string;
  reasoning?: string;
  timestamp: string;
}

interface DetailedChatResponse {
  chat_id: string;
  messages: ChatMessage[];
}

interface ChatInterfaceProps {
  // ...existing props...
  currentChat: DetailedChatResponse | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  // ...existing props...
  currentChat
}) => {
  useEffect(() => {
    if (currentChat?.messages) {
      const formattedMessages = currentChat.messages.flatMap(msg => {
        if ('content' in msg) {
          // Handle legacy format
          return [{
            type: msg.role,
            message: msg.content,
            timestamp: msg.timestamp
          }];
        } else {
          // Handle detailed format
          return [
            {
              type: 'user' as const,
              message: msg.prompt,
              timestamp: msg.timestamp
            },
            {
              type: 'assistant' as const,
              message: msg.response,
              reasoning: msg.reasoning,
              timestamp: msg.timestamp
            }
          ];
        }
      });

      console.log('Formatted messages:', formattedMessages);
      setMessages(formattedMessages);
    }
  }, [currentChat]);

  // ...rest of component
};
