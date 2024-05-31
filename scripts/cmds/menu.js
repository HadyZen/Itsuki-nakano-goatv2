const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { commands } = global.GoatBot;
const font = {"1": "𝟭", "2": "𝟮", "3": "𝟯", "4": "𝟰", "5": "𝟱", "6": "𝟲", "7": "𝟳", "8": "𝟴", "9": "𝟵", "0": "𝟬", a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇", A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭"};
module.exports = {
config: {
 name: "menu",
 version: "𝟣.𝟨",
 author: "Rizky Z (hadi)",
 countDown: 10,
 role: 0,
 description: "𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝖻𝖺𝗇𝗍𝗎𝖺𝗇",
 category: "SISTEM",
 guide: { id: "{pn} <𝗄𝗈𝗌𝗈𝗇𝗀/𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁>" },
 priority: 1,
},

onStart: async function ({ api, message, args, event, role, globalData }) {
    const awalan = global.GoatBot.config.prefix;
    const kosong = args.length;
 if (kosong === 0) {
    const categories = {};
    let pesan = "";

for (const [name, value] of commands) {
 if (value.config.role > 1 && role < value.config.role) continue;
    const category = value.config.category || "-";
categories[category] = categories[category] || { commands: [] };
categories[category].commands.push(name);
                        }

Object.keys(categories).forEach((category) => {
 if (category !== "info") {
    const jumlah = categories[category].commands.sort();
    const teks = `${category.toUpperCase()} (${jumlah.length})`;
    const font1 = teks.split('').map(char => font[char] || char).join('');
pesan += `- ${font1}`;


    const names = categories[category].commands.sort();
for (let i = 0; i < names.length; i += 80) {
    const cmds = names.slice(i, i + 80).map((item) => `${item},`);
pesan += `\n${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
}

pesan += `\n\n`;
}
});

 pesan += `𝖦𝗎𝗇𝖺𝗄𝖺𝗇 𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 ${awalan}𝗵𝗲𝗹𝗽 <𝗻𝗮𝗺𝗮 𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵> 𝗎𝗇𝗍𝗎𝗄 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗌𝗂 𝗅𝖾𝖻𝗂𝗁 𝗅𝖺𝗇𝗃𝗎𝗍!`;

    const uns = await message.reply(pesan);
setTimeout(() => { api.unsendMessage(uns.messageID); }, 49000);

} else {
    const perintah2 = args[0].toLowerCase();
    const perintah3 = commands.get(perintah2);

if (!perintah3) {
    const font3 = perintah2.split('').map(char => font[char]).join('');
await message.reply(`𝖯𝖾𝗋𝗂𝗇𝗍𝖺𝗁 ${font3} 𝗍𝗂𝖽𝖺𝗄 𝖺𝖽𝖺 𝗍𝗎𝖺𝗇𝗄𝗎!`);
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
`• 𝖭𝖺𝗆𝖺 ${nama}
• 𝖬𝗈𝖽𝖾𝗅: ${model}
• 𝖯𝖾𝗋𝖺𝗇: ${roleText} 
• 𝖳𝖾𝗇𝖺𝗇𝗀: ${tenang}𝗌
• 𝖯𝖾𝗇𝗎𝗅𝗂𝗌: ${penulis}
• 𝖣𝗌𝗄𝗋𝗂𝗉𝗌: ${deskripsi}
• 𝖯𝖺𝗇𝖽𝗎𝖺𝗇: ${panduan}`;

await message.reply(pesan);
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
        return "𝖺𝖽𝗆𝗂𝗇 𝗋𝖺𝖿𝖿𝖺";
  default:
        return "-";
 }
}