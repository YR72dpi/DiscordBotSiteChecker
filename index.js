import {Client, GatewayIntentBits} from "discord.js";
import screenshot from './script/screenshot.js';
import * as fs from 'node:fs';
import axios from 'axios';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

const URL = "http://www.ylanrousselle.fr/";
var discordMessage = " === Reporting for " + URL + " === \n"

if (!fs.existsSync("screenshot")) {
    fs.mkdirSync("screenshot")
}

client.on("ready", async () => {
    console.log("Discord bot ready")


    await axios.get(URL).then(async (resp) => {
        let discordMessageStatus = "Status Code : " + String(resp.status)
        console.log(resp.status)
        if (resp.status == 200) {
            const channelId = client.channels.cache.find(channel => channel.name == "portfolio-care").id
            await screenshot(URL).then((image) => {
                client.channels.cache.get(channelId).send({
                    content: discordMessage + discordMessageStatus,
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


client.login("MTA3MjI1ODA0ODY2OTc4NjEzMg.Gt2u6g.LmpsvkWBINsafsUsT_MlogkloiCwwyD4jdLPG0")
