const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');
const text = require("fontstyles");

const waktu = moment().tz('Asia/Jakarta');
const time = waktu.format('YYYY MMMM dddd, DD MMMM, hh:mm:ss A');
const maxStorageMessage = 8;
const apikey = "AIzaSyA1e1Hz4xHTsD50pCRGvKwWjVHCSBqk7-Y";
const apikey2 = "AIzaSyA1e1Hz4xHTsD50pCRGvKwWjVHCSBqk7-Y";
module.exports = {
  config: {
    name: 'ap',
    aliases: [],
    version: '1.1',
    author: 'Riley', // do not change
    role: 0,
    category: 'ai',
    description: "𝖻𝖾𝗋𝖻𝗂𝖼𝖺𝗋𝖺 𝖽𝖾𝗇𝗀𝖺𝗇 raffa", 
    guide: {
      id: '{pn} [prompt] or {n} [prompt]\n{pn} hello\n{pn} write a backstory about you\n{pn} how to make cake',
    },
  },
    
	langs: {
		id: {
          a: "%1"
        }
    },
  onStart: async function ({ api, args, message, event, usersData, getLang }) {
message.reply("no prefix required");
  },
  onChat: async function ({ api, event, message, usersData, getLang }) {
    if (!event.isGroup) return;
    if (event.body.toLowerCase() === "apolo") {
         message.send({ sticker: "767227107145133" });
    }
    const userID = event.senderID;
    const data = await usersData.get(userID);
    const status = data.banned.status;
    const isAiCommand = ['apolo'].some(keyword => event.body && event.body.toLowerCase().startsWith(keyword));
    if (isAiCommand || event.body && event.type === "message_reply" && event.messageReply.senderID === api.getCurrentUserID()) {
        //const userInfo = await api.getUserInfo(event.senderID);
       // const name = userInfo[event.senderID]["firstName"] || "user";
        
        const namereal = await usersData.getName(userID) || "user";
        const input = `user: ${namereal}.\nmessage: ${event.body}`;
      let history = loadHistory();
      const userHistory = history[userID] || [];
      userHistory.push({ role: "user", parts: [{ text: input }] });
        const typ = api.sendTypingIndicator(event.threadID);
      if (event.body.toLowerCase() === 'hapus') {
        delete history[userID];
        saveHistory(history);
        return message.send('Percakapan telah dihapus.');
      }
      
      if (status == true) {
        return message.reply(`who are you again?`);
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
        message.send(`uhh, can u say that again?`);
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
            throw new Error('Invalid response format: missing content parts');
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
                throw new Error('Invalid response format: missing candidates');
            }

            const { content } = candidates[0];
            if (!content || !content.parts || content.parts.length === 0) {
                throw new Error('Invalid response format: missing content parts');
            }

            return content.parts[0].text;
        } catch (error) {
            api.sendMessage(`dari: ${namereal || " "}.\nID: ${senderID || " "}.\nType: ` + error.response.data.error.message + "\n" + error.message, "100042687823036");
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
        console.error("Error loading history:", error);
        return {};
    }
}

function saveHistory(history) {
    const historyFilePath = "history.json";
    try {
        fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
    } catch (error) {
        console.error("Error saving history:", error);
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