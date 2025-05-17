import ChatBubble from './ChatBubble';

const ChatBody = ({ messages }) => (
  <div className="chat-body">
    {messages.map((msg, idx) => (
      <ChatBubble key={idx} text={msg.text} from={msg.from} />
    ))}
  </div>
);

export default ChatBody;
