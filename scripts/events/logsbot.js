const { getTime } = global.utils;

module.exports = {
	config: {
		name: "logsbot",
		isBot: true,
		version: "1.4",
		author: "NTKhang",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		id: {
			title: "✨ 𝗜𝘁𝘀𝘂𝗸𝗶 𝗟𝗼𝗴",
			added: "\n𝖨𝗍𝗌𝗎𝗄𝗂 𝖽𝗂𝗍𝖺𝗆𝖻𝖺𝗁 𝗄𝖾𝗀𝗋𝗎𝗉!\n- 𝖣𝗂𝗍𝖺𝗆𝖻𝖺𝗁: %1",
			kicked: "\n𝖨𝗍𝗌𝗎𝗄𝗂 𝖽𝗂𝗄𝖾𝗅𝗎𝖺𝗋𝗄𝖺𝗇 𝖽𝖺𝗋𝗂 𝗀𝗋𝗎𝗉!\n- 𝖣𝗂𝗄𝖾𝗅𝗎𝖺𝗋𝗄𝖺𝗇: %1",
			footer: "\n- 𝖴𝗌𝖾𝗋𝖨𝖣: %1\n- 𝖦𝗋𝗎𝗉: %2\n- 𝖦𝗋𝗎𝗉𝖨𝖣: %3\n- 𝖶𝖺𝗄𝗍𝗎: %4"
		}
	},

	onStart: async ({ usersData, threadsData, event, api, getLang }) => {
		if (
			(event.logMessageType == "log:subscribe" && event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
			|| (event.logMessageType == "log:unsubscribe" && event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
		) return async function () {
			let msg = getLang("title");
			const { author, threadID } = event;
			if (author == api.getCurrentUserID())
				return;
			let threadName;
			const { config } = global.GoatBot;

			if (event.logMessageType == "log:subscribe") {
				if (!event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
					return;
				threadName = (await api.getThreadInfo(threadID)).threadName;
				const authorName = await usersData.getName(author);
				msg += getLang("added", authorName);
			}
			else if (event.logMessageType == "log:unsubscribe") {
				if (event.logMessageData.leftParticipantFbId != api.getCurrentUserID())
					return;
				const authorName = await usersData.getName(author);
				const threadData = await threadsData.get(threadID);
				threadName = threadData.threadName;
				msg += getLang("kicked", authorName);
			}
			const time = getTime("DD/MM/YYYY HH:mm:ss");
			msg += getLang("footer", author, threadName, threadID, time);

			for (const adminID of config.adminBot)
				api.sendMessage(msg, adminID);
		};
	}
};