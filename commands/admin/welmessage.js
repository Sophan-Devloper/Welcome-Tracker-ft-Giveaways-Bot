const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
module.exports = {
    name: "welmessage",
    aliases: [],
    description: "set Text on welcome",
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
                    > \`{invite:counter}\` - The invite count
                    > \`{inviter:member}\` - Name of inviter 
                    > \`{server:count}\` - The server counter
                    `,
                    fields: [{
                        name: 'Set Join Message',
                        value: '`joinmessage <joinMsg>`',
                        inline: true
                    }, {
                        name: 'Default Value',
                        value: 'Welcome {member:mention}! We now have {server:members} member!'
                    }, {
                        name: 'Currect Value',
                        value: `\`\`\`\n${db.fetch(`joinmsg_${message.guild.id}`)}\n\`\`\``
                    }],
                    color: "PINK"
                }
            })
        }
        let newJoinMessage = args.join(" ")
        db.fetch(`joinmsg_${message.guild.id}`)
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({
            embed: {
                title: "Missing Permissions"
            }
        })
        let joinMsg = args.join(" ")
        db.set(`joinmsg_${message.guild.id}`, joinMsg)
        await message.channel.send({
            embed: {
                title: "Success!",
                color: "GREEN",
                description: `I have set the join value to \`${joinMsg}\`. If you want to preview it, please emit the event!`
            }
        })
    }
}
