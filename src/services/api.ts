import axios from "axios"

const API_BASE_URL = "http://saveai.tech"

// Initiate a new chat
export const initiateChat = async (
  username: string,
  message: string,
  languageCode = "eng_Latn",
  languageName = "English",
  enableSearch = false,
): Promise<{ responseId: string }> => {
  try {
    console.log("Initiating chat with:", { username, message, enableSearch })

    const requestBody = {
      username,
      language_code: languageCode,
      language_name: languageName,
      enable_search: enableSearch,
      message,
    }

    console.log("Initiate Request Body:", requestBody)

    const response = await fetch(`${API_BASE_URL}/chat/initiate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("API Error Response:", errorData)
      throw new Error(errorData?.error || `Server error (${response.status}): ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Initiate API Response:", data)

    if (!data || !data.response_id) {
      throw new Error("Invalid response format from server: missing response_id")
    }

    return { responseId: data.response_id }
  } catch (error) {
    console.error("Initiate API Error:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to initiate chat: ${error.message}`)
    }
    throw new Error("Failed to initiate chat: Unknown error")
  }
}

// Replace the getResponseStatus function with this polling version
export const getResponseStatus = async (
  responseId: string,
  onReasoning?: (reasoning: string) => void,  // Callback to update reasoning
): Promise<any> => {
  try {
    console.log("Checking response status for:", responseId)
    
    const pollingInterval = 1000 // Poll every 1 second for more responsive updates
    let lastReasoning = '';  // Track the last reasoning to avoid duplicates

    // ALWAYS trigger immediate thinking state if callback provided
    if (onReasoning) {
      console.log("Triggering immediate thinking state");
      // Use setTimeout to ensure this runs after current execution context
      setTimeout(() => onReasoning(''), 0);
    }

    while (true) {
      const requestBody = { response_id: responseId }

      const response = await fetch(`${API_BASE_URL}/chat/response-status`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        console.error("Response Status API Error:", errorData)
        throw new Error(errorData?.error || `Server error (${response.status}): ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Response status data:", data.status, "Has reasoning:", !!data.reasoning);
      
      // Update reasoning as soon as we get it and if it's different from last
      if (onReasoning) {
        if (data.reasoning && data.reasoning !== lastReasoning) {
          console.log("Updating reasoning with new content");
          lastReasoning = data.reasoning;
          onReasoning(data.reasoning); // Show reasoning immediately
        } else if (data.status === "thinking" || data.status === "reasoning") {
          // Still in thinking mode, ensure animation is shown
          console.log("Still in thinking/reasoning mode");
          if (!lastReasoning) {
            onReasoning('');
          }
        }
      }

      // Once response is ready, return it
      if (data.status === "completed" || data.response || data.answer) {
        return data
      }

      // Wait for next poll
      await new Promise((resolve) => setTimeout(resolve, pollingInterval))
    }
  } catch (error) {
    console.error("Response Status API Error:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to get response status: ${error.message}`)
    }
    throw new Error("Failed to get response status: Unknown error")
  }
}


// Update the generateResponse function to better handle message-specific reasoning
export const generateResponse = async (
  message: string,
  chatId?: string,
  username: string = 'user',
  enableSearch: boolean = false,
  onReasoning?: (reasoning: string) => void,
  messageId?: string,
): Promise<any> => {
  try {
    console.log("Generate response with reasoning callback:", !!onReasoning);
    
    // Store the message ID for reasoning tracking
    const currentMessageId = messageId || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Load previous reasonings from sessionStorage to ensure we don't lose them
    const existingReasonings = getAllStoredReasonings();
    
    // Create a wrapped callback that saves reasoning to storage regardless of UI state
    const persistentCallback = onReasoning 
      ? (reasoning: string) => {
          // Always save to session storage first
          saveMessageReasoning(currentMessageId, reasoning);
          
          // Then update the UI by calling the original callback
          onReasoning(reasoning);
        }
      : undefined;
    
    // If chatId is provided, continue existing chat
    if (chatId) {
      const response = await continueChat(
        username, 
        chatId, 
        message, 
        "eng_Latn", 
        "English", 
        enableSearch, 
        persistentCallback
      );
      
      // If no callback was provided but we still got reasoning, save it
      if (!persistentCallback && response.reasoning) {
        await saveMessageReasoning(currentMessageId, response.reasoning);
      }
      
      return response;
    }

    // Otherwise, start a new chat
    const { responseId } = await initiateChat(username, message, "eng_Latn", "English", enableSearch);

    // Poll for the response, passing the persistent callback
    const response = await getResponseStatus(responseId, persistentCallback);
    
    // If no callback was provided but we still got reasoning, save it
    if (!persistentCallback && response.reasoning) {
      await saveMessageReasoning(currentMessageId, response.reasoning);
    }
    
    return response;
  } catch (error) {
    console.error("Generate Response Error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate response: ${error.message}`);
    }
    throw new Error("Failed to generate response: Unknown error");
  }
}

// Keep these utility functions from the original code
export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  return text // Placeholder implementation
}

export const getChatHistory = async (email: string, chatId?: string): Promise<any> => {
  try {
    const baseUrl = `${API_BASE_URL}/chat/${encodeURIComponent(email)}/history`
    const url = chatId ? `${baseUrl}?chat_id=${chatId}` : baseUrl

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.error || `Failed to fetch chat history (${response.status}): ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching chat history:", error)
    // Return empty array instead of throwing error when server is offline
    return { messages: [] }
  }
}

export const fetchUserChats = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/chat/initiate`,
      {
        username: email,
        language_code: "eng_Latn",
        language_name: "English",
        enable_search: false,
        message: "", // Send an empty message if required
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch chats:", error)
    return []
  }
}

// Ensure reasoning callback is triggered immediately even for continued chats
const continueChat = async (
  username: string,
  chatId: string,
  message: string,
  languageCode: string,
  languageName: string,
  enableSearch: boolean,
  onReasoning?: (reasoning: string) => void,
): Promise<any> => {
  try {
    const requestBody = {
      username,
      chat_id: chatId,
      message,
      language_code: languageCode,
      language_name: languageName,
      enable_search: enableSearch,
    }

    // ALWAYS trigger thinking state immediately if callback provided
    if (onReasoning) {
      console.log("Triggering immediate thinking state for continued chat");
      setTimeout(() => onReasoning(''), 0);
    }

    const response = await fetch(`${API_BASE_URL}/chat/continue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("Continue Chat API Error:", errorData)
      throw new Error(errorData?.error || `Server error (${response.status}): ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Continue Chat API Response:", data)
    
    // Always set up polling for reasoning updates if callback provided
    if (onReasoning) {
      if (data.response_id) {
        // Use response_id for polling if available
        return await getResponseStatus(data.response_id, onReasoning);
      } else {
        // If no polling possible, at least ensure thinking state is shown
        // and the final response is returned
        return data;
      }
    }
    
    return data
  } catch (error) {
    console.error("Continue Chat API Error:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to continue chat: ${error.message}`)
    }
    throw new Error("Failed to continue chat: Unknown error")
  }
}

/**
 * Save reasoning for a specific message - Extra robust implementation
 */
export const saveMessageReasoning = async (messageId: string, reasoning: string): Promise<void> => {
  if (!messageId) {
    console.warn("Cannot save reasoning: invalid messageId");
    return;
  }
  
  // Never overwrite existing reasoning with empty reasoning
  if (!reasoning) {
    console.log(`Skipping storage of empty reasoning for ${messageId}`);
    return;
  }
  
  // Store in session storage for immediate access
  try {
    // First, get fresh data from storage
    const storedReasonings = getAllStoredReasonings();
    
    // Check if we already have this reasoning
    const existing = storedReasonings[messageId];
    if (existing && existing === reasoning) {
      // Skip if identical to avoid unnecessary writes
      return;
    }
    
    // Never replace a longer reasoning with a shorter one
    // This prevents partial/incomplete updates from overwriting full reasoning
    if (existing && existing.length > reasoning.length) {
      console.log(`Skipping update: existing reasoning (${existing.length} chars) longer than new (${reasoning.length} chars)`);
      return;
    }
    
    // Save the new reasoning
    storedReasonings[messageId] = reasoning;
    sessionStorage.setItem('chatReasonings', JSON.stringify(storedReasonings));
    
    // Also create a backup in localStorage
    try {
      const backupKey = `reasoning_backup_${messageId}`;
      localStorage.setItem(backupKey, reasoning);
    } catch (backupError) {
      console.warn('Failed to create backup in localStorage:', backupError);
    }
    
    console.log(`Successfully saved reasoning for ${messageId} (${reasoning.length} chars)`);
  } catch (error) {
    console.error('Error saving reasoning to sessionStorage:', error);
  }
};

/**
 * Fetch reasoning for a specific message
 */
export const fetchMessageReasoning = async (messageId: string, username?: string, chatId?: string): Promise<string | null> => {
  if (!username || !chatId) {
    console.warn('Unable to fetch reasoning: username or chatId not provided');
    return null;
  }

  try {
    // Use the detailed history API to get all messages with reasoning
    const historyData = await fetchDetailedChatHistory(username, chatId);
    
    // Find the message with the given ID
    const messages = historyData?.messages || [];
    const targetMessage = messages.find((msg: any) => msg.id === messageId);
    
    // Return reasoning if found
    return targetMessage?.reasoning || null;
  } catch (error) {
    console.error(`Error fetching reasoning for message ${messageId}:`, error);
    return null;
  }
};

/**
 * Fetch reasonings for multiple messages (batch API)
 */
export const fetchMultipleReasonings = async (messageIds: string[]): Promise<{[key: string]: string}> => {
  try {
    const response = await fetch('/api/messages/reasoning/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageIds,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch reasonings: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.reasonings || {};
  } catch (error) {
    console.error('Error fetching multiple reasonings:', error);
    throw error;
  }
};

/**
 * Fetch detailed chat history including reasoning data
 */
export const fetchDetailedChatHistory = async (username: string, chatId: string): Promise<any> => {
  try {
    console.log(`Fetching detailed chat history for user ${username}, chat ${chatId}`);
    
    // Using chat_id in the request body as expected by the API
    const response = await fetch(`${API_BASE_URL}/chat/detailed-history`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        chat_id: chatId  // This is the key change - using chat_id in the request body
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Detailed History API Error:", errorData);
      throw new Error(errorData?.error || `Server error (${response.status}): ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Detailed History API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching detailed chat history:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch detailed history: ${error.message}`);
    }
    throw new Error("Failed to fetch detailed history: Unknown error");
  }
};

// Ensure getAllStoredReasonings is extra robust
export const getAllStoredReasonings = (): {[messageId: string]: string} => {
  let result: {[messageId: string]: string} = {};
  
  try {
    // Try to get from sessionStorage
    const storedData = sessionStorage.getItem('chatReasonings');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (parsed && typeof parsed === 'object') {
        result = parsed;
      }
    }
    
    // Look for individual backups in localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('reasoning_backup_')) {
          const messageId = key.replace('reasoning_backup_', '');
          const backupValue = localStorage.getItem(key);
          
          // Only use backup if we don't have this value already or if it's longer
          if (backupValue && (!result[messageId] || backupValue.length > result[messageId].length)) {
            result[messageId] = backupValue;
            console.log(`Restored reasoning for ${messageId} from backup`);
          }
        }
      }
    } catch (backupError) {
      console.warn('Error checking localStorage backups:', backupError);
    }
    
    return result;
  } catch (error) {
    console.error('Error retrieving reasonings:', error);
    return {};
  }
};

