import React, { useState, useEffect, useContext, useRef } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';

// Code Context to manage the Code Slider state
export const CodeContext = React.createContext<{
  setIsCodeSliderOpen?: (isOpen: boolean) => void;
}>({});

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);

interface CodeBlockProps {
  code: string;
  language: string;
  isDarkMode: boolean;
  onCodeComplete?: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  isDarkMode,
  onCodeComplete 
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const { setIsCodeSliderOpen } = useContext(CodeContext);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Store timeouts to clear later

  // Open Code Slider when code changes
  useEffect(() => {
    if (setIsCodeSliderOpen) setIsCodeSliderOpen(true);
  }, [code, setIsCodeSliderOpen]);

  useEffect(() => {
    let currentIndex = 0;
    const codeLines = code.split('\n');

    const generateCode = () => {
      if (currentIndex < codeLines.length) {
        setDisplayedCode(prev => prev + (prev ? '\n' : '') + codeLines[currentIndex]);
        currentIndex++;
        timeoutRef.current = setTimeout(generateCode, 50);
      } else {
        setIsGenerating(false);
        onCodeComplete?.();
      }
    };

    generateCode();

    // Cleanup function to clear timeouts
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsGenerating(false);
    };
  }, [code, onCodeComplete]);

  return (
    <div className={`relative h-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className="flex items-center">
          <span className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language}
          </span>
          {isGenerating && <span className="ml-2 text-blue-500"><i className="fas fa-spinner fa-spin"></i></span>}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigator.clipboard.writeText(displayedCode)}
            className={`p-1.5 rounded-lg transition-all duration-200 ${isDarkMode 
              ? 'hover:bg-gray-600 text-gray-400 hover:text-blue-400' 
              : 'hover:bg-gray-200 text-gray-500 hover:text-blue-600'}`}
            title="Copy code"
          >
            <i className="fas fa-copy"></i>
          </button>
          <button
            onClick={() => {
              const blob = new Blob([displayedCode], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `code.${language}`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className={`p-1.5 rounded-lg transition-all duration-200 ${isDarkMode 
              ? 'hover:bg-gray-600 text-gray-400 hover:text-blue-400' 
              : 'hover:bg-gray-200 text-gray-500 hover:text-blue-600'}`}
            title="Download code"
          >
            <i className="fas fa-download"></i>
          </button>
        </div>
      </div>

      {/* Code content with auto-scroll */}
      <div className="relative h-[calc(100%-3rem)] overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={isDarkMode ? atomOneDark : githubGist}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem',
            height: '100%',
          }}
        >
          {displayedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
