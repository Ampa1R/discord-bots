import { getImageUrl } from './helpers';
const Discord = require("discord.js");
const config = require('../config.json');

const client = new Discord.Client();

client.login(config.bot_token);

const prefix = config.prefix;

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

  client.channels.resolve(config.channel_ID).send('', attachment);
}
