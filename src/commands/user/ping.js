const Discord = require("discord.js")

module.exports = {
    name: "핑",
    category: "info",
    description: "Returns latency and API ping",
    run: async (bot, message, args) => {
        message.channel.send("ping...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var botping = Math.round(bot.ws.ping);
        let pingembed = new Discord.MessageEmbed()
        .setColor('#A800F7')
        .setTitle(`${bot.user.username}의 핑`)
        .addField("Latency: ", "``" +  `${ping}ms` +"``", true)
        .addField("APILatency", "``" + `${botping}ms` + "``", true)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
        message.channel.send({embed: pingembed});
        m.delete()
      }) 
    }
}