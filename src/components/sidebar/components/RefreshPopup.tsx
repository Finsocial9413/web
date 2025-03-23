import React from 'react';

interface RefreshPopupProps {
  showRefreshPopup: boolean;
  refreshStatus: 'idle' | 'loading' | 'success' | 'error';
  isDarkMode: boolean;
}

export const RefreshPopup: React.FC<RefreshPopupProps> = ({
  showRefreshPopup,
  refreshStatus,
  isDarkMode
}) => {
  if (!showRefreshPopup) return null;

  return (
    <div className={`absolute top-24 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {refreshStatus === 'loading' && (
        <div className="flex items-center space-x-2">
          <i className="fas fa-circle-notch fa-spin text-blue-500"></i>
          <span>Refreshing chat history...</span>
        </div>
      )}
    </div>
  );
};
