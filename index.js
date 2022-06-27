const { Telegraf } = require("telegraf");

// const token = process.env.TOKEN;
const stickerIDs = [
  "CAACAgIAAxkBAAO1YZf7cPn1DpOWHjXL9URAMvcNyWwAAuwAAwHsZhqsILu_rhZvrSIE",
  "CAACAgQAAxkBAAO2YZf-PaDZ4emusFTW6mpG484yDHoAAl4LAAInUZFTynUCi_dCw8AiBA",
  "CAACAgIAAxkBAAO3YZf_e93cWxg3hzm5aktQpR5Yj2kAAtMKAAL-HLBI2WuJA9NjmNEiBA",
  "CAACAgEAAxkBAAO4YZf_gsPNlW9bYISjN0VFm7zPj-AAAn0HAAKRKQABEAKAUXZmH4d4IgQ",
  "CAACAgIAAxkBAAO5YZf_jKlwzA0TH3MrMHEViwwjZc4AAt4AA3NnkAvV8WHfdkG1MSIE",
  "CAACAgIAAxkBAAPeYZgQ3ygb1x31VO6HktWqhgg5FeIAAhYLAALJm6BKrv353cj6JyYiBA"
  "CAACAgIAAxkBAAIBI2K5hbVVF8NE2YZSI4heKIuaKXgRAAIHEwACI-tgSUbJU8ti3DchKQQ"
  "CAACAgQAAxkBAAIBJGK5hb_A861ZrNVbsOqMOIoPLA0cAAK2AwACqZEXEzZggnUhTCAEKQQ"
  "CAACAgUAAxkBAAIBJWK5hcqOSguykPfYyiqCJNwY6M8SAAJpAgAC7j1pVbi1UKQgf-N5KQQ"
  "CAACAgQAAxkBAAIBJmK5hdZpHhQawA69s6YspB3YBEotAAJ5AgAC5GWVB6EYMt6PcHw7KQQ"
  "CAACAgUAAxkBAAIBJ2K5hgVCZfO5l7Pe06bPhaJKBLq3AALrBgACLXlhV_IiLMkpqv4dKQQ",
  ];
const token = "1426367634:AAGVjtpE4O2YXnlx7XGa4aVsMY6__A1zJA0";
const appname = "remgram";
const url = "https://remgram.herokuapp.com";
const bot = new Telegraf(token);

bot.on("new_chat_members", (ctx) => {
  console.log(ctx.update.message.new_chat_members);
  ctx.update.message.new_chat_members.forEach((user) => {
    var fisrtLastName =
      "[" +
      user.first_name +
      " " +
      (user?.last_name ?? "") +
      "](tg://user?id=" +
      user.id +
      ")";
	// console.log(randomStickerID);
    var text =
      "@" +
      (user?.username ?? fisrtLastName) + 
      ", Welcome to NU Anime Community/Nasshu Anime no Kuni e Yōkoso 🤗";
    console.log(text);
    ctx.reply(text, {
      reply_to_message_id: ctx.message.message_id,
    });
	var randomStickerID = stickerIDs[Math.floor(Math.random() * stickerIDs.length)];
    ctx.replyWithSticker(randomStickerID);
  });
});

// ЭТА СТРОЧКА НУЖНА ЧТОБЫ В ЛОГАХ ПОЯВЛЯЛСЯ СТИКЕР АЙДИ, ЕСЛИ НЕ НУЖНО МОЖЕШЬ УБРАТЬ
bot.on("sticker", (ctx) => console.log(ctx.message.sticker));

bot.launch({
  // ЭТА СТРОЧКА НУЖНА ТОЛЬКО ЕСЛИ ЗАЛИВАЕШЬ НА ХЕРОКУ, ИНАЧЕ МОЖЕШЬ НЕ РАСКОММЕНТИРОВАТЬ
webhook: { domain: url, port: process.env.PORT },
});
console.log("Started server on " + url);
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
