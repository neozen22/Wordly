import { CommandInteractionOptionResolver, Interaction } from "discord.js";
import { Event } from "../stuructures/Event";
import { client } from ".."; 
import { ExtendedInteraction } from "../typings/Command";

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp("You have used a non existent command");

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
}); 