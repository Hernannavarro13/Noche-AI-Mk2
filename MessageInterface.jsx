import { useState } from "react";
import { Send, User, Bot, RefreshCw } from "lucide-react";

export default function MessageInterface() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    
    // Add user message
    setMessages([...messages, { role: "user", content: input }]);
    
    // Simulate assistant response (in a real app, you'd call an API)
    setTimeout(() => {
      setMessages(current => [
        ...current, 
        { role: "assistant", content: "This is a simulated response to your message." }
      ]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold text-gray-800">Noche Ai Chat Interface</h1>
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
      </div>
      
      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Message Noche..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSend}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Send size={20} />
          </button>
          <button 
            className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}