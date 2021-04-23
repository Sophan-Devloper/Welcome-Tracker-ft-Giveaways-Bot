const Discord = require('discord.js')

module.exports = {
    name: "emoji",
    aliases: [],
    description: "show emoji!",
    run: async(client, message) => {
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id) {
          return client.emojis.cache.get(id).toString();
        }
        message.guild.emojis.cache.forEach((emoji) => {
          OverallEmojis++;
          if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id);
          } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id);
          }
        });
        let Embed = new Discord.MessageEmbed()
          .setTitle(`Emojis in ${message.guild.name}.`)
          .setDescription(
            `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
          )
          .setColor(`RANDOM`);
        message.channel.send(Embed);
    }
}
