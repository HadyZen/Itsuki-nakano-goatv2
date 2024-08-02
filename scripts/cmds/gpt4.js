const axios = require('axios');
const font = require("fontstyles");
module.exports = {
  config: {
    name: 'gpt4',
    version: '1.0',
    countDown: 10,
    role: 0,
    category: 'AI',
    description: '𝗀𝗉𝗍 𝖻𝗂𝖺𝗌𝖺',
    author: 'Hady Zen',
    guide: { id: '{pn} <𝗉𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇>' }
  },

  onStart: async function ({ message, args, api, event }) {
    const tanyakan = args.join(' ') || "hai";

    try { 
      const itsuki = Date.now();
      const gemini = await axios.get(`https://king-aryanapis.onrender.com/api/gpt?prompt=${encodeURIComponent(tanyakan)}`);
      const yotsuba = gemini.data.answer;
       const miku = Date.now();
      const nino = font.monospace(`♡ 𝗚𝗣𝗧 (${(miku - itsuki) / 1000}s)\n\n${yotsuba}`);
      message.reply(nino);

    } catch (error) {
      message.reply(`𝖤𝗋𝗋𝗈𝗋: ${error}`);
    }
  }
};
