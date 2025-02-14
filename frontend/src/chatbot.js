import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import 'tailwindcss/tailwind.css';
import './App.css';

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const updatedChat = [...chatHistory, { text: userInput, isUser: true }];
    setChatHistory(updatedChat);
    setUserInput('');

    try {
      setIsFetching(true);
      const response = await axios.post("http://localhost:5000/chat", { userMessage: userInput });
      const aiReply = response.data.aiResponse;
      setChatHistory([...updatedChat, { text: aiReply, isUser: false }]);
    } catch (err) {
      console.error('Error:', err);
      setChatHistory([...updatedChat, { text: 'Error: Unable to fetch response.', isUser: false }]);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900">
      <div className="flex-1 flex flex-col justify-between max-w-2xl mx-auto w-full">
        <div ref={chatContainerRef} className="overflow-y-auto flex-1 space-y-4 pb-4 h-[calc(100vh-100px)] max-h-[calc(100vh-100px)] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 absolute right-0 w-[90%]">
          {chatHistory.map((message, idx) => (
            <div key={idx} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}> 
              <div className={`px-4 py-3 rounded-2xl ${message.isUser ? 'max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg' : 'w-[50rem]'} shadow-lg border ${message.isUser ? 'bg-blue-500 text-white border-blue-400' : 'bg-white text-gray-900 border-gray-300'}`}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>

            </div>
          ))}
          {isFetching && (
            <div className="text-center text-gray-600 animate-pulse">Typing...</div>
          )}
        </div>
        <div className="flex items-center bg-white p-3 rounded-full w-full border border-gray-300 absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-2xl">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-gray-900 p-2 placeholder-gray-600"
            placeholder="Ask something..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="ml-2 bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition-all"
            onClick={sendMessage}
          >
            <FaPaperPlane className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
