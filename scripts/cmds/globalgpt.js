const axios = require('axios');

module.exports = {
  config: {
    name: "globalgpt",
    version: "𝟣.𝟢",
    countDown: 10,
    role: 0,
    category: "AI",
    description: "𝖻𝖾𝗋𝗍𝖺𝗇𝗒𝖺 𝖽𝖾𝗇𝗀𝖺𝗇 𝗀𝗅𝗈𝖻𝖺𝗅𝗀𝗉𝗍",
    author: "Rizky Z (hadi)",
    guide: { id: "{pn} <𝗍𝖺𝗇𝗒𝖺>" }
  },

  onStart: async function ({ message, args, api, event }) {
      try { 
    const edit = await message.reply('𝖳𝗎𝗇𝗀𝗀𝗎 𝗌𝖾𝖻𝖾𝗇𝗍𝖺𝗋...');
    const tanya = args.join(' ') || "hai";
    const hadi = await axios.get(`https://hashier-api-v1.vercel.app/api/globalgpt?q=${encodeURIComponent(tanya)}`);
    const data = hadi.data.content;
    message.reaction("✨", event.messageID);
    api.editMessage(`✨ 𝗚𝗹𝗼𝗯𝗮𝗹𝗚𝗣𝗧\n\n${data}`, edit.messageID);
    setTimeout(() => { api.unsendMessage(edit.messageID); }, 92000);
      } catch (error) {
          message.reply('𝖤𝗋𝗋𝗈𝗋');
      }
  }
};