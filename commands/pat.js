const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
                 message.react("✅")

  if (!args[0]) return message.channel.send("Call someone!")+message.react("❌")
  const pat = await neko.getSFWPat();
  const answers = [
    `Look at **${args.join(" ")}**!`,
    `${message.author} and **${args.join(" ")}** looks cute together!`,
    `Pat pat!`,
    `There you go, **${args.join(" ")}**`,
    `**${args.join(" ")}**, ${message.author} just pat you!`
  ];
  const katakata = answers[Math.floor(Math.random() * answers.length)];
  const embed = new Discord.RichEmbed()
    .setDescription(`${katakata}`)
    .setImage(pat.url)
    .setFooter(`Requested by: ${message.author.tag}`);
  message.channel.send("**Please wait**")
    .then(m => m.edit({
      embed
    }))
};

module.exports.help = {
  name: "pat"
}