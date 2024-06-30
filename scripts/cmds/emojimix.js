const axios = require("axios");

module.exports = {
	config: {
		name: "emojimix",
		version: "1.4",
		author: "NTKhang",
		countDown: 10,
		role: 0,
		description: "𝖼𝖺𝗆𝗉𝗎𝗋𝗄𝖺𝗇 𝖽𝗎𝖺 𝖾𝗆𝗈𝗃𝗂 𝗆𝖾𝗇𝗃𝖺𝖽𝗂 𝖿𝗈𝗍𝗈", 
		guide: { id: "{pn} <𝖾𝗆𝗈𝗍> <𝖾𝗆𝗈𝗍>" }, 
		category: "GAME"
	},

	langs: {
		id: {
			error: "𝖬𝖺𝖺𝖿 𝗍𝗎𝖺𝗇, 𝖾𝗆𝗈𝗍 %1 𝖽𝖺𝗇 %2 𝗀𝖺𝗄 𝖻𝗂𝗌𝖺 𝖽𝗂𝗌𝖺𝗍𝗎𝗂𝗇",
			success: "𝖭𝗂𝗁 𝗁𝖺𝗌𝗂𝗅 𝖽𝖺𝗋𝗂 𝖾𝗆𝗈𝗍 %1 𝖽𝖺𝗇 %2"
		}
	},

	onStart: async function ({ message, args, getLang }) {
		const readStream = [];
		const emoji1 = args[0];
		const emoji2 = args[1];

		if (!emoji1 || !emoji2)
			return message.SyntaxError();

		const generate1 = await generateEmojimix(emoji1, emoji2);
		const generate2 = await generateEmojimix(emoji2, emoji1);

		if (generate1)
			readStream.push(generate1);
		if (generate2)
			readStream.push(generate2);

		if (readStream.length == 0)
			return message.reply(getLang("error", emoji1, emoji2));

		message.reply({
			body: getLang("success", emoji1, emoji2, readStream.length),
			attachment: readStream
		});
	}
};



async function generateEmojimix(emoji1, emoji2) {
	try {
		const { data: response } = await axios.get("https://goatbotserver.onrender.com/taoanhdep/emojimix", {
			params: {
				emoji1,
				emoji2
			},
			responseType: "stream"
		});
		response.path = `emojimix${Date.now()}.png`;
		return response;
	}
	catch (e) {
		return null;
	}
}
