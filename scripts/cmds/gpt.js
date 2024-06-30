const axios = require('axios');

module.exports = {
  config: {
    name: 'gpt',
    version: '1.0',
    countDown: 10,
    role: 0,
    category: 'AI',
    description: '𝗀𝗉𝗍 𝗈𝗋𝗂𝗀𝗂𝗇𝖺𝗅',
    author: 'Rizky Z (hadi)',
    guide: { id: '{pn} <𝗉𝗋𝗈𝗆𝗉𝗍>' }
  },

  onStart: async function ({ message, args, api, event }) {
    const tanyakan = args.join(' ') || "hai";

    try {
      message.reaction('❤', event.messageID);
      const gemini = await axios.get(`https://gpt-four.vercel.app/gpt?prompt=${encodeURIComponent(tanyakan)}`);
      const pipi = gemini.data.answer;
      const send = await message.reply(`♡ 𝗚𝗣𝗧\n\n${pipi}`);
      setTimeout(() => {
        api.unsendMessage(send.messageID);
      }, 92000);

    } catch (error) {
      message.reply(`𝖤𝗋𝗋𝗈𝗋: ${error}`);
    }
  }
};
