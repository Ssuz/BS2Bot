  
const Discord = require("discord.js")
const mysql = require("../../conn/mysql");

module.exports = {
    name: "채널확인",
    aliases: [],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (bot, message, args) => {

        const guildID = message.guild.id;
        const checkembed = new Discord.MessageEmbed()
        .setColor('#18CFBE')
        .setTitle(`${message.guild.name}의 ID`)
        .setDescription("해당채널의 ID는``"+ `${guildID}` +"``입니다")
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);

        message.channel.send(checkembed);

    }
}