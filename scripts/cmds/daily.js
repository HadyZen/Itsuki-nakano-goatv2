const moment = require('moment-timezone');
const font = require("fontstyles");
module.exports = {
    config: {
        name: "daily",
        version: "1.0",
        author: "Hady Zen",
        countDown: 10,
        role: 0,
        description: "𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝗁𝖺𝖽𝗂𝖺𝗁 𝗁𝖺𝗋𝗂𝖺𝗇",
        category: "GAME",
        guide: { id: "{pn}" }
    },

    onStart: async function ({ message, usersData, event, commandName }) {
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += "-𝗰𝗵𝗮𝗻";
} else if (gender == 2) { 
 kelamin += "-𝗸𝘂𝗻";
} 
        const waktu = moment.tz("Asia/Jakarta").format("DD/MM/YYYY");
        const data = await usersData.get(event.senderID);

        if (data.data.daily === waktu) {
            return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝗌𝗎𝖽𝖺𝗁 𝗆𝖾𝗇𝗀𝗄𝗅𝖺𝗂𝗆 𝗁𝖺𝖽𝗂𝖺𝗁 𝗁𝖺𝗋𝗂 𝗂𝗇𝗂!');
        }

        message.reply({
            body: `♡ 𝗛𝗮𝗱𝗶𝗮𝗵 𝗵𝗮𝗿𝗶𝗮𝗻

- 𝗬𝗲𝗻: 𝟤 𝗒𝖾𝗇
- 𝗘𝘅𝗽: 𝟣𝟢 𝖾𝗑𝗉𝖾𝗋𝗂𝖾𝗇𝖼𝖾

𝖡𝖺𝗅𝖺𝗌 𝗉𝖾𝗌𝖺𝗇 𝗂𝗇𝗂 𝖽𝖾𝗇𝗀𝖺𝗇 𝗁𝖺𝖽𝗂𝖺𝗁 𝗉𝗂𝗅𝗂𝗁𝖺𝗇 𝗆𝗎!`
        }, (err, info) => { global.GoatBot.onReply.set(info.messageID, { commandName, messageID: info.messageID, senderID: event.senderID }) 
        });
    },

    onReply: async function ({ event, message, Reply, usersData }) {
        const { senderID } = event;
        const {  senderID: originalSenderID } = Reply;
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += "-𝗰𝗵𝗮𝗻";
} else if (gender == 2) { 
 kelamin += "-𝗸𝘂𝗻";
} 

        if (senderID !== originalSenderID) {
            return message.reply(' ');
        }
        const pilih = event.body;
        const waktu = moment.tz("Asia/Jakarta").format("DD/MM/YYYY");
        const data = await usersData.get(event.senderID);

        if (pilih.toLowerCase() == "yen") { 
      if (data.data.daily === waktu) { return; 
  } else { 
            await usersData.set(event.senderID, {
                money: data.money + 2,
                data: { ...data.data, daily: waktu }
            });
            message.unsend(Reply.messageID);
            message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗄𝗅𝖺𝗂𝗆 𝗁𝖺𝖽𝗂𝖺𝗁 𝗁𝖺𝗋𝗂𝖺𝗇 𝟮 𝗒𝖾𝗇!');
}
        } else if (pilih.toLowerCase() == "exp") {
      if (data.data.daily === waktu) { return; 
} else { 
            await usersData.set(event.senderID, {
                exp: data.exp + 10,
                data: { ...data.data, daily: waktu }
            });
            message.unsend(Reply.messageID);
            message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗄𝗅𝖺𝗂𝗆 𝗁𝖺𝖽𝗂𝖺𝗁 𝗁𝖺𝗋𝗂𝖺𝗇 𝟭𝟬 𝖾𝗑𝗉!');
}
        }
    }
};
