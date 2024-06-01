const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "clean",
    author: "kshitiz",  
    version: "1.0",
    coolDown: 10,
    role: 0,
    description: "𝗆𝖾𝗆𝖻𝖾𝗋𝗌𝗂𝗁𝗄𝖺𝗇 𝖿𝗈𝗅𝖽𝖾𝗋 𝖼𝖺𝖼𝗁𝖾 𝖽𝖺𝗇 𝗍𝗆𝗉", 
    category: "SISTEM",
    guide: { id: "{pn}" }
  },

  onStart: async function ({ api, event, message }) {
    const cacheFolderPath = path.join(__dirname, 'cache');
    const tmpFolderPath = path.join(__dirname, 'tmp');

    api.sendMessage({ body: '', attachment: null }, event.threadID, () => {
      const cleanFolder = (folderPath) => {
        if (fs.existsSync(folderPath)) {
          const files = fs.readdirSync(folderPath);
          if (files.length > 0) {
            files.forEach(file => {
              const filePath = path.join(folderPath, file);
              fs.unlinkSync(filePath);
              console.log('berhasil');
            });
            console.log('berhasil');
          } else {
            console.log('y');
          }
        } else {
          console.log('y');
        }
      };
      cleanFolder(cacheFolderPath);
      cleanFolder(tmpFolderPath);
      message.reaction("✨", event.messageID);
    });
  },
};