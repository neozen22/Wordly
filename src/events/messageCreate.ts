import {AutocompleteInteraction, EmbedAuthorData, EmbedField, HexColorString, Message, MessageEmbed, MessageEmbedAuthor, MessageEmbedImage, MessageEmbedOptions, Options } from "discord.js"
import { Event } from "../stuructures/Event"
import { client } from ".."
import { allWords} from "../stuructures/Client"
import { type } from "os"
interface field {
    name: string,
    value: string,
    inline: boolean
}

type EmbedBuilder = {
    name: string
}

export function createEmbed(fields?:Array<EmbedField>, title?: string , description = "Wordly", footer?: string, author?:EmbedAuthorData, imageurl?:string, thumbnail?:string){
    const embed = new MessageEmbed().setTimestamp().setColor([2, 46, 0])
    if (fields) embed.addFields(fields)
    if (title)  embed.setTitle(title)
    if (description) embed.setDescription(description)
    if (footer) embed.setFooter({text: footer})
    if (author) embed.setAuthor(author)
    if (imageurl) embed.setImage(imageurl)
    if (thumbnail) embed.setThumbnail(thumbnail)
    
    return embed
}

export function createBasicMessageEmbed(description:string) {
    return createEmbed(undefined, undefined, description)
}


export default new Event('messageCreate', async (message) => {
    if (!message.author.bot){
        let session = client.sessionMembers.get(message.author.id)
        if (session){
            message.delete()
            let word = session.checkWord(message.content.toLowerCase(), session.word.toLowerCase())
            let malMessage: string | undefined = undefined;
            let descArray: string[] = session.gameEmbed.description?.split("\n") || [];
            session.gameEmbed = new MessageEmbed(session.gameEmbed as MessageEmbedOptions)
            .setDescription(descArray.join("\n"))
            if (session.usedLetters) session.gameEmbed.setFields([{name:"Used Letters", value: session.usedLetters}])
            
            if (message.content.length != 5) malMessage = "This game is played with 5 letters!"    
            if (!allWords.includes(message.content)) malMessage=  "Word not on word list"
            if (typeof word == "boolean") malMessage = "You typed in restricted characters"
            
            
            
            if (malMessage) {
                session.gameEmbed.setFooter({text: malMessage})
                session.game?.edit({embeds: [session.gameEmbed]})
                setTimeout(() => {
                    return session?.game?.edit({embeds: [session.gameEmbed.setFooter(null)]})
                }, 2000);
                
                
            }
            else {
            descArray[session.round] = word as string
            session.game?.edit({embeds: [session.gameEmbed.setDescription(descArray.join("\n"))]})
            
            if (session.gameState){
                message.channel.send({embeds: [createBasicMessageEmbed('**You Have Won!**')]})
                client.sessionMembers.delete(message.author.id)
            }
            if (session.gameState == false) {
                message.channel.send({embeds: [createBasicMessageEmbed('**You Have Lost...**')]})
                client.sessionMembers.delete(message.author.id)
            }
            session.round += 1
            }
        }   
        else {
            return
        }

    }

    }
    );