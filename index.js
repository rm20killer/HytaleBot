/* eslint-disable no-inline-comments */
const Discord = require('discord.js');
const client = new Discord.Client();
const HytaleApi = require('hytale-api-sdk');
const api = new HytaleApi.ArticlesApi();
const prefix = '!';
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;
    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix

    if(cmd === 'ping') {
        msg.reply('pong');
        console.log('!ping');
    }
    if(cmd === 'madeby') {
        console.log('!madeby');
        msg.channel.send('this was made by RM20');
    }

    if(cmd === 'blog') {
        var input1 = `${args[1]}`
        console.log(input1)
        var x=0
        if (!args[1]) {
            api.getArticles({}, function(error, data, response) {
            const latest = data.slice(0, 1);
            console.log("getting api",1)
            latest.forEach(function(article) {
                const publishAt = new Date(article.publishedAt);
                const embed = new Discord.MessageEmbed()
                    .setColor(3447003)
                    .setThumbnail(`https://hytale.com/m/variants/blog_thumb_${article.coverImage.s3Key}`)
                    .setAuthor('Hytale', 'https://cdn.discordapp.com/attachments/741665332808122469/741685930401857596/G-O9yHTX.jpg')
                    .setTitle(article.title)
                    .setDescription(article.bodyExcerpt)
                    .setURL(`https://hytale.com/news/${publishAt.getFullYear()}/${publishAt.getMonth() + 1}/${article.slug}`)
                    .addField('Published At', `${publishAt.toLocaleDateString()}`)
                ;
                console.log("passed getting api")
                msg.channel.send(embed);
               })
            })
        }
        if(Number(input1) > 3){
            msg.channel.send("too high number")
        }
        else {
        msg.channel.send(`getting ${args[1]} blog post`);

        api.getArticles({}, function(error, data, response) {
            const latest = data.slice(0, `${args[1]}`);
            console.log("getting api",`${args[1]} `)
            latest.forEach(function(article) {
                const publishAt = new Date(article.publishedAt);
                const embed = new Discord.MessageEmbed()
                    .setColor(3447003)
                    .setThumbnail(`https://hytale.com/m/variants/blog_thumb_${article.coverImage.s3Key}`)
                    .setAuthor('Hytale', 'https://cdn.discordapp.com/attachments/741665332808122469/741685930401857596/G-O9yHTX.jpg')
                    .setTitle(article.title)
                    .setDescription(article.bodyExcerpt)
                    .setURL(`https://hytale.com/news/${publishAt.getFullYear()}/${publishAt.getMonth() + 1}/${article.slug}`)
                    .addField('Published At', `${publishAt.toLocaleDateString()}`)
                ;
                console.log("passed getting api")
                msg.channel.send(embed);
               })
            })
        }
        

    }
});

client.login(process.env.token);
