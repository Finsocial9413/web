import { useEffect, useState } from 'react';

interface ThinkingAnimationProps {
  isDarkMode: boolean;
}

const ThinkingAnimation: React.FC<ThinkingAnimationProps> = ({ isDarkMode }) => {
  const [dots, setDots] = useState('.'); 
  const [text, setText] = useState('');
  const placeholderText = "I'm thinking about your question. Let me analyze this carefully...";
  
  // Animated dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 500);
    
    return () => clearInterval(dotInterval);
  }, []);
  
  // Typing animation for placeholder text
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(placeholderText.slice(0, index));
      index++;
      
      if (index > placeholderText.length) {
        index = 0; // Reset to create a loop effect
        setTimeout(() => {
          setText('');
        }, 1000);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <div className={`rounded-lg p-4 mb-4 ${isDarkMode ? 'bg-gray-800/95' : 'bg-gray-100/95'} border ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex items-center mb-2">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
        } animate-pulse`}>
          <i className="fas fa-brain text-white text-xs"></i>
        </div>
        <span className={`ml-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Thinking{dots}
        </span>
      </div>
      
      <div className="pl-8">
        <p className={`blur-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} min-h-[1.5rem]`}>
          {text}
        </p>
        {/* Add multiple lines of blurred text for better visual effect */}
        <div className="mt-2 space-y-1">
          <div className={`blur-[3px] h-3 rounded bg-gradient-to-r ${
            isDarkMode ? 'from-gray-600 to-gray-700' : 'from-gray-300 to-gray-200'
          } w-full`}></div>
          <div className={`blur-[3px] h-3 rounded bg-gradient-to-r ${
            isDarkMode ? 'from-gray-600 to-gray-700' : 'from-gray-300 to-gray-200'
          } w-3/4`}></div>
          <div className={`blur-[3px] h-3 rounded bg-gradient-to-r ${
            isDarkMode ? 'from-gray-600 to-gray-700' : 'from-gray-300 to-gray-200'
          } w-5/6`}></div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingAnimation;
