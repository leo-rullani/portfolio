import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  getLanguageOption,
  isLanguage,
  Language,
  LANGUAGE_STORAGE_KEY,
  PORTFOLIO_LANGUAGE_CHANGE_EVENT
} from '../i18n/language';

interface PrivacyPolicyText {
  heading: string;
  closeLabel: string;
  updated: string;
  p1: string;
  p2: string;
  section1Title: string;
  p3: string;
  section2Title: string;
  p4: string;
  section3Title: string;
  p5: string;
  section4Title: string;
  p6: string;
  section5Title: string;
  p7: string;
  section6Title: string;
  p8: string;
}

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  @Input() activeLang: Language = 'EN';
  readonly text: Record<Language, PrivacyPolicyText> = {
    EN: {
      heading: 'PRIVACY POLICY',
      closeLabel: 'Close privacy policy',
      updated: 'Last updated: SEPTEMBER 2026',
      p1: `I, Leo Rullani, operate this website as my personal portfolio.
           Protecting your personal data is a priority.`,
      p2: `My commitment is to handle your information in a transparent and secure way,
           ensuring you have control over what is shared and how it is utilized.
           This Privacy Policy covers various aspects such as cookies, analytics,
           third-party services, and your legal rights regarding personal data protection.`,
      section1Title: '1. Contact Form',
      p3: `When you use the contact form, your name, email address, message and confirmation
           of the privacy policy are transmitted to the website server and forwarded by email
           to the portfolio mailbox. This information is used only to process and answer your
           inquiry. Correspondence is retained only for as long as it is needed for this purpose
           or as required or permitted by applicable obligations, and is then deleted where possible.`,
      section2Title: '2. Local Storage / Cookies / Analytics',
      p4: `This website does not use analytics or advertising cookies. Browser local storage is
           used to remember the selected language. The four interactive demos store data only on
           your device: Collectrra favorites, the VideoFlix watchlist, the Quizly best score, and
           BBM Kanban task titles and descriptions. Demo entries are not transmitted to the server
           or to third parties. You can remove them completely through your browser's site-data settings.`,
      section3Title: '3. Hosting, Server Logs and Email Delivery',
      p5: `The hosting provider may automatically process technical connection data, such as the
           IP address, date and time, requested page, browser information and referrer, to deliver
           and secure the website and diagnose faults. Such logs are retained according to operational,
           security and legal requirements and are not used by me for advertising or profiling.
           The contact form email is processed by the hosting and email providers as needed for delivery.`,
      section4Title: '4. Your Rights',
      p6: `You have the right to access, correct, and delete your personal data
            at any time. I will comply with your request promptly, provided there are
            no legal obligations to retain such information. Contact me at `,
      section5Title: '5. Data Security',
      p7: `I implement industry-standard security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or destruction.
            However, please note that no method of data transmission or storage can be
            100% secure, and I cannot guarantee absolute security.`,
      section6Title: '6. Changes to this Policy',
      p8: `I reserve the right to update or modify this Privacy Policy at any time.
            Any significant changes will be announced, and where necessary,
            I will seek your consent. By continuing to use this site after such changes,
            you acknowledge and accept the updated policy.`
    },
    DE: {
      heading: 'DATENSCHUTZ',
      closeLabel: 'Datenschutzerklärung schließen',
      updated: 'Zuletzt aktualisiert: SEPTEMBER 2026',
      p1: `Ich, Leo Rullani, betreibe diese Website als mein persönliches Portfolio.
           Der Schutz Ihrer persönlichen Daten hat höchste Priorität.`,
      p2: `Ich verpflichte mich, Ihre Informationen transparent und sicher zu behandeln,
           damit Sie die Kontrolle darüber behalten, was geteilt wird und wie es verwendet wird.
           Diese Datenschutzrichtlinie behandelt Themen wie Cookies, Analysen,
           Drittanbieter-Services und Ihre gesetzlichen Rechte in Bezug auf den Datenschutz.`,
      section1Title: '1. Kontaktformular',
      p3: `Wenn Sie das Kontaktformular verwenden, werden Ihr Name, Ihre E-Mail-Adresse,
           Ihre Nachricht und die Bestätigung der Datenschutzerklärung an den Webserver
           übermittelt und per E-Mail an das Portfolio-Postfach weitergeleitet. Diese Angaben
           werden ausschließlich zur Bearbeitung und Beantwortung Ihrer Anfrage verwendet.
           Die Korrespondenz wird nur so lange aufbewahrt, wie dies für diesen Zweck erforderlich
           oder aufgrund anwendbarer Pflichten erforderlich beziehungsweise zulässig ist, und
           anschließend soweit möglich gelöscht.`,
      section2Title: '2. Lokaler Speicher / Cookies / Analysen',
      p4: `Diese Website verwendet keine Analyse- oder Werbe-Cookies. Der lokale Browserspeicher
           wird verwendet, um die gewählte Sprache zu speichern. Die vier interaktiven Demos
           speichern Daten ausschließlich auf Ihrem Gerät: Collectrra-Favoriten, die VideoFlix-
           Merkliste, den Quizly-Bestwert sowie Titel und Beschreibungen selbst erstellter BBM-
           Kanban-Aufgaben. Demo-Eingaben werden weder an den Server noch an Dritte übertragen.
           Sie können diese vollständig über die Website-Daten-Einstellungen Ihres Browsers löschen.`,
      section3Title: '3. Hosting, Serverprotokolle und E-Mail-Versand',
      p5: `Der Hosting-Anbieter kann technische Verbindungsdaten wie IP-Adresse, Datum und Uhrzeit,
           aufgerufene Seite, Browserinformationen und Referrer automatisch verarbeiten, um die
           Website bereitzustellen und abzusichern sowie Fehler zu untersuchen. Solche Protokolle
           werden entsprechend betrieblichen, sicherheitsbezogenen und gesetzlichen Erfordernissen
           aufbewahrt und von mir nicht für Werbung oder Profilbildung genutzt. Die Kontaktformular-
           E-Mail wird durch die beteiligten Hosting- und E-Mail-Anbieter verarbeitet, soweit dies
           für die Zustellung erforderlich ist.`,
      section4Title: '4. Ihre Rechte',
      p6: `Sie haben das Recht, jederzeit auf Ihre persönlichen Daten zuzugreifen,
           diese zu korrigieren und löschen zu lassen. Ich werde Ihrem Wunsch umgehend
           nachkommen, sofern keine rechtlichen Aufbewahrungspflichten bestehen.
           Kontaktieren Sie mich unter `,
      section5Title: '5. Datensicherheit',
      p7: `Ich setze branchenübliche Sicherheitsmaßnahmen ein, um Ihre persönlichen Daten
           vor unbefugtem Zugriff, Veränderungen, Offenlegung oder Zerstörung zu schützen.
           Bitte beachten Sie jedoch, dass keine Methode der Datenübertragung oder
           -speicherung 100% sicher ist.`,
      section6Title: '6. Änderungen dieser Richtlinie',
      p8: `Ich behalte mir das Recht vor, diese Datenschutzrichtlinie jederzeit zu aktualisieren
           oder zu ändern. Wesentliche Änderungen werden bekanntgegeben und, falls nötig,
           hole ich Ihre Zustimmung ein. Durch die fortgesetzte Nutzung dieser Website
           nach solchen Änderungen erkennen Sie die angepasste Richtlinie an.`
    },
    IT: {
      heading: 'INFORMATIVA SULLA PRIVACY',
      closeLabel: 'Chiudi l’informativa sulla privacy',
      updated: 'Ultimo aggiornamento: SETTEMBRE 2026',
      p1: `Io, Leo Rullani, gestisco questo sito web come portfolio personale.
           La protezione dei vostri dati personali è una priorità.`,
      p2: `Il mio impegno è trattare le vostre informazioni in modo trasparente e sicuro,
           assicurandomi che abbiate il controllo su ciò che viene condiviso e su come viene utilizzato.
           La presente Informativa sulla privacy riguarda vari aspetti, tra cui cookie, analisi,
           servizi di terze parti e i vostri diritti legali in materia di protezione dei dati personali.`,
      section1Title: '1. Modulo di contatto',
      p3: `Quando utilizzate il modulo di contatto, il vostro nome, indirizzo e-mail, messaggio e
           conferma dell'informativa sulla privacy vengono trasmessi al server del sito e inoltrati
           via e-mail alla casella di posta del portfolio. Queste informazioni sono utilizzate
           esclusivamente per elaborare e rispondere alla vostra richiesta. La corrispondenza viene
           conservata solo per il tempo necessario a tale scopo o richiesto o consentito dagli obblighi
           applicabili, dopodiché viene eliminata ove possibile.`,
      section2Title: '2. Memoria locale / Cookie / Analisi',
      p4: `Questo sito web non utilizza cookie analitici o pubblicitari. La memoria locale del browser
           viene utilizzata per ricordare la lingua selezionata. Le quattro demo interattive memorizzano
           dati esclusivamente sul vostro dispositivo: i preferiti di Collectrra, la lista di VideoFlix,
           il miglior punteggio di Quizly e i titoli e le descrizioni delle attività BBM Kanban. Le voci
           inserite nelle demo non vengono trasmesse al server né a terze parti. Potete eliminarle
           completamente attraverso le impostazioni del browser relative ai dati dei siti.`,
      section3Title: '3. Hosting, log del server e invio di e-mail',
      p5: `Il provider di hosting può trattare automaticamente dati tecnici di connessione, quali
           indirizzo IP, data e ora, pagina richiesta, informazioni sul browser e referrer, per fornire
           e proteggere il sito web e diagnosticare malfunzionamenti. Tali log vengono conservati in base
           a esigenze operative, di sicurezza e legali e non vengono utilizzati da me per pubblicità o
           profilazione. L'e-mail del modulo di contatto viene trattata dai provider di hosting e di posta
           elettronica nella misura necessaria per la consegna.`,
      section4Title: '4. I vostri diritti',
      p6: `Avete il diritto di accedere, correggere e cancellare i vostri dati personali in qualsiasi
           momento. La vostra richiesta sarà soddisfatta tempestivamente, purché non sussistano obblighi
           legali di conservazione di tali informazioni. Contattatemi all'indirizzo `,
      section5Title: '5. Sicurezza dei dati',
      p7: `Adotto misure di sicurezza conformi agli standard del settore per proteggere le vostre
           informazioni personali da accessi, modifiche, divulgazioni o distruzioni non autorizzati.
           Tuttavia, nessun metodo di trasmissione o archiviazione dei dati può essere sicuro al 100%
           e non posso garantire una sicurezza assoluta.`,
      section6Title: '6. Modifiche alla presente informativa',
      p8: `Mi riservo il diritto di aggiornare o modificare la presente Informativa sulla privacy in
           qualsiasi momento. Eventuali modifiche significative saranno comunicate e, ove necessario,
           richiederò il vostro consenso. Continuando a utilizzare questo sito dopo tali modifiche,
           riconoscete e accettate l'informativa aggiornata.`
    },
    FR: {
      heading: 'POLITIQUE DE CONFIDENTIALITÉ',
      closeLabel: 'Fermer la politique de confidentialité',
      updated: 'Dernière mise à jour : SEPTEMBRE 2026',
      p1: `Je soussigné, Leo Rullani, exploite ce site web en tant que portfolio personnel.
           La protection de vos données personnelles est une priorité.`,
      p2: `Je m'engage à traiter vos informations de manière transparente et sécurisée,
           afin que vous gardiez le contrôle sur les données partagées et leur utilisation.
           La présente Politique de confidentialité couvre différents aspects tels que les cookies,
           l'analyse, les services tiers et vos droits légaux en matière de protection des données personnelles.`,
      section1Title: '1. Formulaire de contact',
      p3: `Lorsque vous utilisez le formulaire de contact, votre nom, votre adresse e-mail, votre message
           et votre confirmation de la politique de confidentialité sont transmis au serveur du site web,
           puis transférés par e-mail à la boîte aux lettres du portfolio. Ces informations sont utilisées
           uniquement pour traiter votre demande et y répondre. La correspondance n'est conservée que le
           temps nécessaire à cette fin, ou aussi longtemps que les obligations applicables l'exigent ou
           l'autorisent, puis elle est supprimée dans la mesure du possible.`,
      section2Title: '2. Stockage local / Cookies / Analyse',
      p4: `Ce site web n'utilise aucun cookie d'analyse ou publicitaire. Le stockage local du navigateur
           sert à mémoriser la langue sélectionnée. Les quatre démonstrations interactives enregistrent
           des données uniquement sur votre appareil : les favoris Collectrra, la liste de lecture VideoFlix,
           le meilleur score Quizly ainsi que les titres et descriptions des tâches BBM Kanban. Les données
           saisies dans les démonstrations ne sont transmises ni au serveur ni à des tiers. Vous pouvez les
           supprimer complètement dans les paramètres de votre navigateur relatifs aux données des sites.`,
      section3Title: '3. Hébergement, journaux du serveur et acheminement des e-mails',
      p5: `Le fournisseur d'hébergement peut traiter automatiquement des données techniques de connexion,
           telles que l'adresse IP, la date et l'heure, la page demandée, les informations sur le navigateur
           et le référent, afin de fournir et de sécuriser le site web ainsi que de diagnostiquer les pannes.
           Ces journaux sont conservés conformément aux exigences opérationnelles, de sécurité et légales,
           et je ne les utilise ni à des fins publicitaires ni pour établir des profils. L'e-mail envoyé par
           le formulaire de contact est traité par les fournisseurs d'hébergement et de messagerie dans la
           mesure nécessaire à son acheminement.`,
      section4Title: '4. Vos droits',
      p6: `Vous avez le droit d'accéder à vos données personnelles, de les rectifier et de les supprimer
           à tout moment. Votre demande sera traitée rapidement, sous réserve qu'aucune obligation légale
           n'impose la conservation de ces informations. Contactez-moi à l'adresse `,
      section5Title: '5. Sécurité des données',
      p7: `Je mets en œuvre des mesures de sécurité conformes aux normes du secteur afin de protéger vos
           informations personnelles contre tout accès, toute modification, toute divulgation ou toute
           destruction non autorisés. Veuillez toutefois noter qu'aucune méthode de transmission ou de
           stockage des données ne peut être sécurisée à 100 % et que je ne peux garantir une sécurité absolue.`,
      section6Title: '6. Modifications de la présente politique',
      p8: `Je me réserve le droit d'actualiser ou de modifier la présente Politique de confidentialité à
           tout moment. Toute modification importante sera annoncée et, si nécessaire, je solliciterai
           votre consentement. En continuant à utiliser ce site après de telles modifications, vous
           reconnaissez et acceptez la politique mise à jour.`
    },
    ES: {
      heading: 'POLÍTICA DE PRIVACIDAD',
      closeLabel: 'Cerrar la política de privacidad',
      updated: 'Última actualización: SEPTIEMBRE DE 2026',
      p1: `Yo, Leo Rullani, gestiono este sitio web como mi portfolio personal.
           La protección de sus datos personales es una prioridad.`,
      p2: `Mi compromiso es tratar su información de forma transparente y segura,
           garantizando que usted tenga control sobre lo que se comparte y cómo se utiliza.
           Esta Política de privacidad abarca diversos aspectos, como las cookies, el análisis,
           los servicios de terceros y sus derechos legales relativos a la protección de datos personales.`,
      section1Title: '1. Formulario de contacto',
      p3: `Cuando utiliza el formulario de contacto, su nombre, dirección de correo electrónico, mensaje
           y confirmación de la política de privacidad se transmiten al servidor del sitio web y se reenvían
           por correo electrónico al buzón del portfolio. Esta información se utiliza exclusivamente para
           tramitar y responder a su consulta. La correspondencia se conserva únicamente durante el tiempo
           necesario para este fin, o según lo exijan o permitan las obligaciones aplicables, y posteriormente
           se elimina siempre que sea posible.`,
      section2Title: '2. Almacenamiento local / Cookies / Análisis',
      p4: `Este sitio web no utiliza cookies analíticas ni publicitarias. El almacenamiento local del
           navegador se utiliza para recordar el idioma seleccionado. Las cuatro demos interactivas almacenan
           datos únicamente en su dispositivo: los favoritos de Collectrra, la lista de VideoFlix, la mejor
           puntuación de Quizly y los títulos y descripciones de las tareas de BBM Kanban. Los datos introducidos
           en las demos no se transmiten al servidor ni a terceros. Puede eliminarlos por completo mediante la
           configuración de datos de sitios web de su navegador.`,
      section3Title: '3. Alojamiento, registros del servidor y entrega de correo electrónico',
      p5: `El proveedor de alojamiento puede procesar automáticamente datos técnicos de conexión, como la
           dirección IP, la fecha y hora, la página solicitada, la información del navegador y el referente,
           para proporcionar y proteger el sitio web y diagnosticar fallos. Estos registros se conservan de
           acuerdo con los requisitos operativos, de seguridad y legales, y no los utilizo con fines publicitarios
           ni de elaboración de perfiles. El correo electrónico del formulario de contacto es procesado por los
           proveedores de alojamiento y de correo electrónico en la medida necesaria para su entrega.`,
      section4Title: '4. Sus derechos',
      p6: `Tiene derecho a acceder, rectificar y suprimir sus datos personales en cualquier momento.
           Atenderé su solicitud con prontitud, siempre que no existan obligaciones legales de conservar
           dicha información. Póngase en contacto conmigo en `,
      section5Title: '5. Seguridad de los datos',
      p7: `Aplico medidas de seguridad habituales en el sector para proteger su información personal contra
           el acceso, la modificación, la divulgación o la destrucción no autorizados. No obstante, ningún método
           de transmisión o almacenamiento de datos puede ser seguro al 100 % y no puedo garantizar una
           seguridad absoluta.`,
      section6Title: '6. Cambios en esta política',
      p8: `Me reservo el derecho de actualizar o modificar esta Política de privacidad en cualquier momento.
           Los cambios importantes se anunciarán y, cuando sea necesario, solicitaré su consentimiento.
           Al continuar utilizando este sitio después de dichos cambios, usted reconoce y acepta la política actualizada.`
    },
    SQ: {
      heading: 'POLITIKA E PRIVATËSISË',
      closeLabel: 'Mbyll politikën e privatësisë',
      updated: 'Përditësuar së fundi: SHTATOR 2026',
      p1: `Unë, Leo Rullani, e drejtoj këtë faqe interneti si portofolin tim personal.
           Mbrojtja e të dhënave tuaja personale është përparësi.`,
      p2: `Angazhimi im është që informacionet tuaja t'i trajtoj në mënyrë transparente dhe të sigurt,
           duke u siguruar që ju të keni kontroll mbi atë që ndahet dhe mënyrën si përdoret.
           Kjo Politikë e privatësisë mbulon aspekte të ndryshme, si cookies, analiza, shërbimet e palëve
           të treta dhe të drejtat tuaja ligjore në lidhje me mbrojtjen e të dhënave personale.`,
      section1Title: '1. Formulari i kontaktit',
      p3: `Kur përdorni formularin e kontaktit, emri, adresa e e-mailit, mesazhi dhe konfirmimi juaj i
           politikës së privatësisë transmetohen te serveri i faqes së internetit dhe përcillen me e-mail
           në kutinë postare të portofolit. Këto informacione përdoren vetëm për të përpunuar kërkesën tuaj
           dhe për t'iu përgjigjur asaj. Korrespondenca ruhet vetëm për aq kohë sa nevojitet për këtë qëllim
           ose sa kërkohet apo lejohet nga detyrimet e zbatueshme dhe më pas fshihet kur është e mundur.`,
      section2Title: '2. Ruajtja lokale / Cookies / Analizat',
      p4: `Kjo faqe interneti nuk përdor cookies analitike ose reklamuese. Hapësira lokale e shfletuesit
           përdoret për të mbajtur mend gjuhën e zgjedhur. Katër demonstrimet interaktive ruajnë të dhëna
           vetëm në pajisjen tuaj: të preferuarat e Collectrra, listën e shikimit të VideoFlix, rezultatin më
           të mirë të Quizly dhe titujt e përshkrimet e detyrave në BBM Kanban. Të dhënat e futura në demonstrime
           nuk transmetohen te serveri ose te palë të treta. Mund t'i hiqni plotësisht përmes cilësimeve të
           shfletuesit për të dhënat e faqeve.`,
      section3Title: '3. Hostimi, regjistrat e serverit dhe dërgimi i e-mailit',
      p5: `Ofruesi i hostimit mund të përpunojë automatikisht të dhëna teknike të lidhjes, si adresën IP,
           datën dhe orën, faqen e kërkuar, informacionet e shfletuesit dhe referuesin, për ta ofruar dhe
           siguruar faqen e internetit dhe për të diagnostikuar probleme. Regjistra të tillë ruhen sipas
           kërkesave operative, të sigurisë dhe ligjore dhe nuk përdoren nga unë për reklamim ose profilizim.
           E-maili i formularit të kontaktit përpunohet nga ofruesit e hostimit dhe të e-mailit sipas nevojës
           për dërgim.`,
      section4Title: '4. Të drejtat tuaja',
      p6: `Ju keni të drejtë të qaseni, t'i korrigjoni dhe t'i fshini të dhënat tuaja personale në çdo kohë.
           Kërkesa juaj do të përmbushet pa vonesë, me kusht që të mos ketë detyrime ligjore për ruajtjen e
           këtyre informacioneve. Më kontaktoni në `,
      section5Title: '5. Siguria e të dhënave',
      p7: `Zbatoj masa sigurie sipas standardeve të industrisë për t'i mbrojtur informacionet tuaja personale
           nga qasja, ndryshimi, zbulimi ose shkatërrimi i paautorizuar. Megjithatë, asnjë mënyrë transmetimi
           ose ruajtjeje të të dhënave nuk mund të jetë 100% e sigurt dhe nuk mund të garantoj siguri absolute.`,
      section6Title: '6. Ndryshimet në këtë politikë',
      p8: `E rezervoj të drejtën ta përditësoj ose ndryshoj këtë Politikë të privatësisë në çdo kohë.
           Çdo ndryshim i rëndësishëm do të njoftohet dhe, kur të jetë e nevojshme, do të kërkoj pëlqimin tuaj.
           Duke vazhduar ta përdorni këtë faqe pas ndryshimeve të tilla, ju e pranoni politikën e përditësuar.`
    },
    GSW: {
      heading: 'DATESCHUTZ',
      closeLabel: 'Dateschutzerklärig schliesse',
      updated: 'Zletscht aktualisiert: SEPTEMBER 2026',
      p1: `Ich, Leo Rullani, betriibe die Website als mis persönliche Portfolio.
           De Schutz vo Ihre persönliche Date het höchscht Priorität.`,
      p2: `Ich verpflichte mich, Ihri Informatione transparent und sicher z behandle,
           demit Si d Kontrolle drüber bhalted, was teilt wird und wie s verwendet wird.
           Die Dateschutzerklärig behandelt Theme wie Cookies, Analyse,
           Drittanbieter-Dienscht und Ihri gsetzliche Rächt rund um de Dateschutz.`,
      section1Title: '1. Kontaktformular',
      p3: `Wenn Si s Kontaktformular bruuched, wärded Ihr Name, Ihri E-Mail-Adrässe,
           Ihri Nachricht und d Bestätigung vo de Dateschutzerklärig a de Webserver
           übermittelt und per E-Mail as Portfolio-Poschtfach wiitergleitet. Die Aagabe
           wärded nur zum Bearbeite und Beantworte vo Ihrer Aafrag verwendet.
           D Korrespondenz wird nur so lang ufbewahrt, wie s für dä Zweck nötig oder
           aufgrund vo aawändbare Pflicht erforderlich beziehungsweise erlaubt isch,
           und nachher, sowiit möglich, glöscht.`,
      section2Title: '2. Lokale Speicher / Cookies / Analyse',
      p4: `Die Website verwendet kei Analyse- oder Wärbe-Cookies. De lokale Browserspeicher
           wird bruucht, zum d gwählti Sprooch z speichere. Die vier interaktive Demos
           speichered Date nur uf Ihrem Grät: Collectrra-Favorite, d VideoFlix-Merklischte,
           de Quizly-Bestwärt sowie Titel und Beschriibige vo sälber erstellte BBM-Kanban-
           Ufgabe. Demo-Iigabe wärded weder a de Server no a Dritti übermittelt.
           Si chönd die Date vollständig über d Website-Date-Iistellige vom Browser lösche.`,
      section3Title: '3. Hosting, Serverprotokoll und E-Mail-Versand',
      p5: `De Hosting-Aabieter cha technisci Verbindigsdaten wie IP-Adrässe, Datum und Ziit,
           ufg’rüefti Siite, Browserinformatione und Referrer automatisch verarbeite, zum d
           Website bereitzstelle und abzusichere sowie Fähler z untersueche. Söttigi Protokoll
           wärded entsprechend betriebliche, sicherheitsbezogene und gsetzliche Erfordernisse
           ufbewahrt und vo mir nöd für Wärbig oder Profilbildig verwendet. D E-Mail vom
           Kontaktformular wird vo de beteiligte Hosting- und E-Mail-Aabieter verarbeit,
           sowiit das für d Zuestellig nötig isch.`,
      section4Title: '4. Ihri Rächt',
      p6: `Si hend s Rächt, jederzeit Uskunft über Ihri persönliche Date z becho,
           die korrigiere und lösche z lah. Ich erfülle Ihri Aafrag umgehend,
           sofern kei rechtliche Ufbewahrigspflichte bestönd. Kontaktiere Si mich unter `,
      section5Title: '5. Datesicherheit',
      p7: `Ich setze branchenüblichi Sicherheitsmassnahme ii, zum Ihri persönliche Date
           vor unbefuegtem Zuegriff, Veränderige, Offelegig oder Zerstörig z schütze.
           Bitte beachted Si aber, dass kei Methode vo de Dateübertragig oder -speicherig
           zu 100 % sicher isch und ich kei absoluti Sicherheit garantiere cha.`,
      section6Title: '6. Änderige vo dere Richtlinie',
      p8: `Ich bhalte mir s Rächt vor, die Dateschutzerklärig jederzeit z aktualisiere
           oder z ändere. Wesentlichi Änderige wärded bekannt geh und, wenn nötig,
           wird Ihri Zuestimmig iigholt. Wenn Si die Siite nach söttige Änderige wiiter
           nutzed, anerkenned und akzeptiered Si d aktualisierti Richtlinie.`
    },
    PT: {
      heading: 'POLÍTICA DE PRIVACIDADE',
      closeLabel: 'Fechar a política de privacidade',
      updated: 'Última atualização: SETEMBRO DE 2026',
      p1: `Eu, Leo Rullani, exploro este site como o meu portefólio pessoal.
           A proteção dos seus dados pessoais é uma prioridade.`,
      p2: `Comprometo-me a tratar as suas informações de forma transparente e segura,
           garantindo que mantém o controlo sobre aquilo que é partilhado e a forma como é utilizado.
           Esta Política de privacidade abrange vários aspetos, como cookies, análise,
           serviços de terceiros e os seus direitos legais relativos à proteção de dados pessoais.`,
      section1Title: '1. Formulário de contacto',
      p3: `Quando utiliza o formulário de contacto, o seu nome, endereço de e-mail, mensagem e confirmação
           da política de privacidade são transmitidos ao servidor do site e reencaminhados por e-mail para
           a caixa de correio do portefólio. Estas informações são utilizadas exclusivamente para processar
           e responder ao seu pedido. A correspondência é conservada apenas durante o tempo necessário para
           esse fim, ou conforme exigido ou permitido pelas obrigações aplicáveis, sendo depois eliminada
           sempre que possível.`,
      section2Title: '2. Armazenamento local / Cookies / Análise',
      p4: `Este site não utiliza cookies analíticos nem publicitários. O armazenamento local do navegador
           é utilizado para memorizar o idioma selecionado. As quatro demonstrações interativas armazenam
           dados apenas no seu dispositivo: os favoritos do Collectrra, a lista do VideoFlix, a melhor
           pontuação do Quizly e os títulos e descrições das tarefas do BBM Kanban. Os dados introduzidos nas
           demonstrações não são transmitidos ao servidor nem a terceiros. Pode removê-los completamente
           através das definições do navegador relativas aos dados dos sites.`,
      section3Title: '3. Alojamento, registos do servidor e entrega de e-mail',
      p5: `O fornecedor de alojamento pode processar automaticamente dados técnicos de ligação, como o
           endereço IP, a data e hora, a página solicitada, informações sobre o navegador e o referenciador,
           para disponibilizar e proteger o site e diagnosticar falhas. Estes registos são conservados de
           acordo com requisitos operacionais, de segurança e legais, e não são utilizados por mim para
           publicidade ou definição de perfis. O e-mail do formulário de contacto é processado pelos
           fornecedores de alojamento e de e-mail na medida necessária para a sua entrega.`,
      section4Title: '4. Os seus direitos',
      p6: `Tem o direito de aceder, corrigir e apagar os seus dados pessoais a qualquer momento.
           O seu pedido será atendido prontamente, desde que não existam obrigações legais de conservação
           dessas informações. Contacte-me através de `,
      section5Title: '5. Segurança dos dados',
      p7: `Adoto medidas de segurança padrão do setor para proteger as suas informações pessoais contra
           o acesso, a alteração, a divulgação ou a destruição não autorizados. No entanto, nenhum método
           de transmissão ou armazenamento de dados pode ser 100 % seguro e não posso garantir uma
           segurança absoluta.`,
      section6Title: '6. Alterações a esta política',
      p8: `Reservo-me o direito de atualizar ou alterar esta Política de privacidade a qualquer momento.
           Quaisquer alterações significativas serão anunciadas e, quando necessário, solicitarei o seu
           consentimento. Ao continuar a utilizar este site após essas alterações, reconhece e aceita a
           política atualizada.`
    }
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage) {
      this.activeLang = storedLanguage;
    }
    this.updateDocumentLanguage();
  }

  changeLang(lang: Language): void {
    this.activeLang = lang;
    this.updateDocumentLanguage();
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // The language still changes if browser storage is unavailable.
    }
  }

  @HostListener(`window:${PORTFOLIO_LANGUAGE_CHANGE_EVENT}`, ['$event'])
  onLanguageChange(event: CustomEvent<unknown>): void {
    if (!isLanguage(event.detail)) return;
    this.activeLang = event.detail;
    this.updateDocumentLanguage();
  }

  private getStoredLanguage(): Language | null {
    try {
      const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return isLanguage(storedLanguage) ? storedLanguage : null;
    } catch {
      return null;
    }
  }

  private updateDocumentLanguage(): void {
    document.documentElement.lang = getLanguageOption(this.activeLang).htmlLang;
  }

  closeOnX(e: MouseEvent): void {
    e.preventDefault();
    this.goRightOrBottom();
  }

  private goRightOrBottom(): void {
    this.router.navigate(['/']).then(() => {
      const c = document.querySelector('.container') as HTMLElement | null;
      if (!c) return;
      c.style.setProperty('scroll-behavior', 'auto', 'important');
      c.style.visibility = 'hidden';
      if (window.innerWidth >= 800) {
        c.scrollLeft = c.scrollWidth - c.clientWidth;
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
      }
      c.offsetWidth; // reflow
      c.style.visibility = '';
      c.style.removeProperty('scroll-behavior');
    });
  }
}
