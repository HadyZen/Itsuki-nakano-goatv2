const { removeHomeDir, log } = global.utils;

module.exports = {
	config: {
		name: "eval",
		version: "1.4",
		author: "NTKhang",
		countDown: 6,
		role: 2,
		description: "𝗃𝖺𝗅𝖺𝗇𝗄𝖺𝗇 𝗄𝗈𝖽𝖾", 
		category: "ADMIN",
		guide: { id: "{pn} <𝗄𝗈𝖽𝖾>" }
	},

	onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
		function output(msg) {
			if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
				msg = msg.toString();
			else if (msg instanceof Map) {
				let text = `Map(${msg.size}) `;
				text += JSON.stringify(mapToObj(msg), null, 2);
				msg = text;
			}
			else if (typeof msg == "object")
				msg = JSON.stringify(msg, null, 2);
			else if (typeof msg == "undefined")
				msg = "undefined";

			message.reply(msg);
		}
		function out(msg) {
			output(msg);
		}
		function mapToObj(map) {
			const obj = {};
			map.forEach(function (v, k) {
				obj[k] = v;
			});
			return obj;
		}
		const cmd = `
		(async () => {
			try {
				${args.join(" ")}
			}
			catch(err) {
				log.err("eval command", err);
				message.send(
					"𝖤𝗋𝗋𝗈𝗋:\n" +
					(err.stack ?
						removeHomeDir(err.stack) :
						removeHomeDir(JSON.stringify(err, null, 2))
					)
				);
			}
		})()`;
		eval(cmd);
	}
};