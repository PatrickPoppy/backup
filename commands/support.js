const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
                 message.react("✅")

    let bicon = bot.user.displayAvatarURL;
    let supportembed = new Discord.RichEmbed()
    .setDescription("Onichan Info!")
    .setThumbnail(bicon)
    .setColor("#38087e")
    .addField("Verter Support Discord", `Click the link below`, true)
    .addField("Verter Support Discord", "[ Join Official Bot](https://discord.gg/dwD7fpr)", true)
    .addField("If you need any more support be sure to message Verter on Discord", "<@456497258607935498> = Verter#5996", true)
    .setFooter(`Requested By ${message.author.username} ID: ${message.author.id}`, message.author.displayAvatarURL);
  
  message.channel.send(supportembed);
}
  
  module.exports.help = {
  name: "support"
}