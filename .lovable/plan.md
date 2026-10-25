# Collegare il progetto a GitHub

Non posso collegare io GitHub: il collegamento si fa dalle impostazioni di Lovable. Non serve modificare il codice.

## Passaggi (desktop)
1. In alto a sinistra apri il nome del progetto, poi Settings, poi Git (oppure il tasto + nella chat, poi Project, poi GitHub).
2. Clicca Connect e autorizza la Lovable GitHub App sul tuo account o sulla tua organizzazione.
3. Scegli dove creare il repository. Lovable crea un nuovo repository privato con tutto il codice.

## Da mobile
Modalità Chat, tasto + , poi Project, poi GitHub.

## Cosa succede dopo
- Ogni modifica fatta in Lovable viene inviata a GitHub in automatico.
- Ogni push sul branch collegato (di solito `main`) torna in Lovable.
- Le modifiche fatte su altri branch arrivano in Lovable solo dopo il merge nel branch collegato.
- Non si può collegare un repository che esiste già: Lovable ne crea sempre uno nuovo.
- Serve essere proprietario o admin del progetto.

Guida: https://docs.lovable.dev/integrations/github
