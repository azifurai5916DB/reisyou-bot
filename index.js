const express = require("express");
const line = require("@line/bot-sdk");

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const replies = [
  "うおw😅",
  "どわー笑😅",
  "ったく…w😅",
  "かっこよw😅",
  "えぐー！笑😅",
  "冗談ですやん！！w🫲😅",
  "きちーww😅🤚",
  "おもろいなあ！ww😅👍",
  "ど、どした？笑😅",
  "ちょw1回落ち着けw落ち着けw😅",
  "ええてw😅🤚",
  "ちょwお前必死やんww😅",
  "すごいなあキミww😅👍",
  "ちょw怒んなやw😅"
];

let cooldownUntil = 0;

app.post(
  "/webhook",
  line.middleware(config),
  async (req, res) => {
    const event = req.body.events[0];

    if (!event) {
      return res.sendStatus(200);
    }

    // テキスト以外は無視
    if (
      event.type !== "message" ||
      event.message.type !== "text"
    ) {
      return res.sendStatus(200);
    }

    // 20秒クールタイム
    if (Date.now() < cooldownUntil) {
      return res.sendStatus(200);
    }

    // 30%で反応
    if (Math.random() > 0.3) {
      return res.sendStatus(200);
    }

    cooldownUntil = Date.now() + 20000;

    const reply =
      replies[Math.floor(Math.random() * replies.length)];

    await client.replyMessage(event.replyToken, {
      type: "text",
      text: reply,
    });

    res.sendStatus(200);
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log("冷笑BOT起動😅");
});