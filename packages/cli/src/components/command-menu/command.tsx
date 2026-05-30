import type { CommandType } from "./types"

export const COMMANDS: CommandType[] = [
    {
        name: 'new',
        description: 'Start a new conversation',
        value: '/new'
    }, 
    {
        name: 'agents',
        description: 'Switch agents',
        value: '/agents'
    },
    {
        name: 'models',
        description: 'Select AI model to use',
        value: '/models'
    },
    {
        name: 'sessions',
        description: 'View your sessions',
        value: '/sessions'
    },
    {
        name: 'theme',
        description: 'Change the theme',
        value: '/theme'
    },
    {
        name: 'login',
        description: 'Login to your account',
        value: '/login'
    },
    {
        name: 'logout',
        description: 'Logout from your account',
        value: '/logout'
    },
    {
        name: 'upgrade',
        description: 'Upgrade your account',
        value: '/upgrade'
    },
    {
        name: 'usage',
        description: 'View your usage',
        value: '/usage'
    },
    {
        name: 'exit',
        description: 'Quit de application',
        value: '/exit',
        action: (ctx) => {
            ctx.exit()
        }
    }
]