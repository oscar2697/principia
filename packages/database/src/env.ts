import dotenv from "dotenv"
import path from "node:path"

// Bun's `run --filter` executes with cwd = the package directory
// (packages/server), so a plain `dotenv/config` would look for
// packages/server/.env and miss the monorepo-root .env where
// DATABASE_URL / NVIDIA_API_KEY actually live.
// Loading the root .env by explicit path makes the server work
// no matter which cwd it is started from.
dotenv.config({ path: path.resolve(import.meta.dir, "../../../.env") })
// Fallback: also try default resolution (cwd / nearest .env).
dotenv.config()
