import json
import discord
import asyncio
import requests

config = json.loads(open('secrets.json').read())

TOKEN = config["token"]

client = discord.Client()

@client.event
async def on_message(message):
    print('Checking if I\'m needed...')
    if message.author == client.user:
        return
    if message.content == '-npc':
        print('MAKING AN NPC Y\'ALL!')
        res = requests.get(config["apiUrl"])
        print(res.json())
        body = json.loads(res.json())
        await client.send_message(message.channel, body["sampleDesc@"])

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('--------')

client.run(TOKEN, bot=True)