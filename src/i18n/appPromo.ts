import type { SupportedLang } from './types';

export interface AppPromoStrings {
  titleAndroid: string; titleDesktop: string; android: string; windows: string;
  androidItems: string[]; windowsItems: string[];
  availableOn: string; scan: string; footerTitle: string; alsoWindows: string;
  toastText: string; toastCta: string; close: string; qrAlt: string; msAlt: string;
}

export const appPromo: Record<SupportedLang, AppPromoStrings> = {
  en: { titleAndroid: 'Use Focus25 offline with the Android app', titleDesktop: 'Use Focus25 offline with the Focus25 apps', android: 'Android app', windows: 'Windows PC app',
    androidItems: ['No ads', 'Works without internet', 'No account', 'Stats saved on your phone'],
    windowsItems: ['No ads', 'Works without internet', 'Installs from the Microsoft Store', 'Opens from the Start menu, no browser'],
    availableOn: 'Get it on', scan: 'Scan with your phone', footerTitle: 'Apps', alsoWindows: 'Also on Windows PC',
    toastText: 'Focus25 on your Android, free!', toastCta: 'Get it on Google Play', close: 'Close', qrAlt: 'QR code to download Focus25 from Google Play', msAlt: 'Get it from Microsoft Store' },
  it: { titleAndroid: "Usa Focus25 anche offline con l'app Android", titleDesktop: 'Usa Focus25 anche offline con le app Focus25', android: 'App Android', windows: 'App per PC Windows',
    androidItems: ['Senza pubblicità', 'Funziona senza internet', 'Nessun account', 'Statistiche salvate sul telefono'],
    windowsItems: ['Senza pubblicità', 'Funziona senza internet', 'Si installa dal Microsoft Store', 'Si apre dal menu Start, senza browser'],
    availableOn: 'Disponibile su', scan: 'Inquadra con il telefono', footerTitle: 'App', alsoWindows: 'Anche su PC Windows',
    toastText: 'Focus25 sul tuo Android, gratis!', toastCta: 'Scarica su Google Play', close: 'Chiudi', qrAlt: 'QR code per scaricare Focus25 da Google Play', msAlt: 'Scarica da Microsoft Store' },
  fr: { titleAndroid: "Utilisez Focus25 hors ligne avec l'app Android", titleDesktop: 'Utilisez Focus25 hors ligne avec les apps Focus25', android: 'App Android', windows: 'App pour PC Windows',
    androidItems: ['Sans publicité', 'Fonctionne sans internet', 'Aucun compte', 'Statistiques enregistrées sur le téléphone'],
    windowsItems: ['Sans publicité', 'Fonctionne sans internet', "S'installe depuis le Microsoft Store", "S'ouvre depuis le menu Démarrer, sans navigateur"],
    availableOn: 'Disponible sur', scan: 'Scannez avec votre téléphone', footerTitle: 'Apps', alsoWindows: 'Aussi sur PC Windows',
    toastText: 'Focus25 sur votre Android, gratuit !', toastCta: 'Télécharger sur Google Play', close: 'Fermer', qrAlt: 'QR code pour télécharger Focus25 sur Google Play', msAlt: 'Télécharger sur le Microsoft Store' },
  es: { titleAndroid: 'Usa Focus25 sin conexión con la app Android', titleDesktop: 'Usa Focus25 sin conexión con las apps Focus25', android: 'App Android', windows: 'App para PC Windows',
    androidItems: ['Sin anuncios', 'Funciona sin internet', 'Sin cuenta', 'Estadísticas guardadas en el teléfono'],
    windowsItems: ['Sin anuncios', 'Funciona sin internet', 'Se instala desde Microsoft Store', 'Se abre desde el menú Inicio, sin navegador'],
    availableOn: 'Disponible en', scan: 'Escanea con tu teléfono', footerTitle: 'Apps', alsoWindows: 'También en PC Windows',
    toastText: '¡Focus25 en tu Android, gratis!', toastCta: 'Descargar en Google Play', close: 'Cerrar', qrAlt: 'Código QR para descargar Focus25 de Google Play', msAlt: 'Descargar de Microsoft Store' },
  pt: { titleAndroid: 'Use o Focus25 offline com o app Android', titleDesktop: 'Use o Focus25 offline com os apps Focus25', android: 'App Android', windows: 'App para PC Windows',
    androidItems: ['Sem anúncios', 'Funciona sem internet', 'Sem conta', 'Estatísticas salvas no celular'],
    windowsItems: ['Sem anúncios', 'Funciona sem internet', 'Instala pela Microsoft Store', 'Abre pelo menu Iniciar, sem navegador'],
    availableOn: 'Disponível no', scan: 'Escaneie com o celular', footerTitle: 'Apps', alsoWindows: 'Também no PC Windows',
    toastText: 'Focus25 no seu Android, grátis!', toastCta: 'Baixar no Google Play', close: 'Fechar', qrAlt: 'QR code para baixar o Focus25 no Google Play', msAlt: 'Baixar na Microsoft Store' },
  hi: { titleAndroid: 'Android ऐप के साथ Focus25 ऑफ़लाइन इस्तेमाल करें', titleDesktop: 'Focus25 ऐप्स के साथ ऑफ़लाइन इस्तेमाल करें', android: 'Android ऐप', windows: 'Windows PC ऐप',
    androidItems: ['कोई विज्ञापन नहीं', 'बिना इंटरनेट के चलता है', 'कोई खाता नहीं', 'आँकड़े फ़ोन पर ही सेव'],
    windowsItems: ['कोई विज्ञापन नहीं', 'बिना इंटरनेट के चलता है', 'Microsoft Store से इंस्टॉल करें', 'Start मेनू से खुलता है, ब्राउज़र के बिना'],
    availableOn: 'उपलब्ध है', scan: 'फ़ोन से स्कैन करें', footerTitle: 'ऐप्स', alsoWindows: 'Windows PC पर भी',
    toastText: 'आपके Android पर Focus25, मुफ़्त!', toastCta: 'Google Play से डाउनलोड करें', close: 'बंद करें', qrAlt: 'Google Play से Focus25 डाउनलोड करने का QR कोड', msAlt: 'Microsoft Store से डाउनलोड करें' },
  tl: { titleAndroid: 'Gamitin ang Focus25 offline gamit ang Android app', titleDesktop: 'Gamitin ang Focus25 offline gamit ang mga Focus25 app', android: 'Android app', windows: 'App para sa Windows PC',
    androidItems: ['Walang ads', 'Gumagana kahit walang internet', 'Walang account', 'Naka-save ang stats sa phone'],
    windowsItems: ['Walang ads', 'Gumagana kahit walang internet', 'I-install mula sa Microsoft Store', 'Bubukas mula sa Start menu, walang browser'],
    availableOn: 'Makukuha sa', scan: 'I-scan gamit ang phone', footerTitle: 'Mga app', alsoWindows: 'Nasa Windows PC din',
    toastText: 'Focus25 sa iyong Android, libre!', toastCta: 'Kunin sa Google Play', close: 'Isara', qrAlt: 'QR code para i-download ang Focus25 sa Google Play', msAlt: 'Kunin sa Microsoft Store' },
};
