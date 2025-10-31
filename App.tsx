
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType, Sender } from './types';
import { getAiResponse } from './services/geminiService';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMessage: ChatMessageType = {
      id: 'welcome-message',
      text: 'Xin chào! Tôi là trợ lý AI chuyên về Chủ nghĩa xã hội khoa học. Bạn có câu hỏi nào không?',
      sender: Sender.AI,
    };
    setMessages([welcomeMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      text,
      sender: Sender.USER,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const aiText = await getAiResponse(text);
      const aiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: Sender.AI,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại.';
      setError(errorMessage);
       const errorAiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: Sender.AI,
      };
      setMessages(prev => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 p-4 border-b border-gray-700 shadow-md">
        <h1 className="text-xl md:text-2xl font-bold text-center text-teal-300">
          AI Chatbot - Chủ nghĩa xã hội khoa học
        </h1>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 my-4 justify-start">
              <div className="h-8 w-8 flex-shrink-0 text-teal-400">
                <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-teal-300 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-teal-300 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      {error && <div className="text-center text-red-500 p-2">{error}</div>}

      <footer className="sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default App;
