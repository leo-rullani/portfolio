import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { Language } from '../i18n/language';

interface CareerEntry {
  role: string;
  company: string;
  period: string;
}

interface CredentialEntry {
  title: string;
  institution: string;
  completed: string;
}

interface CareerCopy {
  eyebrow: string;
  title: string;
  intro: string;
  experienceTitle: string;
  credentialsTitle: string;
  experience: readonly [CareerEntry, CareerEntry, CareerEntry];
  credentials: readonly [CredentialEntry, CredentialEntry, CredentialEntry];
  businessEyebrow: string;
  businessRole: string;
  businessDescription: string;
  businessMeta: string;
  registryLabel: string;
  previewAlt: string;
  downloadLabel: string;
  downloadHint: string;
  nextAria: string;
}

@Component({
  selector: 'career-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-profile.component.html',
  styleUrls: ['./career-profile.component.scss']
})
export class CareerProfileComponent {
  @Input() activeLang: Language = 'EN';
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  readonly businessUrl = 'https://www.moneyhouse.ch/de/company/rullani-datalab-13037952311';
  readonly publicCvUrl = '/assets/documents/leo-rullani-public-cv.pdf';

  readonly copy: Record<Language, CareerCopy> = {
    EN: {
      eyebrow: 'Career profile',
      title: 'Data Scientist. Full-Stack Developer. Founder.',
      intro: 'I combine data, software engineering and live-TV graphics to turn complex information into dependable digital products and clear visual experiences.',
      experienceTitle: 'Recent experience',
      credentialsTitle: 'Degrees & certification',
      experience: [
        { role: 'Founder & Owner · Data Scientist & Software Engineer', company: 'Rullani DataLab', period: 'April 2026 – present' },
        { role: 'Project & Assortment Manager', company: 'MediaMarkt AG', period: 'March 2026 – present' },
        { role: 'Team Lead Graphics · Software Engineer', company: 'BBM Productions AG', period: 'May 2025 – April 2026' }
      ],
      credentials: [
        { title: 'MSc Data Science, IT & Technology', institution: 'IU Hochschule', completed: '2026' },
        { title: 'Certified Software Engineer · Full-Stack', institution: 'Developer Akademie', completed: '2026' },
        { title: 'BSc Business Economics · Sport Management', institution: 'University of Applied Sciences of the Grisons', completed: '2023' }
      ],
      businessEyebrow: 'Swiss sole proprietorship',
      businessRole: 'Founder & Owner',
      businessDescription: 'Data processing and analysis, development and support of digital applications, graphical visualisations and TV-graphics services with a focus on interface programming.',
      businessMeta: 'Active · Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'View company register entry',
      previewAlt: "Preview of Leo Rullani's public CV",
      downloadLabel: 'Download public CV',
      downloadHint: 'Privacy-safe PDF · German',
      nextAria: 'Continue to contact'
    },
    DE: {
      eyebrow: 'Karriereprofil',
      title: 'Data Scientist. Full-Stack-Developer. Gründer.',
      intro: 'Ich verbinde Daten, Softwareentwicklung und Live-TV-Grafik, um komplexe Informationen in zuverlässige digitale Produkte und klare visuelle Erlebnisse zu übersetzen.',
      experienceTitle: 'Aktuelle Berufserfahrung',
      credentialsTitle: 'Abschlüsse & Zertifizierung',
      experience: [
        { role: 'Gründer & Inhaber · Data Scientist & Software Engineer', company: 'Rullani DataLab', period: 'April 2026 – heute' },
        { role: 'Project & Assortment Manager', company: 'MediaMarkt AG', period: 'März 2026 – heute' },
        { role: 'Team Lead Graphics · Software Engineer', company: 'BBM Productions AG', period: 'Mai 2025 – April 2026' }
      ],
      credentials: [
        { title: 'MSc Data Science, IT & Technology', institution: 'IU Hochschule', completed: '2026' },
        { title: 'Zertifizierter Software Engineer · Full-Stack', institution: 'Developer Akademie', completed: '2026' },
        { title: 'BSc Betriebsökonomie · Sportmanagement', institution: 'Fachhochschule Graubünden', completed: '2023' }
      ],
      businessEyebrow: 'Schweizer Einzelunternehmen',
      businessRole: 'Gründer & Inhaber',
      businessDescription: 'Verarbeitung und Auswertung von Daten, Entwicklung und Betreuung digitaler Anwendungen, grafische Darstellungen und TV-Grafik-Dienstleistungen mit Fokus auf Schnittstellenprogrammierung.',
      businessMeta: 'Aktiv · Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Handelsregistereintrag ansehen',
      previewAlt: 'Vorschau des öffentlichen CV von Leo Rullani',
      downloadLabel: 'Öffentlichen CV herunterladen',
      downloadHint: 'Datenschutzbereinigtes PDF · Deutsch',
      nextAria: 'Weiter zum Kontakt'
    },
    IT: {
      eyebrow: 'Profilo professionale',
      title: 'Data Scientist. Full-Stack Developer. Fondatore.',
      intro: 'Unisco dati, sviluppo software e grafica per la TV in diretta per trasformare informazioni complesse in prodotti digitali affidabili ed esperienze visive chiare.',
      experienceTitle: 'Esperienza recente',
      credentialsTitle: 'Titoli & certificazione',
      experience: [
        { role: 'Fondatore e titolare · Data Scientist & Software Engineer', company: 'Rullani DataLab', period: 'Aprile 2026 – oggi' },
        { role: 'Project & Assortment Manager', company: 'MediaMarkt AG', period: 'Marzo 2026 – oggi' },
        { role: 'Team Lead Graphics · Software Engineer', company: 'BBM Productions AG', period: 'Maggio 2025 – aprile 2026' }
      ],
      credentials: [
        { title: 'MSc Data Science, IT & Technology', institution: 'IU Hochschule', completed: '2026' },
        { title: 'Software Engineer certificato · Full-Stack', institution: 'Developer Akademie', completed: '2026' },
        { title: 'BSc Economia aziendale · Sport Management', institution: 'SUP dei Grigioni', completed: '2023' }
      ],
      businessEyebrow: 'Ditta individuale svizzera',
      businessRole: 'Fondatore e titolare',
      businessDescription: 'Elaborazione e analisi dei dati, sviluppo e gestione di applicazioni digitali, visualizzazioni grafiche e servizi per la grafica TV con particolare attenzione alla programmazione di interfacce.',
      businessMeta: 'Attiva · Wohlen AG · IDI CHE-230.957.470',
      registryLabel: 'Vedi iscrizione nel registro',
      previewAlt: 'Anteprima del CV pubblico di Leo Rullani',
      downloadLabel: 'Scarica il CV pubblico',
      downloadHint: 'PDF senza dati privati · Tedesco',
      nextAria: 'Continua ai contatti'
    },
    FR: {
      eyebrow: 'Profil professionnel',
      title: 'Data Scientist. Développeur full-stack. Fondateur.',
      intro: 'Je relie données, développement logiciel et habillage graphique pour la télévision en direct afin de transformer des informations complexes en produits numériques fiables et en expériences visuelles claires.',
      experienceTitle: 'Expérience récente',
      credentialsTitle: 'Diplômes & certification',
      experience: [
        { role: 'Fondateur et propriétaire · Data Scientist & Software Engineer', company: 'Rullani DataLab', period: 'Avril 2026 – aujourd’hui' },
        { role: 'Project & Assortment Manager', company: 'MediaMarkt AG', period: 'Mars 2026 – aujourd’hui' },
        { role: 'Team Lead Graphics · Software Engineer', company: 'BBM Productions AG', period: 'Mai 2025 – avril 2026' }
      ],
      credentials: [
        { title: 'MSc Data Science, IT & Technology', institution: 'IU Hochschule', completed: '2026' },
        { title: 'Software Engineer certifié · Full-Stack', institution: 'Developer Akademie', completed: '2026' },
        { title: 'BSc Économie d’entreprise · Sport Management', institution: 'Haute école spécialisée des Grisons', completed: '2023' }
      ],
      businessEyebrow: 'Entreprise individuelle suisse',
      businessRole: 'Fondateur et propriétaire',
      businessDescription: 'Traitement et analyse de données, développement et suivi d’applications numériques, visualisations graphiques et services de graphisme TV, notamment la programmation d’interfaces.',
      businessMeta: 'Active · Wohlen AG · IDE CHE-230.957.470',
      registryLabel: 'Voir l’inscription au registre',
      previewAlt: 'Aperçu du CV public de Leo Rullani',
      downloadLabel: 'Télécharger le CV public',
      downloadHint: 'PDF sans données privées · Allemand',
      nextAria: 'Continuer vers le contact'
    },
    ES: {
      eyebrow: 'Perfil profesional',
      title: 'Data Scientist. Desarrollador full-stack. Fundador.',
      intro: 'Combino datos, desarrollo de software y gráficos para televisión en directo para convertir información compleja en productos digitales fiables y experiencias visuales claras.',
      experienceTitle: 'Experiencia reciente',
      credentialsTitle: 'Títulos & certificación',
      experience: [
        { role: 'Fundador y propietario · Data Scientist & Software Engineer', company: 'Rullani DataLab', period: 'Abril de 2026 – actualidad' },
        { role: 'Project & Assortment Manager', company: 'MediaMarkt AG', period: 'Marzo de 2026 – actualidad' },
        { role: 'Team Lead Graphics · Software Engineer', company: 'BBM Productions AG', period: 'Mayo de 2025 – abril de 2026' }
      ],
      credentials: [
        { title: 'MSc Data Science, IT & Technology', institution: 'IU Hochschule', completed: '2026' },
        { title: 'Software Engineer certificado · Full-Stack', institution: 'Developer Akademie', completed: '2026' },
        { title: 'BSc Economía empresarial · Sport Management', institution: 'Universidad de Ciencias Aplicadas de los Grisones', completed: '2023' }
      ],
      businessEyebrow: 'Empresa individual suiza',
      businessRole: 'Fundador y propietario',
      businessDescription: 'Procesamiento y análisis de datos, desarrollo y mantenimiento de aplicaciones digitales, visualizaciones gráficas y servicios de gráficos para TV, especialmente programación de interfaces.',
      businessMeta: 'Activa · Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Ver inscripción en el registro',
      previewAlt: 'Vista previa del CV público de Leo Rullani',
      downloadLabel: 'Descargar CV público',
      downloadHint: 'PDF sin datos privados · Alemán',
      nextAria: 'Continuar al contacto'
    },
    PT: {
      eyebrow: 'Perfil profissional',
      title: 'Data Scientist. Programador full-stack. Fundador.',
      intro: 'Combino dados, desenvolvimento de software e grafismo para televisão em direto para transformar informação complexa em produtos digitais fiáveis e experiências visuais claras.',
      experienceTitle: 'Experiência recente',
      credentialsTitle: 'Formação & certificação',
      experience: [
        { role: 'Fundador e proprietário · Data Scientist & Software Engineer', company: 'Rullani DataLab', period: 'Abril de 2026 – presente' },
        { role: 'Project & Assortment Manager', company: 'MediaMarkt AG', period: 'Março de 2026 – presente' },
        { role: 'Team Lead Graphics · Software Engineer', company: 'BBM Productions AG', period: 'Maio de 2025 – abril de 2026' }
      ],
      credentials: [
        { title: 'MSc Data Science, IT & Technology', institution: 'IU Hochschule', completed: '2026' },
        { title: 'Software Engineer certificado · Full-Stack', institution: 'Developer Akademie', completed: '2026' },
        { title: 'BSc Gestão empresarial · Sport Management', institution: 'Universidade de Ciências Aplicadas dos Grisões', completed: '2023' }
      ],
      businessEyebrow: 'Empresa individual suíça',
      businessRole: 'Fundador e proprietário',
      businessDescription: 'Processamento e análise de dados, desenvolvimento e acompanhamento de aplicações digitais, visualizações gráficas e serviços de grafismo para TV, com especialização em programação de interfaces.',
      businessMeta: 'Ativa · Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Ver registo da empresa',
      previewAlt: 'Pré-visualização do CV público de Leo Rullani',
      downloadLabel: 'Descarregar CV público',
      downloadHint: 'PDF sem dados privados · Alemão',
      nextAria: 'Continuar para o contacto'
    },
    SQ: {
      eyebrow: 'Profili profesional',
      title: 'Data Scientist. Zhvillues full-stack. Themelues.',
      intro: 'Ndërthur të dhënat, zhvillimin e softuerit dhe grafikën për transmetime televizive live, duke i kthyer informacionet komplekse në produkte digjitale të besueshme dhe përvoja vizuale të qarta.',
      experienceTitle: 'Përvoja e fundit',
      credentialsTitle: 'Diploma & certifikim',
      experience: [
        { role: 'Themelues dhe pronar · Data Scientist & Software Engineer', company: 'Rullani DataLab', period: 'Prill 2026 – sot' },
        { role: 'Project & Assortment Manager', company: 'MediaMarkt AG', period: 'Mars 2026 – sot' },
        { role: 'Team Lead Graphics · Software Engineer', company: 'BBM Productions AG', period: 'Maj 2025 – prill 2026' }
      ],
      credentials: [
        { title: 'MSc Data Science, IT & Technology', institution: 'IU Hochschule', completed: '2026' },
        { title: 'Software Engineer i certifikuar · Full-Stack', institution: 'Developer Akademie', completed: '2026' },
        { title: 'BSc Ekonomi biznesi · Sport Management', institution: 'Universiteti i Shkencave të Aplikuara i Graubünden', completed: '2023' }
      ],
      businessEyebrow: 'Ndërmarrje individuale zvicerane',
      businessRole: 'Themelues dhe pronar',
      businessDescription: 'Përpunim dhe analizë të dhënash, zhvillim dhe mirëmbajtje aplikacionesh digjitale, vizualizime grafike dhe shërbime grafike për TV, veçanërisht programim ndërfaqesh.',
      businessMeta: 'Aktive · Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Shiko regjistrimin e kompanisë',
      previewAlt: 'Pamje paraprake e CV-së publike të Leo Rullanit',
      downloadLabel: 'Shkarko CV-në publike',
      downloadHint: 'PDF pa të dhëna private · Gjermanisht',
      nextAria: 'Vazhdo te kontakti'
    },
    GSW: {
      eyebrow: 'Profil & Laufbahn',
      title: 'Data Scientist. Full-Stack-Developer. Gründer.',
      intro: 'Ich verbinde Date, Softwareentwicklig und Live-TV-Grafik und mach us komplexe Informatione verlässlichi digitali Produkt und klari visuelle Erlebnis.',
      experienceTitle: 'Aktuelli Bruefserfahrig',
      credentialsTitle: 'Abschlüss & Zertifikat',
      experience: [
        { role: 'Gründer & Inhaber · Data Scientist & Software Engineer', company: 'Rullani DataLab', period: 'April 2026 – hüt' },
        { role: 'Project & Assortment Manager', company: 'MediaMarkt AG', period: 'März 2026 – hüt' },
        { role: 'Team Lead Graphics · Software Engineer', company: 'BBM Productions AG', period: 'Mai 2025 – April 2026' }
      ],
      credentials: [
        { title: 'MSc Data Science, IT & Technology', institution: 'IU Hochschule', completed: '2026' },
        { title: 'Zertifizierte Software Engineer · Full-Stack', institution: 'Developer Akademie', completed: '2026' },
        { title: 'BSc Betriebsökonomie · Sportmanagement', institution: 'Fachhochschule Graubünden', completed: '2023' }
      ],
      businessEyebrow: 'Schwiizer Einzelunternehme',
      businessRole: 'Gründer & Inhaber',
      businessDescription: 'Verarbeitig und Uswärtig vo Date, Entwicklig und Betreuig vo digitale Awändige, grafischi Darstellige und TV-Grafik-Dienstleistige mit Fokus uf Schnittstelleprogrammierig.',
      businessMeta: 'Aktiv · Wohle AG · UID CHE-230.957.470',
      registryLabel: 'Handelsregister-Iitrag aluege',
      previewAlt: 'Vorschau vom öffentliche CV vom Leo Rullani',
      downloadLabel: 'Öffentliche CV abelade',
      downloadHint: 'Datenschutzbereinigts PDF · Hochdütsch',
      nextAria: 'Wiiter zum Kontakt'
    }
  };

  scrollNext(): void {
    if (!this.scrollEl?.nativeElement) return;
    this.scrollEl.nativeElement.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  }
}
