const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
var option = args.slice(0).join(" ")
            if (!option) {
              var embed = new Discord.RichEmbed()
              .setColor("#38087e")
              .setDescription(`**REMIND:** 
- \`Hooks such as [] or <> are not to be used when using commands\`.

**EXAMPLE:**
- \`~report [bug]\`
`)
              .setFooter("Pay", bot.user.displayAvatarURL)
              .setTimestamp()
              message.react("❌")
              message.channel.send({embed});
            } else {
    let reason  = args.join(" ").slice(0);
    if(!reason) return message.react("❌")+message.channel.send("You must specify a reason to report this player")
    let reportembed = new Discord.RichEmbed()
    .setDescription("Report A Bug")
    .setColor("#38087e")
    .addField("Reported By", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("TimeStamp", message.createdAt)
    .addField("bug", reason)
    .setFooter(`Requested By ${message.author.username} ID: ${message.author.id}`, message.author.displayAvatarUR);


    message.delete().catch(O_o=>{});
    bot.users.get("456497258607935498").send(reportembed);
    message.react("✅")
              message.channel.send("✅ Reports sent will be received and fixed immediately")
  }
}
  
  
  module.exports.help = {
  name: "report"
}