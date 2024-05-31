const axios = require("axios");
const moment = require("moment-timezone");
const Canvas = require("canvas");
const fs = require("fs-extra");

Canvas.registerFont(
	__dirname + "/assets/font/BeVietnamPro-SemiBold.ttf", {
	family: "BeVietnamPro-SemiBold"
});
Canvas.registerFont(
	__dirname + "/assets/font/BeVietnamPro-Regular.ttf", {
	family: "BeVietnamPro-Regular"
});

function convertFtoC(F) {
	return Math.floor((F - 32) / 1.8);
}
function formatHours(hours) {
	return moment(hours).tz("Asia/Jakarta").format("HH[h]mm[p]");
}

module.exports = {
	config: {
		name: "weather",
		version: "1.0",
		author: "NTKhang",
		countDown: 10,
		role: 0,
		shortDescription: "𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗌𝗂 𝖼𝗎𝖺𝖼𝖺 𝖽𝗂 𝖽𝖺𝖾𝗋𝖺𝗁 mu", 
		category: "MEDIA",
		guide: { id: "{pn} <𝗅𝗈𝗄𝖺𝗌𝗂>" },
		envGlobal: {
			weatherApiKey: "d7e795ae6a0d44aaa8abb1a0a7ac19e4"
		}
	},

	langs: {
		id: {
			syntaxError: "𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗅𝗈𝗄𝖺𝗌𝗂 𝗆𝗎",
			notFound: "𝖫𝗈𝗄𝖺𝗌𝗂 𝗍𝗂𝖽𝖺𝗄 𝖺𝖽𝖺: %1",
			error: "𝖳𝖾𝗋𝗃𝖺𝖽𝗂 𝗄𝖾𝗌𝖺𝗅𝖺𝗁𝖺𝗇: %1",
			today: "✨ 𝗖𝘂𝗮𝗰𝗮\n%1\n- 𝖱𝖾𝗇𝖽𝖺𝗁 - 𝗍𝗂𝗇𝗀𝗀𝗂 𝗌𝗎𝗁𝗎 %2°𝖢 - %3°𝖢\n- 𝖳𝖾𝗋𝖺𝗌𝖺 𝗌𝖾𝗉𝖾𝗋𝗍𝗂 %4°𝖢 - %5°𝖢\n- Terbit %6\n- Terbenam %7\n- 𝖡𝗎𝗅𝖺𝗇 𝗍𝖾𝗋𝖻𝗂𝗍 %8\n- 𝖡𝗎𝗅𝖺𝗇 𝗍𝖾𝗋𝖻𝖾𝗇𝖺𝗆 %9\n- 𝖲𝗂𝖺𝗇𝗀: %10\n- 𝖬𝖺𝗅𝖺𝗆: %11"
		}
	},

	onStart: async function ({ args, message, envGlobal, getLang }) {
		const apikey = envGlobal.weatherApiKey;

		const area = args.join(" ");
		if (!area)
			return message.reply(getLang("syntaxError"));
		let areaKey, dataWeather;

		try {
			const response = (await axios.get(`https://api.accuweather.com/locations/v1/cities/search.json?q=${encodeURIComponent(area)}&apikey=${apikey}&language=vi-vn`)).data;
			if (response.length == 0)
				return message.reply(getLang("notFound", area));
			const data = response[0];
			areaKey = data.Key;
		}
		catch (err) {
			return message.reply(getLang("error", err.response.data.Message));
		}

		try {
			dataWeather = (await axios.get(`http://api.accuweather.com/forecasts/v1/daily/10day/${areaKey}?apikey=${apikey}&details=true&language=vi`)).data;
		}
		catch (err) {
			return message.reply(`❌ Đã xảy ra lỗi: ${err.response.data.Message}`);
		}

		const dataWeatherDaily = dataWeather.DailyForecasts;
		const dataWeatherToday = dataWeatherDaily[0];
		const msg = getLang("today", dataWeather.Headline.Text, convertFtoC(dataWeatherToday.Temperature.Minimum.Value), convertFtoC(dataWeatherToday.Temperature.Maximum.Value), convertFtoC(dataWeatherToday.RealFeelTemperature.Minimum.Value), convertFtoC(dataWeatherToday.RealFeelTemperature.Maximum.Value), formatHours(dataWeatherToday.Sun.Rise), formatHours(dataWeatherToday.Sun.Set), formatHours(dataWeatherToday.Moon.Rise), formatHours(dataWeatherToday.Moon.Set), dataWeatherToday.Day.LongPhrase, dataWeatherToday.Night.LongPhrase);

		const bg = await Canvas.loadImage(__dirname + "/assets/image/bgWeather.jpg");
		const { width, height } = bg;
		const canvas = Canvas.createCanvas(width, height);
		const ctx = canvas.getContext("2d");
		ctx.drawImage(bg, 0, 0, width, height);
		let X = 100;
		ctx.fillStyle = "#ffffff";
		const data = dataWeather.DailyForecasts.slice(0, 7);
		for (const item of data) {
			const icon = await Canvas.loadImage("http://vortex.accuweather.com/adc2010/images/slate/icons/" + item.Day.Icon + ".svg");
			ctx.drawImage(icon, X, 210, 80, 80);

			ctx.font = "30px BeVietnamPro-SemiBold";
			const maxC = `${convertFtoC(item.Temperature.Maximum.Value)}°C `;
			ctx.fillText(maxC, X, 366);

			ctx.font = "30px BeVietnamPro-Regular";
			const minC = String(`${convertFtoC(item.Temperature.Minimum.Value)}°C`);
			const day = moment(item.Date).format("DD");
			ctx.fillText(minC, X, 445);
			ctx.fillText(day, X + 20, 140);

			X += 135;
		}

		const pathSaveImg = `${__dirname}/tmp/weather_${areaKey}.jpg`;
		fs.writeFileSync(pathSaveImg, canvas.toBuffer());

		return message.reply({
			body: msg,
			attachment: fs.createReadStream(pathSaveImg)
		}, () => fs.unlinkSync(pathSaveImg));

	}
};