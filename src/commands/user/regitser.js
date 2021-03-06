const Discord = require("discord.js")
const db = require("../../conn/mysql")

module.exports = {
    name: "채널등록",
    category: "info",
    description: "Returns latency and API ping",
    run: async (bot, message, args) => {
        if(args[0] > 0){
            try{
                message.delete();
                const checksql = `SELECT * FROM guilds WHERE ownerID = ${message.author.id};`
                db.query(checksql, function(err, res){
                    const DBownerID = res.map(c=> c.ownerID)
                    if(message.author.id == DBownerID){
                        const errembed = new Discord.MessageEmbed()
                        .setColor('#EF1111')
                        .setTitle(`⛔Err Command⛔`)
                        .setDescription(`<@!${message.author.id}>님의 정보가 DB에 이미 존재 합니다`)
                        .addField("안내사항", "정보 확인을 원하시면 |``.정보확인``|\n 채널삭제를 원하시면 |``.채널삭제``|\n를 입력해주세요")
                        .setTimestamp()
                        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
                        message.channel.send(errembed).then(msg => msg.delete({timeout: 2000}));
                    } else {
                        const insertsql = 'INSERT INTO guilds(ownerID, guildID) VALUES (?,?)'
                        db.query(insertsql,[message.author.id, args[0]], function(err, res) {
                            if(err) {
                                return console.log(err);
                            } else {
                                const succesembed = new Discord.MessageEmbed() //✅
                                    .setColor('#5EF900')
                                    .setTitle(`✅Succes Register`)
                                    .setDescription(`<@!${message.author.id}>님의 채널정보가 저장 되었습니다`)
                                    .addField("등록자: " , "``" + `<@!${message.author.id}>` + "``", false)
                                    .addField("\n채널아이디: ", "``" + `${args[0]}` + "``" , false)
                                    .addField("\n안내사항 : " , "정보가 맞지 않으면 ``.채널삭제`` 를 입력해주세요")
                                    .setTimestamp()
                                    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
                                    message.author.send(succesembed).then(msg => msg.delete({timeout: 2000}));
                            }
                        });
                    }
                });
            } catch(e){
                console.log(e);
            }
        } else { 
            const errorembed = new Discord.MessageEmbed()
            .setColor('#EF1111')
            .setTitle(`⛔Err Command⛔`)
            .setDescription(`길드명 ID를 입력해주세요 \n 자세한내용: <#817658190128480296>`)
            .setTimestamp()
            .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
            message.channel.send(errorembed).then(msg => msg.delete({timeout: 2000}));
        }
    }
}