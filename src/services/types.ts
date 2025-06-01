/**
 * User model returned by the API.
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Input payload to create a new user.
 */
export interface CreateUserInput {
  name: string;
  email: string;
}

export type WhatsAppMessageType =
  | "text"
  | "audio"
  | "image"
  | "template"
  | "address"
  | "contact"
  | "document";

export interface WhatsAppTextPayload {
  preview_url: boolean;
  body: string;
}

export interface BaseWhatsAppMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: WhatsAppMessageType;
}

// send text based message

export type SendTextMessageRequest = BaseWhatsAppMessage & {
  type: "text";
  text: WhatsAppTextPayload;
};

// whatsapp api response

export interface SendMessageResponse {
  messaging_product: "whatsapp";
  contacts: [
    {
      input: string;
      wa_id: string;
    },
  ];
  messages: [
    {
      id: string;
      message_status: string;
    },
  ];
}
