import { EmbedField, HexColorString, Message, MessageEmbed, MessageEmbedAuthor, MessageEmbedImage } from "discord.js"
import { Event } from "../stuructures/Event"
import { client } from ".."
import { Game, todayword, words } from "../stuructures/Client"

interface field {
    name: string,
    value: string,
    inline: boolean
}

function createEmbed(title:string = "title",description:string = "wordle",  author:MessageEmbedAuthor = {name: "Wordle-Discord"}, fields:field[],
 hexcolor:HexColorString | null = null, url:string = "", footer:string = "", image: MessageEmbedImage | null = null){
    const embed = new MessageEmbed({
        title: title,
        description: description,
        author: author,
        hexColor: hexcolor
    })
    fields.forEach(field => {
        embed.addField(field.name, field.value, field.inline)
    });

    return embed;
}



export default new Event('messageCreate', (message) => {
    

    
    
    
    if (!message.inGuild() && !message.author.bot){

        
        const session = client.sessionMembers.get(message.author.id)
        if (session){
            const fields = [{name: "wordle", value: session.checkWord(message.content, todayword), inline: false}]
            console.log(fields[0].value)
            message.reply({embeds: [createEmbed("Wordle", "sj", undefined, fields, "#00000", undefined, "bruh", null)]})
        }   
        else {
            message.reply('You need to create a session first')
        }

    }
    else {console.log("guild vra");
    }
    });