const axios = require('axios');

module.exports = {
  config: {
    name: 'claude',
    version: '1.0',
    countDown: 10,
    role: 0,
    category: 'AI',
    description: '𝖼𝗅𝖺𝗎𝖽𝖾 𝟥 𝖺𝗂',
    author: 'Rizky Z (hadi)',
    guide: { id: '{pn} <𝗉𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇>' }
  },

  onStart: async function ({ message, args, api, event }) {
    const tanyakan = args.join(' ') || "hai";

    try {
      const gemini = await axios.get(`https://deku-rest-api-3ijr.onrender.com/api/claude-3?q=${encodeURIComponent(tanyakan)}`);
      const pipi = gemini.data.respond;
      const send = await message.reply(`✨ 𝗖𝗹𝗮𝘂𝗱𝗲\n\n${pipi}`);
      setTimeout(() => {
        api.unsendMessage(send.messageID);
      }, 92000);

    } catch (error) {
      message.reply(`𝖤𝗋𝗋𝗈𝗋: ${error}`);
    }
  }
};