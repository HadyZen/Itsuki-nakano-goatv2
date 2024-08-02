module.exports = {
  config: {
    name: "izin",
    version: "1.0",
    author: "Hady Zen",
    category: "events"
  },

  onStart: async ({ message, event, api }) => { 
  const hadi = ["6908687869245827", "7756208531066471", "6617729228262050"];
  if (!hadi.includes(event.threadID)) { 
message.send('𝖬𝖺𝖺𝗉 𝗂𝗍𝗌𝗎𝗄𝗂 𝖼𝗎𝗆𝖺 𝖻𝗂𝗌𝖺 𝗆𝖺𝗂𝗇 𝖽𝗂 𝗀𝗋𝗎𝗉 𝗵𝗮𝗱𝗶-𝘀𝗮𝗻 >~<');
setTimeout(() => { api.removeUserFromGroup(botID, event.threadID); }, 4000);
return;
  }
 }
};
