const Discord = require("discord.js")
const db = require("../../conn/mysql")

module.exports = {
    name: "등록",
    category: "info",
    description: "Returns latency and API ping",
    run: async (bot, message, args) => {
        const UserConfirm = `SELECT * FROM guilds WHERE ownerID = ${message.author.id}`
        db.query(UserConfirm, (err, res) => {
            const a = res.map(c => c.ownerID)
            if (a > 0){
                console.log("성공")
            } else{
                console.log("실패")
            }
        });
    }
}