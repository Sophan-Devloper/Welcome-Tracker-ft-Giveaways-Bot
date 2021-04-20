const Discord = require('discord.js')

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "show all cmd!",
    run: async(client, message) => {
        const embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("Help Commands")
        .addField("Admin", `cleardata\nleavechannel\nleavemessage\nwelchannel\nwelmessage`, true)
        .addField("Info", `help\ninvites\nping`, true)
        .addField("utility", `snipe`)
        .setColor('BLACK')
        .setTimestamp();
        message.channel.send(embed)
    }
}
