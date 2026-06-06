# KAGE — Japanese Warrior Fitness App

> *The path of the warrior begins with a single shadow.*

A cinematic, full-stack fitness tracking app built with **React Native + Expo** and
**Supabase**. Train with 53 warrior-themed bodyweight exercises, earn XP, unlock
achievements, and sync your progress across devices.

## Features

### Training
- 53 KAGE exercises with full anatomical data (target, equipment, muscles, force, level)
- 10 predefined workout templates (Path of the Ronin, Oni Legion, Shadow Emperor, …)
- Live workout player with rest timer, set tracking, weight logging
- Real-time 1RM (Epley) + Epley/Brzycki/Lombardi/Mayhew/O'Conner calculators
- Plate calculator with IPF color coding
- 4-set warmup pyramid generator
- Exercise image browser with pinch-zoom fullscreen view
- Previous-performance recall per exercise
- Body measurements tracker (weight, body fat, circumferences)
- Personal records auto-detected and celebrated

### Progression
- XP system with 4 categories (strength, discipline, endurance, focus)
- Level curve, rank titles, day streak tracking
- 11+ achievements (auto-awarded via database triggers)
- Leaderboard (top 100 by XP)

### Cinematic design
- Japanese warrior dojo theme (navy #0B1A2E, dojo red #C8102E, gold #C9A84C)
- 3D DepthCard with mouse/touch parallax tilt
- Particle backgrounds, animated kanji accents
- Reanimated transitions, gesture-driven interactions
- Glass-morphism UI with depth and motion

### Cloud sync (Supabase)
- Email/password authentication (Supabase Auth)
- Cross-device workout history
- Personal records leaderboard
- Body measurements history
- XP/level/streak automatically synced
- Offline-first — local AsyncStorage is the source of truth, cloud is a mirror
- Pending-sync queue drains when network returns

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React Native 0.81 + Expo 54 + Expo Router |
| State | Zustand (5 stores) |
| Animation | Reanimated 3.17 + Gesture Handler 2.26 |
| 3D / SVG | react-native-svg |
| Local storage | AsyncStorage 2.1 |
| Backend | **Supabase** (PostgreSQL + Auth + Storage + RLS) |
| Alt backend | FastAPI (17 endpoints) — for self-hosting |
| Migrations | Python `migrate.py` over Supabase REST API |

## Project structure

```
kage/
├── app/                              ← Expo Router screens
│   ├── _layout.tsx                   ← root stack
│   ├── auth.tsx                      ← login / signup
│   ├── settings.tsx                  ← cloud sync, theme, tools
│   ├── history.tsx                   ← workout history
│   ├── measurements.tsx              ← body stats
│   ├── templates.tsx                 ← workout templates
│   ├── prs.tsx                       ← personal records
│   ├── lock-in.tsx                   ← focus session
│   ├── browse-exercises.tsx          ← 2-col grid
│   ├── one-rm-calculator.tsx         ← 1RM formulas
│   ├── plate-calculator.tsx          ← IPF plate loader
│   ├── warmup-calculator.tsx         ← 4-set pyramid
│   └── (tabs)/
│       ├── index.tsx                 ← home (sensei greeting, level card)
│       ├── workout.tsx               ← live workout player
│       ├── progress.tsx              ← XP/level/streak
│       └── profile.tsx               ← achievements + stats
├── src/
│   ├── components/
│   │   ├── ui/                       ← buttons, cards, glass, ink
│   │   ├── workout/                  ← ExerciseCard, SetRow, Timer, etc.
│   │   ├── cinematic/                ← DepthCard, ParticleBackground
│   │   ├── coach/                    ← Sensei (motivational quotes)
│   │   └── achievements/             ← badge components
│   ├── store/                        ← Zustand stores
│   │   ├── authStore.ts              ← Supabase auth
│   │   ├── workoutStore.ts           ← session CRUD (local)
│   │   ├── progressionStore.ts       ← XP / level / streak
│   │   ├── exerciseStore.ts
│   │   └── uiStore.ts
│   ├── lib/
│   │   ├── supabase.ts               ← minimal Supabase client (no SDK)
│   │   └── supabaseSync.ts           ← workout/PR sync logic
│   ├── api/                          ← legacy FastAPI client (fallback)
│   ├── constants/                    ← workout data
│   ├── hooks/
│   ├── theme/                        ← colors, spacing, typography
│   └── utils/
├── backend/
│   ├── README.md
│   ├── Dockerfile
│   ├── app/                          ← FastAPI app (17 endpoints)
│   ├── supabase/                     ← Supabase migration set
│   │   ├── README.md
│   │   ├── migrate.py                ← REST API migration runner
│   │   ├── migrations/001_init_schema.sql
│   │   └── seeds/{exercises,templates}.json
│   ├── init_schema.sql
│   ├── seed_data.sql
│   └── seed_templates.sql
└── app.json                          ← Expo config + EXPO_PUBLIC_* env vars
```

## Setup

### 1. Install

```bash
npm install
```

### 2. Configure Supabase (optional but recommended)

The app works fully offline. To enable cloud sync:

a. Create a Supabase project at https://supabase.com/dashboard

b. Apply the schema:
- Open SQL Editor → New query
- Paste contents of `backend/supabase/migrations/001_init_schema.sql`
- Click Run

c. Set env vars in `app.json`:
```json
{
  "expo": {
    "extra": {
      "EXPO_PUBLIC_SUPABASE_URL": "https://your-project.supabase.co",
      "EXPO_PUBLIC_SUPABASE_ANON_KEY": "eyJ..."
    }
  }
}
```

Get these from **Supabase Dashboard → Settings → API**.

### 3. Run

```bash
# Web
npx expo start --web

# iOS
npx expo start --ios

# Android
npx expo start --android
```

## License

MIT
