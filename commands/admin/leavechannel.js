const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
module.exports = {
    name: "leavechannel",
    aliases: [],
    description: "set channel leave",
    run: async(client, message, args) => {
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[0]))
        if (!Channel) return message.channel.send({
            embed: {
                title: 'Missing Channel',
                description: 'Missing required arguments!',
                fields: [{
                    name: 'Usage',
                    value: '`leavechannel <channelID | channelMention | channelName>`'
                }],
                timestamp: new Date(),
                color: 'RED'
            }
        })
        await db.set(`leave_${message.guild.id}`, Channel.id)
        await message.channel.send({
            embed: {
                title: 'Success!',
                description: `Leave channel set as: <#${Channel.id}>! All leave messages will be redirected here. If this was a mistake, please configure it again`,
                color: 'GREEN',
                timestamp: new Date()
            }
        })
    }
}
