import { HttpClient } from "./http/HttpClient";
import { WhatsAppService } from "./services/whatsappService";

interface SDKOptions {
  baseUrl: string;
  authToken: string;
  phoneNumberId: string;
}

export class WhatsAppSDK {
  readonly whatsapp: WhatsAppService;

  constructor({ baseUrl, authToken, phoneNumberId }: SDKOptions) {
    const http = new HttpClient(baseUrl, {
      Authorization: `Bearer ${authToken}`,
    });

    this.whatsapp = new WhatsAppService(http, phoneNumberId);
  }
}
