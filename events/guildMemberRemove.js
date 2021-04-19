const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
const snekfetch = require("snekfetch");

exports.run = async (client, member, args) => {
    let leaveChannel = db.fetch(`leave_${member.guild.id}`)
    if (leaveChannel === null) return
    const channel = member.guild.channels.cache.find(ch => ch.id === leaveChannel);
    let leaveMsg = db.fetch(`leavemsg_${member.guild.id}`)
    if (leaveMsg === null) {
        db.set(`leavemsg_${member.guild.id}`, `😢 {member:name} just left the server... We are down to {server:members} members... `)
    }
    let newJoinMsg = db.fetch(`leavemsg_${member.guild.id}`)
    let content = newJoinMsg
    .replace(/{member:mention}/g, `<@${member.user.id}>`)
    .replace(/{member:name}/g, `${member.user.username}`)
    .replace(/{member:id}/g, `${member.user.id}`)
    .replace(/{member:tag}/g, `${member.user.tag}`)
    .replace(/{member:createdAt}/g, `${member.user.createdAt}`)
    .replace(/{server:name}/g, `${member.guild.name}`)
    .replace(/{server:members}/g, `${member.guild.members.cache.size}`)

      let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(content)
      .setTimestamp()
      if(channel){
        channel.send(embed).catch(err => console.log(err))
    }
}