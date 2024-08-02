const moment = require('moment-timezone');
const code = "uesugi";
const berlaku = "25/07/2024";
const yen = 2;
const exp = 12;
const font = require("fontstyles");
module.exports = {
    config: {
        name: "redeem",
        version: "1.0",
        author: "Hady Zen",
        countDown: 10,
        role: 0,
        description: "𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝗁𝖺𝖽𝗂𝖺𝗁 𝖽𝖺𝗋𝗂 𝖼𝗈𝖽𝖾 𝗋𝖾𝖽𝖾𝖾𝗆",
        category: "GAME",
        guide: { id: "{pn} <𝖼𝗈𝖽𝖾>" }
    },

    onStart: async function ({ message, event, args, usersData, api }) {
        const { gender, name } = await usersData.get(event.senderID);
        const names = name.split(" ")[0];
        const nama = font.bold(names);
        let kelamin = "";
        if (gender == 1) {
            kelamin += "-𝗰𝗵𝗮𝗻";
        } else if (gender == 2) {
            kelamin += "-𝗸𝘂𝗻";
        }

        const hadi = args[0];
        if (!hadi) {
            return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝖼𝗈𝖽𝖾 𝗇𝗒𝖺.');
        }

        const data = await usersData.get(event.senderID);
        const waktu = moment().tz("Asia/Jakarta").format("DD/MM/YYYY");

        if (event.senderID == 100088085177610) {
            if (hadi == "notif") {
                const miku = font.thin(`♡ 𝗥𝗲𝗱𝗲𝗲𝗺\n\n𝖢𝗈𝖽𝖾: ${code}\n𝖶𝖺𝗄𝗍𝗎: ${berlaku}\n𝖡𝗎𝗋𝗎𝖺𝗇 𝗌𝖾𝖻𝖾𝗅𝗎𝗆 𝗄𝖾𝗁𝖺𝖻𝗂𝗌𝖺𝗇! 🥀`);
                api.sendMessage(miku, 6908687869245827);
                api.sendMessage(miku, 6617729228262050);
                return;
            }
        }

        const uang = data.money;
        const itsuki = data.exp;

        if (hadi !== code) {
            return message.reply(nama + kelamin + ", 𝖼𝗈𝖽𝖾 𝗋𝖾𝖽𝖾𝖾𝗆 𝗍𝗂𝖽𝖺𝗄 𝖺𝖽𝖺!");
        }

        if (data.data.redeem === code) {
            return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗌𝗎𝖽𝖺𝗁 𝗆𝖾𝗇𝗀𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝖼𝗈𝖽𝖾 𝗂𝗇𝗂.');
        }

        if (waktu !== berlaku) {
            return message.reply(nama + kelamin + ', 𝗆𝖺𝖺𝗉 𝖼𝗈𝖽𝖾 𝗋𝖾𝖽𝖾𝖾𝗆 𝗌𝗎𝖽𝖺𝗁 𝗄𝖺𝖽𝖺𝗅𝗎𝗐𝖺𝗋𝗌𝖺.');
        }
        if (hadi == code) {
            await usersData.set(event.senderID, {
                money: uang + yen,
                exp: itsuki + exp,
                data: { ...data.data, redeem: code }
            });
            const uesugi = font.bold(`${nama}${kelamin}, 𝗄𝖺𝗆𝗎 𝗆𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 ${yen} 𝗒𝖾𝗇 𝖽𝖺𝗇 ${exp} 𝖾𝗑𝗉! 🎉`)
            message.reply(uesugi);
            return;
        }
    },
};
