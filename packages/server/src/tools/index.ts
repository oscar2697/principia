import type { Mode } from "@principia/database/enums"
import { createReadFileTool } from "./read-file"
import { createListDirectoryTool } from "./list-directory"
import { createWriteFileTool } from "./write-file"
import { createEditFile } from "./edit-file"
import { createGrepTool } from "./grep"
import { createGlobTool } from "./glob"
import { createBashTool } from "./bash"

export function createTools(cwd: string, mode: Mode) {
    const readOnlyTools = {
        readFile: createReadFileTool(cwd),
        listDirectory: createListDirectoryTool(cwd),
        grep: createGrepTool(cwd),
        glob: createGlobTool(cwd)
    }

    if (mode === 'PLAN') {
        return readOnlyTools
    }

    return {
        ...readOnlyTools,
        writeFile: createWriteFileTool(cwd),
        editFile: createEditFile(cwd),
        bash: createBashTool(cwd)
    }
}