  
const Discord = require("discord.js")

module.exports = {
    name: "문의",
    aliases: [],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (bot, message, args) => {
        message.delete();
       if(message.guild.channels.cache.filter(c => c.topic === message.author.id && String(c.name).endsWith("-문의사항")).size > 0)
       {
           const errembed = new Discord.MessageEmbed()
           .setColor('#E50D0D')
           .setTitle(`${bot.user.username}문의 에러 안내사항`)
           .setDescription("수정할것")
           .setTimestamp()
           .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
           message.author.send(errembed);
       }else{
        message.guild.channels.create(`${message.author.username}-문의사항`, {
            topic: message.author.id,
            type: "text",
            parent: '816535049712173077',   
            permissionOverwrites: [{
                id: message.guild.id,
                deny: ["READ_MESSAGE_HISTORY"]
            }, {
                id: message.author.id,
                allow: ["READ_MESSAGE_HISTORY", "SEND_MESSAGES"]
            }]
        }).then(ch => {
            let ticketembed = new Discord.MessageEmbed()
                .setColor('#fcba03')
                .setTitle(`${bot.user.username}의 문의안내사항`)
                .setDescription("해당 티켓 채널은 개인적으로 할당 받는 \n채널이며 관리자가 확인 후\n개인 티켓 채널은 삭제되는 점을 알려드립니다")
                .setTimestamp()
                .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
            ch.send({ embed: ticketembed });

        })

       }
    }
}