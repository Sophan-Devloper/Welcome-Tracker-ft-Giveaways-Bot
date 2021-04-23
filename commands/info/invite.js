const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: "invite",
    aliases: [],
    description: "show invite",
    run: async(client, message) => {
        let prefix = config.prefix;
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let invite = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL()) 
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle("Invite & Support Link!")
    .addField("Invite Link", "[Click here to invite me](https://discord.com/api/oauth2/authorize?client_id=684788617020702727&permissions=8589934591&scope=bot)")
    .addField("Support Server", "[Click to join support Server](https://discord.gg/nXd9PwyDYE)")
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send(invite);
    }
}