module.exports = {
  config: {
    name: 'imgbb',
    version: '1.0',
    author: 'Rizky Z (hadi)',
    countDown: 10,
    role: 0,
    category: 'MEDIA',
    description: '𝗂𝗆𝗀𝖻𝖻 𝖺𝗅𝗍𝖾𝗋𝗇𝖺𝗍𝗂𝖿 𝗆𝖾𝖽𝗂𝖺', 
    guide: { id: '{pn} <𝖻𝖺𝗅𝖺𝗌>' }
  },

  onStart: async function ({ message, event }) {
    const hadi = event.messageReply.attachments[0].url;
    const pipi = await global.utils.uploadImgbb(hadi);
    const raffa = pipi.image.url;
if (raffa) {
   message.reply(raffa);
} else if (!raffa) {
message.reply(hadi);
}
 }
}