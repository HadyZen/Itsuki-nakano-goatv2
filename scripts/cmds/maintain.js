const { config } = global.GoatBot;

module.exports = { 
  config: {
    name: "maintain",
    version: "1.0",
    author: "Hady Zen",
    countDown: 6,
    role: 2,
    description: "𝗆𝗈𝖽𝖾 𝗁𝖺𝗇𝗒𝖺 𝖺𝖽𝗆𝗂𝗇",
    category: "ADMIN",
    guide: { id: ":ai <𝗄𝗈𝗌𝗈𝗇𝗀/𝗇𝗈𝗍𝗂> <𝗈𝗇/𝗈𝖿𝖿>" }
  },

  onStart: function ({ args, message }) {
    switch (args[0]) {
      case 'on':
        config.adminOnly.enable = true;
        message.reply('𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝗆𝗈𝖽𝖾 𝗆𝖺𝗂𝗇𝗍𝖺𝗂𝗇!');
        break;
      case 'off':
        config.adminOnly.enable = false;
        message.reply('𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝗆𝗈𝖽𝖾 𝗆𝖺𝗂𝗇𝗍𝖺𝗂𝗇!');
        break;
      case 'noti':
        const hadi = args[1];
        if (hadi == "on") {
          config.hideNotiMessage.adminOnly = false;
          return message.reply('𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝗇𝗈𝗍𝗂𝖿𝗂𝗄𝖺𝗌𝗂 𝗆𝗈𝖽𝖾 𝗆𝖺𝗂𝗇𝗍𝖺𝗂𝗇!');
        }
        if (hadi == "off") {
          config.hideNotiMessage.adminOnly = true;
          return message.reply('𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝗇𝗈𝗍𝗂𝖿𝗂𝗄𝖺𝗌𝗂 𝗆𝗈𝖽𝖾 𝗆𝖺𝗂𝗇𝗍𝖺𝗂𝗇');
        }
        break;
      default:
        message.SyntaxError();
    }
  }
};
