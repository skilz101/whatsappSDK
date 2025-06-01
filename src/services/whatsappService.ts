import type { HttpClient } from "../http/HttpClient";
import type {
  SendTextMessageRequest,
  SendMessageResponse,
  SendAddressMessageRequest,
} from "./types";

export class WhatsAppService {
  constructor(
    private http: HttpClient,
    private phoneNumberId: string,
  ) {}

  //   send text message service function
  async sendMessage(
    message: SendTextMessageRequest,
  ): Promise<SendMessageResponse> {
    const response = await this.http.request<SendMessageResponse>({
      method: "POST",
      url: `/${this.phoneNumberId}/messages`,
      headers: { "content-Type": "application/json" },
      body: message,
    });

    return response.data;
  }

  /**
   * Sends an interactive address message to request user's delivery location.
   * @param message - WhatsApp address message payload
   */
  async sendAddressMessage(
    message: SendAddressMessageRequest,
  ): Promise<SendMessageResponse> {
    const response = await this.http.request<SendMessageResponse>({
      method: "POST",
      url: `/${this.phoneNumberId}/messages`,
      headers: { "Content-Type": "application/json" },
      body: message,
    });
    return response.data;
  }
}
