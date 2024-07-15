const jenis = [
 { ikan: "Mas", yen: 2, dropRate: 50 }, 
 { ikan: "Lele", yen: 2, dropRate: 50 }, 
 { ikan: "Seluang", yen: 2, dropRate: 50 }, 
 { ikan: "sepatu", yen: 0, dropRate: 98}, 
 { ikan: "Nila", yen: 2, dropRate: 50 }, 
 { ikan: "Mujair", yen: 4, dropRate: 40 }, 
 { ikan: "Gurami", yen: 4, dropRate: 40 }, 
 { ikan: "Bawal", yen: 6, dropRate: 30 }, 
 { ikan: "sempak", yen: 0, dropRate: 98 },
 { ikan: "Baung", yen: 14, dropRate: 2 }, 
 { ikan: "Tuna", yen: 20, dropRate: 1 }, 
 { ikan: "beha", yen: 0, dropRate: 98 },
 { ikan: "Patin", yen: 6, dropRate: 30  }, 
 { ikan: "Gabus", yen: 8, dropRate: 10 }, 
 { ikan: "Tawes", yen: 8, dropRate: 10  },  
 { ikan: "Sepat", yen: 10, dropRate: 3 }, 
 { ikan: "sendal", yen: 0, dropRate: 98 } 
];
module.exports = {
  config: {
    name: "fish",
    version: "1.0",
    author: "Hady Zen",
    countDown: 60,
    role: 0,
    description: "𝗆𝖺𝗇𝖼𝗂𝗇𝗀 𝗅𝖾", 
    category: "GAME",
    guide: { id: "{pn}" }
  },

  onStart: async function ({ message, usersData, api, event }) { 
  const uang = await usersData.get(event.senderID, "money");
   if (uang < 10) { return message.reply("𝖪𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗉𝗎𝗇𝗒𝖺 𝖼𝗎𝗄𝗎𝗉 𝗎𝖺𝗇𝗀 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗆𝖻𝖾𝗅𝗂 𝗉𝖾𝗋𝗌𝖾𝖽𝗂𝖺𝖺𝗇 𝗎𝗆𝗉𝖺𝗇!");
   }
  const memancing = await message.reply("𝖬𝗎𝗅𝖺𝗂 𝗆𝖾𝗆𝖺𝗇𝖼𝗂𝗇𝗀... ");
 await usersData.set(event.senderID, { money: uang - 1 });
  const hasil = weightedRandom(jenis);
  const { ikan, yen } = hasil;
  if (yen == 0) { 
 setTimeout(() => { api.editMessage(`𝖪𝖺𝗆𝗎 𝗁𝖺𝗇𝗒𝖺 𝗆𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 ${ikan} 𝗁𝖺𝗇𝗒𝗎𝗍 𝗁𝖺𝗋𝗂 𝗂𝗇𝗂!`, memancing.messageID); }, 6000);
  } else { 
   await usersData.set(event.senderID, { money: uang + yen });
   const berhasil = `🎣 • 𝗣𝗮𝗻𝗰𝗶𝗻𝗴 𝗺𝗮𝗻𝗶𝗮
   
- 𝖩𝖾𝗇𝗂𝗌 𝗂𝗄𝖺𝗇: ${ikan}
- 𝖧𝖺𝗋𝗀𝖺 𝗂𝗄𝖺𝗇: ${yen}
𝖲𝖾𝗅𝖺𝗆𝖺𝗍 𝗄𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗆𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖻𝖾𝗇𝖽𝖺 𝖺𝗌𝗍𝗋𝖺𝗅 𝗅𝖺𝗀𝗂 𝗁𝖺𝗋𝗂 𝗂𝗇𝗂! 🎉`;
setTimeout(() => { api.editMessage(berhasil, memancing.messageID); }, 6000);
  } 
 }, 
};

function weightedRandom(arr) {
  let totalWeight = 0;
  for (const { dropRate } of arr) {
    totalWeight += dropRate;
  }

  const randomValue = Math.random() * totalWeight;
  let currentWeight = 0;
  for (const { ikan, yen, dropRate } of arr) {
    currentWeight += dropRate;
    if (randomValue < currentWeight) {
      return { ikan, yen };
    }
  }
}