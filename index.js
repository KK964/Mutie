require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
require("dotenv-flow").config();
const createCaptcha = require('./captcha');
//fs
const fs = require('fs');

const config = {
    token: process.env.TOKEN
};


//capthca
bot.on('guildMemberAdd', async member => {
    await member.roles.add('717807186431967413');
    const captchaJFailedEmbed = new Discord.MessageEmbed()
.setColor(`#A62019`)
.setDescription(`**${member.displayName}** has failed captcha`);
const captchaSuccessEmbed = new Discord.MessageEmbed()
.setColor(`#29ac4c`)
.setDescription(`**${vm.displayName}** has passed captcha`);
    const captcha = await createCaptcha();
    if(member == null){return};
    try {
        const msg = await member.send('You have 60 seconds to solve the captcha', {
            files: [{
                attachment: `${__dirname}/captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send('You entered the captcha incorrectly, please retry.');
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time']});
            if(response) {
                await msg.channel.send('You have verified yourself! Go get your roles in **#role-colors**! :D');
                bot.channels.cache.get(`717807253519990982`).send(captchaSuccessEmbed);
                await member.roles.remove('717807186431967413');

            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time. Please type "!verify" in #get-out-of-quarantine.');
            await fs.unlink(`${__dirname}/captchas/${captcha}.png`, (err) => {
                if (err) throw err;
            })
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        bot.channels.cache.get(`717807253519990982`).send(captchaJFailedEmbed)
        console.log(err);
    }
});
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

const ms = require('ms');
var profanitities = ["fag", "faggot", "trannie", "kys", "kill your self", "nigger", "nibba", "nigga", "testtsaedwadadwadwaudawhdawudhaduh"];
const PREFIX = '!';

const usersMap = new Map();

bot.on('ready', () => {
    console.log('Mutie is now active :D');
    bot.user.setActivity(`the homophobic like a damn fiddle`)
})







bot.on('message', async message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        
        //verify
        case 'verify':
            const vm = message.member;
            const captchaFailEmbed = new Discord.MessageEmbed()
            .setColor(`#A62019`)
            .setDescription(`**${vm.displayName}** has failed captcha`);
            const captchaSuccessEmbed = new Discord.MessageEmbed()
            .setColor(`#29ac4c`)
            .setDescription(`**${vm.displayName}** has passed captcha`);
            const captcha = await createCaptcha();
            if(vm == null){return};
            if(message.channel.id !== '717865343858770002') {
                message.react('❌')
                return;
            };
            try {
                message.react('✅')
                const msg = await vm.send('You have 60 seconds to solve the captcha', {
                    files: [{
                        attachment: `${__dirname}/captchas/${captcha}.png`,
                        name: `${captcha}.png`
                    }]
                });
                try {
                    const filter = m => {
                        if(m.author.bot) return;
                        if(m.author.id === vm.id && m.content === captcha) return true;
                        else {
                            m.channel.send('You entered the captcha incorrectly, please retry.');
                            return false;
                        }
                    };
                    const response = await msg.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time']});
                    if(response) {
                        await msg.channel.send('You have verified yourself! Go get your roles in **#role-colors**! :D');
                        bot.channels.cache.get(`717807253519990982`).send(captchaSuccessEmbed);
                        await vm.roles.remove('717807186431967413');
                        message.delete();
                    }
                }
                catch(err) {
                    console.log(err);
                    await msg.channel.send('You did not solve the captcha correctly on time. Please type "!verify" in #get-out-of-quarantine.');
                    message.delete();
                    await fs.unlink(`${__dirname}/captchas/${captcha}.png`, (err) => {
                        if (err) throw err;
                    })
                            .catch(err => console.log(err));
                }
            }
            catch(err) {
                bot.channels.cache.get(`717807253519990982`).send(captchaFailEmbed)
                console.log(err);
            }
        break};
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

});

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
    if(message.channel.id == '719078243369615361') {
        message.react('✅')
        .then(message.react('❌'));
    }
//kk summon
    if(message.author.bot) return;
    let msg = message.content.toLocaleLowerCase();
    let senderm = message.members;
    let KK964 = bot.users.cache.get('426892116258717707')
    var kk = ["kk"]
    if(message.author == null){return};
    if(message.webhookID){return};
    let sender = message.member;
    for (x = 0; x < kk.length; x++) {
        if (msg.includes(kk[x])){
            KK964.send(`${sender} says ${msg}.`)
        }
    }
    const time = `600000`;
    if(message.author.bot) {return};


//profanity filters
    if(message.author.bot) {return};
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
})

bot.login(config.token);