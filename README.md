# Saltz Toolkit

Mobile utility app (Expo + React Native). Home includes a unit converter; other screens include Notes and a Tools list.

## Prerequisites

- Node.js
- [Expo CLI](https://docs.expo.dev/get-started/installation/) via `npx` (no global install required)

## Setup

```bash
npm install
```

## Run

```bash
npx expo start
```

Then open in Expo Go, an iOS simulator, an Android emulator, or a development build as prompted in the terminal.

## Project layout

- `app/` — routes ([Expo Router](https://docs.expo.dev/router/introduction/))
- `components/` — UI
- `lib/` — shared logic (e.g. conversion helpers)

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Start Metro (`expo start`) |
| `npm run android` / `ios` / `web` | Platform targets |
| `npm run lint` | ESLint |
