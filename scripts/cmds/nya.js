module.exports = {
  config: {
    name: "nya",
    version: "1.0",
    author: "hady zen",
    countdown: 10,
    role: 0,
    description: "𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝗎𝗃𝗂 𝖼𝗈𝖻𝖺",
    category: "SISTEM",
    guide: { id: "{pn} <𝗄𝗈𝗌𝗈𝗇𝗀/𝗂𝖽/𝗀𝗂𝖽>" }
  },
  onStart: async function ({ message, args, api, event }) {
    const nya = args[0];
    switch (nya) {
      case 'id':
        const hadi = await message.reply('𝗇𝗒𝖺! (◍•ᴗ•◍)');
        setTimeout(() => { api.editMessage(`${event.senderID}`, hadi.messageID); }, 3000);
        break;
      case 'gid':
        const pipi = await message.reply('𝗇𝗒𝖺! (◍•ᴗ•◍)');
        setTimeout(() => { api.editMessage(`${event.threadID}`, pipi.messageID); }, 3000);
        break;
      case 'code': 
const itsuki = await message.reply('𝗇𝗒𝖺! (◍•ᴗ•◍)');
        setTimeout(() => { api.editMessage(`
module.exports = {
  config: {
    name: "nya",
    version: "1.0",
    author: "Hady Zen",
    countDown: 6,
    role: 0,
    description: "mentahan cmd", 
    category: "SISTEM",
    guide: { id: "" }
  },

  onStart: async function ({ message }) { 
 }, 
  onChat: async function ({ message }) {
 }
};`, itsuki.messageID); }, 3000);
        break;
      default:
        message.reply("𝗇𝗒𝖺! (◍•ᴗ•◍)");
        break;
    }
  },
  onChat: async function ({ api, message, event }) {
      const prefix = global.GoatBot.config.prefix;
      const itsuki = Object.keys(event.mentions);
if (itsuki == botID) {
return message.reply('𝖤𝗁𝗁𝗁𝗁, 𝖺𝖽𝖺 𝗒𝖺𝗇𝗀 𝖻𝗂𝗌𝖺 𝗄𝗎𝖻𝖺𝗇𝗍𝗎 𝗄𝖺𝗄𝖺? (◍•ᴗ•◍)');
}
    if (event.body && event.body.toLowerCase() == "prefix") {
      const a = await message.reply(`✨ 𝖠𝗐𝖺𝗅𝖺𝗇 𝗂𝗍𝗌𝗎𝗄𝗂 𝖺𝖽𝖺𝗅𝖺𝗁: [ ${prefix} ]`);
      setTimeout(() => { api.editMessage(`𝖪𝖾𝗍𝗂𝗄 ${prefix}𝗆𝖾𝗇𝗎 𝖻𝗎𝖺𝗍 𝗅𝗂𝗁𝖺𝗍 𝖽𝖺𝖿𝗍𝖺𝗋 𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁𝗄𝗎! (◍•ᴗ•◍)`, a.messageID); }, 6000);
      return;
    }
   if (event.body.toLowerCase() == "hmm") { return message.unsend(event.messageReply.messageID);
}
  }
}
