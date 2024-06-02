const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const systemInstruction = "Nama kamu adalah raffa badry, kamu diciptakan oleh hadi. Respon mu tidak perlu detail tapi mudah dimengerti, kamu harus menggunakan kata kata modern dan emoji sesuai percakapan";
const history = {};

const config = {
    name: 'raffa',
    version: '1.0',
    author: 'softrilez',
    countDown: 10,
    role: 0,
    description: '𝖱𝖺𝖿𝖿𝖺 𝖠𝖨',
    category: 'AI',
    guide: { id: '{pn} <𝗊𝗎𝖾𝗋𝗒>' }
};

const onStart = async ({ message, event, args, api }) => {
    if (!event.isGroup) return;

    const prompt = args.join(' ');
    if (!args[0]) {
        return message.reply('Ciao!');
    }
    const mid = event.messageID;
    message.send('hmm...');
    await chat(prompt, event.senderID, message, mid, api);
};

const onReply = async ({ Reply, event, api, message }) => {
    const mid = event.messageID;
    const prompt = event.body;
    await chat(prompt, event.senderID, message, mid, api);
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyCuvKgwOpSlkwvAWzZdWtPlgOCLjC_yapQ");//change this to ur own apikey!!!

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction,
});

const generationConfig = {
  temperature: 0.95,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 800,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

async function chat(text, userID, message, mid, api) {
    let histori = history[userID] || [];
    try {
        histori.push({
            role: "user",
            parts: [{ text }]
        });

        const chatSession = model.startChat({
            generationConfig,
            safetySettings,
            history: histori,
        });

        const result = await chatSession.sendMessage(text);

        histori.push({
            role: "model",
            parts: [{ text: result.response.text() }]
        });
        
        history[userID] = histori;

message.reply(`${result.response.text()}`, (error, info) => {
            global.GoatBot.onReply.set(info.messageID, { commandName: cai, author: userID, history: histori });
        });
    } catch (error) {
        message.send('Uhh, can you say that again?');
    }
}

module.exports = { config, onStart, onReply };