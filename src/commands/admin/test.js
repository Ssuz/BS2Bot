const Discord = require("discord.js")
const db = require('../../conn/mysql');

module.exports = {
    name: "코드테스트",
    aliases: [],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (bot, message, args) => {
       //어드민 확인
       const guildname = bot.guilds.cache.get(args[0])
       message.channel.send(guildname.name);
    }
}