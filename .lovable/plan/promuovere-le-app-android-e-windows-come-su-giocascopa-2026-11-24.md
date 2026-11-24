# Promuovere le app Android e Windows (come su GiocaScopa)

## Cosa cambia
Stessi tre elementi usati su GiocaScopa, adattati a Focus25 e tradotti nelle 7 lingue:

1. **Sezione "App" in homepage** (sotto il timer e i testi, prima delle FAQ)
   - Su telefono Android: titolo "Usa Focus25 anche offline con l'app Android", punti (senza pubblicità, funziona senza internet, nessun account, statistiche salvate sul telefono) e pulsante "Disponibile su Google Play".
   - Su computer: due riquadri affiancati — App Android (punti, pulsante Google Play, QR code "Inquadra con il telefono") e App per PC Windows (senza pubblicità, offline, si installa dal Microsoft Store, si apre dal menu Start) con badge Microsoft Store.
   - Su iPhone/iPad non compare nulla.
2. **Footer**: colonna "App" con pulsante Google Play; su computer anche QR code e badge Microsoft Store.
3. **Avviso a comparsa su computer**: dopo 3 secondi scorre da sinistra un piccolo riquadro con logo, "Focus25 sul tuo Android, gratis!", pulsante Google Play, badge Microsoft Store e QR code. Chiudendolo non riappare per 7 giorni; dopo un clic su scarica, per 60 giorni. Non appare in modalità focus/fullscreen né mentre il timer sta girando, per non disturbare.

Link: Google Play https://play.google.com/store/apps/details?id=io.focus25.app — Microsoft Store https://apps.microsoft.com/detail/9NZ2TZBT14DK. Tutti si aprono in una nuova scheda.

Statistiche: clic tracciati in Google Analytics come `click_android_app` e `click_windows_app` (con posizione: home, footer, avviso) e chiusura avviso `dismiss_android_toast`.

## Dettagli tecnici
- Nuovi `src/components/AppPromo.tsx` (sezione, footer, badge, rilevamento dispositivo) e `src/components/AppPromoToast.tsx` (solo desktop ≥1024px senza touch, chiave localStorage `focus25-app-toast`).
- Montare la sezione in `HomepageSEO.tsx`, la colonna in `Footer.tsx`, il toast in `App.tsx`; il toast legge lo stato del timer/fullscreen per restare nascosto.
- Asset in `public/`: QR code SVG generato per il link Play e badge Microsoft Store (copiato dal progetto GiocaScopa, versione per lingua se disponibile, altrimenti inglese).
- Testi solo stringhe in un nuovo `src/i18n/appPromo.ts` per en/it/fr/es/pt/hi/tl; struttura in JSX. Colori solo con token del tema.
- Test piccolo per le regole di sospensione (7 / 60 giorni).
- Verifica in anteprima a 390px e 1280px.
