import React, { useState, useEffect } from "react";
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

  // Updated API_URL with /api prefix
  const API_URL = "http://localhost:3000/api/messages"; // Added /api

  // Function to fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get<Message[]>(API_URL);
      const formattedMessages = response.data.map((message) => ({
        ...message,
        timestamp: message.timestamp ? new Date(message.timestamp) : new Date(),
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to send a new message to the backend
  const sendMessage = async (text: string) => {
    try {
      const response = await axios.post<Message>(API_URL, {
        text: text,
        isSent: true,
      });
      setMessages([
        ...messages,
        {
          ...response.data,
          timestamp: new Date(response.data.timestamp),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to send updated message to the backend AND update local state
  const updateMessage = async (id: number, newText: string) => {
    try {
      const response = await axios.patch<Message>(`${API_URL}/${id}`, {
        text: newText,
      });
      setMessages(
        messages.map((message) =>
          message.id === id
            ? {
                ...response.data,
                timestamp: new Date(response.data.timestamp),
              }
            : message
        )
      );
    } catch (error) {
      console.error(`Error updating message with ID ${id}:`, error);
    }
  };

  // New function to delete a message and update local state
  const deleteMessage = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Filter out the deleted message from the local state
      setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.error(`Error deleting message with ID ${id}:`, error);
      // Optionally, handle error in UI
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
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
          // Pass the updateMessage AND deleteMessage functions as props
          <MessageBubble
            key={message.id}
            message={message}
            onUpdateMessage={updateMessage}
            onDeleteMessage={deleteMessage} // Pass the delete function
          />
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
