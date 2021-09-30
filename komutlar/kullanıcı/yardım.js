const Discord = require("discord.js")
exports.run = async(client, message, args, db) => {
  
const yardım = new Discord.MessageEmbed()
.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
.setColor(client.ayarlar.renk)
.setDescription(`
:white_small_square: | Hakkımızda;
» | 2019 Ekim ayında kurulan WhYBoLu Development Grubu, kullanıcılarına hizmet vermeye devam ediyor.

:white_small_square: | Bilgilendirme;
» | Uptime Bot Altyapısı TheClawNz#6717 Tarafından WhYBoLu Development İçin yapılmıştır. 
`)
.addField(":white_small_square: | Kullanıcı Komutlar;", `
\`yardım\`, \`istatistik\`
`)
.addField(":white_small_square: | Uptime Komutlar;", `
\`uptime-ekle\`, \`uptime-kaldır\`, \`uptimelerim\`, \`uptime-say\`
`)
.addField(":link: | Linkler:", `• [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) •`)
//.setImage("https://cdn.discordapp.com/attachments/770993786628341761/778364951546036264/standard_14.gif")
.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
return message.channel.send(yardım)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"]
}

exports.help = {
  name: "yardım",
  description: "yardım menüsü",
  usage: "yardım"
}