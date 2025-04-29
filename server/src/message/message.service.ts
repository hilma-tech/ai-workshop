import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "../entities/message.entity";
import { CreateMessageDto, UpdateMessageDto } from "src/dto/message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messagesRepository.find();
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = this.messagesRepository.create(createMessageDto);
    return this.messagesRepository.save(newMessage);
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    // Find the message by ID
    const message = await this.messagesRepository.findOne({ where: { id } });

    if (!message) {
      // If message with the given ID is not found, throw an exception
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    // Update the message properties with the data from the DTO
    // Object.assign is a simple way to merge properties
    Object.assign(message, updateMessageDto);

    // Save the updated message back to the database
    return this.messagesRepository.save(message);
  }

  async remove(id: number): Promise<void> {
    const result = await this.messagesRepository.delete(id);

    if (result.affected === 0) {
      // If no rows were affected, it means the message with the given ID wasn't found
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
  }
}
