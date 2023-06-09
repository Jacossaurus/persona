import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import { Command } from "../types/Command";
import { getCommands } from "./getCommands";

config();

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

async function registerCommands() {
	const commands = await getCommands();

	try {
		if (commands.length > 0) {
			console.log(
				`Attempting to register ${commands.length} commands globally.`,
			);

			const response = await rest.put(
				Routes.applicationCommands(process.env.APP_ID as string),
				{
					body: commands.map((command) => command.data.toJSON()),
				},
			);

			console.log(
				`Successfully registered ${
					(response as Array<any>).length
				} commands globally.`,
			);
		} else {
			console.log("No commands found to be registered globally.");
		}

		console.log("Completed registering commands.");
	} catch (error) {
		console.error(error);
	}
}

registerCommands();
