const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
        config: {
                name: "maintain",
                version: "1.3",
                author: "NTKhang",
                countDown: 6,
                role: 2,
                description: "𝗆𝗈𝖽𝖾 𝗁𝖺𝗇𝗒𝖺 𝖺𝖽𝗆𝗂𝗇", 
                category: "ADMIN",
                guide: { id: "{pn} <𝗄𝗈𝗌𝗈𝗇𝗀/𝗇𝗈𝗍𝗂> <𝗈𝗇/𝗈𝖿𝖿>" }
        },

        langs: {
                id: {
                        a: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝗆𝗈𝖽𝖾 𝗁𝖺𝗇𝗒𝖺 𝖺𝖽𝗆𝗂𝗇!",
                        b: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝗆𝗈𝖽𝖾 𝗁𝖺𝗇𝗒𝖺 𝖺𝖽𝗆𝗂𝗇!",
                        c: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝗇𝗈𝗍𝗂𝖿𝗂𝗄𝖺𝗌𝗂 𝗆𝗈𝖽𝖾 𝖺𝖽𝗆𝗂𝗇",
                        d: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝗇𝗈𝗍𝗂𝖿𝗂𝗄𝖺𝗌𝗂 𝗆𝗈𝖽𝖾 𝖺𝖽𝗆𝗂𝗇"
                }
        },

        onStart: function ({ args, message, getLang }) {
                let isSetNoti = false;
                let value;
                let indexGetVal = 0;

                if (args[0] == "noti") {
                        isSetNoti = true;
                        indexGetVal = 1;
                }

                if (args[indexGetVal] == "on")
                        value = true;
                else if (args[indexGetVal] == "off")
                        value = false;
                else
                        return message.SyntaxError();

                if (isSetNoti) {
                        config.adminOnly.hideNotiMessage = !value;
                        message.reply(getLang(value ? "c" : "d"));
                }
                else {
                        config.adminOnly.enable = value;
                        message.reply(getLang(value ? "a" : "b"));
                }

                fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
        }
};