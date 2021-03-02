require('dotenv').config();
const { Client, Collection } = require('discord.js');
const bot = new Client();

bot.commands = new Collection();
bot.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});


bot.on('ready', () => {
    console.log(`Bot is Ready`)
    bot.user.setStatus('idle')
    bot.user.setActivity('!help', {type:'WATCHING'})
});

bot.on("message", async message => {
    const prefix = process.env.PREFIX;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) 
        command.run(bot, message, args);
});

bot.login(process.env.BOT_TOKEN)