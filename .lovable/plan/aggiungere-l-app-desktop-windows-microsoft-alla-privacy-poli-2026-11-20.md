# Aggiungere l'app desktop Windows (Microsoft) alla Privacy Policy

## Cosa cambia
- Nell'introduzione si dice che Focus25 esiste come sito web, app Android e app desktop Windows (Microsoft Store), in tutte e 7 le lingue.
- La sezione "App Android" diventa "App Android e Windows" e usa il testo che mi hai dato: nessuna raccolta, salvataggio su server o condivisione di dati personali; funziona offline, senza account, analytics o pubblicità; impostazioni e statistiche restano solo sul dispositivo e si cancellano disinstallando l'app; su Android chiede il permesso per le notifiche, su Windows usa le notifiche di sistema solo per dirti quando finisce una sessione.
- La data "Ultimo aggiornamento" diventa 20 novembre 2026.
- Il resto della pagina e del sito non cambia.

## Dettagli tecnici
- Modificare solo `src/i18n/privacy.ts` (intro, titolo e punti della prima sezione, lastUpdated) per en/it/fr/es/pt/hi/tl. Solo testo, nessun HTML.
- Controllare /privacy e /it/privacy nell'anteprima.
