// src/message/message.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateMessageDto, UpdateMessageDto } from "../dto/message.dto";
import { Message } from "../entities/message.entity";
import { MessageService } from "./message.service";

@Controller("messages") // You can choose your preferred route prefix
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.create(createMessageDto);
  }

  @Patch(":id") // PATCH requests to /messages/:id
  async update(
    @Param("id") id: string, // Get the ID from the URL parameters
    @Body() updateMessageDto: UpdateMessageDto // Get the update data from the request body
  ): Promise<Message> {
    // Convert the ID parameter from string to number
    const messageId = parseInt(id, 10);
    if (isNaN(messageId)) {
      throw new NotFoundException("Invalid message ID"); // Handle invalid ID format
    }

    return this.messageService.update(messageId, updateMessageDto);
  }

  @Delete(":id") // DELETE requests to /messages/:id
  async remove(@Param("id") id: string): Promise<void> {
    const messageId = parseInt(id, 10);
    if (isNaN(messageId)) {
      throw new NotFoundException("Invalid message ID");
    }
    await this.messageService.remove(messageId);
  }
}
