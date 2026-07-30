import type { InferResponseType } from "hono"
import { SessionShell } from "../components/session-shell"
import { apiClient } from "../lib/api-client"
import z from "zod"
import { BotMessage, UserMessage } from "../components/messages"
import { useLocation, useNavigate, useParams, type SessionData } from "react-router"
import { useToast } from "../providers/toast"
import { useEffect, useMemo, useState } from "react"
import { getErrorsMessage } from "../lib/http-errors"

type Session = InferResponseType<(typeof apiClient.sessions)[':id']['$get'], 200>

const sessionLocationSchema = z.object({
    session: z.custom<Session>((val) => val != null && typeof val === 'object' && 'id' in val)
})

function ChatMessage({ msg }: { msg: Session['messages'][number] }) {
    if (msg.role === 'USER') {
        return <UserMessage message={msg.content} />
    }

    if (msg.role === 'ERROR') {
        return <UserMessage message={msg.content} />
    }

    return <BotMessage content={msg.content} model={msg.model} />
}

export function Session() {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const toast = useToast()

    const prefetched = useMemo(() => {
        const parsed = sessionLocationSchema.safeParse(location.state)
        return parsed.success ? parsed.data.session : null
    }, [location.state])

    const [session, setSession] = useState<SessionData | null>(prefetched)

    useEffect(() => {
        if (prefetched) return
        setSession(null)

        if (!id) return
        let ignore = false

        const fetchSession = async () => {
            try {
                const res = await apiClient.sessions[':id'].$get({ param: { id } })

                if (ignore) return
                if (!res.ok) throw new Error(await getErrorsMessage(res))
                const resolved = await res.json()
                setSession(resolved)
            } catch (error) {
                if (ignore) return

                toast.show({
                    variant: 'error',
                    message: error instanceof Error ? error.message : 'Failed to load the session',
                })

                navigate('/', { replace: true })
            }
        }

        fetchSession()

        return () => {
            ignore = true
        }
    }, [id, prefetched, toast, navigate])

    if (!session) {
        return (
            <SessionShell
                onSubmit={() => { }}
                inputDisabled
                loading
            />
        )
    }

    return (
        <SessionShell
            onSubmit={() => { }}
            inputDisabled
        >
            {session.messages.map((msg: Session['messages'][number]) => (
                <ChatMessage
                    key={msg.id}
                    msg={msg}
                />
            ))}
        </SessionShell>
    )
}