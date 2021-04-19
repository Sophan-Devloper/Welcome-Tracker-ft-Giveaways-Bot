const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
module.exports = {
    name: "emit",
    aliases: [],
    description: "Test welcome",
    run: async(client, message, args) => {
     if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({
        embed: {
            title: "Missing Permissions.You need ADMINISTRATOR to use this cmd"
            }
        })
        message.client.emit(args[0], message.member)
    }
}
