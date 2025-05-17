const ChatInput = ({ input, setInput, onSend }) => (
  <div className="chat-footer">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask something..."
    />
    <button onClick={onSend}>Send</button>
  </div>
);

export default ChatInput;
