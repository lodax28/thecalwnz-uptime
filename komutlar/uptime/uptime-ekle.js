const Discord = require("discord.js")
const moment = require('moment');
moment.locale('tr');
exports.run = async(client, message, args, db) => {
   
    const link = args[0]
    const linkler = db.fetch("uptimelink")
 
    if(db.fetch(`uptimelimit_${message.author.id}`) > 10) {
        const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Uptime limitinize ulaştınız!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
        }

    if(!link) {
const yardım = new Discord.MessageEmbed()
.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
.setColor(client.ayarlar.renk)
.setDescription(`
Eğer bir websitesini uptime etmek istiyorsan link belirt!
`)
.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
return message.channel.send(yardım)
    } 

    if(!link.startsWith("https://")) {
    const yardım = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.renk)
    .setDescription(`
    Linklerin başında \`https://\` olmalıdır!
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(yardım)
    } 

    if(!link.endsWith("glitch.me/")) {
    const yardım = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.renk)
    .setDescription(`
    Linklerin sonunda \`glitch.me/\` olmalıdır!
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(yardım)
    } 

    if(linkler) {
        if(linkler.find(a => a.site === link)) {
            const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Sistemimde böyle bir link zaten ekli!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
        }
    }

     

    db.push(`uptimelink`, { site: link, sahipID: message.author.id, sahipTag: message.author.tag, sahipName: message.author.username, eklenmeTarihi: moment(Date.now()).format('DD/MM/YYYY HH:mm') })
    db.add(`uptimelimit_${message.author.id}`, 1)
    const yardım = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.renk)
    .setDescription(`
    Başarılı bir şekilde belirttiğiniz site sistemimize eklendi.
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(yardım)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uptimeekle"]
}

exports.help = {
  name: "uptime-ekle",
  description: "uptime eklersiniz",
  usage: "uptime-ekle site"
}