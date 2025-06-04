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

/**
 *
 * @param timestamp - The timestamp to format, can be a string or Date object
 * @returns A formatted time string in "HH:MM AM/PM" format
 */
function formatTimestamp(timestamp: string | Date): string {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`message-bubble ${message.isSent ? "sent" : "received"}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <span className="message-time">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
