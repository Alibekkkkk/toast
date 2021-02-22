const { Telegraf } = require("telegraf");

// const token = process.env.TOKEN;
const stickerIDs = [
  "CAACAgIAAxkBAANjYBcLo4rUJoqtneGRxTLeZCFPiYMAAoUfAALgo4IHNJ8YRoQ-h34eBA",
  "CAACAgQAAxkBAANSYBfj1xoCx9GH7uEbz31021DzUtEAAmUAA7gpVwN4B8CGcJWBXB4E",
  "CAACAgQAAxkBAANTYBfj196-S5J-MlEUqOpRFSpv_XAAAgwZAAKUYE4D17-tuK0LJEIeBA",
  "CAACAgIAAxkBAANUYBfj2Pg8l6cQVwABJKnNcIvEdMBMAAIGAANARUkkS6hXpBk2Y08eBA",
  "CAACAgEAAxkBAANVYBfj2KGyouizT8zJDzfvELQNShoAAiQDAAKZf4gC3YVtnCHpm4keBA",
  "CAACAgEAAxkBAANWYBfj2fAyU2ORuGXkPSP5tMYiVQMAAskSAAKZf4gCTSQmbkVIttceBA",
  "CAACAgQAAxkBAAN1YBf5x4bdApfUyWl-MRhBC-_QVDoAAgwZAAKUYE4D17-tuK0LJEIeBA",
  "CAACAgQAAxkBAAN2YBf5yUmr3WqO3g4PslwFW7NVr1gAAmUAA7gpVwN4B8CGcJWBXB4E",
  "CAACAgQAAxkBAAN3YBf5ymLeXgo7pIC2cOvxDANHbygAAnsJAALk59oOvpvR8ZKiOqseBA",
  "CAACAgIAAxkBAAN4YBf5y9rxZ6TdXlx9nGCtUiAgM1EAAgECAAJkOCsBiMPDQmQz-4AeBA",
  "CAACAgQAAxkBAAN5YBf5zGbKWLeoSwJNqSN1dNvjX1sAAsNmAALjp10FvmEoEV5DHd8eBA",
  "CAACAgQAAxkBAAN9YBf6SOyRYihQ2OO1YW2pcR2Vx7gAAo8AA4gJQAuN_fXE73Xcgx4E",
  "CAACAgQAAxkBAAN8YBf6R7VszeobQrx_5IQlk9Cg7m4AAukGAALjp10FGUu0no0SzkkeBA",
  "CAACAgIAAxkBAAN7YBf6RrzxVLBZp916DCI8MEiG4oEAAgQBAAJzZ5AL7GqcyE5znp4eBA",
  "CAACAgIAAxkBAAN6YBf6Rdq3O1XIsQnXlXvtlCd032sAAigAA3NnkAvluj0hDFIbXx4E",
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
