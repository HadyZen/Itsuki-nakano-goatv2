const axios = require('axios');

module.exports = {
  config: {
    name: "math",
    version: "𝟣.𝟢",
    countDown: 10,
    role: 0,
    category: "MEDIA",
    description: "𝗁𝗂𝗍𝗎𝗇𝗀 𝖾𝗄𝗌𝗉𝗋𝖾𝗌𝗂 𝗆𝖺𝗍𝖾𝗆𝖺𝗍𝗂𝗄𝖺",
    author: "Rizky Z (hadi)",
    guide: { id: "{pn} <𝗌𝗈𝖺𝗅>\n+: 𝗍𝖺𝗆𝖻𝖺𝗁\𝗇-: 𝗄𝗎𝗋𝖺𝗇𝗀\𝗇*: 𝗄𝖺𝗅𝗂\𝗇/: 𝖻𝖺𝗀𝗂" }
  },

  onStart: async function ({ message, args }) {
      try { 
    const soal = args.join(' ');
    if (!soal) {
     return message.reply('𝖲𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗌𝗈𝖺𝗅!')
}
    const jumlah = await axios.get(`http://api.mathjs.org/v4/?expr=${encodeURIComponent(soal)}`);
    const hasil = jumlah.data;
    if (hasil && jumlah.data) {
     return message.reply(`✨ 𝗠𝗮𝘁𝗵\n𝗃𝗎𝗆𝗅𝖺𝗁: ${soal} = ${hasil}`);
} else {
  message.reply('𝖲𝗈𝖺𝗅 𝗄𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗏𝖺𝗅𝗂𝖽!')
}
} catch (error) {
  message.reply('𝖤𝗋𝗋𝗈𝗋')
}
 }
};