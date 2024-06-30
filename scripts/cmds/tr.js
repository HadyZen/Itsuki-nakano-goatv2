const axios = require('axios');

module.exports = {
    config: {
        name: "tr",
        version: "1.0",
        author: "Hady Zen",
        countDown: 8,
        role: 0,
        description: "𝗍𝖾𝗋𝗃𝖾𝗆𝖺𝗁𝗄𝖺𝗇 𝗍𝖾𝗄𝗌",
        category: "MEDIA",
        guide: { id: "{pn} <𝖻𝖺𝗁𝖺𝗌𝖺> <𝗍𝖾𝗄𝗌>" },
    },
    onStart: async function ({ message, args }) {
        try {
            const bhs = args[0];
            const teks = args.slice(1).join(' ');
            
            if (!bhs || !teks) {
                return message.reply('cara yang bener {p}tr id dick');
            }
            
            const hadi = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${bhs}&dt=t&q=${encodeURIComponent(teks)}`);
            
            const arti = hadi.data[0].map(item => item[0]).join('');
            
            message.reply(`♡ 𝗧𝗲𝗿𝗷𝗲𝗺𝗮𝗵𝗮𝗻\n\n${arti}`);
        } catch (error) {
            message.reply('𝖪𝗈𝖽𝖾 𝖻𝖺𝗁𝖺𝗌𝖺 𝗀𝖺𝗄 𝗏𝖺𝗅𝗂𝖽 𝗍𝗎𝖺𝗇!');
        }
    }
};
