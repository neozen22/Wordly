import { setEnvironmentData } from "worker_threads";
import { Command } from "../stuructures/Command";
import { client } from "../index";
import { Game } from "../stuructures/Client";


export default new Command({
    name: "play",
    description: "Play the game",
    run: async ({  interaction }) => {
        const game = new Game
        client.sessionMembers.set(interaction.member.id, game)
        interaction.followUp('Session opened! Check your DMs')
        console.log(client.sessionMembers);
        
    }
})