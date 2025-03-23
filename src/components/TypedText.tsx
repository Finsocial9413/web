import { useState, useEffect, useRef } from 'react';

interface TypedTextProps {
  text: string;
  typingSpeed?: number;
  isDarkMode: boolean;
  className?: string;
}

const TypedText: React.FC<TypedTextProps> = ({ 
  text, 
  typingSpeed = 20, 
  isDarkMode,
  className = ''
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textRef = useRef('');
  const indexRef = useRef(0);
  
  useEffect(() => {
    // Reset the typing when text changes
    textRef.current = text;
    indexRef.current = 0;
    setDisplayedText('');
    setIsTyping(true);
    
    const typeText = () => {
      if (indexRef.current < textRef.current.length) {
        setDisplayedText(prev => prev + textRef.current.charAt(indexRef.current));
        indexRef.current++;
        
        // Schedule next character
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };
    
    // Start typing
    if (text) {
      setTimeout(typeText, typingSpeed);
    }
    
    return () => {
      // Clear all timeouts when component unmounts or text changes
      setIsTyping(false);
    };
  }, [text, typingSpeed]);
  
  // Show cursor only during typing
  return (
    <div className={className}>
      {displayedText}
      {isTyping && (
        <span className={`animate-pulse ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>▋</span>
      )}
    </div>
  );
};

export default TypedText;
