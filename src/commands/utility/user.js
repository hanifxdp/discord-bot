import { SlashCommandBuilder } from "discord.js";

// export const data = new SlashCommandBuilder()
// 	.setName("user")
// 	.setDescription("Provides information about the user.");
// export async function execute(interaction) {
// 	await interaction.reply(
// 		`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
// 	);
// }

const User = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Provides information about the user."),
	async execute(interaction) {
		await interaction.reply(
			`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
		);
	},
};

export default User;
