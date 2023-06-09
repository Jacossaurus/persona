import {
	CacheType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	Message,
	SlashCommandBuilder,
} from "discord.js";
import { Command } from "../types/Command";
import { SearchService } from "../services/SearchService";

async function sendImage(
	interaction: ChatInputCommandInteraction<CacheType> | Message<boolean>,
) {
	const image =
		SearchService.cachedImageUrls[
			Math.floor(Math.random() * SearchService.cachedImageUrls.length)
		];

	if (image !== undefined) {
		const embed = {
			embeds: [
				new EmbedBuilder()
					.setTitle("Persona 5 - Joker")
					.setDescription(image.title)
					.setImage(image.original)
					.setURL(image.link)
					.setFooter({
						text: `Image provided by ${image.source}. Searched with Google Search and Serpapi.`,
					}),
			],
		};

		await interaction.reply(embed);
	}
}

const random: Command = {
	data: new SlashCommandBuilder()
		.setName("persona")
		.setDescription("Persona will give a random Joker image."),
	aliases: ["joker"],

	executeSlash: async (interaction) => sendImage(interaction),
	executeInformal: async (interaction) => sendImage(interaction),
};

export default random;
