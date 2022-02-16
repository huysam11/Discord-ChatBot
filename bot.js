require('dotenv').config(); //initialize dotenv
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const axios = require('axios');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message', async msg => {
  switch (msg.content){
    case "Hello":
      msg.reply("Hello There!");
      break;
  
    case "!quote":
      msg.channel.send("Here's your quote!");
      const quote = await getQuote();
      msg.channel.send(quote)
      break;
  }
});

  async function getQuote(){
  const res = await axios.get('https://zenquotes.io/api/quotes');
  console.log(res.data)
  return res.data[0].q + " By "+ res.data[0].a;
}
//make sure this line is the last line
client.login(process.env.TOKEN)