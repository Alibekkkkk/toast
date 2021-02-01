const { Telegraf } = require("telegraf");

// const token = process.env.TOKEN;
const stickerID =
  "CAACAgIAAxkBAANjYBcLo4rUJoqtneGRxTLeZCFPiYMAAoUfAALgo4IHNJ8YRoQ-h34eBA";
const token = "СЮДА ВПИШЕШЬ СВОЙ ТОКЕН ДЛЯ ТЕЛЕГРАМ БОТА";
// ЭТИ ПЕРЕМЕННЫЕ НУЖНЫ ДЛЯ ХЕРОКУ, РАСКОММЕНТЬ ЕСЛИ ЗАЛИВАЕШЬ ТУДА,
// И НЕ ЗАБУДЬ РАСКОММЕНТИТЬ В САМОМ НИЗУ
// const appname = "СЮДА ВПИШЕШЬ ИМЯ ПРИЛОЖЕНИЯ НА ХЕРОКУ, ЕСЛИ ЗАЛЬЕШЬ ТУДА";
// const url = "https://" + appname + ".herokuapp.com";
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
      ", welcome to NU Anime Community/Nasshu anime no kuni e yōkoso 🤗";
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
  // webhook: { domain: url, port: process.env.PORT },
});
console.log("Started server on " + url);
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
