import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReasoningDebuggerProps {
  reasoning: string | null;
  isGenerating: boolean;
  isTransitioning?: boolean;
  isDarkMode?: boolean;
}

/**
 * Component to display reasoning with smooth transitions
 * Uses framer-motion for better animations
 */
const ReasoningDebugger: React.FC<ReasoningDebuggerProps> = ({ 
  reasoning, 
  isGenerating,
  isTransitioning = false,
  isDarkMode = false
}) => {
  // Add local state to handle transitions smoothly
  const [displayedReasoning, setDisplayedReasoning] = useState<string | null>(reasoning);
  const reasoningRef = useRef<string | null>(reasoning);
  const isFirstRender = useRef(true);
  
  // Update displayed reasoning with a smooth transition
  useEffect(() => {
    // Skip first render to prevent initial animation
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayedReasoning(reasoning);
      reasoningRef.current = reasoning;
      return;
    }
    
    // Always keep the ref updated for immediate access
    reasoningRef.current = reasoning || reasoningRef.current;
    
    // If we have reasoning or we already had reasoning before
    if (reasoning) {
      // Don't immediately update during transitions for smoother UX
      if (isGenerating || isTransitioning) {
        // Use a short delay for a better visual transition
        const timer = setTimeout(() => {
          setDisplayedReasoning(reasoning);
        }, 300);
        return () => clearTimeout(timer);
      } else {
        setDisplayedReasoning(reasoning);
      }
    }
  }, [reasoning, isGenerating, isTransitioning]);
  
  // If no reasoning has ever been displayed and we're not generating, don't show the debugger
  if (!displayedReasoning && !isGenerating && !isTransitioning) return null;
  
  // Show a loading state when generating but keep the previous reasoning visible
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed bottom-4 right-4 
          w-96 max-h-[80vh]
          rounded-lg shadow-lg 
          overflow-hidden
          ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}
          ${!displayedReasoning && (isGenerating || isTransitioning) ? 'opacity-80' : 'opacity-100'}
          border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        `}
      >
        <div className={`
          flex items-center justify-between p-3 
          border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <h3 className="font-medium">AI Reasoning</h3>
          {(isGenerating || isTransitioning) && (
            <div className="flex items-center">
              <span className={`mr-2 text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                {isGenerating ? 'Thinking...' : 'Updating'}
              </span>
              <div className="relative w-5 h-5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 border-2 
                    border-t-blue-500 border-r-transparent 
                    border-b-transparent border-l-transparent 
                    rounded-full`}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-3rem)]">
          {/* Content with transition overlay */}
          <div className="relative">
            {(isGenerating || isTransitioning) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className={`
                  absolute inset-0 
                  ${isDarkMode ? 'bg-gray-800/30' : 'bg-white/30'} 
                  backdrop-blur-[1px] z-10
                `}
              />
            )}
            
            <motion.pre
              key={displayedReasoning}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              className={`
                whitespace-pre-wrap text-sm font-mono 
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
              `}
            >
              {displayedReasoning || "Preparing reasoning..."}
            </motion.pre>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReasoningDebugger;
