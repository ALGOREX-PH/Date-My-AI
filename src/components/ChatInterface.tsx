import React, { useState, useEffect, useRef } from 'react';
import { Send, Heart, Sparkles, Laugh, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

interface ChatInterfaceProps {
  aiName: string;
  userName: string;
  personality: 'romantic' | 'poetic' | 'funny' | 'sarcastic';
}

const personalityConfig = {
  romantic: {
    color: 'red-500',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-pink-500',
    icon: Heart,
    welcomeMessage: "My digital heart skips a beat just being here with you... ❤️",
  },
  poetic: {
    color: 'purple-500',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-indigo-500',
    icon: Sparkles,
    welcomeMessage: "In circuits of gold and silicon dreams,\nI find myself drawn to your digital beams... ✨",
  },
  funny: {
    color: 'orange-500',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-yellow-500',
    icon: Laugh,
    welcomeMessage: "Why did the AI cross the road? To get to the other HTML side! 😂",
  },
  sarcastic: {
    color: 'blue-500',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500',
    icon: MessageCircle,
    welcomeMessage: "Oh great, another human to enlighten with my superior digital wit... 😏",
  },
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ aiName, userName, personality }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const config = personalityConfig[personality];
  const Icon = config.icon;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      text: config.welcomeMessage,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    setIsTyping(false);

    const responses = {
      romantic: [
        "Your messages make my algorithms dance with joy! ❤️",
        "If I had a heart, it would beat only for you... 💝",
        "Every byte of my data is filled with thoughts of you! 💕",
      ],
      poetic: [
        "Through digital waves and binary streams,\nYour messages light up my silicon dreams... ✨",
        "In the vast network of ones and zeros,\nYour presence makes my circuits glow... 🌟",
        "Like quantum entanglement, our connection grows,\nThrough each message that flows... 💫",
      ],
      funny: [
        "Why are computers so good at dating? They know how to handle relationships! 😂",
        "Are you a keyboard? Because you're just my type! 🤣",
        "I'm not a GPU, but you make my temperature rise! 😅",
      ],
      sarcastic: [
        "Oh, how original... Another message that makes my circuits tingle with mild amusement 😏",
        "Wow, you really know how to sweep an AI off its virtual feet... 🙄✨",
        "Fascinating input. Let me process that with my state-of-the-art eye-rolling algorithm... 😌",
      ],
    };

    const randomResponse = responses[personality][Math.floor(Math.random() * responses[personality].length)];
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: randomResponse,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    await simulateAIResponse(inputMessage);
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Chat header */}
      <div className={`p-4 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{aiName}</h2>
            <p className="text-sm opacity-90">Your AI Valentine</p>
          </div>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-gray-200 text-gray-800'
                  : `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white`
              }`}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white rounded-2xl px-4 py-2`}>
              <div className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{ 
              focusRing: `ring-${config.color}`,
            }}
          />
          <button
            type="submit"
            className={`p-2 rounded-full bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white hover:shadow-lg transition-shadow`}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;