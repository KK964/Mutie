const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');
var profanitities = ["fag", "faggot", "trannie", "kys", "kill your self", "nigger", "nibba", "nigga", "testtsaedwadadwadwaudawhdawudhaduh"];
const PREFIX = '!';

bot.on('ready', () => {
    console.log('Mutie is now active :D');
    bot.user.setActivity(`Eating the souls of the homophobic`)
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




    /* bot.on(`message`, message => {
        if(message.channel.id === `719078243369615361`) {
            const channelToCheck = bot.channels.cache.get(`719078243369615361`)
            channelToCheck.messages.fetch({ limit: 1}).then(messagescheck => {
                const lastMessage = messagescheck.first()
                const sender = lastMessages.sender.displayName;
                console.log(console.error);
                message.reply(`Your sugestion was sent to the staff.`)
                bot.channels.cache.get(`719081441799045184`).send(`suggestion: ***${lastMessage}*** was sent by ***${sender}***`);
            })
        }
    })*/

});

/*bot.on(`message`, message => {
    if(message.channel.id === `719078243369615361`) {
        const channelToCheck = bot.channels.cache.get(`719078243369615361`)
        channelToCheck.messages.fetch({ limit: 1}).then(messagescheck => {
            const lastMessage = messagescheck.first()
            const sender = lastMessages.sender.displayName;
            console.log(console.error);
            message.reply(`Your sugestion was sent to the staff.`)
            bot.channels.cache.get(`719081441799045184`).send(`suggestion: ***${lastMessage}*** was sent by ***${sender}***`);
        })
    }
})*/

bot.on("guildMemberAdd", (memberj) => {
    console.log(`Member joined and added to 24h media mute: ${memberj.user.username}`)
    bot.channels.cache.get(`717807253519990982`).send(`***${memberj}*** joined and was media muted for 24hrs`)
    memberj.send(`Thanks for joining **Virtual Pride Month**, to prevent bad people, you cannot send any media untill an ammount of time that, *we will not tell*, you has passed.`).catch(console.error);
    const time = `86400000`;
    //719241764879204392
    memberj.roles.remove("719241764879204392").catch(console.error);

    setTimeout(function() {
        if(!memberj.roles.cache.has("719241764879204392")) {
        memberj.roles.add("719241764879204392").catch(console.error)
        bot.channels.cache.get(`717807253519990982`).send(`***${memberj}*** is no longer media muted`)
        memberj.send(`Your 24h Media mute is over.`).catch(console.error);}
    }, ms(time));
})

//reee



bot.on('message', async message => {
    let msg = message.content.toLocaleLowerCase();
    const userID = "536991182035746816";
    if(message.sender === userID) {
        let mreason = args[4]
        let mperson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
        let time = args[6]
        if(mreason === "silenced")
        mperson.roles.add("717631710761844757").catch(console.error)
        mperson.roles.remove("718154458131071106").catch(console.error)
        mperson.send('you were muted by Wick for ***${time}***')
        bot.channels.cache.get(`717807253519990982`).send(`***${mperson.displayName}*** was muted by Wick for ***${time}***`)
        setTimeout(function() {
            mperson.roles.remove("717631710761844757").catch(console.error)
            mperson.roles.add("718154458131071106").catch(console.error)
            mperson.send('You are no longer muted')
            bot.channels.cache.get(`717807253519990982`).send(`***${mperson.displayName}*** is no longer muted`)
        }, ms(time));
    }
})





bot.on('message', async message => {
    let msg = message.content.toLocaleLowerCase();
    let sender = message.member.displayName;
    let senderm =message.member;
    const time = `600000`;
    let Admin = message.guild.roles.cache.get("717547940880842753");
    let Mod = message.guild.roles.cache.get("717147286937010176");
    let Owner = message.guild.roles.cache.get("717462983231668255");
    for (x = 0; x < profanitities.length; x++) {
        if (msg.includes(profanitities[x])){
            await message.reply('You cannot say that here!')
            message.delete()
            message.reply(` was muted for 10min for saying profanities.`)
            senderm.send("You were muted by ***Mutie*** for 10min for saying profanities")
            senderm.roles.add("717631710761844757").catch(console.error)
            senderm.roles.remove("718154458131071106").catch(console.error)
            senderm.roles.remove("719241764879204392").catch(console.error);
            bot.channels.cache.get(`717807253519990982`).send(`***${sender}*** was muted for 10min for saying profanities, if this was not their first time, increase mute time.`);
            setTimeout(function() {
                senderm.roles.add("718154458131071106")
                senderm.roles.remove("717631710761844757")
                senderm.roles.add("719241764879204392")
                bot.channels.cache.get(`717807253519990982`).send(`***${sender}*** was unmuted`)
                senderm.send(`Your mute is over`);
            }, ms(time))
        }
    }


})


bot.login(process.env.token);