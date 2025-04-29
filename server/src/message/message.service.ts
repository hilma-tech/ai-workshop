import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "src/entities/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  async getAllMessages(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async createMessage(text: string): Promise<Message> {
    const newMessage = this.messageRepository.create({
      text,
      isSent: true,
      timestamp: new Date(),
    });
    return await this.messageRepository.save(newMessage);
  }
}
