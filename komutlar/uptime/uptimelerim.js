const Discord = require("discord.js")
const moment = require('moment');
moment.locale('tr');
exports.run = async(client, message, args, db) => {
    
    const linkler = db.fetch("uptimelink")
    
    if(!linkler) {
        const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Hata!
        Sistemimde hiç bir site yok.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
    }

    if(!linkler.filter(a => a.sahipID === message.author.id)) {
        const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Hata!
        Sistemimde sana ait bir site bulamadım.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
    }

    const yardım = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.renk)
    .setDescription(`
    Senin şuanda **${linkler.filter(a => a.sahipID === message.author.id).length}/10** Adet siten uptime ediliyor.

    ${linkler.filter(a => a.sahipID === message.author.id).map((a, i) => `${i + 1} - **[Tıkla](${a.site})** [Eklenme Tarihi: **${a.eklenmeTarihi}**]`).splice(0, 10).join("\n")}
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(yardım)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uptime-lerim"]
}

exports.help = {
  name: "uptimelerim",
  description: "uptimelerinizi gösterir",
  usage: "uptimelerim"
}