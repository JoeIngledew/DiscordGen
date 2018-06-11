const Discord = require("discord.js");

const client = new Discord.Client();

const request = require('request')

const config = require("./config.json");

const secrets = require("./secrets.json")

client.on("ready", () => {
    console.log("bot has started!");
});

client.on("message", async message => {
    if (message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "gen") {
        request(secrets.apiUrl, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            message.delete().catch(O_o=>{});
            message.channel.send(body.sampleDesc);
        })
    }
    else {
        message.delete().catch(O_o=>{});
        message.channel.send("did not recognise your request! sorry!");
    }
});

client.login(secrets.token);