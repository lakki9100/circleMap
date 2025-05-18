import axios from 'axios';

export const sendChatMessage = async (placeName, message) => {
  const res = await axios.post("https://map-backend-5z5ynzgq6q-uc.a.run.app/chat", {
    place_name: placeName,
    message
  });
  return res.data.reply;
};
