# MazaoLoop 🌾

**AI-powered marketplace for crop waste and agricultural byproducts.** MazaoLoop connects farmers producing crop residue, husks, stalks, and other waste with buyers who can put it to use — feed millers, briquette and biogas producers, and compost/fertilizer companies — turning discarded farm waste into a revenue stream.

Created and developed by [MIKESTH3TIC.DEV](https://mikesth3tic-dev.vercel.app).

---

## How it works

- **Farmers** list available crop waste — type, quantity, and location.
- **Buyers** post demand for specific waste types and volumes.
- A **hybrid matching engine** narrows listings with fast rules-based filtering (waste type, location radius, quantity), then uses an LLM to reason over the shortlist and rank the best-fit matches.
- A **USSD fallback** (planned, Phase 2) lets farmers without smartphones list waste and receive matches via feature phone.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) + React 19 |
| Language | TypeScript |
| Database / Auth | [Supabase](https://supabase.com/) (`@supabase/ssr`, `@supabase/supabase-js`) |
| AI matching | [Groq](https://groq.com/) (`groq-sdk`) |
| USSD (Phase 2) | Africa's Talking |
| UI | Tailwind-friendly, `lucide-react` icons |
| Utilities | `date-fns`, `clsx` |

## Project structure

```
MAZAOLOOP/
├── app/               # Next.js App Router pages/routes
├── components/        # UI components (layout, etc.)
├── lib/               # Shared logic (matching engine, Supabase client, etc.)
├── supabase/
│   └── migrations/    # Database schema migrations
├── middleware.ts       # Next.js middleware (auth/session handling)
└── next.config.mjs
```

## Getting started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com/) project
- A free [Groq API key](https://console.groq.com/)

### Setup

1. Clone the repo
   ```bash
   git clone https://github.com/Michael-Mokua/MAZAOLOOP.git
   cd MAZAOLOOP
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Copy the environment template and fill in your keys
   ```bash
   cp .env.local.example .env.local
   ```
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Groq (AI Matching)
   GROQ_API_KEY=your-groq-api-key

   # Africa's Talking USSD (Phase 2)
   # AT_API_KEY=your-africastalking-api-key
   # AT_USERNAME=your-africastalking-username
   ```

4. Run the Supabase migrations in `supabase/migrations/` against your project.

5. Start the dev server
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000).

### Available scripts
- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — run the production build
- `npm run lint` — lint the codebase

## Roadmap

- [x] Core listing/demand flow (Supabase-backed)
- [x] Hybrid rules + LLM matching engine (Groq)
- [ ] USSD fallback via Africa's Talking
- [ ] In-app payments (M-Pesa/Daraja)
- [ ] Logistics coordination
- [ ] Ratings/trust system
- [ ] Carbon/impact reporting

## About

MazaoLoop is owned and developed by [Michael Ogutu Mokua](https://github.com/Michael-Mokua) through [MIKESTH3TIC.DEV](https://mikesth3tic-dev.vercel.app), an AI-focused software studio based in Nairobi, Kenya.
