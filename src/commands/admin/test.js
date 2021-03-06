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
        const usesql = `SELECT * FROM guilds WHERE guildID = ${message.guild.id} `
            db.query(usesql, async function(err, res) {
            if (err) return console.log(err)
        const useOncheck = res.map(c =>c.useOn);
            if(useOncheck == 1) {
        } else {
            message.channel.send("No")
            }
        });
    }
}