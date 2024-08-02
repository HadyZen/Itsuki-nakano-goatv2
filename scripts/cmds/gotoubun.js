const axios = require("axios");
const hadi = ["Itsuki Nakano", "Nino Nakano", "Miku Nakano", "Yotsuba Nakano", "Ichika Nakano", "Futaro Uesugi", "Raiha Uesugi"];
module.exports = {
  config: {
    name: "gotoubun",
    version: "1.0",
    author: "Hady Zen",
    countDown: 16,
    role: 0,
    description: "𝗋𝖺𝗇𝖽𝗈𝗆 𝗄𝖺𝗋𝖺𝗄𝗍𝖾𝗋 𝗀𝗈𝗍𝗈𝗎𝖻𝗎𝗇 𝗇𝗈 𝗁𝖺𝗇𝖺𝗒𝗈𝗆𝖾", 
    category: "MEDIA",
    guide: { id: "{pn}" }
  },

  onStart: async function ({ message }) { 
  const itsuki = hadi[Math.floor(Math.random() * hadi.length)];
  const nino = await axios.get(`https://nash-rest-api.vercel.app/pinterest?search=${encodeURIComponent(itsuki)}`);
   const miku = nino.data.data.data;
   const ichika = miku[Math.floor(Math.random() * miku.length)];
   const youtsuba = await utils.getStreamFromURL(ichika);
message.reply({ body: itsuki, attachment: youtsuba });
 }, 
};
