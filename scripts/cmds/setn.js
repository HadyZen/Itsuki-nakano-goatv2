const font = require("fontstyles");
module.exports = {
  config: {
    name: "setn",
    version: "1.1",
    author: "Hady Zen",
    countDown: 20,
    role: 0,
    description: "𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺 𝗌𝗍𝖺𝗍𝗎𝗌 𝗂𝗍𝗌𝗎𝗄𝗂 𝗄𝖺𝗆𝗎", 
    category: "SISTEM",
    guide: { id: "{pn} <𝗇𝖺𝗆𝖺/𝗋𝖾𝗌𝖾𝗍>" }
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
    const miku = args.join(' ');
  if (!miku) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗇𝖺𝗆𝖺 𝗒𝖺𝗇𝗀 𝗄𝖺𝗆𝗎 𝗂𝗇𝗀𝗂𝗇𝗄𝖺𝗇!');
  } 
  if (nama.length > 14) {
    return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗇𝖺𝗆𝖺 𝗅𝖾𝖻𝗂𝗁 𝖽𝖺𝗋𝗂 𝟭𝟰 𝗄𝖺𝗋𝖺𝗄𝗍𝖾𝗋!')
  }
   const data = await usersData.get(event.senderID);
 const hadi = data.money;
 if (hadi < 3) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗆𝖾𝗆𝖻𝗎𝗍𝗎𝗁𝗄𝖺𝗇 𝟮 𝗒𝖾𝗇 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝗀𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺.');
}
if (nama == "reset") { 
  await usersData.set(event.senderID, { 
     money: hadi - 2,
     data: { ...data.data, nama: '' }
});
   return message.reply(nama + kelamin + ', 𝗇𝖺𝗆𝖺 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂 𝗌𝖾𝗍𝖾𝗅 𝗎𝗅𝖺𝗇𝗀!');
} else {
  await usersData.set(event.senderID, {
     money: hadi - 2,
    data: { ...data.data, nama: miku }
  });
   const itsuki = font.bold(`${nama}${kelamin}, 𝗇𝖺𝗆𝖺 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂 𝗎𝖻𝖺𝗁 𝗆𝖾𝗇𝗃𝖺𝖽𝗂 ${miku}.`);
   message.reply(itsuki);
}
 }, 
};