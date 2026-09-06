import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  getLanguageOption,
  isLanguage,
  Language,
  LANGUAGE_STORAGE_KEY,
  PORTFOLIO_LANGUAGE_CHANGE_EVENT
} from '../i18n/language';

interface LegalNoticeText {
  title: string;
  closeLabel: string;
  ownerTitle: string;
  ownerParagraph: string;
  disclaimerTitle: string;
  disclaimerText: string;
  externalLinksTitle: string;
  externalLinksText: string;
  copyrightTitle: string;
  copyrightText: string;
  liabilityTitle: string;
  liabilityText: string;
  severabilityTitle: string;
  severabilityText: string;
  noWarrantiesTitle: string;
  noWarrantiesText: string;
  changesTitle: string;
  changesText: string;
  governingLawTitle: string;
  governingLawText: string;
  contactTitle: string;
  contactText: string;
}

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent implements OnInit {
  @Input() activeLang: Language = 'EN';

  readonly text: Record<Language, LegalNoticeText> = {
    EN: {
      title: 'LEGAL NOTICE',
      closeLabel: 'Close legal notice',
      ownerTitle: 'Owner of the Website',
      ownerParagraph: `
        Business: <strong>Rullani DataLab</strong><br/>
        Founder and owner: <strong>Leugzim Rullani</strong> (on this website: Leo Rullani)<br/>
        UID: CHE-230.957.470<br/>
        E-mail: <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a><br/>
        Tel: <a href="tel:+41764885610" class="mail-link">+41 76 488 56 10</a><br/><br/>
        Location: 5610 Wohlen AG, Switzerland. Responsible for all published content.
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
      closeLabel: 'Impressum schließen',
      ownerTitle: 'Inhaber der Website',
      ownerParagraph: `
        Unternehmen: <strong>Rullani DataLab</strong><br/>
        Gründer und Inhaber: <strong>Leugzim Rullani</strong> (auf dieser Website: Leo Rullani)<br/>
        UID: CHE-230.957.470<br/>
        E-Mail: <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a><br/>
        Tel: <a href="tel:+41764885610" class="mail-link">+41 76 488 56 10</a><br/><br/>
        Standort: 5610 Wohlen AG, Schweiz. Verantwortlich für alle veröffentlichten Inhalte.
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
    },
    IT: {
      title: 'NOTE LEGALI',
      closeLabel: 'Chiudi le note legali',
      ownerTitle: 'Titolare del sito web',
      ownerParagraph: `
        Impresa: <strong>Rullani DataLab</strong><br/>
        Fondatore e titolare: <strong>Leugzim Rullani</strong> (su questo sito: Leo Rullani)<br/>
        UID: CHE-230.957.470<br/>
        E-mail: <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a><br/>
        Tel.: <a href="tel:+41764885610" class="mail-link">+41 76 488 56 10</a><br/><br/>
        Sede: 5610 Wohlen AG, Svizzera. Responsabile di tutti i contenuti pubblicati.
      `,
      disclaimerTitle: 'Esclusione di responsabilità',
      disclaimerText: `
        Pur impegnandomi a mantenere aggiornate le informazioni di questo sito web,
        non ne garantisco l'accuratezza né la completezza. L'accesso e l'utilizzo
        avvengono a proprio rischio. Continuando a utilizzare questo sito, l'utente
        accetta integralmente la presente esclusione di responsabilità.
      `,
      externalLinksTitle: 'Link esterni',
      externalLinksText: `
        Questo sito web può contenere link esterni. Non ho alcun controllo sui
        contenuti o sulle politiche di tali siti esterni e non mi assumo alcuna
        responsabilità in merito. La visita dei siti collegati avviene a proprio rischio.
      `,
      copyrightTitle: 'Diritto d’autore',
      copyrightText: `
        Tutti i contenuti di questo sito sono protetti dal diritto d'autore.
        L'uso, la riproduzione o la distribuzione non autorizzati sono severamente
        vietati senza previa autorizzazione scritta. Ciò include testi, immagini,
        loghi, codice e qualsiasi altra opera originale.
      `,
      liabilityTitle: 'Responsabilità',
      liabilityText: `
        In nessun caso sarò responsabile per eventuali danni derivanti da o connessi
        all'utilizzo di questo sito web, salvo nei casi di dolo o colpa grave.
        Ciò include danni diretti, indiretti, incidentali e consequenziali.
      `,
      severabilityTitle: 'Clausola di salvaguardia',
      severabilityText: `
        Qualora una disposizione delle presenti Note legali risulti non valida
        o inapplicabile, le restanti disposizioni rimarranno pienamente valide
        ed efficaci.
      `,
      noWarrantiesTitle: 'Nessuna garanzia',
      noWarrantiesText: `
        I contenuti di questo sito sono forniti «così come sono», senza garanzie
        di alcun tipo, espresse o implicite. Non rilascio alcuna dichiarazione
        circa l'idoneità, l'affidabilità o la disponibilità delle informazioni
        e dei servizi contenuti in questo sito web.
      `,
      changesTitle: 'Modifiche e revisioni',
      changesText: `
        Mi riservo il diritto di modificare o rimuovere contenuti da questo sito web
        in qualsiasi momento e senza preavviso. Si invita l'utente a consultare
        periodicamente le presenti Note legali per restare informato sugli aggiornamenti.
      `,
      governingLawTitle: 'Legge applicabile',
      governingLawText: `
        Qualsiasi controversia relativa a questo sito web sarà disciplinata dalle
        leggi applicabili della Svizzera. Utilizzando questo sito, l'utente accetta
        che ogni questione legale sia sottoposta ai tribunali svizzeri competenti.
      `,
      contactTitle: 'Contatti',
      contactText: `
        Per qualsiasi domanda relativa alle presenti Note legali, contattatemi
        all'indirizzo <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a>.
      `
    },
    FR: {
      title: 'MENTIONS LÉGALES',
      closeLabel: 'Fermer les mentions légales',
      ownerTitle: 'Propriétaire du site web',
      ownerParagraph: `
        Entreprise : <strong>Rullani DataLab</strong><br/>
        Fondateur et propriétaire : <strong>Leugzim Rullani</strong> (sur ce site web : Leo Rullani)<br/>
        UID : CHE-230.957.470<br/>
        E-mail : <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a><br/>
        Tél. : <a href="tel:+41764885610" class="mail-link">+41 76 488 56 10</a><br/><br/>
        Siège : 5610 Wohlen AG, Suisse. Responsable de l'ensemble des contenus publiés.
      `,
      disclaimerTitle: 'Clause de non-responsabilité',
      disclaimerText: `
        Bien que je m'efforce de maintenir à jour les informations de ce site web,
        je ne garantis ni leur exactitude ni leur exhaustivité. L'accès au site et
        son utilisation se font à vos propres risques. En continuant à utiliser ce
        site, vous acceptez intégralement la présente clause de non-responsabilité.
      `,
      externalLinksTitle: 'Liens externes',
      externalLinksText: `
        Ce site web peut contenir des liens externes. Je n'exerce aucun contrôle
        sur le contenu ou les politiques de ces sites externes et décline toute
        responsabilité à leur égard. La consultation des sites liés se fait à vos propres risques.
      `,
      copyrightTitle: 'Droit d’auteur',
      copyrightText: `
        Tous les contenus de ce site sont protégés par le droit d'auteur.
        Toute utilisation, reproduction ou distribution non autorisée est strictement
        interdite sans autorisation écrite préalable. Cela comprend les textes, images,
        logos, codes et toute autre œuvre originale.
      `,
      liabilityTitle: 'Responsabilité',
      liabilityText: `
        Je ne pourrai en aucun cas être tenu responsable de dommages découlant de
        l'utilisation de ce site web ou en lien avec celle-ci, sauf en cas de faute
        intentionnelle ou de négligence grave. Cela comprend les dommages directs,
        indirects, accessoires et consécutifs.
      `,
      severabilityTitle: 'Clause de divisibilité',
      severabilityText: `
        Si une disposition des présentes Mentions légales est jugée invalide ou
        inapplicable, les autres dispositions resteront pleinement en vigueur.
      `,
      noWarrantiesTitle: 'Absence de garanties',
      noWarrantiesText: `
        Le contenu de ce site est fourni « en l'état », sans garantie d'aucune sorte,
        expresse ou implicite. Je ne fais aucune déclaration quant à l'adéquation,
        la fiabilité ou la disponibilité des informations et services contenus sur ce site web.
      `,
      changesTitle: 'Modifications et révisions',
      changesText: `
        Je me réserve le droit de modifier ou de supprimer des contenus de ce site web
        à tout moment et sans préavis. Les utilisateurs sont invités à consulter
        périodiquement les présentes Mentions légales afin de prendre connaissance des mises à jour.
      `,
      governingLawTitle: 'Droit applicable',
      governingLawText: `
        Tout litige relatif à ce site web est régi par le droit suisse applicable.
        En utilisant ce site, vous acceptez que toute question juridique soit traitée
        par les tribunaux suisses compétents.
      `,
      contactTitle: 'Contact',
      contactText: `
        Pour toute question concernant les présentes Mentions légales, veuillez me contacter à
        l'adresse <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a>.
      `
    },
    ES: {
      title: 'AVISO LEGAL',
      closeLabel: 'Cerrar el aviso legal',
      ownerTitle: 'Titular del sitio web',
      ownerParagraph: `
        Empresa: <strong>Rullani DataLab</strong><br/>
        Fundador y titular: <strong>Leugzim Rullani</strong> (en este sitio web: Leo Rullani)<br/>
        UID: CHE-230.957.470<br/>
        Correo electrónico: <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a><br/>
        Tel.: <a href="tel:+41764885610" class="mail-link">+41 76 488 56 10</a><br/><br/>
        Sede: 5610 Wohlen AG, Suiza. Responsable de todo el contenido publicado.
      `,
      disclaimerTitle: 'Exención de responsabilidad',
      disclaimerText: `
        Aunque procuro mantener actualizada la información de este sitio web,
        no garantizo su exactitud ni su integridad. El acceso y el uso se realizan
        por cuenta y riesgo del usuario. Al continuar usando este sitio, usted acepta
        íntegramente esta exención de responsabilidad.
      `,
      externalLinksTitle: 'Enlaces externos',
      externalLinksText: `
        Este sitio web puede contener enlaces externos. No tengo control sobre el
        contenido ni las políticas de esos sitios externos y no asumo responsabilidad
        alguna por ellos. La visita a los sitios enlazados se realiza por cuenta y riesgo del usuario.
      `,
      copyrightTitle: 'Derechos de autor',
      copyrightText: `
        Todo el contenido de este sitio está protegido por derechos de autor.
        Queda estrictamente prohibido su uso, reproducción o distribución no autorizados
        sin permiso previo por escrito. Esto incluye textos, imágenes, logotipos,
        código y cualquier otra obra original.
      `,
      liabilityTitle: 'Responsabilidad',
      liabilityText: `
        En ningún caso seré responsable de los daños derivados del uso de este sitio web
        o relacionados con él, salvo en casos de conducta dolosa o negligencia grave.
        Esto incluye daños directos, indirectos, incidentales y consecuentes.
      `,
      severabilityTitle: 'Cláusula de separabilidad',
      severabilityText: `
        Si alguna disposición de este Aviso legal se considera inválida o inaplicable,
        las disposiciones restantes conservarán plena vigencia y efecto.
      `,
      noWarrantiesTitle: 'Ausencia de garantías',
      noWarrantiesText: `
        El contenido de este sitio se proporciona «tal cual», sin garantías de ningún tipo,
        expresas o implícitas. No realizo manifestación alguna sobre la idoneidad,
        fiabilidad o disponibilidad de la información y los servicios contenidos en este sitio web.
      `,
      changesTitle: 'Cambios y revisiones',
      changesText: `
        Me reservo el derecho de modificar o eliminar contenido de este sitio web
        en cualquier momento y sin previo aviso. Se recomienda a los usuarios revisar
        periódicamente este Aviso legal para mantenerse informados de las actualizaciones.
      `,
      governingLawTitle: 'Legislación aplicable',
      governingLawText: `
        Toda controversia relacionada con este sitio web se regirá por la legislación
        aplicable de Suiza. Al utilizar este sitio, usted acepta que cualquier asunto
        jurídico se resuelva ante los tribunales suizos competentes.
      `,
      contactTitle: 'Contacto',
      contactText: `
        Para cualquier pregunta relacionada con este Aviso legal, póngase en contacto conmigo en
        <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a>.
      `
    },
    SQ: {
      title: 'NJOFTIM LIGJOR',
      closeLabel: 'Mbyll njoftimin ligjor',
      ownerTitle: 'Pronari i faqes së internetit',
      ownerParagraph: `
        Biznesi: <strong>Rullani DataLab</strong><br/>
        Themeluesi dhe pronari: <strong>Leugzim Rullani</strong> (në këtë faqe: Leo Rullani)<br/>
        UID: CHE-230.957.470<br/>
        E-mail: <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a><br/>
        Tel.: <a href="tel:+41764885610" class="mail-link">+41 76 488 56 10</a><br/><br/>
        Selia: 5610 Wohlen AG, Zvicër. Përgjegjës për të gjithë përmbajtjen e publikuar.
      `,
      disclaimerTitle: 'Mohim përgjegjësie',
      disclaimerText: `
        Edhe pse përpiqem t'i mbaj të përditësuara informacionet e kësaj faqeje,
        nuk garantoj saktësinë ose plotësinë e tyre. Qasja dhe përdorimi bëhen me
        përgjegjësinë tuaj. Duke vazhduar ta përdorni këtë faqe, ju e pranoni plotësisht
        këtë mohim përgjegjësie.
      `,
      externalLinksTitle: 'Lidhje të jashtme',
      externalLinksText: `
        Kjo faqe interneti mund të përmbajë lidhje të jashtme. Unë nuk kam kontroll
        mbi përmbajtjen ose politikat e atyre faqeve të jashtme dhe nuk mbaj përgjegjësi
        për to. Vizitimi i faqeve të lidhura bëhet me përgjegjësinë tuaj.
      `,
      copyrightTitle: 'E drejta e autorit',
      copyrightText: `
        E gjithë përmbajtja e kësaj faqeje mbrohet nga e drejta e autorit.
        Përdorimi, riprodhimi ose shpërndarja pa autorizim ndalohet rreptësisht pa
        leje paraprake me shkrim. Kjo përfshin tekstet, imazhet, logot, kodin dhe
        çdo vepër tjetër origjinale.
      `,
      liabilityTitle: 'Përgjegjësia',
      liabilityText: `
        Në asnjë rrethanë nuk do të mbaj përgjegjësi për dëme që lindin nga ose në
        lidhje me përdorimin e kësaj faqeje interneti, përveç rasteve të veprimit me
        dashje ose neglizhencës së rëndë. Kjo përfshin dëmet e drejtpërdrejta,
        të tërthorta, të rastësishme dhe pasuese.
      `,
      severabilityTitle: 'Klauzola e ndashmërisë',
      severabilityText: `
        Nëse ndonjë dispozitë e këtij Njoftimi ligjor shpallet e pavlefshme ose e
        pazbatueshme, dispozitat e tjera do të mbeten plotësisht në fuqi.
      `,
      noWarrantiesTitle: 'Pa garanci',
      noWarrantiesText: `
        Përmbajtja e kësaj faqeje ofrohet «siç është», pa garanci të asnjë lloji,
        qofshin të shprehura apo të nënkuptuara. Nuk bëj asnjë deklaratë për
        përshtatshmërinë, besueshmërinë ose disponueshmërinë e informacioneve dhe
        shërbimeve që përmban kjo faqe interneti.
      `,
      changesTitle: 'Ndryshime dhe rishikime',
      changesText: `
        E rezervoj të drejtën të ndryshoj ose heq përmbajtje nga kjo faqe interneti
        në çdo kohë pa njoftim paraprak. Përdoruesit këshillohen ta shqyrtojnë
        periodikisht këtë Njoftim ligjor për t'u informuar për përditësimet.
      `,
      governingLawTitle: 'Ligji i zbatueshëm',
      governingLawText: `
        Çdo mosmarrëveshje që lidhet me këtë faqe interneti do të rregullohet nga
        ligjet e zbatueshme të Zvicrës. Duke përdorur këtë faqe, ju pranoni që çdo
        çështje ligjore të trajtohet nga gjykatat kompetente zvicerane.
      `,
      contactTitle: 'Kontakti',
      contactText: `
        Për çdo pyetje në lidhje me këtë Njoftim ligjor, ju lutem më kontaktoni në
        <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a>.
      `
    },
    GSW: {
      title: 'IMPRESSUM',
      closeLabel: 'Impressum schliesse',
      ownerTitle: 'Inhaber vo de Website',
      ownerParagraph: `
        Firma: <strong>Rullani DataLab</strong><br/>
        Gründer und Inhaber: <strong>Leugzim Rullani</strong> (uf dere Website: Leo Rullani)<br/>
        UID: CHE-230.957.470<br/>
        E-Mail: <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a><br/>
        Tel.: <a href="tel:+41764885610" class="mail-link">+41 76 488 56 10</a><br/><br/>
        Standort: 5610 Wohlen AG, Schwiiz. Verantwortlich für alli veröffentlichte Inhalt.
      `,
      disclaimerTitle: 'Haftigsausschluss',
      disclaimerText: `
        Ich bemüehe mich, d Informatione uf dere Website aktuell z halte,
        übernäh aber kei Gwähr für ihri Richtigkeit oder Vollständigkeit.
        D Nutzig erfolgt uf eigets Risiko. Wenn Si die Siite wiiter nutzed,
        stimmed Si dem Haftigsausschluss vollumfänglich zue.
      `,
      externalLinksTitle: 'Externi Links',
      externalLinksText: `
        Die Website cha externi Links enthalte. Ich ha kei Iifluss uf d Inhalt
        oder Richtlinie vo dene verlinkte Siite und übernäh kei Haftig defür.
        S Ufrüefe vo externe Links erfolgt uf eigets Risiko.
      `,
      copyrightTitle: 'Urheberrächt',
      copyrightText: `
        Alli Inhalt uf dere Siite sind urheberrechtlich gschützt.
        E unautorisierti Nutzig, Vervielfältigung oder Wiiterverbreitig isch
        ohni vorgängigi schriftlichi Erlaubnis streng verbote. Das gilt für Text,
        Bilder, Logos, Code und alli andere eigene Werk.
      `,
      liabilityTitle: 'Haftig',
      liabilityText: `
        Ich hafte under keim Umstand für Schade, wo us oder im Zämehang mit de
        Nutzig vo dere Website entstönd, usser bi Vorsatz oder grober Fahrlässigkeit.
        Das umfasst direkti, indirekti, beiläufigi und Folgeschäde.
      `,
      severabilityTitle: 'Salvatorischi Klausle',
      severabilityText: `
        Falls einzelni Bestimmige vo dem Impressum unwirksam oder undurchführbar
        sind, blibed alli übrige Bestimmige unverändert gültig und wirksam.
      `,
      noWarrantiesTitle: 'Kei Garantie',
      noWarrantiesText: `
        D Inhalt vo dere Siite wärded «wie bseh» und ohni irgendeini usdrücklichi
        oder stillschwiigendi Garantie zur Verfüegig gstellt. Ich übernäh kei Gwähr
        für d Eignig, Zuverlässigkeit oder Verfüegbarkeit vo de Informatione und
        Dienstleistige uf dere Website.
      `,
      changesTitle: 'Änderige & Überarbeitige',
      changesText: `
        Ich bhalte mir s Rächt vor, Inhalt vo dere Website jederzeit und ohni
        vorgängigi Aakündigung z ändere oder z entferne. Nutzerinne und Nutzer
        sötted das Impressum regelmässig prüefe, zum über Aktualisierige informiert z bliibe.
      `,
      governingLawTitle: 'Aawändbars Rächt',
      governingLawText: `
        Für alli Streitige im Zämehang mit dere Website gilt s aawändbare Rächt
        vo de Schwiiz. Mit de Nutzig vo dere Siite stimmed Si zue, dass rechtlichi
        Aaglägeheite vor de zuständige Schwiizer Gricht behandelt wärded.
      `,
      contactTitle: 'Kontakt',
      contactText: `
        Bi Frage zu dem Impressum chönd Si mich unter
        <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a> kontaktiere.
      `
    },
    PT: {
      title: 'AVISO LEGAL',
      closeLabel: 'Fechar o aviso legal',
      ownerTitle: 'Titular do site',
      ownerParagraph: `
        Empresa: <strong>Rullani DataLab</strong><br/>
        Fundador e titular: <strong>Leugzim Rullani</strong> (neste site: Leo Rullani)<br/>
        UID: CHE-230.957.470<br/>
        E-mail: <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a><br/>
        Tel.: <a href="tel:+41764885610" class="mail-link">+41 76 488 56 10</a><br/><br/>
        Sede: 5610 Wohlen AG, Suíça. Responsável por todos os conteúdos publicados.
      `,
      disclaimerTitle: 'Exclusão de responsabilidade',
      disclaimerText: `
        Embora procure manter atualizadas as informações deste site, não garanto
        a sua exatidão nem integralidade. O acesso e a utilização são efetuados por
        sua conta e risco. Ao continuar a utilizar este site, aceita integralmente
        esta exclusão de responsabilidade.
      `,
      externalLinksTitle: 'Ligações externas',
      externalLinksText: `
        Este site pode conter ligações externas. Não tenho qualquer controlo sobre
        os conteúdos ou as políticas desses sites externos e não assumo qualquer
        responsabilidade pelos mesmos. A visita aos sites ligados é feita por sua conta e risco.
      `,
      copyrightTitle: 'Direitos de autor',
      copyrightText: `
        Todos os conteúdos deste site estão protegidos por direitos de autor.
        A utilização, reprodução ou distribuição não autorizadas são estritamente
        proibidas sem autorização prévia por escrito. Isto inclui textos, imagens,
        logótipos, código e quaisquer outras obras originais.
      `,
      liabilityTitle: 'Responsabilidade',
      liabilityText: `
        Em circunstância alguma serei responsável por danos decorrentes da utilização
        deste site ou com ela relacionados, exceto em casos de dolo ou negligência grave.
        Isto inclui danos diretos, indiretos, incidentais e consequenciais.
      `,
      severabilityTitle: 'Cláusula de separabilidade',
      severabilityText: `
        Se alguma disposição deste Aviso legal for considerada inválida ou inexequível,
        as restantes disposições permanecerão plenamente válidas e em vigor.
      `,
      noWarrantiesTitle: 'Ausência de garantias',
      noWarrantiesText: `
        O conteúdo deste site é disponibilizado «tal como está», sem garantias de
        qualquer tipo, expressas ou implícitas. Não faço qualquer declaração sobre
        a adequação, fiabilidade ou disponibilidade das informações e dos serviços
        contidos neste site.
      `,
      changesTitle: 'Alterações e revisões',
      changesText: `
        Reservo-me o direito de alterar ou remover conteúdos deste site a qualquer
        momento e sem aviso prévio. Recomenda-se que os utilizadores consultem
        periodicamente este Aviso legal para se manterem informados sobre atualizações.
      `,
      governingLawTitle: 'Legislação aplicável',
      governingLawText: `
        Quaisquer litígios relacionados com este site serão regidos pela legislação
        aplicável da Suíça. Ao utilizar este site, aceita que quaisquer questões
        jurídicas sejam tratadas pelos tribunais suíços competentes.
      `,
      contactTitle: 'Contacto',
      contactText: `
        Para qualquer questão relativa a este Aviso legal, contacte-me através de
        <a href="mailto:coding@leorullani.com" class="mail-link">coding@leorullani.com</a>.
      `
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
      c.offsetWidth;
      c.style.visibility = '';
      c.style.removeProperty('scroll-behavior');
    });
  }
}
