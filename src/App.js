import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import 'tailwindcss/tailwind.css';
import './App.css';
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('what is AI?');
  const [isFetching, setIsFetching] = useState(false);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const updatedChat = [...chatHistory, { text: userInput, isUser: true }];
    setChatHistory(updatedChat);
    setUserInput('');

    try {
      setIsFetching(true);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      
        
        {
          "contents": [
            {
              "parts": [
                {
                  "text": userInput
                }
              ]
            }
          ]
        }
      );

      console.log(response);
      const aiReply = response.data.candidates[0].content.parts[0].text;
      setIsFetching(false);
      setChatHistory([...updatedChat, { text: aiReply, isUser: false }]);
    } catch (err) {
      console.error('AI Response Error:', err);
      setIsFetching(false);
      setChatHistory([...updatedChat, { text: 'Error: Unable to fetch response.', isUser: false }]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-400 to-purple-600">
      <h1 className="text-4xl font-extrabold text-white shadow-md mb-6">Mindful Mate</h1>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 h-96 overflow-y-auto">
          {chatHistory.map((message, idx) => (
            <div key={idx} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`rounded-lg px-3 py-2 shadow-md ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isFetching && (
            <div className="loading-container">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <span className="loading-text">Loading...</span>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-300 flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-400 rounded-lg outline-none"
            placeholder="Ask something..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="ml-2 bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-all"
            onClick={sendMessage}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
