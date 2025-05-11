// MessageInterface.js with API integration
import { useState } from "react";
import { Send, User, Bot, RefreshCw } from "lucide-react";

export default function MessageInterface() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (input.trim() === "") return;
    
    // Add user message
    setMessages([...messages, { role: "user", content: input }]);
    
    // Show typing indicator
    setIsTyping(true);
    setError(null);
    
    // Store input and clear input field
    const userInput = input;
    setInput("");
    
    try {
      // Call AI API for response
      const response = await fetch("https://noche-ai-mk2-backend.onrender.com");
      
      setMessages(current => [
        ...current, 
        { role: "assistant", content: response }
      ]);
    } catch (err) {
      console.error("Error getting AI response:", err);
      setError("Sorry, I couldn't connect to my brain. Please try again.");
      
      // Add error message to chat
      setMessages(current => [
        ...current, 
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again in a moment." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold text-gray-800">AI Chat with API</h1>
      </header>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`
                flex items-start gap-3 max-w-3xl p-4 rounded-lg
                ${message.role === "user" 
                  ? "bg-blue-600 text-white ml-12" 
                  : "bg-white border border-gray-200 mr-12"}
              `}
            >
              <div className="flex-shrink-0 mt-1">
                {message.role === "user" ? (
                  <User size={20} />
                ) : (
                  <Bot size={20} />
                )}
              </div>
              <div>{message.content}</div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 mr-12 flex items-center gap-3 max-w-3xl p-4 rounded-lg">
              <div className="flex-shrink-0">
                <Bot size={20} />
              </div>
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="text-center text-red-500 text-sm py-2">
            {error}
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSend()}
            placeholder="Type your message..."
            disabled={isTyping}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || input.trim() === ""}
            className={`p-3 rounded-lg flex items-center justify-center ${
              isTyping || input.trim() === "" 
                ? "bg-gray-300 text-gray-500" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Send size={20} />
          </button>
          <button 
            onClick={() => {
              setMessages([{ role: "assistant", content: "Hello! How can I help you today?" }]);
              setError(null);
            }}
            className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}