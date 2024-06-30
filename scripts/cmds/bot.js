const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "bot",
    version: "1.2",
    author: "Hady Zen",
    countDown: 10,
    role: 2,
    category: "SISTEM",
    description: "𝗈𝗎𝗍, 𝗃𝗈𝗂𝗇, 𝖻𝗂𝗇, 𝖽𝖺𝗇 𝗌𝖾𝗇𝖽 𝗉𝖾𝗌𝖺𝗇",
    guide: { id: "{pn} <𝗈𝗎𝗍/𝗃𝗈𝗂𝗇/𝖻𝗂𝗇> <𝗂𝖽/𝖿𝗂𝗅𝖾>" }
  },
  onStart: async function ({ message, args, api, event }) {
    const hadi = args[0];
    const pipi = args[1];

    if (hadi === "out") { 
      api.removeUserFromGroup(botID, `${pipi || event.threadID}`);
message.reaction("✔️", event.messageID);
    } else if (hadi === "join") {
      if (!pipi) {
        return message.reply('𝖪𝖺𝗆𝗎 𝗁𝖺𝗋𝗎𝗌 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝗀𝗋𝗎𝗉 𝗇𝗒𝖺!');
      }
      return api.addUserToGroup(event.senderID, pipi);
message.reaction("✔️", event.messageID);
    } else if (hadi === "chat") {
      if (!pipi) {
        return message.reply('𝖬𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝗀𝗋𝗎𝗉 𝗇𝗒𝖺!');
      }
      api.sendMessage('𝖳𝖾𝗋𝗁𝗎𝖻𝗎𝗇𝗀 𝗄𝖾 𝗀𝗋𝗎𝗉!', pipi);
message.reaction("✔️", event.messageID);
    } else {
      message.reply('𝖾𝗋𝗋𝗈𝗋');
    }
  }
};
