module.exports = {
    run: async (bot, message, args) => {

        if(message.author.id !== '456497258607935498') return message.react("❌")+ message.channel.send  ("Feck off, Your abuse has been sent to Verter#5996");
        console.log(`INFO: ${message.author.username} Just attempted to restart Frost! ID ${message.author.id} in guild ${message.guild.id} | ${message.guild.name}`);
        await message.react("🔄") + message.channel.send('Restarting Frost... **__This may take a while__**');
        process.exit(0);
    },
    meta: {
        aliases: ['restart', 'reboot'],
        ownerOnly: true,
        usage: ''
    }
}
  module.exports.help = {
  name: "restart"
}