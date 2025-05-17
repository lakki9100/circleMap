import axios from 'axios';

export const sendChatMessage = async (placeName, message) => {
  const res = await axios.post("http://localhost:8000/chat", {
    place_name: placeName,
    message
  });
  return res.data.reply;
};
