const Discord = require('discord.js');
const client = new Discord.Client();
const HytaleApi = require('hytale-api-sdk');
const api = new HytaleApi.ArticlesApi();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.content === '!ping') {
        msg.reply('pong');
        console.log('!ping');
    }
    if (msg.content === '!blog') {
        console.log('!blog');
        // eslint-disable-next-line no-unused-vars
        api.getArticles({}, function(error, data, response) {
            if (error) {
                console.error(error);
            }
            else {
                    const latest = data.slice(0, 1);
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

                        msg.channel.send(embed);
                    });
                }
            });
        }
});

client.login(process.env.token);
