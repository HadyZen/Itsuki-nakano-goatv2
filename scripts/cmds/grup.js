const { getTime } = global.utils;

module.exports = {
        config: {
                name: "grup",
                version: "1.4",
                author: "NTKhang",
                countDown: 10,
                role: 0,
                shortDescription: "𝖻𝖺𝗇, 𝗎𝗇𝖻𝖺𝗇, 𝖽𝖺𝖿𝗍𝖺𝗋, 𝗂𝗇𝖿𝗈 𝗀𝗋𝗎𝗉", 
                category: "SISTEM",
                guide: { id: "{pn} <𝖻𝖺𝗇/𝗎𝗇𝖻𝖺𝗇/𝖿𝗂𝗇𝖽/𝗂𝗇𝖿𝗈> <𝖼𝖺𝗋𝗂>" }
        },

        langs: {
                id: {
                        noPermission: "𝖪𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗆𝖾𝗆𝗂𝗅𝗂𝗄𝗂 𝖼𝗎𝗄𝗎𝗉 𝗂𝗓𝗂𝗇",
                        found: "𝖣𝗂𝗍𝖾𝗆𝗎𝗄𝖺𝗇 %1 𝗀𝗋𝗎𝗉 𝖽𝖺𝗋𝗂 𝗁𝖺𝗌𝗂𝗅 '%2' 𝖽𝗂 𝖽𝖺𝗍𝖺 𝗋𝖺𝖿𝖿𝖺:\n%3",
                        notFound: "𝖳𝗂𝖽𝖺𝗄 𝖺𝖽𝖺 𝗀𝗋𝗎𝗉 𝖽𝖺𝗋𝗂 𝗁𝖺𝗌𝗂𝗅 '%1' 𝖽𝗂 𝖽𝖺𝗍𝖺 𝗋𝖺𝖿𝖿𝖺",
                        hasBanned: "𝖦𝗋𝗎𝗉 𝖽𝖾𝗇𝗀𝖺𝗇 𝗂𝖽 [%1 | %2] 𝖽𝗂𝖻𝖺𝗇𝗇𝖾𝖽:\n- 𝖠𝗅𝖺𝗌𝖺𝗇: %3",
                        banned: "𝖦𝗋𝗎𝗉 𝖽𝖾𝗇𝗀𝖺𝗇 𝗂𝖽 [%1 | %2] 𝖽𝗂𝖻𝖺𝗇𝗇𝖾𝖽 𝗆𝖾𝗇𝗀𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝗋𝖺𝖿𝖿𝖺!\n- 𝖠𝗅𝖺𝗌𝖺𝗇: %3\n- 𝖶𝖺𝗄𝗍𝗎: %4",
                        notBanned: "𝖦𝗋𝗎𝗉 𝖽𝖾𝗇𝗀𝖺𝗇 𝗂𝖽 [%1 | %2] 𝗍𝗂𝖽𝖺𝗄 𝖽𝗂𝖻𝖺𝗇𝗇𝖾𝖽",
                        unbanned: "𝖦𝗋𝗎𝗉 𝖽𝖾𝗇𝗀𝖺𝗇 𝗂𝖽 [%1 | %2] 𝖻𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝖽𝗂𝗎𝗇𝖻𝖺𝗇𝗇𝖾𝖽",
                        missingReason: "𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝖺𝗅𝖺𝗌𝖺𝗇 𝗄𝖾𝗇𝖺𝗉𝖺 𝗀𝗋𝗎𝗉 𝖽𝗂𝖻𝖺𝗇𝗇𝖾𝖽!",
                        info: "- 𝖦𝗋𝗎𝗉 𝖨𝖣: %1\n- 𝖭𝖺𝗆𝖺: %2\n- 𝖣𝖺𝗍𝖺 𝖽𝗂𝖻𝗎𝖺𝗍: %3\n- 𝖳𝗈𝗍𝖺𝗅 𝗆𝖾𝗆𝖻𝖾𝗋: %4\n- 𝖢𝗈𝗐𝗈: %5 𝗈𝗋𝖺𝗇𝗀\n- 𝖢𝖾𝗐𝖾: %6 𝗈𝗋𝖺𝗇𝗀\n- 𝖳𝗈𝗍𝖺𝗅 𝗉𝖾𝗌𝖺𝗇: %7%8"
                }
        },

        onStart: async function ({ args, threadsData, message, role, event, getLang }) {
                const type = args[0];

                switch (type) {
                        case "find":
                        case "daftar": {
                                let allThread = await threadsData.getAll();
                                let keyword = args.slice(1).join(" ");
                                if (['-j', '-join'].includes(args[1])) {
                                        allThread = allThread.filter(thread => thread.members.some(member => member.userID == global.GoatBot.botID && member.inGroup));
                                        keyword = args.slice(2).join(" ");
                                }
                                const result = allThread.filter(item => item.threadID.length > 15 && (item.threadName || "").toLowerCase().includes(keyword.toLowerCase()));
                                const resultText = result.reduce((i, thread) => i += `\n╭Name: ${thread.threadName}\n╰ID: ${thread.threadID}`, "");
                                let msg = "";
                                if (result.length > 0)
                                        msg += getLang("found", result.length, keyword, resultText);
                                else
                                        msg += getLang("notFound", keyword);
                                message.reply(msg);
                                break;
                        }
                        // ban thread
                        case "ban":
                        case "b": {
                                if (role < 2)
                                        return message.reply(getLang("noPermission"));
                                let tid, reason;
                                if (!isNaN(args[1])) {
                                        tid = args[1];
                                        reason = args.slice(2).join(" ");
                                }
                                else {
                                        tid = event.threadID;
                                        reason = args.slice(1).join(" ");
                                }
                                if (!tid)
                                        return message.SyntaxError();
                                if (!reason)
                                        return message.reply(getLang("missingReason"));
                                reason = reason.replace(/\s+/g, ' ');
                                const threadData = await threadsData.get(tid);
                                const name = threadData.threadName;
                                const status = threadData.banned.status;

                                if (status)
                                        return message.reply(getLang("hasBanned", tid, name, threadData.banned.reason));
                                const time = getTime("DD/MM/YYYY HH:mm:ss");
                                await threadsData.set(tid, {
                                        banned: {
                                                status: true,
                                                reason,
                                                date: time
                                        }
                                });
                                return message.reply(getLang("banned", tid, name, reason, time));
                        }
                        // unban thread
                        case "unban":
                        case "u": {
                                if (role < 2)
                                        return message.reply(getLang("noPermission"));
                                let tid;
                                if (!isNaN(args[1]))
                                        tid = args[1];
                                else
                                        tid = event.threadID;
                                if (!tid)
                                        return message.SyntaxError();

                                const threadData = await threadsData.get(tid);
                                const name = threadData.threadName;
                                const status = threadData.banned.status;

                                if (!status)
                                        return message.reply(getLang("notBanned", tid, name));
                                await threadsData.set(tid, {
                                        banned: {}
                                });
                                return message.reply(getLang("unbanned", tid, name));
                        }
                        // info thread
                        case "info":
                        case "i": {
                                let tid;
                                if (!isNaN(args[1]))
                                        tid = args[1];
                                else
                                        tid = event.threadID;
                                if (!tid)
                                        return message.SyntaxError();
                                const threadData = await threadsData.get(tid);
                                const createdDate = getTime(threadData.createdAt, "DD/MM/YYYY HH:mm:ss");
                                const valuesMember = Object.values(threadData.members).filter(item => item.inGroup);
                                const totalBoy = valuesMember.filter(item => item.gender == "MALE").length;
                                const totalGirl = valuesMember.filter(item => item.gender == "FEMALE").length;
                                const totalMessage = valuesMember.reduce((i, item) => i += item.count, 0);
                                const infoBanned = threadData.banned.status ?
                                        `\n- Banned: ${threadData.banned.status}`
                                        + `\n- Reason: ${threadData.banned.reason}`
                                        + `\n- Time: ${threadData.banned.date}` :
                                        "";
                                const msg = getLang("info", threadData.threadID, threadData.threadName, createdDate, valuesMember.length, totalBoy, totalGirl, totalMessage, infoBanned);
                                return message.reply(msg);
                        }
                        default:
                                return message.SyntaxError();
                }
        }
};