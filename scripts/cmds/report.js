const { getStreamsFromAttachment } = global.utils;
module.exports = {
  config: {
    name: "report",
    version: "1.0",
    author: "Hady Zen",
    countDown: 60,
    role: 0,
    description: "𝗅𝖺𝗉𝗈𝗋𝗄𝖺𝗇 𝖻𝗎𝗀 𝗄𝖾 𝖺𝖽𝗆𝗂𝗇 𝗂𝗍𝗌𝗎𝗄𝗂", 
    category: "SISTEM",
    guide: { id: "{pn} <𝗉𝖾𝗌𝖺𝗇>" }
  },

  onStart: async function ({ message, api, event, usersData, args, role }) { 
   switch(args[0]) {
     case 'send':
       if (role < 2) { return message.reply('𝖪𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗉𝗎𝗇𝗒𝖺 𝖼𝗎𝗄𝗎𝗉 𝗂𝗓𝗂𝗇 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝗀𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝗂𝗇𝗂!');
}
  const id = args[1];
  const hadi = args.slice(2).join(' ');
       if (!hadi) { return message.reply('𝖬𝖺𝗌𝗎𝗄𝖺𝗇 𝗉𝖾𝗌𝖺𝗇 𝗆𝗎 𝗍𝗎𝖺𝗇! (◍•ᴗ•◍)');
}
 const hady = await usersData.getName(event.senderID);
 const itsuki = `♡ 𝗕𝗮𝗹𝗮𝘀𝗮𝗻 𝗹𝗮𝗽𝗼𝗿𝗮𝗻
 
 𝖣𝖺𝗋𝗂: ${hady}
 𝖯𝖾𝗌𝖺𝗇: ${hadi}`;
const hanib = { body: itsuki, attachment: await getStreamsFromAttachment(event.messageReply?.attachments || []) 
		};
   api.sendMessage(hanib, id);
   message.reply('𝖯𝖾𝗌𝖺𝗇 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂𝗄𝗂𝗋𝗂𝗆 𝗌𝖾𝗇𝗉𝖺𝗂! (◍•ᴗ•◍)');
     break;
     default: 
  const pesan = args.join(' ');
       if (!pesan) { return message.reply('𝖪𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗉𝖾𝗌𝖺𝗇𝗇𝗒𝖺! (◍•ᴗ•◍)');
}
  const ID_GC = "7756208531066471";
  const grup = await api.getThreadInfo(event.threadID); 
  const gcNama = grup.name;
  const nama = await usersData.getName(event.senderID);
  const laporan = `♡ 𝗟𝗮𝗽𝗼𝗿𝗮𝗻

  𝖣𝖺𝗋𝗂: ${nama}
  𝖦𝗋𝗎𝗉: ${gcNama}
  𝖨𝖣 𝗀𝖼: ${event.threadID}
  𝖯𝖾𝗌𝖺𝗇: ${pesan}`;
const konenk = { body: laporan, attachment: await getStreamsFromAttachment(event.messageReply?.attachments || []) 
		};
     api.sendMessage(konenk, ID_GC);
     message.reply('𝖯𝖾𝗌𝖺𝗇 𝗄𝖺𝗆𝗎 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂𝗄𝗂𝗋𝗂𝗆 𝗄𝖾 𝗀𝗋𝗎𝗉 𝖺𝖽𝗆𝗂𝗇!');
     setTimeout(() => { api.sendMessage(`:report send ${event.threadID}`, ID_GC); }, 8000);
 }
}
}
