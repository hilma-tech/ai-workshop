import React, { useState } from "react";
import { Edit, Save, X, Trash2 } from "lucide-react"; // Import Trash2 icon
import axios from "axios";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  onUpdateMessage: (id: number, newText: string) => Promise<void>;
  // Add a prop for the delete function
  onDeleteMessage: (id: number) => Promise<void>;
}

// Updated API_URL with /api prefix - Keep this in sync with ChatInterface
const API_URL = "http://localhost:3000/api/messages";

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onUpdateMessage,
  onDeleteMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text);

  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedText(message.text);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(message.text);
  };

  const handleSaveClick = async () => {
    if (editedText.trim() && editedText !== message.text) {
      await onUpdateMessage(message.id, editedText);
    }
    setIsEditing(false);
  };

  const handleEditingKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveClick();
    } else if (e.key === "Escape") {
      handleCancelClick();
    }
  };

  // New function to handle delete button click
  const handleDeleteClick = async () => {
    // Optional: Add a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (confirmed) {
      await onDeleteMessage(message.id); // Call the delete function passed from parent
    }
  };

  return (
    <div className={`message-bubble ${message.isSent ? "sent" : "received"}`}>
      <div className="message-content">
        {isEditing ? (
          <div className="editing-input-area">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleEditingKeyPress}
              className="message-edit-input"
            />
            <button onClick={handleSaveClick} className="edit-save-button">
              <Save className="w-4 h-4" />
            </button>
            <button onClick={handleCancelClick} className="edit-cancel-button">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <p>{message.text}</p>
            <span className="message-time">{formattedTime}</span>
            {/* Add Edit and Delete buttons */}
            <div className="message-actions">
              {" "}
              {/* Optional: Wrapper for buttons */}
              <button onClick={handleEditClick} className="edit-button">
                <Edit className="w-4 h-4" />
              </button>
              {/* Add the delete button */}
              <button onClick={handleDeleteClick} className="delete-button">
                {" "}
                {/* Use the CSS class */}
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
