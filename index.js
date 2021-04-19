const {Collection, Client, Discord, User} = require('discord.js')
const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const ms = require('ms')
const client = new Client()
const db = require('quick.db')
const moment = require("moment");
const config = require('./config.json')
const prefix = config.prefix
const guildInvites = new Map();

client.config = config;
client.commands = new Collection(); 
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//we will make the system first otherwise it wont works
client.snipes = new Map();
client.on('messageDelete', function(message, channel) {
      if (message.author.bot) return;
      client.snipes.set(message.channel.id, {
         content: message.content,
         profilephoto: message.author.displayAvatarURL({ dynamic : true }),
         author: message.author.tag,
         date: message.createdTimestamp,
         image: message.attachments.first() ? message.attachments.first().proxyURL : null
      }) // that should be done...
      // now let make utility folder and snipe files
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = client;
const { GiveawaysManager } = require('discord-giveaways'); //npm i discord-giveaways
client.giveaways = new GiveawaysManager(client, {
   storage: './give.json',
   updateCountdownEvery: 5000, // 5000 in seconds is 5 seconds
   default: {
      botsCanWin: false,
      embedColor: '#FF0000',
      reaction: '🎉'
   }
})
////event//////////////////////////////////////////////////////////////////////////////////////////////////////
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      // super-secret recipe to call events with all their proper arguments *after* the `client` var.
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', async message => {
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
    return message.channel.send(`Hii! <@${message.author.id}>, My prefix is \`${prefix}\``); //if you dont know what prefix of your bot, just ping it!
  }
    if(message.author.bot || message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
   })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("inviteCreate",async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("ready",() =>{
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));
       });
   });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses)
           
    let welcomeChannel = db.fetch(`welcome_${member.guild.id}`)
    if (welcomeChannel === null) return
    const channel = member.guild.channels.cache.find(ch => ch.id === welcomeChannel);
    let joinMsg = db.fetch(`joinmsg_${member.guild.id}`)
    if (joinMsg === null) {
        db.set(`joinmsg_${member.guild.id}`, `𝐖𝐞𝐥𝐜𝐨𝐦𝐞 {member:mention} 𝐓𝐨 **{server:name}**\n𝐈𝐧𝐯𝐢𝐭𝐞 𝐁𝐲: {inviter:members}\n𝐈𝐧𝐯𝐢𝐭𝐞: {invite:counter} \n𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐂𝐫𝐞𝐚𝐭𝐞 : {member:createdAt}\n𝐓𝐨𝐭𝐚𝐥 {server:members} 𝐌𝐞𝐦𝐛𝐞𝐫 𝐈𝐧 𝐒𝐞𝐫𝐯𝐞𝐫 `)
    }
       
    let newJoinMsg = db.fetch(`joinmsg_${member.guild.id}`)
    let content = newJoinMsg
        .replace(/{member:mention}/g, `<@${member.user.id}>`)
        .replace(/{member:name}/g, `${member.user.username}`)
        .replace(/{member:id}/g, `${member.user.id}`)
        .replace(/{member:tag}/g, `${member.user.tag}`)
        .replace(/{member:createdAt}/g, `${moment(member.user.createdAt).format('LLLL')}`)
        .replace(/{server:name}/g, `${member.guild.name}`)
        .replace(/{server:members}/g, `${member.guild.members.cache.size}`)
        .replace(/{invite:counter}/g, `${usedInvite.uses}`)
        .replace(/{inviter:members}/g, `<@${usedInvite.inviter.id}>`)
        .replace(/{server:members}/g, `${member.guild.members.cache.size}`)
        
    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(content)
        .setTimestamp()
    if(channel){
        channel.send(embed).catch(err => console.log(err))
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.login(config.token)
