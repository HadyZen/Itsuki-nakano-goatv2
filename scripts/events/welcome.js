const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.5",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		id: {
			session1: "𝗉𝖺𝗀𝗂",
			session2: "𝗌𝗂𝖺𝗇𝗀",
			session3: "𝗌𝗈𝗋𝖾",
			session4: "𝗆𝖺𝗅𝖺𝗆",
			multiple1: "𝗄𝖺𝗆𝗎",
			multiple2: "𝗅𝗎",
			defaultWelcomeMessage: `𝖧𝖺𝗂 𝗌𝖺𝗒𝖺𝗇𝗀! 🫥\n𝖡𝗎𝖺𝗍 {multiple} 𝗌𝖾𝗅𝖺𝗆𝖺𝗍 𝖽𝖺𝗍𝖺𝗇𝗀 𝖽𝗂 {boxName}\n𝗌𝖾𝗆𝗈𝗀𝖺 {session}𝗆𝗎 𝗆𝖾𝗇𝗒𝖾𝗇𝖺𝗇𝗀𝗄𝖺𝗇! 🫰`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
       const pipi = await global.utils.getStreamFromURL("https://ibb.co.com/vP3b7zV");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send("𝖬𝖺𝗅𝖺𝗌 𝗆𝖾𝗇𝖺𝗇𝗀𝗀𝖺𝗉𝗂! 🧢");
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const threadData = await threadsData.get(threadID);
					const dataBanned = threadData.data.banned_ban || [];
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 10
								? getLang("session1")
								: hours <= 12
									? getLang("session2")
									: hours <= 18
										? getLang("session3")
										: getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
					}
					message.send({ body: form, attachment: pipi });
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
