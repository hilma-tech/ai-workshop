import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messageService.saveMessage(dto.text, dto.isSent);
  }

  @Get()
  findAll() {
    return this.messageService.getAllMessages();
  }

  @Patch(":id")
  async updateMessage(@Param("id") id: number, @Body() body: { text: string }) {
    return this.messageService.updateMessage(+id, body.text);
  }
}
