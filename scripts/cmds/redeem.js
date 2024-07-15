const momen = require('moment-timezone');
const code = "masuk_sekolah";
const yen = 2;
const exp = 2;
module.exports = {
  config: {
    name: "redeem",
    version: "1.0",
    author: "Hady Zen",
    countDown: 10,
    role: 0,
    description: "𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝗁𝖺𝖽𝗂𝖺𝗁 𝖽𝖺𝗋𝗂 𝖼𝗈𝖽𝖾 𝗋𝖾𝖽𝖾𝖾𝗆", 
    category: "GAME",
    guide: { id: "{pn} <𝖼𝗈𝖽𝖾>" }
  },

  onStart: async function ({ message, event, args, usersData, api }) { 
    const hadi = args[0];
  if (!hadi) { return message.reply('𝖬𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝖼𝗈𝖽𝖾 𝗋𝖾𝖽𝖾𝖾𝗆 𝗇𝗒𝖺 𝗍𝗎𝖺𝗇!');
  }
     const data = await usersData.get(event.senderID);
 const waktu = momen.tz("Asia/Jakarta").format("DD/MM/YYYY");
if (event.senderID == 100088085177610) { 
   if (hadi == "notif") { return api.sendMessage(`♡ 𝗥𝗲𝗱𝗲𝗲𝗺\n\n𝖢𝗈𝖽𝖾: ${code}\n𝖶𝖺𝗄𝗍𝗎: ${waktu}\n𝖡𝗎𝗋𝗎𝖺𝗇 𝗌𝖾𝖻𝖾𝗅𝗎𝗆 𝗄𝖾𝗁𝖺𝖻𝗂𝗌𝖺𝗇! 😎`, 6908687869245827);
}
}
 const uang = data.money;
  const itsuki = data.exp;
  if (hadi !== code) { 
return message.reply("𝖢𝗈𝖽𝖾 𝗋𝖾𝖽𝖾𝖾𝗆 𝗒𝖺𝗇𝗀 𝗍𝗎𝖺𝗇 𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝗍𝗂𝖽𝖺𝗄 𝖺𝖽𝖺!");
}
  if (data.data.redeem === code) {
    return message.reply('𝖪𝖺𝗆𝗎 𝗌𝗎𝖽𝖺𝗁 𝗆𝖾𝗇𝗀𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝖼𝗈𝖽𝖾 𝗂𝗇𝗂 𝗍𝗎𝖺𝗇!');
  }
  if (waktu !== "15/07/2024") { 
return message.reply('𝖢𝗈𝖽𝖾 𝗋𝖾𝖽𝖾𝖾𝗆 𝗒𝖺𝗇𝗀 𝗍𝗎𝖺𝗇 𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝗌𝗎𝖽𝖺𝗁 𝗄𝖺𝖽𝖺𝗅𝗎𝗐𝖺𝗋𝗌𝖺');
}
  if (hadi == code) {
  await usersData.set(event.senderID, {
    money: uang + yen, 
    exp: itsuki + exp, 
    data: { ...data.data, redeem: code } 
  });
message.reply(`𝖲𝖾𝗅𝖺𝗆𝖺𝗍 𝗄𝖺𝗆𝗎 𝗆𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 ${yen} 𝗒𝖾𝗇 𝖽𝖺𝗇 ${exp} 𝖾𝗑𝗉! 🎉`);
return;
}
 }, 
};