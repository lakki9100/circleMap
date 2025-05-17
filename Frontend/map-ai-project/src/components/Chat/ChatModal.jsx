import { useEffect, useRef, useState } from 'react';
import { sendChatMessage } from '../../services/chatService';
import ChatBubble from './ChatBubble';
import './chatStyles.css';

const ChatModal = ({ placeName, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, from: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const aiReply = await sendChatMessage(placeName, input);
      const aiMsg = { text: aiReply, from: 'ai' };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, there was an error fetching AI response.', from: 'ai' },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <strong>Ask about: {placeName}</strong>
          <button className="chat-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="chat-body" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} text={msg.text} from={msg.from} />
          ))}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
