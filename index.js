const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');

const PREFIX = '!';


bot.on('ready', () => {
    console.log('This bot is active!');
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'mute':
            if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You cannot run this command");
            let mperson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!mperson) return  message.reply("I cannot find the user " + mperson)

            const mainrole = message.guild.roles.cache.get('718166462862196777');
            const muterole = message.guild.roles.cache.get('717606607910993930');
           

            if(!muterole) return message.reply("Couldn't find the mute role.")

            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
            if (!args[3]) {return message.reply("Please specify a reason");}

            let reason3 = args[3]

            mperson.roles.add("717606607910993930").catch(console.error)
            mperson.roles.remove("718166462862196777").catch(console.error);

            message.channel.send(`${mperson.displayName} has now been muted for ${ms(ms(time))} for ${reason3}`)
            mperson.send(`you have been muted for ${reason3} by ${message.member.displayName}`)
            bot.channels.cache.get(`717607213333741638`).send(`${mperson.displayName} has now been muted for ${ms(ms(time))} for ${reason3} by ${message.member.displayName}`)
            setTimeout(function(){
                if(mperson.roles.cache.has("717606607910993930")){   
                mperson.roles.add("718166462862196777"),
                mperson.roles.remove("717606607910993930"),
                console.log(muterole),
                message.channel.send(`${mperson.displayName} has been unmuted.`)
                bot.channels.cache.get(`717607213333741638`).send(`${mperson.displayName} has now been unmuted`)
                mperson.send(`You have been unmuted`)}
            }, ms(time));


    
        break;
    }


    switch (args[0]) {
        case 'unmute':
            if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You cannot run this command");
            let mperson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!mperson) return  message.reply("I cannot find the user " + mperson)

            const mainrole = message.guild.roles.cache.get('718166462862196777');
            const muterole = message.guild.roles.cache.get('717606607910993930');
           

            if(!muterole) return message.reply("Couldn't find the mute role.")

            if(mperson.roles.cache.has("718166462862196777")){return message.reply(`the user ${mperson.displayName} is not muted`)}
            mperson.roles.remove("717606607910993930").catch(console.error)
            mperson.roles.add("718166462862196777").catch(console.error);
            message.channel.send(`${mperson.displayName} has now been unmuted`)
            mperson.send(`you have been unmuted by ${message.member.displayName}`)
            bot.channels.cache.get(`717607213333741638`).send(`${mperson.displayName} was unmuted by ${message.member.displayName}`)
        break;
    }

});

            
                        
bot.login(process.env.token);