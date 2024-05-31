const { getStreamsFromAttachment } = global.utils;

module.exports = {
	config: {
		name: "notif",
		version: "1.6",
		author: "NTKhang",
		countDown: 10,
		role: 2,
		description: "𝗄𝗂𝗋𝗂𝗆 𝗇𝗈𝗍𝗂𝖿𝗂𝗄𝖺𝗌𝗂 𝗄𝖾𝗌𝖾𝗆𝗎𝖺 𝗀𝗋𝗎𝗉", 
		category: "ADMIN",
		guide: { id: "{pn} <𝗉𝖾𝗌𝖺𝗇>" },
		envConfig: {
			delayPerGroup: 260
		}
	},

	langs: {
		id: {
			missingMessage: "𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗉𝖾𝗌𝖺𝗇 𝗒𝖺𝗇𝗀 𝗂𝗇𝗀𝗂𝗇 𝖽𝗂𝗄𝗂𝗋𝗂𝗆",
			notification: "✨ 𝗡𝗼𝘁𝗶𝗳𝗶𝗸𝗮𝘀𝗶",
			berhasil: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗂𝗋𝗂𝗆 𝗇𝗈𝗍𝗂𝖿𝗂𝗄𝖺𝗌𝗂 𝗄𝖾 %1 grup", 
			gagal: "𝖦𝖺𝗀𝖺𝗅 𝗆𝖾𝗇𝗀𝗂𝗋𝗂𝗆 𝗇𝗈𝗍𝗂𝖿𝗂𝗄𝖺𝗌𝗂 𝗄𝖾 %1 𝗀𝗋𝗎𝗉:\n%2"
		}
	},

	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
		const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\n━━━━━━━━\n${args.join(" ")}`,
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reaction("⌛",event.messageID);

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("berhasil", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("gagal", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		api.sendMessage(msg, event.senderID);
    message.reaction("✨", event.messageID);
	}
};