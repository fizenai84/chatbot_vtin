import React, { useState } from 'react'
import { Send, Bot, Upload } from 'lucide-react'

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ])
  const [inputText, setInputText] = useState('')

  const handleSendMessage = () => {
    if (inputText.trim() === '') return

    // Add user message
    const newUserMessage = { id: Date.now(), text: inputText, sender: 'user' }
    setMessages([...messages, newUserMessage])
    setInputText('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: 'I\'m your AI assistant. I\'m here to help with your questions.', 
        sender: 'bot' 
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Chat Interface</h1>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md">
          <Upload size={16} className="mr-2" />
          Upload Files
        </button>
      </div>
      
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-y-auto mb-4 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex items-center mb-1">
                    <Bot size={16} className="mr-1 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">AI Assistant</span>
                  </div>
                )}
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSendMessage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}

export default ChatInterface
