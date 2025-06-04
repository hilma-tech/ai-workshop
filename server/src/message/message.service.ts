import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "../entities/message.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>
  ) {}

  async saveMessage(text: string, isSent: boolean): Promise<Message> {
    const message = this.messageRepository.create({ text, isSent });
    return this.messageRepository.save(message);
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find({
      order: { timestamp: "ASC" },
    });
  }

  async updateMessage(id: number, newText: string) {
    const message = await this.messageRepository.findOneBy({ id });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    message.text = newText;
    return this.messageRepository.save(message);
  }
}
