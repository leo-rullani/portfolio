import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { Language } from '../i18n/language';

type CareerSectionId = 'work' | 'projects' | 'education' | 'certificates';

interface CareerEntry {
  title: string;
  organisation: string;
  meta: string;
  description: string;
  tags: readonly string[];
}

interface CareerSectionCopy {
  label: string;
  items: readonly CareerEntry[];
}

interface CareerCopy {
  eyebrow: string;
  title: string;
  intro: string;
  tabListLabel: string;
  sections: Record<CareerSectionId, CareerSectionCopy>;
  expandSection: (section: string) => string;
  collapseSection: (section: string) => string;
  businessEyebrow: string;
  businessRole: string;
  businessDescription: string;
  businessMeta: string;
  registryLabel: string;
  newTabLabel: string;
  previewAlt: string;
  openPreviewLabel: string;
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
  @ViewChildren('careerTab') private careerTabs!: QueryList<ElementRef<HTMLButtonElement>>;

  readonly businessUrl = 'https://www.moneyhouse.ch/de/company/rullani-datalab-13037952311';
  readonly publicDossierUrl = '/assets/documents/leo-rullani-public-application-dossier.pdf';
  readonly sectionIds: readonly CareerSectionId[] = ['work', 'projects', 'education', 'certificates'];

  activeSection: CareerSectionId = 'work';
  mobileExpandedSection: CareerSectionId | null = 'work';

  readonly copy: Record<Language, CareerCopy> = {
    EN: {
      eyebrow: 'Curriculum vitae',
      title: 'Data Scientist · Full-Stack Engineer',
      intro: 'A compact view of my professional experience, selected software and broadcast projects, education and certification.',
      tabListLabel: 'CV categories',
      expandSection: section => `Expand ${section}`,
      collapseSection: section => `Collapse ${section}`,
      sections: {
        work: {
          label: 'Work',
          items: [
            { title: 'Project & Assortment Manager', organisation: 'MediaMarkt AG', meta: 'March 2026 – present', description: 'Project and assortment management in the retail environment.', tags: ['Projects', 'Assortment'] },
            { title: 'Founder & Owner · Data Scientist · Full-Stack Engineer', organisation: 'Rullani DataLab', meta: 'April 2026 – present', description: 'Data analysis, digital applications, visualisations and interface programming.', tags: ['Data', 'Software'] },
            { title: 'Team Lead Graphics · Software Engineer', organisation: 'BBM Productions AG', meta: 'May 2025 – April 2026', description: 'Led graphics operations and developed data-driven systems for live sports broadcasting.', tags: ['Live TV', 'Data feeds'] },
            { title: 'TV Graphics Coordinator', organisation: 'NEP Switzerland AG', meta: 'September 2023 – June 2024', description: 'Coordinated TV graphics in a live-production environment.', tags: ['Broadcast', 'Graphics'] }
          ]
        },
        projects: {
          label: 'Projects',
          items: [
            { title: 'SFL live-TV data graphics', organisation: 'BBM Productions AG · Swiss Football League', meta: 'Live broadcast', description: 'Integrated Stats Perform and Opta feeds for statistics, heatmaps, attacking zones, penalty graphics and automated live workflows.', tags: ['Opta', 'Interfaces', 'TV graphics'] },
            { title: 'Collectrra', organisation: 'Full-stack collecting platform', meta: 'Selected portfolio project', description: 'A social trading-card platform with collections, albums, trades, marketplace and privacy-aware discovery.', tags: ['JavaScript', 'Django', 'PostgreSQL'] },
            { title: 'VideoFlix', organisation: 'Video streaming platform', meta: 'Selected portfolio project', description: 'A decoupled streaming application with secure authentication, FFmpeg processing and adaptive HLS delivery.', tags: ['Django', 'Redis', 'FFmpeg'] },
            { title: 'Quizly', organisation: 'AI-assisted learning platform', meta: 'Selected portfolio project', description: 'Turns YouTube videos into interactive quizzes using transcription and AI-assisted question generation.', tags: ['Whisper', 'Gemini', 'DRF'] }
          ]
        },
        education: {
          label: 'Education',
          items: [
            { title: 'MSc Data Science, IT & Technology', organisation: 'IU Hochschule', meta: 'November 2023 – January 2026 · Grade 5.3', description: 'Master’s degree focused on data science, information technology and technology management.', tags: ['MSc', 'Data Science'] },
            { title: 'BSc Business Economics · Sport Management', organisation: 'Fachhochschule Graubünden', meta: 'September 2019 – September 2023 · Grade 4.6', description: 'Bachelor’s degree in business economics with a major in sport management.', tags: ['BSc', 'Business'] },
            { title: 'Vocational baccalaureate · Health & Social Affairs', organisation: 'Minerva Schulen', meta: 'August 2018 – August 2019 · Grade 4.9', description: 'Swiss vocational baccalaureate with a focus on health and social affairs.', tags: ['Baccalaureate'] },
            { title: 'Commercial employee EFZ', organisation: 'KV Business School', meta: 'August 2012 – August 2015 · Grade 4.2', description: 'Federal VET diploma in commercial business administration.', tags: ['EFZ'] }
          ]
        },
        certificates: {
          label: 'Certificates',
          items: [
            { title: 'Software Engineer, Front- & Backend (Fullstack)', organisation: 'Developer Akademie', meta: 'April 2024 – January 2026', description: 'Completed a 13-module software engineering programme with four capstone projects across frontend and backend development.', tags: ['Angular', 'TypeScript', 'Python', 'Django', 'SQL', 'Docker'] }
          ]
        }
      },
      businessEyebrow: 'Swiss sole proprietorship',
      businessRole: 'Founder & Owner',
      businessDescription: 'Data processing and analysis, digital applications, graphical visualisations and TV-graphics services with a focus on interface programming.',
      businessMeta: 'Active · 5610 Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'View company register entry',
      newTabLabel: 'opens in a new tab',
      previewAlt: "Preview of Leo Rullani's public application dossier",
      openPreviewLabel: 'Open public application dossier in a new tab',
      downloadLabel: 'Download application dossier',
      downloadHint: 'Privacy-safe public PDF · CV · Education records · Employment references',
      nextAria: 'Continue to contact'
    },
    DE: {
      eyebrow: 'Lebenslauf',
      title: 'Data Scientist · Full-Stack Engineer',
      intro: 'Ein kompakter Überblick über meine Berufserfahrung, ausgewählte Software- und Broadcast-Projekte, Ausbildung und Zertifizierung.',
      tabListLabel: 'CV-Kategorien',
      expandSection: section => `${section} aufklappen`,
      collapseSection: section => `${section} zuklappen`,
      sections: {
        work: {
          label: 'Arbeit',
          items: [
            { title: 'Project & Assortment Manager', organisation: 'MediaMarkt AG', meta: 'März 2026 – heute', description: 'Projekt- und Sortimentsmanagement im Handelsumfeld.', tags: ['Projekte', 'Sortiment'] },
            { title: 'Gründer & Inhaber · Data Scientist · Full-Stack Engineer', organisation: 'Rullani DataLab', meta: 'April 2026 – heute', description: 'Datenanalyse, digitale Anwendungen, Visualisierungen und Schnittstellenprogrammierung.', tags: ['Daten', 'Software'] },
            { title: 'Team Lead Graphics · Software Engineer', organisation: 'BBM Productions AG', meta: 'Mai 2025 – April 2026', description: 'Leitung der Grafikoperation und Entwicklung datengetriebener Systeme für Live-Sportübertragungen.', tags: ['Live-TV', 'Datenfeeds'] },
            { title: 'TV-Grafik-Koordinator', organisation: 'NEP Switzerland AG', meta: 'September 2023 – Juni 2024', description: 'Koordination der TV-Grafik in einem Live-Produktionsumfeld.', tags: ['Broadcast', 'Grafik'] }
          ]
        },
        projects: {
          label: 'Projekte',
          items: [
            { title: 'SFL Live-TV-Datengrafiken', organisation: 'BBM Productions AG · Swiss Football League', meta: 'Live-Broadcast', description: 'Integration von Stats-Perform- und Opta-Feeds für Statistiken, Heatmaps, Attacking Zones, Penalty-Grafiken und automatisierte Live-Workflows.', tags: ['Opta', 'Schnittstellen', 'TV-Grafik'] },
            { title: 'Collectrra', organisation: 'Full-Stack-Sammelplattform', meta: 'Ausgewähltes Portfolio-Projekt', description: 'Eine soziale Trading-Card-Plattform mit Sammlungen, Alben, Tausch, Marktplatz und datenschutzbewusster Umgebungssuche.', tags: ['JavaScript', 'Django', 'PostgreSQL'] },
            { title: 'VideoFlix', organisation: 'Video-Streaming-Plattform', meta: 'Ausgewähltes Portfolio-Projekt', description: 'Eine getrennte Streaming-Anwendung mit sicherer Authentifizierung, FFmpeg-Verarbeitung und adaptiver HLS-Auslieferung.', tags: ['Django', 'Redis', 'FFmpeg'] },
            { title: 'Quizly', organisation: 'KI-gestützte Lernplattform', meta: 'Ausgewähltes Portfolio-Projekt', description: 'Verwandelt YouTube-Videos durch Transkription und KI-gestützte Fragengenerierung in interaktive Quizze.', tags: ['Whisper', 'Gemini', 'DRF'] }
          ]
        },
        education: {
          label: 'Ausbildung',
          items: [
            { title: 'MSc Data Science, IT & Technology', organisation: 'IU Hochschule', meta: 'November 2023 – Januar 2026 · Abschlussnote 5.3', description: 'Masterstudium mit Schwerpunkt Data Science, Informationstechnologie und Technologiemanagement.', tags: ['MSc', 'Data Science'] },
            { title: 'BSc Betriebsökonomie · Sportmanagement', organisation: 'Fachhochschule Graubünden', meta: 'September 2019 – September 2023 · Abschlussnote 4.6', description: 'Bachelorstudium in Betriebsökonomie mit Vertiefung Sportmanagement.', tags: ['BSc', 'Betriebsökonomie'] },
            { title: 'Berufsmaturität · Gesundheit & Soziales', organisation: 'Minerva Schulen', meta: 'August 2018 – August 2019 · Abschlussnote 4.9', description: 'Schweizer Berufsmaturität mit Vertiefung Gesundheit und Soziales.', tags: ['Berufsmaturität'] },
            { title: 'Kaufmann EFZ', organisation: 'KV Business School', meta: 'August 2012 – August 2015 · Abschlussnote 4.2', description: 'Eidgenössisches Fähigkeitszeugnis im kaufmännischen Bereich.', tags: ['EFZ'] }
          ]
        },
        certificates: {
          label: 'Zertifikate',
          items: [
            { title: 'Software Engineer, Front- & Backend (Fullstack)', organisation: 'Developer Akademie', meta: 'April 2024 – Januar 2026', description: 'Abschluss eines Software-Engineering-Programms mit 13 Modulen und vier Capstone-Projekten in Frontend- und Backend-Entwicklung.', tags: ['Angular', 'TypeScript', 'Python', 'Django', 'SQL', 'Docker'] }
          ]
        }
      },
      businessEyebrow: 'Schweizer Einzelunternehmen',
      businessRole: 'Gründer & Inhaber',
      businessDescription: 'Datenverarbeitung und -auswertung, digitale Anwendungen, grafische Visualisierungen und TV-Grafik-Dienstleistungen mit Fokus auf Schnittstellenprogrammierung.',
      businessMeta: 'Aktiv · 5610 Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Handelsregistereintrag ansehen',
      newTabLabel: 'öffnet in einem neuen Tab',
      previewAlt: 'Vorschau des öffentlichen Bewerbungsdossiers von Leo Rullani',
      openPreviewLabel: 'Öffentliches Bewerbungsdossier in einem neuen Tab öffnen',
      downloadLabel: 'Bewerbungsdossier herunterladen',
      downloadHint: 'Öffentliche, datenschutzbereinigte PDF-Version · CV · Ausbildungsnachweise · Arbeitszeugnisse',
      nextAria: 'Weiter zum Kontakt'
    },
    IT: {
      eyebrow: 'Curriculum vitae',
      title: 'Data Scientist · Full-Stack Engineer',
      intro: 'Una panoramica compatta della mia esperienza professionale, dei progetti software e broadcast selezionati, della formazione e della certificazione.',
      tabListLabel: 'Categorie del CV',
      expandSection: section => `Espandi ${section}`,
      collapseSection: section => `Comprimi ${section}`,
      sections: {
        work: {
          label: 'Lavoro',
          items: [
            { title: 'Project & Assortment Manager', organisation: 'MediaMarkt AG', meta: 'Marzo 2026 – oggi', description: 'Gestione di progetti e assortimenti nel settore retail.', tags: ['Progetti', 'Assortimento'] },
            { title: 'Fondatore e titolare · Data Scientist · Full-Stack Engineer', organisation: 'Rullani DataLab', meta: 'Aprile 2026 – oggi', description: 'Analisi dei dati, applicazioni digitali, visualizzazioni e programmazione di interfacce.', tags: ['Dati', 'Software'] },
            { title: 'Team Lead Graphics · Software Engineer', organisation: 'BBM Productions AG', meta: 'Maggio 2025 – aprile 2026', description: 'Direzione delle operazioni grafiche e sviluppo di sistemi data-driven per trasmissioni sportive in diretta.', tags: ['TV live', 'Feed dati'] },
            { title: 'Coordinatore grafica TV', organisation: 'NEP Switzerland AG', meta: 'Settembre 2023 – giugno 2024', description: 'Coordinamento della grafica TV in un ambiente di produzione live.', tags: ['Broadcast', 'Grafica'] }
          ]
        },
        projects: {
          label: 'Progetti',
          items: [
            { title: 'Grafiche dati SFL per la TV live', organisation: 'BBM Productions AG · Swiss Football League', meta: 'Trasmissione live', description: 'Integrazione di feed Stats Perform e Opta per statistiche, heatmap, attacking zones, grafiche sui rigori e workflow live automatizzati.', tags: ['Opta', 'Interfacce', 'Grafica TV'] },
            { title: 'Collectrra', organisation: 'Piattaforma full-stack per collezionisti', meta: 'Progetto portfolio selezionato', description: 'Piattaforma social per carte collezionabili con collezioni, album, scambi, marketplace e ricerca attenta alla privacy.', tags: ['JavaScript', 'Django', 'PostgreSQL'] },
            { title: 'VideoFlix', organisation: 'Piattaforma di video streaming', meta: 'Progetto portfolio selezionato', description: 'Applicazione di streaming disaccoppiata con autenticazione sicura, elaborazione FFmpeg e distribuzione HLS adattiva.', tags: ['Django', 'Redis', 'FFmpeg'] },
            { title: 'Quizly', organisation: 'Piattaforma didattica assistita dall’IA', meta: 'Progetto portfolio selezionato', description: 'Trasforma video YouTube in quiz interattivi tramite trascrizione e generazione di domande assistita dall’IA.', tags: ['Whisper', 'Gemini', 'DRF'] }
          ]
        },
        education: {
          label: 'Formazione',
          items: [
            { title: 'MSc Data Science, IT & Technology', organisation: 'IU Hochschule', meta: 'Novembre 2023 – gennaio 2026 · Voto 5.3', description: 'Master incentrato su data science, tecnologia dell’informazione e gestione tecnologica.', tags: ['MSc', 'Data Science'] },
            { title: 'BSc Economia aziendale · Sport Management', organisation: 'Fachhochschule Graubünden', meta: 'Settembre 2019 – settembre 2023 · Voto 4.6', description: 'Bachelor in economia aziendale con specializzazione in sport management.', tags: ['BSc', 'Economia'] },
            { title: 'Maturità professionale · Salute e sociale', organisation: 'Minerva Schulen', meta: 'Agosto 2018 – agosto 2019 · Voto 4.9', description: 'Maturità professionale svizzera con indirizzo salute e sociale.', tags: ['Maturità'] },
            { title: 'Impiegato di commercio AFC', organisation: 'KV Business School', meta: 'Agosto 2012 – agosto 2015 · Voto 4.2', description: 'Attestato federale di capacità in ambito commerciale.', tags: ['AFC'] }
          ]
        },
        certificates: {
          label: 'Certificati',
          items: [
            { title: 'Software Engineer, Front- & Backend (Fullstack)', organisation: 'Developer Akademie', meta: 'Aprile 2024 – gennaio 2026', description: 'Programma di software engineering di 13 moduli con quattro progetti capstone nello sviluppo frontend e backend.', tags: ['Angular', 'TypeScript', 'Python', 'Django', 'SQL', 'Docker'] }
          ]
        }
      },
      businessEyebrow: 'Ditta individuale svizzera',
      businessRole: 'Fondatore e titolare',
      businessDescription: 'Elaborazione e analisi dei dati, applicazioni digitali, visualizzazioni grafiche e servizi di grafica TV con focus sulla programmazione di interfacce.',
      businessMeta: 'Attiva · 5610 Wohlen AG · IDI CHE-230.957.470',
      registryLabel: 'Vedi iscrizione nel registro',
      newTabLabel: 'si apre in una nuova scheda',
      previewAlt: 'Anteprima del dossier di candidatura pubblico di Leo Rullani',
      openPreviewLabel: 'Apri il dossier di candidatura pubblico in una nuova scheda',
      downloadLabel: 'Scarica il dossier di candidatura',
      downloadHint: 'Versione PDF pubblica senza dati privati · CV · attestati di formazione · certificati di lavoro',
      nextAria: 'Continua ai contatti'
    },
    FR: {
      eyebrow: 'Curriculum vitae',
      title: 'Data Scientist · Full-Stack Engineer',
      intro: 'Un aperçu compact de mon expérience professionnelle, de projets logiciels et broadcast sélectionnés, de ma formation et de ma certification.',
      tabListLabel: 'Catégories du CV',
      expandSection: section => `Développer ${section}`,
      collapseSection: section => `Réduire ${section}`,
      sections: {
        work: {
          label: 'Travail',
          items: [
            { title: 'Project & Assortment Manager', organisation: 'MediaMarkt AG', meta: 'Mars 2026 – aujourd’hui', description: 'Gestion de projets et d’assortiments dans le commerce de détail.', tags: ['Projets', 'Assortiment'] },
            { title: 'Fondateur et propriétaire · Data Scientist · Full-Stack Engineer', organisation: 'Rullani DataLab', meta: 'Avril 2026 – aujourd’hui', description: 'Analyse de données, applications numériques, visualisations et programmation d’interfaces.', tags: ['Données', 'Logiciel'] },
            { title: 'Team Lead Graphics · Software Engineer', organisation: 'BBM Productions AG', meta: 'Mai 2025 – avril 2026', description: 'Direction des opérations graphiques et développement de systèmes data-driven pour le sport en direct.', tags: ['TV en direct', 'Flux de données'] },
            { title: 'Coordinateur graphisme TV', organisation: 'NEP Switzerland AG', meta: 'Septembre 2023 – juin 2024', description: 'Coordination du graphisme TV dans un environnement de production en direct.', tags: ['Broadcast', 'Graphisme'] }
          ]
        },
        projects: {
          label: 'Projets',
          items: [
            { title: 'Graphiques de données SFL pour la TV en direct', organisation: 'BBM Productions AG · Swiss Football League', meta: 'Diffusion en direct', description: 'Intégration des flux Stats Perform et Opta pour statistiques, heatmaps, attacking zones, graphiques de penalties et workflows automatisés.', tags: ['Opta', 'Interfaces', 'Graphisme TV'] },
            { title: 'Collectrra', organisation: 'Plateforme full-stack pour collectionneurs', meta: 'Projet de portfolio sélectionné', description: 'Plateforme sociale de cartes à collectionner avec collections, albums, échanges, marketplace et recherche respectueuse de la vie privée.', tags: ['JavaScript', 'Django', 'PostgreSQL'] },
            { title: 'VideoFlix', organisation: 'Plateforme de streaming vidéo', meta: 'Projet de portfolio sélectionné', description: 'Application de streaming découplée avec authentification sécurisée, traitement FFmpeg et diffusion HLS adaptative.', tags: ['Django', 'Redis', 'FFmpeg'] },
            { title: 'Quizly', organisation: 'Plateforme d’apprentissage assistée par IA', meta: 'Projet de portfolio sélectionné', description: 'Transforme des vidéos YouTube en quiz interactifs par transcription et génération de questions assistée par IA.', tags: ['Whisper', 'Gemini', 'DRF'] }
          ]
        },
        education: {
          label: 'Formation',
          items: [
            { title: 'MSc Data Science, IT & Technology', organisation: 'IU Hochschule', meta: 'Novembre 2023 – janvier 2026 · Note 5.3', description: 'Master axé sur la data science, les technologies de l’information et la gestion technologique.', tags: ['MSc', 'Data Science'] },
            { title: 'BSc Économie d’entreprise · Sport Management', organisation: 'Fachhochschule Graubünden', meta: 'Septembre 2019 – septembre 2023 · Note 4.6', description: 'Bachelor en économie d’entreprise avec spécialisation en management du sport.', tags: ['BSc', 'Économie'] },
            { title: 'Maturité professionnelle · Santé et social', organisation: 'Minerva Schulen', meta: 'Août 2018 – août 2019 · Note 4.9', description: 'Maturité professionnelle suisse avec orientation santé et social.', tags: ['Maturité'] },
            { title: 'Employé de commerce CFC', organisation: 'KV Business School', meta: 'Août 2012 – août 2015 · Note 4.2', description: 'Certificat fédéral de capacité dans le domaine commercial.', tags: ['CFC'] }
          ]
        },
        certificates: {
          label: 'Certificats',
          items: [
            { title: 'Software Engineer, Front- & Backend (Fullstack)', organisation: 'Developer Akademie', meta: 'Avril 2024 – janvier 2026', description: 'Programme de software engineering en 13 modules avec quatre projets capstone en développement frontend et backend.', tags: ['Angular', 'TypeScript', 'Python', 'Django', 'SQL', 'Docker'] }
          ]
        }
      },
      businessEyebrow: 'Entreprise individuelle suisse',
      businessRole: 'Fondateur et propriétaire',
      businessDescription: 'Traitement et analyse de données, applications numériques, visualisations graphiques et services de graphisme TV axés sur la programmation d’interfaces.',
      businessMeta: 'Active · 5610 Wohlen AG · IDE CHE-230.957.470',
      registryLabel: 'Voir l’inscription au registre',
      newTabLabel: 's’ouvre dans un nouvel onglet',
      previewAlt: 'Aperçu du dossier de candidature public de Leo Rullani',
      openPreviewLabel: 'Ouvrir le dossier de candidature public dans un nouvel onglet',
      downloadLabel: 'Télécharger le dossier de candidature',
      downloadHint: 'Version PDF publique sans données privées · CV · justificatifs de formation · certificats de travail',
      nextAria: 'Continuer vers le contact'
    },
    ES: {
      eyebrow: 'Currículum',
      title: 'Data Scientist · Full-Stack Engineer',
      intro: 'Una visión compacta de mi experiencia profesional, proyectos seleccionados de software y broadcast, formación y certificación.',
      tabListLabel: 'Categorías del CV',
      expandSection: section => `Expandir ${section}`,
      collapseSection: section => `Contraer ${section}`,
      sections: {
        work: {
          label: 'Trabajo',
          items: [
            { title: 'Project & Assortment Manager', organisation: 'MediaMarkt AG', meta: 'Marzo de 2026 – actualidad', description: 'Gestión de proyectos y surtido en el entorno minorista.', tags: ['Proyectos', 'Surtido'] },
            { title: 'Fundador y propietario · Data Scientist · Full-Stack Engineer', organisation: 'Rullani DataLab', meta: 'Abril de 2026 – actualidad', description: 'Análisis de datos, aplicaciones digitales, visualizaciones y programación de interfaces.', tags: ['Datos', 'Software'] },
            { title: 'Team Lead Graphics · Software Engineer', organisation: 'BBM Productions AG', meta: 'Mayo de 2025 – abril de 2026', description: 'Dirección de operaciones gráficas y desarrollo de sistemas data-driven para retransmisiones deportivas en directo.', tags: ['TV en directo', 'Fuentes de datos'] },
            { title: 'Coordinador de gráficos de TV', organisation: 'NEP Switzerland AG', meta: 'Septiembre de 2023 – junio de 2024', description: 'Coordinación de gráficos de TV en un entorno de producción en directo.', tags: ['Broadcast', 'Gráficos'] }
          ]
        },
        projects: {
          label: 'Proyectos',
          items: [
            { title: 'Gráficos de datos SFL para TV en directo', organisation: 'BBM Productions AG · Swiss Football League', meta: 'Emisión en directo', description: 'Integración de feeds de Stats Perform y Opta para estadísticas, mapas de calor, attacking zones, gráficos de penaltis y flujos automatizados.', tags: ['Opta', 'Interfaces', 'Gráficos TV'] },
            { title: 'Collectrra', organisation: 'Plataforma full-stack para coleccionistas', meta: 'Proyecto seleccionado del portfolio', description: 'Plataforma social de cartas coleccionables con colecciones, álbumes, intercambios, marketplace y búsqueda respetuosa con la privacidad.', tags: ['JavaScript', 'Django', 'PostgreSQL'] },
            { title: 'VideoFlix', organisation: 'Plataforma de streaming de vídeo', meta: 'Proyecto seleccionado del portfolio', description: 'Aplicación de streaming desacoplada con autenticación segura, procesamiento FFmpeg y entrega HLS adaptativa.', tags: ['Django', 'Redis', 'FFmpeg'] },
            { title: 'Quizly', organisation: 'Plataforma de aprendizaje asistida por IA', meta: 'Proyecto seleccionado del portfolio', description: 'Convierte vídeos de YouTube en cuestionarios interactivos mediante transcripción y generación de preguntas asistida por IA.', tags: ['Whisper', 'Gemini', 'DRF'] }
          ]
        },
        education: {
          label: 'Formación',
          items: [
            { title: 'MSc Data Science, IT & Technology', organisation: 'IU Hochschule', meta: 'Noviembre de 2023 – enero de 2026 · Nota 5.3', description: 'Máster centrado en ciencia de datos, tecnología de la información y gestión tecnológica.', tags: ['MSc', 'Data Science'] },
            { title: 'BSc Economía empresarial · Sport Management', organisation: 'Fachhochschule Graubünden', meta: 'Septiembre de 2019 – septiembre de 2023 · Nota 4.6', description: 'Grado en economía empresarial con especialización en gestión deportiva.', tags: ['BSc', 'Economía'] },
            { title: 'Bachillerato profesional · Salud y asuntos sociales', organisation: 'Minerva Schulen', meta: 'Agosto de 2018 – agosto de 2019 · Nota 4.9', description: 'Bachillerato profesional suizo con orientación en salud y asuntos sociales.', tags: ['Bachillerato'] },
            { title: 'Empleado de comercio EFZ', organisation: 'KV Business School', meta: 'Agosto de 2012 – agosto de 2015 · Nota 4.2', description: 'Certificado federal de formación profesional en administración comercial.', tags: ['EFZ'] }
          ]
        },
        certificates: {
          label: 'Certificados',
          items: [
            { title: 'Software Engineer, Front- & Backend (Fullstack)', organisation: 'Developer Akademie', meta: 'Abril de 2024 – enero de 2026', description: 'Programa de software engineering de 13 módulos con cuatro proyectos capstone de desarrollo frontend y backend.', tags: ['Angular', 'TypeScript', 'Python', 'Django', 'SQL', 'Docker'] }
          ]
        }
      },
      businessEyebrow: 'Empresa individual suiza',
      businessRole: 'Fundador y propietario',
      businessDescription: 'Procesamiento y análisis de datos, aplicaciones digitales, visualizaciones gráficas y servicios de gráficos para TV centrados en programación de interfaces.',
      businessMeta: 'Activa · 5610 Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Ver inscripción en el registro',
      newTabLabel: 'se abre en una pestaña nueva',
      previewAlt: 'Vista previa del dossier público de candidatura de Leo Rullani',
      openPreviewLabel: 'Abrir el dossier público de candidatura en una pestaña nueva',
      downloadLabel: 'Descargar dossier de candidatura',
      downloadHint: 'Versión PDF pública sin datos privados · CV · comprobantes de formación · certificados laborales',
      nextAria: 'Continuar al contacto'
    },
    SQ: {
      eyebrow: 'Curriculum vitae',
      title: 'Data Scientist · Full-Stack Engineer',
      intro: 'Një pasqyrë e përmbledhur e përvojës sime profesionale, projekteve të përzgjedhura software dhe broadcast, arsimimit dhe certifikimit.',
      tabListLabel: 'Kategoritë e CV-së',
      expandSection: section => `Hap ${section}`,
      collapseSection: section => `Mbyll ${section}`,
      sections: {
        work: {
          label: 'Puna',
          items: [
            { title: 'Project & Assortment Manager', organisation: 'MediaMarkt AG', meta: 'Mars 2026 – sot', description: 'Menaxhim projektesh dhe asortimenti në mjedisin e shitjes me pakicë.', tags: ['Projekte', 'Asortiment'] },
            { title: 'Themelues dhe pronar · Data Scientist · Full-Stack Engineer', organisation: 'Rullani DataLab', meta: 'Prill 2026 – sot', description: 'Analizë të dhënash, aplikacione digjitale, vizualizime dhe programim ndërfaqesh.', tags: ['Të dhëna', 'Software'] },
            { title: 'Team Lead Graphics · Software Engineer', organisation: 'BBM Productions AG', meta: 'Maj 2025 – prill 2026', description: 'Drejtim i operacioneve grafike dhe zhvillim sistemesh data-driven për transmetime sportive live.', tags: ['TV live', 'Burime të dhënash'] },
            { title: 'Koordinator i grafikës televizive', organisation: 'NEP Switzerland AG', meta: 'Shtator 2023 – qershor 2024', description: 'Koordinim i grafikës televizive në një mjedis prodhimi live.', tags: ['Broadcast', 'Grafikë'] }
          ]
        },
        projects: {
          label: 'Projektet',
          items: [
            { title: 'Grafika të dhënash SFL për TV live', organisation: 'BBM Productions AG · Swiss Football League', meta: 'Transmetim live', description: 'Integrim i Stats Perform dhe Opta për statistika, heatmaps, attacking zones, grafika penalltish dhe procese live të automatizuara.', tags: ['Opta', 'Ndërfaqe', 'Grafikë TV'] },
            { title: 'Collectrra', organisation: 'Platformë full-stack për koleksionistë', meta: 'Projekt i përzgjedhur portfolioje', description: 'Platformë sociale për karta koleksioni me koleksione, albume, shkëmbime, marketplace dhe kërkim që respekton privatësinë.', tags: ['JavaScript', 'Django', 'PostgreSQL'] },
            { title: 'VideoFlix', organisation: 'Platformë video streaming', meta: 'Projekt i përzgjedhur portfolioje', description: 'Aplikacion streaming i ndarë me autentikim të sigurt, përpunim FFmpeg dhe transmetim adaptiv HLS.', tags: ['Django', 'Redis', 'FFmpeg'] },
            { title: 'Quizly', organisation: 'Platformë mësimore me ndihmën e AI', meta: 'Projekt i përzgjedhur portfolioje', description: 'I kthen videot YouTube në kuize interaktive me transkriptim dhe gjenerim pyetjesh me ndihmën e AI.', tags: ['Whisper', 'Gemini', 'DRF'] }
          ]
        },
        education: {
          label: 'Arsimimi',
          items: [
            { title: 'MSc Data Science, IT & Technology', organisation: 'IU Hochschule', meta: 'Nëntor 2023 – janar 2026 · Nota 5.3', description: 'Master me fokus në data science, teknologji informacioni dhe menaxhim teknologjie.', tags: ['MSc', 'Data Science'] },
            { title: 'BSc Ekonomi biznesi · Sport Management', organisation: 'Fachhochschule Graubünden', meta: 'Shtator 2019 – shtator 2023 · Nota 4.6', description: 'Bachelor në ekonomi biznesi me drejtim menaxhimin e sportit.', tags: ['BSc', 'Ekonomi'] },
            { title: 'Maturë profesionale · Shëndetësi dhe çështje sociale', organisation: 'Minerva Schulen', meta: 'Gusht 2018 – gusht 2019 · Nota 4.9', description: 'Maturë profesionale zvicerane me fokus shëndetësinë dhe çështjet sociale.', tags: ['Maturë'] },
            { title: 'Punonjës tregtar EFZ', organisation: 'KV Business School', meta: 'Gusht 2012 – gusht 2015 · Nota 4.2', description: 'Diplomë federale profesionale në administrim tregtar.', tags: ['EFZ'] }
          ]
        },
        certificates: {
          label: 'Certifikatat',
          items: [
            { title: 'Software Engineer, Front- & Backend (Fullstack)', organisation: 'Developer Akademie', meta: 'Prill 2024 – janar 2026', description: 'Program software engineering me 13 module dhe katër projekte capstone në zhvillim frontend dhe backend.', tags: ['Angular', 'TypeScript', 'Python', 'Django', 'SQL', 'Docker'] }
          ]
        }
      },
      businessEyebrow: 'Ndërmarrje individuale zvicerane',
      businessRole: 'Themelues dhe pronar',
      businessDescription: 'Përpunim dhe analizë të dhënash, aplikacione digjitale, vizualizime grafike dhe shërbime grafike për TV me fokus programimin e ndërfaqeve.',
      businessMeta: 'Aktive · 5610 Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Shiko regjistrimin e kompanisë',
      newTabLabel: 'hapet në një skedë të re',
      previewAlt: 'Pamje paraprake e dosjes publike të aplikimit të Leo Rullanit',
      openPreviewLabel: 'Hap dosjen publike të aplikimit në një skedë të re',
      downloadLabel: 'Shkarko dosjen e aplikimit',
      downloadHint: 'Version publik PDF pa të dhëna private · CV · dëshmi arsimimi · dëshmi pune',
      nextAria: 'Vazhdo te kontakti'
    },
    GSW: {
      eyebrow: 'Läbeslauf',
      title: 'Data Scientist · Full-Stack Engineer',
      intro: 'En kompakte Überblick über mini Bruefserfahrig, uusgwählti Software- und Broadcast-Projekt, Uusbildig und Zertifizierig.',
      tabListLabel: 'CV-Kategorie',
      expandSection: section => `${section} ufklappe`,
      collapseSection: section => `${section} zueklappe`,
      sections: {
        work: {
          label: 'Arbeit',
          items: [
            { title: 'Project & Assortment Manager', organisation: 'MediaMarkt AG', meta: 'März 2026 – hüt', description: 'Projekt- und Sortimentsmanagement im Detailhandel.', tags: ['Projekt', 'Sortiment'] },
            { title: 'Gründer & Inhaber · Data Scientist · Full-Stack Engineer', organisation: 'Rullani DataLab', meta: 'April 2026 – hüt', description: 'Dateanalyse, digitali Awändige, Visualisierige und Schnittstelleprogrammierig.', tags: ['Date', 'Software'] },
            { title: 'Team Lead Graphics · Software Engineer', organisation: 'BBM Productions AG', meta: 'Mai 2025 – April 2026', description: 'Leitig vo de Grafikoperation und Entwicklig vo datengetriebene System für Live-Sportübertragige.', tags: ['Live-TV', 'Datefeeds'] },
            { title: 'TV-Grafik-Koordinator', organisation: 'NEP Switzerland AG', meta: 'September 2023 – Juni 2024', description: 'Koordination vo de TV-Grafik im Live-Produktionsumfeld.', tags: ['Broadcast', 'Grafik'] }
          ]
        },
        projects: {
          label: 'Projekt',
          items: [
            { title: 'SFL Live-TV-Dategrafike', organisation: 'BBM Productions AG · Swiss Football League', meta: 'Live-Broadcast', description: 'Integration vo Stats-Perform- und Opta-Feeds für Statistike, Heatmaps, Attacking Zones, Penalty-Grafike und automatisierti Live-Workflows.', tags: ['Opta', 'Schnittstelle', 'TV-Grafik'] },
            { title: 'Collectrra', organisation: 'Full-Stack-Sammelplattform', meta: 'Uusgwählts Portfolio-Projekt', description: 'E sozali Trading-Card-Plattform mit Sammlige, Albe, Tüüsch, Marktplatz und ere privatsphärefreundliche Umkreissuechi.', tags: ['JavaScript', 'Django', 'PostgreSQL'] },
            { title: 'VideoFlix', organisation: 'Video-Streaming-Plattform', meta: 'Uusgwählts Portfolio-Projekt', description: 'E trennti Streaming-Awändig mit sicherem Login, FFmpeg-Verarbeitig und adaptiver HLS-Uuslieferig.', tags: ['Django', 'Redis', 'FFmpeg'] },
            { title: 'Quizly', organisation: 'KI-unterstützti Lernplattform', meta: 'Uusgwählts Portfolio-Projekt', description: 'Macht us YouTube-Videos interaktivi Quiz mit Transkription und KI-unterstützter Fragegenerierig.', tags: ['Whisper', 'Gemini', 'DRF'] }
          ]
        },
        education: {
          label: 'Uusbildig',
          items: [
            { title: 'MSc Data Science, IT & Technology', organisation: 'IU Hochschule', meta: 'November 2023 – Januar 2026 · Abschlussnote 5.3', description: 'Masterstudium mit Fokus uf Data Science, Informationstechnologie und Technologiemanagement.', tags: ['MSc', 'Data Science'] },
            { title: 'BSc Betriebsökonomie · Sportmanagement', organisation: 'Fachhochschule Graubünden', meta: 'September 2019 – September 2023 · Abschlussnote 4.6', description: 'Bachelorstudium i Betriebsökonomie mit Vertiefig Sportmanagement.', tags: ['BSc', 'Betriebsökonomie'] },
            { title: 'Bruefsmaturität · Gsundheit & Sozials', organisation: 'Minerva Schulen', meta: 'August 2018 – August 2019 · Abschlussnote 4.9', description: 'Schwiizer Bruefsmaturität mit Vertiefig Gsundheit und Sozials.', tags: ['Bruefsmaturität'] },
            { title: 'Kaufmaa EFZ', organisation: 'KV Business School', meta: 'August 2012 – August 2015 · Abschlussnote 4.2', description: 'Eidgenössischs Fähigkeitszügnis im kaufmännische Bereich.', tags: ['EFZ'] }
          ]
        },
        certificates: {
          label: 'Zertifikat',
          items: [
            { title: 'Software Engineer, Front- & Backend (Fullstack)', organisation: 'Developer Akademie', meta: 'April 2024 – Januar 2026', description: 'Software-Engineering-Programm mit 13 Modul und vier Capstone-Projekt i de Frontend- und Backend-Entwicklig.', tags: ['Angular', 'TypeScript', 'Python', 'Django', 'SQL', 'Docker'] }
          ]
        }
      },
      businessEyebrow: 'Schwiizer Einzelunternehme',
      businessRole: 'Gründer & Inhaber',
      businessDescription: 'Dateverarbeitig und -uswärtig, digitali Awändige, grafischi Visualisierige und TV-Grafik-Dienstleistige mit Fokus uf Schnittstelleprogrammierig.',
      businessMeta: 'Aktiv · 5610 Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Handelsregister-Iitrag aluege',
      newTabLabel: 'macht en neue Tab uf',
      previewAlt: 'Vorschau vom öffentliche Bewerbigs-Dossier vom Leo Rullani',
      openPreviewLabel: 'Öffentlichs Bewerbigs-Dossier imene neue Tab ufmache',
      downloadLabel: 'Bewerbigs-Dossier abelade',
      downloadHint: 'Öffentlichi, datenschutzbereinigti PDF-Version · CV · Uusbildigsnochwiis · Arbeitszügnis',
      nextAria: 'Wiiter zum Kontakt'
    },
    PT: {
      eyebrow: 'Currículo',
      title: 'Data Scientist · Full-Stack Engineer',
      intro: 'Uma visão compacta da minha experiência profissional, projetos selecionados de software e broadcast, formação e certificação.',
      tabListLabel: 'Categorias do CV',
      expandSection: section => `Expandir ${section}`,
      collapseSection: section => `Recolher ${section}`,
      sections: {
        work: {
          label: 'Trabalho',
          items: [
            { title: 'Project & Assortment Manager', organisation: 'MediaMarkt AG', meta: 'Março de 2026 – presente', description: 'Gestão de projetos e sortido no ambiente de retalho.', tags: ['Projetos', 'Sortido'] },
            { title: 'Fundador e proprietário · Data Scientist · Full-Stack Engineer', organisation: 'Rullani DataLab', meta: 'Abril de 2026 – presente', description: 'Análise de dados, aplicações digitais, visualizações e programação de interfaces.', tags: ['Dados', 'Software'] },
            { title: 'Team Lead Graphics · Software Engineer', organisation: 'BBM Productions AG', meta: 'Maio de 2025 – abril de 2026', description: 'Liderança das operações gráficas e desenvolvimento de sistemas data-driven para transmissões desportivas em direto.', tags: ['TV em direto', 'Fluxos de dados'] },
            { title: 'Coordenador de grafismo televisivo', organisation: 'NEP Switzerland AG', meta: 'Setembro de 2023 – junho de 2024', description: 'Coordenação de grafismo televisivo num ambiente de produção em direto.', tags: ['Broadcast', 'Grafismo'] }
          ]
        },
        projects: {
          label: 'Projetos',
          items: [
            { title: 'Grafismo de dados SFL para TV em direto', organisation: 'BBM Productions AG · Swiss Football League', meta: 'Transmissão em direto', description: 'Integração de feeds Stats Perform e Opta para estatísticas, heatmaps, attacking zones, grafismo de penáltis e workflows automatizados.', tags: ['Opta', 'Interfaces', 'Grafismo TV'] },
            { title: 'Collectrra', organisation: 'Plataforma full-stack para colecionadores', meta: 'Projeto de portefólio selecionado', description: 'Plataforma social de cartas colecionáveis com coleções, álbuns, trocas, marketplace e pesquisa respeitadora da privacidade.', tags: ['JavaScript', 'Django', 'PostgreSQL'] },
            { title: 'VideoFlix', organisation: 'Plataforma de streaming de vídeo', meta: 'Projeto de portefólio selecionado', description: 'Aplicação de streaming desacoplada com autenticação segura, processamento FFmpeg e distribuição HLS adaptativa.', tags: ['Django', 'Redis', 'FFmpeg'] },
            { title: 'Quizly', organisation: 'Plataforma de aprendizagem assistida por IA', meta: 'Projeto de portefólio selecionado', description: 'Transforma vídeos do YouTube em questionários interativos através de transcrição e geração de perguntas assistida por IA.', tags: ['Whisper', 'Gemini', 'DRF'] }
          ]
        },
        education: {
          label: 'Formação',
          items: [
            { title: 'MSc Data Science, IT & Technology', organisation: 'IU Hochschule', meta: 'Novembro de 2023 – janeiro de 2026 · Nota 5.3', description: 'Mestrado centrado em data science, tecnologias da informação e gestão tecnológica.', tags: ['MSc', 'Data Science'] },
            { title: 'BSc Economia empresarial · Sport Management', organisation: 'Fachhochschule Graubünden', meta: 'Setembro de 2019 – setembro de 2023 · Nota 4.6', description: 'Licenciatura em economia empresarial com especialização em gestão do desporto.', tags: ['BSc', 'Economia'] },
            { title: 'Maturidade profissional · Saúde e assuntos sociais', organisation: 'Minerva Schulen', meta: 'Agosto de 2018 – agosto de 2019 · Nota 4.9', description: 'Maturidade profissional suíça com foco em saúde e assuntos sociais.', tags: ['Maturidade'] },
            { title: 'Empregado comercial EFZ', organisation: 'KV Business School', meta: 'Agosto de 2012 – agosto de 2015 · Nota 4.2', description: 'Certificado federal de formação profissional em administração comercial.', tags: ['EFZ'] }
          ]
        },
        certificates: {
          label: 'Certificados',
          items: [
            { title: 'Software Engineer, Front- & Backend (Fullstack)', organisation: 'Developer Akademie', meta: 'Abril de 2024 – janeiro de 2026', description: 'Programa de software engineering com 13 módulos e quatro projetos capstone em desenvolvimento frontend e backend.', tags: ['Angular', 'TypeScript', 'Python', 'Django', 'SQL', 'Docker'] }
          ]
        }
      },
      businessEyebrow: 'Empresa individual suíça',
      businessRole: 'Fundador e proprietário',
      businessDescription: 'Processamento e análise de dados, aplicações digitais, visualizações gráficas e serviços de grafismo para TV com foco na programação de interfaces.',
      businessMeta: 'Ativa · 5610 Wohlen AG · UID CHE-230.957.470',
      registryLabel: 'Ver registo da empresa',
      newTabLabel: 'abre num novo separador',
      previewAlt: 'Pré-visualização do dossiê público de candidatura de Leo Rullani',
      openPreviewLabel: 'Abrir o dossiê público de candidatura num novo separador',
      downloadLabel: 'Descarregar dossiê de candidatura',
      downloadHint: 'Versão PDF pública sem dados privados · CV · comprovativos de formação · certificados de trabalho',
      nextAria: 'Continuar para o contacto'
    }
  };

  selectSection(section: CareerSectionId): void {
    this.activeSection = section;
  }

  toggleMobileSection(section: CareerSectionId): void {
    this.mobileExpandedSection = this.mobileExpandedSection === section ? null : section;
  }

  mobileSectionLabel(section: CareerSectionId): string {
    const label = this.copy[this.activeLang].sections[section].label;
    return this.mobileExpandedSection === section
      ? this.copy[this.activeLang].collapseSection(label)
      : this.copy[this.activeLang].expandSection(label);
  }

  onTabKeydown(event: KeyboardEvent, currentIndex: number): void {
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % this.sectionIds.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + this.sectionIds.length) % this.sectionIds.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = this.sectionIds.length - 1;
    else return;

    event.preventDefault();
    this.activeSection = this.sectionIds[nextIndex];
    requestAnimationFrame(() => this.careerTabs.get(nextIndex)?.nativeElement.focus());
  }

  tabId(section: CareerSectionId): string {
    return `career-tab-${section}`;
  }

  tabPanelId(section: CareerSectionId): string {
    return `career-panel-${section}`;
  }

  accordionButtonId(section: CareerSectionId): string {
    return `career-accordion-button-${section}`;
  }

  accordionPanelId(section: CareerSectionId): string {
    return `career-accordion-panel-${section}`;
  }

  scrollNext(): void {
    if (!this.scrollEl?.nativeElement) return;
    this.scrollEl.nativeElement.scrollTo({
      left: this.scrollEl.nativeElement.scrollLeft + window.innerWidth,
      top: 0,
      behavior: 'smooth'
    });
  }
}
