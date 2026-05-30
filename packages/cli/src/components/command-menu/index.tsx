import type { RefObject } from "react"
import { COMMANDS } from "./command"
import { TextAttributes, type ScrollBoxRenderable } from "@opentui/core"
import { getFilteredCommands } from "./filter-command"

const MAX_VISIBLE_COMMANDS = 5

const COMMAND_CLI_WIDTH = Math.max(...COMMANDS.map((cmd) => cmd.name.length)) + 4

type CommandMenuProps = {
    query: string
    selectedIndex: number
    scrollRef: RefObject<ScrollBoxRenderable | null>
    onSelect: (index: number) => void
    onExecute: (index: number) => void
}

export function CommandMenu({
    query,
    selectedIndex,
    scrollRef,
    onSelect,
    onExecute
}: CommandMenuProps) {
    const filtered = getFilteredCommands(query)
    const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_COMMANDS)

    if (filtered.length === 0) {
        return (
            <box paddingX={1}>
                <text attributes={TextAttributes.DIM}>No commands found</text>
            </box>
        )
    }

    return (
        <scrollbox ref={scrollRef} height={visibleHeight}>
            {filtered.map((cmd, i) => {
                const isSelected = i === selectedIndex

                return (
                    <box
                        key={cmd.value}
                        flexDirection="row"
                        paddingX={1}
                        height={1}
                        overflow="hidden"
                        backgroundColor={isSelected ? '#F5D899' : undefined}
                        onMouseMove={() => onSelect(i)}
                        onMouseDown={() => onExecute(i)}
                    >
                        <box width={COMMAND_CLI_WIDTH} flexShrink={0}>
                            <text
                                selectable={false}
                                fg={isSelected ? 'black' : 'white'}
                            >
                                /{cmd.name}
                            </text>
                        </box>

                        <box
                            flexGrow={1}
                            flexShrink={1}
                            overflow="hidden"
                        >
                            <text
                                selectable={false}
                                fg={isSelected ? 'black' : 'gray'}
                            >
                                {cmd.description}
                            </text>
                        </box>
                    </box>
                )
            })}
        </scrollbox>
    )
}