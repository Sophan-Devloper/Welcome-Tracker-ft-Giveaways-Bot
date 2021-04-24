const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
module.exports = {
    name: "clear",
    aliases: [],
    description: "clear 9 | clear @mention 30",
    run: async(client, message, args) => {

        const user = message.mentions.users.first();
        const author = message.guild.member(message.author);
      const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
      if(author.hasPermission("MANAGE_MESSAGES")){
      
      if (!amount){
          var embed = new MessageEmbed()
          .setDescription(":x:Error:x:")
          .addField("Type of Error", "You have not specified an amount of messages to delete")
          return message.channel.send(embed);
      }
      
      
      if (!amount && !user){
          var embed = new MessageEmbed()
          .setDescription(":x:Error:x:")
          .addField("Type of Error", "You have not mentioned either a user to purge or an amount of messages to purge")
          return message.channel.send(embed);
      }
      
      
      message.channel.messages.fetch({
       limit: amount,
      }).then((messages) => {
       if (user) {
       const filterBy = user ? user.id : client.user.id;
       messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
       }
       message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        
      });
      } else {
          var embed = new MessageEmbed()
          .setDescription(":x:Error:x:")
          .addField("Type of Error", "You don't seem to have permission to use this command.")
          return message.channel.send(embed);
      }
        
    }
}
