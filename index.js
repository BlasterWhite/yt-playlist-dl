const fs = require("fs");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");

/**
 * Get a list of videos from a playlist
 * @param id {String}
 * @returns {Promise<*[]>}
 */
async function getVideosFromPlaylist(id) {
  let videos = [];
  const playlist = await ytpl(id);

  playlist.items.forEach((item) => {
    videos.push({
      title: item.title,
      url: item.shortUrl,
      details: item,
    });
  });

  return videos;
}

/**
 * Download a video
 * @param video {object}
 * @param savePath {String}
 */
async function downloadVideo(video, savePath) {
  const videoInfo = await ytdl.getInfo(video.url);

  console.log(`🚀 Downloading ${video.title}...`);

  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath);
  }

  let videoStream = ytdl(video.url, { quality: "highestaudio" }).pipe(
    fs.createWriteStream(
      `${__dirname}/${savePath}/${sanitizePath(video.title)}.mp3`,
    ),
  );

  videoStream.on("finish", () => {
    console.log(`✅ ${video.title} downloaded successfully`);
  });
}

/**
 * Download all videos from a playlist
 * @param playlistUrl {String}
 * @param savePath {String}
 */
async function downloadPlaylist(playlistUrl, savePath) {
  const videos = await getVideosFromPlaylist(playlistUrl);

  videos.forEach((video) => {
    downloadVideo(video, savePath);
  });
}

/**
 * Get playlist id from url
 * @param url
 * @returns {null | string}
 */
function getIdPlaylist(url) {
  let res = null;
  let optString = url.split("?");
  let opt = optString[1].split("&");
  opt.forEach((element) => {
    if (element.startsWith("list=")) {
      res = element.split("=")[1];
    }
  });
  return res;
}

function sanitizePath(path) {
  return path.replaceAll(/[\\/:*?"<>|]/g, "");
}

if (process.argv.length <= 3) {
  console.log("💥 use node index.js <playlistUrl> <savePath>");
  process.exit(1);
}

const playlistId = getIdPlaylist(process.argv[2]);
const savePath = process.argv[3];

if (!playlistId) {
  console.log("💥 Invalid playlist url");
  process.exit(1);
}

(async () => {
  await downloadPlaylist(playlistId, savePath);
})();
