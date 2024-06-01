module.exports = {
  config: {
    name: "onchat",
    version: "1.0",
    author: "Rizky Z (hadi)",
    countDown: 10,
    role: 0,
    description: "𝗌𝗂𝗌𝗍𝖾𝗆 𝗈𝗇𝖼𝗁𝖺𝗍 𝖻𝗈𝗍",
    category: "SISTEM",
    guide: { id: "{pn}" }
  },

  onStart: async function ({ message }) {
  }, 

  onChat: async function ({ api, message, event }) {
    const prefix = ":";
    if (event.body && event.body.toLowerCase() == "prefix") {
      const a = await message.reply(`✨ 𝖠𝗐𝖺𝗅𝖺𝗇 𝗋𝖺𝖿𝖿𝖺 𝖺𝖽𝖺𝗅𝖺𝗁: [ ${prefix} ]`);
      setTimeout(() => { api.editMessage(`𝖦𝗎𝗇𝖺𝗄𝖺𝗇 ${prrfix}𝗆𝖾𝗇𝗎 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗅𝗂𝗁𝖺𝗍 𝖽𝖺𝖿𝗍𝖺𝗋 𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁!`, a.messageID); }, 16000);
      return;
    }
  if (event.body && event.body.toLowerCase() == "uid") { return message.reply(`✨ 𝗨𝘀𝗲𝗿 𝗜𝗗\n${event.messageReply.senderID}`);
    }
  if (event.body && event.body.toLowerCase() == "gid") { return message.reply(`✨ 𝗚𝗿𝘂𝗽 𝗜𝗗\n${event.threadID}`);
   }
  }
}