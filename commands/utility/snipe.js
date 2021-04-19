// we will import the system from index.js to here
// follow my step

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'snipe',
    run: async(client, message, args) => {
        const msg = client.snipes.get(message.channel.id)
        if (!msg) {
            return message.channel.send('There is nothing to snipe....')
        }

        const embed = new MessageEmbed()
        .setAuthor(msg.author, msg.profilephoto)
        .setDescription(msg.content)
        .setColor('RANDOM')
        .setTimestamp(msg.date)
        if (msg.image) embed.setImage(msg.image)

        message.channel.send(embed)
    } //that should be it, now lets test it !
}
