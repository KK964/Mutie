require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
process.setMaxListeners(50);
//fs
const fs = require('fs');

let points = JSON.parse(fs.readFileSync("./points/points.json", "utf8"));

//antispam
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 4, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 10, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 20, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 1500, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});

bot.on('message', (message) => antiSpam.message(message)); 
antiSpam.on("warnAdd", (member) => console.log(`${member.user.tag} has been warned.`));
antiSpam.on("spamThresholdWarn", (member) => console.log(`${member.user.tag} has reached the warn threshold.`));
antiSpam.on("spamThresholdKick", (member) => console.log(`${member.user.tag} has reached the kick threshold.`));
antiSpam.on("spamThresholdBan", (member) => console.log(`${member.user.tag} has reached the ban threshold.`));
antiSpam.on("kickAdd", (member) => console.log(`${member.user.tag} has been kicked.`));
antiSpam.on("error", (message, error, type) => {
	console.log(`${message.author.tag} couldn't receive the sanction '${type}', error: ${error}`);
});
antiSpam.on("banAdd", (member) => console.log(`${member.user.tag} has been banned.`));
bot.on('message', (msg) => {
	antiSpam.message(msg);
});


//const keyv = require('keyv');
/*const keyv = new Keyv('redis://user:pass@localhost:6379');

keyv.on('error', err => console.log('Connection Error', err));

await keyv.set('foo', 'expires in 1 second', 1000); // true
await keyv.set('foo', 'never expires'); // true
await keyv.get('foo'); // 'never expires'
await keyv.delete('foo'); // true
await keyv.clear(); // undefined

const users = new Keyv('redis://user:pass@localhost:6379', { namespace: 'users' });
const cache = new Keyv('redis://user:pass@localhost:6379', { namespace: 'cache' });
*/

const ms = require('ms');
var profanitities = ["fag", "faggot", "trannie", "kys", "kill your self", "nigger", "nibba", "nigga", "testtsaedwadadwadwaudawhdawudhaduh"];
const PREFIX = '!';

const usersMap = new Map();

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
            if(message.member.roles.cache.has("717631710761844757")) { return mperson.send("you cannot mute while muted");}
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
            if(message.member.roles.cache.has("717631710761844757")) { return mperson.send("yeah, no, not going to let you unmute yourself, you deserve it...");}
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
    message.getEmbeds
    const userID = "536991182035746816";
    if(message.sender === userID) {
        let mperson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
        let time = args[6]
        if(message.content.toLocaleLowerCase().includes('silenced'))
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
    if(message.author.bot) return;
    let msg = message.content.toLocaleLowerCase();
    let sender= message.member.displayName;
    let senderm = message.members;
    let KK964 = bot.users.cache.get('426892116258717707')
    var kk = ["kk"]
    for (x = 0; x < kk.length; x++) {
        if (msg.includes(kk[x])){
            KK964.send(`${sender} says ${msg}.`)
        }
    }

})




/*
bot.on('message', message => {
    if(message.author.bot) return;
    let sender = message.member;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id)
        const mtime = '10000'
        let msg = message.content.toLocaleLowerCase;
        let lmsg = message.content;
        const { lastMessage, timer } = userData;
        const diffrence = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        if(diffrence > 2500) {
            clearTimeout(timer)
            console.log('cleared timeout');
            userData.msgCount =1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('removed from reset');
            }, 2500);
            usersMap.set(message.author.id, userData);
        }
        
        else {
        ++msgCount;
        if(parseInt(msgCount) === 5) {
            sender.roles.add("717631710761844757").catch(console.error)
            sender.roles.remove("718154458131071106").catch(console.error);
            message.channel.send(`***${message.member.displayName}*** has now been muted for 1m for ***Spam***`)
            message.member.send(`you have been muted for ***Spam*** by ***Mutie***`).catch(console.error);
            bot.channels.cache.get(`717807253519990982`).send(`***${message.member.displayName}*** has now been muted for 1m for ***Spam*** by ***Mutie***, their msg was ${lmsg}`)
            message.delete();
        } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
            }
        }
    }
    else {

        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            if(sender.roles.cache.has("717631710761844757"))
            sender.roles.remove("717631710761844757").catch(console.error);
            sender.roles.add("718154458131071106").catch(console.error);
            message.channel.send(`***${message.member.displayName}*** has been unmuted`);
            message.member.send(`you are no longer muted`).catch(console.error);
            bot.channels.cache.get(`717807253519990982`).send(`***${message.member.displayName}*** is no longer muted`);
        }, 60000);
            usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        });
    }
})
*/






bot.on('message', async message => {
    let msg = message.content.toLocaleLowerCase();
    let sender = message.member.displayName;
    let senderm =message.member;
    const time = `600000`;
    let Admin = message.guild.roles.cache.get("717547940880842753");
    let Mod = message.guild.roles.cache.get("717147286937010176");
    let Owner = message.guild.roles.cache.get("717462983231668255");
    let bots = message.guild.roles.cache.get("717600664133566565")
    if(message.member.roles.cache.has("717600664133566565")) return;
    for (x = 0; x < profanitities.length; x++) {
        if (msg.includes(profanitities[x])){
            await message.reply('You cannot say that here!')
            message.delete()
            message.reply(` was muted for 10min for saying profanities.`)
            senderm.send("You were muted by ***Mutie*** for 10min for saying profanities")
            senderm.roles.add("717631710761844757").catch(console.error)
            senderm.roles.remove("718154458131071106").catch(console.error)
            senderm.roles.remove("719241764879204392").catch(console.error);
            bot.channels.cache.get(`717807253519990982`).send(`***${sender}*** was muted for 10min for saying profanities "${msg}", if this was not their first time, increase mute time.`);
            setTimeout(function() {
                senderm.roles.add("718154458131071106")
                senderm.roles.remove("717631710761844757")
                senderm.roles.add("719241764879204392")
                bot.channels.cache.get(`717807253519990982`).send(`***${sender}*** was unmuted`)
                senderm.send(`Your mute is over`);
            }, ms(time))
        }
    }


    //points :D

    bot.on("message", message => {
        if (!message.content.startsWith(PREFIX)) return;
        if (message.author.bot) return;
      
        if (!points[message.author.id]) points[message.author.id] = {
          points: 0,
          level: 0
        };
        let userData = points[message.author.id];
        userData.points++;
      
        let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
        if (curLevel > userData.level) {
          // Level up!
          userData.level = curLevel;
          message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that shwifty?`);
        }
      
        if (message.content.startsWith(PREFIX + "level")) {
          message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
        }
        fs.writeFile("./points/points.json", JSON.stringify(points), (err) => {
          if (err) console.error(err)
        });

    })








})


bot.login(process.env.token);