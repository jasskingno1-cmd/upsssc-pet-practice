# UPSSSC PET PYQ Master

A mobile-first, local-first exam simulator that runs as a static site. No login, backend, API key, or paid API is required. It uses browser localStorage for persistence and includes a PWA manifest/service worker for caching after first load.

## Important content and exam-rule caveat

The included 8-question starter bank contains **ORIGINAL PRACTICE QUESTION** items only. It is not a complete question bank and does not claim to contain authentic UPSSSC PET PYQs. Confirmed PYQ counts remain zero until genuine sourced material is imported and reviewed. The default 100 questions / 120 minutes / +1 / −0.25 configuration is a provisional user-configurable default; check the official notification for the relevant exam cycle before relying on it.

## Run locally

Requirements: Node.js 20+ (tests use the built-in Node test runner) and Python 3 for the simplest static server.

```bash
npm test
npm run build
npm start
```

Open `http://localhost:4173`. Alternatively run `python3 -m http.server 4173` from the project directory. Do not open `index.html` via `file://`; module fetch and PWA features need HTTP/HTTPS.

## Deploy to GitHub Pages

1. Upload the *contents* of this folder to the repository root (including `index.html`, `app.js`, `styles.css`, `data/`, `sw.js`, and `manifest.webmanifest`).
2. In GitHub repository Settings → Pages, select Deploy from a branch, branch `main`, folder `/(root)`, then Save.
3. Wait for the Pages deployment to finish and open the generated HTTPS URL. Relative links are used, so a project site under `username.github.io/repository/` is supported. No client-side router is used, so refreshing the page does not create route 404s.
4. The included service worker caches core app files. After the first successful visit, revisit once online before expecting offline launch. If you publish under a path and later change file names, update the cache list in `sw.js` and bump `CACHE` version.

## Data and backups

- Data is stored in this browser profile's localStorage under `petmaster.v1`. It does not sync to other devices and can be removed by browser storage clearing.
- Settings → Export full backup downloads JSON with questions, attempts, settings, notes, bookmarks, revision and planner state.
- Settings → Restore backup validates the outer backup shape and replaces current local data after confirmation. Keep a separate copy before restoring.
- Question Bank → Import JSON accepts an array of question objects; Import CSV accepts the columns shown by Export CSV. IDs must be unique. Invalid questions and duplicate IDs are skipped and counted.
- Each question requires `id`, `text`, four `options`, integer `answer` (0=A … 3=D), `explanation`, four `optionExplanations`, `subject`, `topic`, and `status`. Optional fields include `exam`, `year`, `sourceName`, `sourceUrl`, `difficulty`, `keyFact`, `tip`, `tags`, `language`, `date`, `shift`, `originalQuestionNumber`, `disputed`, and `sourceDocument`.
- The import screen checks structural completeness but cannot independently authenticate a source. A confirmed PYQ status requires source name, URL and year in the UI, and still requires human verification.

## Automated checks

Run `npm test`. Tests validate starter data uniqueness, four options and option-wise explanations, no false PYQ labels, scoring with negative marking and skipped answers, configurable marking values, and PWA files. These are unit/data checks, **not** a full browser end-to-end suite. Manual browser checks are still needed for visual responsiveness, actual browser persistence, timer interactions and offline behavior on target devices.

## Current implemented features

- Responsive dashboard, bottom mobile navigation, light/dark theme.
- Timed mock sessions, editable duration/count/marks, saved answers, question palette, mark for review, clear answer, auto-submit on timer expiration, confirmation before manual submission, reload recovery, keyboard arrows/1–4/M.
- Practice, subject/topic filters, weak-area, mistake, due-revision and daily practice session modes.
- Scorecard with correct/wrong/skipped, net score, accuracy, attempt rate, penalty, time and subject breakdown.
- Per-option explanations, bookmarks, personal notes, locally stored issue reports and mistake classification.
- Attempt history/review/replay, rule-based weak topic calculations, confidence calibration, basic score trend chart, revision ladder and time-budget study planner.
- Question add/edit, JSON/CSV import/export, duplicate ID detection, coverage counts and full backup/restore.
- PWA manifest and cache-first offline fallback for core files/questions.

## Known limitations

- No backend/cloud sync, multi-device transfer except manual backup, OCR/PDF ingestion, automatic official-source validation, true full-screen browser API, leaderboard, or PDF scorecard export.
- The sample bank is intentionally small and entirely original practice material. Analytics and recommendations require actual user attempts.
- `localStorage` has browser-specific size limits. Export a backup regularly; larger question banks may warrant IndexedDB in a future version.
- Offline use requires a first successful HTTPS load. Google Fonts are remote optional styling and may not load offline.
- Timed session time is saved periodically and on navigation/unload; browser process termination can lose up to a few seconds of timer progress.
