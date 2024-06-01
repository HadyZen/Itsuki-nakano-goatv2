const fetch = require('node-fetch');

module.exports = {
  config: {
    name: "gcode",
    version: "1.0",
    author: "Edinst",
    role: 0,
    countDown: 10,
    description: "𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝗍𝖾𝗄𝗌 𝖽𝗂𝖽𝖺𝗅𝖺𝗆 𝗍𝖺𝗎𝗍𝖺𝗇", 
    category: "MEDIA",
    guide: { id: "{pn} <𝗍𝖺𝗎𝗍𝖺𝗇>" }
  },

  onStart: async function({ args, message }) {
    try {
      const link = args[0];
      const response = await fetch(link);
      const text = await response.text();
      message.reply(text);
    } catch (error) {
      console.error(error);
      message.reply("𝖳𝖾𝗋𝗃𝖺𝖽𝗂 𝗄𝖾𝗌𝖺𝗅𝖺𝗁𝖺𝗇 𝗌𝖺𝖺𝗍 𝗆𝖾𝗇𝗀𝖺𝗆𝖻𝗂𝗅 𝗂𝗌𝗂 𝗍𝖺𝗎𝗍𝖺𝗇");
    }
  }
};