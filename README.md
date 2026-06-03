# Principia

AI-powered CLI assistant for developers. An open-source terminal-based alternative to Claude Code and OpenCode, built with React and OpenTUI.

⚠️ Screenshots coming soon

## Table of Contents

1. [Description](#description)
2. [Tech Stack](#tech-stack)
3. [Quick Start](#quick-start)
4. [Features](#features)
5. [Commands](#commands)
6. [Roadmap](#roadmap)
7. [Contributing](#contributing)
8. [License](#license)

## Description

Principia is an AI-powered CLI designed for developers. It serves as an open-source alternative to tools like Claude Code and OpenCode, offering a terminal-based interface with 60 FPS rendering.

**Philosophy:**

- Terminal-first: all interaction happens in your terminal
- Fast and efficient: optimized rendering for a smooth experience
- Extensible: architecture ready to integrate multiple AI models
- Minimalist: no unnecessary UI, focus on what matters

> **Note:** While Aither (future ecosystem) will be specific to physics, Principia is model-agnostic and can integrate with any AI provider.

## Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Bun |
| Language | TypeScript 5 |
| UI Framework | React 19 |
| Terminal UI | @opentui/core + @opentui/react |
| Architecture | Monorepo (Bun workspaces) |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/oscar2697/principia
cd principia

# Install dependencies
bun install

# Run
bun run dev:cli
```

## Features

- **Command Menu System**: Slash commands with `/` for quick access
- **27 Color Themes**: Pre-configured themes with persistence in `~/.principia/preferences.json`
- **Toast Notifications**: Notification system (success, error, info)
- **Dialog Modals**: Modal windows with backdrop
- **Keyboard Layer System**: Layer-based keyboard event handling
- **60 FPS Rendering**: Smooth terminal rendering

## Commands

| Command | Description |
|---------|-------------|
| `/new` | Start new conversation |
| `/agents` | Switch agent |
| `/models` | Select AI model |
| `/sessions` | View sessions |
| `/theme` | Change color theme |
| `/login` | Login to account |
| `/logout` | Logout |
| `/upgrade` | Upgrade account |
| `/usage` | View usage |
| `/exit` | Exit application |

## Roadmap

- [ ] AI API integration (OpenAI, Anthropic, etc.)
- [ ] Plugin/extension system
- [ ] Persistent conversation history
- [ ] Aither ecosystem integration
- [ ] Multi-language support

## Contributing

Contributions are welcome! Please read the contribution guidelines before submitting a pull request.

1. Fork the repository
2. Create a branch for your feature (`feat/feature-name`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feat/feature-name`)
5. Open a Pull Request

## License

This project is under the MIT License. See the [LICENSE](LICENSE) file for details.