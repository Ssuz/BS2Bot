  
const Discord = require("discord.js")
const db = require('../../conn/mysql');

module.exports = {
    name: "1",
    aliases: [],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (bot, message, args) => {
       //어드민 확인
        try{
            //user 테이블에 message보내는사람이 admin인지 확인
            const adminchecksql = `SELECT * FROM users WHERE discordID = ${message.author.id};`
            db.query(adminchecksql, function(err, res) {
                const admin = res.map(c => c.admin);
                if(admin == 1) {
                    const mentionID = message.mentions.members.first().id;
                    const checksql = `SELECT * FROM guilds WHERE ownerID = ${mentionID};`
                    db.query(checksql, function(err, res){
                        const DBownerID = res.map(c=> c.ownerID)
                        if(mentionID == DBownerID){
                            const errembed = new Discord.MessageEmbed()
                            .setColor('#EF1111')
                            .setTitle(`Err Execute`)
                            .setDescription(`<@!${mentionID}>님의 아이디가 DB에 이미 존재 합니다`)
                            .setTimestamp()
                            .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
                            message.channel.send(errembed)
                        } else {
                            const insertsql = 'INSERT INTO users(owner, guildID, ) VALUES (?,?,?,?)'
                            db.query(insertsql,[member.id, member.user.tag, 0 ,0 ], function(err, res) {
                            });
                        }
                    });
                } else {
                    return
                }
            });
            //멘션 ID DB에 있나확인
            
        } catch(e){
            console.log(e)
        }
    }
}