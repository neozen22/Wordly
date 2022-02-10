import { Command } from "../stuructures/Command";

export default new Command({
    name: "ping",
    description: "bruh",
    run: async ({  interaction }) => {
        interaction.followUp("bruh")
    }
})