const Discord = require("discord.js");
  
module.exports.run = async (bot, message, args) => {
                 message.react("✅")

  let botembed = new Discord.RichEmbed()
      .setTitle("Onichan VPS use:")
      .setImage("https://cdn.discordapp.com/attachments/461408022468755458/461440018339332106/unknown.png")
      .setColor("#38087e")
      .setFooter(`Requested By ${message.author.username} ID: ${message.author.id}`, message.author.displayAvatarURL);
            return message.channel.send(botembed);
          }
  

  
  module.exports.help = {
  name: "vpsinfo"
}