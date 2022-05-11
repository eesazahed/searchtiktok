const TikTokScraper = require("tiktok-scraper");

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 1234;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.urlencoded());
app.use(express.json());

app.get("/", async (req, res) => {
  res.render(path.join(__dirname, "/index.html"));
});

app.post("/", async (req, res) => {
  const { request } = req.body;

  const posts = await TikTokScraper.hashtag(request, {
    number: 20,
  });

  const videos = [];
  const links = [];

  posts.collector.forEach((post) => {
    videos.push(post.videoUrl);
    links.push(post.webVideoUrl);
  });

  res.render(path.join(__dirname, "/videos.html"), {
    request: request,
    videos: videos,
    links: links,
  });
});

app.listen(port, (req, res) =>
  console.log(`Running on http://localhost:${port}`)
);
