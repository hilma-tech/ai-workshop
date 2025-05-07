import { Body, Controller, Post } from "@nestjs/common";
import { MessageService } from "./message.service";

interface CreateMessageDto {
  text: string;
}
@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    this.messageService.logMessage(createMessageDto.text);
    return { message: "Message received and logged!" }; // Optional: Send a response back to the client
  }
}
