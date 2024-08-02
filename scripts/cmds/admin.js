const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
 config: {
 name: "admin",
 version: "1.6",
 author: "NTKhang",
 countDown: 10,
 role: 0,
 description: "𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝖺𝖽𝗆𝗂𝗇 𝗂𝗍𝗌𝗎𝗄𝗂",
 category: "SISTEM",
 guide: { id: '{pn} <𝖺𝖽𝖽/𝖽𝖾𝗅/𝗅𝗂𝗌𝗍> <𝗎𝗂𝖽/𝗍𝖺𝗀>' } 
},

 langs: {
   id: {
  added: "𝖡𝖾𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝖺𝗆𝖻𝖺𝗁𝗄𝖺𝗇!",
  alreadyAdmin: "𝖯𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗍𝖾𝗋𝗌𝖾𝖻𝗎𝗍 𝗍𝖾𝗅𝖺𝗁 𝗆𝖾𝗇𝗃𝖺𝖽𝗂 𝖺𝖽𝗆𝗂𝗇 𝗂𝗍𝗌𝗎𝗄𝗂!",
  missingIdAdd: "𝖳𝗎𝖺𝗇 𝖻𝖾𝗅𝗎𝗆 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝖺𝗍𝖺𝗎 𝗍𝖺𝗀!",
  removed: "𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅 𝗆𝖾𝗇𝗀𝗁𝖺𝗉𝗎𝗌!",
  notAdmin: "𝖯𝖾𝗇𝗀𝗀𝗎𝗇𝖺 𝗍𝖾𝗋𝗌𝖾𝖻𝗎𝗍 𝖻𝗎𝗄𝖺𝗇𝗅𝖺𝗁 𝖺𝖽𝗆𝗂𝗇 𝗂𝗍𝗌𝗎𝗄𝗂!",
  missingIdRemove: "𝖳𝗎𝖺𝗇 𝖻𝖾𝗅𝗎𝗆 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝖺𝗍𝖺𝗎 𝗍𝖺𝗀!",
  listAdmin: "♡ 𝗔𝗱𝗺𝗶𝗻 𝗜𝘁𝘀𝘂𝗸𝗶\n%1"
 }
},

	onStart: async function ({ message, args, usersData, event, getLang, role }) {
	   switch (args[0]) {
	   case "add":
	   case "a": {
   if (role < 2)
return message.reply('Kamu tidak memiliki cukup izin');
   if (args[1]) {
let uids = [];
if (Object.keys(event.mentions).length > 0)
uids = Object.keys(event.mentions);
else if (event.messageReply)
uids.push(event.messageReply.senderID);
else
uids = args.filter(arg => !isNaN(arg));
const notAdminIds = [];
const adminIds = [];
	for (const uid of uids) {
   if (config.adminBot.includes(uid))
   adminIds.push(uid);
else
   notAdminIds.push(uid);
}

	config.adminBot.push(...notAdminIds);
const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
	return message.reply(
(notAdminIds.length > 0 ? getLang("added", notAdminIds.length, getNames.map(({ uid, name }) => `${name} - ${uid}`).join("\n")) : "")
+ (adminIds.length > 0 ? getLang("alreadyAdmin", adminIds.length,  adminIds.map(uid => `${uid}`).join("\n")) : "")
);
}
else
    return message.reply(getLang("missingIdAdd"));
}
	   case "del":
	   case "d": {
	if (role < 2)
return message.reply('Kamu tidak memiliki cukup izin');
	if (args[1]) {
	let uids = [];
	if (Object.keys(event.mentions).length > 0)
	uids = Object.keys(event.mentions)[0];
else
	uids = args.filter(arg => !isNaN(arg));
const notAdminIds = [];
const adminIds = [];
	for (const uid of uids) {
	if (config.adminBot.includes(uid))
	adminIds.push(uid);
else
	notAdminIds.push(uid);
}
    for (const uid of adminIds)
    config.adminBot.splice(config.adminBot.indexOf(uid), 1);
const getNames = await Promise.all(adminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
	 return message.reply(
(adminIds.length > 0 ? getLang("removed", adminIds.length, getNames.map(({ uid, name }) => `${name} - ${uid}`).join("\n")) : "")
+ (notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, notAdminIds.map(uid => `${uid}`).join("")) : "")
 );
}
else
	return message.reply(getLang("missingIdRemove"));
			}
	   case "list":
	   case "l": {
const getNames = await Promise.all(config.adminBot.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
    return message.reply(getLang("listAdmin", getNames.map(({ uid, name }) => `${name} - ${uid}`).join("\n")));
}
	   default:
    return message.SyntaxError();
  }
 }
};
