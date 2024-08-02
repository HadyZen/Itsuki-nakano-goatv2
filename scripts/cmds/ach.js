const font = require("fontstyles");
module.exports = {
  config: {
    name: "ach",
    version: "1.0",
    author: "Hady Zen",
    countDown: 10,
    role: 0,
    description: "𝗍𝖺𝗆𝗉𝗂𝗅𝗄𝖺𝗇 𝖽𝖺𝖿𝗍𝖺𝗋 𝖺𝖼𝗁 𝗄𝖺𝗆𝗎",
    category: "SISTEM",
    guide: { id: "{pn}" }
  },

  onStart: async function ({ message, usersData, event }) {
    const y = await usersData.get(event.senderID);
    let hadi = "";
    const a = y.data.ach;
    if (!a) {
      hadi += "𝗄𝗈𝗌𝗈𝗇𝗀";
    } else {
      hadi += a.map((item, index) => font.bold(`#${index}: ${item}`)).join('\n');
    }
    message.reply(`♡ 𝗔𝗰𝗵𝗶𝗲𝘃𝗲𝗺𝗲𝗻𝘁\n\n${hadi}`);
  },

  onChat: async function ({ message, usersData, event }) {
const ft = await utils.getStreamFromURL("https://i.ibb.co/XLKcJzs/451763687-1197297028131703-5386339310108099610-n-jpg-nc-cat-104-ccb-1-7-nc-sid-9f807c-nc-ohc-V4-Bu-T.jpg");
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += "-𝗰𝗵𝗮𝗻";
} else if (gender == 2) { 
 kelamin += "-𝗸𝘂𝗻";
} 
    const data = await usersData.get(event.senderID);
    const p = data.data.ach || [];
    const hadi = ["𝖤𝗑𝗉 𝗉𝗋𝗈 𝖨", "𝖬𝗈𝗇𝖾𝗒 𝗉𝗋𝗈"];

      if (data.exp > 30 && !p.includes(hadi[0])) {
        message.send({ body: nama + kelamin + ', 𝗌𝖾𝗅𝖺𝗆𝖺𝗍 𝗄𝖺𝗆𝗎 𝗆𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖺𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍 𝖻𝖺𝗋𝗎!', attachment: ft });
        p.push(hadi[0]);
        await usersData.set(event.senderID, { data: { ...data.data, ach: p } });

    } else if (data.money > 20 && !p.includes(hadi[1])) {
        message.send({ body: nama + kelamin + ', 𝗌𝖾𝗅𝖺𝗆𝖺𝗍 𝗄𝖺𝗆𝗎 𝗆𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖺𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍 𝖻𝖺𝗋𝗎!', attachment: ft });
        const p = data.data.ach || [];
        p.push(hadi[1]);
        await usersData.set(event.senderID, { data: { ...data.data, ach: p } });
   }
  }
};
