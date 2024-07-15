module.exports = {
  config: {
    name: "status",
    version: "1.0",
    author: "Hady Zen",
    countDown: 40,
    role: 0,
    description: "𝖼𝖾𝗄 𝗌𝗍𝖺𝗍𝗎𝗌 𝗂𝗍𝗌𝗎𝗄𝗂 𝗄𝖺𝗆𝗎", 
    category: "GAME",
    guide: { id: "{pn}" }
  },
  
  onStart: async function ({ message, usersData, event }) { 
    const author = event.senderID;
    const hadi = await usersData.get(author);
    const nick = hadi.data.nama;
    const title = hadi.data.title;
    const ach = hadi.exp;
    const author_hadi = `♡ 𝗦𝘁𝗮𝘁𝘂𝘀
- 𝖭𝖺𝗆𝖺: ${ nick || hadi.name}
- 𝖨𝖣: ${author}
- 𝖸𝖾𝗇: ${hadi.money}¥
- 𝖠𝖼𝗁: ${itsuki(ach)}
- 𝖳𝗂𝗍𝗅𝖾: ${title || "𝗐𝖺𝗅𝖺𝗐𝖾"}`;
    message.reply(author_hadi);
 }, 
};

function itsuki(ach) {
  if (ach < 100) {
    return "𝖡𝗋𝗈𝗇𝗓𝖾";
  } else if (ach < 200) {
    return "𝖲𝗂𝗅𝗏𝖾𝗋";
  } else if (ach < 400) {
    return "𝖦𝗈𝗅𝖽";
  } else if (ach < 600) {
    return "𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆";
  } else if (ach < 900) {
    return "𝖣𝗂𝖺𝗆𝗈𝗇𝖽";
  } else if (ach < 1100) {
    return "𝖧𝖾𝗋𝗈𝗂𝖼"
  } else if (ach < 1400) {
    return "𝖤𝗅𝗂𝗍𝖾 𝗁𝖾𝗋𝗈𝗂𝖼";
  } else { 
    return "𝖦𝗋𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋 👑";
  }
};