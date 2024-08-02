const { findUid } = global.utils;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
        config: {
                name: "add",
                version: "1.4",
                author: "NTKhang",
                countDown: 10,
                role: 0,
                description: "𝗍𝖺𝗆𝖻𝖺𝗁𝗄𝖺𝗇 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗄𝖾 𝗀𝗋𝗎𝗉𝗆𝗎", 
                category: "GRUP", 
                guide: { id: "{pn} <𝗎𝗂𝖽>" }
        },

        langs: {
                id: {
                        alreadyInGroup: "𝖲𝗎𝖽𝖺𝗁 𝖻𝖾𝗋𝖺𝖽𝖺 𝖽𝗂𝖽𝖺𝗅𝖺𝗆 𝗀𝗋𝗎𝗉 𝗍𝗎𝖺𝗇!",
                        successAdd: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝖺𝗆𝖻𝖺𝗁𝗄𝖺𝗇 %1 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗄𝖾 𝗀𝗋𝗎𝗉!",
                        failedAdd: "𝖳𝗂𝖽𝖺𝗄 𝖽𝖺𝗉𝖺𝗍 𝗆𝖾𝗇𝖺𝗆𝖻𝖺𝗁𝗄𝖺𝗇 %1 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗄𝖾 𝗀𝗋𝗎𝗉!",
                        approve: "𝖬𝖾𝗇𝖺𝗆𝖻𝖺𝗁𝗄𝖺𝗇 %1 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺, 𝗁𝖺𝗋𝖺𝗉 𝖼𝖾𝗄 𝗉𝖾𝗋𝗌𝖾𝗍𝗎𝗃𝗎𝖺𝗇 𝗀𝗋𝗎𝗉 𝗍𝗎𝖺𝗇!",
                        invalidLink: "𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗅𝗂𝗇𝗄 𝖺𝗄𝗎𝗇 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗒𝖺𝗇𝗀 𝗏𝖺𝗅𝗂𝖽 𝗍𝗎𝖺𝗇",
                        cannotGetUid: "𝖬𝖺𝖺𝖿 𝗍𝗂𝖽𝖺𝗄 𝖽𝖺𝗉𝖺𝗍 𝗆𝖾𝗆𝗉𝖾𝗋𝗈𝗅𝖾𝗁 𝗂𝖽𝖾𝗇𝗍𝗂𝗍𝖺𝗌 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗂𝗇𝗂",
                        linkNotExist: "𝖠𝗄𝗎𝗇 𝖽𝖺𝗋𝗂 𝗅𝗂𝗇𝗄 𝗍𝖾𝗋𝗌𝖾𝖻𝗎𝗍 𝗍𝗂𝖽𝖺𝗄 𝖺𝖽𝖺 𝗁𝖺𝖽𝖾𝗁!",
                        cannotAddUser: "𝖳𝗂𝖽𝖺𝗄 𝖽𝖺𝗉𝖺𝗍 𝗆𝖾𝗇𝖺𝗆𝖻𝖺𝗁𝗄𝖺𝗇 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺, 𝖺𝗄𝗎𝗇 𝗉𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗍𝖾𝗋𝗌𝖾𝖻𝗎𝗍 𝖺𝖽𝖺𝗅𝖺𝗁 𝖺𝗄𝗎𝗇 𝗉𝖾𝗂𝗏𝖺𝗍𝖾"
                }
        },

        onStart: async function ({ message, api, event, args, threadsData, getLang }) {
                const { members, adminIDs, approvalMode } = await threadsData.get(event.threadID);
                const botID = api.getCurrentUserID();

                const success = [
                        {
                                type: "success",
                                uids: []
                        },
                        {
                                type: "waitApproval",
                                uids: []
                        }
                ];
                const failed = [];

                function checkErrorAndPush(messageError, item) {
                        item = item.replace(/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)/i, '');
                        const findType = failed.find(error => error.type == messageError);
                        if (findType)
                                findType.uids.push(item);
                        else
                                failed.push({
                                        type: messageError,
                                        uids: [item]
                                });
                }

                const regExMatchFB = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
                for (const item of args) {
                        let uid;
                        let continueLoop = false;

                        if (isNaN(item) && regExMatchFB.test(item)) {
                                for (let i = 0; i < 10; i++) {
                                        try {
                                                uid = await findUid(item);
                                                break;
                                        }
                                        catch (err) {
                                                if (err.name == "SlowDown" || err.name == "CannotGetData") {
                                                        await sleep(1000);
                                                        continue;
                                                }
                                                else if (i == 9 || (err.name != "SlowDown" && err.name != "CannotGetData")) {
                                                        checkErrorAndPush(
                                                                err.name == "InvalidLink" ? getLang('invalidLink') :
                                                                        err.name == "CannotGetData" ? getLang('cannotGetUid') :
                                                                                err.name == "LinkNotExist" ? getLang('linkNotExist') :
                                                                                        err.message,
                                                                item
                                                        );
                                                        continueLoop = true;
                                                        break;
                                                }
                                        }
                                }
                        }
                        else if (!isNaN(item))
                                uid = item;
                        else
                                continue;

                        if (continueLoop == true)
                                continue;

                        if (members.some(m => m.userID == uid && m.inGroup)) {
                                checkErrorAndPush(getLang("alreadyInGroup"), item);
                        }
                        else {
                                try {
                                        await api.addUserToGroup(uid, event.threadID);
                                        if (approvalMode === true && !adminIDs.includes(botID))
                                                success[1].uids.push(uid);
                                        else
                                                success[0].uids.push(uid);
                                }
                                catch (err) {
                                        checkErrorAndPush(getLang("cannotAddUser"), item);
                                }
                        }
                }

                const lengthUserSuccess = success[0].uids.length;
                const lengthUserWaitApproval = success[1].uids.length;
                const lengthUserError = failed.length;

                let msg = "";
                if (lengthUserSuccess)
                        msg += `${getLang("successAdd", lengthUserSuccess)}\n`;
                if (lengthUserWaitApproval)
                        msg += `${getLang("approve", lengthUserWaitApproval)}\n`;
                if (lengthUserError)
                        msg += `${getLang("failedAdd", failed.reduce((a, b) => a + b.uids.length, 0))} ${failed.reduce((a, b) => a += `\n    + ${b.uids.join('\n       ')}: ${b.type}`, "")}`;
                await message.reply(msg);
        }
};
