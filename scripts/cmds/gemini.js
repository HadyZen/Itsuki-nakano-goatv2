const axios = require('axios');

module.exports = {
  config: {
    name: "gemini",
    version: "𝟣.𝟢",
    countDown: 10,
    role: 0,
    category: "AI",
    description: "𝖻𝖾𝗋𝗍𝖺𝗇𝗒𝖺 𝗄𝖾𝗉𝖺𝖽𝖺 𝗀𝖾𝗆𝗂𝗇𝗂",
    author: "Rizky Z (hadi)",
    guide: { id: "{pn} <𝗍𝖺𝗇𝗒𝖺𝗄𝖺𝗇>" }
  },

  onStart: async function ({
    message, args, api, event
  }) {
    const tanyakan = args.join(' ');
    if (!tanyakan) {
      return message.reply('𝖡𝖾𝗋𝗂𝗄𝖺𝗇 𝗉𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇!');
    }

    try {
      message.reaction("✨", event.messageID);
      message.reply('𝖬𝖾𝗇𝖼𝖺𝗋𝗂 𝗃𝖺𝗐𝖺𝖻𝖺𝗇...')
      const gemini = await axios.get(`https://69070.replit.app/gemini?prompt=${encodeURIComponent(tanyakan)}`);
      const pipi = gemini.data.response;
      const send = await message.send(`✨ 𝗚𝗲𝗺𝗶𝗻𝗶\n\n${pipi}`);
      setTimeout(() => {
        api.unsendMessage(send.messageID);
      }, 92000);

    } catch (error) {
      message.reply('𝖤𝗋𝗋𝗈𝗋:' error);
    }
  }
};