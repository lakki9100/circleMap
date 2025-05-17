const ChatHeader = ({ placeName, onClose }) => (
  <div className="chat-header">
    <strong>Ask about: {placeName}</strong>
    <button onClick={onClose}>X</button>
  </div>
);

export default ChatHeader;
