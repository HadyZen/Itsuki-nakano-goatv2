const fs = require("fs-extra");

module.exports = {
 config: {
 name: "restart",
 version: "1.1",
 author: "NTKhang",
 countDown: 6,
 role: 2,
 description: "𝖬𝖾𝗆𝗎𝗅𝖺𝗂 𝗎𝗅𝖺𝗇𝗀 𝗋𝖺𝖿𝖿𝖺",
 category: "ADMIN",
 guide: { id: "{pn}" }
},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`✨ 𝖲𝖾𝗅𝖾𝗌𝖺𝗂 𝗆𝖾𝗆𝗎𝗅𝖺𝗂 𝗎𝗅𝖺𝗇𝗀 (${(Date.now() - time) / 1000}s)`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply("✨ 𝖬𝖾𝗆𝗎𝗅𝖺𝗂 𝗎𝗅𝖺𝗇𝗀 𝗋𝖺𝖿𝖿𝖺...");
		process.exit(2);
	}
};
