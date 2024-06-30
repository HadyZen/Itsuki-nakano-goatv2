const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.0",
		author: "Hady Zen",
		category: "events"
	},

	langs: {
		en: {
			session1: "𝗉𝖺𝗀𝗂",
			session2: "𝗌𝗂𝖺𝗇𝗀",
			session3: "𝗌𝗈𝗋𝖾",
			session4: "𝗆𝖺𝗅𝖺𝗆",
			multiple1: "𝗌𝖾𝗇𝗉𝖺𝗂",
			multiple2: "𝗍𝗎𝖺𝗇",
			defaultWelcomeMessage: `𝖧𝖺𝗅𝗅𝗈 {multiple}, 𝖻𝗎𝖺𝗍 𝗄𝖺𝗆𝗎 𝗌𝖾𝗅𝖺𝗆𝖺𝗍 𝖽𝖺𝗍𝖺𝗇𝗀 𝖽𝗂𝗀𝗋𝗎𝗉 𝗂𝗇𝗂 𝖻𝖾𝗋𝗌𝖾𝗇𝖺𝗇𝗀-𝗌𝖾𝗇𝖺𝗇𝗀𝗅𝖺𝗁 𝗉𝖺𝖽𝖺 {session} 𝗒𝖺𝗇𝗀 𝖼𝖾𝗋𝖺𝗁 𝗂𝗇𝗂! (◍•ᴗ•◍)`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const dataAddedParticipants = event.logMessageData.addedParticipants;
		if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
	};
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const ahh = ["https://i.ibb.co/q1zzChB/448629568-476971481497042-5142132637973552522-n-jpg-nc-cat-100-ccb-1-7-nc-sid-5f2048-nc-eui2-Ae-Hb5.jpg", "https://i.ibb.co/THCTL5w/448363530-991949752562034-1196926911445185213-n-jpg-nc-cat-110-ccb-1-7-nc-sid-5f2048-nc-eui2-Ae-Gs7v.jpg", "https://i.ibb.co/pfYsBD3/448364834-1168382834277627-7956854678474568781-n-jpg-nc-cat-111-ccb-1-7-nc-sid-5f2048-nc-eui2-Ae-G5c.jpg", "https://i.imgur.com/HhCE8LS.jpeg"];
					const hadi = ahh[Math.floor(Math.random() * ahh.length)];
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
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
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
					const ini = await global.utils.getStreamFromURL(hadi);
					message.send({ body: welcomeMessage, attachment: ini });
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};