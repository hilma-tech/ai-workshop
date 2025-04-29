import React, { useState, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import "../styles/chat.css";
import axios from "axios"; // Import axios

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Function to fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get<Message[]>("/api/messages"); // Adjust URL as needed
      // Format the timestamp to be a Date object
      const formattedMessages = response.data.map((message) => ({
        ...message,
        timestamp: new Date(message.timestamp),
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleSend = () => {
    if (newMessage.trim()) {
      // This part currently adds the message to the local state.
      // For a full implementation, you would also send this message to the backend here.
      setMessages([
        ...messages,
        {
          id: messages.length + 1, // This ID is temporary; backend should assign the final ID
          text: newMessage,
          isSent: true, // Assuming messages sent from the client are 'isSent: true'
          timestamp: new Date(),
        },
      ]);
      setNewMessage("");
      // TODO: Add logic here to send the new message to your NestJS backend
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
