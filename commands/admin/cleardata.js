const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
module.exports = {
    name: "cleardata",
    aliases: [],
    description: "clear data",
run: async(client, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send({
            embed: {
                title: 'Clear Data',
                description: 'Please react for what data you want to clear!',
                color: "BLUE",
            fields: [{
                name: 'Welcome Channel',
                value: 'React 🔴',
                inline: true
                }, {
                name: 'Leave Channel',
                value: 'React 🟠',
                inline: true
                }, {
                name: 'Join Message',
                value: 'React 🟡',
                inline: true
                }, {
                name: 'Leave Message',
                value: 'React 🟢',
                inline: true
                }, {
                name: 'All data',
                value: 'React ⛔',
                inline: true
                    }],
                }
            }).then(async m => {
                await m.react('🔴')
                await m.react('🟠')
                await m.react('🟡')
                await m.react('🟢')
                await m.react('⛔')

                const filter = (reaction, user) => {
                    return ['🔴', '🟠', '🟡', '🟢', '⛔'].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                m.awaitReactions(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async collected => {
                    const reaction = collected.first();

                if (reaction.emoji.name === '🔴') {
                    let userReactions = (m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                        await db.all().filter(d => d.ID.startsWith(`welcome_${message.guild.id}`)).forEach(d => db.delete(d.ID))
                        await message.channel.send({
                            embed: {
                                title: 'Success!',
                                description: 'I have successfully cleared all data for `welcome` channel!',
                                color: 'GREEN',

                            }
                        })
                    } else if (reaction.emoji.name === '🟠') {
                        let userReactions = (m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(message.author.id);
                        }
                        await db.all().filter(d => d.ID.startsWith(`leave_${message.guild.id}`)).forEach(d => db.delete(d.ID))
                        await message.channel.send({
                            embed: {
                                title: 'Success!',
                                description: 'I have successfully cleared all data for `leave` channel!',
                                color: 'GREEN',
                            }
                        })
                    } else if (reaction.emoji.name === '🟡') {
                        let userReactions = (m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(message.author.id);
                        }
                        await db.all().filter(d => d.ID.startsWith(`joinmsg_${message.guild.id}`)).forEach(d => db.delete(d.ID))
                        await message.channel.send({
                            embed: {
                                title: 'Success!',
                                description: 'I have successfully cleared all data for `join message`',
                                color: 'GREEN',
                            }
                        })
                    } else if (reaction.emoji.name === '🟢') {
                        let userReactions = (m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(message.author.id);
                        }
                        await db.all().filter(d => d.ID.startsWith(`leavemsg_${message.guild.id}`)).forEach(d => db.delete(d.ID))
                        await message.channel.send({
                            embed: {
                                title: 'Success!',
                                description: 'I have successfully cleared all data for `leave msg`',
                                color: 'GREEN',
                            }
                        })
                    } else {
                        let userReactions = (m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(message.author.id);
                        }
                        await message.channel.send({
                            embed: {
                                title: 'Confirmation.',
                                description: 'Are you sure you want to delete all data stored?',
                                color: 'GREEN',
                            }
                        }).then(async m => {
                            await m.react('✅')
                            await m.react('❌')

                            const filter = (reaction, user) => {
                                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                            };

                            m.awaitReactions(filter, {
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(async collected => {
                                const reaction = collected.first();

                                if (reaction.emoji.name === '✅') {
                                    let userReactions = (m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                                    for (const reaction of userReactions.values()) {
                                        await reaction.users.remove(message.author.id);
                                    }
                                    await db.all().filter(d => d.ID.startsWith(`welcome_${message.guild.id}`)).forEach(d => db.delete(d.ID))
                                    await db.all().filter(d => d.ID.startsWith(`leave_${message.guild.id}`)).forEach(d => db.delete(d.ID))
                                    await db.all().filter(d => d.ID.startsWith(`joinmsg_${message.guild.id}`)).forEach(d => db.delete(d.ID))
                                    await db.all().filter(d => d.ID.startsWith(`leavemsg_${message.guild.id}`)).forEach(d => db.delete(d.ID))

                                    await message.channel.send({
                                        embed: {
                                            title: 'Success!',
                                            description: 'I have deleted all data stored in my databases!',
                                            color: 'GREEN',
                                        }
                                    })
                                } else {
                                    let userReactions = (m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                                    for (const reaction of userReactions.values()) {
                                        await reaction.users.remove(message.author.id);
                                    }
                                    return message.channel.send({
                                        embed: {
                                            title: 'Data clear cancelled',
                                            description: 'The data stored in my database remain safe!',
                                            color: 'GREEN',
                                        }
                                    })
                                }
                            })
                        })
                    }

                })

            })

        }
    }
}
