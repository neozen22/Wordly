import { ApplicationCommandData, ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
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

    async registerCommands({commands, guildId}: RegisterCommandsOptions) {
        if (guildId){
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`)
        } else {
            console.log(`Registering global commands...`)
            this.application?.commands.set(commands)
            .catch(console.error)
            
            
            
        }
    }

    async registerModules() {
        // Commands
        const slashCommands:Array<ApplicationCommandData> = []
        const commandFiles = fs.readdirSync(path.join(__dirname, '../commands/')).filter(x => x.endsWith('.js') || x.endsWith('.ts'))
        commandFiles.forEach(async fileName => {
            const command:CommandType = await this.importFile(path.join(__dirname, '../commands/', fileName))

        
            if (!command.name) {
                console.log(`${command} couldn't be pushed!`);
                return;
                
            };
            this.commands.set(command.name, command);
            slashCommands.push(command)
            console.log(`Command Pushed: ${command.name}`);
            
        })

        const eventFiles = fs.readdirSync(path.join(__dirname, '../events/')).filter(x => x.endsWith('.js') || x.endsWith('.ts'))
        
        eventFiles.forEach(async fileName => {
            const event: Event<keyof ClientEvents>  = await this.importFile(path.join(__dirname ,'../events',fileName ))
            this.on(event.event, event.run)
    })
    this.on("ready", () => {    
        this.registerCommands({
            commands: slashCommands
            
        })
    });
    }

       
   }