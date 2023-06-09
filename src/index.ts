import { ActivityType, Client, Events } from "discord.js";
import { config } from "dotenv";
import { getCommands } from "./utils/getCommands";
import { SearchService } from "./services/SearchService";
import { deleteReply } from "./utils/deleteReply";

config();

const client = new Client({
	intents: ["Guilds", "GuildMessages", "MessageContent"],
});

async function init() {
	SearchService.init();

	const commands = await getCommands();

	client.on(Events.InteractionCreate, async (interaction) => {
		if (interaction.isChatInputCommand()) {
			const command = commands.find(
				(command) => command.data.name === interaction.commandName,
			);

			if (command) {
				await command.executeSlash(interaction);
			} else {
				await interaction.reply(`Failed to find command.`);

				deleteReply(interaction);
			}
		}
	});

	client.on(Events.MessageCreate, (message) => {
		for (const command of commands) {
			if (command.executeInformal !== undefined) {
				const aliases = [command.data.name, ...(command.aliases ?? [])];

				for (const alias of aliases) {
					if (message.content === `.${alias}`) {
						command.executeInformal(message);
					}
				}
			}
		}
	});

	client.on("ready", async () => {
		const user = client.user;

		if (user) {
			console.log(`${user.tag} is online!`);

			user.setActivity("Persona 5.", {
				type: ActivityType.Playing,
			});
		}
	});

	client.login(process.env.DISCORD_TOKEN);
}

init();

process.on("uncaughtException", (err) => console.log(err));
