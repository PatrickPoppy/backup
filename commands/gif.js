const Discord = require("discord.js");
const gifSearch = require("gif-search");
const fs = require("fs")
exports.run = (bot, message, args) => {
  if (message.author.bot) return;
     if (!args[0]) return message.channel.send("`~gif <name>`");

    gifSearch.query(args[0]).then(
        gifUrl => {

        let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
        var embed = new Discord.RichEmbed()
            .setColor(`#38087e`)
            .setTimestamp() 
            .setImage(gifUrl)
            .setFooter(`Requested by: ${message.author.tag}`);
        message.channel.send(embed);
    });

    

}

module.exports.help = {
  name: "gif"
}