import { COMMANDS } from "./command";
import type { CommandType } from "./types";

export function getFilteredCommands(query: string): CommandType[] {
    if(query.length === 0) return COMMANDS

    return COMMANDS.filter((cmd) => cmd.name.toLowerCase().startsWith(query.toLowerCase()))
}