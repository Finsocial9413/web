import React, { useEffect, useState, useRef } from 'react';
import { getAllStoredReasonings } from '../services/api';

interface ReasoningDisplayProps {
  messageId: string;
  reasoning: string | null;
  isGenerating: boolean;
  isCurrentMessage: boolean;
  isDarkMode?: boolean;
}

const ReasoningDisplay: React.FC<ReasoningDisplayProps> = ({
  messageId,
  reasoning,
  isGenerating,
  isCurrentMessage,
  isDarkMode = false
}) => {
  // Keep a local copy of reasoning to prevent it from disappearing
  const [localReasoning, setLocalReasoning] = useState<string | null>(reasoning);
  
  // Track whether we've ever had content for this reasoning
  const hadContent = useRef<boolean>(!!reasoning);
  
  // Check storage for existing reasoning on mount
  useEffect(() => {
    if (messageId) {
      try {
        const allReasonings = getAllStoredReasonings();
        if (allReasonings[messageId]) {
          setLocalReasoning(allReasonings[messageId]);
          hadContent.current = true;
          console.log(`Loaded existing reasoning for ${messageId} on mount`);
        }
      } catch (error) {
        console.error('Error loading reasoning from storage on mount:', error);
      }
    }
  }, [messageId]);
  
  // Update local reasoning when the prop changes, but NEVER revert to null if we had content
  useEffect(() => {
    if (reasoning) {
      console.log(`Updating local reasoning for ${messageId} from props`);
      setLocalReasoning(reasoning);
      hadContent.current = true;
    }
  }, [reasoning, messageId]);

  // Save our local reasoning to storage if changed
  useEffect(() => {
    if (localReasoning && messageId) {
      try {
        const allReasonings = getAllStoredReasonings();
        // Only update if we have new content
        if (!allReasonings[messageId] || allReasonings[messageId] !== localReasoning) {
          allReasonings[messageId] = localReasoning;
          sessionStorage.setItem('chatReasonings', JSON.stringify(allReasonings));
          console.log(`Saved local reasoning for ${messageId} to storage`);
        }
      } catch (error) {
        console.error('Error updating reasoning in storage:', error);
      }
    }
  }, [messageId, localReasoning]);

  // Poll storage periodically to ensure we have the latest data
  useEffect(() => {
    if (!messageId) return;
    
    const checkStorage = () => {
      try {
        const allReasonings = getAllStoredReasonings();
        if (allReasonings[messageId] && (!localReasoning || localReasoning !== allReasonings[messageId])) {
          console.log(`Found updated reasoning for ${messageId} in storage, updating component`);
          setLocalReasoning(allReasonings[messageId]);
          hadContent.current = true;
        }
      } catch (error) {
        console.error('Error checking storage for reasoning updates:', error);
      }
    };
    
    // Check immediately
    checkStorage();
    
    // Then set up an interval for periodic checks
    const intervalId = setInterval(checkStorage, 1000);
    return () => clearInterval(intervalId);
  }, [messageId, localReasoning]);

  // Don't display anything if there's no reasoning and this isn't the current message being processed
  if (!localReasoning && !hadContent.current && (!isGenerating || !isCurrentMessage)) {
    return null;
  }

  const bgColor = isDarkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(240, 240, 240, 0.9)';
  const textColor = isDarkMode ? '#e0e0e0' : '#333';
  const borderColor = isDarkMode ? 'rgba(100, 100, 100, 0.5)' : 'rgba(200, 200, 200, 0.8)';
  
  return (
    <div
      className="reasoning-container"
      data-message-id={messageId}
      style={{
        padding: '10px 14px',
        marginTop: '6px',
        backgroundColor: bgColor,
        borderRadius: '8px',
        color: textColor,
        fontSize: '13px',
        lineHeight: '1.5',
        borderLeft: `3px solid ${borderColor}`,
        position: 'relative',
        overflow: 'hidden',
        maxHeight: '200px',
        overflowY: 'auto',
      }}
    >
      <div style={{ marginBottom: '4px', fontSize: '11px', color: isDarkMode ? '#aaa' : '#666' }}>
        Thinking process: <span style={{ color: isDarkMode ? '#888' : '#999', fontSize: '9px' }}>(message {messageId.substring(0, 6)})</span>
      </div>

      {isGenerating && isCurrentMessage && !localReasoning && !hadContent.current ? (
        <div className="thinking-animation" style={{ color: isDarkMode ? '#aaa' : '#666' }}>
          Thinking...
        </div>
      ) : (
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {localReasoning || ''}
        </div>
      )}
    </div>
  );
};

export default ReasoningDisplay;
