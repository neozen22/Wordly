import { Collection, CommandInteractionOptionResolver, Emoji } from "discord.js";
import { ApplicationCommandTypes } from "discord.js/typings/enums";
import { Command } from "../stuructures/Command";
import { CommandType } from "../typings/Command";
import utils from '../utils/utils';


const EMOJI_CODES = {
    green: {
        a: "<:1f1e6:938280353527906325>",
        b: "<:1f1e7:938280353515315242>",
        c: "<:1f1e8:938280353850875928>",
        d: "<:1f1e9:938280353657929799>",
        e: "<:1f1ea:938280354064785478>",
        f: "<:1f1eb:938280353838276609>",
        g: "<:1f1ec:938280353968291860>",
        h: "<:1f1ed:938280353871839232>",
        i: "<:1f1ee:938280354010239016>",
        j: "<:1f1ef:938280353876021328>",
        k: "<:1f1f0:938280354148675614>",
        l: "<:1f1f1:938280353611780107>",
        m: "<:1f1f2:938280353783775244>",
        n: "<:1f1f3:938280353670504489>",
        o: "<:1f1f4:938280354018656316>",
        p: "<:1f1f5:938280353884414012>",
        q: "<:1f1f6:938280354253537321>",
        r: "<:1f1f7:938280354022850561>",
        s: "<:1f1f8:938280354089947146>",
        t: "<:1f1f9:938280353691476010>",
        u: "<:1f1fa:938280353968304138>",
        v: "<:1f1fb:938280353976696882>",
        w: "<:1f1fc:938280353502752850>",
        x: "<:1f1fd:938280354043789382>",
        y: "<:1f1fe:938280840796995638>",
        z: "<:1f1ff:938280841199616000>",
    },
    yellow: {
        a: "<:1f1e6:938280773906227230>",
        b: "<:1f1e7:938280773910409256>",
        c: "<:1f1e8:938280774057197639>",
        d: "<:1f1e9:938280773918806066>",
        e: "<:1f1ea:938280776057905152>",
        f: "<:1f1eb:938280773977505832>",
        g: "<:1f1ec:938280774006878208>",
        h: "<:1f1ed:938280773910429726>",
        i: "<:1f1ee:938280773998481418>",
        j: "<:1f1ef:938280773910397028>",
        k: "<:1f1f0:938280774120132628>",
        l: "<:1f1f1:938280774011080715>",
        m: "<:1f1f2:938280773922992138>",
        n: "<:1f1f3:938280774002688010>",
        o: "<:1f1f4:938280774065610822>",
        p: "<:1f1f5:938280774019465286>",
        q: "<:1f1f6:938280773881057392>",
        r: "<:1f1f7:938280773994303568>",
        s: "<:1f1f8:938280774191415357>",
        t: "<:1f1f9:938280774023647233>",
        u: "<:1f1fa:938280774002679858>",
        v: "<:1f1fb:938280773910396979>",
        w: "<:1f1fc:938280774006898749>",
        x: "<:1f1fd:938280774065618984>",
        y: "<:1f1fe:938280774115934228>",
        z: "<:1f1ff:938280774145310801>",
    },
    gray: {
        a: "<:1f1e6:938280277627785347>",
        b: "<:1f1e7:938280277703278593>",
        c: "<:1f1e8:938280277988503633>",
        d: "<:1f1e9:938280278026231858>",
        e: "<:1f1ea:938280278038818926>",
        f: "<:1f1eb:938280277862658059>",
        g: "<:1f1ec:938280278051405844>",
        h: "<:1f1ed:938280278126891058>",
        i: "<:1f1ee:938280277980119120>",
        j: "<:1f1ef:938280277988507649>",
        k: "<:1f1f0:938280277900394537>",
        l: "<:1f1f1:938280277862674503>",
        m: "<:1f1f2:938280277678100501>",
        n: "<:1f1f3:938280277866860555>",
        o: "<:1f1f4:938280278189801502>",
        p: "<:1f1f5:938280278017867776>",
        q: "<:1f1f6:938280278097530941>",
        r: "<:1f1f7:938280278038806538>",
        s: "<:1f1f8:938280278110138468>",
        t: "<:1f1f9:938280278055583764>",
        u: "<:1f1fa:938280278043004958>",
        v: "<:1f1fb:938280278051418153>",
        w: "<:1f1fc:938280278131085332>",
        x: "<:1f1fd:938280278105944074>",
        y: "<:1f1fe:938280278177218560>",
        z: "<:1f1ff:938280278215000064>",
    },
}

const words: string[] = ["twist","stage","worth","twice","wield","candy","limit","taper","level","fluke","brawl","lucky","steam","shiny","voice","jaunt","venal","truck","hotel","agile",
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


function getRandomInt() {
    let min:number = 0
    let max:number = words.length
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

const checkWord = (guessWord:string, answer:string) => {

    const guessArray = Array.from(guessWord)
    const answerArray = Array.from(answer)
    let answerWord:string = ''
    for (let letterIndex = 0; letterIndex <= 5; letterIndex++) {
        if (answerArray.includes(guessArray[letterIndex])) {
            if (answerArray[letterIndex] == guessArray[letterIndex]) {
                answerWord += EMOJI_CODES.green[guessArray[letterIndex] as letterCodes]

            }
            else {
                answerWord += EMOJI_CODES.yellow[guessArray[letterIndex] as letterCodes]
            }
        }
        else {
            answerWord += EMOJI_CODES.gray[guessArray[letterIndex] as letterCodes]
            
        }
        
    }
    return answerWord
    
}


export default new Command(
    {
    name: "wen",
    description: "Wordle English",
    run: async ({  interaction, args}) => {
        console.log(args);
        

        interaction.followUp('ok')
    }
})