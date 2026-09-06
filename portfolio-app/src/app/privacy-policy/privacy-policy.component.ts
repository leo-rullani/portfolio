import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  @Input() activeLang: 'DE' | 'EN' = 'EN';
  text = {
    EN: {
      heading: 'PRIVACY POLICY',
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
            at any time. We will comply with your request promptly, provided there are
            no legal obligations to retain such information. Contact me at `,
      section5Title: '5. Data Security',
      p7: `I implement industry-standard security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or destruction.
            However, please note that no method of data transmission or storage can be
            100% secure, and we cannot guarantee absolute security.`,
      section6Title: '6. Changes to this Policy',
      p8: `I reserve the right to update or modify this Privacy Policy at any time.
            Any significant changes will be announced, and where necessary,
            I will seek your consent. By continuing to use this site after such changes,
            you acknowledge and accept the updated policy.`
    },
    DE: {
      heading: 'DATENSCHUTZ',
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
           diese zu korrigieren und löschen zu lassen. Wir werden Ihrem Wunsch umgehend
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
           wird Ihre Zustimmung eingeholt. Durch die fortgesetzte Nutzung dieser Website
           nach solchen Änderungen erkennen Sie die angepasste Richtlinie an.`
    }
  };

  constructor(private router: Router) {}

  ngOnInit() {

    const s = localStorage.getItem('preferredLanguage');
    if (s === 'DE' || s === 'EN') {
      this.activeLang = s;
    }
  }


  changeLang(lang: 'DE' | 'EN') {
    this.activeLang = lang;
    localStorage.setItem('preferredLanguage', lang);
  }

  closeOnX(e: MouseEvent) {
    e.preventDefault();
    this.goRightOrBottom();
  }

  private goRightOrBottom() {
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
