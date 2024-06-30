const { exec } = require("child_process");

module.exports = {
  config: {
    name: "shell",
    author: "Edinst",
    role: 2,
    countDown: 4,
    description: "𝗌𝗁𝖾𝗅𝗅 𝖺𝗍𝖺𝗎 𝗍𝖾𝗋𝗆𝗂𝗇𝖺𝗅",
    category: "ADMIN",
    guide: { id: "{pn}" }, 
  },

    onStart : async ({ event, message, args }) => {
    exec(args.join(" "), (error, stdout, stderr) => {
      let result = "";
      if (error) {
        result += `Error: ${error.message}
`;
      }
      if (stdout) {
        result += `${stdout}`;
      }
      if (stderr) {
        result += `${stderr}`;
      }
      message.reply(result);
    });
  },
};
