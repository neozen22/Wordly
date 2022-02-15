import { ApplicationCommandData, ApplicationCommandDataResolvable, Client, ClientEvents, Collection, EmbedField, GuildCacheMessage, GuildMember, Intents, Message, MessageEmbed, User } from "discord.js";
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";
import path from "path";
import fs from "fs";
import { timeout } from "cron";
import { createEmbed } from "../events/messageCreate";
import {EMOJI_CODES, letterCodes, words, colorCodes} from "../utils/constants"


export let allWords:string[] = []
fs.readFile('./src/data/allwords.txt', function(err, data) {
    if(err) throw err;
    allWords = data.toString().split("\r\n");
    
    }
);





export class Game{
    word: string
    testWord: string
    usedLetters: string;
    gameEmbed: MessageEmbed
    gameState: boolean | null;
    letterIntensityMap: Map<string, number>;
    user: User
    round: number
    game: Message | undefined
    constructor(user: User){
        this.user = user
        this.word = words[this.getRandomInt()]
        this.testWord = "abbca" 
        this.letterIntensityMap  = new Map()
        this.usedLetters = "No used Letters"
        this.gameEmbed = createEmbed([{name:"Used Letters", value: this.usedLetters,  inline:false}], undefined, (((":white_medium_square:").repeat(5)) + "\n").repeat(6), undefined, {name:user.username, iconURL:user.avatarURL({dynamic:true}) as string})
        this.round = 0
        this.gameState = null
        this.game = undefined
        console.log(this.word);
        

        ;
    }

        
        getRandomInt() {
            let min:number = 0
            let max:number = words.length
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
          }
        
}


export class WordleClient extends Client {
    sessionMembers: Map<string, Game>;
    commands: Collection<String, CommandType> = new Collection;
    constructor() {
        super( {intents: [
                'GUILDS','GUILD_MEMBERS',
                'GUILD_EMOJIS_AND_STICKERS','GUILD_INTEGRATIONS',
                'GUILD_WEBHOOKS','GUILD_INVITES',
                'GUILD_VOICE_STATES','GUILD_PRESENCES',
                'GUILD_MESSAGES','GUILD_MESSAGE_REACTIONS',
                'GUILD_MESSAGE_TYPING','DIRECT_MESSAGES',
                'DIRECT_MESSAGE_REACTIONS','DIRECT_MESSAGE_TYPING',
                'GUILD_SCHEDULED_EVENTS','GUILD_BANS'],
                partials: ['USER' , 'CHANNEL' , 'GUILD_MEMBER' , 'MESSAGE' , 'REACTION' , 'GUILD_SCHEDULED_EVENT']});
        this.sessionMembers = new Map;
        
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