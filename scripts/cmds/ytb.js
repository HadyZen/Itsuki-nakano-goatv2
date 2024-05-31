const axios = require("axios");
const ytdl = require("@distube/ytdl-core");
const fs = require("fs-extra");
const { getStreamFromURL, downloadFile, formatNumber } = global.utils;
async function getStreamAndSize(url, path = "") {
	const response = await axios({
		method: "GET",
		url,
		responseType: "stream",
		headers: {
			'Range': 'bytes=0-'
		}
	});
	if (path)
		response.data.path = path;
	const totalLength = response.headers["content-length"];
	return {
		stream: response.data,
		size: totalLength
	};
}

module.exports = {
config: {
 name: "ytb",
 version: "𝟣.𝟣𝟦",
 author: "NTKhang",
 countDown: 10,
 role: 0,
 description: "𝗒𝗈𝗎𝗍𝗎𝖻𝖾 𝗏𝗂𝖽𝗂𝗈, 𝗆𝗎𝗌𝗂𝗄, 𝖽𝖺𝗇 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗌𝗂",
 category: "MEDIA",
 guide: {
  id: "{pn} <𝗏𝗂𝖽𝗂𝗈/𝗏> <𝖼𝖺𝗋𝗂/𝗅𝗂𝗇𝗄>: 𝗆𝖾𝗇𝖼𝖺𝗋𝗂 𝗏𝗂𝖽𝗂𝗈 𝗒𝗈𝗎𝗍𝗎𝖻𝖾"
	+ "\n{pn} <𝗆𝗎𝗌𝗂𝗄/𝗆> <𝖼𝖺𝗋𝗂/𝗅𝗂𝗇𝗄>: 𝗆𝖾𝗇𝖼𝖺𝗋𝗂 𝗆𝗎𝗌𝗂𝗄 𝗒𝗈𝗎𝗍𝗎𝖻𝖾"
	+ "\n{pn} <𝗂𝗇𝖿𝗈/𝗂> <𝖼𝖺𝗋𝗂/𝗅𝗂𝗇𝗄>: 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗌𝗂 𝗏𝗂𝖽𝗂𝗈 𝗒𝗈𝗎𝗍𝗎𝖻𝖾"
		}
	},

langs: {
 id: {
 error: "𝖤𝗋𝗋𝗈𝗋: %1",
 noResult: "𝖳𝗂𝖽𝖺𝗄 𝖺𝖽𝖺 𝖽𝗂𝗍𝖾𝗆𝗎𝗄𝖺𝗇 %1",
 choose: "%1𝖻𝖺𝗅𝖺𝗌 𝗉𝖾𝗌𝖺𝗇 𝖽𝖾𝗇𝗀𝖺𝗇 𝗇𝗈𝗆𝗈𝗋 𝗎𝗋𝗎𝗍𝖺𝗇 𝖺𝗍𝖺𝗎 𝖻𝖺𝗍𝖺𝗅 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗆𝖻𝖺𝗍𝖺𝗅𝗄𝖺𝗇𝗇𝗒𝖺!",
 video: "𝗏𝗂𝖽𝗂𝗈",
 audio: "𝖺𝗎𝖽𝗂𝗈",
 downloading: "𝖳𝗎𝗇𝗀𝗀𝗎 𝗌𝖾𝖻𝖾𝗇𝗍𝖺𝗋...",
 downloading2: "𝖧𝖺𝗋𝖺𝗉 𝗌𝖺𝖻𝖺𝗋...",
 noVideo: "𝖩𝗎𝗆𝗅𝖺𝗁 𝗆𝖺𝗄𝗌𝗂𝗆𝗎𝗆 𝗏𝗂𝖽𝗂𝗈 𝖺𝖽𝖺𝗅𝖺𝗁 𝟪𝟥 𝗆𝖻",
 noAudio: "𝖩𝗎𝗆𝗅𝖺𝗁 𝗆𝖺𝗄𝗌𝗂𝗆𝗎𝗆 𝖺𝗎𝖽𝗂𝗈 𝖺𝖽𝖺𝗅𝖺𝗁 𝟤𝟨 𝗆𝖻",
 info: "𝖩𝗎𝖽𝗎𝗅: %1\n𝖢𝗁𝖺𝗇𝖾𝗅: %2\n𝖲𝗎𝖻𝗌𝖼𝗋𝗂𝖻𝖾𝗋: %3\n𝖣𝗎𝗋𝖺𝗌𝗂: %4\n𝖯𝖾𝗇𝗈𝗇𝗍𝗈𝗇: %5\n𝖫𝗂𝗄𝖾: %6\n𝖴𝗉𝗅𝗈𝖺𝖽: %7\n𝖨𝖣: %8\n𝖫𝗂𝗇𝗄: %9",
 listChapter: "\n𝖣𝖺𝖿𝗍𝖺𝗋 𝖼𝗁𝖺𝗉𝗍𝖾𝗋: %1\n"
		}
	},

	onStart: async function ({ args, message, event, commandName, getLang }) {
		let type;
		switch (args[0]) {
			case "vidio":
			case "v":
				type = "video";
				break;
			case "musik":
			case "m":
				type = "audio";
				break;
			case "info":
			case "i":
				type = "info";
				break;
			default:
				return message.SyntaxError();
		}

		const checkurl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
		const urlYtb = checkurl.test(args[1]);

		if (urlYtb) {
			const infoVideo = await getVideoInfo(args[1]);
			handle({ type, infoVideo, message, downloadFile, getLang });
			return;
		}

		let keyWord = args.slice(1).join(" ");
		keyWord = keyWord.includes("?feature=share") ? keyWord.replace("?feature=share", "") : keyWord;
		const maxResults = 6;

		let result;
		try {
			result = (await search(keyWord)).slice(0, maxResults);
		}
		catch (err) {
			return message.reply(getLang("error", err.message));
		}
		if (result.length == 0)
			return message.reply(getLang("noResult", keyWord));
		let msg = "";
		let i = 1;
		const thumbnails = [];
		const arrayID = [];

		for (const info of result) {
			thumbnails.push(getStreamFromURL(info.thumbnail));
			msg += `${i++}. ${info.title}\nTime: ${info.time}\nChannel: ${info.channel.name}\n\n`;
		}

		message.reply({
			body: getLang("choose", msg),
			attachment: await Promise.all(thumbnails)
		}, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				author: event.senderID,
				arrayID,
				result,
				type
			});
		});
	},

	onReply: async ({ event, api, Reply, message, getLang }) => {
		const { result, type } = Reply;
		const choice = event.body;
		if (!isNaN(choice) && choice <= 6) {
			const infoChoice = result[choice - 1];
			const idvideo = infoChoice.id;
			const infoVideo = await getVideoInfo(idvideo);
			api.unsendMessage(Reply.messageID);
			await handle({ type, infoVideo, message, getLang });
		}
		else
			api.unsendMessage(Reply.messageID);
	}
};

async function handle({ type, infoVideo, message, getLang }) {
	const { title, videoId } = infoVideo;

	if (type == "video") {
		const MAX_SIZE = 83 * 1024 * 1024; // 83MB (max size of video that can be sent on fb)
		const msgSend = message.reply(getLang("downloading", getLang("video"), title));
		const { formats } = await ytdl.getInfo(videoId);
		const getFormat = formats
			.filter(f => f.hasVideo && f.hasAudio)
			.sort((a, b) => b.contentLength - a.contentLength)
			.find(f => f.contentLength || 0 < MAX_SIZE);
		if (!getFormat)
			return message.reply(getLang("noVideo"));
		const getStream = await getStreamAndSize(getFormat.url, `${videoId}.mp4`);
		if (getStream.size > MAX_SIZE)
			return message.reply(getLang("noVideo"));

		const savePath = __dirname + `/tmp/${videoId}_${Date.now()}.mp4`;
		const writeStrean = fs.createWriteStream(savePath);
		const startTime = Date.now();
		getStream.stream.pipe(writeStrean);
		const contentLength = getStream.size;
		let downloaded = 0;
		let count = 0;

		getStream.stream.on("data", (chunk) => {
			downloaded += chunk.length;
			count++;
			if (count == 5) {
				const endTime = Date.now();
				const speed = downloaded / (endTime - startTime) * 1000;
				const timeLeft = (contentLength / downloaded * (endTime - startTime)) / 1000;
				const percent = downloaded / contentLength * 100;
				if (timeLeft > 30) // if time left > 30s, send message
					message.reply(getLang("downloading2", getLang("video"), title, Math.floor(speed / 1000) / 1000, Math.floor(downloaded / 1000) / 1000, Math.floor(contentLength / 1000) / 1000, Math.floor(percent), timeLeft.toFixed(2)));
			}
		});
		writeStrean.on("finish", () => {
			message.reply({
				body: title,
				attachment: fs.createReadStream(savePath)
			}, async (err) => {
				if (err)
					return message.reply(getLang("error", err.message));
				fs.unlinkSync(savePath);
				message.unsend((await msgSend).messageID);
			});
		});
	}
	else if (type == "audio") {
		const MAX_SIZE = 27262976; // 26MB (max size of audio that can be sent on fb)
		const msgSend = message.reply(getLang("downloading", getLang("audio"), title));
		const { formats } = await ytdl.getInfo(videoId);
		const getFormat = formats
			.filter(f => f.hasAudio && !f.hasVideo)
			.sort((a, b) => b.contentLength - a.contentLength)
			.find(f => f.contentLength || 0 < MAX_SIZE);
		if (!getFormat)
			return message.reply(getLang("noAudio"));
		const getStream = await getStreamAndSize(getFormat.url, `${videoId}.mp3`);
		if (getStream.size > MAX_SIZE)
			return message.reply(getLang("noAudio"));

		const savePath = __dirname + `/tmp/${videoId}_${Date.now()}.mp3`;
		const writeStrean = fs.createWriteStream(savePath);
		const startTime = Date.now();
		getStream.stream.pipe(writeStrean);
		const contentLength = getStream.size;
		let downloaded = 0;
		let count = 0;

		getStream.stream.on("data", (chunk) => {
			downloaded += chunk.length;
			count++;
			if (count == 5) {
				const endTime = Date.now();
				const speed = downloaded / (endTime - startTime) * 1000;
				const timeLeft = (contentLength / downloaded * (endTime - startTime)) / 1000;
				const percent = downloaded / contentLength * 100;
				if (timeLeft > 30) // if time left > 30s, send message
					message.reply(getLang("downloading2", getLang("audio"), title, Math.floor(speed / 1000) / 1000, Math.floor(downloaded / 1000) / 1000, Math.floor(contentLength / 1000) / 1000, Math.floor(percent), timeLeft.toFixed(2)));
			}
		});

		writeStrean.on("finish", () => {
			message.reply({
				body: title,
				attachment: fs.createReadStream(savePath)
			}, async (err) => {
				if (err)
					return message.reply(getLang("error", err.message));
				fs.unlinkSync(savePath);
				message.unsend((await msgSend).messageID);
			});
		});
	}
	else if (type == "info") {
		const { title, lengthSeconds, viewCount, videoId, uploadDate, likes, channel, chapters } = infoVideo;

		const hours = Math.floor(lengthSeconds / 3600);
		const minutes = Math.floor(lengthSeconds % 3600 / 60);
		const seconds = Math.floor(lengthSeconds % 3600 % 60);
		const time = `${hours ? hours + ":" : ""}${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
		let msg = getLang("info", title, channel.name, formatNumber(channel.subscriberCount || 0), time, formatNumber(viewCount), formatNumber(likes), uploadDate, videoId, `https://youtu.be/${videoId}`);
		// if (chapters.length > 0) {
		// 	msg += getLang("listChapter")
		// 		+ chapters.reduce((acc, cur) => {
		// 			const time = convertTime(cur.start_time * 1000, ':', ':', ':').slice(0, -1);
		// 			return acc + ` ${time} => ${cur.title}\n`;
		// 		}, '');
		// }

		message.reply({
			body: msg,
			attachment: await Promise.all([
				getStreamFromURL(infoVideo.thumbnails[infoVideo.thumbnails.length - 1].url),
				getStreamFromURL(infoVideo.channel.thumbnails[infoVideo.channel.thumbnails.length - 1].url)
			])
		});
	}
}

async function search(keyWord) {
	try {
		const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyWord)}`;
		const res = await axios.get(url);
		const getJson = JSON.parse(res.data.split("ytInitialData = ")[1].split(";</script>")[0]);
		const videos = getJson.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
		const results = [];
		for (const video of videos)
			if (video.videoRenderer?.lengthText?.simpleText) // check is video, not playlist or channel or live
				results.push({
					id: video.videoRenderer.videoId,
					title: video.videoRenderer.title.runs[0].text,
					thumbnail: video.videoRenderer.thumbnail.thumbnails.pop().url,
					time: video.videoRenderer.lengthText.simpleText,
					channel: {
						id: video.videoRenderer.ownerText.runs[0].navigationEndpoint.browseEndpoint.browseId,
						name: video.videoRenderer.ownerText.runs[0].text,
						thumbnail: video.videoRenderer.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails.pop().url.replace(/s[0-9]+\-c/g, '-c')
					}
				});
		return results;
	}
	catch (e) {
		const error = new Error("Cannot search video");
		error.code = "SEARCH_VIDEO_ERROR";
		throw error;
	}
}

async function getVideoInfo(id) {
	// get id from url if url
	id = id.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/)/);
	id = id[2] !== undefined ? id[2].split(/[^0-9a-z_\-]/i)[0] : id[0];

	const { data: html } = await axios.get(`https://youtu.be/${id}?hl=en`, {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36'
		}
	});
	const json = JSON.parse(html.match(/var ytInitialPlayerResponse = (.*?});/)[1]);
	const json2 = JSON.parse(html.match(/var ytInitialData = (.*?});/)[1]);
	const { title, lengthSeconds, viewCount, videoId, thumbnail, author } = json.videoDetails;
	let getChapters;
	try {
		getChapters = json2.playerOverlays.playerOverlayRenderer.decoratedPlayerBarRenderer.decoratedPlayerBarRenderer.playerBar.multiMarkersPlayerBarRenderer.markersMap.find(x => x.key == "DESCRIPTION_CHAPTERS" && x.value.chapters).value.chapters;
	}
	catch (e) {
		getChapters = [];
	}
	const owner = json2.contents.twoColumnWatchNextResults.results.results.contents.find(x => x.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer.owner;

	const result = {
		videoId,
		title,
		video_url: `https://youtu.be/${videoId}`,
		lengthSeconds: lengthSeconds.match(/\d+/)[0],
		viewCount: viewCount.match(/\d+/)[0],
		uploadDate: json.microformat.playerMicroformatRenderer.uploadDate,
		// contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonViewModel.likeButtonViewModel.likeButtonViewModel.toggleButtonViewModel.toggleButtonViewModel.defaultButtonViewModel.buttonViewModel.accessibilityText
		likes: json2.contents.twoColumnWatchNextResults.results.results.contents.find(x => x.videoPrimaryInfoRenderer).videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons.find(x => x.segmentedLikeDislikeButtonViewModel).segmentedLikeDislikeButtonViewModel.likeButtonViewModel.likeButtonViewModel.toggleButtonViewModel.toggleButtonViewModel.defaultButtonViewModel.buttonViewModel.accessibilityText.replace(/\.|,/g, '').match(/\d+/)?.[0] || 0,
		chapters: getChapters.map((x, i) => {
			const start_time = x.chapterRenderer.timeRangeStartMillis;
			const end_time = getChapters[i + 1]?.chapterRenderer?.timeRangeStartMillis || lengthSeconds.match(/\d+/)[0] * 1000;

			return {
				title: x.chapterRenderer.title.simpleText,
				start_time_ms: start_time,
				start_time: start_time / 1000,
				end_time_ms: end_time - start_time + start_time,
				end_time: (end_time - start_time + start_time) / 1000
			};
		}),
		thumbnails: thumbnail.thumbnails,
		author: author,
		channel: {
			id: owner.videoOwnerRenderer.navigationEndpoint.browseEndpoint.browseId,
			username: owner.videoOwnerRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl,
			name: owner.videoOwnerRenderer.title.runs[0].text,
			thumbnails: owner.videoOwnerRenderer.thumbnail.thumbnails,
			subscriberCount: parseAbbreviatedNumber(owner.videoOwnerRenderer.subscriberCountText.simpleText)
		}
	};

	return result;
}

function parseAbbreviatedNumber(string) {
	const match = string
		.replace(',', '.')
		.replace(' ', '')
		.match(/([\d,.]+)([MK]?)/);
	if (match) {
		let [, num, multi] = match;
		num = parseFloat(num);
		return Math.round(multi === 'M' ? num * 1000000 :
			multi === 'K' ? num * 1000 : num);
	}
	return null;
}