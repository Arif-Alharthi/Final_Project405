// src/pages/RecipeBot.js

import React, { useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import '../style/MovieManAI.css'; // صحّح المسار إذا لزم الأمر

// 1) إعداد axios-retry لإعادة المحاولة عند 429
axiosRetry(axios, {
  retries: 3,                                 // عدد مرات إعادة المحاولة
  retryDelay: (retryCount) => retryCount * 2000, // تأجيل تصاعدي: 2s، 4s، 6s
  retryCondition: (error) =>
    error.response?.status === 429           // شرط إعادة المحاولة عند 429 فقط
});

const RecipeBot = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // 2) مفتاح API
  const openAiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const systemPrompt = `You are a culinary assistant. You only answer questions about recipes, ingredients, cuisines, cooking techniques, and kitchen tools. If the user asks something unrelated to food or cooking, respond with: "Sorry, I only answer questions about food, recipes, and cooking."`;

      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userInput },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiApiKey}`,
          },
        }
      );

      const chatResponse = result.data.choices?.[0]?.message?.content;
      setResponse(chatResponse || 'No valid response received.');
    } catch (error) {
      // 3) تخصيص رسالة عند تجاوز المعدل
      if (axiosRetry.isNetworkOrIdempotentRequestError(error) && error.response?.status === 429) {
        setResponse('⚠️ Too many requests: please wait a moment and try again.');
      } else {
        console.error('Fetch error:', error);
        setResponse('Failed to fetch data from the API.');
      }
    } finally {
      setLoading(false);
      setUserInput('');
    }
  };

  return (
    <div className="movie-man-container">
      <h1>Welcome to RecipeBot!</h1>
      <p>Your AI assistant for recipes, cuisines, and cooking tips!</p>

      <div className="chat-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask me about a recipe..."
            className="chat-input"
            required
          />
          {/* 4) تعطيل الزر أثناء التحميل لتفادي ضغط متكرر */}
          <button type="submit" className="chat-button" disabled={loading}>
            {loading ? 'Loading...' : 'Ask'}
          </button>
        </form>

        {response && (
          <div className="chat-response">
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeBot;






