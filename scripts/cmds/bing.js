const axios = require('axios');
const cheerio = require('cheerio');
module.exports = {
  config: {
    name: "bing",
    version: "1.0",
    author: "Hady Zen",
    countDown: 30,
    role: 0,
    description: "𝖼𝖺𝗋𝗂 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗌𝗂 𝖽𝖺𝗋𝗂 𝖻𝗂𝗇𝗀", 
    category: "MEDIA",
    guide: { id: "{pn} <𝖼𝖺𝗋𝗂>" }
  },

  onStart: async function ({ message, args, api }) { 
    const futaro = args.join(' ');
   if (!futaro) { return message.reply('𝖬𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗉𝖾𝗇𝖼𝖺𝗋𝗂𝖺𝗇𝗆𝗎 𝗍𝗎𝖺𝗇!');
}
    try {
     const nakano = await message.reply('♡ 𝗕𝗜𝗡𝗚 •••');
      const nah = `https://www.bing.com/search?q=${encodeURIComponent(futaro)}`;
      const respon = await axios.get(nah);
      const $ = cheerio.load(respon.data);

      let hadi = '';
      const itsuki = 5;
      $('li.b_algo').slice(0, itsuki).each((index, element) => {
        const judul = $(element).find('h2').text();
        const link = $(element).find('h2 > a').attr('href');
        const snippet = $(element).find('p').text();

        hadi += `${index + 1}. [${judul}](${link})\n${snippet}\n\n`;
      });
const tr = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=${encodeURIComponent(hadi)}`);
            
            const arti = tr.data[0].map(item => item[0]).join('');
if (!hadi) { return api.editMessage('𝖦𝖺𝗄 𝖺𝖽𝖺 𝖺𝗉𝖺 𝖺𝗉𝖺 𝗍𝗎𝖺𝗇!?', nakano.messageID);
}
  api.editMessage(arti, nakano.messageID);
} catch (error) { 
   message.reply('𝖳𝖾𝗋𝗃𝖺𝖽𝗂 𝗄𝖾𝗌𝖺𝗅𝖺𝗁𝖺𝗇! ', error);
}
 }, 
}; 
