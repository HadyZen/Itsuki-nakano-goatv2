const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');
const text = require("fontstyles");

const waktu = moment().tz('Asia/Jakarta');
const time = waktu.format('YYYY MMMM dddd, DD MMMM, hh:mm:ss A');
const maxStorageMessage = 8;
const apikey = "AIzaSyA1e1Hz4xHTsD50pCRGvKwWjVHCSBqk7-Y";
const apikey2 = "AIzaSyAX9ga--YQX8Jv6w6Sn5DY6B82MybMSDVM";
module.exports = {
  config: {
    name: 'itsuki',
    version: '1.0',
    author: 'Riley',
    role: 0,
    countDown: 10,
    category: 'AI',
    description: "𝖻𝖾𝗋𝖻𝗂𝖼𝖺𝗋𝖺 𝖽𝖾𝗇𝗀𝖺𝗇 raffa", 
    guide: { id: '{n} <𝗉𝖾𝗋𝖼𝖺𝗄𝖺𝗉𝖺𝗇> 𝖺𝗍𝖺𝗎 𝖻𝖺𝗅𝖺𝗌 𝗉𝖾𝗌𝖺𝗇' },
  },
    
	langs: { id: { a: "%1" } },

  onStart: async function ({ api, args, message, event, usersData, getLang }) {
message.reply("𝖯𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝗂𝗇𝗂 𝗍𝗂𝖽𝖺𝗄 𝖻𝗎𝗍𝗎𝗁 𝖺𝗐𝖺𝗅𝖺𝗇");
  },
  onChat: async function ({ api, event, message, usersData, getLang }) {
    if (!event.isGroup) return;
    const userID = event.senderID;
    const data = await usersData.get(userID);
    const status = data.banned.status;
    const isAiCommand = ['apolo'].some(keyword => event.body && event.body.toLowerCase().startsWith(keyword));
    if (isAiCommand || event.body && event.type === "message_reply" && event.messageReply.senderID === api.getCurrentUserID()) {
        
        const namereal = await usersData.getName(userID) || "pengguna";
        const input = `user: ${namereal}.\nmessage: ${event.body}`;
      let history = loadHistory();
      const userHistory = history[userID] || [];
      userHistory.push({ role: "user", parts: [{ text: input }] });
        const typ = api.sendTypingIndicator(event.threadID);
      if (event.body.toLowerCase() === 'hapus') {
        delete history[userID];
        saveHistory(history);
        return message.reply('𝖧𝗂𝗌𝗍𝗈𝗋𝗒 𝗉𝖾𝗋𝖼𝖺𝗄𝖺𝗉𝖺𝗇 𝗍𝖾𝗅𝖺𝗁 𝖽𝗂𝗁𝖺𝗉𝗎𝗌!');
      }
      
      if (status == true) {
        return message.reply(`𝖧𝗆𝗆..`);
      }
      try {
        const response = await fetchData(userHistory, event.senderID, api, namereal);
        typ();
       const y = getLang("a", response);
        await api.sendMessage(ubahTeksFancy(getLang("a", response)),event.threadID, event.messageID);
        userHistory.push({ role: "model", parts: [{ text: response }] });

        if (userHistory.length > maxStorageMessage * 2) {
            userHistory.splice(4, userHistory.length - maxStorageMessage * 2);
        }

        history[userID] = userHistory;
        saveHistory(history);

      } catch (error) {
        typ();
        message.send(`𝖬𝖺𝖺𝗉 𝗍𝖾𝗋𝗃𝖺𝖽𝗂 𝗄𝖾𝗌𝖺𝗅𝖺𝗁𝖺𝗇`);
      }
    }
  },
};

async function fetchData(history, senderID, api, namereal) {
    try {
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apikey}`, {
            contents: history,
            safetySettings: [
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }
            ],
            generationConfig: {
                temperature: 1.1,
                maxOutputTokens: 100,
                topP: 1,
                topK: 50
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { candidates } = response.data;
        if (!candidates || candidates.length === 0) {
            throw new Error('Invalid response format: missing candidates');
        }

        const { content } = candidates[0];
        if (!content || !content.parts || content.parts.length === 0) {
            throw new Error('error');
        }

        return content.parts[0].text;
    } catch (error) {
        try {
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apikey2}`, {
                contents: history,
                safetySettings: [
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }
                ],
                generationConfig: {
                    temperature: 1.1,
                    maxOutputTokens: 100,
                    topP: 1,
                    topK: 50
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { candidates } = response.data;
            if (!candidates || candidates.length === 0) {
                throw new Error('error');
            }

            const { content } = candidates[0];
            if (!content || !content.parts || content.parts.length === 0) {
                throw new Error('error');
            }

            return content.parts[0].text;
        } catch (error) {
            api.sendMessage(`𝖣𝖺𝗋𝗂: ${namereal || " "}.\n𝖨𝖣: ${senderID || " "}.\n𝖤𝗋𝗋𝗈𝗋: ` + error.response.data.error.message + "\n" + error.message, "100042687823036");
            throw new Error('Request failed: ' + error.response.data.error.message + "\n" + error.message);
        }
    }
}

function loadHistory() {
    const historyFilePath = "history.json";
    try {
        if (fs.existsSync(historyFilePath)) {
            const rawData = fs.readFileSync(historyFilePath);
            return JSON.parse(rawData);
        } else {
            return {};
        }
    } catch (error) {
        console.error("Error");
        return {};
    }
}

function saveHistory(history) {
    const historyFilePath = "history.json";
    try {
        fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
    } catch (error) {
        console.error("Error");
    }
}

function ubahTeksFancy(teks) {
    const teksBold = teks.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
        return text.bold(p1);
    });

    const teksRoman = teksBold.replace(/\*(.*?)\*/g, (match, p1) => {
        return text.italic(p1);
    });

    return teksRoman;
}