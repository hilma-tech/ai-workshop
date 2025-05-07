import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send } from "lucide-react";
import "../styles/chat.css";
import MessageBubble from "./MessageBubble";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/message"); // Added /api prefix
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
      const data: Message[] = await response.json();
      // Parse the timestamp string to a Date object
      const parsedData = data.map((message) => ({
        ...message,
        timestamp: new Date(message.timestamp),
      }));
      setMessages(parsedData);
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  // Send a message to the server
  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await fetch("http://localhost:3000/api/message", {
          // Added /api prefix
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newMessage,
            isSent: false, // Set the isSent value
          }),
        });
        if (!response.ok) {
          throw new Error(`Failed to send message: ${response.status}`);
        }
        setNewMessage(""); // Clear the input field
        fetchMessages(); // Fetch messages to update the display
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
        <div ref={messagesEndRef} />
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
          <button onClick={sendMessage} className="send-button">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
