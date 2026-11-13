import { TextAttributes } from "@opentui/core";
import { useTheme } from "../providers/theme";
import { usePromptConfig } from "../providers/prompt-config";
import { Mode } from "@principia/database/enums";

export function StatusBar() {
    const { mode, model } = usePromptConfig()
    const { colors } = useTheme()

    return (
        <box flexDirection="row" gap={1}>
            <text fg={mode === Mode.PLAN ? colors.planMode : colors.dimSeparator}>
                {mode === Mode.PLAN ? 'Plan' : 'Build'}
            </text>

            <text
                attributes={TextAttributes.DIM}
                fg={colors.dimSeparator}
            >
                &#8250;
            </text>

            <text fg={colors.primary} attributes={TextAttributes.DIM}>Model: </text>
            <text fg={colors.selection}>{model}</text>

            <text fg={colors.dimSeparator} attributes={TextAttributes.DIM}> | </text>
            <text fg={colors.info} attributes={TextAttributes.DIM}>G: 6.674e-11</text>
        </box>
    )
}