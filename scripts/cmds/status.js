const font = require("fontstyles");
module.exports = {
  config: {
    name: "status",
    version: "1.0",
    author: "Hady Zen",
    countDown: 30,
    role: 0,
    description: "𝖼𝖾𝗄 𝗌𝗍𝖺𝗍𝗎𝗌 𝗂𝗍𝗌𝗎𝗄𝗂 𝗄𝖺𝗆𝗎",
    category: "GAME",
    guide: { id: "{pn}" },
  },

  onStart: async function ({ message, usersData, event }) {
    const author = event.senderID;
    const hadi = await usersData.get(author);
    const nick = hadi.data.nama;
    const title = hadi.data.title;
    const ach = hadi.data.setach;
    const author_hadi = `♡ 𝗦𝘁𝗮𝘁𝘂𝘀

- 𝖭𝖺𝗆𝖺: ${nick || hadi.name}
- 𝖨𝖣: ${author}
- 𝖸𝖾𝗇: ${hadi.money}¥
- 𝖳𝗂𝗍𝗅𝖾: ${title || "𝖴𝗌𝖾𝗋 𝗂𝗍𝗌𝗎𝗄𝗂"}
- 𝖳𝗈𝗍𝖺𝗅 𝗉𝖾𝗌𝖺𝗇: ${hadi.data.pesan || 0}
- 𝖠𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍: ${ach || "𝖳𝗂𝖽𝖺𝗄 𝖺𝖽𝖺"}`;
    message.reply(font.thin(author_hadi));
  },

  onChat: async function ({ event, usersData }) {
    const data = await usersData.get(event.senderID);
    const jumlah = data.data.pesan || 0;
    if (event.body) {
      await usersData.set(event.senderID, { data: { ...data.data, pesan: jumlah + 1 } });
      return;
    }
  }
};
