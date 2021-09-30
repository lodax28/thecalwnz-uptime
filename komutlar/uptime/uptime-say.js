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
 
    const yardım = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.renk)
    .setDescription(`
    Şuanda sistemimde **${linkler.length}** Adet website barındırılıyor.
    Bunlardan **${linkler.filter(sa => sa.sahipID === message.author.id).length}** Tanesi senin.
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(yardım)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uptime-say"]
}

exports.help = {
  name: "uptimesay",
  description: "uptime sayısını gösterir",
  usage: "uptimesay"
}