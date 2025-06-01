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
  | "document"
  | "interactive";

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
    }
  ];
  messages: [
    {
      id: string;
      message_status?: string;
    }
  ];
}

// address message

export type InteractiveMessageType = "address_message";

// values
export interface AddressMessageValues {
  name: string;
  phone_number: string;
}

// saved address

export interface SavedAddress {
  id: string;
  value: {
    name: string;
    phone_number: string;
    in_pin_code?: string;
    floor_number?: string;
    building_name?: string;
    address?: string;
    landmark_area?: string;
    city?: string;
  };
}

// action parameters

export interface AddressMessageActionParameters {
  country: string;
  values?: AddressMessageValues;
  saved_addresses?: SavedAddress[];
  validation_errors?: Partial<Record<keyof AddressMessageValues, string>>;
}

// address message payload
export interface AddressMessageInteractivePayload {
  type: "address_message";
  body: {
    text: string;
  };
  action: {
    name: "address_message";
    parameters: AddressMessageActionParameters;
  };
}

/**
 * Send address message request
 */
export type SendAddressMessageRequest = Omit<BaseWhatsAppMessage, "type"> & {
  type: "interactive";
  interactive: AddressMessageInteractivePayload;
};
