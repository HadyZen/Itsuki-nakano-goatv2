const axios = require('axios');

module.exports = {
    config: {
        name: "itsuki-cmd",
        version: "1.0",
        author: "Hady Zen",
        countdown: 20,
        role: 0,
        description: "𝖼𝗆𝖽 𝗀𝗋𝖺𝗍𝗂𝗌 𝖻𝗒 𝗁𝖺𝖽𝗂",
        category: "MEDIA",
        guide: { id: ":ai <𝖼𝖺𝗋𝗂>" }
    },
    onStart: async function ({ message, args, role }) {
        const youtsuba = await axios.get('https://raw.githubusercontent.com/HadyZen/Itsuki-cmd/main/HADI.json');
        const uesugi = youtsuba.data;
        let page = 1;
        if (args[0]) {
            page = parseInt(args[0]);
        }
        let itsuki = uesugi;
        const nomor = (page - 1) * 6;
        const nakano = page * 6;
        const futaro = itsuki.slice(nomor, nakano);
        const wle = Math.ceil(uesugi.length / 6);
        let pesan = "♡ 𝗜𝘁𝘀𝘂𝗸𝗶 𝘀𝘁𝗼𝗿𝗲\n";

        futaro.forEach(cmd => {
            pesan += `𝖭𝖺𝗆𝖺: ${cmd.nama} 
𝖢𝗈𝖽𝖾: ${cmd.code}\n\n`;
        });

        if (wle < page) {
            return message.reply('𝖦𝖺𝗄 𝖺𝖽𝖺 𝗉𝖺𝗀𝖾 𝗂𝗍𝗎 𝗍𝗎𝖺𝗇!');
        } else {
            message.reply(pesan);
        }
    }
};