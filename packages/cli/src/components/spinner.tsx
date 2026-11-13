import 'opentui-spinner/react'
import { useTheme } from "../providers/theme"
import { Mode } from '@principia/database/enums'

type Props = {
    mode?: Mode
}

export function Spinner({mode = Mode.BUILD}: Props) {
    const { colors } = useTheme()
    const activeColor = mode === Mode.PLAN ? colors.planMode : colors.dimSeparator

    return (
        <spinner name='dots' color={activeColor} />
    )
}