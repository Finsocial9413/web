import React, { useEffect } from 'react';
import { useReasoningStore } from '../stores/reasoningStore';

interface ReasoningManagerProps {
  children: (props: {
    getReasoningForMessage: (messageId: string) => string | null;
    updateReasoningForMessage: (messageId: string, reasoning: string) => void;
    getAllReasonings: () => { [messageId: string]: string };
    currentMessageId: string | null;
    setCurrentMessageId: (id: string | null) => void;
    isTransitioning: boolean;
  }) => React.ReactNode;
}

const ReasoningManager: React.FC<ReasoningManagerProps> = ({ children }) => {
  const { 
    reasonings,
    getReasoning,
    addReasoning,
    activeReasoningId,
    setActiveReasoningId,
    isTransitioning
  } = useReasoningStore();

  useEffect(() => {
    // Load reasonings from storage on mount
    const stored = localStorage.getItem('chatReasonings');
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.entries(parsed).forEach(([id, reasoning]) => {
        addReasoning(id, reasoning as string);
      });
    }
  }, []);

  return children({
    getReasoningForMessage: getReasoning,
    updateReasoningForMessage: addReasoning,
    getAllReasonings: () => reasonings,
    currentMessageId: activeReasoningId,
    setCurrentMessageId: setActiveReasoningId,
    isTransitioning
  });
};

export default ReasoningManager;
