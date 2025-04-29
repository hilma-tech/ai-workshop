export class CreateMessageDto {
  text: string;
  isSent: boolean;
  // No need for ID or timestamp here, as the backend will generate them
}

export class UpdateMessageDto {
  text?: string; // Make text optional for updates
  // You could add other fields here if they were editable, e.g., isSent?: boolean;
}
