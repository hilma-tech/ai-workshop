import { Controller, Get, Post, Body } from "@nestjs/common";
import { MessageService } from "./message.service";

interface CreateMessageDto {
  text: string;
  isSent: boolean;
}

@Controller("api/message") //  <---  Check this!
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.create(
      createMessageDto.text,
      createMessageDto.isSent
    );
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }
}
