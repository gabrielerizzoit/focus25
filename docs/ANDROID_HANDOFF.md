# Focus25 — Android Native Handoff

Documento tecnico per una riscrittura **Android nativa in Kotlin + Jetpack Compose**, non per un wrapper WebView/Capacitor.

- **Data dell'analisi:** 25 ottobre 2026.
- **Ambito:** fotografia del codice disponibile nel repository; non attestazione della versione attualmente pubblicata né delle impostazioni remote di Google Analytics/hosting.
- **Sito:** https://focus25.io — dominio primario dichiarato: https://www.focus25.io.
- **Deploy Lovable:** https://focus25.lovable.app.
- **Identità:** Focus25, timer Pomodoro gratuito, minimale, senza login.
- **Metodo:** lettura sorgenti/configurazioni, inventario route, persistenza e asset. Nessuna modifica al codice dell'app. Nessuna prova runtime svolta per questo documento.
- **Convenzione:** “Attuale” indica il comportamento del sorgente; “Android” indica una proposta di porting, non una funzione già realizzata. Le discrepanze tra requisiti storici/testi e implementazione sono esplicite.

## 1. STACK

### Architettura attuale

SPA client-side React 18 + TypeScript. React DOM monta `App` in `src/main.tsx`; routing con `BrowserRouter`, metadati con `react-helmet-async`, stato principalmente in hook React. `QueryClientProvider` è montato ma non esistono query applicative a un backend. UI shadcn/Radix e icone Lucide; Tailwind CSS v3, non v4.

`App.tsx` monta: `HelmetProvider → QueryClientProvider → TooltipProvider → BrowserRouter → LanguageProvider → AudioProvider → ScrollToTop + Routes`. Toaster globale disponibile. I file dei controlli UI sono in `src/components/ui/`.

### Versioni dichiarate

Le versioni qui sotto sono i **range di package.json**, non versioni bloccate/installate. Sono presenti `package-lock.json`, `bun.lock`, `bun.lockb`; concordare un unico lockfile nella manutenzione web. Una dipendenza dichiarata non implica che sia usata dal prodotto: carousel, grafici, calendari, OTP, ecc. sono prevalentemente scaffolding UI.

### dependencies

| Pacchetto | Versione dichiarata |
|---|---|
| `@hookform/resolvers` | `^3.10.0` |
| `@radix-ui/react-accordion` | `^1.2.11` |
| `@radix-ui/react-alert-dialog` | `^1.1.14` |
| `@radix-ui/react-aspect-ratio` | `^1.1.7` |
| `@radix-ui/react-avatar` | `^1.1.10` |
| `@radix-ui/react-checkbox` | `^1.3.2` |
| `@radix-ui/react-collapsible` | `^1.1.11` |
| `@radix-ui/react-context-menu` | `^2.2.15` |
| `@radix-ui/react-dialog` | `^1.1.14` |
| `@radix-ui/react-dropdown-menu` | `^2.1.15` |
| `@radix-ui/react-hover-card` | `^1.1.14` |
| `@radix-ui/react-label` | `^2.1.7` |
| `@radix-ui/react-menubar` | `^1.1.15` |
| `@radix-ui/react-navigation-menu` | `^1.2.13` |
| `@radix-ui/react-popover` | `^1.1.14` |
| `@radix-ui/react-progress` | `^1.1.7` |
| `@radix-ui/react-radio-group` | `^1.3.7` |
| `@radix-ui/react-scroll-area` | `^1.2.9` |
| `@radix-ui/react-select` | `^2.2.5` |
| `@radix-ui/react-separator` | `^1.1.7` |
| `@radix-ui/react-slider` | `^1.3.5` |
| `@radix-ui/react-slot` | `^1.2.3` |
| `@radix-ui/react-switch` | `^1.2.5` |
| `@radix-ui/react-tabs` | `^1.1.12` |
| `@radix-ui/react-toast` | `^1.2.14` |
| `@radix-ui/react-toggle` | `^1.1.9` |
| `@radix-ui/react-toggle-group` | `^1.1.10` |
| `@radix-ui/react-tooltip` | `^1.2.7` |
| `@tanstack/react-query` | `^5.83.0` |
| `class-variance-authority` | `^0.7.1` |
| `clsx` | `^2.1.1` |
| `cmdk` | `^1.1.1` |
| `date-fns` | `^3.6.0` |
| `embla-carousel-react` | `^8.6.0` |
| `input-otp` | `^1.4.2` |
| `lucide-react` | `^0.462.0` |
| `next-themes` | `^0.3.0` |
| `react` | `^18.3.1` |
| `react-day-picker` | `^8.10.1` |
| `react-dom` | `^18.3.1` |
| `react-helmet-async` | `^3.0.0` |
| `react-hook-form` | `^7.61.1` |
| `react-resizable-panels` | `^2.1.9` |
| `react-router-dom` | `^6.30.1` |
| `recharts` | `^2.15.4` |
| `sonner` | `^1.7.4` |
| `tailwind-merge` | `^2.6.0` |
| `tailwindcss-animate` | `^1.0.7` |
| `vaul` | `^0.9.9` |
| `zod` | `^3.25.76` |

### devDependencies

| Pacchetto | Versione dichiarata |
|---|---|
| `@eslint/js` | `^9.32.0` |
| `@playwright/test` | `^1.57.0` |
| `@tailwindcss/typography` | `^0.5.16` |
| `@testing-library/jest-dom` | `^6.6.0` |
| `@testing-library/react` | `^16.0.0` |
| `@types/node` | `^22.16.5` |
| `@types/react` | `^18.3.23` |
| `@types/react-dom` | `^18.3.7` |
| `@vitejs/plugin-react-swc` | `^3.11.0` |
| `autoprefixer` | `^10.4.21` |
| `eslint` | `^9.32.0` |
| `eslint-plugin-react-hooks` | `^5.2.0` |
| `eslint-plugin-react-refresh` | `^0.4.20` |
| `globals` | `^15.15.0` |
| `jsdom` | `^20.0.3` |
| `lovable-tagger` | `^1.1.13` |
| `postcss` | `^8.5.6` |
| `tailwindcss` | `^3.4.17` |
| `typescript` | `^5.8.3` |
| `typescript-eslint` | `^8.38.0` |
| `vite` | `^5.4.19` |
| `vitest` | `^3.2.4` |


### Build e test

- Vite `^5.4.19` con plugin React SWC `^3.11.0`; output standard `dist/`.
- TypeScript `^5.8.3`; `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`.
- PostCSS `^8.5.6`, Autoprefixer `^10.4.21`, Tailwind `^3.4.17`; configurazione in `postcss.config.js`, `tailwind.config.ts`, `src/index.css`.
- `vite.config.ts`: porta 8080, host `::`, alias `@ → src`, dedupe React; `lovable-tagger` solo in sviluppo.
- Script: `dev=vite`, `build=vite build`, `build:dev=vite build --mode development`, `lint=eslint .`, `preview=vite preview`, `test=vitest run`, `test:watch=vitest`.
- Vitest/jsdom/Testing Library; `vitest.config.ts` e `src/test/setup.ts`. L'unico test applicativo trovato è `src/test/example.test.ts`, con `expect(true).toBe(true)`: **non copre timer/regole**.
- Playwright `^1.57.0` configurato tramite `lovable-agent-playwright-config` in `playwright.config.ts`/`playwright-fixture.ts`; nessuna suite funzionale specifica trovata. `lovable-agent-playwright-config` è importato dalle configurazioni ma non dichiarato in package.json: disponibilità standalone non verificata.

### Destinazione Android proposta

Kotlin, Compose UI/Material 3, Android Gradle Plugin + Gradle, ViewModel/StateFlow, coroutines, Navigation Compose, DataStore; Media3 per audio ambientale. Versioni Kotlin/AGP/Compose BOM, `minSdk`, `targetSdk`, applicationId e firma **non sono definiti in questo repository**: selezionarli insieme in Android Studio e in base alle regole Play Store vigenti al rilascio. Non esiste un progetto Android, né configurazione Kotlin/Gradle, Firebase o Capacitor da trasferire.

## 2. PAGINE E NAVIGAZIONE

**Tutte le route sono pubbliche e gratuite.** Nessuna pagina loggata, premium, admin o protezione d'accesso. Fonte: `src/App.tsx`.

### Regola delle lingue

Inglese senza prefisso; altre lingue con `/it`, `/fr`, `/es`, `/pt`, `/hi`, `/tl`. Per ogni percorso inglese `P`, la variante è `/{lingua}{P}`; `/` diventa `/{lingua}`. Non è registrato `/en`. I nomi degli slug restano inglesi.

43 route concrete per lingua × 7 = **301 route concrete**, più catch-all `*`. La sitemap contiene 301 voci.

### Homepage e pagine timer

| Route inglese | Funzione | Durata fissa passata al timer |
|---|---|---|
| `/` | Timer completo, impostazioni, audio, temi, preset, statistiche; contenuto informativo e FAQ sotto | Nessuna |
| `/pomodoro-timer` | Timer completo + spiegazione Pomodoro | Nessuna |
| `/focus-timer` | Timer completo + contenuto sul focus | Nessuna |
| `/study-timer` | Timer completo + contenuto studio | Nessuna |
| `/25-minute-timer` | Timer con durata predefinita fissa | 1500 s |
| `/marinara-timer-alternative` | Timer + confronto con Marinara | Nessuna |
| `/pomofocus-alternative` | Timer + confronto con Pomofocus | Nessuna |
| `/online-timer` | Timer + contenuto timer online | Nessuna |
| `/timer-5-minutes` | Timer con durata fissa | 300 s |
| `/timer-10-minutes` | Timer con durata fissa | 600 s |
| `/timer-15-minutes` | Timer con durata fissa | 900 s |
| `/timer-online` | Timer + variante editoriale timer online | Nessuna |
| `/free-timer` | Timer + contenuto gratuità | Nessuna |

Fonte: `src/pages/Index.tsx`, `src/components/TimerPage.tsx`. Le pagine a durata fissa nascondono tab, auto-switch e impostazioni nel layout normale; audio, temi, preset e statistiche restano. Attenzione alla durata applicata anche alle pause: §3 e §14.

### Blog

`/blog`: indice di 24 articoli con titolo/estratto e link. `src/pages/Blog.tsx`.

Ogni percorso seguente usa `src/components/BlogLayout.tsx`: articolo tradotto, metadati, link correlati e CTA verso homepage; nessun timer incorporato.

| Route | Argomento |
|---|---|
| `/blog/what-is-pomodoro-technique` | Introduzione alla tecnica Pomodoro |
| `/blog/best-pomodoro-timer-online-2026` | Confronto timer online 2026 |
| `/blog/what-happened-to-marinara-timer` | Marinara Timer e alternative |
| `/blog/pomofocus-alternative-guide` | Alternative a Pomofocus |
| `/blog/how-to-stay-focused-while-studying` | Concentrazione nello studio |
| `/blog/25-minute-timer-benefits` | Benefici dei blocchi da 25 minuti |
| `/blog/study-timer-vs-pomodoro` | Timer studio vs Pomodoro |
| `/blog/deep-work-technique-explained` | Deep work |
| `/blog/best-free-study-tools-online` | Strumenti gratuiti per studiare |
| `/blog/how-to-avoid-distractions` | Gestione distrazioni |
| `/blog/adhd-and-focus` | ADHD e concentrazione |
| `/blog/best-study-techniques-for-adhd` | Tecniche studio per ADHD |
| `/blog/pomodoro-technique-for-adhd` | Adattamento del Pomodoro per ADHD |
| `/blog/how-to-stay-focused-with-adhd` | Focus con ADHD |
| `/blog/time-management-tips-adhd` | Gestione tempo con ADHD |
| `/blog/25-minute-timer-for-adhd` | Blocchi da 25 minuti e ADHD |
| `/blog/adhd-study-timer` | Timer studio per ADHD |
| `/blog/adhd-and-procrastination` | ADHD e procrastinazione |
| `/blog/deep-work-with-adhd` | Deep work con ADHD |
| `/blog/adhd-productivity-hacks` | Strategie produttività ADHD |
| `/blog/why-adhd-makes-tasks-hard` | Difficoltà nell'avvio dei compiti |
| `/blog/adhd-brain-explained` | Spiegazione divulgativa ADHD |
| `/blog/adhd-and-time-perception` | Percezione del tempo |
| `/blog/adhd-burnout-signs-solutions` | ADHD e burnout |

### Legale/info ed errori

`/terms`, `/privacy`, `/fair-use`, `/faq`, `/how-it-works`: `src/pages/LegalPage.tsx`, testo da `legalPages[slug]`, fallback inglese se vuoto. **Tutti i 5 contenuti sono vuoti in tutte le 7 lingue**, incluso l'inglese; le route esistono ma non forniscono un'informativa/testo utile. La FAQ homepage è separata ed è popolata.

`*`: `src/pages/NotFound.tsx`, “404”, messaggio inglese e link HTML `/`; log in console del pathname sconosciuto. Non conserva la lingua. È una vista client-side: non dimostra un HTTP 404 lato hosting.

### Flusso reale

```text
Logo/header → Homepage della lingua corrente
Selettore lingua → stesso pathname con nuovo prefisso
Homepage → Timer ↔ Impostazioni / Temi / Preset / Schermo intero
Homepage contenuti/footer → Pagine timer / Blog / Articoli / Legale
Blog → Articolo → Link correlati oppure CTA → Homepage localizzata
Pagine timer → CTA → Homepage localizzata
Link esterno → Wikipedia / Cirillo / YouTube (nuova scheda)
Route sconosciuta → Vista 404 → Homepage inglese
```

`ScrollToTop.tsx` chiama `window.scrollTo(0,0)` a ogni cambio pathname. Le CTA in `HomepageSEO.tsx` fanno **solo scroll smooth verso l'alto**, non avviano né reimpostano il timer nonostante il testo “Start…”. Cambio lingua tramite `LanguageSwitcher.tsx` non conserva query/hash.

Timer locale a ciascun mount di `Timer`; non c'è un TimerProvider globale. AudioProvider è sopra le route e mantiene il suono attraversando pagine/schermo intero. Non assumere che ogni navigazione mantenga o resetti sempre il timer: React può riutilizzare `TimerPage` tra route simili e `defaultDuration` non è gestito in modo completo (§14).

### Inventario espanso: tutti i 301 percorsi

```text
/
/pomodoro-timer
/focus-timer
/study-timer
/25-minute-timer
/marinara-timer-alternative
/pomofocus-alternative
/online-timer
/timer-5-minutes
/timer-10-minutes
/timer-15-minutes
/timer-online
/free-timer
/blog
/blog/what-is-pomodoro-technique
/blog/best-pomodoro-timer-online-2026
/blog/what-happened-to-marinara-timer
/blog/pomofocus-alternative-guide
/blog/how-to-stay-focused-while-studying
/blog/25-minute-timer-benefits
/blog/study-timer-vs-pomodoro
/blog/deep-work-technique-explained
/blog/best-free-study-tools-online
/blog/how-to-avoid-distractions
/blog/adhd-and-focus
/blog/best-study-techniques-for-adhd
/blog/pomodoro-technique-for-adhd
/blog/how-to-stay-focused-with-adhd
/blog/time-management-tips-adhd
/blog/25-minute-timer-for-adhd
/blog/adhd-study-timer
/blog/adhd-and-procrastination
/blog/deep-work-with-adhd
/blog/adhd-productivity-hacks
/blog/why-adhd-makes-tasks-hard
/blog/adhd-brain-explained
/blog/adhd-and-time-perception
/blog/adhd-burnout-signs-solutions
/terms
/privacy
/fair-use
/faq
/how-it-works
/it
/it/pomodoro-timer
/it/focus-timer
/it/study-timer
/it/25-minute-timer
/it/marinara-timer-alternative
/it/pomofocus-alternative
/it/online-timer
/it/timer-5-minutes
/it/timer-10-minutes
/it/timer-15-minutes
/it/timer-online
/it/free-timer
/it/blog
/it/blog/what-is-pomodoro-technique
/it/blog/best-pomodoro-timer-online-2026
/it/blog/what-happened-to-marinara-timer
/it/blog/pomofocus-alternative-guide
/it/blog/how-to-stay-focused-while-studying
/it/blog/25-minute-timer-benefits
/it/blog/study-timer-vs-pomodoro
/it/blog/deep-work-technique-explained
/it/blog/best-free-study-tools-online
/it/blog/how-to-avoid-distractions
/it/blog/adhd-and-focus
/it/blog/best-study-techniques-for-adhd
/it/blog/pomodoro-technique-for-adhd
/it/blog/how-to-stay-focused-with-adhd
/it/blog/time-management-tips-adhd
/it/blog/25-minute-timer-for-adhd
/it/blog/adhd-study-timer
/it/blog/adhd-and-procrastination
/it/blog/deep-work-with-adhd
/it/blog/adhd-productivity-hacks
/it/blog/why-adhd-makes-tasks-hard
/it/blog/adhd-brain-explained
/it/blog/adhd-and-time-perception
/it/blog/adhd-burnout-signs-solutions
/it/terms
/it/privacy
/it/fair-use
/it/faq
/it/how-it-works
/fr
/fr/pomodoro-timer
/fr/focus-timer
/fr/study-timer
/fr/25-minute-timer
/fr/marinara-timer-alternative
/fr/pomofocus-alternative
/fr/online-timer
/fr/timer-5-minutes
/fr/timer-10-minutes
/fr/timer-15-minutes
/fr/timer-online
/fr/free-timer
/fr/blog
/fr/blog/what-is-pomodoro-technique
/fr/blog/best-pomodoro-timer-online-2026
/fr/blog/what-happened-to-marinara-timer
/fr/blog/pomofocus-alternative-guide
/fr/blog/how-to-stay-focused-while-studying
/fr/blog/25-minute-timer-benefits
/fr/blog/study-timer-vs-pomodoro
/fr/blog/deep-work-technique-explained
/fr/blog/best-free-study-tools-online
/fr/blog/how-to-avoid-distractions
/fr/blog/adhd-and-focus
/fr/blog/best-study-techniques-for-adhd
/fr/blog/pomodoro-technique-for-adhd
/fr/blog/how-to-stay-focused-with-adhd
/fr/blog/time-management-tips-adhd
/fr/blog/25-minute-timer-for-adhd
/fr/blog/adhd-study-timer
/fr/blog/adhd-and-procrastination
/fr/blog/deep-work-with-adhd
/fr/blog/adhd-productivity-hacks
/fr/blog/why-adhd-makes-tasks-hard
/fr/blog/adhd-brain-explained
/fr/blog/adhd-and-time-perception
/fr/blog/adhd-burnout-signs-solutions
/fr/terms
/fr/privacy
/fr/fair-use
/fr/faq
/fr/how-it-works
/es
/es/pomodoro-timer
/es/focus-timer
/es/study-timer
/es/25-minute-timer
/es/marinara-timer-alternative
/es/pomofocus-alternative
/es/online-timer
/es/timer-5-minutes
/es/timer-10-minutes
/es/timer-15-minutes
/es/timer-online
/es/free-timer
/es/blog
/es/blog/what-is-pomodoro-technique
/es/blog/best-pomodoro-timer-online-2026
/es/blog/what-happened-to-marinara-timer
/es/blog/pomofocus-alternative-guide
/es/blog/how-to-stay-focused-while-studying
/es/blog/25-minute-timer-benefits
/es/blog/study-timer-vs-pomodoro
/es/blog/deep-work-technique-explained
/es/blog/best-free-study-tools-online
/es/blog/how-to-avoid-distractions
/es/blog/adhd-and-focus
/es/blog/best-study-techniques-for-adhd
/es/blog/pomodoro-technique-for-adhd
/es/blog/how-to-stay-focused-with-adhd
/es/blog/time-management-tips-adhd
/es/blog/25-minute-timer-for-adhd
/es/blog/adhd-study-timer
/es/blog/adhd-and-procrastination
/es/blog/deep-work-with-adhd
/es/blog/adhd-productivity-hacks
/es/blog/why-adhd-makes-tasks-hard
/es/blog/adhd-brain-explained
/es/blog/adhd-and-time-perception
/es/blog/adhd-burnout-signs-solutions
/es/terms
/es/privacy
/es/fair-use
/es/faq
/es/how-it-works
/pt
/pt/pomodoro-timer
/pt/focus-timer
/pt/study-timer
/pt/25-minute-timer
/pt/marinara-timer-alternative
/pt/pomofocus-alternative
/pt/online-timer
/pt/timer-5-minutes
/pt/timer-10-minutes
/pt/timer-15-minutes
/pt/timer-online
/pt/free-timer
/pt/blog
/pt/blog/what-is-pomodoro-technique
/pt/blog/best-pomodoro-timer-online-2026
/pt/blog/what-happened-to-marinara-timer
/pt/blog/pomofocus-alternative-guide
/pt/blog/how-to-stay-focused-while-studying
/pt/blog/25-minute-timer-benefits
/pt/blog/study-timer-vs-pomodoro
/pt/blog/deep-work-technique-explained
/pt/blog/best-free-study-tools-online
/pt/blog/how-to-avoid-distractions
/pt/blog/adhd-and-focus
/pt/blog/best-study-techniques-for-adhd
/pt/blog/pomodoro-technique-for-adhd
/pt/blog/how-to-stay-focused-with-adhd
/pt/blog/time-management-tips-adhd
/pt/blog/25-minute-timer-for-adhd
/pt/blog/adhd-study-timer
/pt/blog/adhd-and-procrastination
/pt/blog/deep-work-with-adhd
/pt/blog/adhd-productivity-hacks
/pt/blog/why-adhd-makes-tasks-hard
/pt/blog/adhd-brain-explained
/pt/blog/adhd-and-time-perception
/pt/blog/adhd-burnout-signs-solutions
/pt/terms
/pt/privacy
/pt/fair-use
/pt/faq
/pt/how-it-works
/hi
/hi/pomodoro-timer
/hi/focus-timer
/hi/study-timer
/hi/25-minute-timer
/hi/marinara-timer-alternative
/hi/pomofocus-alternative
/hi/online-timer
/hi/timer-5-minutes
/hi/timer-10-minutes
/hi/timer-15-minutes
/hi/timer-online
/hi/free-timer
/hi/blog
/hi/blog/what-is-pomodoro-technique
/hi/blog/best-pomodoro-timer-online-2026
/hi/blog/what-happened-to-marinara-timer
/hi/blog/pomofocus-alternative-guide
/hi/blog/how-to-stay-focused-while-studying
/hi/blog/25-minute-timer-benefits
/hi/blog/study-timer-vs-pomodoro
/hi/blog/deep-work-technique-explained
/hi/blog/best-free-study-tools-online
/hi/blog/how-to-avoid-distractions
/hi/blog/adhd-and-focus
/hi/blog/best-study-techniques-for-adhd
/hi/blog/pomodoro-technique-for-adhd
/hi/blog/how-to-stay-focused-with-adhd
/hi/blog/time-management-tips-adhd
/hi/blog/25-minute-timer-for-adhd
/hi/blog/adhd-study-timer
/hi/blog/adhd-and-procrastination
/hi/blog/deep-work-with-adhd
/hi/blog/adhd-productivity-hacks
/hi/blog/why-adhd-makes-tasks-hard
/hi/blog/adhd-brain-explained
/hi/blog/adhd-and-time-perception
/hi/blog/adhd-burnout-signs-solutions
/hi/terms
/hi/privacy
/hi/fair-use
/hi/faq
/hi/how-it-works
/tl
/tl/pomodoro-timer
/tl/focus-timer
/tl/study-timer
/tl/25-minute-timer
/tl/marinara-timer-alternative
/tl/pomofocus-alternative
/tl/online-timer
/tl/timer-5-minutes
/tl/timer-10-minutes
/tl/timer-15-minutes
/tl/timer-online
/tl/free-timer
/tl/blog
/tl/blog/what-is-pomodoro-technique
/tl/blog/best-pomodoro-timer-online-2026
/tl/blog/what-happened-to-marinara-timer
/tl/blog/pomofocus-alternative-guide
/tl/blog/how-to-stay-focused-while-studying
/tl/blog/25-minute-timer-benefits
/tl/blog/study-timer-vs-pomodoro
/tl/blog/deep-work-technique-explained
/tl/blog/best-free-study-tools-online
/tl/blog/how-to-avoid-distractions
/tl/blog/adhd-and-focus
/tl/blog/best-study-techniques-for-adhd
/tl/blog/pomodoro-technique-for-adhd
/tl/blog/how-to-stay-focused-with-adhd
/tl/blog/time-management-tips-adhd
/tl/blog/25-minute-timer-for-adhd
/tl/blog/adhd-study-timer
/tl/blog/adhd-and-procrastination
/tl/blog/deep-work-with-adhd
/tl/blog/adhd-productivity-hacks
/tl/blog/why-adhd-makes-tasks-hard
/tl/blog/adhd-brain-explained
/tl/blog/adhd-and-time-perception
/tl/blog/adhd-burnout-signs-solutions
/tl/terms
/tl/privacy
/tl/fair-use
/tl/faq
/tl/how-it-works
```


Per Android: una destinazione timer principale, contenuti navigabili se desiderati, destinazioni legali e schermata impostazioni/overlay. Le 12 pagine SEO non richiedono 12 implementazioni native differenti; eventuali App Links devono mappare gli URL pubblici a queste destinazioni.

## 3. FUNZIONALITÀ

### 3.1 Modello timer e valori

Fonte principale: `src/hooks/useTimer.ts`. UI e side effect: `src/components/Timer.tsx`.

```typescript
type TimerMode = 'focus' | 'shortBreak' | 'longBreak';
interface TimerSettings {
  focus: number; shortBreak: number; longBreak: number; // secondi interi
  longBreakInterval: number; longBreakEnabled: boolean;
}
interface TimerState {
  mode: TimerMode; remaining: number; totalDuration: number;
  isRunning: boolean; progress: number;
}
```

| Valore | Default | Limite nella funzione updateSettings |
|---|---:|---|
| `focus` | 1500 s (25:00) | 1…5999 s (99:59) |
| `shortBreak` | 300 s (05:00) | 1…5999 s |
| `longBreak` | 900 s (15:00) | 1…5999 s |
| `longBreakInterval` | 4 | 1…20, arrotondato |
| `longBreakEnabled` | true | Conversione Boolean |
| `autoSwitch` | true | Stato in memoria, non salvato |
| `focusCount` | 0 | Incremento per focus completato, non salvato |

`duration = defaultDuration || settings[mode]` in inizializzazione, reset, switch, totalDuration. **L'override non è limitato al focus.** Lo zero non è un override valido perché usa `||`.

### 3.2 Stato, calcolo e comandi

- Iniziale: focus fermo, tempo residuo = durata, riferimento pausa = durata, endTime nullo.
- **Start:** legge `pausedRemainingRef`; se ≤0 non fa nulla. `endTime = Date.now() + remainingPaused*1000`; `isRunning=true`; cancella intervallo precedente e avvia tick ogni **250 ms**.
- **Tick:** `left = max(0, ceil((endTime - Date.now())/1000))`; aggiorna remaining. Non decrementa di 1 ad ogni tick: usa deadline assoluta per evitare drift da intervallo.
- A `left=0`: cancella intervallo, ferma timer, azzera deadline, mette `hasCompletedRef=true`; effect successivo gestisce completamento.
- **Pause:** ricalcola remaining con stessa formula, salva `pausedRemainingRef`, cancella deadline/intervallo, ferma. Le frazioni di secondo vengono arrotondate verso l'alto; ripetuti pause/resume possono estendere leggermente la sessione.
- **Reset:** ferma tutto, azzera flag completamento, ripristina durata corrente. **Non** azzera focusCount, statistiche, impostazioni o autoSwitch.
- **Cambio modalità manuale:** ferma/resetta e imposta durata nuova; non incrementa contatori. Anche cliccare tab già selezionata resetta la sessione.
- **Progress:** `(totalDuration - remaining) / totalDuration`, o 0 se durata ≤0. Nessun clamp a 0…1. Cambiare impostazioni durante esecuzione può alterare progress senza cambiare deadline.
- **Display:** `floor(seconds/60)` + `seconds % 60`, entrambi con almeno 2 cifre: `MM:SS`.
- Unmount: cancella solo intervallo di tick; timer non viene ripristinato da storage. Nessuna gestione `visibilitychange`, worker, wake lock o servizio background.

### 3.3 Completamento, round e auto-switch

`onComplete(mode)` una volta per flag di completamento osservato. Per focus: focusCount+1 e incremento statistiche. Tutte le modalità: chime, analytics completamento, notifica se già autorizzata.

Se `autoSwitch=true`:

```text
focusCountAfter = focusCount + 1
interval = max(1, settings.longBreakInterval || 4)
focus → longBreak se longBreakEnabled && focusCountAfter % interval == 0
focus → shortBreak altrimenti
shortBreak → focus
longBreak → focus
```

Switch programmato con `setTimeout(...,500)` e auto-start mediante effect + `setTimeout(start,100)`. È un'intenzione di transizione dopo circa 600 ms, **non una garanzia**: pendingAutoStartRef viene impostato prima del cambio modalità e gli effect/timer asincroni possono interagire. Non ci sono ID per annullare questi timeout. Cambio modalità/reset/unmount in questa finestra può lasciare azioni pendenti.

Con autoSwitch false, arriva a 00:00 e resta fermo. Il riferimento pausa non viene aggiornato a zero al completamento; Start può riutilizzare un valore precedente alla scadenza invece di una regola esplicita di nuova sessione.

Round: il conteggio include tutti i focus completati nell'istanza corrente, non è il contatore giornaliero. Cambiare N usa il conteggio già esistente. Disabilitare long break non azzera il conteggio; riabilitandolo riprende la regola modulo N. Se disabilitato mentre il modo corrente è longBreak, UI chiama `switchMode('focus')` e nasconde tab; input round disabilitato ma durata longBreak resta modificabile.

### 3.4 Impostazioni minuti/secondi e reset

UI in `Timer.tsx`, righe dei 3 timer:

- Input testo numerico, `maxLength=2` per minuti e secondi.
- Rimuove non-cifre, zeri iniziali quando seguiti da altra cifra, conserva massimo due caratteri.
- Minuti clamp 0…99, secondi 0…59.
- Commit immediato: `max(1,min(5999,minutes*60+seconds))`.
- Input vuoto diventa 0 per quel campo; non esiste stato di editing vuoto indipendente dal valore salvato.
- Quindi **00:00 diventa immediatamente 00:01**, non errore validazione; il fallback onBlur alla durata default è normalmente irraggiungibile perché il commit impone già ≥1.
- Modificare solo minuti mantiene i secondi già presenti; essi sono 0 solo se già a zero (ad es. default). Non vengono azzerati automaticamente ad ogni modifica minuti.
- Round input: 1…20; vuoto →1. Update salva l'intero oggetto con timestamp. Il tooltip longBreak continua a dire “dopo4 sessioni” invece di usare il valore configurato (`src/i18n/en.ts`, UI equivalente tradotta).
- Settings modificati da fermo ripristinano remaining alla nuova durata. Durante esecuzione la deadline non si adatta; `prevSettingsRef` comunque avanza, quindi alla pausa non è garantito un riallineamento automatico.
- Reset default rimuove `focus25-settings`, ripristina 1500/300/900 s, 4 round e longBreakEnabled=true; ferma e resetta timer alla durata del modo corrente. Non cambia modo, autoSwitch, contatori o tema.

### 3.5 Preset

`src/components/TimerPresets.tsx`, callback in `Timer.tsx`:

| Preset | Focus | Short break |
|---|---:|---:|
| 25/5 | 1500 s | 300 s |
| 50/10 | 3000 s | 600 s |
| 15/5 | 900 s | 300 s |

Stato attivo confronta solo focus e shortBreak. **Il codice aggiorna solo questi due campi:** longBreak resta il valore personalizzato precedente, non viene forzato a 900 s. Requisito storico “long break sempre 15 minuti nei preset” non è implementato se l'utente lo ha modificato. Preset non cambia modo, autoSwitch o round; durante esecuzione non modifica deadline. Presenti anche sulle pagine a durata fissa, dove non cambiano la durata override visualizzata.

### 3.6 Statistiche

`src/hooks/useSessionStats.ts`, `src/components/SessionStats.tsx`:

- Solo focus completati contano; pause, reset/cambio manuale non contano.
- `getToday() = new Date().toISOString().split('T')[0]`: giorno **UTC**, non giorno locale.
- Load giorno diverso: todaySessions=0, lastDate=oggi; mantiene streak se ultimo giorno era “ieri”, altrimenti 0. “Ieri” viene calcolato con `setDate` locale e convertito in ISO UTC: possibile incoerenza con fuso/DST.
- Incremento: giorno nuovo → todaySessions=1, streak=precedente+1; stesso giorno → todaySessions+1, streak cresce solo se precedente todaySessions=0.
- Reset del giorno non è schedulato: avviene al load/incremento, non automaticamente a mezzanotte in UI.
- **Due istanze separate dell'hook**: una in Timer per incremento e una in SessionStats per display; condividono localStorage, ma non stato/react subscription. Il display può restare stale dopo completamento e una successiva ricreazione può riallinearlo.
- Nessun listener `storage`, nessun coordinamento multi-tab; ultima scrittura vince.
- Streak mostrato solo >1, emoji 🔥; testi “Today… session(s) completed” e “day streak” sono hardcoded inglesi.

### 3.7 Temi, fullscreen, contenuti

`ThemeSwitcher.tsx`: 3 temi, switch istantaneo via attributo `data-theme` su `<html>`, persistenza. Default rimuove attributo e chiave. Non segue automaticamente tema Android/browser. §10 per token.

`useFullscreen.ts`: prova `requestFullscreen` sul contenitore timer; su errore/API assente usa overlay fisso. Ascolta `fullscreenchange`; exit nativo o fallback; Escape chiude fallback. `Timer.tsx` crea layout alternativo con tab delle modalità, anello, tempo, etichetta, reset/start-pause/uscita e **audio compact**. Nasconde impostazioni, slider volume, temi/preset/statistiche. Tab fullscreen visibili anche sulle pagine a durata fissa; longBreak solo se abilitato. Dimensionamento §10. Nel fullscreen nativo viene sostituito il nodo React usato per requestFullscreen: da verificare compatibilità specifica browser.

Contenuti: template `HomepageSEO`, `TimerPage`, `BlogLayout`, `LegalPage`. FAQ homepage: accordion singolo collassabile + JSON-LD FAQPage. SEOHead genera title/description/canonical su focus25.io, hreflang 7 lingue + x-default (tl → fil nei tag), Open Graph e Twitter. `index.html` contiene anche meta/static JSON-LD WebApplication, prezzo 0 USD e link YouTube. Sitemap/robots/llms sono risorse web, non logica Android.

## 4. DATI LOCALI

Tre chiavi applicative in **localStorage**, condivise tra lingue/route nello stesso origin. Nessun uso applicativo di sessionStorage, IndexedDB o database locale. Cookie Analytics sono separati (§12). Il componente scaffolding non montato `src/components/ui/sidebar.tsx` contiene inoltre scrittura cookie `sidebar:state=true|false; path=/; max-age=604800` (7 giorni); non è persistenza effettiva del timer né prova che venga scritto nelle pagine raggiungibili.

| Chiave | Formato | Scrittura | Durata |
|---|---|---|---|
| `focus25-settings` | Oggetto JSON qui sotto | Ogni updateSettings; rimosso da resetSettings | 24 h dall'ultima scrittura, verifica solo al load |
| `focus25-stats` | JSON con contatori/data | Ogni focus completato | Nessun TTL |
| `focus25-theme` | Stringa `pink` oppure `light`; default = chiave assente | Cambio tema | Nessun TTL |

```json
{
  "focus": 1500,
  "shortBreak": 300,
  "longBreak": 900,
  "longBreakInterval": 4,
  "longBreakEnabled": true,
  "timestamp": 1792947360000
}
```

`timestamp`: millisecondi Unix di `Date.now()` al salvataggio, esempio non un valore operativo. Valido se timestamp truthy e `Date.now()-timestamp < 86400000`. Alla scadenza rimuove chiave e torna ai default. Non rinnova TTL usando timer/aprendo sito, né applica scadenza mentre hook resta montato. Non è “24 ore di inattività” nel senso generale. Timestamp futuro può risultare valido. I campi duration caricati non vengono validati/clampati; round/enable hanno fallback solo di tipo. JSON corrotto: catch → default; scritture storage non protette da try/catch.

```json
{
  "todaySessions": 3,
  "lastDate": "2026-10-25",
  "streak": 2
}
```

Statistica caricata senza validazione completa; parsing fallito → 0/oggi/0. Rollover calcolato nel load non è persistito fino al prossimo incremento.

**Non persistiti:** remaining, deadline, isRunning, mode, autoSwitch, focusCount, audio selezionato/volume, fullscreen, pannello settings, scelta lingua. Audio è mantenuto in memoria dal provider. Lingua deriva dal pathname; cache traduzioni e React Query in memoria. Nessun formato export/import, migrazione schema, sincronizzazione cloud o account.

Android: DataStore per settings/theme/stats; decidere separatamente persistenza della sessione in corso per process death. Non trasferire automaticamente dati dal localStorage del browser: Android e sito non condividono origin/storage. Non serve Room per questi tre piccoli record, salvo futuro storico sessioni.

## 5. BACKEND (SUPABASE O ALTRO)

**Nessun backend applicativo collegato o implementato nel progetto esaminato.** Non abilitare backend per il solo porting. Conferma coerente con stato progetto e assenza di client Supabase, dipendenze, query, migrazioni, configurazioni o endpoint applicativi.

| Elemento richiesto | Stato |
|---|---|
| URL progetto Supabase/Cloud | Non applicabile: nessun progetto collegato |
| Anon/publishable key pubblica | Non presente |
| Tabelle/colonne/tipi/relazioni | Nessuna tabella applicativa da migrare |
| Schema SQL | Nessuno |
| Policy RLS / grant / ruoli | Nessuno |
| Funzioni SQL / trigger | Nessuno |
| Storage bucket | Nessuno; media in `public/` |
| Realtime / canali / subscription | Nessuno |
| Server applicativo REST/GraphQL | Nessuno |

Hosting statico Lovable e domini del sito non sono URL di database. GA4 è un servizio terzo di analytics, non backend dei dati del timer. Nessuna chiave privata è necessaria per replicare le funzioni attuali. Impostazioni di servizi esterni non accessibili dal sorgente non sono certificate da questa analisi.

## 6. AUTENTICAZIONE

Assente. Nessun login/signup/logout, password reset, email/password, Google, Apple, magic link, OAuth/PKCE, redirect URL auth, access/refresh token o sessione utente. Nessuna tabella profili, account da eliminare o premium legato a utente.

La “sessione” del timer è un intervallo di focus, **non** una sessione autenticata. Su Android mantenere accesso immediato senza registrazione; non aggiungere account come requisito implicito. Eventuale comando “Cancella dati locali” sarebbe nuovo, non esiste nel sito; disinstallazione/cancellazione dati browser azzera dati locali. Reset settings non cancella statistiche o tema.

## 7. EDGE FUNCTIONS / API

Nessuna edge function, route API applicativa, callable function, webhook interno o chiamata fetch/Axios applicativa. Nessun endpoint JSON, contratto input/output o errore server da replicare.

**Nomi di segreti usati dall'app:** nessuno individuato. Measurement ID GA4 `G-WWP2QBPNWM` è pubblico, non un segreto.

Risorse/chiamate esterne attuali:

| Risorsa | Tipo | Input/output |
|---|---|---|
| `https://www.googletagmanager.com/gtag/js?id=G-WWP2QBPNWM` | Caricamento script GA4 | JavaScript; eventi via gtag, non API JSON di Focus25 |
| `/audio/rain.wav`, `/audio/cafe.mp3`, `/audio/white-noise.wav` | HTTP file statici stessa origine | Byte audio, nessuna auth |
| `/images/*.jpg` e favicon | HTTP file statici | Byte immagine |
| Moduli i18n lazy-load | Import dinamico gestito da Vite | Chunk JS, non traduzione server |
| Wikipedia / sito Cirillo / YouTube | Link esterni | Apertura pagina, non integrazione API/video embedded |

Browser API: Fullscreen, Notification, HTMLAudioElement, Web Audio, localStorage, Date.now, window resize/orientationchange. Sono API locali browser, non edge functions.

## 8. PAGAMENTI E ABBONAMENTI

Nessuno: niente Stripe/Paddle/PayPal/Google Play Billing, checkout, prodotti, abbonamenti, rinnovi, trial, entitlement premium, webhook pagamenti o verifica ricevute. Tutte le funzionalità sono accessibili gratuitamente.

Il prezzo **0 USD** nel JSON-LD è metadato SEO, non un catalogo o configurazione tariffaria. Versione `0.0.0` di package.json non è versione commerciale/store. Non portare acquisti o premium se non richiesti in futuro; in quel caso servirebbe progettazione separata.

## 9. NOTIFICHE, SUONI E MEDIA

### Notifiche

`Timer.tsx`: al click Start, se `Notification.permission === 'default'`, chiama `Notification.requestPermission()` senza attenderla/gestire errori; timer parte comunque. A completamento, solo se permission granted, crea `new Notification('Focus25',{body: ...})`, testo localizzato sessionComplete/breakOver. Nessun badge, icona custom, azione, ID, push remoto, pianificazione, Service Worker, FCM o vibrazione. Non vengono richieste nuovamente autorizzazioni denied. Il costruttore Notification non è protetto da try/catch: su piattaforma che lo espone ma lo rifiuta può interrompere onComplete prima della logica round/auto-switch del hook (rischio inferito dal sorgente, non prova device).

Android: permission `POST_NOTIFICATIONS` da API 33 quando pertinente, NotificationChannel dedicati; timer indipendente dal consenso. Canale controlla suono e visibilità. FCM non necessario per un timer locale. Scadenze in background richiedono progettazione Android specifica (§14), non semplici coroutine dell'Activity.

### Audio ambientale

`useAudio.ts` + `AudioContext.tsx` + `AudioPlayer.tsx`:

- Nessun suono ambientale iniziale; volume iniziale **0.5**.
- Un solo HTMLAudioElement, loop=true. Selezione diversa ferma/azzera quella precedente; stesso suono già attivo lo spegne e activeSound=null.
- `.play().catch(()=>{})`: stato viene impostato playing anche se il browser rifiuta playback; nessun errore visibile.
- `togglePlay` esiste nel hook, non esposto dal player corrente; pulsanti suoni gestiscono selezione/stop.
- Slider 0…100 con passo1 → volume 0…1. Solo visibile con activeSound e non compact.
- AudioProvider sopra route: sound/volume/elemento sopravvivono all'unmount del player nel fullscreen e tra pagine. Nessuna persistenza su reload, sincronizzazione con start/pause timer o audio focus sistema.
- L'hook corrente non ha cleanup di stop sull'unmount del provider; non leggere import `useEffect` come prova di cleanup.

| File | Dimensione byte | Durata circa | Codec / sample rate / canali |
|---|---:|---:|---|
| `public/audio/rain.wav` | 98,681,316 | 171.320 s | PCM signed 24 bit little endian, 96 kHz, stereo |
| `public/audio/cafe.mp3` | 6,244,310 | 195.135 s | MP3, 44.1 kHz, stereo |
| `public/audio/white-noise.wav` | 10,132,880 | 26.368 s | PCM float32 little endian, 48 kHz, stereo |

Android: ricodificare rain/noise in un formato compresso adatto, verificando qualità/loop seamless e licenza di ogni file; dimensioni WAV attuali sono elevate per un AAB. Media3/ExoPlayer con singolo player, repeat one, volume, audio focus e gestione chiamate/cuffie. Service/MediaSession se playback deve continuare fuori dall'app, con requisiti foreground pertinenti; non aggiungere permessi memoria esterna per asset bundled.

### Alert sintetizzati

`useAudio.ts`: **nessun file beep/chime**. Web Audio crea un nuovo AudioContext e ne fa esplicitamente `await ctx.resume()` ad ogni alert.

- Countdown con timer running e remaining da 5 a1: 800 Hz a 5/4/3/2, 1000 Hz a1, durata **100 ms**, gain0.3; osc tipo default sine; chiusura contesto dopo duration+100 ms. `playBeep` default della funzione è 800 Hz/150 ms, ma Timer passa100 ms.
- Dedup tramite lastBeepRef; azzerato solo quando remaining>5. Se tick salta secondi in background, beep saltati non sono recuperati. Sessioni molto brevi consecutive possono perdere un beep uguale al precedente.
- Completamento: sine 523.25 Hz, gain0.4 → rampa esponenziale0.01 in1.5 s, stop1.5 s, chiusura2 s.
- Non esiste toggle mute degli alert: “nessun audio iniziale” riguarda ambientale, non disabilitazione beep/chime. Start non esegue uno sblocco preventivo del contesto alert: i contesti vengono creati alla scadenza. Browser può bloccare contesto nonostante resume; catch silenziosi.
- Nessuna vibrazione/haptics.

Android: SoundPool per piccoli campioni riprodotti/pre-generati o sintesi equivalente; audio focus/volume stream e silent/DND da rispettare. Non duplicare chime con suono del canale notifica. Eventuale feedback aptico è una funzione nuova da approvare.

### Immagini e brand asset

| File | Dimensioni | Byte | Uso |
|---|---|---:|---|
| `public/images/study-desk.jpg` | 800×512 | 35,326 | Homepage, articoli |
| `public/images/focus-work.jpg` | 800×512 | 34,289 | Homepage, articoli |
| `public/images/study-session.jpg` | 800×512 | 53,185 | Articoli |
| `public/favicon.ico` | 256×256 (immagine letta) | 20,373 | Asset favicon disponibile |
| `public/placeholder.svg` | SVG | — | Placeholder scaffolding, non immagine principale del prodotto |

Logo header è testo **Focus25 + icona Lucide Timer** da20 px, non bitmap. `index.html` usa favicon SVG inline data URL: cerchio (centro50/50,r45,stroke6), lancette, stroke `#4CAF50`. Questo colore hardcoded non coincide esattamente con HSL primary. Nessuna icona adattiva Android/splash/store artwork pronta. Verificare diritti media; presenza nel repository non dimostra licenza commerciale.

## 10. DESIGN

### Palette: sorgente autorevole attuale

`src/index.css` contiene tre set di token HSL; `tailwind.config.ts` li mappa a ruoli semantici. La classe `.dark` è configurata in Tailwind ma i temi reali sono `:root`, `[data-theme="pink"]`, `[data-theme="light"]`. Default è dark; pink è pure dark. Non esiste tema auto/system.

**Importante:** valori storici `#4CAF50`, `#F472B6`, `#60A5FA`, `#FFC107`, sfondi dark dichiarati in descrizioni non sono conversioni esatte dei token attuali. Per replica fedele usare gli HSL sotto; HEX è conversione sRGB arrotondata a8 bit. Giallo pausa è identico nei3 temi (`45 100% 51%`), equivalente arrotondato **#FFC105**, non esattamente #FFC107. Una correzione ai valori storici sarebbe un cambiamento prodotto, non parte di questo handoff.

| Token CSS | Default HSL / HEX | Pink HSL / HEX | Light HSL / HEX |
|---|---|---|---|
| `--background` | `216 30% 6%` / `#0B0E14` | `224 71% 7%` / `#050C1F` | `210 20% 98%` / `#F9FAFB` |
| `--foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `224 71% 7%` / `#050C1F` |
| `--card` | `213 28% 12%` / `#161E27` | `224 50% 12%` / `#0F172E` | `210 20% 94%` / `#EDF0F3` |
| `--card-foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `224 71% 7%` / `#050C1F` |
| `--popover` | `213 28% 12%` / `#161E27` | `224 50% 12%` / `#0F172E` | `210 20% 94%` / `#EDF0F3` |
| `--popover-foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `224 71% 7%` / `#050C1F` |
| `--primary` | `122 39% 49%` / `#4CAE4F` | `330 81% 70%` / `#F075B3` | `217 91% 68%` / `#639CF8` |
| `--primary-foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` |
| `--secondary` | `45 100% 51%` / `#FFC105` | `45 100% 51%` / `#FFC105` | `45 100% 51%` / `#FFC105` |
| `--secondary-foreground` | `216 30% 6%` / `#0B0E14` | `216 30% 6%` / `#0B0E14` | `224 71% 7%` / `#050C1F` |
| `--muted` | `213 28% 16%` / `#1D2834` | `224 40% 16%` / `#182139` | `210 15% 90%` / `#E2E6E9` |
| `--muted-foreground` | `210 10% 58%` / `#89949F` | `320 10% 58%` / `#9F8997` | `215 14% 40%` / `#586474` |
| `--accent` | `213 28% 16%` / `#1D2834` | `224 40% 16%` / `#182139` | `210 15% 90%` / `#E2E6E9` |
| `--accent-foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `224 71% 7%` / `#050C1F` |
| `--destructive` | `0 84% 60%` / `#EF4343` | `0 84% 60%` / `#EF4343` | `0 84% 60%` / `#EF4343` |
| `--destructive-foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` |
| `--border` | `213 20% 20%` / `#29323D` | `224 30% 20%` / `#242C42` | `214 20% 82%` / `#C8D0DA` |
| `--input` | `213 20% 20%` / `#29323D` | `224 30% 20%` / `#242C42` | `214 20% 82%` / `#C8D0DA` |
| `--ring` | `122 39% 49%` / `#4CAE4F` | `330 81% 70%` / `#F075B3` | `217 91% 68%` / `#639CF8` |
| `--sidebar-background` | `216 30% 6%` / `#0B0E14` | `224 71% 7%` / `#050C1F` | `210 20% 98%` / `#F9FAFB` |
| `--sidebar-foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `224 71% 7%` / `#050C1F` |
| `--sidebar-primary` | `122 39% 49%` / `#4CAE4F` | `330 81% 70%` / `#F075B3` | `217 91% 68%` / `#639CF8` |
| `--sidebar-primary-foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` |
| `--sidebar-accent` | `213 28% 16%` / `#1D2834` | `224 40% 16%` / `#182139` | `210 15% 90%` / `#E2E6E9` |
| `--sidebar-accent-foreground` | `0 0% 100%` / `#FFFFFF` | `0 0% 100%` / `#FFFFFF` | `224 71% 7%` / `#050C1F` |
| `--sidebar-border` | `213 20% 20%` / `#29323D` | `224 30% 20%` / `#242C42` | `214 20% 82%` / `#C8D0DA` |
| `--sidebar-ring` | `122 39% 49%` / `#4CAE4F` | `330 81% 70%` / `#F075B3` | `217 91% 68%` / `#639CF8` |

`--radius = 0.75rem` in tutti i temi. Token sidebar non corrispondono a una sidebar presente nel prodotto: sono scaffolding, comunque documentati per completezza. Nessun token gradiente o shadow custom. Colore anello focus=primary, pausa=secondary; traccia=muted. Opacità utilizzate: bg-muted/30, /50, primary/20, bordi primary/40, foreground/90, muted-foreground/60; hover primary/90 e secondary/80.

### Font, dimensioni e geometrie

Font body: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`. Nessun webfont remoto o file font; Android normalmente Roboto. Unità sotto CSS px (rem supposto root16 px), **non conversione automatica px→dp/sp**; Compose deve rispettare fontScale/accessibilità.

- Testo: xs12/line16; sm14/20; base16/24; lg18/28; xl20/28; 2xl24/32; 3xl30/36; 4xl36/40; timer normale 5xl48/48, da `sm` 6xl60/60. Numeri tabular, peso300, tracking-wider0.05em. Label normale12 px.
- H1 homepage30 px, da `md`36 px, peso700; H1 articolo24 px da `sm`30 px.
- Logo18 px peso600, tracking-tight −0.025em; icona20 px.
- Peso: light300, medium500, semibold600, bold700. Fullscreen numeri300, tracking0.05em; label uppercase tracking0.3em.
- Ring normale **280×280 px**, stroke6; r137; circumference `2πr`; offset `circumference*(1-progress)`; rotazione−90°, cap round. In Compose usare Canvas arc con start−90°, sweep360*progress sopra traccia completa.
- Fullscreen `S = min(0.6*min(window.innerHeight,window.innerWidth),600)`; stroke10; numeri `0.22*S` px; label `max(10,min(0.04*S,16))` px. Aggiornamento resize/orientationchange; full container h-screen/100vh, overflow-hidden, flex centrato, gap16/24, padding12/24. Non sottrae altezza tab/controlli/audio o safe inset prima del calcolo: attenzione piccoli landscape.
- Layout normale timer gap24; controlli gap12; reset/fullscreen40×40 px; Start size lg h44 con override padding orizz32/vertical20, testo16; fullscreen reset48×48 e Start default h40 con padding32/20. Il Button condiviso applica `[&_svg]:size-4`: icone SVG al suo interno ricevono16×16 CSS anche quando props Lucide riportano18/20/22; il pulsante uscita fullscreen raw mantiene icona24. Non replicare props icona come misure visive verificate.
- Settings max-width320 px, padding16, gap verticale12, input48 px larghezza, padding8×4, round/input4 px. Settings toggle32×32.
- Switch UI44×24, thumb20×20, movimento20 px. Slider traccia8 px e thumb20 px; track secondary (giallo anche in focus).
- Swatch tema20×20, bordo2, scale1.1 se attivo; gap8. Preset font12, padding12×4.
- Header max-width896 px, padding16; blog/articoli/legale max-width672; contenuto homepage768; footer896. Pagina padding orizz16/vertical32; footer margine top64/padding32/16.
- Breakpoint Tailwind standard: sm640, md768, lg1024, xl1280, 2xl1536; container config 2xl1400, padding2rem. Dimensioni Android vanno adattate a window size/orientamento/inset, non ai breakpoint web letterali.

### Raggi, ombre, animazioni

- Token Tailwind lg12 px, md10 (`radius−2`), sm8 (`radius−4`); utility `rounded`4 px, `rounded-xl`12, `rounded-full`9999/pill. Anello, tab, Start/preset e swatch circolari/pill. Immagini/article CTA12; tip box8.
- Stili articolo: p margin-bottom16,line-height1.75; h2 1.35rem/21.6 px,peso700,margin top32/bottom12; h3 1.1rem/17.6,peso600,top24/bottom8; liste padding24,line-height1.6; tip bg-muted,bordo sinistro primary3 px,padding16/20; CTA bg-card,border1,padding24.
- Shadow standard Tailwind nelle UI: popover `shadow-md` = `0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)`; switch thumb `shadow-lg` = `0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)`. Non c'è ombra sul timer principale.
- Ring transition-all300 ms; controlli transition colors/transform standard150 ms; CTA opacity200 ms; accordion keyframe0.2 s ease-out e chevron200 ms; popover fade/zoom95/slide2 tramite tailwindcss-animate. Scroll CTA smooth.
- `src/App.css` contiene stili template React/logo spinning ma **non è importato dall'app attuale**: non replicare palette/animazione purple di quel file.
- Non c'è gestione sistematica reduced-motion nei componenti attivi; prevedere preferenze animazione Android.
- Icone Lucide: Play/Pause/RotateCcw/Settings/Info/Maximize2/Minimize2/X, Cloud/Coffee/Radio/Volume2, Timer, ArrowUp/ChevronDown; YouTube SVG inline e streak🔥. Usare vettoriali equivalenti Compose, descrizioni accessibili e target tattili Android≥48 dp, anche dove sito usa icone più piccole.

## 11. TESTI E LINGUE

| Codice attuale | Lingua | Prefisso web | Risorsa Android suggerita |
|---|---|---|---|
| en | English | Nessuno | `values/strings.xml` |
| it | Italiano | `/it` | `values-it/strings.xml` |
| fr | Français | `/fr` | `values-fr/strings.xml` |
| es | Español | `/es` | `values-es/strings.xml` |
| pt | Português | `/pt` | `values-pt/strings.xml` |
| hi | हिन्दी | `/hi` | `values-hi/strings.xml` |
| tl | Filipino | `/tl` | Concordare codice BCP47 Android `fil` (es. `values-b+fil`) |

Fonti: `src/i18n/types.ts`, `src/i18n/index.ts`, `src/contexts/LanguageContext.tsx`, `src/i18n/{en,it,fr,es,pt,hi,tl}.ts`, `src/i18n/adhd-{en,it,fr,es,pt,hi,tl}.ts`.

- Registry Translations: ui, footer, homepage/seo, blogIndex/articles, seoPages, blogArticles, legalPages, nomi lingua. 12 pagine timer e24 articoli per lingua (10 generali +14 ADHD); legali sono record vuoti.
- Inglese import eager, altre lingue import dinamico; cache in memoria. getTranslations usa inglese quando locale non caricato; promise aggiorna contesto.
- Cambio lingua derivato da URL, non da preferenza locale salvata né lingua browser. Il provider non annulla richieste obsolete: cambi rapidi possono mostrare temporaneamente traduzione di una richiesta precedente. Errori load senza fallback UI esplicito.
- **Discrepanza requisito/implementazione:** homepage strings sono testo/array; `SEOPageContent.content`, `BlogArticleContent.content`, `LegalPageContent.content` sono **stringhe HTML**, renderizzate con `dangerouslySetInnerHTML`. Non è vero che tutti i file i18n contengono solo testo puro. Non portare HTML in `strings.xml` come layout Compose: estrarre blocchi/paragrafi/link o render editoriale controllato.
- AudioPlayer usa label hardcoded “Rain”, “Café”, “Noise”; SessionStats/404, alcune label link homepage, alt immagini, aria-label input “minutes/seconds” e “Select language” sono inglesi. UIStrings ha rain/cafe/whiteNoise ma non usati nel player.
- Per Android: AppCompat/per-app language locale API, plurals per contatori, risorse per accessibilità, contenuto editoriale bundled/strutturato. Stile ADHD empatico, non consulenza medica; non inferire diagnosi dall'uso dell'app.

## 12. ANALYTICS E TERZE PARTI

GA4 caricato da `index.html` tramite gtag, measurement ID pubblico **G-WWP2QBPNWM**. Inizializza dataLayer, `gtag('js',new Date())`, `gtag('config',ID)` senza impostazioni custom di consenso, cookie, anonymization o opt-out nel codice. Comportamento effettivo enhanced measurement/retention nelle impostazioni GA4 non verificato.

| Evento custom | Dove | Payload esplicito |
|---|---|---|
| `timer_start` | Timer.handleStart | `{"event_category":"engagement","event_label":"focus|shortBreak|longBreak"}` |
| `mode_switch` | Tab layout normale | `{"timer_mode":"focus|shortBreak|longBreak"}` |
| `session_complete` | Callback completamento | `{"completed_mode":"focus|shortBreak|longBreak"}` |
| `audio_select` | useAudio.playSound | `{"sound_type":"rain|cafe|white-noise"}` |
| `fullscreen_toggle` | Toggle timer fullscreen | `{"fullscreen":true}` oppure false |

Eventi solo se `window.gtag` è funzione. mode_switch non emesso da tab fullscreen/auto-switch. timer_start non emesso dall'auto-start e viene emesso prima di controllare se start può realmente partire. audio_select non emesso per spegnere lo stesso suono. fullscreen_toggle è richiesta di toggle, non verifica del successo; uscita via Escape/fullscreenchange non emette quel click event.

Config GA4 può inviare page_view iniziale e dati standard via SDK. Le route SPA non fanno esplicitamente page_view manuale; eventuali page_view su history dipendono da GA4, non verificati. Non è presente raccolta diretta nel codice di nome/email/userId; analytics può usare identificatori pseudonimi, URL, browser/device e informazioni rete secondo GA4.

**Cookie banner/CMP/Consent Mode:** assenti nel sorgente. Non affermare che app “non raccoglie dati” o “non usa cookie analytics”: lo script c'è. Cookie normalmente associati a GA4 (`_ga`, `_ga_<id>`) dipendono dall'esecuzione e configurazione, non sono inventario runtime confermato. Nessun Meta/TikTok/LinkedIn pixel, Sentry, ads SDK, crash reporter, Google Sign-In, payment SDK trovato. YouTube solo link; nessun player embedded. `lovable-tagger` solo tooling dev, non funzionalità utente.

Android: se analytics mantenuto, usare integrazione nativa appropriata (es. Firebase Analytics con stream Android nuovo), non includere snippet web né assumere measurement ID web sufficiente; richiede configurazione Android separata. Portare solo gli eventi concordati, consenso/opt-out e dichiarazioni Data Safety. SDK analytics non è necessario per timer offline.

## 13. PRIVACY E LEGALE

### URL esistenti

- Privacy: https://focus25.io/privacy — variante italiana https://focus25.io/it/privacy.
- Termini: https://focus25.io/terms — variante italiana https://focus25.io/it/terms.
- Fair use: https://focus25.io/fair-use.
- FAQ: https://focus25.io/faq; come funziona: https://focus25.io/how-it-works.
- Tutte le altre lingue seguono prefisso del §2.

**Stato dei testi:** `content:''` per tutti questi record in tutte le lingue. `LegalPage` fallback inglese è anch'esso vuoto. Esistenza route/canonical non equivale a privacy policy valida; disponibilità e contenuto della produzione non verificati. Prima del Play Store serve informativa realmente pubblicata, con soggetto/titolare e contatto, finalità, dati/servizi SDK, conservazione, diritti e dettagli applicabili. Dati del titolare/contatto **non forniti e non inventati**.

### Dati attuali e dichiarazioni

| Categoria | Gestione attuale |
|---|---|
| Nome/email/password/account | Nessun modulo o raccolta diretta |
| Preferenze timer/tema | LocalStorage, nessuna sincronizzazione server |
| Numero sessioni/streak/data | LocalStorage; nessuno storico dettagliato delle sessioni |
| Uso app/modalità/audio/fullscreen | Eventi inviati a GA4 se script disponibile |
| Identificatori/device/rete | Potenziale trattamento GA4/hosting, da verificare con configurazione e informative servizi |
| Permesso notifiche | Gestito dal browser; non scritto nelle3 chiavi applicative |
| Fotocamera/microfono/contatti/posizione/file utente | Nessun accesso implementato |
| Informazioni sanitarie/diagnosi ADHD | Nessuna richiesta o profilazione esplicita nel codice; contenuti ADHD editoriali |

Alcuni testi editoriali affermano “no analytics cookies/no data sent to servers”; `public/llms.txt` dice no data collection, offline e PWA compatibile, e cita lo-fi/nature. Queste dichiarazioni **non descrivono fedelmente il codice corrente** (GA4 presente, nessun Service Worker/manifest,3 suoni reali): non riutilizzarle come dichiarazione store.

Per Google Play: compilare Data Safety in base **all'app Android finale e suoi SDK**, non solo al sito; dichiarare analytics se presente, eventuale condivisione/finalità, cifratura transito secondo SDK e meccanismi di cancellazione pertinenti. Nessun requisito account-deletion flow attuale perché non ci sono account; se introdotti va rivalutato. Decidere consenso per utenti nelle giurisdizioni interessate, policy bambini/target audience, gestione backup Android dei dati locali e durata conservazione. Non certificata conformità legale dal presente documento.

## 14. LIMITI NOTI E ADATTAMENTO ANDROID

### Matrice browser → Android

| Aspetto attuale | Limite / adattamento nativo |
|---|---|
| Date.now deadline | Wall clock alterabile: Android usare `SystemClock.elapsedRealtime()` per durata all'interno del boot, separando timestamp UTC per storage/date |
| setInterval250 ms + effect | Coroutine/ticker aggiorna UI soltanto; autorità è deadline nello stato dominio, non numero tick né Activity |
| Background/tab sospesa | Browser non garantisce tick/alert puntuali; Android progettare comportamento sotto Doze, app background e process death |
| Auto-switch timeout500+100 | Macchina a stati atomica, job annullabili/generationId; non riprodurre race React |
| LocalStorage | DataStore con validazione e schema versionato; sessione persistita se richiesta |
| Timer non globale | ViewModel/service/repository condiviso, non distruggere a cambio schermata/rotazione |
| Fullscreen API/overlay100vh | Edge-to-edge/WindowInsetsControllerCompat, system bars e safe insets, Back per uscire; ring calcolato nello spazio residuo |
| HTMLAudioElement/Web Audio | Media3/SoundPool/sintesi nativa; focus audio, lifecycle, cuffie e silenzioso |
| Browser Notification | NotificationCompat + channels + runtime permission; local scheduling, non push/FCM implicito |
| HTML articoli | Contenuti strutturati + AnnotatedString/Compose; se HTML viewer, sanitizzazione/navigation esplicita |
| React Router/canonical/hreflang | Navigation Compose e App Links opzionali; SEO resta nel sito, non nel layout Compose |
| gtag web | SDK Android analytics opzionale, consent separato; non importare chiave stream web come config Android |
| CSS/system-ui | Token Compose ColorScheme/typography custom, dp/sp, target tattili e TalkBack |
| Static public assets | Bundle `res/raw`, `drawable`/assets; no dipendenza HTTP per funzioni base |
| Reload e reboot | Definire esplicitamente resume/pause/complete: clock monotono non sopravvive reboot; usare record persistiti con identificazione boot o politica di recovery |

### Incoerenze da non copiare senza decisione

1. Pagine a durata fissa applicano override a **focus e pause**; autoSwitch resta true pur essendo nascosto. Un timer5 min può alternare focus5 min/pausa5 min senza opzione visibile normale.
2. Cambio `defaultDuration` tra route non resetta pienamente remaining: effect verifica solo settings/mode changed; dipendenza prop non basta. React può riutilizzare TimerPage, lasciando countdown precedente e progress basato su nuova durata.
3. Preset non forza longBreak900 s, anche se requisito storico lo chiede.
4. Cambio settings durante countdown aggiorna totalDuration ma non deadline; progress può negativo/fuori range. Input controlled salva ad ogni carattere e non consente editing vuoto; zero totale clamp1.
5. Auto-switch con timeout non annullabili: rischio avvio vecchia fase/reset involontario. Completamento deduplicato con ref ma callbacks/effect non sono transazione dominio.
6. Start a00:00 senza autoSwitch può riusare pausedRemaining vecchio; esplicitare azione restart desiderata.
7. Statistiche visualizzate e aggiornate da hook diversi, non sincronizzati; multi-tab e rollover UTC/streak hanno casi limite.
8. Scadenza24 h settings calcolata solo al load dall'ultima scrittura, non generale inattività e non a mezzanotte.
9. Nessuna persistenza sessione/round/audio/autoSwitch; rotazione ricrea layout web ma process death/reload perde stato. Android dovrebbe mantenere almeno sessione attraverso rotazione.
10. Audio play fallito non comunica errore; beep può mancare su mobile/background e dedup breve; non esiste mute alert.
11. Fullscreen attuale **include audio compact**; non promettere “solo timer senza audio” basandosi sul vecchio requisito. Font/ring possono ancora essere problematici su landscape molto piccolo o font scale alto.
12. Metadati statici/dinamici e testi SEO/privacy non sono una certificazione del deploy, conformità privacy o offline. Le5 pagine legali sono vuote.
13. Nessuna PWA/offline garantita nel repository: nessun manifest/Service Worker/caching. Android con asset bundled può funzionare offline senza introdurre backend.
14. Palette HSL reale diversa dagli HEX storici; scegliere fedeltà token o correzione brand, non mescolarle silenziosamente.
15. LocalStorage legge JSON senza validazione completa e scrive senza gestione quota/privacy mode; Android validare numeri finiti, range, fallback e scritture atomiche.

### Struttura Android suggerita (non implementata)

```text
ui/timer          TimerScreen, Ring, ModeTabs, controls, fullscreen
ui/settings       MinutesSecondsEditor, rounds, enable long break, reset
ui/content        Articles, resources, legal documents
ui/theme          Semantic colors and typography, 3 explicit themes
ui/localization   strings/plurals and per-app locales
domain/timer      TimerMode, TimerSettings, TimerState, state machine
                    Start / Pause / Reset / SelectMode / Complete / UpdateSettings
data/local        DataStore settings, stats, theme (+ active session if agreed)
platform/audio    Shared Media3 player + short alerts
platform/notify   Permission, channels, foreground/scheduling policy
analytics         Optional event interface, disabled/no-op when absent
```

- Stato dominio immutabile con StateFlow; deadline, phaseId e completamento idempotente. UI legge stato, non gestisce transizioni attraverso ricomposizione.
- Servizio foreground **solo se richiesto da comportamento/background e consentito dalla piattaforma**; non promettere garanzia timer con Activity ticker o WorkManager (non adatto a scadenze esatte brevi). AlarmManager/exact alarm richiede valutazione permessi, eleggibilità/policy e alternativa quando negato; non richiedere privilegi indiscriminati. Per media background usare tipo servizio pertinente.
- Definire quando device dorme se completare una sola fase e attendere, oppure recuperare tutte le fasi trascorse. Il sito non fa catch-up delle fasi: rileva scadenza poi avvia fase successiva solo quando callback torna ad eseguire.
- Date calendario: per parità usare UTC; per UX giornaliera locale meglio fuso utente, ma è modifica comportamento dichiarata.
- Non aggiungere auth, database remoto, billing, sync, push, ads o haptics per semplice equivalenza.

### Criteri di accettazione proposti per il porting

1. Default1500/300/900 s; impostazioni1…5999 s; round4 default,1…20; impossibile durata0; MM:SS e progress corretti.
2. Deadline mantiene precisione con UI ferma e pause/resume; testare vicino a0, cambio clock, background e rotazione.
3. Con autoSwitch attivo: focus→shortBreak, ogni4 focus→longBreak, entrambe pause→focus; disabilitato longBreak→solo shortBreak; transizione una sola volta.
4. Reset/switch/settings nella finestra di completamento annullano azioni obsolete; una completion incrementa statistiche una volta.
5. Preset: decidere/regressione esplicita per longBreak15 min e cambio duration mentre running.
6. Un unico stato statistics alimenta display/persistenza; giorni UTC/locali scelti, gap streak e mezzanotte testati.
7. Audio unico continua tra schermate/fullscreen; stesso pulsante stop; volume0…1; comportamento chiamate/DND/cuffie e beep5…1 verificato.
8. Notifiche funzionano granted, non bloccano timer denied; background verificato su versioni Android supportate e device reali.
9. Tre temi e giallo pause identico; ring/numeri/controlli dentro area disponibile in portrait/landscape, tablet e font ingranditi.
10. Tutte le7 lingue, plurali e TalkBack; nessun testo UI inglese accidentalmente hardcoded.
11. Policy/termini realmente compilati e pubblicati prima invio Play; Data Safety coerente con SDK finali, non con promesse obsolete del sito.
12. Funzioni core offline con asset locali; niente login/premium necessario per iniziare.

**Questo file è documentazione; nessuna migrazione Android, modifica timer, nuova integrazione o pubblicazione è stata eseguita.**
