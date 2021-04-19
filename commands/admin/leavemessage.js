const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
module.exports = {
    name: "leavemessage",
    aliases: [],
    description: "set Text on leave",
    run: async(client, message, args) => {
        if (!args.length) {
            return message.channel.send({
                embed: {
                    title: 'Missing Arguments',
                    description: `> **Variables**
                    > **Members**
                    > \`{member:name}\` - The member's name
                    > \`{member:mention}\`
                    > \`{member:tag}\`
                    > \`{member:id}\` - The member's id
                    > \`{member:createdAt}\` - When the member created his/her account
                    > \`{server:name}\` - The server's name
                    > \`{server:members}\` - The server's members
                    `,
                    fields: [{
                        name: 'Set Join Message',
                        value: '`leavemessage <joinMsg>`',
                        inline: true
                    }, {
                        name: 'Default Value',
                        value: '😢 {member:name} just left the server... We are down to {server:members} members... '
                    }, {
                        name: 'Current Value',
                        value: `\`\`\`\n${db.fetch(`leavemsg_${message.guild.id}`)}\n\`\`\``
                    }],
                    color: "PINK"
                }
            })
        }
        let newJoinMessage = args.join(" ")
        db.fetch(`leavemsg_${message.guild.id}`)
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({
            embed: {
                title: "Missing Permissions"
            }
        })
        let joinMsg = args.join(" ")
        db.set(`leavemsg_${message.guild.id}`, joinMsg)
        await message.channel.send({
            embed: {
                title: "Success!",
                color: "GREEN",
                description: `I have set the leave value to \`${joinMsg}\`. If you want to preview it, please emit the event!`
            }
        })
    }
}
