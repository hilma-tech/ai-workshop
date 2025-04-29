import { Controller, Get, Post, Body } from "@nestjs/common";
import { MessageService } from "./message.service";
import { Message } from "../entities/message.entity";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages(): Promise<Message[]> {
    return await this.messageService.getAllMessages();
  }

  @Post()
  async createMessage(@Body("text") text: string): Promise<Message> {
    return await this.messageService.createMessage(text);
  }
}
