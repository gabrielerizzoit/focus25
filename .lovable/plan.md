# Nuovo layout della home in stile app

## Cosa cambia per l'utente
- **Mobile (<768 px):** una colonna come l'app Android: schede, quadrante, comandi, "Focus mode", poi i riquadri raggruppati.
- **Tablet (768–1023 px):** una colonna, con i riquadri delle impostazioni disposti su 2 colonne.
- **Desktop (≥1024 px):** contenitore di circa 1120 px su due colonne. A sinistra una card con schede, quadrante da circa 340 px, comandi e "Focus mode". A destra i riquadri, alti quanto la card del timer.
- I testi SEO restano sotto, invariati, in una colonna leggibile.

## Comandi
- Reset diventa un pulsante tondo pieno; Start/Pausa una pillola più grande.
- Sotto Start c'è la pillola "Focus mode" con icona e testo. La didascalia resta visibile fino al primo uso.

## Riquadri raggruppati (stile iOS/Android)
- **Timer:** riga Auto-switch con la spiegazione sotto e l'interruttore a destra. Riga "Durations  25 · 5 · 15 min ›" che apre un pannello dal basso su mobile e un dialog su desktop. Il pannello contiene i campi MM:SS esistenti, i round per il long break, l'interruttore del long break e "Reset to defaults". Preset come segmenti a tutta larghezza.
- **Sound:** Rain / Café / Noise come segmenti, con il cursore del volume sempre visibile (attenuato se non suona nulla).
- **Appearance:** i pallini del tema.
- **Today:** sessioni di oggi e serie di giorni.
- Spariscono l'ingranaggio, le icone (i) e il link "Reset to defaults" accanto al tema.

## Temi
- **Chiaro:** sfondo `220 16% 95%`, card bianche, primary `217 91% 60%`, muted `214 20% 90%`, border `214 18% 85%`.
- **Rosa:** testo sopra il colore principale scuro, per renderlo leggibile.
- Temi scuri: card come ora. Le pause restano gialle in tutti i temi.

## Suoni
- Un moltiplicatore di volume per ciascun suono: noise 1.0, rain 0.62, café 0.14 (volume reale = cursore × moltiplicatore).
- Suona un solo suono alla volta: toccandone un altro si passa subito a quello; toccando quello attivo lo si ferma.

## Modalità focus
- Si controlla che quanto chiesto nel messaggio precedente sia presente, e si completa ciò che manca: solo cerchio e nome della fase; comandi che si nascondono dopo 3 s mentre il timer corre e riappaiono con mouse, tocco o tasto; Spazio avvia/mette in pausa, Esc esce; suggerimenti solo per le prime 5 aperture.

## Testi
Nuovi testi nelle 7 lingue: titoli dei gruppi (Timer, Sound, Appearance, Today) e "Durations".

## Dettagli tecnici
- Nuovo `SettingsGroup`/`SettingsRow` per i riquadri; `Timer.tsx` diviso in card timer + colonna dei riquadri, con griglia `lg:grid-cols-2`, `md:grid-cols-2` solo per i riquadri.
- Pannello durate: `Drawer` (vaul) sotto 1024 px, `Dialog` sopra, con `useMediaQuery`; il contenuto riusa i campi attuali.
- `ThemeSwitcher` e `TimerPresets` diventano contenuti dei riquadri; `AudioPlayer` a segmenti con `Slider` disabilitato visivamente quando nulla suona.
- `useAudio`: mappa `SOUND_GAIN` applicata in `playSound` e `setVolume`; la logica di cambio suono è già esclusiva, si verifica il caso "tocco un altro suono".
- `index.css`: valori del tema chiaro aggiornati, `--primary-foreground` scuro nel tema rosa.
- Nuove chiavi in `UIStrings` (`groupTimer`, `groupSound`, `groupAppearance`, `groupToday`, `durations`) nei 7 file.
- Controllo in Playwright a 390, 800 e 1280 px di larghezza, e del pannello durate.
