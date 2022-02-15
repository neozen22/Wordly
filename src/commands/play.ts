import { setEnvironmentData } from "worker_threads";
import { Command } from "../stuructures/Command";
import { client } from "../index";
import { Game } from "../stuructures/Client";
import { createEmbed } from "../events/messageCreate";
import { emit } from "process";
import { Message } from "discord.js";


export default new Command({
    name: "play",
    description: "Play the game",
    run: async ({  interaction }) => {
        const game = new Game(interaction.user)
        client.sessionMembers.set(interaction.member.id, game)
        interaction.followUp({embeds: [game.gameEmbed]}).then((message) => {
            game.game = message as Message

        })
    }
})