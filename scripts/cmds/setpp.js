const axios = require("axios");

module.exports = {
	config: {
		name: "setpp",
		version: "1.3",
		author: "NTKhang",
		countDown: 10,
		role: 2,
		description: "𝗀𝖺𝗇𝗍𝗂 𝗉𝗋𝗈𝖿𝗂𝗅 𝗂𝗍𝗌𝗎𝗄𝗂", 
		category: "ADMIN",
		guide: { id: "{pn} <𝗍𝖺𝗎𝗍𝖺𝗇/𝗋𝖾𝗉𝗅𝗒> <𝗍𝖾𝗄𝗌>" }
}, 

	onStart: async function ({ message, event, api, args }) {
		const imageURL = (args[0] || "").startsWith("http") ? args.shift() : event.attachments[0]?.url || event.messageReply?.attachments[0]?.url;
		const expirationAfter = !isNaN(args[args.length - 1]) ? args.pop() : null;
		const caption = args.join(" ");
		if (!imageURL)
			return message.SyntaxError();
		let response;
		try {
			response = (await axios.get(imageURL, {
				responseType: "stream"
			}));
		}
		catch (err) {
			return message.reply("𝖳𝖾𝗋𝗃𝖺𝖽𝗂 𝗄𝖾𝗌𝖺𝗅𝖺𝗁𝖺𝗇 𝗌𝖺𝖺𝗍 𝗆𝖾𝗇𝗀𝖺𝗆𝖻𝗂𝗅 𝗀𝖺𝗆𝖻𝖺𝗋 𝖽𝗂𝗍𝖺𝗎𝗍𝖺𝗇");
		}
		if (!response.headers["content-type"].includes("image"))
			return message.reply("𝖥𝗈𝗋𝗆𝖺𝗍 𝗍𝗂𝖽𝖺𝗄 𝖽𝗂𝖽𝗎𝗄𝗎𝗇𝗀");
		response.data.path = "avatar.jpg";

		api.changeAvatar(response.data, caption, expirationAfter ? expirationAfter * 1000 : null, (err) => {
			if (err)
				return message.err(err);
			return message.reply("𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗀𝖺𝗇𝗍𝗂 𝗉𝗋𝗈𝖿𝗂𝗅 𝗂𝗍𝗌𝗎𝗄𝗂");
		});
	}
};
