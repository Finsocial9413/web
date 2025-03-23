import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as atomOneDark, oneLight as githubGist } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface EnhancedCodeBlockProps {
  code: string;
  language: string;
  isDarkMode: boolean;
  onClick: (code: string, language: string) => void;
}

const EnhancedCodeBlock: React.FC<EnhancedCodeBlockProps> = ({ 
  code, 
  language, 
  isDarkMode,
  onClick 
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const displayLanguage = language || 'plaintext';
  
  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div 
      onClick={() => onClick(code, language)}
      className={`cursor-pointer group rounded-lg overflow-hidden mb-4 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
      }`}
    >
      <div className={`flex items-center justify-between px-4 py-2 ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <div className="flex items-center space-x-2">
          <i className="fas fa-code"></i>
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {displayLanguage}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyClick}
            className={`p-1.5 rounded-md transition-all ${
              isDarkMode 
                ? 'hover:bg-gray-600 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-200 text-gray-500 hover:text-gray-800'
            }`}
            aria-label="Copy code"
            title="Copy to clipboard"
          >
            <i className={`fas ${copySuccess ? 'fa-check' : 'fa-copy'}`}></i>
          </button>
          <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <i className="fas fa-expand-alt" title="Open in code viewer"></i>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="max-h-96 overflow-auto">
          <SyntaxHighlighter
            language={displayLanguage.toLowerCase()}
            style={isDarkMode ? atomOneDark : githubGist}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
        
        <div className={`absolute bottom-0 inset-x-0 h-8 ${
          isDarkMode 
            ? 'bg-gradient-to-t from-gray-800 to-transparent' 
            : 'bg-gradient-to-t from-gray-50 to-transparent'
        } pointer-events-none opacity-50`}></div>
      </div>
    </div>
  );
};

export default EnhancedCodeBlock;
