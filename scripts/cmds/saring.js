function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
        config: {
                name: "saring",
                version: "1.5",
                author: "NTKhang",
                countDown: 10,
                role: 1,
                shortDescription: "𝗌𝖺𝗋𝗂𝗇𝗀 𝗆𝖾𝗆𝖻𝖾𝗋 𝗌𝖾𝗌𝗎𝖺𝗂 𝗃𝗎𝗆𝗅𝖺𝗁 𝗉𝖾𝗌𝖺𝗇", 
                category: "GRUP",
                guide: { id: "{pn} <𝗇𝗈𝗆𝗈𝗋/𝖽𝗂𝖾>" }
        },

        langs: {
    id: {
                        needAdmin: "𝖧𝖺𝗋𝖺𝗉 𝗃𝖺𝖽𝗂𝗄𝖺𝗇 𝗋𝖺𝖿𝖿𝖺 𝖺𝖽𝗆𝗂𝗇 𝗀𝗋𝗎𝗉 𝗍𝖾𝗋𝗅𝖾𝖻𝗂𝗁 𝖽𝖺𝗁𝗎𝗅𝗎",
                        confirm: "𝖳𝖺𝗇𝗀𝗀𝖺𝗉𝗂 𝗉𝖾𝗌𝖺𝗇 𝗂𝗇𝗂 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝗀𝗈𝗇𝖿𝗂𝗋𝗆𝖺𝗌𝗂 (%1)",
                        kickByBlock: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗒𝖺𝗋𝗂𝗇𝗀 𝗆𝖾𝗆𝖻𝖾𝗋 %1 𝗆𝗈𝗄𝖺𝖽",
                        kickByMsg: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗒𝖺𝗋𝗂𝗇𝗀 %1 𝗆𝖾𝗆𝖻𝖾𝗍 𝖽𝖾𝗇𝗀𝖺𝗇 𝗃𝗎𝗆𝗅𝖺𝗁 𝗉𝖾𝗌𝖺𝗇 %2 𝗉𝖾𝗌𝖺𝗇",
                        kickError: "𝖳𝖾𝗋𝗃𝖺𝖽𝗂 𝗄𝖾𝗌𝖺𝗅𝖺𝗁𝖺𝗇 𝗌𝖺𝖺𝗍 𝗆𝖾𝗇𝗒𝖺𝗋𝗂𝗇𝗀 %1 𝗆𝖾𝗆𝖻𝖾𝗋:\n%2",
                        noBlock: "𝖳𝗂𝖽𝖺𝗄 𝖺𝖽𝖺 𝗆𝖾𝗆𝖻𝖾𝗋 𝗒𝖺𝗇𝗀 𝗆𝗈𝗄𝖺𝖽",
                        noMsg: "𝖳𝗂𝖽𝖺𝗄 𝖺𝖽𝖺 𝗆𝖾𝗆𝖻𝖾𝗋 𝖽𝖾𝗇𝗀𝖺𝗇 𝗃𝗎𝗆𝗅𝖺𝗁 𝗉𝖾𝗌𝖺𝗇 %1 𝗉𝖾𝗌𝖺𝗇"
                }
        },

        onStart: async function ({ api, args, threadsData, message, event, commandName, getLang }) {
                const threadData = await threadsData.get(event.threadID);
                if (!threadData.adminIDs.includes(api.getCurrentUserID()))
                        return message.reply(getLang("needAdmin"));

                if (!isNaN(args[0])) {
                        message.reply(getLang("confirm", args[0]), (err, info) => {
                                global.GoatBot.onReaction.set(info.messageID, {
                                        author: event.senderID,
                                        messageID: info.messageID,
                                        minimum: Number(args[0]),
                                        commandName
                                });
                        });
                }
                else if (args[0] == "die") {
                        const threadData = await api.getThreadInfo(event.threadID);
                        const membersBlocked = threadData.userInfo.filter(user => user.type !== "User");
                        const errors = [];
                        const success = [];
                        for (const user of membersBlocked) {
                                if (user.type !== "User" && !threadData.adminIDs.some(id => id == user.id)) {
                                        try {
                                                await api.removeUserFromGroup(user.id, event.threadID);
                                                success.push(user.id);
                                        }
                                        catch (e) {
                                                errors.push(user.name);
                                        }
                                        await sleep(700);
                                }
                        }

                        let msg = "";
                        if (success.length > 0)
                                msg += `${getLang("kickByBlock", success.length)}\n`;
                        if (errors.length > 0)
                                msg += `${getLang("kickError", errors.length, errors.join("\n"))}\n`;
                        if (msg == "")
                                msg += getLang("noBlock");
                        message.reply(msg);
                }
                else
                        message.SyntaxError();
        },

        onReaction: async function ({ api, Reaction, event, threadsData, message, getLang }) {
                const { minimum = 1, author } = Reaction;
                if (event.userID != author)
                        return;
                const threadData = await threadsData.get(event.threadID);
                const botID = api.getCurrentUserID();
                const membersCountLess = threadData.members.filter(member =>
                        member.count < minimum
                        && member.inGroup == true
                        // ignore bot and admin box
                        && member.userID != botID
                        && !threadData.adminIDs.some(id => id == member.userID)
                );
                const errors = [];
                const success = [];
                for (const member of membersCountLess) {
                        try {
                                await api.removeUserFromGroup(member.userID, event.threadID);
                                success.push(member.userID);
                        }
                        catch (e) {
                                errors.push(member.name);
                        }
                        await sleep(700);
                }

                let msg = "";
                if (success.length > 0)
                        msg += `${getLang("kickByMsg", success.length, minimum)}\n`;
                if (errors.length > 0)
                        msg += `${getLang("kickError", errors.length, errors.join("\n"))}\n`;
                if (msg == "")
                        msg += getLang("noMsg", minimum);
                message.reply(msg);
        }
};