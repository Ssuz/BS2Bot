  
const Discord = require("discord.js");
const db = require("../../conn/mysql");
const mysql = require("../../conn/mysql");

module.exports = {
    name: "채널삭제",
    aliases: [],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (bot, message, args) => {
        const checksql = `SELECT * FROM guilds WHERE ownerID = ${message.author.id};`
        db.query(checksql, function(err, res) {
            const guildID = res.map(c=> c.guildID);
            const guildname = bot.guilds.cache.get(`${guildID}`); 
            if(err) return console.log(err);
            //db에 내용이 없을경우
            if(!res) {
                const errembed = new Discord.MessageEmbed()
                .setColor('#E50D0D')
                .setTitle(`⛔Err Command`)
                .setDescription("해당 데이터의 내용이 없습니다 다시 확인해주세요.")
                .setTimestamp()
                .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
                message.channel.send(errembed);
            }
            //쿼리 데이터 삭제
            const sql = `DELETE FROM guilds WHERE ownerID = ${message.author.id};`
            db.query(sql, function(err, res) {
                if(err) return console.log(err);
                    
                    const succesembed = new Discord.MessageEmbed() //✅
                    .setColor('#5EF900')
                    .setTitle(`✅Succes Delete`)
                    .setDescription("``" + `${guildname.name}` +"``의 채널정보가 삭제 되었습니다")
                    .addField("삭제자: " ,   `<@!${message.author.id}>`, false)
                    .addField("\n채널아이디: ", "``" + `${guildID}` + "``" , false)
                    .addField("\n안내사항 : " , "이용해주셔서 감사합니다")
                    .setTimestamp()
                    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
                    message.author.send(succesembed);
            });
        });

    }
}