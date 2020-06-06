const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');

const PREFIX = '!';

bot.on('ready', () => {
    console.log('Mutie is now active :D');
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'mute':
            if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You cannot run this command");
            let mperson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!mperson) return  message.reply("I cannot find the user " + mperson)

            if(mperson.roles.cache.has("717462983231668255")) return message.reply("This User cannot be Muted");
            if(mperson.roles.cache.has("717547940880842753")) return message.reply("This User cannot be Muted");

            const mainrole = message.guild.roles.cache.get('718154458131071106');
            const muterole = message.guild.roles.cache.get('717631710761844757');
           

            if(!muterole) return message.reply("Couldn't find the mute role.")

            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
            if (!args[3]) {return message.reply("Please specify a reason");}

            let reason3 = args[3]

            mperson.roles.add("717631710761844757").catch(console.error)
            mperson.roles.remove("718154458131071106").catch(console.error);

            message.channel.send(`***${mperson.displayName}*** has now been muted for ${ms(ms(time))} for ***${reason3}***`)
            mperson.send(`you have been muted for ***${reason3}*** by ***${message.member.displayName}***`).catch(console.error);
            bot.channels.cache.get(`717807253519990982`).send(`***${mperson.displayName}*** has now been muted for ${ms(ms(time))} for ***${reason3}*** by ***${message.member.displayName}***`)
            setTimeout(function(){
                if(mperson.roles.cache.has("717631710761844757")){   
                mperson.roles.add("718154458131071106"),
                mperson.roles.remove("717631710761844757"),
                console.log(muterole),
                message.channel.send(`***${mperson.displayName}*** is now unmuted.`)
                bot.channels.cache.get(`717807253519990982`).send(`***${mperson.displayName}*** is now unmuted`)
                mperson.send(`You have been unmuted`).catch(console.error);}
            }, ms(time));


    
        break;
    }


    switch (args[0]) {
        case 'unmute':
            if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You cannot run this command");
            let mperson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!mperson) return  message.reply("I cannot find the user " + mperson)

            const mainrole = message.guild.roles.cache.get('718154458131071106');
            const muterole = message.guild.roles.cache.get('717631710761844757');
           

            if(!muterole) return message.reply("Couldn't find the mute role.")

            if(mperson.roles.cache.has("718154458131071106")){return message.reply(`the user ***${mperson.displayName}*** is not muted`)}
            mperson.roles.remove("717631710761844757").catch(console.error)
            mperson.roles.add("718154458131071106").catch(console.error);
            message.channel.send(`***${mperson.displayName}*** has now been unmuted`)
            mperson.send(`you have been unmuted by ***${message.member.displayName}***`).catch(console.error);
            bot.channels.cache.get(`717807253519990982`).send(`***${mperson.displayName}*** was unmuted by ***${message.member.displayName}***`)
        break;
    }

    switch (args[0]) {
        case 'warn':
            if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You cannot run this command");
            let wperson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!wperson) return  message.reply("I cannot find the user " + wperson)
            if(wperson.roles.cache.has("717462983231668255")) return message.reply("This User cannot be Warned");
            if(wperson.roles.cache.has("717547940880842753")) return message.reply("This User cannot be Warned");
            const reason = args[2];
            message.reply(`***${wperson.displayName}*** has now been warned for ***${reason}***`)
            wperson.send(`you have been warned by ***${message.member.displayName}*** for ***${reason}***`).catch(console.error);
            bot.channels.cache.get(`717807253519990982`).send(`***${wperson.displayName}*** was warned by ***${message.member.displayName}*** for ***${reason}***`)
        break;
    }
    switch (args[0]) {
        case 'bot_purge' :
            if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You cannot run this command");
            if (message.channel.type == 'text') {
                const filter = m => m.content.author.bot;
                const collector = message.channel.createMessageCollector(filter, { time: 15000 });
                collector.on(`collect`, m => {
                    message.channel.bulkDelete(m);
                    messagesDeleted = m.array().length; // number of messages deleted
            
                    // Logging the number of messages deleted on both the channel and console.
                    message.reply("Deletion of messages successful. Total messages deleted: " + messagesDeleted);
                    console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted)
                }).catch(err => {
                    console.log('Error while doing Bulk Delete');
                    console.log(err);
                });
            }
    }

});

            
                        
bot.login(process.env.token);