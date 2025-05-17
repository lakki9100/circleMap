import { useState, useRef, useEffect } from 'react';

const useChatLogic = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, from: 'user' }]);
      setInput('');
      // TODO: Add API call to fetch assistant reply and update messages
    }
  };

  return {
    messages,
    input,
    setInput,
    handleSend,
    scrollRef
  };
};

export default useChatLogic;
