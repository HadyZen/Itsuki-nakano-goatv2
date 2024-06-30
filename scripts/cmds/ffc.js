const axios = require('axios');

module.exports = {
    config: {
        name: "ffc",
        version: 1.0,
        author: "Hady Zen",
        role: 0,
        countDown: 10,
        description: "𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗌𝗂 𝗄𝖺𝗋𝖺𝗄𝗍𝖾𝗋 𝖥𝖥",
        category: 'MEDIA',
        guide: {
            id: ':ai <𝗄𝖺𝗋𝖺𝗄𝗍𝖾𝗋>'
        }
    },
    onStart: async function({ message, args }) {
        const namaKarakter = args.join(' ');

        if (!namaKarakter) {
            return message.reply("𝖲𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗇𝖺𝗆𝖺 𝗄𝖺𝗋𝖺𝗄𝗍𝖾𝗋!");
        }

        try {
            const dataKarakter = await axios.get(`https://ff-kshitiz.vercel.app/ff?character=${namaKarakter}`);
            const nama = dataKarakter.data.title;
            const desk = dataKarakter.data.description;
            const gambar = dataKarakter.data.image;
            const info = dataKarakter.data.info;
            const gen = info.Gender;
            const usia = info.Age;
            const kemam = info.Ability;
            const hobi = info.Hobby;
            const foto = await utils.getStreamFromURL(gambar);
            const teks = `✨ 𝗙𝗿𝗲𝗲𝗙𝗶𝗿𝗲

- 𝖭𝖺𝗆𝖺: ${nama}
- 𝖣𝖾𝗌𝗄𝗋𝗂𝗉𝗌𝗂: ${desk}
- 𝖪𝖾𝗅𝖺𝗆𝗂𝗇: ${gen || "𝗀𝖺𝗄 𝗍𝖺𝗎"}
- 𝖴𝗌𝗂𝖺: ${usia || "𝗀𝖺𝗄 𝗍𝖺𝗎"}
- 𝖪𝖾𝗆𝖺𝗆𝗉𝗎𝖺𝗇: ${kemam || "𝗀𝖺𝗄 𝗍𝖺𝗎"}
- 𝖧𝗈𝖻𝗂: ${hobi || "𝗀𝖺𝗄 𝖺𝖽𝖺"}`;

            message.reply({ body: teks, attachment: foto });
        } catch (error) {
            message.reply("𝖪𝖺𝗋𝖺𝗄𝗍𝖾𝗋 𝗍𝗂𝖽𝖺𝗄 𝖽𝗂𝗍𝖾𝗆𝗎𝗆𝗎𝗄𝖺𝗇");
        }
    }
};
