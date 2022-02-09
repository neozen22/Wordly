import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";
import path from "path";
import fs from "fs";



export class WordleClient extends Client {
    commands: Collection<String, CommandType> = new Collection;
    constructor() {
        super( {intents: 32767});

        
    }
    start() {
        this.registerModules()
        this.login(process.env.bottoken)
    }
    
    async importFile(filePath:string) {
        return (await import(filePath))?.default; 
    }

    async registerCommands({commands, guildID}: RegisterCommandsOptions) {
        if (guildID){
            this.guilds.cache.get(guildID)?.commands.set(commands);
            console.log(`Registering commands to $(guildID)`)
        } else {
            this.application?.commands.set(commands);
            console.log(`Registering global commands...`)
        }
    }

    async registerModules() {
        // Commands
        const slashCommands:ApplicationCommandDataResolvable[] = []
        const commandFiles = fs.readdirSync(path.join(__dirname, '../commands/')).filter(x => x.endsWith('.js') || x.endsWith('.ts'))
        commandFiles.forEach(async fileName => {
            const command:CommandType = await this.importFile(path.join(__dirname, '../commands/', fileName))
            if (!command.name) {
                console.log(`${command} couldn't be pushed!`);
                return;
                
            };
            this.commands.set(command.name, command);
            console.log(`Command Pushed: ${command.name}`);
            slashCommands.push(command)
            
        })

        const eventFiles = fs.readdirSync(path.join(__dirname, '../events/')).filter(x => x.endsWith('.js') || x.endsWith('.ts'))
        
        eventFiles.forEach(async fileName => {
            const event: Event<keyof ClientEvents>  = await this.importFile(path.join(__dirname ,'../events',fileName ))
            this.on(event.event, event.run)
    })
    }

       
   }