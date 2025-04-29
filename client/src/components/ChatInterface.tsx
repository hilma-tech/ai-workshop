import React, { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import "./chat-interface.scss";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await axios.get("/api/message");
      const parsedMessages = response.data.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send new message to the server
  const handleSend = async () => {
    if (newMessage.trim()) {
      try {
        await axios.post("/api/message", { text: newMessage });
        setNewMessage("");
        fetchMessages(); // Fetch updated messages from server after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Container maxWidth="sm" className="chat-container">
      <Paper elevation={3} className="chat-paper">
        <Box display="flex" alignItems="center" gap={1} className="chat-header">
          <MessageCircle className="chat-icon" />
          <Typography variant="h5" className="chat-title">
            Chat
          </Typography>
        </Box>

        <Box className="messages-container">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </Box>

        <Box display="flex" alignItems="center" gap={1} className="input-area">
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            className="message-input"
          />
          <IconButton
            onClick={handleSend}
            color="primary"
            className="send-button"
          >
            <Send className="send-icon" />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatInterface;
