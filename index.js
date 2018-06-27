const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
const DBL = require('dblapi.js');
const superagent = require("superagent");
const dbl = new DBL(`${process.env.DBLKEY}`, { webhookPort: 5000, webhookAuth: 'password' });
const http = require('http');
const express = require('express');
var app = express();



bot.on("ready", async () => {

  
  
  console.log(`INFO: ${bot.user.username} is online on ${bot.guilds.size} servers and watching ${bot.users.size} users!`);
  bot.user.setStatus('dnd')
      function randomStatus() {
        let status = [`on ${bot.guilds.size} servers | ~help`, `with ${bot.users.size.toLocaleString()} users | ~help`, 'Add Aku Ya Teman2',]
          let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], {type: 'STREAMING', url: "https://www.twitch.tv/verterid" });
    }; setInterval(randomStatus, 20000)
  });

bot.on("guildCreate", guild => {
  console.log(`INFO: New guild joined: ${guild.name} | (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  });

bot.on("guildDelete", guild => {
  console.log(`INFO: Frost has been removed from: ${guild.name} (id: ${guild.id})`);
});



app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log('Pinging');
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

dbl.webhook.on('ready', hook => {
  console.log(`INFO: Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`VOTE: User with ID ${vote.user} just voted!`);
});




//(◕ ◡ ◕) 


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("ERROR: Couldn't find commands.");
    return;
  }
fs.readdir('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
});
  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`INFO: ${f} command file was loaded successfully!`);
    bot.commands.set(props.help.name, props);
  });
});





bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") 
    message.author.send("Hey, I dont work using DMs, please invite me to a Server! ✅ https://discordapp.com/oauth2/authorize?client_id=434159357434003456&permissions=10246&scope=bot")

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  
  
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 5) + 1;
  let baseAmt = Math.floor(Math.random() * 5) + 1;

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
    
  //let userShards = shards[message.author.id].shards;

  //let shardicon = message.author.displayAvatarURL
 // let shardEmbed = new Discord.RichEmbed()
 // .setAuthor(message.author.username)
//  .setColor("#0000FF")
//  .addField("Shards earnt by talking 💍", `${shardAmt} shards`, true)
 // .setThumbnail(shardicon)
 // .addField("Total amount of shards", userShards, true)
 // .addField("Gain more shards by talking in chat!", "Don't spam or you may be punished!", true)
  

//  message.channel.send(shardEmbed).then(msg => {msg.delete(10000)});
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let userxp = xp[message.author.id].xp;
  let userlvl = xp[message.author.id].level;
  let nextLvl = xp[message.author.id].level * 1000;
  xp[message.author.id].xp =  userxp + xpAdd;
  if(nextLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = userlvl + 1;
    if (message.guild.id === "421630709585805312") return;
    message.author.displayAvatarURL
  }
  

  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
 

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  
});

bot.on('guildMemberAdd', async member => {
  let guild = member.guild;
  let autonick = JSON.parse(fs.readFileSync("./autonick.json", "utf8"));
  if(!autonick[member.guild.id]) return;
  
   var autonicksetting = JSON.parse(fs.readFileSync("./autonickonoff.json", "utf8"));
    if (!autonicksetting[member.guild.id]) {
     autonicksetting[member.guild.id] = {
      values: 1
      };
    }
  
    var values = autonicksetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
      let newNick = autonick[member.guild.id].nick
      newNick = newNick.replace('{username}', member.user.username)
      member.guild.members.get(`${member.user.id}`).setNickname(newNick)
    }
});

bot.login(`${process.env.TOKEN}`);