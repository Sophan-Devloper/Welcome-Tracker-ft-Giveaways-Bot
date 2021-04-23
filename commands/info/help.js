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
        .addField("Info", `emoji\ninvites\nping\ninvite\nuptime`, true)
        .addField("Giveaway", `start\nreroll\nend`, true)
        .addField("utility", `snipe`, true)
        .setColor('BLACK')
        .setTimestamp();
        message.channel.send(embed)
    }
}
