import { TextAttributes } from "@opentui/core";

export function StatusBar() {
    return (
        <box flexDirection="row" gap={1}>
            <text fg='#708090'>Build</text>

            <text
                attributes={TextAttributes.DIM}
                fg='gray'
            >
                &#8250;
            </text>

            <text fg='gray' attributes={TextAttributes.DIM}>Model: </text>
            <text fg='#D4AF37'>Opus4-6</text>

            <text fg='gray' attributes={TextAttributes.DIM}> | </text>
            <text fg='gray' attributes={TextAttributes.DIM}>G: 6.674e-11</text>
        </box>
    )
}