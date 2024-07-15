module.exports = {
 config: {
 name: "notif",
 version: "1.0",
 author: "Hady Zen",
 category: "events"
 },

 onStart: async ({ threadsData, event, message }) => {
 const { logMessageData } = event;
 
 if (event.logMessageType === "log:thread-image") {
 return message.send("♡ [ 𝘀𝗶𝘀𝘁𝗲𝗺 ] 𝖿𝗈𝗍𝗈 𝗀𝗋𝗎𝗉 𝗍𝖾𝗅𝖺𝗁 𝖽𝗂𝗉𝖾𝗋𝖻𝖺𝗋𝗎𝗂");
 }
 
 if (event.logMessageType === "log:thread-icon") {
 return message.send("♡ [ 𝘀𝗶𝘀𝘁𝗲𝗺 ] 𝗍𝖺𝗇𝗀𝗀𝖺𝗉𝖺𝗇 𝗀𝗋𝗎𝗉 𝗍𝖾𝗅𝖺𝗁 𝖽𝗂𝗉𝖾𝗋𝖻𝖺𝗋𝗎𝗂!");
 }
 
 if (event.logMessageType === "log:thread-color") {
 return message.send("♡ [ 𝘀𝗶𝘀𝘁𝗲𝗺 ] 𝗍𝖾𝗆𝖺 𝗀𝗋𝗎𝗉 𝗍𝖾𝗅𝖺𝗁 𝖽𝗂𝗉𝖾𝗋𝖻𝖺𝗋𝗎𝗂!");
 }
 
 if (event.logMessageType === "log:thread-name") {
 return message.send("♡ [ 𝘀𝗶𝘀𝘁𝗲𝗺 ] 𝗇𝖺𝗆𝖺 𝗀𝗋𝗎𝗉 𝗍𝖾𝗅𝖺𝗁 𝖽𝗂𝗉𝖾𝗋𝖻𝖺𝗋𝗎𝗂!");
 }
 }
};