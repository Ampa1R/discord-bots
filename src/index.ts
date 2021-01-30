require('dotenv').config();
import { getImageUrl } from './helpers';
const Discord = require("discord.js");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

const prefix = process.env.BOT_PREFIX;

client.on('ready', async function() {
  console.log("I'm ready!");
  sendImg();
  setInterval(() => sendImg(), 86400000)
})

client.on("message", async function(message: any) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  message.channel.send('Я НЕ БОТ ТЫ ДОЛБАЕБ!!1')
});

const sendImg = async () => {
  const url = await getImageUrl();
  const attachment = new Discord.MessageAttachment(url);

  client.channels.resolve(process.env.CHANNEL_ID).send('', attachment);
}
