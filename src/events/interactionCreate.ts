import { CommandInteractionOptionResolver, Interaction } from "discord.js";
import { Event } from "../stuructures/Event";
import { client } from ".."; 
import { ExtendedInteraction } from "../typings/Command";
import { createBasicMessageEmbed } from "./messageCreate";

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp({embeds: [createBasicMessageEmbed("You have used a non existent command")]});

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
}); 