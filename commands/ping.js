const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let pingembed = new Discord.RichEmbed()
      .setDescription(":tophat: Pong :ping_pong:")
      .setColor("#38087e")
      .addField(`Your Ping`, `${Date.now() - (message.createdTimestamp)}ms`)
      .addField(`Api Ping`, `${Math.round(bot.ping)}ms`)
      .setFooter(`Requested By ${message.author.username} ID: ${message.author.id}`, message.author.displayAvatarURL);
      
      return message.channel.send(pingembed);
        
    }
  
  
  
  module.exports.help = {
  name: "ping"
}