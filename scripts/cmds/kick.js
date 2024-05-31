module.exports = {
	config: {
		name: "kick",
		version: "1.2",
		author: "NTKhang",
		countDown: 10,
		role: 1,
		description: "𝗍𝖾𝗇𝖽𝖺𝗇𝗀 𝗆𝖾𝗆𝖻𝖾𝗋 𝖽𝖺𝗋𝗂 𝗀𝗋𝗎𝗉", 
		category: "GRUP",
		guide: { id: "   {pn} <𝗍𝖺𝗀/𝖻𝖺𝗅𝖺𝗌>"
		}
	},

	onStart: async function ({ message, event, args, threadsData, api, getLang }) {
		const adminIDs = await threadsData.get(event.threadID, "adminIDs");
		if (!adminIDs.includes(api.getCurrentUserID()))
			return message.reply(getLang("needAdmin"));
		async function kickAndCheckError(uid) {
			try {
				await api.removeUserFromGroup(uid, event.threadID);
			}
			catch (e) {
				message.reply("𝖧𝖺𝗋𝖺𝗉 𝗃𝖺𝖽𝗂𝗄𝖺𝗇 𝗋𝖺𝖿𝖿𝖺 𝖺𝖽𝗆𝗂𝗇 𝗍𝖾𝗋𝗅𝖾𝖻𝗂𝗁 𝖽𝖺𝗁𝗎𝗅𝗎!");
				return "ERROR";
			}
		}
		if (!args[0]) {
			if (!event.messageReply)
				return message.SyntaxError();
			await kickAndCheckError(event.messageReply.senderID);
		}
		else {
			const uids = Object.keys(event.mentions);
			if (uids.length === 0)
				return message.SyntaxError();
			if (await kickAndCheckError(uids.shift()) === "ERROR")
				return;
			for (const uid of uids)
				api.removeUserFromGroup(uid, event.threadID);
		}
	}
};