const font = require("fontstyles");
module.exports = {
  config: {
    name: "rand",
    version: "𝟣.𝟣",
    author: "Hady Zen",
    countDown: 14,
    role: 0,
    description: "𝗉𝗂𝗅𝗂𝗁𝖺𝗇 𝖺𝖼𝖺𝗄", 
    category: "GAME",
    guide: { id: "{pn} <𝗉𝗂𝗅𝗂𝗁𝖺𝗇>, <𝗉𝗂𝗅𝗂𝗁𝖺𝗇>\n𝖼𝗈𝗇𝗍𝗈𝗁: {p}𝗋𝖺𝗇𝖽 𝗒𝗈𝗍𝗌𝗎𝖻𝖺, 𝗂𝗍𝗌𝗎𝗄𝗂, 𝗆𝗂𝗄𝗎" }
  },

  onStart: async function ({ message, args, usersData, event }) { 
   const hadi = args.join(' ');
   const itsuki = hadi.split(", ");
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += "-𝗰𝗵𝗮𝗻";
} else if (gender == 2) { 
 kelamin += "-𝗸𝘂𝗻";
} 
 if (!hadi || itsuki.length < 2) {
   return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗁𝖺𝗋𝗎𝗌 𝗆𝖾𝗆𝖻𝖾𝗋𝗂𝗄𝖺𝗇 𝗌𝖾𝗍𝗂𝖽𝖺𝗄𝗇𝗒𝖺 𝟤 𝗉𝗂𝗅𝗂𝗁𝖺𝗇.'); 
 }
const rand = Math.floor(Math.random() * itsuki.length);
const hasil = itsuki[rand];
const pilihan = font.bold(hasil);
message.reply(nama + kelamin + `, 𝗂𝗍𝗌𝗎𝗄𝗂 𝗅𝖾𝖻𝗂𝗁 𝗆𝖾𝗆𝗂𝗅𝗂𝗁 ${pilihan}`);
 }
};
