export type CommandContext = {
    exit: () => void
}

export type CommandType = {
    name: string
    description: string
    value: string
    action?: (ctx: CommandContext) => void | Promise<void>
}