const axios = require('axios');

module.exports = {
  config: {
   name: 'moji',
   version: '1.0',
   author: 'Riley',
   role: 0,
   category: 'MEDIA',
   description: '𝗎𝖻𝖺𝗁 𝗄𝖺𝗍𝖺 𝗃𝖺𝖽𝗂 𝖾𝗆𝗈𝗃𝗂', 
   guide: { id: '{pn} <𝗄𝖺𝗍𝖺>' }
    },
    onStart: async function ({ api, message, args }) {
    const query = args.join(" ");
    if (!query) {
      message.reply("✍️🤌⁉️");
 return;
}

    try {
    const response = await axios.get(`https://itzpire.site/ai/gpt-logic?q=${encodeURIComponent(query)}&logic=You%20will%20be%20provided%20with%20a%20message%2C%20and%20your%20task%20is%20to%20respond%20using%20emojis%20only`);
    const { data } = response.data;

    if (data && data.response) {
      message.reply(data.response);
} else {
   message.reply("𝖤𝗋𝗋𝗈𝗋");
            }
} catch (error) {
   message.reply("🙅‍♂️😣✖️");
  }
 }
};