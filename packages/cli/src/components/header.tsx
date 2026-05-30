import { TextAttributes } from "@opentui/core"

export function Header() {
    return (
        <box
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingX={4}
            paddingY={1}
            borderStyle="single"
            borderColor="#4A4A5A"
        >
            <box flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
                <box flexDirection="row" alignItems="center" gap={1}>
                    <ascii-font font="block" text="PRIN" color='#C8892A' />
                    <ascii-font font="block" text="CIPIA" color='#D0D0E0' />
                </box>

                <box
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    gap={1}
                    paddingLeft={2}
                >
                    <text fg='#9AAABB' attributes={TextAttributes.BOLD}>∂²u/∂t² = c²∇²u</text>
                    <text fg='#9AAABB' attributes={TextAttributes.BOLD}>E = mc²</text>
                    <text fg='#9AAABB' attributes={TextAttributes.BOLD}>∇·E = ρ/ε₀</text>
                </box>
            </box>

            <box flexDirection="row" gap={1} marginTop={1}>
                <text fg="#C8892A" attributes={TextAttributes.BOLD}>A I T H E R</text>
                <text fg="#4A4A5A">│</text>
                <text fg="#808090">E C O S Y S T E M</text>
            </box>
        </box>
    )
}

