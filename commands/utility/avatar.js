const Discord = require('discord.js')

module.exports = {
    name: "avatar",
    aliases: ["profile"],
    description: "Show pf of suer!",
    run: async(client, message) => {
        try {
            let user = message.mentions.users.first() || message.author;

            message.channel.startTyping(); // TELLS YOUR HANDICAPPED BOT TO START TYPING! ;)
          
            let avatarURL = user.avatarURL({ format: "png", dynamic: true, size: 2048 });
          
            let avatarEmbed = new Discord.MessageEmbed()
                  .setColor(`#ff0000`)
                  .setDescription(`${user}\'s avatar`)
                  .addField("Avatar location:", `[click here](${avatarURL})`)
                  .setImage(avatarURL)
                  .setTimestamp(); //SHOWS THAT COOL TIME ON THE FOOTER!
            await message.channel.send(avatarEmbed) //NOW WE GIVE IT SOMETIME TO DO ALL THE CRAZY STUFF ON TOP AND THEN SEND THE EMBED!
            message.channel.stopTyping(true); // TELLS YOUR HANDICAPPED BOT TO STOP TYPING! ;)
        } catch (e) {
            return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
            }
    }
}
