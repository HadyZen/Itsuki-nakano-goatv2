const { getStreamFromURL, uploadImgbb } = global.utils;

module.exports = {
        config: {
                name: "setting",
                version: "1.6",
                author: "NTKhang",
                countDown: 10,
                role: 1,
                shortDescription: "𝗉𝖾𝗇𝗃𝖺𝗀𝖺 𝗀𝗋𝗎𝗉 𝗆𝗎", 
                category: "box chat",
                guide: { id: "{pn} <𝖿𝗈𝗍𝗈/𝗇𝖺𝗆𝖺/𝗍𝖾𝗆𝖺/𝖾𝗆𝗈𝗃𝗂/𝗇𝗂𝖼𝗄> <𝗈𝗇/𝗈𝖿𝖿>" }
}

        langs: {
                id: {
                        antiChangeAvatarOn: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝖿𝗈𝗍𝗈 𝗀𝗋𝗎𝗉",
                        antiChangeAvatarOff: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝖿𝗈𝗍𝗈 𝗀𝗋𝗎𝗉",
                        missingAvt: "𝖪𝖺𝗆𝗎 𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗇𝗒𝗂𝗆𝗉𝖺𝗇 𝖿𝗈𝗍𝗈 𝗎𝗇𝗍𝗎𝗄 𝗀𝗋𝗎𝗉",
                        antiChangeNameOn: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺 𝗀𝗋𝗎𝗉",
                        antiChangeNameOff: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺 𝗀𝗋𝗎𝗉",
                        antiChangeNicknameOn: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺 𝗆𝖾𝗆𝖻𝖾𝗋",
                        antiChangeNicknameOff: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺 𝗆𝖾𝗆𝖻𝖾𝗋",
                        antiChangeThemeOn: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗍𝖾𝗆𝖺 𝗀𝗋𝗎𝗉",
                        antiChangeThemeOff: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗍𝖾𝗆𝖺 𝗀𝗋𝗎𝗉",
                        antiChangeEmojiOn: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝖾𝗆𝗈𝗃𝗂 𝗀𝗋𝗎𝗉",
                        antiChangeEmojiOff: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗇𝗈𝗇𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝖾𝗆𝗈𝗃𝗂 𝗀𝗋𝗎𝗉",
                        antiChangeAvatarAlreadyOn: "𝖦𝗋𝗎𝗉 𝗆𝗎 𝗌𝗎𝖽𝖺𝗁 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝖿𝗈𝗍𝗈 𝗀𝗋𝗎𝗉",
                        antiChangeNameAlreadyOn: "𝖦𝗋𝗎𝗉 𝗆𝗎 𝗌𝗎𝖽𝖺𝗁 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺 𝗀𝗋𝗎𝗉",
                        antiChangeNicknameAlreadyOn: "𝖦𝗋𝗎𝗉 𝗆𝗎 𝗌𝗎𝖽𝖺𝗁 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗇𝖺𝗆𝖺 𝗆𝖾𝗆𝖻𝖾𝗋",
                        antiChangeThemeAlreadyOn: "𝖦𝗋𝗎𝗉 𝗆𝗎 𝗌𝗎𝖽𝖺𝗁 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗂 𝗀𝖺𝗇𝗍𝗂 𝗍𝖾𝗆𝖺 𝗀𝗋𝗎𝗉",
                        antiChangeEmojiAlreadyOn: "𝖦𝗋𝗎𝗉 𝗆𝗎 𝗌𝗎𝖽𝖺𝗁 𝗆𝖾𝗇𝗀𝖺𝗄𝗍𝗂𝖿𝗄𝖺𝗇 𝖺𝗇𝗍𝗎 𝗀𝖺𝗇𝗍𝗂 𝖾𝗆𝗈𝗃𝗂 𝗀𝗋𝗎𝗉"
                }
        },

        onStart: async function ({ message, event, args, threadsData, getLang }) {
                if (!["on", "off"].includes(args[1]))
                        return message.SyntaxError();
                const { threadID } = event;
                const dataAntiChangeInfoBox = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
                async function checkAndSaveData(key, data) {
                        // dataAntiChangeInfoBox[key] = args[1] === "on" ? data : false;
                        if (args[1] === "off")
                                delete dataAntiChangeInfoBox[key];
                        else
                                dataAntiChangeInfoBox[key] = data;

                        await threadsData.set(threadID, dataAntiChangeInfoBox, "data.antiChangeInfoBox");
                        message.reply(getLang(`antiChange${key.slice(0, 1).toUpperCase()}${key.slice(1)}${args[1].slice(0, 1).toUpperCase()}${args[1].slice(1)}`));
                }
                switch (args[0]) {
                        case "ft":
                        case "foto": {
                                const { imageSrc } = await threadsData.get(threadID);
                                if (!imageSrc)
                                        return message.reply(getLang("missingAvt"));
                                const newImageSrc = await uploadImgbb(imageSrc);
                                await checkAndSaveData("avatar", newImageSrc.image.url);
                                break;
                        }
                        case "nama": {
                                const { threadName } = await threadsData.get(threadID);
                                await checkAndSaveData("name", threadName);
                                break;
                        }
                        case "nick": {
                                const { members } = await threadsData.get(threadID);
                                await checkAndSaveData("nickname", members.map(user => ({ [user.userID]: user.nickname })).reduce((a, b) => ({ ...a, ...b }), {}));
                                break;
                        }
                        case "tema": {
                                const { threadThemeID } = await threadsData.get(threadID);
                                await checkAndSaveData("theme", threadThemeID);
                                break;
                        }
                        case "emoji": {
                                const { emoji } = await threadsData.get(threadID);
                                await checkAndSaveData("emoji", emoji);
                                break;
                        }
                        default: {
                                return message.SyntaxError();
                        }
                }
        },

        onEvent: async function ({ message, event, threadsData, role, api, getLang }) {
                const { threadID, logMessageType, logMessageData, author } = event;
                switch (logMessageType) {
                        case "log:thread-image": {
                                const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
                                if (!dataAntiChange.avatar && role < 1)
                                        return;
                                return async function () {
                                        if (role < 1 && api.getCurrentUserID() !== author) {
                                                message.reply(getLang("antiChangeAvatarAlreadyOn"));
                                                api.changeGroupImage(await getStreamFromURL(dataAntiChange.avatar), threadID);
                                        }
                                        else {
                                                const imageSrc = logMessageData.url;
                                                const newImageSrc = await uploadImgbb(imageSrc);
                                                await threadsData.set(threadID, newImageSrc.image.url, "data.antiChangeInfoBox.avatar");
                                        }
                                };
                        }
                        case "log:thread-name": {
                                const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
                                // const name = await threadsData.get(threadID, "data.antiChangeInfoBox.name");
                                // if (name == false)
                                if (!dataAntiChange.hasOwnProperty("name"))
                                        return;
                                return async function () {
                                        if (role < 1 && api.getCurrentUserID() !== author) {
                                                message.reply(getLang("antiChangeNameAlreadyOn"));
                                                api.setTitle(dataAntiChange.name, threadID);
                                        }
                                        else {
                                                const threadName = logMessageData.name;
                                                await threadsData.set(threadID, threadName, "data.antiChangeInfoBox.name");
                                        }
                                };
                        }
                        case "log:user-nickname": {
                                const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
                                // const nickname = await threadsData.get(threadID, "data.antiChangeInfoBox.nickname");
                                // if (nickname == false)
                                if (!dataAntiChange.hasOwnProperty("nickname"))
                                        return;
                                return async function () {
                                        const { nickname, participant_id } = logMessageData;

                                        if (role < 1 && api.getCurrentUserID() !== author) {
                                                message.reply(getLang("antiChangeNicknameAlreadyOn"));
                                                api.changeNickname(dataAntiChange.nickname[participant_id], threadID, participant_id);
                                        }
                                        else {
                                                await threadsData.set(threadID, nickname, `data.antiChangeInfoBox.nickname.${participant_id}`);
                                        }
                                };
                        }
                        case "log:thread-color": {
                                const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
                                // const themeID = await threadsData.get(threadID, "data.antiChangeInfoBox.theme");
                                // if (themeID == false)
                                if (!dataAntiChange.hasOwnProperty("theme"))
                                        return;
                                return async function () {
                                        if (role < 1 && api.getCurrentUserID() !== author) {
                                                message.reply(getLang("antiChangeThemeAlreadyOn"));
                                                api.changeThreadColor(dataAntiChange.theme || "196241301102133", threadID); // 196241301102133 is default color
                                        }
                                        else {
                                                const threadThemeID = logMessageData.theme_id;
                                                await threadsData.set(threadID, threadThemeID, "data.antiChangeInfoBox.theme");
                                        }
                                };
                        }
                        case "log:thread-icon": {
                                const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
                                // const emoji = await threadsData.get(threadID, "data.antiChangeInfoBox.emoji");
                                // if (emoji == false)
                                if (!dataAntiChange.hasOwnProperty("emoji"))
                                        return;
                                return async function () {
                                        if (role < 1 && api.getCurrentUserID() !== author) {
                                                message.reply(getLang("antiChangeEmojiAlreadyOn"));
                                                api.changeThreadEmoji(dataAntiChange.emoji, threadID);
                                        }
                                        else {
                                                const threadEmoji = logMessageData.thread_icon;
                                                await threadsData.set(threadID, threadEmoji, "data.antiChangeInfoBox.emoji");
                                        }
                                };
                        }
                }
        }
};