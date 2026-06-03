import { StatusBar } from "./status-bar";
import { EmptyBorder } from "./border";
import type { KeyBinding, TextareaRenderable } from "@opentui/core";
import { CommandMenu } from "./command-menu";
import { useCallback, useEffect, useRef } from "react";
import { useRenderer } from "@opentui/react";
import { useCommandMenu } from "./command-menu/use-command-menu";
import type { CommandType } from "./command-menu/types";
import { useToast } from "../providers/toast";
import { useKeyboardLayer } from "../providers/keyboard-layer";
import { useDialog } from "../providers/dialog";
import { useTheme } from "../providers/theme";

type Props = {
    onSubmit: (text: string) => void
    disabled?: boolean
}

export const TEXT_AREA_KEY_BIDINGS: KeyBinding[] = [
    { name: "return", action: "submit" },
    { name: "enter", action: "submit" },
    { name: "return", shift: true, action: "newline" },
    { name: "enter", shift: true, action: "newline" },
]

export function InputBar({ onSubmit, disabled = false }: Props) {
    const textareaRef = useRef<TextareaRenderable>(null)
    const onSubmitRef = useRef<() => void>(() => { })
    const render = useRenderer()
    const toast = useToast()
    const dialog = useDialog()
    const { isTopLayer, setResponder } = useKeyboardLayer()
    const { colors } = useTheme()

    const {
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex

    } = useCommandMenu()

    const handleTextareaContentChange = useCallback(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        handleContentChange(textarea.plainText)
    }, [])

    const handleSubmit = useCallback(() => {
        if (disabled) return

        const textarea = textareaRef.current
        if (!textarea) return

        const text = textarea.plainText.trim()
        if (text.length === 0) return

        onSubmit(text)
        textarea.setText('')
    }, [disabled, onSubmit])

    const handleCommand = useCallback((
        command: CommandType | undefined
    ) => {
        const textarea = textareaRef.current
        if (!textarea || !command) return

        textarea.setText('')

        if (command.action) {
            command.action({
                exit: () => render.destroy(),
                toast,
                dialog
            })
        } else {
            textarea.insertText(command.value + ' ')
        }
    }, [render, toast, dialog])

    const handleCommandExecute = useCallback((index: number) => {
        const command = resolveCommand(index)
        handleCommand(command)
    }, [resolveCommand, handleCommand])

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        textarea.onSubmit = () => {
            onSubmitRef.current()
        }
    }, [])

    onSubmitRef.current = () => {
        if (disabled) return

        if (showCommandMenu) {
            const command = resolveCommand(selectedIndex)
            handleCommand(command)

            return
        }

        handleSubmit()
    }

    useEffect(() => {
        setResponder('base', () => {
            if (disabled) return false

            const textarea = textareaRef.current
            if (textarea && textarea.plainText.length > 0) {
                textarea.setText('')
                return true
            }

            return false
        })

        return () => setResponder('base', null)
    }, [disabled, setResponder])


    return (
        <box width='100%' alignItems="center">
            <box
                border={["left"]}
                borderColor={colors.primary}
                customBorderChars={{
                    ...EmptyBorder,
                    vertical: "┃",
                    bottomLeft: "╹",
                }}
                width='100%'
            >
                <box
                    position="relative"
                    justifyContent="center"
                    backgroundColor={colors.surface}
                    paddingX={2}
                    paddingY={1}
                    width='100%'
                    gap={1}
                >
                    {
                        showCommandMenu && (
                            <box
                                position="absolute"
                                bottom="100%"
                                left={0}
                                width="100%"
                                backgroundColor={colors.surface}
                                zIndex={10}
                            >
                                <CommandMenu
                                    query={commandQuery}
                                    selectedIndex={selectedIndex}
                                    scrollRef={scrollRef}
                                    onSelect={setSelectedIndex}
                                    onExecute={handleCommandExecute}
                                />
                            </box>
                        )
                    }
                    <textarea
                        ref={textareaRef}
                        focused={!disabled && (isTopLayer('base') || isTopLayer('command'))}
                        keyBindings={TEXT_AREA_KEY_BIDINGS}
                        onContentChange={handleTextareaContentChange}
                        placeholder={`Ask me anything... "Fix the PINNs code"`}
                    />

                    <StatusBar />
                </box>
            </box>
        </box>
    )
}