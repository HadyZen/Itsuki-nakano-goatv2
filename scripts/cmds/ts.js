const path = require('path');
const fs = require('fs');
const pendingTrades = {};

module.exports = {
 config: {
  name: "ts",
  version: "1.3",
  author: "Hady Zen X Saveng Fox",
  countDown: 40,
  role: 0,
  description: "𝗍𝗁𝖾 𝗊𝗎𝗂𝗇𝗍𝖾𝗌𝗌𝖾𝗇𝗍𝗂𝖺𝗅 𝗊𝗎𝗂𝗇𝗍𝗎𝗉𝗅𝖾𝗌",
  category: "GAME",
  guide: { id: "{pn} <𝗉𝗎𝗅𝗅/𝗂𝗇𝗏/𝗌𝖾𝗅𝗅/𝗌𝖾𝗅𝗅𝖼/𝗌𝗁𝗈𝗐/𝗁𝖾𝗅𝗉>" }
},

onStart: async function({ message, args, usersData, event, api }) {   
const userID = event.senderID;
const kartu = [
{ nama: "Itsuki Nakano", 
   id: "001S", 
   bint: "★★★★★",
   harga: 60,
   dropRate: 1,
   card: "https://i.ibb.co/jDhHxwF/449090023-1013987066753260-3529955517333640203-n-jpg-stp-dst-jpg-p480x480-nc-cat-102-ccb-1-7-nc-sid.jpg"
 },
{ nama: "Itsuki Nakano", 
  id: "001", 
  bint: "★★★★★", 
  harga: 50,
  dropRate: 2,
  card: "https://i.ibb.co/x1pX0dP/448954613-344518895193063-28104203494697830-n-jpg-stp-dst-jpg-p480x480-nc-cat-109-ccb-1-7-nc-sid-9f8.jpg"
 }, 
{ nama: "Nino Nakano", 
  id: "002S", 
  bint: "★★☆☆☆",
  harga: 15,
  dropRate: 60,
  card: "https://i.ibb.co/r6GcN1Q/448904892-855469706433583-2586344705770873631-n-jpg-stp-dst-jpg-p480x480-nc-cat-109-ccb-1-7-nc-sid-9.jpg"
 }, 
{ nama: "Nino Nakano", 
  id: "002", 
  bint: "★★☆☆☆",
  harga: 14,
  dropRate: 60,
  card: "https://i.ibb.co/vjy3nB0/449661171-7667522980031140-6066873952371622317-n-jpg-stp-dst-jpg-p480x480-nc-cat-105-ccb-1-7-nc-sid.jpg"
 }, 
{ nama: "Miku Nakano", 
  id: "003", 
  bint: "★☆☆☆☆",
  harga: 8,
  dropRate: 92,
  card: "https://i.ibb.co/SVB48WS/448953273-1522538641950206-2012791900281289519-n-jpg-stp-dst-jpg-p480x480-nc-cat-109-ccb-1-7-nc-sid.jpg"
 }, 
{ nama: "Miku Nakano", 
 id: "003S", 
 bint: "★★★★☆",
 harga: 40,
 dropRate: 10,
 card: "https://i.ibb.co/jMmcPhw/449076503-962133362315284-5193250776869033238-n-jpg-stp-dst-jpg-p480x480-nc-cat-108-ccb-1-7-nc-sid-9.jpg"
 }, 
{ nama: "Yotsuba Nakano", 
  id: "004S", 
  bint: "★★☆☆☆",
  harga: 15,
  dropRate: 60,
  card: "https://i.ibb.co/jhg0HqG/448937723-498515879278536-166413902241032575-n-jpg-stp-dst-jpg-p480x480-nc-cat-106-ccb-1-7-nc-sid-9f.jpg"
 }, 
{ nama: "Yotsuba Nakano", 
  id: "004", 
  bint: "★☆☆☆☆",
  harga: 8,
  dropRate: 92,
  card: "https://i.ibb.co/8bqHvbR/449083109-1410567836302936-6411043710494436780-n-jpg-stp-dst-jpg-p480x480-nc-cat-109-ccb-1-7-nc-sid.jpg"
 }, 
{ nama: "Ichika Nakano", 
  id: "005S", 
  bint: "★★★☆☆",
  harga: 28,
  dropRate: 30,
  card: "https://i.ibb.co/23M3h55/448930136-979769317179130-5017280039882228282-n-jpg-stp-dst-jpg-p480x480-nc-cat-107-ccb-1-7-nc-sid-9.jpg"
 }, 
{ nama: "Ichika Nakano", 
  id: "005", 
  bint: "★☆☆☆☆",
  harga: 8,
  dropRate: 92,
  card: "https://i.ibb.co/m4KLb5s/449069581-2788931591406117-7411641767562991887-n-jpg-stp-dst-jpg-p480x480-nc-cat-105-ccb-1-7-nc-sid.jpg"
 }, 
{ nama: "Futaro Uesugi", 
  id: "006S", 
  bint: "★★★☆☆", 
  harga: 28, 
  dropRate: 30, 
  card: "https://i.ibb.co/Np3NFrs/448743938-1127057211708475-5918049231465803922-n-jpg-stp-dst-jpg-p480x480-nc-cat-101-ccb-1-7-nc-sid.jpg"
 }, 
{ nama: "Futaro Uesugi",
  id: "006", 
  bint: "★★★★☆", 
  harga: 39,
  dropRate: 10,
  card: "https://i.ibb.co/hcPfp6s/449065999-1571273223796758-2629105373048993608-n-jpg-stp-dst-jpg-p480x480-nc-cat-111-ccb-1-7-nc-sid.jpg"
 }, 
 { nama: "Isanari Uesugi", 
   id: "007", 
   bint: "★☆☆☆☆", 
   harga: 8,
   dropRate: 92,
   card: "https://i.ibb.co/56CRLGM/449665218-781651480815417-2219517206234133187-n-jpg-stp-dst-jpg-p480x480-nc-cat-103-ccb-1-7-nc-sid-9.jpg"
 }, 
 { nama: "Maruo Nakano", 
   id: "008", 
   bint: "★☆☆☆☆", 
   harga: 8,
   dropRate: 92,
   card: "https://i.ibb.co/k55w1Rr/449373306-443921488486793-7049040950567592491-n-jpg-stp-dst-jpg-p480x480-nc-cat-102-ccb-1-7-nc-sid-9.jpg"
 },
 { nama: "Rena Nakano", 
   id: "004", 
   harga: 8,
   bint: "★☆☆☆☆", 
   dropRate: 92,
   card: "https://i.ibb.co/TPF9j8t/449897328-1149321129625159-7857888112644171965-n-jpg-stp-dst-jpg-p480x480-nc-cat-110-ccb-1-7-nc-sid.jpg"
 }, 
 { nama: "Rena Takebayashi", 
   id: "010", 
   harga: 8,
   bint: "★☆☆☆☆", 
   dropRate: 92,
   card: "https://i.ibb.co/ZM0Nwky/448824153-495599209831184-6780156867330631902-n-jpg-stp-dst-jpg-p480x480-nc-cat-102-ccb-1-7-nc-sid-9.jpg"
 },
 { nama: "Raiha Uesugi",
   id: "011",
   harga: 28,
   bint: "★★★☆☆", 
   dropRate: 30,
   card: "https://i.ibb.co/mCbSrgD/449405341-442416892092652-4871011596860288098-n-jpg-stp-dst-jpg-p480x480-nc-cat-106-ccb-1-7-nc-sid-9.jpg"
 }, 
 { nama: "Nino Nakano", 
   id: "012", 
   harga: 28,
   bint: "★★★☆☆", 
   dropRate: 30,
   card: "https://i.ibb.co/M1zwc7b/449061521-1643840643048259-1754139708189949353-n-jpg-stp-dst-jpg-p480x480-nc-cat-104-ccb-1-7-nc-sid.jpg"
 },
 { nama: "Itsuki Nakano",
   id: "013S",
   harga: 9,
   dropRate: 92,
   bint: "★☆☆☆☆", 
   card: "https://i.ibb.co/drXbqwJ/449125796-857739776208940-3013743905552199083-n-jpg-stp-dst-jpg-p480x480-nc-cat-107-ccb-1-7-nc-sid-9.jpg"
 }
];
const nblDataPath = path.join('./ts.json');
let nblData = {};
 try {
const fileData = fs.readFileSync(nblDataPath, 'utf8');
 if (fileData.trim().length > 0) {
  nblData = JSON.parse(fileData);
}
} catch (error) {
  console.log(); 
}
 if (!nblData[userID]) {
   nblData[userID] = [];
}
const cmd = args[0];
if (cmd === 'sellc') {
const cardIDs = args.slice(1);
const soldItems = [];
const notFoundItems = [];
     for (const cardID of cardIDs) {
const itemIndex = nblData[userID].findIndex(item => item.id === cardID);
  if (itemIndex !== -1) { 
const soldItem = nblData[userID].splice(itemIndex, 1)[0];
const sellPrice = soldItem.harga;
const userMoney = await usersData.get(event.senderID, "money");
  await usersData.set(event.senderID, { money: userMoney + sellPrice });
soldItems.push({ nama: soldItem.nama, harga: sellPrice });
} else {
 notFoundItems.push(cardID);
 }
}
if (soldItems.length > 0) {
const soldMessage = soldItems.map(
            item => `𝖪𝖺𝗆𝗎 𝗍𝖾𝗅𝖺𝗁 𝗆𝖾𝗇𝗃𝗎𝖺𝗅 ${item.nama} 𝗌𝖾𝗁𝖺𝗋𝗀𝖺 ${item.harga} 𝗒𝖾𝗇`
        ).join("\n");
message.reply(soldMessage);
            }
if (notFoundItems.length > 0) {
const notFoundMessage = `𝖪𝖺𝗋𝗍𝗎 𝖽𝖾𝗇𝗀𝖺𝗇 𝗂𝖽 ${notFoundItems.join(', ')} 𝗍𝗂𝖽𝖺𝗄 𝖽𝗂𝗍𝖾𝗆𝗎𝗄𝖺𝗇 𝖽𝖺𝗅𝖺𝗆 𝗂𝗇𝗏𝖾𝗇𝗍𝖺𝗋𝗂𝗌 𝗄𝖺𝗆𝗎`;
message.reply(notFoundMessage);
            }
try {
fs.writeFileSync(nblDataPath, JSON.stringify(nblData), 'utf8');
} catch (error) {
  console.log();
 }
}
if (cmd === 'pull') {
const beli = await usersData.get(event.senderID, "money");
const belicard = 12; 
 if (beli < belicard) return message.reply('𝗄𝖺𝗆𝗎 𝗆𝖾𝗆𝖻𝗎𝗍𝗎𝗁𝗄𝖺𝗇 𝟣𝟤 𝗒𝖾𝗇 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝖺𝗋𝗂𝗄 𝗉𝗎𝗅𝗅 𝗄𝖺𝗋𝗍𝗎');
await usersData.set(event.senderID, {
money: beli - belicard
});
const { nama, id, bint, card, harga } = weightedRandom(kartu);
const gambar = await global.utils.getStreamFromURL(card);
const simpanData = { nama: nama, id: id, card: card, bint: bint, harga: harga };     
nblData[userID].push(simpanData);
 try {
await fs.writeFileSync(nblDataPath, JSON.stringify(nblData), 'utf8');
} catch (error) {
 console.log();
}
return message.reply({ attachment: gambar });

} else if (cmd === 'inv') {
const cardPerPage = 8;
const page = parseInt(args[1], 10) || 1;
    const startIndex = (page - 1) * cardPerPage;
    const endIndex = startIndex + cardPerPage;
    const cards = nblData[userID];
    if (startIndex >= cards.length) {
    message.reply(`𝖧𝖺𝗅𝖺𝗆𝖺𝗇 ${page} 𝗍𝗂𝖽𝖺𝗄 𝖽𝗂𝗍𝖾𝗆𝗎𝗄𝖺𝗇`);
    } else {
    const cardList = cards.slice(startIndex, endIndex);
    const cardInfo = cardList.map(
    item => `#${item.id}: ${item.nama} [${item.bint}] - ${item.harga} 𝗒𝖾𝗇`
        ).join('\n');
    const totalPages = Math.ceil(cards.length / cardPerPage);
    let hadi = `[ ${cards.length} ] 𝖧𝖺𝗅𝖺𝗆𝖺𝗇 ${page}/${totalPages}`;

      hadi += `\n\n${cardInfo}`
  message.reply(hadi);
    }

} else if (cmd === 'help') {
    return message.reply("𝖧𝖺𝗋𝗀𝖺 𝗌𝖺𝗍𝗎 𝗉𝗎𝗅𝗅 𝗄𝖺𝗋𝗍𝗎 𝖺𝖽𝖺𝗅𝖺𝗁 𝟣𝟤 𝗒𝖾𝗇!");

} else if (cmd === 'show') {
     try { 
const LupaID = args[1];
if (!LupaID) {
return message.reply("𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝗄𝖺𝗋𝗍𝗎 𝗒𝖺𝗇𝗀 𝗂𝗇𝗀𝗂𝗇 𝖽𝗂 𝗌𝗁𝗈𝗐!")
}
const cardID = args[1];
const cardData = nblData[userID].find(item => item.id === cardID)
   if (cardData !== -1) {
return message.reply({
 attachment: await global.utils.getStreamFromURL(cardData.card) });
     return;
    } 
} catch (error) {
 message.reply("𝖪𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗉𝗎𝗇𝗒𝖺 𝗄𝖺𝗋𝗍𝗎 𝗂𝗍𝗎!");
}
} else if (cmd === 'sell') {
const noID = args[1];
if (!noID) {
return message.reply("𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗂𝖽 𝗄𝖺𝗋𝗍𝗎 𝗒𝖺𝗇𝗀 𝗂𝗇𝗀𝗂𝗇 𝖽𝗂𝗃𝗎𝖺𝗅!")
}
const barang = args[1];
const cardnya = nblData[userID].findIndex(item => item.id === barang);
 if (cardnya !== -1) {
const item = nblData[userID].splice(cardnya, 1)[0];
const target = await usersData.get(userID, "money");
const hargaItem = item.harga;
const exp = await usersData.get(event.senderID, "exp");
await usersData.set(event.senderID, {
money: target + hargaItem, exp: exp + 1 });
 const name = await usersData.getName(userID);
message.reply({ body: `${name} 𝗆𝖾𝗇𝗃𝗎𝖺𝗅 ${item.id} 𝗌𝖾𝗁𝖺𝗋𝗀𝖺 ${hargaItem} 𝗒𝖾𝗇`,
mentions: [{
tag: name,
id: userID,
}]
});
 try {
await fs.writeFileSync(nblDataPath, JSON.stringify(nblData), 'utf8');
} catch (error) {
 message.reply("𝖳𝖾𝗋𝗃𝖺𝖽𝗂 𝗄𝖾𝗌𝖺𝗅𝖺𝗁𝖺𝗇 𝗌𝖺𝖺𝗍 𝗆𝖾𝗇𝗒𝗂𝗆𝗉𝖺𝗇 𝖽𝖺𝗍𝖺!");
 return;
}
} else {
 message.reply("𝖪𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗆𝖾𝗆𝗂𝗅𝗂𝗄𝗂 𝗄𝖺𝗋𝗍𝗎 𝗂𝗍𝗎!");
      }
    }
  }
};

function weightedRandom(arr) {
  let totalWeight = 0;
  for (const { dropRate } of arr) {
    totalWeight += dropRate;
  }

  const randomValue = Math.random() * totalWeight;
  let currentWeight = 0;
  for (const { id, nama, bint, card, harga, dropRate } of arr) {
    currentWeight += dropRate;
    if (randomValue < currentWeight) {
      return { nama, id, bint, card, harga };
    }
  }
};