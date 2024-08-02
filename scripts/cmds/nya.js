const font = require("fontstyles"); 
const fs = require('fs');
const path = require('path');
module.exports = {
  config: {
    name: "nya",
    version: "1.0",
    author: "Hady Zen",
    countdown: 10,
    role: 0,
    description: "𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝗎𝗃𝗂 𝖼𝗈𝖻𝖺",
    category: "SISTEM",
    guide: { id: "{pn} <𝗄𝗈𝗌𝗈𝗇𝗀/𝗂𝖽/𝗎𝗂𝖽/𝗀𝗂𝖽/𝖼𝗈𝖽𝖾/𝖼𝗅𝖾𝖺𝗇>" }
  },
  onStart: async function ({ message, args, api, event, usersData }) { 
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += font.bold("-chan");
} else if (gender == 2) { 
 kelamin += font.bold("-kun");
} 
    const nya = args[0];
    switch (nya) {
      case 'id':
        const hadi = await message.reply(nama + kelamin + ' >~<');
        setTimeout(() => { api.editMessage(`${event.senderID}`, hadi.messageID); }, 3000);
        break;
   case 'uid':
        const hmm = await message.reply(nama + kelamin + ' >~<');
        setTimeout(() => { api.editMessage(`${event.messageReply.senderID}`, hmm.messageID); }, 3000);
        break;
      case 'gid':
        const pipi = await message.reply(nama + kelamin + ' >~<');
        setTimeout(() => { api.editMessage(`${event.threadID}`, pipi.messageID); }, 3000);
        break;
      case 'code': 
const itsuki = await message.reply(nama + kelamin + ' >~<');
        setTimeout(() => { api.editMessage(`
module.exports = {
  config: {
    name: "nya",
    version: "1.0",
    author: "Hady Zen",
    countDown: 6,
    role: 0,
    description: "mentahan cmd", 
    category: "SISTEM",
    guide: { id: "" }
  },

  onStart: async function ({ message }) { 
 }, 
  onChat: async function ({ message }) {
 }
};`, itsuki.messageID); }, 3000);
        break;
      case 'cl': 
const miku = path.join(__dirname, 'cache');
const ichika = path.join(__dirname, 'tmp');

const futaro = (folderPath) => {
  if (fs.existsSync(folderPath)) {
const nino = fs.readdirSync(folderPath);
    if (nino.length > 0) {
      nino.forEach(file => {
const youtsuba = path.join(folderPath, file);
        fs.unlinkSync(youtsuba);
return;
});
return;
  } else { return; }
  } else { return; }
};
 futaro(miku);
 futaro(ichika);
message.reply(nama + kelamin + ' >~<');
      break;
      default:
        await usersData.refreshInfo(event.senderID);
        message.reply(nama + kelamin + ' >~<');
        break;
    }
  },
  onChat: async function ({ api, message, event, usersData }) { 
const { gender, name } = await usersData.get(event.senderID);
names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += "-𝗰𝗵𝗮𝗻";
} else if (gender == 2) { 
 kelamin += "-𝗸𝘂𝗻";
} 
      const prefix = global.GoatBot.config.prefix;
      const maintain = global.GoatBot.config.adminOnly.enable;
      const itsuki = Object.keys(event.mentions);
if (itsuki == botID) {
return message.reply(nama + kelamin + ', 𝖺𝖽𝖺 𝗒𝖺𝗇𝗀 𝖻𝗂𝗌𝖺 𝗂𝗍𝗌𝗎𝗄𝗂 𝖻𝖺𝗇𝗍𝗎? >~<');
}
if (maintain == true) { 
return;
} else {
    if (event.body && event.body.toLowerCase() == "prefix") {
      const a = await message.reply(nama + kelamin + `, 𝖺𝗐𝖺𝗅𝖺𝗇 𝗂𝗍𝗌𝗎𝗄𝗂 𝖺𝖽𝖺𝗅𝖺𝗁: [ ${prefix} ]`);
      setTimeout(() => { api.editMessage(`𝖦𝗎𝗇𝖺𝗄𝖺𝗇 ${prefix}𝗆𝖾𝗇𝗎 𝖻𝗎𝖺𝗍 𝗅𝗂𝗁𝖺𝗍 𝖽𝖺𝖿𝗍𝖺𝗋 𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝗐𝖺𝗍𝖺𝗌𝗁𝗂! >~<`, a.messageID); }, 8000);
      return;
    }
}
   if (event.body.toLowerCase() == "hmm") { return message.unsend(event.messageReply.messageID);
}
    const data = await usersData.get(event.senderID);
    const wle = data.data.chat || 0;
if (data.data.chat > 14) {
      await usersData.set(event.senderID, { 
money: data.money + 1,
exp: data.exp + 2,
data: { ...data.data, chat: 0 } });
      return;
    }
if (event.body && !event.body.length < 3) {
      await usersData.set(event.senderID, { data: { ...data.data, chat: wle + 1 } });
      return;
  }
 }
}
