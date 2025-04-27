import React from "react";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message-bubble ${message.isSent ? "sent" : "received"}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <span className="message-time">{formattedTime}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
