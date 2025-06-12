import { Injectable, Logger } from "@nestjs/common";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index";

@Injectable()
export class LlmService {
  private readonly chatOpenAI: OpenAI;
  private readonly logger = new Logger();

  constructor() {
    this.chatOpenAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async callOpenAI({
    systemPrompt,
    previousMessages,
    input,
  }: {
    systemPrompt: string;
    previousMessages?: ChatCompletionMessageParam[];
    input: string;
  }) {
    try {
      const messages: ChatCompletionMessageParam[] = [
        ...previousMessages,
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: input },
      ];
      const response = await this.chatOpenAI.chat.completions.create({
        temperature: 0.8,
        model: "gpt-4.1-nano",
        messages,
      });
      return response.choices[0].message.content;
    } catch (error) {
      this.logger.error("Error in callOpenAI", error);
      throw error;
    }
  }
}
