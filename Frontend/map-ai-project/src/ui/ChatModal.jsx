import { useState, useEffect, useRef } from 'react';
import './ChatModal.css';

const ChatModal = ({ placeName, onClose, messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <strong>Ask about: {placeName}</strong>
          <button onClick={onClose}>X</button>
        </div>
        <div className="chat-body" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-msg ${msg.from}`}>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
