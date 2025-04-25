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
      updated: 'Last updated: APRIL 2025',
      p1: `I, Leo Rullani, operate this website as my personal portfolio.
           Protecting your personal data is a priority.`,
      p2: `My commitment is to handle your information in a transparent and secure way,
           ensuring you have control over what is shared and how it is utilized.
           This Privacy Policy covers various aspects such as cookies, analytics,
           third-party services, and your legal rights regarding personal data protection.`,
      section1Title: '1. Data Collection',
      p3: `Any personal data (e.g., name, email) provided via the contact form
           is used solely to respond to your inquiries. We do not store your data indefinitely,
           nor do we share it with unauthorized third parties. However, we may keep a record
           of communication for reference, but only as permitted by law.`,
      section2Title: '2. Cookies / Analytics',
      p4: `Currently, no analytics or cookies are used. Should we introduce any
           form of tracking or analytical tools in the future, you will be promptly
           informed, and your consent would be requested where necessary.`,
      section3Title: '3. Third-Party Services',
      p5: `If external services are integrated, they follow standard GDPR compliance.
           We ensure that any external provider handles data responsibly and
           in accordance with relevant regulations.`,
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
      updated: 'Zuletzt aktualisiert: APRIL 2025',
      p1: `Ich, Leo Rullani, betreibe diese Website als mein persönliches Portfolio.
           Der Schutz Ihrer persönlichen Daten hat höchste Priorität.`,
      p2: `Ich verpflichte mich, Ihre Informationen transparent und sicher zu behandeln,
           damit Sie die Kontrolle darüber behalten, was geteilt wird und wie es verwendet wird.
           Diese Datenschutzrichtlinie behandelt Themen wie Cookies, Analysen,
           Drittanbieter-Services und Ihre gesetzlichen Rechte in Bezug auf den Datenschutz.`,
      section1Title: '1. Datenerhebung',
      p3: `Alle persönlichen Daten (z.B. Name, E-Mail), die über das Kontaktformular
           bereitgestellt werden, werden ausschließlich genutzt, um auf Ihre Anfragen
           zu antworten. Wir speichern Ihre Daten nicht unbegrenzt und geben sie nicht
           an unbefugte Dritte weiter. Wir können jedoch Kommunikation zu Referenzzwecken
           aufbewahren, sofern dies gesetzlich zulässig ist.`,
      section2Title: '2. Cookies / Analysen',
      p4: `Derzeit werden weder Cookies noch Analysen verwendet. Sollten wir in Zukunft
           irgendwelche Tracking- oder Analysetools einsetzen, werden Sie rechtzeitig
           informiert und um Zustimmung gebeten.`,
      section3Title: '3. Drittanbieter-Services',
      p5: `Sollten externe Dienste integriert werden, entsprechen diese den
           geltenden DSGVO-Vorgaben. Wir stellen sicher, dass jeder externe Anbieter
           Daten verantwortungsbewusst und entsprechend der gesetzlichen Vorgaben verarbeitet.`,
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
