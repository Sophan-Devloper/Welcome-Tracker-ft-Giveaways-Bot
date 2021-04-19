const ms = require('ms');

module.exports = {
    name: 'end',
    run: async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSSAGES')) {
            return message.channel.send(':x: You do not have `MANAGE_MESSAGES` permission to run `END` command.')
        }

        if (!args[0]) {
            return message.channel.send('Please specify a message ID')
        }

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args.join(' '));
        if (!giveaway) {
            return message.channel.send('Couldn\'t find the giveaway.')
        }

        client.giveaways.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        }).then(() => {
            message.channel.send('Giveaway will end in less than 5 second(s)!')
        }).catch(err => {
            console.log(err)
            message.channel.send('An error occured!')
        })
           

    }
}