import { useState, useEffect } from "react";
// Import the base package without any specific highlighter
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeSliderProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
  isDarkMode: boolean;
  onEdit?: (code: string) => void;
  onSendMessage?: (message: string) => void;
}

const CodeSlider: React.FC<CodeSliderProps> = ({
  isOpen,
  onClose,
  code,
  language,
  isDarkMode,
  onEdit,
  onSendMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableCode, setEditableCode] = useState(code);

  useEffect(() => {
    setEditableCode(code);
  }, [code]);

  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const getFileExtension = (language: string): string => {
    const extensionMap: {[key: string]: string} = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      csharp: 'cs',
      cpp: 'cpp',
      c: 'c',
      php: 'php',
      ruby: 'rb',
      go: 'go',
      rust: 'rs',
      swift: 'swift',
      kotlin: 'kt',
      html: 'html',
      css: 'css',
      scss: 'scss',
      sql: 'sql',
      bash: 'sh',
      shell: 'sh',
      powershell: 'ps1',
      dockerfile: 'dockerfile',
      yaml: 'yml',
      json: 'json',
      xml: 'xml',
      markdown: 'md',
      plaintext: 'txt'
    };

    const normalizedLang = language.toLowerCase();
    return extensionMap[normalizedLang] || 'txt';
  };

  // Enhanced copy code handler with better error handling
  const handleCopyCode = async () => {
    console.log("Copy button clicked");
    try {
      // Use the current editable code instead of the original code
      const textToCopy = isEditing ? editableCode : code;
      
      // Try the modern clipboard API first
      await navigator.clipboard.writeText(textToCopy);
      showNotification('Copied to clipboard!');
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      
      // Fallback method for older browsers
      try {
        const textarea = document.createElement('textarea');
        textarea.value = isEditing ? editableCode : code;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copied to clipboard!');
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError);
        showNotification('Failed to copy code', 'error');
      }
    }
  };

  const handleDownload = () => {
    try {
      const fileExtension = getFileExtension(language);
      const blob = new Blob([code], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `code_${timestamp}.${fileExtension}`;
      
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showNotification('File downloaded successfully!');
    } catch (error) {
      showNotification('Failed to download file', 'error');
      console.error('Download error:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onEdit) {
      onEdit(editableCode);
    }
    showNotification('Changes saved successfully!');
  };

  // Always show chat input - we're removing the conditional display
  const [chatMessage, setChatMessage] = useState('');

  const handleSendMessage = () => {
    if (chatMessage.trim() && onSendMessage) {
      // Validate message content before sending
      const messageContent = chatMessage.trim();
      if (messageContent.length > 0) {
        onSendMessage(messageContent);
        setChatMessage('');
        showNotification('Message sent!');
      } else {
        showNotification('Please enter a valid message', 'error');
      }
    }
  };

  // Add error boundary for message handling
  const validateMessage = (message: string) => {
    return typeof message === 'string' && message.trim().length > 0;
  };

  // Enhanced close handler with debugging
  const handleClose = () => {
    console.log("Close button clicked");
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error("onClose is not a function");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Centered Notification */}
      <div
        className={`fixed top-6 inset-x-0 pointer-events-none flex items-start justify-center z-[60] ${
          notification.show ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-200`}
      >
        <div className={`transform transition-all duration-300 ${
          notification.show ? 'translate-y-0' : '-translate-y-4'
        }`}>
          <div className={`px-6 py-3 rounded-lg shadow-xl backdrop-blur-sm flex items-center space-x-2 ${
            notification.type === 'success'
              ? isDarkMode
                ? 'bg-green-500/90 text-white'
                : 'bg-green-100/95 text-green-800'
              : isDarkMode
                ? 'bg-red-500/90 text-white'
                : 'bg-red-100/95 text-red-800'
          }`}>
            <i className={`fas ${
              notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
            }`}></i>
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet overlay */}
      <div className="lg:hidden fixed inset-0 z-40">
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      
        {/* Modified slider panel for better mobile responsiveness */}
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[calc(100%-2rem)] md:w-3/4 lg:w-2/3 
            transform transition-transform duration-300 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          } shadow-xl overflow-hidden flex flex-col`}
        >
          {/* Header - modified for mobile */}
          <div
            className={`flex items-center justify-between p-3 sm:p-4 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-hidden">
              <div
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm truncate ${
                  isDarkMode
                    ? 'bg-gray-800 text-blue-400'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                {language}
              </div>
              <h3 className={`font-medium text-sm sm:text-base truncate ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Code Preview
              </h3>
            </div>

            {/* Action buttons - modified for mobile */}
            <div className="flex items-center">
              <button
                onClick={isEditing ? handleSave : handleEdit}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-blue-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
                aria-label="Edit code"
              >
                <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'} text-sm sm:text-base`}></i>
              </button>
              <button
                onClick={() => handleCopyCode()}
                className={`p-2 rounded-lg transition-colors z-50 ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-green-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-green-600'
                }`}
                aria-label="Copy code"
                title="Copy code to clipboard"
              >
                <i className="fas fa-copy text-sm sm:text-base"></i>
              </button>
              <button
                onClick={() => handleDownload()}
                className={`p-2 rounded-lg transition-colors z-50 ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-blue-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
                aria-label="Download code"
                title="Download code file"
              >
                <i className="fas fa-download text-sm sm:text-base"></i>
              </button>
              <button
                onClick={() => handleClose()}
                className={`p-2 rounded-lg transition-colors z-50 ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-red-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
                }`}
                aria-label="Close"
                title="Close code viewer"
              >
                <i className="fas fa-times text-sm sm:text-base"></i>
              </button>
            </div>
          </div>

          {/* Code content - improved scrolling and responsiveness */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto overscroll-contain p-2 sm:p-4">
              {isEditing ? (
                <textarea
                  value={editableCode}
                  onChange={(e) => setEditableCode(e.target.value)}
                  className={`w-full h-full p-4 font-mono text-sm rounded-lg focus:ring-2 focus:ring-blue-500 
                    ${isDarkMode 
                      ? 'bg-gray-800 text-gray-200 border-gray-700' 
                      : 'bg-gray-50 text-gray-800 border-gray-200'
                    } border resize-none`}
                  spellCheck="false"
                />
              ) : (
                <pre
                  className={`rounded-lg p-3 sm:p-4 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  } overflow-x-auto`}
                >
                  <code
                    className={`language-${language.toLowerCase()} ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    } text-sm sm:text-base font-mono whitespace-pre-wrap break-all`}
                  >
                    {editableCode}
                  </code>
                </pre>
              )}
            </div>
          </div>

          {/* Mobile action bar - only shows on small screens */}
          <div className={`sm:hidden flex items-center justify-around p-3 border-t ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
          }`}>
            <button
              onClick={() => handleCopyCode()}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg z-50 ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-200 active:bg-gray-600 hover:bg-green-700/70'
                  : 'bg-white text-gray-700 active:bg-gray-100 hover:bg-green-100'
              } shadow-sm`}
              title="Copy code to clipboard"
            >
              <i className="fas fa-copy"></i>
              <span>Copy</span>
            </button>
            <button
              onClick={() => handleDownload()}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg z-50 ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-200 active:bg-gray-600 hover:bg-blue-700/70'
                  : 'bg-white text-gray-700 active:bg-gray-100 hover:bg-blue-100'
              } shadow-sm`}
              title="Download code file"
            >
              <i className="fas fa-download"></i>
              <span>Download</span>
            </button>
            <button
              onClick={() => handleClose()}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg z-50 ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-200 active:bg-gray-600 hover:bg-red-700/70'
                  : 'bg-white text-gray-700 active:bg-gray-100 hover:bg-red-100'
              } shadow-sm`}
            >
              <i className="fas fa-times"></i>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop fixed panel */}
      <div className={`hidden lg:block fixed right-0 top-0 bottom-0 w-[60%] z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      >
        {/* Semi-transparent backdrop */}
        <div className={`absolute inset-0 ${
          isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'
        } backdrop-blur-sm -z-10`} onClick={handleClose} />
        
        <div className={`w-full h-full flex flex-col ${
          isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
        } shadow-xl border-l ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            
            {/* <button
              onClick={isEditing ? handleSave : handleEdit}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'}`}></i>
            </button> */}
            
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm ${
                isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                {language}
              </span>
   
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleCopyCode()}
                className={`p-2 rounded-lg z-50 ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-green-400' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-green-600'
                }`}
                title="Copy code to clipboard"
                style={{ position: 'relative', zIndex: 60 }}
              >
                {/* <i className="fas fa-copy text-lg"></i> */}
              </button>
              <button 
                onClick={() => handleDownload()}
                className={`p-2 rounded-lg z-50 ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-blue-400' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
                title="Download code file"
                style={{ position: 'relative', zIndex: 60 }}
              >
                {/* <i className="fas fa-download text-lg"></i> */}
              </button>
              <button 
                onClick={() => handleClose()}
                className={`p-2 rounded-lg z-50 ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-red-400' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
                }`}
                title="Close code viewer"
                style={{ position: 'relative', zIndex: 60 }}
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
          </div>

          {/* Code content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto p-4">
              {isEditing ? (
                <textarea
                  value={editableCode}
                  onChange={(e) => setEditableCode(e.target.value)}
                  className={`w-full h-full p-4 font-mono text-sm rounded-lg focus:ring-2 focus:ring-blue-500 
                    ${isDarkMode 
                      ? 'bg-gray-800 text-gray-200 border-gray-700' 
                      : 'bg-gray-50 text-gray-800 border-gray-200'
                    } border resize-none`}
                  spellCheck="false"
                />
              ) : (
                <SyntaxHighlighter
                  language={language.toLowerCase()}
                  style={isDarkMode ? atomOneDark : githubGist}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    height: '100%',
                    fontSize: '14px',
                    backgroundColor: isDarkMode ? '#1f2937' : '#f9fafb',
                    color: isDarkMode ? '#e5e7eb' : '#374151'
                  }}
                >
                  {editableCode}
                </SyntaxHighlighter>
              )}
            </div>
          </div>

          {/* Chat input section - always visible now */}
          {onSendMessage && (
            <div className={`p-2 sm:p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 max-w-full">
                <textarea
                  value={chatMessage}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (validateMessage(value) || value === '') {
                      setChatMessage(value);
                      // Auto-resize textarea
                      e.target.style.height = 'inherit';
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                    }
                  }}
                  placeholder="Ask about the code..."
                  className={`flex-1 w-full px-3 py-2 text-sm sm:text-base rounded-lg resize-none min-h-[40px] max-h-[200px] transition-all
                    ${isDarkMode 
                      ? 'bg-gray-800 text-gray-200 border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-800 border-gray-200 focus:border-blue-400'
                    } border focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 outline-none`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  className={`p-2 sm:p-3 rounded-lg flex-shrink-0 transition-colors ${
                    isDarkMode
                      ? chatMessage.trim() 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : chatMessage.trim() 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                  disabled={!validateMessage(chatMessage)}
                >
                  <i className="fas fa-paper-plane text-sm sm:text-base"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Replace the floating action buttons at the bottom with a top bar containing all actions */}
      <div className="fixed top-4 right-4 z-[100] flex space-x-2">
        {/* Copy button */}
        <button
          onClick={() => handleCopyCode()}
          className={`p-3 rounded-full shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 text-green-400 hover:bg-green-700' 
              : 'bg-white text-green-600 hover:bg-green-100'
          }`}
          title="Copy code to clipboard"
        >
          <i className="fas fa-copy"></i>
        </button>
        
        {/* Download button */}
        <button
          onClick={() => handleDownload()}
          className={`p-3 rounded-full shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 text-blue-400 hover:bg-blue-700' 
              : 'bg-white text-blue-600 hover:bg-blue-100'
          }`}
          title="Download code file"
        >
          <i className="fas fa-download"></i>
        </button>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`p-3 rounded-full shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 text-white hover:bg-red-700' 
              : 'bg-white text-gray-800 hover:bg-red-100'
          }`}
          title="Close code viewer"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </>
  );
};

export default CodeSlider;