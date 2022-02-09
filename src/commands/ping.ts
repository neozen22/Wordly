import { Command } from "../stuructures/Command";

export default new Command({
    name: "sj",
    description: "bruh",
    run: ({ client, interaction, args }):any => {
        interaction.reply("bruh")
    }
})