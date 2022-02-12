import { ApplicationCommandData, ApplicationCommandDataResolvable, Client, ClientEvents, Collection, Intents } from "discord.js";
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";
import path from "path";
import fs from "fs";
import { timeout } from "cron";


enum letterCodes {
    a = "a",
    b = "b",
    c = "c",
    d = "d",
    e = "e",
    f = "f",
    g = "g",
    h = "h",
    i = "i",
    j = "j",
    k = "k",
    l = "l",
    m = "m",
    n = "n",
    o = "o",
    p = "p",
    q = "q",
    r = "r",
    s = "s",
    t = "t",
    u = "u",
    v = "v",
    w = "w",
    x = "x",
    y = "y",
    z = "z"
    }

enum colorCodes {
    gray = 'gray',
    green = 'green',
    yellow = 'yellow'
}
export const words: string[]= ["twist","stage","worth","twice","wield","candy","limit","taper","level","fluke","brawl","lucky","steam","shiny","voice","jaunt","venal","truck","hotel","agile",
"heart","adopt","apple","trial","their","yield","liter","knell","hoist","agile","start","draft","click","sport","speak","sweet","waist","apply","spare","abase",
"sight","final","lithe","brand","voice","honor","trash","trend","phone","badly","loyal","brood","brunt","group","worse","taper","trace","binge","smart","fresh",
"feign","great","scary","flood","enjoy","girth","loose","quite","until","snake","could","spice","group","marry","jeans","waste","adorn","shave","shape","steer",
"salty","flash","unity","float","swing","terse","apply","truck","shade","adept","sheep","organ","mouth","price","shelf","again","shelf","metal","forum","hoary",
"vapid","might","quack","music","tacit","thumb","cheap","horde","adorn","noisy","trash","girth","weird","range","verve","forte","adopt","smash","adorn","overt",
"bound","vital","local","cheap","means","drama","scene","aware","trend","state","knoll","north","hello","month","dozen","occur","doubt","title","brood","other",
"basic","essay","flesh","anger","mirth","elude","organ","index","edify","staff","armed","spite","valid","enemy","route","spite","total","total","toady","knock",
"table","chase","rapid","young","leery","salad","ounce","chain","awake","knell","utter","armed","ample","outer","draft","plant","below","study","candy","leery",
"decay","clear","blood","thief","blurt","unity","trace","chain","union","rural","ounce","shift","trick","spare","elegy","goods","about","goods","march","check",
"trick","rider","pithy","crack","sully","funny","goods","fluke","aside","usual","sugar","natty","bogus","river","dress","shout","youth","topic","guild","actor",
"whorl","spurn","knave","alone","steer","anger","ready","trial","human","jaded","chest","blurt","dally","crime","coast","trial","giddy","junta","heave","until",
"elect","boast","realm","speed","loose","noise","major","again","blurt","doubt","taper","means","spurn","stove","story","sheet","might","woman","first","ennui",
"style","smash","learn","lucky","tacit","break","gorge","jaded","force","shoot","chair","nurse","trick","crisp","board","honor","stone","awful","first","feral",
"press","dying","royal","shape","short","spice","happy","break","basis","feral","watch","fresh","event","moral","forte","fault","brawl","moral","blurt","thing",
"ample","angry","pithy","joint","scary","gaunt","mouse","ennui","spare","venal","arise","count","serve","realm","piano","power","chief","mores","smart","cable",
"amuse","jaded","radio","adapt","drive","queen","press","spite","lucid","grass","claim","glove","quell","movie","decay","cough","cease","taunt","sugar","block",
"goods","bunch","lie 1","steep","extol","range","magic","delay","brawn","overt","slice","along","dream","plane","lucky","novel","diary","quaff","self-","hoist",
"order","niche","quiet","heave","skirt","wheel","wreak","steep","empty","carry","guest","fatal","every","where","under","pride","while","stage","smell","total",
"below","dress","crowd","marry","until","sheet","woman","earth","worth","paint","faith","chair","belie","shape","sheet","essay","edict","board","sight","teach",
"steel","speed","funny","crash","quell","human","scary","tower","march","shout","belie","stoic","girth","glove","logic","eager","climb","wrist","happy","troop",
"odium","major","glove","black","trial","forum","judge","shall","nadir","error","rough","dally","jaunt","grand","havoc","venue","plate","slack","clock","onion",
"right","buyer","guise","crowd","stage","shame","overt","worth","agile","teach","front","whole","chair","shock","edify","spicy","cower","can 2","virus","craft",
"novel","knife","earth","verve","spell","place","aside","hoard","query","sugar","screw","atone","brood","worth","yahoo","adorn","loyal","cross","vital","touch",
"flash","spoon","dirty","dwell","aloof","hover","wrong","alone","prize","whorl","solve","prior","adept","genre","blase","bound","wreak","wreak","apple","enjoy",
"clean","niece","means","crowd","sweat","verve","banal","mirth","punch","never","ounce","brash","quell","apart","forte","verve","knave","trace","buyer","float",
"march","yield","usual","table","belie","drunk","dream","depth","print","ready","round","elbow","nomad","alter","inter","bound","point","guild","fresh","large",
"motif","knoll","fluke","after","staff","token","vital","reach","split","agile","vapid","horde","sense","float","spend","cycle","cross","blurt","wield","solid",
"atone","union","nomad","taste","would","joint","usual","photo","which","agile","abhor","augur","brawn","wispy","lie 1","after","legal","messy","local","media",
"tenet","spend","score","bogus","nurse","abhor","idiom","lurid","plain","gloat","steam","again","dally","world","crisp","media","lie 1","scale","nadir","binge",
"union","label","grain","stare","heave","adopt","month","flail","enter","awake","cruel","steam","swing","abase","phase","learn","imply","sense","smash","event",
"daily","level","click","towel","trick","quack","actor","bored","mirth","hotel","cover","human","staff","smell","means","agree","agent","scale","vital","spend",
"annoy","sorry","fixed","total","valor","begin","maxim","about","fully","abase","april","drink","share","valid","study","weary","below","qualm","edict","urban",
"depth","blade","brief","screw","exult","enemy","blame","inane","cover","silly","sweat","rapid","agile","cloud","offer","elbow","exact","overt","spell","whose",
"exalt","broad","sound","abhor","check","shall","death","there","grade","erode","vital","plant","thank","can 1","beard","maybe","ennui","valor","amuse","heavy",
"venue","honor","feign","tacit","beach","graze","waste","upset","crime","boast","means","wince","track","music","large","cheap","inane","ideal","light","stuff",
"usual","wheel","acute","order","offer","fever","witty","unity","vague","fixed","faith","habit","inure","since","wreak","pause","grant","blade","gamut","steel",
"depth","outer","torso","blind","lithe","total","knoll","basic","oddly","blade","paper","trash","mores","slice","metal","april","fresh","usual","anger","world",
"refer","title","exalt","anger","focus","adept","magic","refer","usury","spell","loyal","brunt","flora","cable","crack","match","shiny","augur","crisp","wince",
"niece","blare","cross","wharf","curve","grain","float","wharf","foray","pound","craft","funny","hovel","mores","proud","jaunt","catch","alarm","lunch","steal",
"yours","tract","wring","worse","hotel","ruler","tooth","voice","quick","unity","graft","staff","lover","crowd","paint","react","vital","frail","color","adopt",
"shout","place","query","wield","venue","cover","usurp","court","mixed","minor","happy","genre","exact","spend","flail","coach","again","queue","inure","proof",
"dwell","drunk","guard","drink","theme","abase","troop","vapid","toady","point","inane","gaunt","bunch","every","sweet","trash","staff","dozen","mouse","mirth",
"essay","stock","pithy","venue","foyer","track","stare","gaudy","maven","mores","gloat","silly","mixed","click","event","first","edict","inane","dream","world",
"unity","found","knoll","imply","terse","blade","alarm","proud","junta","eager","enemy","novel","means","blase","sting","april","shame","proud","rapid","burst",
"sight","strip","lunch","speed","table","quell","swell","cover","route","study","phone","urban","magic","flour","frame","inane","breed","lie 1","trite","hobby",
"noisy","blurt","trust","gorge","outer","yield","inane","atone","party","guide","rural","sharp","annoy","flood","spare","radio","raise","brawn","logic","brash",
"blond","paper","onion","bland","spoon","groom","proof","smoke","wring","admit","drunk","shake","stage","laugh","quote","quaff","sweep","maxim","plain","tacit",
"watch","learn","sully","oasis","reply","truck","abhor","slice","piano","shame","usurp","human","train","sheep","heart","valid","awake","legal","score","knife",
"plain","bleak","worth","brash","punch","staff","react","hover","silly","match","throw","wince","niche","acute","major","think","floor","fruit","grant","death",
"nerve","horse","nadir","grain","tight","climb","earth","dirge","shirt","guide","edify","livid","spicy","cream","scene","start","realm","block","sheep","anger",
"wrist","clerk","pound","staff","start","today","major","quell","glove","lurid","realm","banal","think","crash","would","april","trace","swell","april",
]

 export const EMOJI_CODES = {
     green: {
        a: '<:green_a:942129436864692284>',
        b: '<:green_b:942129436520767591>',
        c: '<:green_c:942129436915019806>',
        d: '<:green_d:942129436889845840>',
        e: '<:green_e:942129436868878417>',
        f: '<:green_f:942129437082804334>',
        g: '<:green_g:942129436894056508>',
        h: '<:green_h:942129436864684042>',
        i: '<:green_i:942129436738863187>',
        j: '<:green_j:942129436910813234>',
        k: '<:green_k:942129437133111426>',
        l: '<:green_l:942129437124722708>',
        m: '<:green_m:942129436994732062>',
        n: '<:green_n:942129436998893578>',
        o: '<:green_o:942129436805980191>',
        p: '<:green_p:942129436801769535>',
        q: '<:green_q:942129437061820546>',
        r: '<:green_r:942129436717887540>',
        s: '<:green_s:942129437212827679>',
        t: '<:green_t:942129437212823582>',
        u: '<:green_u:942160642427744306>',
        v: '<:green_v:942129437175078972>',
        w: '<:green_w:942129436810166333>',
        x: '<:green_x:942129436864700498>',
        y: '<:green_y:942129437267329104>',
        z: '<:green_z:942160642377396284>'
     },
     yellow: {
        a: '<:yellow_a:942160674581250110>',
        b: '<:yellow_b:942160675034239046>',
        c: '<:yellow_c:942160674749034517>',
        d: '<:yellow_d:942160674921013328>',
        e: '<:yellow_e:942160674614824971>',
        f: '<:yellow_f:942160675013263441>',
        g: '<:yellow_g:942160674941980692>',
        h: '<:yellow_h:942160674992316456>',
        i: '<:yellow_i:942160674983915520>',
        j: '<:yellow_j:942160674757419009>',
        k: '<:yellow_k:942160674828718080>',
        l: '<:yellow_l:942160674837102712>',
        m: '<:yellow_m:942160674795171891>',
        n: '<:yellow_n:942160674728050789>',
        o: '<:yellow_o:942160674895826964>',
        p: '<:yellow_p:942160674832920627>',
        q: '<:yellow_q:942160675122339860>',
        r: '<:yellow_r:942160675155894333>',
        s: '<:yellow_s:942160674786791524>',
        t: '<:yellow_t:942160674849685524>',
        u: '<:yellow_u:942160674795167795>',
        v: '<:yellow_v:942160675042643968>',
        w: '<:yellow_w:942160674828726332>',
        x: '<:yellow_x:942160674895855686>',
        y: '<:yellow_y:942160674904223764>',
        z: '<:yellow_z:942160674988105789>'
     },
     
     gray: {
        a: "<:gray_a:942128589191675914>",
        b: "<:gray_b:942128615452188774>",
        c: "<:gray_c:942128648130007070>",
        d: "<:gray_d:942128688168857610>",
        e: "<:gray_e:942128713519210527>",
        f: "<:gray_f:942128736361410571>",
        g: "<:gray_g:942128771283161129>",
        h: "<:gray_h:942128801763196969>",
        i: "<:gray_i:942128828120203325>",
        j: "<:gray_j:942128882474156082>",
        k: "<:gray_k:942128909934280745>",
        l: "<:gray_l:942128930826100746>",
        m: "<:gray_m:942128960916033558>",
        n: "<:gray_n:942128995699408896>",
        o: "<:gray_o:942129032152117248>",
        p: "<:gray_p:942129055673774081>",
        q: "<:gray_q:942129082949312523>",
        r: "<:gray_r:942129123596316702>",
        s: "<:gray_s:942129149424828487>",
        t: "<:gray_t:942129180601110568>",
        u: "<:gray_u:942129199748112455>",
        v: "<:gray_v:942129219616534611>",
        w: "<:gray_w:942129256597696562>",
        x: "<:gray_x:942129287950106694>",
        y: "<:gray_y:942129318417543178>",
        z: "<:gray_z:942129358187950090>"
     }
 }

export class Game{
    word: string
    letterIntensityMap: Map<string, number>;
    constructor(){
        this.word = words[this.getRandomInt()]
       
        this.letterIntensityMap  = new Map()
        Array.from(this.word).forEach(letter => {
            
                let currentValue = this.letterIntensityMap.get(letter);
                if (!currentValue) currentValue = 0 
                this.letterIntensityMap.set(letter, currentValue + 1 )
                console.log("old letter. Letter count: " + this.letterIntensityMap.get(letter)?.toString());
                
                
            }
        );
    }

        
        getRandomInt() {
            let min:number = 0
            let max:number = words.length
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
          }
        
        checkWord = (guessWord:string, answer:string): string => {
        
            const guessArray = Array.from(guessWord)
            const answerArray = Array.from(answer)
            let answerWord:string = ''
            
            let tempIntensityMap = new Map(this.letterIntensityMap)
            
            for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
                const guessLetter = guessArray[letterIndex];
                const answerLetter = answerArray[letterIndex];
                const currentValue = tempIntensityMap.get(guessLetter)
                if (currentValue && currentValue > 0){
                        if (guessLetter == answerLetter){

                        answerWord += EMOJI_CODES.green[guessLetter as letterCodes]
                        tempIntensityMap.set(guessLetter, currentValue - 1 )
                        continue
                        
                    }
                       else {
                        console.log(guessLetter + " " + answerLetter    );
                        answerWord += EMOJI_CODES.yellow[guessLetter as letterCodes]
                        tempIntensityMap.set(guessLetter, currentValue - 1 )
                        continue
                        }
                }
            else answerWord += EMOJI_CODES.gray[guessLetter as letterCodes]
                
                
            }
            if (answerWord.includes('undefined')){
                return 'You Typed in restricted characters!'}
            
            
            return answerWord
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