const Discord = require("discord.js")
const moment = require('moment');
moment.locale('tr');
exports.run = async(client, message, args, db) => {
   
    const link = args[0]
     
    const linkler = db.fetch("uptimelink")
    
    if(!link) {
        const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Hata!
        Kaldırılacak linki gir lütfen.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
    }

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
  /*  let a = linkler.filter(sa => sa.sahipID === message.author.id)

    if(!a.includes(mk => mk.site === site)) {

    }*/

    if(!linkler.find(a => a.site === link)) {
        const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Hata!
        Sistemimde böyle bir link bulamadım.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
    }
    
    if(!linkler.filter(a => a.sahipID === message.author.id).find(c => c.site === link)) {
        const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Hata!
        Sistemimde belirttiğin link sana ait değil.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
    }
    
     

    if(linkler.filter(a => a.sahipID === message.author.id)) {
         if(linkler.length === 1) {
            db.delete("uptimelink")
            db.subtract(`uptimelimit_${message.author.id}`, 1)
            const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Başarılı!
        Başarılı bir şekilde belirttiğiniz siteyi sistemimden kaldırdım.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
         } else {
            db.set("uptimelink", linkler.filter(s => s.site !== link))
            db.subtract(`uptimelimit_${message.author.id}`, 1)
            const yardım = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.renk)
        .setDescription(`
        Başarılı!
        Başarılı bir şekilde belirttiğiniz siteyi sistemimden kaldırdım.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(yardım)
         }
    }


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uptimekaldır"]
}

exports.help = {
  name: "uptime-kaldır",
  description: "uptime kaldırırsınız",
  usage: "uptime-kaldır site"
}