const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {

  //!pay @isatisfied 59345
var option = args.slice(0).join(" ")
            if (!option) {
              var embed = new Discord.RichEmbed()
              .setColor("#38087e")
              .setDescription(`**REMIND:** 
- \`Hooks such as [] or <> are not to be used when using commands\`.

**EXAMPLE:**
- \`~pay @mention [Nominal]\`
`)
              .setFooter("Pay", bot.user.displayAvatarURL)
              .setTimestamp()
              message.react("❌")
              message.channel.send({embed});
            } else {
  if(!coins[message.author.id]){
    return message.reply("You don't have any coins!")+message.react("❌")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[0]) return message.reply("Not enough coins there!")+message.react("❌");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`);
message.react("✅")
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  });
            }

}

module.exports.help = {
  name: "pay"
}