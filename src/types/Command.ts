import {
    ChatInputCommandInteraction,
    Message,
    SlashCommandBuilder,
} from "discord.js";

export interface Command {
    data: SlashCommandBuilder;
    aliases?: Array<string>;

    executeSlash: (interaction: ChatInputCommandInteraction) => Promise<any>;
    executeInformal?: (message: Message) => Promise<any>;
}
