// Plain-text privacy policy content per language. Structure is rendered in LegalPage.tsx.
export interface PrivacySection {
  h: string;
  p?: string;
  items?: string[];
  links?: { label: string; url: string }[];
}
export interface PrivacyContent {
  heading: string;
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
  contact: { h: string; p: string };
}

export const PRIVACY_EMAIL = 'focus25.timer@gmail.com';
const GA = 'https://policies.google.com/privacy';
const OPT = 'https://tools.google.com/dlpage/gaoptout';

export const privacyContent: Record<string, PrivacyContent> = {
  en: {
    heading: 'Privacy Policy',
    lastUpdated: 'Last updated: October 25, 2026',
    intro: 'Focus25 is a free Pomodoro timer available as a website (focus25.io) and as an Android app ("Focus25 – Pomodoro Timer"). This policy explains what data each of them handles.',
    sections: [
      { h: 'Android app', items: [
        'The app does not collect, transmit or share any personal data.',
        'It works entirely offline: it has no account, no analytics, no advertising and no internet access.',
        'Your settings (timer durations, theme, sound volume) and your daily count of completed sessions are stored only on your device. They are deleted when you uninstall the app.',
        'The app asks for permission to show notifications only to display the running timer and to tell you when a session ends. You can turn notifications off at any time in your device settings.',
      ] },
      { h: 'Website', items: [
        'The website does not require an account and does not ask for personal information.',
        "Your timer settings, theme and daily session count are saved in your browser's local storage. They stay on your device and are not sent to us.",
        'We use Google Analytics to understand, in aggregate, how the website is used (for example, pages visited, timer starts and the type of device). Google Analytics uses cookies and processes data such as your IP address and browser information.',
        'You can block analytics cookies in your browser settings or with the Google Analytics opt-out add-on.',
      ], links: [{ label: "Google's privacy policy", url: GA }, { label: 'Google Analytics opt-out add-on', url: OPT }] },
      { h: 'Children', p: 'Focus25 is not directed at children under 13 and does not knowingly collect data from them.' },
      { h: 'Changes', p: 'If this policy changes, we will update this page and the "Last updated" date.' },
    ],
    contact: { h: 'Contact', p: 'For any question about privacy, write to' },
  },
  it: {
    heading: 'Informativa sulla Privacy',
    lastUpdated: 'Ultimo aggiornamento: 25 ottobre 2026',
    intro: 'Focus25 è un timer Pomodoro gratuito disponibile come sito web (focus25.io) e come app Android ("Focus25 – Pomodoro Timer"). Questa informativa spiega quali dati vengono gestiti da ciascuno.',
    sections: [
      { h: 'App Android', items: [
        "L'app non raccoglie, trasmette né condivide alcun dato personale.",
        'Funziona interamente offline: non ha account, analytics, pubblicità né accesso a internet.',
        'Le tue impostazioni (durate del timer, tema, volume) e il conteggio giornaliero delle sessioni completate sono salvati solo sul tuo dispositivo. Vengono eliminati quando disinstalli l’app.',
        "L'app chiede il permesso di mostrare notifiche solo per visualizzare il timer in corso e avvisarti quando una sessione termina. Puoi disattivare le notifiche in qualsiasi momento dalle impostazioni del dispositivo.",
      ] },
      { h: 'Sito web', items: [
        'Il sito non richiede un account e non chiede informazioni personali.',
        'Le impostazioni del timer, il tema e il conteggio giornaliero delle sessioni sono salvati nella memoria locale del browser. Restano sul tuo dispositivo e non ci vengono inviati.',
        'Usiamo Google Analytics per capire, in forma aggregata, come viene usato il sito (ad esempio pagine visitate, avvii del timer e tipo di dispositivo). Google Analytics usa cookie e tratta dati come il tuo indirizzo IP e le informazioni sul browser.',
        'Puoi bloccare i cookie di analytics dalle impostazioni del browser o con il componente aggiuntivo di disattivazione di Google Analytics.',
      ], links: [{ label: 'Informativa privacy di Google', url: GA }, { label: 'Componente di disattivazione di Google Analytics', url: OPT }] },
      { h: 'Minori', p: 'Focus25 non è rivolto a bambini sotto i 13 anni e non raccoglie consapevolmente dati che li riguardano.' },
      { h: 'Modifiche', p: 'Se questa informativa cambia, aggiorneremo questa pagina e la data di "Ultimo aggiornamento".' },
    ],
    contact: { h: 'Contatti', p: 'Per qualsiasi domanda sulla privacy, scrivi a' },
  },
  fr: {
    heading: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : 25 octobre 2026',
    intro: 'Focus25 est un minuteur Pomodoro gratuit disponible sous forme de site web (focus25.io) et d’application Android (« Focus25 – Pomodoro Timer »). Cette politique explique quelles données chacun d’eux traite.',
    sections: [
      { h: 'Application Android', items: [
        'L’application ne collecte, ne transmet ni ne partage aucune donnée personnelle.',
        'Elle fonctionne entièrement hors ligne : pas de compte, pas d’analyse, pas de publicité et pas d’accès à internet.',
        'Vos réglages (durées, thème, volume) et votre nombre quotidien de sessions terminées sont stockés uniquement sur votre appareil. Ils sont supprimés lorsque vous désinstallez l’application.',
        'L’application demande l’autorisation d’afficher des notifications uniquement pour montrer le minuteur en cours et vous prévenir à la fin d’une session. Vous pouvez désactiver les notifications à tout moment dans les réglages de l’appareil.',
      ] },
      { h: 'Site web', items: [
        'Le site ne nécessite pas de compte et ne demande aucune information personnelle.',
        'Vos réglages du minuteur, votre thème et votre nombre quotidien de sessions sont enregistrés dans le stockage local de votre navigateur. Ils restent sur votre appareil et ne nous sont pas envoyés.',
        'Nous utilisons Google Analytics pour comprendre, de manière agrégée, comment le site est utilisé (par exemple pages visitées, démarrages du minuteur et type d’appareil). Google Analytics utilise des cookies et traite des données comme votre adresse IP et les informations du navigateur.',
        'Vous pouvez bloquer les cookies d’analyse dans les réglages du navigateur ou avec le module de désactivation de Google Analytics.',
      ], links: [{ label: 'Politique de confidentialité de Google', url: GA }, { label: 'Module de désactivation de Google Analytics', url: OPT }] },
      { h: 'Enfants', p: 'Focus25 ne s’adresse pas aux enfants de moins de 13 ans et ne collecte pas sciemment de données les concernant.' },
      { h: 'Modifications', p: 'Si cette politique change, nous mettrons à jour cette page et la date de « Dernière mise à jour ».' },
    ],
    contact: { h: 'Contact', p: 'Pour toute question sur la confidentialité, écrivez à' },
  },
  es: {
    heading: 'Política de Privacidad',
    lastUpdated: 'Última actualización: 25 de octubre de 2026',
    intro: 'Focus25 es un temporizador Pomodoro gratuito disponible como sitio web (focus25.io) y como app de Android ("Focus25 – Pomodoro Timer"). Esta política explica qué datos gestiona cada uno.',
    sections: [
      { h: 'App de Android', items: [
        'La app no recopila, transmite ni comparte ningún dato personal.',
        'Funciona completamente sin conexión: no tiene cuenta, analíticas, publicidad ni acceso a internet.',
        'Tus ajustes (duraciones, tema, volumen) y tu recuento diario de sesiones completadas se guardan solo en tu dispositivo. Se eliminan al desinstalar la app.',
        'La app pide permiso para mostrar notificaciones solo para mostrar el temporizador en curso y avisarte cuando termina una sesión. Puedes desactivarlas en cualquier momento en los ajustes del dispositivo.',
      ] },
      { h: 'Sitio web', items: [
        'El sitio no requiere cuenta ni pide información personal.',
        'Tus ajustes del temporizador, tema y recuento diario de sesiones se guardan en el almacenamiento local del navegador. Permanecen en tu dispositivo y no se nos envían.',
        'Usamos Google Analytics para entender, de forma agregada, cómo se usa el sitio (por ejemplo, páginas visitadas, inicios del temporizador y tipo de dispositivo). Google Analytics usa cookies y procesa datos como tu dirección IP e información del navegador.',
        'Puedes bloquear las cookies de analítica en los ajustes del navegador o con el complemento de inhabilitación de Google Analytics.',
      ], links: [{ label: 'Política de privacidad de Google', url: GA }, { label: 'Complemento de inhabilitación de Google Analytics', url: OPT }] },
      { h: 'Menores', p: 'Focus25 no está dirigido a menores de 13 años y no recopila conscientemente datos suyos.' },
      { h: 'Cambios', p: 'Si esta política cambia, actualizaremos esta página y la fecha de "Última actualización".' },
    ],
    contact: { h: 'Contacto', p: 'Para cualquier pregunta sobre privacidad, escribe a' },
  },
  pt: {
    heading: 'Política de Privacidade',
    lastUpdated: 'Última atualização: 25 de outubro de 2026',
    intro: 'Focus25 é um temporizador Pomodoro gratuito disponível como site (focus25.io) e como app Android ("Focus25 – Pomodoro Timer"). Esta política explica quais dados cada um trata.',
    sections: [
      { h: 'App Android', items: [
        'O app não coleta, transmite nem compartilha nenhum dado pessoal.',
        'Funciona totalmente offline: não tem conta, análises, publicidade nem acesso à internet.',
        'Suas configurações (durações, tema, volume) e a contagem diária de sessões concluídas ficam armazenadas apenas no seu dispositivo. São apagadas quando você desinstala o app.',
        'O app pede permissão para mostrar notificações apenas para exibir o temporizador em andamento e avisar quando uma sessão termina. Você pode desativar as notificações a qualquer momento nas configurações do dispositivo.',
      ] },
      { h: 'Site', items: [
        'O site não exige conta e não pede informações pessoais.',
        'Suas configurações do temporizador, tema e contagem diária de sessões são salvas no armazenamento local do navegador. Ficam no seu dispositivo e não são enviadas para nós.',
        'Usamos o Google Analytics para entender, de forma agregada, como o site é usado (por exemplo, páginas visitadas, inícios do temporizador e tipo de dispositivo). O Google Analytics usa cookies e processa dados como seu endereço IP e informações do navegador.',
        'Você pode bloquear os cookies de análise nas configurações do navegador ou com o complemento de desativação do Google Analytics.',
      ], links: [{ label: 'Política de privacidade do Google', url: GA }, { label: 'Complemento de desativação do Google Analytics', url: OPT }] },
      { h: 'Crianças', p: 'O Focus25 não é direcionado a crianças menores de 13 anos e não coleta intencionalmente dados delas.' },
      { h: 'Alterações', p: 'Se esta política mudar, atualizaremos esta página e a data de "Última atualização".' },
    ],
    contact: { h: 'Contato', p: 'Para qualquer dúvida sobre privacidade, escreva para' },
  },
  hi: {
    heading: 'गोपनीयता नीति',
    lastUpdated: 'अंतिम अपडेट: 25 अक्टूबर 2026',
    intro: 'Focus25 एक मुफ़्त Pomodoro टाइमर है जो वेबसाइट (focus25.io) और Android ऐप ("Focus25 – Pomodoro Timer") के रूप में उपलब्ध है। यह नीति बताती है कि इनमें से प्रत्येक कौन-सा डेटा संभालता है।',
    sections: [
      { h: 'Android ऐप', items: [
        'ऐप कोई भी व्यक्तिगत डेटा एकत्र, प्रसारित या साझा नहीं करता।',
        'यह पूरी तरह ऑफ़लाइन काम करता है: इसमें कोई खाता, एनालिटिक्स, विज्ञापन या इंटरनेट एक्सेस नहीं है।',
        'आपकी सेटिंग्स (टाइमर अवधि, थीम, वॉल्यूम) और पूरे किए गए सत्रों की दैनिक गिनती केवल आपके डिवाइस पर संग्रहीत होती है। ऐप अनइंस्टॉल करने पर ये हट जाती हैं।',
        'ऐप सूचनाएँ दिखाने की अनुमति केवल चल रहे टाइमर को दिखाने और सत्र समाप्त होने पर बताने के लिए माँगता है। आप डिवाइस सेटिंग्स में कभी भी सूचनाएँ बंद कर सकते हैं।',
      ] },
      { h: 'वेबसाइट', items: [
        'वेबसाइट के लिए खाते की आवश्यकता नहीं है और यह कोई व्यक्तिगत जानकारी नहीं माँगती।',
        'आपकी टाइमर सेटिंग्स, थीम और दैनिक सत्र गिनती आपके ब्राउज़र के लोकल स्टोरेज में सहेजी जाती हैं। ये आपके डिवाइस पर रहती हैं और हमें नहीं भेजी जातीं।',
        'हम Google Analytics का उपयोग यह समझने के लिए करते हैं कि वेबसाइट का उपयोग समग्र रूप से कैसे होता है (जैसे देखे गए पेज, टाइमर शुरू करना और डिवाइस का प्रकार)। Google Analytics कुकीज़ का उपयोग करता है और आपके IP पते व ब्राउज़र जानकारी जैसे डेटा को संसाधित करता है।',
        'आप ब्राउज़र सेटिंग्स में या Google Analytics ऑप्ट-आउट ऐड-ऑन से एनालिटिक्स कुकीज़ ब्लॉक कर सकते हैं।',
      ], links: [{ label: 'Google की गोपनीयता नीति', url: GA }, { label: 'Google Analytics ऑप्ट-आउट ऐड-ऑन', url: OPT }] },
      { h: 'बच्चे', p: 'Focus25 13 वर्ष से कम उम्र के बच्चों के लिए नहीं है और जानबूझकर उनका डेटा एकत्र नहीं करता।' },
      { h: 'बदलाव', p: 'यदि यह नीति बदलती है, तो हम इस पेज और "अंतिम अपडेट" तिथि को अपडेट करेंगे।' },
    ],
    contact: { h: 'संपर्क', p: 'गोपनीयता से जुड़े किसी भी प्रश्न के लिए यहाँ लिखें:' },
  },
  tl: {
    heading: 'Patakaran sa Privacy',
    lastUpdated: 'Huling na-update: Oktubre 25, 2026',
    intro: 'Ang Focus25 ay isang libreng Pomodoro timer na makukuha bilang website (focus25.io) at bilang Android app ("Focus25 – Pomodoro Timer"). Ipinapaliwanag ng patakarang ito kung anong data ang pinangangasiwaan ng bawat isa.',
    sections: [
      { h: 'Android app', items: [
        'Hindi nangongolekta, nagpapadala o nagbabahagi ang app ng anumang personal na data.',
        'Gumagana ito nang buong offline: walang account, walang analytics, walang advertising at walang internet access.',
        'Ang iyong mga setting (tagal ng timer, tema, volume) at ang araw-araw na bilang ng natapos na session ay naka-store lamang sa iyong device. Nabubura ang mga ito kapag in-uninstall mo ang app.',
        'Humihingi ang app ng pahintulot na magpakita ng notification para lamang ipakita ang tumatakbong timer at sabihin kapag natapos ang session. Maaari mong i-off ang mga notification anumang oras sa settings ng device.',
      ] },
      { h: 'Website', items: [
        'Hindi nangangailangan ng account ang website at hindi ito humihingi ng personal na impormasyon.',
        'Ang mga setting ng timer, tema at araw-araw na bilang ng session ay naka-save sa local storage ng iyong browser. Nananatili ang mga ito sa iyong device at hindi ipinapadala sa amin.',
        'Gumagamit kami ng Google Analytics para maunawaan, sa kabuuan, kung paano ginagamit ang website (halimbawa, mga binisitang page, pagsisimula ng timer at uri ng device). Gumagamit ang Google Analytics ng cookies at nagpoproseso ng data gaya ng iyong IP address at impormasyon ng browser.',
        'Maaari mong i-block ang analytics cookies sa settings ng browser o gamit ang Google Analytics opt-out add-on.',
      ], links: [{ label: 'Patakaran sa privacy ng Google', url: GA }, { label: 'Google Analytics opt-out add-on', url: OPT }] },
      { h: 'Mga bata', p: 'Ang Focus25 ay hindi para sa mga batang wala pang 13 taong gulang at hindi sinasadyang nangongolekta ng kanilang data.' },
      { h: 'Mga pagbabago', p: 'Kung magbago ang patakarang ito, ia-update namin ang page na ito at ang petsang "Huling na-update".' },
    ],
    contact: { h: 'Makipag-ugnayan', p: 'Para sa anumang tanong tungkol sa privacy, sumulat sa' },
  },
};
