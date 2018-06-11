var Discord = require('discord.io');
var config = require("./config.json");
var secrets = require("./secrets.json");
var request = require('request')

console.log("Starting bot...");

var client = new Discord.Client({
    token: secrets.token
});

client.on('ready', function() {
    console.log("bot has started as %s - %s!\n", client.username, client.id);
});

client.on('message', function(user, userID, channelID, message, event) {
    if (message === "-gen") {
        request(secrets.apiUrl, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            client.sendMessage({
                to: channelID,
                message: body.sampleDesc
            });
        })
    }
});

client.connect();

console.log("Bot has logged in!");