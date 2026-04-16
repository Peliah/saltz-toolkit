# Saltz Toolkit

**Saltz Toolkit** is a small, offline-friendly utility app for everyday jobs: converting units, timing work, jotting notes, tracking quick tasks, and a handful of other tools—packaged in a warm, hand-drawn visual style (Kalam & Patrick Hand) that feels like paper and ink rather than a generic system UI.

Built with **Expo** and **React Native**, it targets **iOS** and **Android** (and can run in the browser for development). Navigation uses **Expo Router** with a tabbed home and stack-based tool screens.

---

## Features

### Kit (home)

- **Hero card** — **Today’s tasks** teaser: open count, optional **overdue / due today** counts, title preview, and tap-through to the full task list.
- **Tool grid** — A bento-style launcher for every live tool (featured tiles for the heavy hitters, compact tiles for the rest).

### Tools

| Tool | What it does |
|------|----------------|
| **Converter** | Unit conversion and live currency-style conversion workflows. |
| **Timer & stopwatch** | Countdown timer and stopwatch with laps. |
| **Calculator** | Quick arithmetic. |
| **Passwords** | Generate strong random strings for passwords or secrets. |
| **Notes** | Short notes stored **on device**; add, edit, and delete from a list. Editor opens in a **bottom sheet** so you stay oriented on the list behind it. |
| **Tasks** | **UI-first scheduler**: optional **due date & time**, sections (Overdue / Today / Upcoming / No date / Done), an “at a glance” summary, and a decorative week strip. Edit in a bottom sheet (native date/time picker on iOS/Android). Same **local-only** storage as notes—works offline, no push notifications. (Timer is a separate tool, not linked from tasks.) |

*(A QR scan tool route exists in the codebase but is not currently listed in the hub.)*

### Data & privacy

- Notes and tasks persist with **AsyncStorage** on the device. Nothing is synced to a server by this app; treat backups as your own responsibility if you rely on the data long term.

---

## Prerequisites

- **Node.js** (LTS recommended)
- **npm** (or compatible client)
- For physical devices: **Expo Go**, or a **development build** / simulator as you prefer

You do **not** need a global Expo CLI install—`npx expo` is enough.

---

## Setup

Clone the repository, then install dependencies:

```bash
npm install
```

---

## Run the app

Start the development server:

```bash
npm start
```

This runs `expo start` and opens the Expo Dev Tools. From there you can:

- Press **`i`** for the iOS Simulator (macOS)
- Press **`a`** for an Android emulator
- Scan the QR code with **Expo Go** on a phone (same network as your machine)
- Press **`w`** to open the **web** build

Shortcuts are also available as npm scripts:

```bash
npm run ios       # expo start --ios
npm run android   # expo start --android
npm run web       # expo start --web
```

### Linting

```bash
npm run lint
```

TypeScript is used throughout; your editor can run the TS server, or you can check from the CLI with:

```bash
npx tsc --noEmit
```

---

## Production builds (EAS)

The repo includes **EAS** configuration (`eas.json`, `app.json` extras). To produce store-ready or internal binaries you’ll need the [EAS CLI](https://docs.expo.dev/build/introduction/) and an Expo account configured for this project. Typical flow:

```bash
npx eas-cli build --platform android   # or ios, or both
```

Exact profiles (`development`, `preview`, `production`, etc.) are defined in `eas.json`.

---

## Project layout

| Path | Role |
|------|------|
| `app/` | File-based routes (Expo Router): tabs, tool screens, layouts |
| `components/` | Reusable UI (sketch-themed primitives, kit hub, notes, tasks, layout) |
| `hooks/` | React hooks for tool state and hub previews |
| `lib/` | Helpers, persistence (e.g. AsyncStorage), tool registry, due-date formatting |
| `types/` | Shared TypeScript types |
| `constants/` | Theme tokens (colors, spacing, typography) |
| `assets/` | Images and fonts consumed by Expo |

---

## License

This project is **private** (see `package.json`). Adjust licensing if you open-source it.
