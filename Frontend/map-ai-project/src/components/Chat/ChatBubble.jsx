const ChatBubble = ({ text, from }) => (
  <div className={`chat-msg ${from}`}>
    <div>{text}</div>
  </div>
);

export default ChatBubble;
