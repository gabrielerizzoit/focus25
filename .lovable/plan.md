# Riquadro "Avvia il timer" più visibile negli articoli del blog

Obiettivo: far passare più lettori degli articoli al timer.

## Cosa cambia per chi legge
1. **Riquadro in alto**, subito sotto il titolo dell'articolo: frase breve ("Metti subito in pratica: 25 minuti di focus") e pulsante grande "Avvia 25 minuti di focus".
2. **Riquadro a metà articolo**, con lo stesso invito, visibile mentre si legge.
3. **Barra fissa in basso solo su telefono**, piccola, con il pulsante "Avvia il timer". Compare dopo un po' di scorrimento e si può chiudere con una X.
4. Il pulsante finale già presente resta, con lo stesso testo nuovo.
5. Toccando il pulsante si apre la home con il timer da 25 minuti pronto in cima alla pagina (non parte da solo: basta premere Start).

Colori del tema attuale, nessun cambiamento alla home o alle pagine timer.

## Misurazione
Nuovo evento in Google Analytics `blog_cta_click`, con l'articolo e la posizione del pulsante (alto, metà, barra, fine). Così vedi quali articoli portano persone al timer.

## Testi
Nuove frasi tradotte in tutte e 7 le lingue, solo testo.

## Dettagli tecnici
- `BlogLayout.tsx`: componente `BlogCta` (varianti `top`, `inline`, `sticky`, `end`). Il riquadro centrale viene inserito dividendo `article.content` al primo `</h2>` dopo metà lunghezza; se non c'è, va dopo il contenuto.
- I vecchi `content-cta` HTML dentro gli articoli vengono nascosti via CSS per non duplicare.
- Barra mobile: `md:hidden`, appare dopo 30% di scroll, chiusura salvata in sessionStorage.
- Link a `${langPrefix}/` con reset a 25 min solo se il timer non sta già girando.
- Evento GA4 tramite `gtag` esistente, se presente.
- Nuove chiavi in `UIStrings`: `blogCtaTitle`, `blogCtaText`, `blogCtaButton`, `blogCtaSticky`, `close`.
