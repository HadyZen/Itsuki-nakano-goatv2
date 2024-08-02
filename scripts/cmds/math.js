const axios = require('axios');
const font = require("fontstyles");
module.exports = {
  config: {
    name: "math",
    version: "1.1",
    countDown: 10,
    role: 0,
    category: "MEDIA",
    description: "𝗁𝗂𝗍𝗎𝗇𝗀 𝖾𝗄𝗌𝗉𝗋𝖾𝗌𝗂 𝗆𝖺𝗍𝖾𝗆𝖺𝗍𝗂𝗄𝖺",
    author: "Hady Zen",
    guide: { id: "{pn} <𝗌𝗈𝖺𝗅>\n+: 𝗍𝖺𝗆𝖻𝖺𝗁\𝗇-: 𝗄𝗎𝗋𝖺𝗇𝗀\𝗇*: 𝗄𝖺𝗅𝗂\𝗇/: 𝖻𝖺𝗀𝗂" }
  },

  onStart: async function ({ message, args, event, usersData }) {
      try { 
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += font.bold("-chan");
} else if (gender == 2) { 
 kelamin += font.bold("-kun");
} 
    const soal = args.join(' ');
    if (!soal) {
     return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗌𝗈𝖺𝗅𝗇𝗒𝖺.')
}
    const jumlah = await axios.get(`http://api.mathjs.org/v4/?expr=${encodeURIComponent(soal)}`);
    const hasil = jumlah.data;
    if (hasil && jumlah.data) { 
     const hadi = font.thin(`♡ ${font.bold(soal)} = ${hasil}`);
     return message.reply(hadi);
} else {
  message.reply(nama + kelamin + ', 𝗌𝗈𝖺𝗅 𝗄𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗏𝖺𝗅𝗂𝖽!')
}
} catch (error) {
  message.reply('𝖤𝗋𝗋𝗈𝗋: ' + error);
}
 }
};
