const font = require("fontstyles");
module.exports = {
  config: {
    name: "pay",
    version: "1.0",
    author: "Hady Zen",
    countDown: 20,
    role: 0,
    description: "𝖻𝖾𝗋𝖻𝖺𝗀𝗂 𝗒𝖾𝗇 𝗂𝗍𝗎 𝗂𝗇𝖽𝖺𝗁", 
    category: "GAME",
    guide: { id: "{pn} <𝗂𝖽> <𝗃𝗎𝗆𝗅𝖺𝗁>" }
  },

  onStart: async function ({ message, event, usersData, args }) { 
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += font.bold("-chan");
} else if (gender == 2) { 
 kelamin += font.bold("-kun");
} 
    const orang = args[0];
    const jumlah = parseInt(args[1]);
  if (!orang) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝗍𝗎𝗃𝗎𝖺𝗇.');
  }
  if (!jumlah) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗃𝗎𝗆𝗅𝖺𝗁 𝗒𝖺𝗇𝗀 𝗂𝗇𝗀𝗂𝗇 𝖽𝗂 𝗍𝗋𝖺𝗇𝗌𝖿𝖾𝗋.');
  }
 if (isNaN(orang)) { 
    return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝗒𝖺𝗇𝗀 𝗍𝗂𝖽𝖺𝗄 𝗆𝖾𝗇𝖽𝗎𝗄𝗎𝗇𝗀!');
  }
  if (isNaN(jumlah)) { 
    return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗃𝗎𝗆𝗅𝖺𝗁 𝗒𝖺𝗇𝗀 𝗍𝗂𝖽𝖺𝗄 𝗆𝖾𝗇𝖽𝗎𝗄𝗎𝗇𝗀!');
  }
  if (event.senderID == orang) {
    return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝖻𝗂𝗌𝖺 𝗆𝖾𝗇𝗀𝗂𝗋𝗂𝗆 𝗒𝖾𝗇 𝗄𝖾 𝖺𝗄𝗎𝗇 𝗌𝖾𝗇𝖽𝗂𝗋𝗂!')
  }
  const yen = await usersData.get(event.senderID);
  const a = await usersData.get(orang, "money");
  const uang = yen.money;
const miku = await usersData.getName(orang);
const { gender: cok } = await usersData.get(orang);
const yotsuba = miku.split(" ")[0];
const nino = font.bold(yotsuba);
let ichika = "";
if (cok == 1) { 
 ichika += font.bold("-chan");
} else if (cok == 2) { 
 ichika += font.bold("-kun");
} 
  if (yen.money < jumlah) {
    return message.reply(nama + kelamin + ', 𝗒𝖾𝗇 𝗄𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗆𝖾𝗇𝖼𝗎𝗄𝗎𝗉𝗂!');
  }
  if (nama == "Pengguna Facebook" || nama == "null" || nama == "Facebook User") {
return message.reply(nama + kelamin + ', 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗒𝖺𝗇𝗀 𝗄𝖺𝗆𝗎 𝗍𝗎𝗃𝗎 𝗍𝗂𝖽𝖺𝗄 𝖺𝖽𝖺!');
} else { 
   await usersData.set(event.senderID, { money: uang - jumlah });
   const futaro = font.bold(`${nama}${kelamin} 𝗆𝖾𝗇𝗀𝗂𝗋𝗂𝗆 ${jumlah} 𝗒𝖾𝗇 𝗄𝖾 ${nino}${ichika}`);
