import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import "../styles/chat.css";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessageToServer = async (text: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/message", {
        // Replace with your server URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("Message sent to server successfully!");
      }
    } catch (error) {
      console.error("There was an error sending the message:", error);
    }
  };

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
      sendMessageToServer(newMessage); // Send the message to the server
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
