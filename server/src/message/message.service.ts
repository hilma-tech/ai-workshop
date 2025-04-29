import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "../entities/message.entity";

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
    const newMessage = this.messageRepository.create({ text, isSent: true });
    return await this.messageRepository.save(newMessage);
  }
}
