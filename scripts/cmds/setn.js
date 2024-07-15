module.exports = {
  config: {
    name: "setn",
    version: "1.0",
    author: "Hady Zen",
    countDown: 20,
    role: 0,
    description: "𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺 𝗌𝗍𝖺𝗍𝗎𝗌 𝗂𝗍𝗌𝗎𝗄𝗂 𝗄𝖺𝗆𝗎", 
    category: "SISTEM",
    guide: { id: "{pn} <𝗇𝖺𝗆𝖺/𝗋𝖾𝗌𝖾𝗍>" }
  },

  onStart: async function ({ message, args, event, usersData }) { 
    const nama = args.join(' ');
  if (!nama) { return message.reply('𝖲𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗍𝗎𝗅𝗂𝗌𝖺𝗄𝖺𝗇 𝗇𝖺𝗆𝖺𝗆𝗎 𝗍𝗎𝖺𝗇!');
  } 
  if (nama.length > 14) {
    return message.reply('𝖭𝖺𝗆𝖺 𝗄𝖺𝗆𝗎 𝗅𝖾𝖻𝗂𝗁 𝖽𝖺𝗋𝗂 𝟣𝟦 𝗁𝗎𝗋𝗎𝖿!')
  }
   const data = await usersData.get(event.senderID);
 const hadi = data.money;
 if (hadi < 1) { return message.reply('𝖪𝖺𝗆𝗎 𝗆𝖾𝗆𝖻𝗎𝗍𝗎𝗁𝗄𝖺𝗇 𝟣 𝗒𝖾𝗇 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝗀𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺');
}
if (nama == "reset") { 
  await usersData.set(event.senderID, { 
     money: hadi - 2,
     data: { ...data.data, nama: '' }
});
   return message.reply('𝖭𝖺𝗆𝖺 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂 𝗌𝖾𝗍𝖾𝗅 𝗎𝗅𝖺𝗇𝗀');
} else {
  await usersData.set(event.senderID, {
     money: hadi - 2,
    data: { ...data.data, nama: nama }
  });
   message.reply(`𝖭𝖺𝗆𝖺 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂 𝗎𝖻𝖺𝗁 𝗆𝖾𝗇𝗃𝖺𝖽𝗂 ${nama}`);
}
 }, 
};