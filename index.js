const { Telegraf } = require("telegraf");

// const token = process.env.TOKEN;
const stickerID = [
  "CAACAgIAAxkBAANjYBcLo4rUJoqtneGRxTLeZCFPiYMAAoUfAALgo4IHNJ8YRoQ-h34eBA",
  "AAMCBAADGQEAAw9gF71efRgoKvk5d8tSq_fbN1Dj9AACZQADuClXA3gHwIZwlYFc-uAzGgAEAQAHbQADRwUAAh4E"
  "CAACAgQAAxkBAAMPYBe9Xn0YKCr5OXfLUqv32zdQ4_QAAmUAA7gpVwN4B8CGcJWBXB4E"
  "AAMCAgADGQEAAxBgF71fciupKbcPJgNQO8OhEtC7BwACBgADQEVJJEuoV6QZNmNP6WDzDgAEAQAHbQADSU4AAh4E"
  "CAACAgIAAxkBAAMQYBe9X3IrqSm3DyYDUDvDoRLQuwcAAgYAA0BFSSRLqFekGTZjTx4E"
  "AAMCBAADGQEAAxFgF71gc4Bva9h3E-LgIGd84_PRZQACDBkAApRgTgPXv624rQskQmwqPBsABAEAB20AA5MZAAIeBA"
  "AAMCAQADGQEAAxJgF71gk5QgDxkuBrBWCxgTZRqfBAACJAMAApl_iALdhW2cIembiQMV6C8ABAEAB20AAwEoAAIeBA"
  "CAACAgQAAxkBAAMRYBe9YHOAb2vYdxPi4CBnfOPz0WUAAgwZAAKUYE4D17-tuK0LJEIeBA"
  "CAACAgEAAxkBAAMSYBe9YJOUIA8ZLgawVgsYE2UanwQAAiQDAAKZf4gC3YVtnCHpm4keBA"
  "AAMCAQADGQEAAxNgF71owhHJicD54Z59uedTLBBJigACyRIAApl_iAJNJCZuRUi217shDDAABAEAB20AA6RPAAIeBA"
  "CAACAgEAAxkBAAMTYBe9aMIRyYnA-eGefbnnUywQSYoAAskSAAKZf4gCTSQmbkVIttceBA"
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
    var text =
      "@" +
      (user?.username ?? fisrtLastName) +
      ", Welcome to NU Anime Community/Nasshu Anime no Kuni e Yōkoso 🤗";
    console.log(text);
    ctx.reply(text, {
      reply_to_message_id: ctx.message.message_id,
    });
    ctx.replyWithSticker(stickerID);
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
