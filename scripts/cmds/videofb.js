const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
        config: {
                name: "videofb",
                version: "1.2",
                author: "NTKhang",
                countDown: 10,
                role: 0,
                description: "𝗎𝗇𝖽𝗎𝗁 𝗏𝗂𝖽𝗂𝗈 𝖿𝖺𝖼𝖾𝖻𝗈𝗄", 
                category: "MEDIA",
                guide: { id: "{pn} <𝗍𝖺𝗎𝗍𝖺𝗇>" }
},

        langs: {
         id: {
                        missingUrl: "𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗍𝖺𝗎𝗍𝖺𝗇 𝗏𝗂𝖽𝗂𝗈 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄",
                        error: "𝖳𝖾𝗋𝗃𝖺𝖽𝗂 𝗄𝖾𝗌𝖺𝗅𝖺𝗁𝖺𝗇 𝗌𝖺𝖺𝗍 𝗆𝖾𝗇𝗀𝗎𝗇𝖽𝗎𝗁 𝗏𝗂𝖽𝗂𝗈",
                        downloading: "✨ 𝖡𝖾𝗋𝗁𝖺𝗌𝗂𝗅!",
                        tooLarge: "𝖬𝖺𝖺𝖿, 𝗃𝗎𝗆𝗅𝖺𝗁 𝗆𝖺𝗄𝗌𝗂𝗆𝖺𝗅 𝗏𝗂𝖽𝗂𝗈 𝖺𝖽𝖺𝗅𝖺𝗁 𝟪𝟦 𝗆𝖻"
 }
},

        onStart: async function ({ args, message, getLang }) {
                if (!args[0])
                        return message.reply(getLang("missingUrl"));
                const response = await fbDownloader(args[0]);
                if (response.success === false)
                        return message.reply(getLang("error"));

                let success = false;
                const msgSend = message.reply(getLang("downloading"));

                for (const item of response.download) {
                        const res = await axios({
                                url: item.url,
                                responseType: 'stream'
                        });
                        if (res.headers['content-length'] > 87031808)
                                continue;
                        res.data.path = global.utils.randomString(10) + '.mp4';
                        message.reply({
                                attachment: res.data
                        }, async () => message.unsend((await msgSend).messageID));
                        success = true;
                        break;
                }

                if (!success) {
                        message.unsend((await msgSend).messageID);
                        return message.reply(getLang("tooLarge"));
                }
        }
};


async function fbDownloader(url) {
        try {
                const response1 = await axios({
                        method: 'POST',
                        url: 'https://snapsave.app/action.php?lang=vn',
                        headers: {
                                "accept": "*/*",
                                "accept-language": "vi,en-US;q=0.9,en;q=0.8",
                                "content-type": "multipart/form-data",
                                "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": "\"Windows\"",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "Referer": "https://snapsave.app/vn",
                                "Referrer-Policy": "strict-origin-when-cross-origin"
                        },
                        data: {
                                url
                        }
                });

                let html;
                const evalCode = response1.data.replace('return decodeURIComponent', 'html = decodeURIComponent');
                eval(evalCode);
                html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"');

                const $ = cheerio.load(html);
                const download = [];

                const tbody = $('table').find('tbody');
                const trs = tbody.find('tr');

                trs.each(function (i, elem) {
                        const trElement = $(elem);
                        const tds = trElement.children();
                        const quality = $(tds[0]).text().trim();
                        const url = $(tds[2]).children('a').attr('href');
                        if (url != undefined) {
                                download.push({
                                        quality,
                                        url
                                });
                        }
                });

                return {
                        success: true,
                        video_length: $("div.clearfix > p").text().trim(),
                        download
                };
        }
        catch (err) {
                return {
                        success: false
                };
        }
}