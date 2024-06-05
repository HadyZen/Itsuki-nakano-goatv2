const { getPrefix, getStreamFromURL, uploadImgbb } = global.utils;

async function ai({ message: m, event: e, args: a, usersData: u }) {

  var p = [`${await getPrefix(e.threadID)}${this.config.name}`,

`${this.config.name}`

]; 

 if (p.some(b => a[0].toLowerCase().startsWith(b))) {

try {      

let prompt = "Nama kamu adalah raffa badry, kamu harus menggunakan bahasa Indonesia";

if (e.type === "message_reply" && e.messageReply.attachments && e.messageReply.attachments[0]?.type === "photo") {

 const b = await uploadImgbb(e.messageReply.attachments[0].url);

prompt = a.slice(1).join(" ") + ' ' + b.image.url;

} else {

 prompt = a.slice(1).join(" ");

}

 var __ = [{ id: e.senderID, tag: await u.getName(e.senderID) }];

 const r = await require("axios").post(`https://test-ai-ihc6.onrender.com/api`, {

  prompt: prompt,

 apikey: "GayKey-oWHmMb1t8ASljhpgSSUI",

  name: __[0]['tag'],

 id: __[0]['id'],

 });

var _ = r.data.result.replace(/{name}/g, __[0]['tag']).replace(/{pn}/g, p[0]);

 if (r.data.av) {

 if (Array.isArray(r.data.av)) {

 const avs = r.data.av.map(url => getStreamFromURL(url));

 const avss = await Promise.all(avs);

  m.reply({

 body: _,

 mentions: __,

 attachment: avss

 });

 } else {

 m.reply({

 body: _,

 mentions: __,

attachment: await getStreamFromURL(r.data.av)

  });

  }

  } else {

m.reply({

body: _,

mentions: __

  });

  }

  } catch (error) {

 m.reply("𝖤𝗋𝗋𝗈𝗋" + error);

 }

 }

}

module.exports = {

config: {

 name: "nakano",

 version: "1.0",

 author: "Jun",

 countDown: 10,

 role: 0,

 description: "𝖻𝖾𝗋𝗍𝖺𝗇𝗒𝖺 𝗄𝖾𝗉𝖺𝖽𝖺 𝗂𝗍𝗌𝗎𝗄𝗂 ",

 guide: { id: "{pn} <𝗍𝖺𝗇𝗒𝖺>" }, 

 category: "AI"

 },

 onStart: function() {},

 onChat: ai

};