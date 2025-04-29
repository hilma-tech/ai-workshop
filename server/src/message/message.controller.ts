// src/message/message.controller.ts
import { Controller, Get } from "@nestjs/common";
import { MessageService } from "./message.service";
import { Message } from "../entities/message.entity";

@Controller("messages") // You can choose your preferred route prefix
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  // ... other controller endpoints
}
