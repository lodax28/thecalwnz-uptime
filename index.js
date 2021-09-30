const Discord = require("discord.js")
const Intents = require("discord.js")
const client = new Discord.Client({ disableMentions: "everyone", ws: { intents: Intents.ALL } });
const efdb = require("efdb");
const db = new efdb({
  "databaseName": "database",
  "databaseFolder": "databases",
  "adapter":"YamlDB",
  "autoFile": true
});
const fs = require("fs")
const fetch = require("node-fetch");

client.ayarlar = {
  "token": "",//Botunuzun tokeni
  "prefix": "Bot Prefixi",
  "renk": "Embed Rengi",
  "botİsim": "Bot Adı",
  "embedRenk": "Embed Rengi",
  "embedFooter": "Copyright © WhYBoLu Development 2020 | https://discord.gg/Qp8h8mjdAW",//Bu kısmı değiştirirseniz gereken yaptırımlar uygulanır.
  "version": "Bot Sürümü",
  "destek": "https://discord.gg/Qp8h8mjdAW",//Botun destek sunucusu
  "website": "https://google.com/"//varsa eğer botun websitesi yoksa kalsın burası
}
  
client.on("ready", () => {
  console.log("Aktif")
  client.user.setActivity(`Uptime Bot | By TheClawNz#7987`)
})
 
client.on("warn", warn => {
  console.log(`Bir Uyarı Belirdi: ${warn}`)
})

client.on("error", error => {
  console.log(`Bir Hata Çıktı: ${error}`)
})
 
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync('./komutlar').forEach(dir => {
  fs.readdir(`./komutlar/${dir}/`, (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      let props = require(`./komutlar/${dir}/${f}`);
      console.log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
})

client.on("message", async message => {
        if(message.author.bot) return;
        if(!message.guild) return;
        if(message.channel.type === "dm") return;
        let prefix = client.ayarlar.prefix
        if (!message.content.startsWith(prefix)) return;
        let command = message.content.split(' ')[0].slice(prefix.length);
        let params = message.content.split(' ').slice(1);
        let cmd;
        if (client.commands.has(command)) {
          cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
          cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {
          cmd.run(client, message, params, prefix, db);
        }
})
  

setInterval(() => {
  const linkler = db.fetch('uptimelink');
  if(linkler) {
  if(linkler.length > 0) {
  linkler.forEach(s => {
  fetch(s.site).catch(err => {
  console.log('');
  console.log(`${s.site} hata verdi. Sahibi: ${s.sahipTag}`);
  console.log('');
  })
  console.log(`${s.site} uptime edildi. Sahibi: ${s.sahipTag}`);
  })
  }
 }
}, 60000)


client.login(client.ayarlar.token)