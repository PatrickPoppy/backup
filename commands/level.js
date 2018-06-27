const Discord = require("discord.js");
const botconfig = require("../botconfig");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
               message.react("✅")

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}
  let uicon = message.author.displayAvatarURL;
  let userxp = xp[message.author.id].xp;
  let userlvl = xp[message.author.id].level;
  let nextLvlXp = userlvl * 1000;
  let difference = nextLvlXp - userxp;
  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#38087e")
  .setThumbnail(uicon)
  .addField("Level", userlvl, true)
  .addField("XP", userxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed)
}

module.exports.help = {
  name: "level"
}