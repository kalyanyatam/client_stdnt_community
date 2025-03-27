import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./community/Sidebar";

const ChatPage = () => {
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("chatMessages")) || [
      { sender: false, text: "Hey there!" },
      { sender: true, text: "Hi, how can I help you?" },
      { sender: false, text: "I have a question about your product." },
    ];
  });
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Function to send messages
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [...messages, { sender: true, text: newMessage }];
      setMessages(updatedMessages);
      setNewMessage("");
      setIsTyping(false);
    }
  };

  // Handle input changes for typing indicator
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  // Handle 'Enter' key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="py-4 px-6 bg-white shadow-md border-b">
        <h2 className="text-2xl font-semibold">Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg shadow-md max-w-xs md:max-w-md ${
                msg.sender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700">
              User is typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 flex items-center bg-white border-t">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-full transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
