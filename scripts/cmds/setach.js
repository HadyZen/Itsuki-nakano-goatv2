const font = require("fontstyles");
module.exports = {
 config: {
 name: "setach",
 version: "1.0",
 author: "Hady Zen",
 countDown: 10,
 role: 0,
 description: "𝗌𝖾𝗍 𝖺𝖼𝗁 𝗎𝗇𝗍𝗎𝗄 𝗌𝗍𝖺𝗍𝗎𝗌 𝗂𝗍𝗌𝗎𝗄𝗂 𝗄𝖺𝗆𝗎", 
 category: "SISTEM",
 guide: { id: "{pn} <𝗂𝖽>" }
 },

 onStart: async function ({ message, usersData, event, args }) { 
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += font.bold("-chan");
} else if (gender == 2) { 
 kelamin += font.bold("-kun");
} 
 const itsuki = parseInt(args[0]);
 if (!args.join(' ')) { 
   return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝖺𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍 𝗇𝗒𝖺.');
 }

 const data = await usersData.get(event.senderID);
  if (data.data.money < 3) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗆𝖾𝗆𝖻𝗎𝗍𝗎𝗁𝗄𝖺𝗇 𝟮 𝗒𝖾𝗇 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝗀𝗀𝖺𝗇𝗍𝗂 𝖺𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍!');
}
 if (!data.data.ach) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗆𝖾𝗆𝗂𝗅𝗂𝗄𝗂 𝖺𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍 𝖺𝗉𝖺𝗉𝗎𝗇!');
}
 const hadi = data.data.ach[itsuki];
 if (!hadi) { 
   return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗉𝗎𝗇𝗒𝖺 𝖺𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍 𝗂𝗍𝗎!');
 } else { 
   await usersData.set(event.senderID, { 
money: data.money - 2,
data: { ...data.data, setach: hadi } });
   message.reply(nama + kelamin + ', 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗀𝖺𝗇𝗍𝗂 𝖺𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍.');
 }
 }, 
};
