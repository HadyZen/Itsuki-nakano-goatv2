const font = require("fontstyles");
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
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += font.bold("-chan");
} else if (gender == 2) { 
 kelamin += font.bold("-kun");
} 
    const title = args.join(' ');
  if (!title) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗌𝖾𝖻𝗎𝖺𝗁 𝗄𝖺𝗍𝖺𝗉𝗎𝗇!');
  } 
  if (title.length > 6) {
    return message.reply(nama + kelamin + ', 𝗍𝗂𝗍𝗅𝖾 𝗄𝖺𝗆𝗎 𝗅𝖾𝖻𝗂𝗁 𝖽𝖺𝗋𝗂 𝟲 𝗁𝗎𝗋𝗎𝖿!')
  }
   const data = await usersData.get(event.senderID);
 const hadi = data.money;
 if (hadi < 3) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗆𝖾𝗆𝖻𝗎𝗍𝗎𝗁𝗄𝖺𝗇 𝟮 𝗒𝖾𝗇 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝗀𝗀𝖺𝗇𝗍𝗂 𝗍𝗂𝗍𝗅𝖾.');
}
  await usersData.set(event.senderID, {
     money: hadi - 2,
    data: { ...data.data, title: title }
  });
   const itsuki = font.bold(`${nama}${kelamin}, 𝗍𝗂𝗍𝗅𝖾 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂 𝗎𝖻𝖺𝗁 𝗆𝖾𝗇𝗃𝖺𝖽𝗂 ${title}.`);
   message.reply(itsuki);
 }, 
};
