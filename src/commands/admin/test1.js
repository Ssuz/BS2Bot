  
const Discord = require("discord.js")
const db = require('../../conn/mysql');

module.exports = {
    name: "테스트",
    aliases: [],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (bot, message, args) => {
       
        db.query(`SELECT * FROM users WHERE discordID = ${message.author.id};`, function(err, result) {
           const data = result.map(c => c.discordID)
           const admin = result.map(v => v.admin)

            if(admin == 1) {
                console.log(true)
            } else{
                console.log(false)
            }
        })

                

    }
}