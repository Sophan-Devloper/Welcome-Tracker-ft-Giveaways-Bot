exports.run = (client) => {
    try {
      const request = require('request');
      console.log(`${client.user.username} Successfully Logged in!`)
      console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);
      client.user.setStatus('idle')
      let activities = [ `${client.guilds.size} servers!`, `Welcomer Tracker!`, `Khmer giveaways Bot!` ], i = 0;
      setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "LISTENING" }), 15000);
} catch (e) {
      console.error(e)
  }
}