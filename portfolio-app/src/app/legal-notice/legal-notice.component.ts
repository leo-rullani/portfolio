import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent implements OnInit {
  @Input() activeLang: 'DE' | 'EN' = 'EN';

  text = {
    EN: {
      title: 'LEGAL NOTICE',
      ownerTitle: 'Owner of the Website',
      ownerParagraph: `
        Name: <strong>Leo Rullani</strong><br/>
        E-mail: coding@leorullani.com<br/>
        Tel: +41 76 488 56 10<br/><br/>
        Based in Wohlen, Switzerland. Responsible for all published content.
      `,
      disclaimerTitle: 'Disclaimer',
      disclaimerText: `
        While I strive to keep this website's information current,
        I do not guarantee its accuracy or completeness.
        Access and use are at your own risk. By continuing to use this site,
        you agree to this disclaimer in full.
      `,
      externalLinksTitle: 'External Links',
      externalLinksText: `
        This website may contain external links. I have no control over
        the content or policies of those external sites and assume no liability
        for them. Visiting linked sites is at your own risk.
      `,
      copyrightTitle: 'Copyright',
      copyrightText: `
        All content on this site is protected by copyright.
        Unauthorized use, reproduction, or distribution is strictly
        prohibited without prior written permission. This includes text, images,
        logos, code, and any other original works.
      `,
      liabilityTitle: 'Liability',
      liabilityText: `
        Under no circumstances shall I be liable for any damages
        arising from or in connection with the use of this website,
        except in cases of willful misconduct or gross negligence.
        This includes direct, indirect, incidental, and consequential damages.
      `,
      severabilityTitle: 'Severability Clause',
      severabilityText: `
        If any provision of this Legal Notice is found to be invalid
        or unenforceable, the remaining provisions shall remain in full force
        and effect.
      `,
      noWarrantiesTitle: 'No Warranties',
      noWarrantiesText: `
        The content on this site is provided "as is" without warranties of
        any kind, whether express or implied. I make no representations about
        the suitability, reliability, or availability of information
        and services contained on this website.
      `,
      changesTitle: 'Changes & Revisions',
      changesText: `
        I reserve the right to modify or remove content from this website
        at any time without prior notice. Users are encouraged to review
        this Legal Notice periodically to stay informed of updates.
      `,
      governingLawTitle: 'Governing Law',
      governingLawText: `
        Any disputes related to this website shall be governed by the
        applicable laws of Switzerland. By using this site, you agree
        that any legal matters will be addressed in the appropriate Swiss courts.
      `,
      contactTitle: 'Contact',
      contactText: `
        For any questions regarding this Legal Notice,
        please contact me at <a href="mailto:coding@leorullani.com" class="mail-link">
        coding@leorullani.com</a>.
      `
    },
    DE: {
      title: 'IMPRESSUM',
      ownerTitle: 'Inhaber der Website',
      ownerParagraph: `
        Name: <strong>Leo Rullani</strong><br/>
        E-Mail: coding@leorullani.com<br/>
        Tel: +41 76 488 56 10<br/><br/>
        Sitz in Wohlen, Schweiz. Verantwortlich für alle veröffentlichten Inhalte.
      `,
      disclaimerTitle: 'Haftungsausschluss',
      disclaimerText: `
        Ich bemühe mich, die Informationen auf dieser Website aktuell zu halten,
        übernehme jedoch keine Gewähr für deren Richtigkeit oder Vollständigkeit.
        Die Nutzung erfolgt auf eigenes Risiko. Durch die fortgesetzte Nutzung
        dieser Seite stimmen Sie diesem Haftungsausschluss zu.
      `,
      externalLinksTitle: 'Externe Links',
      externalLinksText: `
        Diese Website kann externe Links enthalten. Ich habe keinen Einfluss
        auf die Inhalte oder Richtlinien dieser verlinkten Seiten und übernehme
        keine Haftung dafür. Das Aufrufen externer Links geschieht auf eigene Gefahr.
      `,
      copyrightTitle: 'Urheberrecht',
      copyrightText: `
        Alle Inhalte auf dieser Seite sind urheberrechtlich geschützt.
        Eine unautorisierte Verwendung, Vervielfältigung oder Weiterverbreitung
        ist ohne vorherige schriftliche Genehmigung untersagt. Dies gilt für Texte,
        Bilder, Logos, Code und sonstige eigene Werke.
      `,
      liabilityTitle: 'Haftung',
      liabilityText: `
        Der Betreiber haftet nicht für Schäden, die aus oder im Zusammenhang
        mit der Nutzung dieser Website entstehen, außer in Fällen von Vorsatz
        oder grober Fahrlässigkeit. Dies schließt direkte, indirekte,
        beiläufige und Folgeschäden ein.
      `,
      severabilityTitle: 'Salvatorische Klausel',
      severabilityText: `
        Sollten einzelne Bestimmungen dieses Impressums unwirksam oder
        undurchführbar sein, bleiben die übrigen Bestimmungen davon unberührt
        und weiterhin wirksam.
      `,
      noWarrantiesTitle: 'Keine Garantien',
      noWarrantiesText: `
        Die Inhalte dieser Seite werden "wie besehen" zur Verfügung gestellt,
        ohne jegliche ausdrückliche oder stillschweigende Garantie.
        Ich übernehme keine Gewähr für Eignung, Zuverlässigkeit oder
        Verfügbarkeit der bereitgestellten Informationen und Dienste.
      `,
      changesTitle: 'Änderungen & Überarbeitungen',
      changesText: `
        Ich behalte mir das Recht vor, Inhalte dieser Website jederzeit
        ohne vorherige Ankündigung zu ändern oder zu entfernen.
        Nutzern wird empfohlen, dieses Impressum regelmäßig zu überprüfen,
        um über Aktualisierungen informiert zu sein.
      `,
      governingLawTitle: 'Anwendbares Recht',
      governingLawText: `
        Alle Streitigkeiten im Zusammenhang mit dieser Website unterliegen
        dem geltenden Recht der Schweiz. Mit der Nutzung dieser Seite erklären
        Sie sich einverstanden, dass rechtliche Angelegenheiten vor den
        zuständigen Schweizer Gerichten geklärt werden.
      `,
      contactTitle: 'Kontakt',
      contactText: `
        Bei Fragen zu diesem Impressum wenden Sie sich bitte an
        <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a>.
      `
    }
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const s = localStorage.getItem('preferredLanguage');
    if (s === 'DE' || s === 'EN') {
      this.activeLang = s;
    }
  }

  closeOnX(e: MouseEvent) {
    e.preventDefault();
    this.goRightOrBottom();
  }

  closeOverlay(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this.goRightOrBottom();
    }
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
      c.offsetWidth;
      c.style.visibility = '';
      c.style.removeProperty('scroll-behavior');
    });
  }
}
