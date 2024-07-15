module.exports = {
  config: {
    name: "sett",
    version: "1.0",
    author: "Hady Zen",
    countDown: 20,
    role: 0,
    description: "𝗀𝖺𝗇𝗍𝗂 𝗍𝗂𝗍𝗅𝖾 𝗌𝗍𝖺𝗍𝗎𝗌 𝗂𝗍𝗌𝗎𝗄𝗂 𝗄𝖺𝗆𝗎", 
    category: "SISTEM",
    guide: { id: "{pn} <𝗍𝗂𝗍𝗅𝖾>" }
  },

  onStart: async function ({ message, args, event, usersData }) { 
    const title = args.join(' ');
  if (!title) { return message.reply('𝖲𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗍𝗎𝗅𝗂𝗌𝖺𝗄𝖺𝗇 𝗍𝗂𝗍𝗅𝖾𝗆𝗎 𝗍𝗎𝖺𝗇!');
  } 
  if (title.length > 7) {
    return message.reply('𝖳𝗂𝗍𝗅𝖾 𝗄𝖺𝗆𝗎 𝗅𝖾𝖻𝗂𝗁 𝖽𝖺𝗋𝗂 𝟨 𝗁𝗎𝗋𝗎𝖿!')
  }
   const data = await usersData.get(event.senderID);
 const hadi = data.money;
 if (hadi < 1) { return message.reply('𝖪𝖺𝗆𝗎 𝗆𝖾𝗆𝖻𝗎𝗍𝗎𝗁𝗄𝖺𝗇 𝟣 𝗒𝖾𝗇 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝗀𝗀𝖺𝗇𝗍𝗂 𝗍𝗂𝗍𝗅𝖾');
}
  await usersData.set(event.senderID, {
     money: hadi - 2,
    data: { ...data.data, title: title }
  });
   message.reply(`𝖳𝗂𝗍𝗅𝖾 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂 𝗎𝖻𝖺𝗁 𝗆𝖾𝗇𝗃𝖺𝖽𝗂 ${title}`)
 }, 
};