const { getStreamsFromAttachment } = global.utils;
const font = require("fontstyles");
module.exports = {
  config: {
    name: "report",
    version: "1.0",
    author: "Hady Zen",
    countDown: 60,
    role: 0,
    description: "𝗅𝖺𝗉𝗈𝗋𝗄𝖺𝗇 𝖻𝗎𝗀 𝗄𝖾 𝖺𝖽𝗆𝗂𝗇 𝗂𝗍𝗌𝗎𝗄𝗂", 
    category: "SISTEM",
    guide: { id: "{pn} <𝗉𝖾𝗌𝖺𝗇/𝗌𝖾𝗇𝖽>" }
  },

  onStart: async function ({ message, api, event, usersData, args, role }) { 
const { gender, name } = await usersData.get(event.senderID);
const names = name.split(" ")[0];
const nama = font.bold(names);
let kelamin = "";
if (gender == 1) { 
 kelamin += font.bold("-chan");
} else if (gender == 2) { 
 kelamin += font.bold("-kun");
} 
   switch(args[0]) {
     case 'send':
       if (role < 2) { return message.reply(nama + kelamin + ', 𝖼𝗎𝗆𝖺 𝗁𝖺𝖽𝗂-𝗌𝖺𝗇 𝗒𝖺𝗇𝗀 𝖻𝗂𝗌𝖺 𝗆𝖾𝗇𝗀𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝗂𝗇𝗂!');
}
  const id = args[1];
  const hadi = args.slice(2).join(' ');
       if (!hadi) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝖻𝖺𝗅𝖺𝗌𝖺𝗇 𝗅𝖺𝗉𝗈𝗋𝖺𝗇𝗇𝗒𝖺!');
}
 const hady = await usersData.getName(event.senderID);
 const itsuki = font.thin(`♡ 𝗕𝗮𝗹𝗮𝘀𝗮𝗻 𝗹𝗮𝗽𝗼𝗿𝗮𝗻
 
 𝖣𝖺𝗋𝗂: ${hady}
 𝖯𝖾𝗌𝖺𝗇: ${hadi}`);
const hanib = { body: itsuki, attachment: await getStreamsFromAttachment(event.messageReply?.attachments || []) 
		};
   api.sendMessage(hanib, id);
   message.reply(nama + kelamin + ', 𝖻𝖺𝗅𝖺𝗌𝖺𝗇 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂𝗄𝗂𝗋𝗂𝗆!');
     break;
     default: 
  const pesan = args.join(' ');
       if (!pesan) { return message.reply(nama + kelamin + ', 𝗄𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗅𝖺𝗉𝗈𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝗂𝗇𝗀𝗂𝗇 𝖽𝗂𝗄𝗂𝗋𝗂𝗆!');
}
  const ID_GC = "7756208531066471";
  const grup = await api.getThreadInfo(event.threadID); 
  const gcNama = grup.name;
  const miku = await usersData.getName(event.senderID);
  const laporan = font.thin(`♡ 𝗟𝗮𝗽𝗼𝗿𝗮𝗻

  𝖣𝖺𝗋𝗂: ${miku}
  𝖦𝗋𝗎𝗉: ${gcNama}
  𝖨𝖣 𝗀𝖼: ${event.threadID}
  𝖯𝖾𝗌𝖺𝗇: ${pesan}`);
const konenk = { body: laporan, attachment: await getStreamsFromAttachment(event.messageReply?.attachments || []) 
		};
     api.sendMessage(konenk, ID_GC);
     message.reply(nama + kelamin + ', 𝗅𝖺𝗉𝗈𝗋𝖺𝗇 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂𝗄𝗂𝗋𝗂𝗆 𝗄𝖾 𝗀𝗋𝗎𝗉 𝖺𝖽𝗆𝗂𝗇!');
     setTimeout(() => { api.sendMessage(`:report send ${event.threadID}`, ID_GC); }, 8000);
 }
}
					 }
