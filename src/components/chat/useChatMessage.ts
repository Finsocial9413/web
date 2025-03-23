import { useState } from 'react';
import { ChatService } from './ChatService';

export const useChatMessage = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const sendMessage = async ({
    message,
    chatId,
    username,
    enableSearch = false,
    language = { code: 'eng_Latn', name: 'English' },
    onReasoning,
    onComplete
  }: {
    message: string;
    chatId?: string;
    username: string;
    enableSearch?: boolean;
    language?: { code: string; name: string };
    onReasoning: (reasoning: string) => void;
    onComplete: (response: string) => void;
  }) => {
    try {
      setIsGenerating(true);

      const request = {
        username,
        message,
        language_code: language.code,
        language_name: language.name,
        enable_search: enableSearch
      };

      // Choose between initiate or continue based on chatId
      const response = chatId 
        ? await ChatService.continueChat({ ...request, chat_id: chatId })
        : await ChatService.initiateChat(request);

      if (!response.response_id) {
        throw new Error('No response ID received');
      }

      // Process the response
      await ChatService.processChatResponse(
        response.response_id,
        onReasoning,
        onComplete
      );

    } catch (error) {
      console.error('Error in chat message:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    sendMessage,
    isGenerating
  };
};
