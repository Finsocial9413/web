import { fetchUserChats, translateText } from "../../services/api"
import { getAuthToken, refreshSession } from "../../services/sessionService"
import { useChatMessage } from '../chat/useChatMessage';

interface Message {
  id: string
  content: string
  type: "user" | "assistant"
  timestamp: Date
  status: "sending" | "sent" | "error"
  file?: {
    name: string
    type: string
    url: string
  }
  reasoning?: string  // Add reasoning to Message interface
}

interface Chat {
  id: string
  title: string
  createdAt: Date
  messages: Message[]
  isStarred?: boolean
  isEditing?: boolean
  projectId?: string
}

export const getChatHistory = async (username: string, chatId: string) => {
  // Placeholder implementation - replace with your actual API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    messages: [
      {
        id: "1",
        content: "This is a test message from history.",
        role: "assistant",
        timestamp: new Date(),
      },
    ],
  }
}

export const loadChatHistory = async (
  username: string, 
  chatId: string,
  setIsLoadingHistory: (isLoading: boolean) => void,
  setMessages: (messages: Message[]) => void,
  setHasMessages: (hasMessages: boolean) => void
) => {
  try {
    setIsLoadingHistory(true)
    const history = await getChatHistory(username, chatId)
    console.log("Chat history fetched:", history)

    if (history && Array.isArray(history.messages)) {
      const formattedMessages: Message[] = history.messages.map((msg: any) => ({
        id: msg.id || `msg_${Date.now()}_${Math.random()}`,
        content: msg.content,
        type: msg.role === "assistant" ? "assistant" : "user", // Fixed the type here
        timestamp: new Date(msg.timestamp),
        status: "sent",
      }))

      setMessages(formattedMessages)
      setHasMessages(formattedMessages.length > 0)
    }
  } catch (error) {
    console.error("Error loading chat history:", error)
  } finally {
    setIsLoadingHistory(false)
  }
}

export const fetchFinalResponse = async (
  responseId: string,
  updateReasoning: (reasoning: string) => void,
  setFinalResponse: (response: string) => void,
) => {
  try {
    while (true) {
      console.log("📡 Fetching final response for:", responseId)

      const response = await fetch("http://saveai.tech/chat/response-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response_id: responseId }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Final response received:", data)

      // Ensure data.reasoning exists before using it
      if (data.reasoning && typeof data.reasoning === "string" && data.reasoning.trim() !== "") {
        updateReasoning(data.reasoning)
      }

      // Ensure data.response exists and is not undefined before using it
      if (data.status === "completed" && data.response && 
          typeof data.response === "string" && 
          data.response.trim() !== "" &&
          data.response !== "undefined") {
        console.log("💡 Setting final response:", data.response)
        setFinalResponse(data.response)
        return // Exit loop
      } else if (data.status === "completed") {
        // If status is completed but response is empty/undefined, provide fallback
        setFinalResponse("I'm sorry, I couldn't generate a proper response. Please try again.")
        return // Exit loop
      }

      // Wait before next poll
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  } catch (error) {
    console.error("❌ Failed to fetch AI response:", error)
    setFinalResponse("Error retrieving AI response.")
  }
}

export const handleLanguageTranslation = async (
  selectedLanguage: { code: string; name: string; nativeName: string },
  currentChat: Chat | null,
  setChats: (chats: any) => void,
  setCurrentChat: (chat: Chat | null) => void,
  setMessages: (messages: Message[]) => void,
  setIsGenerating: (isGenerating: boolean) => void
) => {
  if (!currentChat || currentChat.messages.length === 0) return
  
  try {
    setIsGenerating(true)

    const translatedMessages = await Promise.all(
      currentChat.messages.map(async (msg) => {
        try {
          const translatedContent = await translateText(msg.content, selectedLanguage.code)
          return { ...msg, content: translatedContent }
        } catch (error) {
          console.error("🚨 Error translating message:", msg.content, error)
          return msg
        }
      })
    )

    setChats((prevChats: Chat[]) =>
      prevChats.map((chat) => (chat.id === currentChat.id ? { ...chat, messages: translatedMessages } : chat))
    )

    setCurrentChat((prevChat) => (prevChat ? { ...prevChat, messages: translatedMessages } : prevChat))
    setMessages(translatedMessages)
  } catch (error) {
    console.error("🚨 Translation failed:", error)
  } finally {
    setIsGenerating(false)
  }
}

export const fetchChats = async (username: string, setChats: (chats: Chat[]) => void) => {
  if (username) {
    fetchUserChats(username)
      .then((response) => {
        if (response && response.chats && Array.isArray(response.chats)) {
          const formattedChats: Chat[] = response.chats.map((chatData) => ({
            id: chatData.chat_id,
            title: chatData.first_message || "New Chat",
            createdAt: new Date(chatData.timestamp),
            messages: [
              {
                id: `msg_${Date.now()}_${Math.random()}`,
                content: chatData.first_message,
                type: "user",
                timestamp: new Date(chatData.timestamp),
                status: "sent",
              },
            ],
            isStarred: false,
            isEditing: false,
          }))

          formattedChats.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          setChats(formattedChats)
        }
      })
      .catch((error) => {
        console.error("Error fetching chats:", error)
        setChats([])
      })
  }
}

export const handleSendMessage = async (
  inputText: string, 
  activeFilePreview: any | null,
  currentChat: Chat | null,
  isGenerating: boolean,
  userProfile: { name: string } | null,
  isSearchEnabled: boolean,
  setHasMessages: (hasMessages: boolean) => void,
  setCurrentReasoning: (reasoning: string) => void,
  setShowReasoning: (showReasoning: boolean) => void,
  setIsGenerating: (isGenerating: boolean) => void,
  setShowGreeting: (showGreeting: boolean) => void,
  setIsChatActive: (isChatActive: boolean) => void,
  setMessages: (updater: (prev: Message[]) => Message[]) => void,
  setInputText: (text: string) => void,
  resetTextAreaHeight: () => void,
  isAuthenticated: boolean,
  setIsLoginModalOpen?: (isOpen: boolean) => void,
  setIsLoginAnimated?: (isAnimated: boolean) => void,
  setCurrentChat: (chat: Chat | null) => void,
  setChats: (updater: (prev: Chat[]) => Chat[]) => void  // Add this parameter
) => {
  if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;

  // Check if user is authenticated
  if (!isAuthenticated) {
    setIsLoginAnimated?.(true);
    setIsLoginModalOpen?.(true);
    return;
  }

  // Refresh the session timestamp
  refreshSession();

  // Construct the complete message by combining input text with file URL
  let messageContent = inputText.trim();
  if (activeFilePreview?.url) {
    messageContent = `${messageContent} ${activeFilePreview.url}`;
  }

  console.log("🚀 Sending message:", { 
    inputText: messageContent, // Use the combined message
    activeFilePreview,
    currentChat,
    isNewChat: !currentChat?.id // Log if this is a new chat
  });

  setHasMessages(true);
  setCurrentReasoning("");
  setShowReasoning(false);
  setIsGenerating(true);

  let chatToUse = currentChat;
  if (!chatToUse) {
    chatToUse = {
      id: "",
      title: inputText.substring(0, 30) || "New Chat",
      createdAt: new Date(),
      messages: [], // Start with empty messages array
      isEditing: false,
    };
    console.log("📝 Created new chat object:", chatToUse);
  }

  setShowGreeting(false);
  setIsChatActive(true);

  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newMessage = {
    id: messageId,
    content: messageContent, // Use the combined message content
    type: "user" as "user", // Type assertion
    timestamp: new Date(),
    status: "sending" as "sending", // Type assertion
    file: activeFilePreview, // Include file info in the message
    reasoning: ""  // Initialize empty reasoning
  };

  console.log('⚠️ Created new message object:', { 
    id: messageId, 
    content: messageContent,
    messageObjectCreated: true
  });

  // Store a local reference we can check later
  const initialMessage = { ...newMessage };
  
  // ENSURE this message is added to the messages state immediately
  setMessages((prevMessages) => {
    console.log('📊 Previous messages state:', prevMessages.length);
    console.log('📝 Adding new USER message:', newMessage);
    const updatedMessages = [...prevMessages, newMessage];
    console.log('📈 Updated messages state:', updatedMessages.length);
    return updatedMessages;
  });
  
  // If this is a new chat, create it with this message already included
  if (!chatToUse.id) {
    chatToUse.messages = [newMessage];
    // Also update current chat immediately to include this message
    setCurrentChat({
      ...chatToUse,
      messages: [newMessage]
    });
    console.log("📌 Created new chat with message:", chatToUse);
  }
  
  setInputText("");
  resetTextAreaHeight();

  try {
    console.log("📡 Calling API for chat...");
    
    // Get auth token from session
    const authToken = getAuthToken();

    // Check if we have a current chat with an ID
    const isContinuing = Boolean(currentChat?.id);
    const apiEndpoint = isContinuing
      ? "http://saveai.tech/chat/continue"
      : "http://saveai.tech/chat/initiate";

    console.log("🌐 Using API Endpoint:", {
      type: isContinuing ? "CONTINUE CHAT" : "INITIATE CHAT",
      url: apiEndpoint,
      chatId: currentChat?.id || 'none'
    });

    const requestBody = {
      username: userProfile?.name || "user",
      message: messageContent,
      language_code: "eng_Latn",
      language_name: "English",
      enable_search: isSearchEnabled,
      ...(isContinuing ? { chat_id: currentChat.id } : {})
    };

    console.log("📤 Request Body:", requestBody);

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": authToken ? `Bearer ${authToken}` : "" 
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const apiResponse = await response.json();
    console.log("📥 API Response:", apiResponse);

    // If this was an initiate call, store the new chat_id
    if (!isContinuing && apiResponse.chat_id) {
      // Make sure we bring along our initial message
      const updatedChat = {
        ...chatToUse,
        id: apiResponse.chat_id,
        // Ensure the message is included by explicitly adding it
        messages: [...(chatToUse.messages || []), newMessage]
      };
      console.log("🔄 Setting current chat ID:", apiResponse.chat_id);
      console.log("📋 Updated chat with message:", updatedChat.messages.length);
      
      // Update the current chat with the updated chat object
      setCurrentChat(updatedChat);
      
      // Also update the chats list
      setChats(prevChats => {
        const newChats = [updatedChat, ...prevChats];
        console.log("📚 Updated chats list:", newChats.length);
        return newChats;
      });
      
      // Double-check messages state to ensure our message is there
      setMessages(currentMessages => {
        // If our initial message isn't in there for some reason, add it
        if (!currentMessages.some(msg => msg.id === initialMessage.id)) {
          console.log("🛠️ Repairing messages state - message was missing");
          return [...currentMessages, { ...initialMessage, status: "sent" as "sent" }];
        }
        return currentMessages;
      });
    }

    // Update user message status to "sent"
    setMessages((currentMessages) => {
      const updatedMessages = currentMessages.map((msg) => 
        (msg.id === messageId ? { ...msg, status: "sent" } : msg)
      );
      console.log("✅ Updated message status to sent. Message count:", updatedMessages.length);
      return updatedMessages;
    });

    // Ensure responseId exists
    if (!apiResponse.response_id) throw new Error("No response_id received from API!");

    const responseId = apiResponse.response_id;
    console.log("🎯 Extracted responseId:", responseId);

    let currentResponseReasoning = ""; // Store reasoning for the current message

    // Show reasoning as soon as we get it from initial response
    if (apiResponse.reasoning && apiResponse.reasoning.trim() !== "") {
      setCurrentReasoning(apiResponse.reasoning);
      setShowReasoning(true);
    }

    // Fetch AI final response
    console.log("🔄 Fetching final response from:", "http://saveai.tech/chat/response-status");
    await fetchFinalResponse(
      responseId,
      (reasoning) => {
        console.log("💭 Received reasoning:", reasoning);
        if (reasoning && reasoning.trim()) {
          setCurrentReasoning(reasoning);
          setShowReasoning(true);
          // Store reasoning for the current response
          currentResponseReasoning = reasoning;
        }
      },
      (finalResponse) => {
        console.log("💡 Final AI Response:", finalResponse);

        // Only add a response if we actually have content
        if (finalResponse && finalResponse !== "undefined") {
          setTimeout(() => {
            const responseMessage = {
              id: `${Date.now()}_response`,
              content: finalResponse,
              type: "assistant" as "assistant",
              timestamp: new Date(),
              status: "sent" as "sent",
              reasoning: currentResponseReasoning // Attach the reasoning to AI response
            };

            // Filter out any placeholder/malformed messages from the current messages
            setMessages((currentMessages) => {
              const filteredMessages = currentMessages.filter(msg => 
                msg.type !== 'assistant' || 
                (msg.content !== 'undefined' && 
                 !msg.content.includes('undefined\n\nReasoning:') &&
                 !msg.content.includes('Response:\nundefined'))
              );
              return [...filteredMessages, responseMessage];
            });
          }, 500);
        }
      }
    );

  } catch (error) {
    console.error("❌ Error sending message:", error);
    // Update message status to error
    setMessages((currentMessages) =>
      currentMessages.map((msg) => (msg.id === messageId ? { ...msg, status: "error" } : msg))
    );
  } finally {
    setIsGenerating(false);
  }
}

export default {
  getChatHistory,
  loadChatHistory,
  fetchFinalResponse,
  handleLanguageTranslation,
  fetchChats,
  handleSendMessage
}
