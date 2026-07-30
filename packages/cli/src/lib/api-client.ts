import {hc} from 'hono/client'
import type {Apptype} from '@principia/server'

export const apiClient = hc<Apptype>(
    process.env.API_URL ?? 'http://localhost:3000'
)
