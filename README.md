# Wordly 🟩🟨⬜

**A Discord bot that brings the popular word-guessing game Wordle to your server.**

Wordly lets Discord users play Wordle-style word games directly inside any text channel. Start a session with a slash command, then type your 5-letter guesses as messages — the bot responds with coloured letter tiles showing how close you are.

---

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Configuration](#configuration)
- [Running the Bot](#running-the-bot)
- [Commands](#commands)
- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Security Notes](#security-notes)

---

## Features

- 🟩 Classic Wordle rules: 6 attempts to guess a hidden 5-letter word
- 🎨 Custom Discord emoji tiles (green / yellow / gray) for each letter
- 📋 Live "Used Letters" tracker embedded in the game message
- ⚡ Per-user game sessions — multiple players can have active games simultaneously
- 🔤 Valid-word validation against a full word list
- 🏆 Win/loss announcements on game completion

---

## How It Works

1. A user runs `/play` in a Discord channel.
2. The bot posts a game board embed with 6 blank rows (5 tiles each).
3. The user types 5-letter word guesses as regular messages; Wordly deletes each guess and updates the board embed.
4. Each letter tile is coloured:
   - 🟩 **Green** — correct letter in the correct position
   - 🟨 **Yellow** — correct letter in the wrong position
   - ⬜ **Gray** — letter not in the word
5. The game ends when the player guesses the word or exhausts all 6 rounds.

---

## Prerequisites

| Requirement | Version |
|---|---|
| [Node.js](https://nodejs.org/) | 16 or higher |
| [Yarn](https://yarnpkg.com/) | 1.x |
| [TypeScript](https://www.typescriptlang.org/) | 4.x (installed as a dev dependency) |
| Discord bot application | See setup below |
| Discord server with custom letter emojis | See setup below |

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/neozen22/Wordly.git
cd Wordly
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Create a Discord application and bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application**, give it a name, and save.
3. Open the **Bot** tab → click **Add Bot**.
4. Under **Token**, click **Reset Token** and copy the token — you will need it for the `.env` file.
5. Enable the following **Privileged Gateway Intents**:
   - `SERVER MEMBERS INTENT`
   - `MESSAGE CONTENT INTENT`

### 4. Invite the bot to your server

In the **OAuth2 → URL Generator** tab:
- Scopes: `bot`, `applications.commands`
- Bot Permissions: `Send Messages`, `Read Message History`, `Manage Messages`, `Embed Links`

Open the generated URL to add the bot to your server.

### 5. Add custom letter emojis

Wordly uses three sets of custom Discord emojis (green, yellow, and gray for each letter a–z). The emoji IDs are already defined in `src/utils/constants.ts`.

You need to upload these 78 emoji images to your Discord server and update the emoji IDs in `src/utils/constants.ts` to match your server's emojis. Each emoji should be named following the pattern `green_a`, `green_b`, …, `yellow_a`, …, `gray_a`, …, `gray_z`.

### 6. Configure environment variables

Create a `.env` file in the project root (it is already in `.gitignore` and will not be committed):

```env
bottoken=YOUR_DISCORD_BOT_TOKEN
guildId=YOUR_DISCORD_SERVER_ID
enviroment=dev
```

> **Never commit your `.env` file or share your bot token publicly.**

---

## Configuration

| Variable | Description | Example |
|---|---|---|
| `bottoken` | Discord bot token from the Developer Portal | `MTA0...` |
| `guildId` | Your Discord server (guild) ID — used to scope command registration | `942000000000000000` |
| `enviroment` | Runtime environment (`dev`, `prod`, or `debug`) | `dev` |

---

## Running the Bot

### Development (with auto-restart on file changes)

```bash
yarn startdev
```

### Development (single run via ts-node)

```bash
yarn start
```

### Production (compile first, then run)

```bash
yarn build
yarn startprod
```

### TypeScript watch mode (compile only)

```bash
yarn watch
```

---

## Commands

| Command | Description |
|---|---|
| `/play` | Start a new Wordle session for yourself |
| `/ping` | Check that the bot is online and responding |

---

## How to Play

1. Run `/play` in any text channel where the bot has permissions.
2. The bot posts a game board with 6 empty rows.
3. Type a **5-letter word** as a regular message.
4. The bot will:
   - Delete your message
   - Update the board with coloured emoji tiles for that guess
   - Update the "Used Letters" field with any eliminated letters
5. Continue guessing until you either:
   - Match all 5 letters → **You Win! 🎉**
   - Use all 6 rounds → **You Lose 😔**

> **Note:** Only words present in the valid word list (`src/data/allwords.txt`) are accepted as guesses.

---

## Project Structure

```
Wordly/
├── src/
│   ├── commands/
│   │   ├── ping.ts          # /ping slash command
│   │   └── play.ts          # /play slash command (starts a game)
│   ├── data/
│   │   ├── allwords.txt     # Full list of valid 5-letter guess words
│   │   └── words.txt        # Alternate/reference word list
│   ├── events/
│   │   ├── interactionCreate.ts  # Handles slash command interactions
│   │   ├── messageCreate.ts      # Handles player guesses and game logic
│   │   └── ready.ts              # Fires when the bot connects to Discord
│   ├── stuructures/
│   │   ├── Client.ts        # Extended Discord Client; manages game sessions
│   │   ├── Command.ts       # Base Command class
│   │   └── Event.ts         # Base Event class
│   ├── utils/
│   │   ├── constants.ts     # Emoji tile codes, letter enums, and word list
│   │   └── gameHandlers.ts  # Core game logic (word checking, win/loss state)
│   └── index.ts             # Entry point; initialises and starts the bot
├── enviroment.d.ts          # TypeScript declarations for environment variables
├── package.json
├── tsconfig.json
└── .env                     # (you create this — not committed to git)
```

---

## Tech Stack

| Library | Purpose |
|---|---|
| [discord.js v13](https://discord.js.org/) | Discord API wrapper |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable loading |
| [cron](https://github.com/kelektiv/node-cron) | Scheduled task support |
| [TypeScript 4](https://www.typescriptlang.org/) | Typed JavaScript |
| [ts-node](https://github.com/TypeStrong/ts-node) | Run TypeScript directly in Node.js |
| [ts-node-dev](https://github.com/wclr/ts-node-dev) | Auto-restart development server |

---

## Security Notes

- **Bot token**: Loaded at runtime from a `.env` file. The `.gitignore` already excludes `.env`, so the token is never committed to the repository.
- **No third-party API keys**: The bot communicates exclusively with the Discord API.
- **Custom emoji IDs**: The numeric emoji IDs in `src/utils/constants.ts` are server-specific Discord resource identifiers. They are not secret values, but they must be updated to match the emojis in your own server before the bot can display coloured tiles correctly.
