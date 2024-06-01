const axios = require('axios');

module.exports = {
 config: {
 name: "lirik",
 version: "𝟣.𝟢", 
 author: "Rizky Z (hadi)", 
 countDown: 10,
 role: 0,
 category: "MEDIA", 
 description: "mencari lirik lagu", 
 guide: { id: "{pn} <judul>" }
},

onStart: async function ({ message, args, api }) {
    const hadi = args.join(' ');
 if (!hadi) { 
   return message.reply('Masukkan judul lagu!');
}
   try { 
    const pipi = await axios.get(`https://apis-samir.onrender.com/lyrics?query=${encodeURIComponent(hadi)}`);
    const raffa = pipi.data.title;
    const itsuki = pipi.data.artist;
    const hina = pipi.data.lyrics;
    const naumy = pipi.data.image;
    const kaze = await global.utils.getStreamFromURL(naumy);
    let z = "✨ 𝗟𝗶𝗿𝗶𝗸\n";
     z += `\nJudul: ${raffa}`;
     z += `\nArtis: ${itsuki}`;
     z += `\nLirik: ${hina}`;
    message.reply({ body: z, attachment: kaze });
    
} catch (error) {
   message.reply('Lirik tidak ada!');
}
 }
}