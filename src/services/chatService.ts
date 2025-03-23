import axios from 'axios';

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

export const fetchDetailedChatHistory = async (username: string, chatId: string): Promise<DetailedChatResponse> => {
  try {
    const response = await axios.post('http://saveai.tech/chat/detailed-history', {
      username,
      chat_id: chatId
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // Check if we have the new format
    if (response.data?.messages?.[0]?.prompt) {
      return response.data;
    }
    
    // If we have the old format, convert it
    if (response.data?.messages?.[0]?.content) {
      console.warn('Converting old format to new format');
      return {
        chat_id: chatId,
        messages: response.data.messages.map((msg: any) => ({
          prompt: msg.content,
          reasoning: '',
          response: msg.content,
          timestamp: msg.timestamp
        }))
      };
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching detailed chat history:', error);
    throw error;
  }
};
