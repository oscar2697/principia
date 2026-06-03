import { TextAttributes } from "@opentui/core";
import { useTheme } from "../providers/theme";

export function StatusBar() {
    const { colors } = useTheme()

    return (
        <box flexDirection="row" gap={1}>
            <text fg={colors.dimSeparator}>Build</text>

            <text
                attributes={TextAttributes.DIM}
                fg={colors.dimSeparator}
            >
                &#8250;
            </text>

            <text fg={colors.primary} attributes={TextAttributes.DIM}>Model: </text>
            <text fg={colors.selection}>Opus4-6</text>

            <text fg={colors.dimSeparator} attributes={TextAttributes.DIM}> | </text>
            <text fg={colors.info} attributes={TextAttributes.DIM}>G: 6.674e-11</text>
        </box>
    )
}