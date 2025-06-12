import React, { useState, useEffect } from "react";
import { MessageCircle, Send, Edit, Check } from "lucide-react";
import {
  getMessages,
  sendMessage as saveMessage,
  updateMessage,
} from "../api/message.ts";
import "../styles/chat.css";
// import { formatTimestamp } from "./MessageBubble.tsx";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}
const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    getMessages().then(setMessages);
  }, []);

  const handleSend = async () => {
    if (newMessage.trim()) {
      const savedMessage = await saveMessage(newMessage, true);
      setMessages((prev) => [...prev, savedMessage]);
      setNewMessage("");

      //TODO replace echo with a real response
      const replyText = `Echo: ${newMessage}`;
      const botMessage = await saveMessage(replyText, false);
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleEdit = (id: number, text: string) => {
    setEditingMessageId(id);
    setEditText(text);
  };

  const handleSaveEdit = async (id: number) => {
    const updated = await updateMessage(id, editText);
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text: updated.text } : msg))
    );
    setEditingMessageId(null);
    setEditText("");
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
          <div
            key={message.id}
            className={`message-bubble ${message.isSent ? "sent" : "received"}`}
          >
            {editingMessageId === message.id ? (
              <div className="edit-container">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button
                  onClick={() => handleSaveEdit(message.id)}
                  className="save-edit-btn"
                >
                  <Check size={16} />
                </button>
              </div>
            ) : (
              <>
                <p>{message.text}</p>
                {message.isSent && (
                  <button
                    onClick={() => handleEdit(message.id, message.text)}
                    className="edit-button"
                    title="Edit message"
                  >
                    <Edit size={14} />
                  </button>
                )}
              </>
            )}
          </div>
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
