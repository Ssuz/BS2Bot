  
const Discord = require("discord.js")

module.exports = {
    name: "문의",
    aliases: [],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (bot, message, args) => {
       
        message.channel.send("hello")

                

    }
}