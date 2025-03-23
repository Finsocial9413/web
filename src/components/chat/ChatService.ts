import { getAuthToken } from '../../services/sessionService';

interface ChatRequest {
  username: string;
  message: string;
  language_code?: string;
  language_name?: string;
  enable_search: boolean;
  chat_id?: string;
}

export class ChatService {
  private static API_BASE = 'http://saveai.tech';

  private static async makeRequest(endpoint: string, data: ChatRequest) {
    const authToken = getAuthToken();
    const response = await fetch(`${this.API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken ? `Bearer ${authToken}` : ''
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  private static async getFinalResponse(responseId: string) {
    const response = await fetch(`${this.API_BASE}/chat/response-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response_id: responseId }),
    });

    if (!response.ok) {
      throw new Error(`Final response error: ${response.status}`);
    }

    return response.json();
  }

  static async initiateChat(request: ChatRequest) {
    return this.makeRequest('/chat/initiate', request);
  }

  static async continueChat(request: ChatRequest & { chat_id: string }) {
    return this.makeRequest('/chat/continue', request);
  }

  static async processChatResponse(
    responseId: string,
    onReasoning: (reasoning: string) => void,
    onComplete: (response: string) => void
  ) {
    while (true) {
      const data = await this.getFinalResponse(responseId);
      
      if (data.reasoning?.trim()) {
        onReasoning(data.reasoning);
      }

      if (data.status === 'completed' && data.response) {
        onComplete(data.response);
        break;
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
