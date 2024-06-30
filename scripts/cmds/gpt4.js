const axios = require('axios');

module.exports = {
  config: {
    name: 'gpt4',
    version: '1.0',
    countDown: 10,
    role: 0,
    category: 'AI',
    description: '𝗀𝗉𝗍 𝟦 𝗌𝗎𝗉𝖾𝗋 𝗀𝗈',
    author: 'Hady Zen',
    guide: { id: '{pn} <𝗉𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇>' }
  },

  onStart: async function ({ message, args, api, event }) {
    const tanyakan = args.join(' ') || "hai";

    try {
      const gemini = await axios.get(`https://markdevs69-1efde24ed4ea.herokuapp.com/api/gpt4o?q=${encodeURIComponent(tanyakan)}`);
      const pipi = gemini.data.response;
      const send = await message.reply(`♡ 𝗚𝗣𝗧-𝟰 𝗚𝗢\n\n${pipi}`);
      setTimeout(() => {
        api.unsendMessage(send.messageID);
      }, 92000);

    } catch (error) {
      message.reply(`𝖤𝗋𝗋𝗈𝗋: ${error}`);
    }
  }
};
