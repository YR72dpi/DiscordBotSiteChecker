import {Client, GatewayIntentBits} from "discord.js";
import screenshot from './script/screenshot.js';
import * as fs from 'node:fs';
import axios from 'axios';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const TOKEN = String(fs.readFileSync("config/token.txt")).replace(" ", "")
const URL = String(fs.readFileSync("config/url.txt"))
const CHANNEL = String(fs.readFileSync("config/channel.txt"))
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

if (!fs.existsSync("screenshot")) {
    fs.mkdirSync("screenshot")
}

client.on("ready", async () => {
    console.log("Discord Bot Ready")
    await axios.get(URL).then(async (resp) => {
        let discordMessageStatus = "Status Code : " + String(resp.status)
        console.log(resp.status)
        if (resp.status == 200) {
            const channelId = client.channels.cache.find(channel => channel.name == CHANNEL).id
            await screenshot(URL).then((image) => {
                let discordMessageHeader = " === Reporting for " + URL + " === \n"

                client.channels.cache.get(channelId).send({
                    content: discordMessageHeader + discordMessageStatus,
                    files: [
                        {
                            attachment: "./" + image
                        }
                    ]
                }).then(() => {
                    console.log("END")
                    process.exit(0)
                })
            })

        }
    });
})


client.login(TOKEN)
