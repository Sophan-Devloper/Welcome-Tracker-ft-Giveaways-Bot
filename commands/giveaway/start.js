const ms = require('ms');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'start',
    aliases: ['gstart'],
    run: async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('You do not have `MANAGE_MESSAGES` permission to run `START` command.')
        }
        
        // Giveaway Channel
        let giveawayChannel = message.mentions.channels.first();
        
        // if no channel is mentioned
        if (!giveawayChannel) {
            return message.channel.send(':x: You have to mention a valid channel!')
        }


        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':x: You have to specify a valid duration!')
        }

        let giveawayNumberWinners = args[2];

        if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
            return message.channel.send(':x: You have to specify a valid number of winners!')
        }

        let giveawayPrize = args.slice(3).join(' ');

        if(!giveawayPrize) {
            return message.channel.send(':x: You have to specify a valid prize!')
        }



        // Start the giveaway
        client.giveaways.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayNumberWinners,
            hostedBy: client.config.hostedBy ? message.author : null,
            messages: {
                giveaway:
                (client.config.everyoneMention ? '@everyone\n\n' : '') +
                "🎉 **GIVEAWAYS** 🎉",
                giveawayEnded:
                (client.config.everyoneMention ? '@everyone\n\n' : '') +
                '🎉 **GIVEAWAY ENDED** 🎉',
                timeRemaining: 'Time Remaining: **{duration}**!',
                inviteToParticipate: 'React with 🎉 to participate!',
                winMessage: 'Congratulations! {winners} You won **{prize}**',
                embedFooter: 'Giveaways',
                noWinner: 'Giveaway cancelled, no valid participations!',
                winners: 'winner(s)',
                endedAt: 'Ended at',
                units: {
                    seconds: 'seconds',
                    minutes: 'minutes',
                    hours: 'hours',
                    days: 'days',
                    plurals: false
                }
            }
        });

        message.channel.send(`Giveaway started in ${giveawayChannel}`)
    }
}
