import { SUPPORTED_CHAT_MODELS } from "@principia/shared"
import { ThemeDialogContent, SesssionsDialogContent, AgentsDialogContent, ModelsDialogContent } from "../dialogs"
import type { CommandType } from "./types"

export const COMMANDS: CommandType[] = [
    {
        name: 'new',
        description: 'Start a new conversation',
        value: '/new',
        action: (ctx) => {
            ctx.navigate('/')
        }
    },
    {
        name: 'agents',
        description: 'Switch agents',
        value: '/agents',
        action: (ctx) => {
            ctx.dialog.open({
                title: 'Select Agents',
                children: <AgentsDialogContent
                    currentMode={ctx.mode}
                    onSelectMode={ctx.setMode}
                />
            })
        }
    },
    {
        name: 'models',
        description: 'Select AI model to use',
        value: '/models',
        action: (ctx) => {
            ctx.dialog.open({
                title: 'Select Models',
                children: <ModelsDialogContent
                    models={SUPPORTED_CHAT_MODELS.map((model) => model.id)}
                    onSelectModel={ctx.setModel}
                />
            })
        }
    },
    {
        name: 'sessions',
        description: 'View your sessions',
        value: '/sessions',
        action: (ctx) => {
            ctx.dialog.open({
                title: 'Sessions',
                children: <SesssionsDialogContent />
            })
        }
    },
    {
        name: 'theme',
        description: 'Change the theme',
        value: '/theme',
        action: (ctx) => {
            ctx.dialog.open({
                title: 'Select Theme',
                children: <ThemeDialogContent />
            })
        }
    },
    {
        name: 'login',
        description: 'Login to your account',
        value: '/login',
        action: (ctx) => {
            ctx.toast.show({ message: 'Opening browser for login...' })
        }
    },
    {
        name: 'logout',
        description: 'Logout from your account',
        value: '/logout',
        action: (ctx) => {
            ctx.toast.show({ variant: 'success', message: 'Logged out successfully' })
        }
    },
    {
        name: 'upgrade',
        description: 'Upgrade your account',
        value: '/upgrade',
        action: (ctx) => {
            ctx.toast.show({ message: 'Opening credits checkout...' })
        }
    },
    {
        name: 'usage',
        description: 'View your usage',
        value: '/usage',
        action: (ctx) => {
            ctx.toast.show({ message: 'Opening billing portal...' })
        }
    },
    {
        name: 'exit',
        description: 'Quit the application',
        value: '/exit',
        action: (ctx) => {
            ctx.exit()
        }
    }
]