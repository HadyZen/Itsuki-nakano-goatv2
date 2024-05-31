const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "bot",
    version: "𝟣.𝟢",
    author: "Rizky Z (hadi)",
    countDown: 10,
    role: 2,
    category: "SISTEM",
    description: "𝗈𝗎𝗍, 𝗃𝗈𝗂𝗇, 𝖽𝖺𝗇 𝗌𝖾𝗇𝖽 𝗉𝖾𝗌𝖺𝗇",
    guide: { id: "{pn} <𝗈𝗎𝗍/𝗃𝗈𝗂𝗇/𝖼𝗁𝖺𝗍> <𝗍𝗂𝖽>" }
  },
  onStart: async function ({ message, args, api, event }) {
    const hadi = args[0];
    const pipi = args[1];

    if (hadi == "out") { 
      api.removeUserFromGroup(botID, `${pipi || event.threadID}`);
    } else if (hadi == "join") {
      if (!pipi) {
        return message.reply('𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝗀𝗋𝗎𝗉');
      }
      return api.addUserToGroup(event.senderID, pipi);
    } else if (hadi == "chat") {
      if (!pipi) {
        return message.reply('𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝗀𝗋𝗎𝗉');
      }
      api.sendMessage('𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗍𝖾𝗋𝗁𝗎𝖻𝗎𝗇𝗀!', pipi);

    } else {
      message.reply('𝖯𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝗍𝗂𝖽𝖺𝗄 𝗏𝖺𝗅𝗂𝖽!');
    }
  }
};