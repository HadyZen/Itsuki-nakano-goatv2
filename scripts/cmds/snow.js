const axios = require('axios');

module.exports = {
  config: {
    name: "snow",
    version: "𝟣.𝟢",
    countDown: 10,
    role: 0,
    category: "AI",
    description: "𝖻𝖾𝗋𝗍𝖺𝗇𝗒𝖺 𝖽𝖾𝗇𝗀𝖺𝗇 𝗌𝗇𝗈𝗐𝖿𝗅𝖺𝗄𝖾",
    author: "Hady Zen",
    guide: { id: "{pn} <𝗍𝖺𝗇𝗒𝖺>" }
  }, 

  onStart: async function ({ message, args, api, event }) {
      const pertanyaan = args.join(' ');
    if (!pertanyaan) { return message.reply('𝖬𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗉𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇!');
    }

    try {
    message.reaction("⌛", event.messageID);
    const snow = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(pertanyaan)}`);
    const flake = snow.data.response;
    message.reaction("💙", event.messageID);
    const pesan = await message.reply(`♡ 𝗦𝗻𝗼𝘄𝗳𝗹𝗮𝗸𝗲\n\n${flake}`);
    setTimeout(() => { api.unsendMessage(pesan.messageID); }, 92000);
   } catch (error) {
       message.reply('𝖤𝗋𝗋𝗈𝗋');
   }
  }
};
