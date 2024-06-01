const axios = require('axios');

module.exports = {
  config: {
    name: 'liner',
    version: '1.0',
    countDown: 10,
    role: 0,
    category: 'AI',
    description: '𝗅𝗂𝗇𝖾𝗋 𝖺𝗂',
    author: 'Rizky Z (hadi)',
    guide: { id: '{pn} <𝗉𝗋𝗈𝗆𝗉𝗍>' }
  },

  onStart: async function ({ message, args, api, event }) {
    const tanyakan = args.join(' ');
    if (!tanyakan) {
      return message.reply('𝖡𝖾𝗋𝗂𝗄𝖺𝗇 𝗉𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇 𝗄𝖺𝗆𝗎!');
    }

    try {
      message.reaction('✨', event.messageID);
      message.reply('𝖳𝗎𝗇𝗀𝗀𝗎 𝗌𝖾𝖻𝖾𝗇𝗍𝖺𝗋...');
      const gemini = await axios.get(`https://apis-samir.onrender.com/liner?prompt=${encodeURIComponent(tanyakan)}`);
      const pipi = gemini.data.answer;
      const send = await message.send(`✨ 𝗟𝗶𝗻𝗲𝗿 𝗔𝗜\n\n${pipi}`);
      setTimeout(() => {
        api.unsendMessage(send.messageID);
      }, 92000);

    } catch (error) {
      message.reply(`𝖤𝗋𝗋𝗈𝗋: ${error}`);
    }
  }
};