import { useCallback, useEffect, useRef } from "react"
import { useDialog } from "../../providers/dialog"
import { useTheme } from "../../providers/theme"
import { THEMES, type Theme } from "../../theme"
import { DialogSearchList } from "../dialog-search-list"

export const ThemeDialogContent = () => {
    const dialog = useDialog()
    const { setTheme, setPreviewTheme, currentTheme } = useTheme()
    const originalThemeRef = useRef(currentTheme)
    const confirmedRef = useRef(false)

    useEffect(() => {
        return () => {
            if (!confirmedRef.current) {
                setTheme(originalThemeRef.current)
            }
        }
    }, [setTheme])

    const handleConfirm = useCallback((theme: Theme) => {
        confirmedRef.current = true
        setTheme(theme)
        dialog.close()
    }, [setTheme, dialog])

    const handleHeight = useCallback((theme: Theme) => {
        setPreviewTheme(theme)
    }, [setPreviewTheme])

    return (
        <DialogSearchList
            items={THEMES}
            onSelect={handleConfirm}
            onHighLight={handleHeight}
            filterFn={(t, query) => t.name.toLowerCase().includes(query.toLowerCase())}
            renderItem={(theme, isSelected) => (
                <text
                    selectable={false}
                    fg={isSelected ? 'black' : 'white'}
                >
                    {theme.name === originalThemeRef.current.name ? '\u0020\u2022\u0020' : '\u0020\u2022\u0020'}
                    {theme.name}
                </text>
            )}

            getKey={(t) => t.name}
            placeholder="Search themes"
            emptyText="No matching themes"
        />
    )
}