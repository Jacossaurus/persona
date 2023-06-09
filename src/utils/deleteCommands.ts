import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import { getCommands } from "./getCommands";

config();

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

async function deleteCommands() {
	console.log("Attempting to delete global commands.");

	await rest.put(Routes.applicationCommands(process.env.APP_ID as string), {
		body: [],
	});

	console.log("Deleted global commands.");

	const commands = await getCommands();
	const guilds: string[] = [];

	for (const guildId of guilds) {
		console.log(`Attempting to delete guild (${guildId}) commands.`);

		await rest.put(
			Routes.applicationGuildCommands(
				process.env.APP_ID as string,
				guildId,
			),
			{ body: [] },
		);

		console.log(`Deleted guild (${guildId}) commands.`);
	}

	console.log("Completed deletion of commands.");
}

deleteCommands();
