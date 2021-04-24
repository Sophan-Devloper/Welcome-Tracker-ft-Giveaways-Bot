const Discord = require('discord.js')

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "show all cmd!",
    run: async(client, message) => {
        const embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("Help Commands")
        .addField("Admin", `cleardata\nleavechannel\nleavemessage\nwelchannel\nwelmessage\nclear`, true)
        .addField("Info", `emoji\ninvitelist\nping\ninvite\nuptime`, true)
        .addField("Giveaway", `start\nreroll\nend`, true)
        .addField("utility", `avatar\nsnipe`, true)
        .setColor('BLACK')
        .setTimestamp();
        message.channel.send(embed)
    }
}
