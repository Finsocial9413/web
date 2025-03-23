import { useState, useCallback } from 'react';
import { ChatHistoryItem } from '../types';

export const useChatHistory = (username: string, isAuthenticated: boolean) => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [errorLoadingHistory, setErrorLoadingHistory] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchHistory = useCallback(async () => {
    // ... existing fetch logic ...
  }, [username, isAuthenticated]);

  return {
    chatHistory,
    isLoadingHistory,
    errorLoadingHistory,
    hasFetched,
    fetchHistory
  };
};
