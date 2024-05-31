module.exports = {
    config: {
        name: 'kerang',
        version: 1.0,
        role: 0,
        author: "Rizky Z (Hadi)", 
        countDown: 16,
        description: "𝖡𝖾𝗋𝗍𝖺𝗇𝗒𝖺 𝗄𝖾𝗉𝖺𝖽𝖺 𝗄𝖾𝗋𝖺𝗇𝗀 𝖺𝗃𝖺𝗂𝖻", 
        category: 'GAME',
        guide: { id: '{pn} <𝗉𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇>' }
    },
    event: null,
    onStart: async function({ api, event, message, args }) {
        const raffa = [
"Tidak", 
"Tanyakan pada orang lain", 
"Mungkin suatu saat nanti", 
"Ya", 
"Tentu tidak", 
"Pake nanya", 
"Coba tanyakan lagi", 
"Mungkin ya", 
"Mungkin tidak", 
"Saya rasa tidak"
        ];
const nebula = args[0];

if (!nebula) {
message.reply("𝖲𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗉𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇 𝖺𝗇𝖽𝖺", event.threadID);
   return;
}
        const hadi = raffa[Math.floor(Math.random() * raffa.length)];
        const pipi = args.slice(0).join(' ');

        message.reply(`🐚 • 𝗞𝗲𝗿𝗮𝗻𝗴 𝗮𝗷𝗮𝗶𝗯\n`
                    + `\n- 𝖯𝖾𝗋𝗍𝖺𝗇𝗒𝖺𝖺𝗇: ${pipi}`
                    + `\n- 𝖩𝖺𝗐𝖺𝖻𝖺𝗇: ${hadi}`);
    }
};