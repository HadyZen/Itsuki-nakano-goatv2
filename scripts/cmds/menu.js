const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { commands } = global.GoatBot;
const font = require("fontstyles");
module.exports = {
config: {
 name: "menu",
 version: "2.0",
 author: "Hady Zen",
 countDown: 10,
 role: 0,
 description: "𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝖻𝖺𝗇𝗍𝗎𝖺𝗇",
 category: "SISTEM",
 guide: { id: "{pn} <𝗄𝗈𝗌𝗈𝗇𝗀/𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁>" },
 priority: 1,
},

onStart: async function ({ api, message, args, event, role, globalData, usersData }) {
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += "-𝗰𝗵𝗮𝗻";
} else if (gender == 2) { 
 kelamin += "-𝗸𝘂𝗻";
} 
    const awalan = global.GoatBot.config.prefix;
    const kosong = args.length;
 if (kosong === 0) {
    const categories = {};
    let pesan = "";
    pesan += "♡ 𝗗𝗮𝗳𝘁𝗮𝗿 𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵\n\n";
for (const [name, value] of commands) {
 if (value.config.role > 1 && role < value.config.role) continue;
    const category = value.config.category || "-";
categories[category] = categories[category] || { commands: [] };
categories[category].commands.push(name);
                        }

Object.keys(categories).forEach((category) => {
 if (category !== "info") {
    const jumlah = categories[category].commands.sort();
    const teks = font.bold(`${category.toUpperCase()} (${jumlah.length})`);
pesan += `- ${teks}`;


    const names = categories[category].commands.sort();
for (let i = 0; i < names.length; i += 80) {
    const cmds = names.slice(i, i + 80).map((item) => `${item},`);
pesan += font.thin(`\n${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`);
}
  pesan += `\n\n`;
}
});

 pesan += `𝖦𝗎𝗇𝖺𝗄𝖺𝗇 𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 ${awalan}𝗺𝗲𝗻𝘂 <𝗻𝗮𝗺𝗮 𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵> 𝗎𝗇𝗍𝗎𝗄 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗌𝗂 𝗅𝖾𝖻𝗂𝗁 𝗅𝖺𝗇𝗃𝗎𝗍!`;

    const uns = await message.reply(pesan);
setTimeout(() => { api.unsendMessage(uns.messageID); }, 900000);

} else {
    const perintah2 = args[0].toLowerCase();
    const perintah3 = commands.get(perintah2);

if (!perintah3) {
await message.reply(nama + kelamin + `, 𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 ${font.bold(perintah2)} 𝗍𝗂𝖽𝖺𝗄 𝖺𝖽𝖺!`);
} else {
    const perintah4 = perintah3.config;
    const nama = perintah4.name;
        const model = perintah4.version || "1.0";
        const tenang = perintah4.countDown || 6;
        const roleText = peran(perintah4.role);
        const penulis = perintah4.author || "-";
    const deskripsi = perintah4.description ? perintah4.description || "-" : "-";
        const guideBody = perintah4.guide?.id || "-";
        const panduan = guideBody
.replace(/\{prefix\}|\{p\}/g, awalan)
.replace(/\{name\}|\{n\}/g, perintah4.name)
.replace(/\{pn\}/g, awalan + perintah4.name);

        const pesan = 
`♡ 𝗜𝗻𝗳𝗼 𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵

- 𝖭𝖺𝗆𝖺 ${nama}
- 𝖬𝗈𝖽𝖾𝗅: ${model}
- 𝖯𝖾𝗋𝖺𝗇: ${roleText} 
- 𝖳𝖾𝗇𝖺𝗇𝗀: ${tenang}𝗌
- 𝖯𝖾𝗇𝗎𝗅𝗂𝗌: ${penulis}
- 𝖣𝗌𝗄𝗋𝗂𝗉𝗌: ${deskripsi}
- 𝖯𝖺𝗇𝖽𝗎𝖺𝗇: ${panduan || "-"}`;

await message.reply(font.thin(pesan));
   }
  }
 },
};

function peran(roleText) {
 switch (roleText) {
  case 0:
        return "𝗌𝖾𝗆𝗎𝖺 𝗈𝗋𝖺𝗇𝗀";
  case 1:
        return "𝖺𝖽𝗆𝗂𝗇 𝗀𝗋𝗎𝗉";
  case 2:
        return "𝗁𝖺𝖽𝗒-𝗌𝖺𝗇";
  default:
        return "-";
 }
}
