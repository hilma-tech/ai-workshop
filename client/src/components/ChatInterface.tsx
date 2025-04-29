import React, { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import "../styles/chat.css";
import axios from "axios";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          isSent: true,
          timestamp: new Date(),
        },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fetchMessages = async (
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    try {
      const response = await axios.get("/api/message");
      const parsedMessages = response.data.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp), // Ensure timestamp is a Date object
      }));
      setMessages(parsedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Use useEffect to call the function when the component mounts
  useEffect(() => {
    fetchMessages(setMessages);
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <MessageCircle className="w-6 h-6" />
        <h1>Chat</h1>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <div className="input-area">
        <div className="input-group">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="message-input"
          />
          <button onClick={handleSend} className="send-button">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
