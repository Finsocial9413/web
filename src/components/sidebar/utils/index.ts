export const formatTimestamp = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date >= today) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date >= yesterday) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Date error";
  }
};

export const truncateMessage = (message: string, maxLength: number = 25): string => {
  if (!message || message.trim().length === 0) {
    return "New Chat";
  }
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
};
