import { Mode } from "@principia/database"
import { DEFAULT_CHAT_MODEL_ID, type SupportedChatModelId } from "@principia/shared"
import type { ReactNode } from "react"
import { createContext, useCallback, useContext, useState } from "react"

type PromptConfigContexValue = {
    mode: Mode
    toggleMode: () => void
    setMode: (mode: Mode) => void
    model: SupportedChatModelId
    setModel: (model: SupportedChatModelId) => void
}

const PromptConfigContext = createContext<PromptConfigContexValue | null>(null)

export function usePromptConfig(): PromptConfigContexValue {
    const value = useContext(PromptConfigContext)

    if (!value) {
        {
            throw new Error('usePromptConfig must be used a PromptConfigProvider')
        }
    }

    return value
}

type PromptConfigProviderProps = {
    children: ReactNode
}

export function PromptConfigProvider({ children }: PromptConfigProviderProps) {
    const [mode, setMode] = useState<Mode>(Mode.PLAN)
    const [model, setModel] = useState<SupportedChatModelId>(DEFAULT_CHAT_MODEL_ID)

    const toggleMode = useCallback(() => {
        setMode((m) => (m === Mode.BUILD ? Mode.PLAN : Mode.BUILD))
    }, [])

    return (
        <PromptConfigContext.Provider
            value={{ mode, toggleMode, setMode, model, setModel }}
        >
            {children}
        </PromptConfigContext.Provider>
    )
}