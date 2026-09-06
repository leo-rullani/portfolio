import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { Language, NAVIGATION_LABELS } from '../i18n/language';

interface Project {
  number: string; name: string; mark: string;
  category: Record<Language, string>;
  description: Record<Language, string>;
  learning: Record<Language, string>;
  technologies: string[];
  repositories: { label: string; url: string }[];
  liveUrl?: string;
  safeDemo?: boolean;
}

interface WorkCopy {
  verticalTitle: string;
  eyebrow: string;
  intro: string;
  about: string;
  learned: string;
  live: string;
  staticNote: string;
  safeDemoNote: string;
  privateLabel: string;
  sourceCodeLabel: string;
  toggleDetails: (project: string) => string;
  previewAlt: (project: string) => string;
  openRepository: (project: string, repository: string) => string;
  openLiveDemo: (project: string) => string;
}

const localized = (
  EN: string,
  DE: string,
  IT: string,
  FR: string,
  ES: string,
  SQ: string,
  GSW: string = DE,
  PT: string = DE
): Record<Language, string> => ({ EN, DE, IT, FR, ES, SQ, GSW, PT });

@Component({ selector: 'my-work', standalone: true, imports: [CommonModule], templateUrl: './my-work.component.html', styleUrl: './my-work.component.scss' })
export class MyWorkComponent {
  readonly navigationLabels = NAVIGATION_LABELS;
  @Input() activeLang: Language = 'EN';
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  private horizontalScrollPosition: number | null = null;

  readonly copy: Record<Language, WorkCopy> = {
    EN: { verticalTitle: 'My Work', eyebrow: 'Selected projects', intro: 'From focused browser experiences to complete REST platforms — built with attention to clean interfaces, reliable APIs and thoughtful data handling.', about: 'About the project', learned: 'Focus & learning', live: 'Live demo', staticNote: 'Portfolio preview without live user data', safeDemoNote: 'Interactive browser demo · synthetic data stays on your device', privateLabel: 'Private', sourceCodeLabel: 'Source code', toggleDetails: project => `Toggle ${project} project details`, previewAlt: project => `${project} interface preview`, openRepository: (project, repository) => `Open ${project} ${repository} on GitHub (new tab)`, openLiveDemo: project => `Open ${project} live demo (new tab)` },
    DE: { verticalTitle: 'Meine Arbeiten', eyebrow: 'Ausgewählte Projekte', intro: 'Von fokussierten Browser-Erlebnissen bis zu vollständigen REST-Plattformen — mit Blick auf klare Interfaces, zuverlässige APIs und einen bewussten Umgang mit Daten.', about: 'Über das Projekt', learned: 'Fokus & Erkenntnisse', live: 'Live-Demo', staticNote: 'Portfolio-Vorschau ohne echte Nutzerdaten', safeDemoNote: 'Interaktive Browser-Demo · synthetische Daten bleiben auf Ihrem Gerät', privateLabel: 'Privat', sourceCodeLabel: 'Quellcode', toggleDetails: project => `${project}-Projektdetails ein- oder ausblenden`, previewAlt: project => `${project} Interface-Vorschau`, openRepository: (project, repository) => `${project} ${repository} auf GitHub öffnen (neuer Tab)`, openLiveDemo: project => `${project} Live-Demo öffnen (neuer Tab)` },
    IT: { verticalTitle: 'I miei progetti', eyebrow: 'Progetti selezionati', intro: 'Da esperienze mirate nel browser a piattaforme REST complete — realizzate con attenzione per interfacce chiare, API affidabili e una gestione consapevole dei dati.', about: 'Il progetto', learned: 'Focus e apprendimento', live: 'Demo live', staticNote: 'Anteprima portfolio senza dati utente reali', safeDemoNote: 'Demo interattiva nel browser · i dati sintetici restano sul tuo dispositivo', privateLabel: 'Privato', sourceCodeLabel: 'Codice sorgente', toggleDetails: project => `Mostra o nascondi i dettagli del progetto ${project}`, previewAlt: project => `Anteprima dell’interfaccia ${project}`, openRepository: (project, repository) => `Apri ${repository} di ${project} su GitHub (nuova scheda)`, openLiveDemo: project => `Apri la demo live di ${project} (nuova scheda)` },
    FR: { verticalTitle: 'Mes projets', eyebrow: 'Projets sélectionnés', intro: 'Des expériences ciblées dans le navigateur aux plateformes REST complètes — avec une attention particulière portée aux interfaces claires, aux API fiables et à une gestion responsable des données.', about: 'À propos du projet', learned: 'Objectifs et apprentissages', live: 'Démo en ligne', staticNote: 'Aperçu du portfolio sans données utilisateur réelles', safeDemoNote: 'Démo interactive dans le navigateur · les données synthétiques restent sur votre appareil', privateLabel: 'Privé', sourceCodeLabel: 'Code source', toggleDetails: project => `Afficher ou masquer les détails du projet ${project}`, previewAlt: project => `Aperçu de l’interface ${project}`, openRepository: (project, repository) => `Ouvrir ${repository} de ${project} sur GitHub (nouvel onglet)`, openLiveDemo: project => `Ouvrir la démo en ligne de ${project} (nouvel onglet)` },
    ES: { verticalTitle: 'Mis proyectos', eyebrow: 'Proyectos seleccionados', intro: 'Desde experiencias específicas en el navegador hasta plataformas REST completas — creadas con atención a interfaces claras, API fiables y una gestión responsable de los datos.', about: 'Sobre el proyecto', learned: 'Enfoque y aprendizaje', live: 'Demo en vivo', staticNote: 'Vista previa del portfolio sin datos reales de usuarios', safeDemoNote: 'Demo interactiva en el navegador · los datos sintéticos permanecen en tu dispositivo', privateLabel: 'Privado', sourceCodeLabel: 'Código fuente', toggleDetails: project => `Mostrar u ocultar los detalles del proyecto ${project}`, previewAlt: project => `Vista previa de la interfaz de ${project}`, openRepository: (project, repository) => `Abrir ${repository} de ${project} en GitHub (pestaña nueva)`, openLiveDemo: project => `Abrir la demo en vivo de ${project} (pestaña nueva)` },
    SQ: { verticalTitle: 'Projektet e mia', eyebrow: 'Projekte të përzgjedhura', intro: 'Nga përvojat e fokusuara në shfletues te platformat e plota REST — të ndërtuara me kujdes për ndërfaqe të qarta, API të besueshme dhe trajtim të përgjegjshëm të të dhënave.', about: 'Rreth projektit', learned: 'Fokusi dhe të mësuarit', live: 'Demo live', staticNote: 'Pamje portfolioje pa të dhëna reale të përdoruesve', safeDemoNote: 'Demo interaktive në shfletues · të dhënat sintetike mbeten në pajisjen tuaj', privateLabel: 'Privat', sourceCodeLabel: 'Kodi burimor', toggleDetails: project => `Shfaq ose fshih detajet e projektit ${project}`, previewAlt: project => `Pamje e ndërfaqes së ${project}`, openRepository: (project, repository) => `Hap ${repository} të ${project} në GitHub (skedë e re)`, openLiveDemo: project => `Hap demon live të ${project} (skedë e re)` },
    GSW: { verticalTitle: 'Mini Projekte', eyebrow: 'Uusgwählti Projekt', intro: 'Vo fokussierte Browser-Erlebnis bis zu komplette REST-Plattforme — baut mit Blick für klari Interfaces, zuverlässigi APIs und en bewusste Umgang mit Date.', about: 'Übers Projekt', learned: 'Fokus & Learnings', live: 'Live-Demo', staticNote: 'Portfolio-Vorschau ohni echti Nutzerdaten', safeDemoNote: 'Interaktivi Browser-Demo · synthetischi Date blibed uf dim Grät', privateLabel: 'Privat', sourceCodeLabel: 'Quellcode', toggleDetails: project => `Projektdetails vo ${project} uf- oder zueklappe`, previewAlt: project => `Interface-Vorschau vo ${project}`, openRepository: (project, repository) => `${repository} vo ${project} uf GitHub öffne (neue Tab)`, openLiveDemo: project => `Live-Demo vo ${project} öffne (neue Tab)` },
    PT: { verticalTitle: 'Os meus projetos', eyebrow: 'Projetos selecionados', intro: 'De experiências focadas no navegador a plataformas REST completas — criadas com atenção a interfaces claras, APIs fiáveis e um tratamento responsável dos dados.', about: 'Sobre o projeto', learned: 'Foco e aprendizagem', live: 'Demo ao vivo', staticNote: 'Pré-visualização do portefólio sem dados reais de utilizadores', safeDemoNote: 'Demo interativa no navegador · os dados sintéticos permanecem no seu dispositivo', privateLabel: 'Privado', sourceCodeLabel: 'Código-fonte', toggleDetails: project => `Mostrar ou ocultar os detalhes do projeto ${project}`, previewAlt: project => `Pré-visualização da interface de ${project}`, openRepository: (project, repository) => `Abrir ${repository} de ${project} no GitHub (novo separador)`, openLiveDemo: project => `Abrir a demo ao vivo de ${project} (novo separador)` }
  };

  readonly projects: Project[] = [
    {
      number: '01', name: 'Collectrra', mark: 'CR',
      category: localized('Full-stack collecting platform', 'Full-Stack-Sammelplattform', 'Piattaforma full-stack per collezionisti', 'Plateforme full-stack pour collectionneurs', 'Plataforma full-stack para coleccionistas', 'Platformë full-stack për koleksionistë', 'Full-Stack-Sammelplattform', 'Plataforma full-stack para colecionadores'),
      description: localized(
        'A social platform for trading-card collectors with collections, albums, trades, marketplace, messaging and privacy-aware location discovery.',
        'Eine soziale Plattform für Trading-Card-Sammler mit Kollektionen, Alben, Tauschgeschäften, Marktplatz, Nachrichten und datenschutzbewusster Umgebungssuche.',
        'Una piattaforma sociale per collezionisti di carte con collezioni, album, scambi, marketplace, messaggistica e ricerca locale attenta alla privacy.',
        'Une plateforme sociale pour collectionneurs de cartes avec collections, albums, échanges, marketplace, messagerie et recherche locale respectueuse de la vie privée.',
        'Una plataforma social para coleccionistas de cartas con colecciones, álbumes, intercambios, marketplace, mensajería y búsqueda local respetuosa con la privacidad.',
        'Platformë sociale për koleksionistë kartash me koleksione, albume, shkëmbime, marketplace, mesazhe dhe kërkim lokal që respekton privatësinë.',
        'E sozali Plattform für Sammelcharte-Fans mit Sammlige, Albe, Tüüsch, Marktplatz, Nachricht und ere privatsphärefreundliche Umkreissuechi.',
        'Uma plataforma social para colecionadores de cartas com coleções, álbuns, trocas, marketplace, mensagens e pesquisa local respeitadora da privacidade.'
      ),
      learning: localized(
        'A large, domain-driven API with secure account flows, resilient demo providers, localisation and a dependency-free frontend.',
        'Eine umfangreiche, domänenorientierte API mit sicheren Account-Flows, robusten Demo-Providern, Lokalisierung und einem Frontend ohne Framework-Abhängigkeiten.',
        'Un’API estesa e orientata al dominio, con flussi account sicuri, provider demo resilienti, localizzazione e un frontend privo di dipendenze.',
        'Une API étendue orientée métier, avec des parcours de compte sécurisés, des fournisseurs de démonstration résilients, la localisation et un frontend sans dépendances.',
        'Una API amplia orientada al dominio, con flujos de cuenta seguros, proveedores de demo resilientes, localización y un frontend sin dependencias.',
        'API e gjerë e orientuar sipas domain-it, me procese të sigurta të llogarisë, ofrues demo të qëndrueshëm, lokalizim dhe frontend pa varësi.',
        'E grossi, domain-orientierti API mit sichere Account-Flows, robuste Demo-Provider, Lokalisierig und eme Frontend ohni Framework-Abhängigkeit.',
        'Uma API extensa e orientada ao domínio, com fluxos de conta seguros, fornecedores de demonstração resilientes, localização e um frontend sem dependências.'
      ),
      technologies: ['JavaScript', 'Django', 'DRF', 'JWT', 'PostgreSQL', 'Redis', 'Docker'],
      repositories: [{ label: 'Frontend', url: 'https://github.com/leo-rullani/collectrra_frontend' }, { label: 'Backend', url: 'https://github.com/leo-rullani/collectrra_backend' }],
      liveUrl: '/assets/demos/collectrra/index.html', safeDemo: true
    },
    {
      number: '02', name: 'VideoFlix', mark: 'VF',
      category: localized('Video streaming platform', 'Video-Streaming-Plattform', 'Piattaforma di video streaming', 'Plateforme de streaming vidéo', 'Plataforma de streaming de vídeo', 'Platformë video streaming', 'Video-Streaming-Plattform', 'Plataforma de streaming de vídeo'),
      description: localized(
        'A Netflix-inspired application with account activation, secure cookie authentication and adaptive HLS video delivery.',
        'Eine von Netflix inspirierte Anwendung mit Account-Aktivierung, sicherer Cookie-Authentifizierung und adaptivem HLS-Videostreaming.',
        'Un’applicazione ispirata a Netflix con attivazione dell’account, autenticazione sicura tramite cookie e distribuzione video HLS adattiva.',
        'Une application inspirée de Netflix avec activation de compte, authentification sécurisée par cookie et diffusion vidéo HLS adaptative.',
        'Una aplicación inspirada en Netflix con activación de cuenta, autenticación segura mediante cookies y entrega de vídeo HLS adaptativa.',
        'Aplikacion i frymëzuar nga Netflix me aktivizim llogarie, autentikim të sigurt me cookie dhe transmetim adaptiv video HLS.',
        'E vo Netflix inspirierti Awendig mit Account-Aktiviering, sicherem Cookie-Login und adaptivem HLS-Videostreaming.',
        'Uma aplicação inspirada na Netflix com ativação de conta, autenticação segura por cookie e distribuição adaptativa de vídeo HLS.'
      ),
      learning: localized(
        'Media processing with FFmpeg, background jobs, HLS delivery and secure authentication across a decoupled frontend and backend.',
        'Medienverarbeitung mit FFmpeg, Background-Jobs, HLS-Auslieferung und sichere Authentifizierung über getrenntes Frontend und Backend.',
        'Elaborazione media con FFmpeg, job in background, distribuzione HLS e autenticazione sicura tra frontend e backend separati.',
        'Traitement multimédia avec FFmpeg, tâches en arrière-plan, diffusion HLS et authentification sécurisée entre frontend et backend découplés.',
        'Procesamiento multimedia con FFmpeg, tareas en segundo plano, entrega HLS y autenticación segura entre frontend y backend desacoplados.',
        'Përpunim media me FFmpeg, detyra në sfond, shpërndarje HLS dhe autentikim i sigurt në frontend dhe backend të ndarë.',
        'Medieverarbeitig mit FFmpeg, Background-Jobs, HLS-Uuslieferig und sicherem Login über es trennts Frontend und Backend.',
        'Processamento multimédia com FFmpeg, tarefas em segundo plano, distribuição HLS e autenticação segura entre frontend e backend desacoplados.'
      ),
      technologies: ['JavaScript', 'Django', 'DRF', 'JWT', 'Redis', 'PostgreSQL', 'FFmpeg'],
      repositories: [{ label: 'Frontend', url: 'https://github.com/leo-rullani/frontend_video-flix' }, { label: 'Backend', url: 'https://github.com/leo-rullani/backend_video-flix' }],
      liveUrl: '/assets/demos/videoflix/index.html', safeDemo: true
    },
    {
      number: '03', name: 'Quizly', mark: 'QZ',
      category: localized('AI-assisted learning platform', 'KI-gestützte Lernplattform', 'Piattaforma di apprendimento assistita dall’IA', 'Plateforme d’apprentissage assistée par l’IA', 'Plataforma de aprendizaje asistida por IA', 'Platformë mësimore e asistuar nga AI', 'KI-unterstützti Lernplattform', 'Plataforma de aprendizagem assistida por IA'),
      description: localized(
        'Turns YouTube videos into interactive quizzes through transcription and AI-assisted question generation.',
        'Verwandelt YouTube-Videos mithilfe von Transkription und KI-gestützter Fragengenerierung in interaktive Quizze.',
        'Trasforma i video di YouTube in quiz interattivi mediante trascrizione e generazione di domande assistita dall’IA.',
        'Transforme les vidéos YouTube en quiz interactifs grâce à la transcription et à la génération de questions assistée par l’IA.',
        'Convierte vídeos de YouTube en cuestionarios interactivos mediante transcripción y generación de preguntas asistida por IA.',
        'Shndërron videot e YouTube në kuize interaktive përmes transkriptimit dhe gjenerimit të pyetjeve me ndihmën e AI.',
        'Macht us YouTube-Videos interaktivi Quiz — mit Transkription und KI-unterstützter Fragegenerierig.',
        'Transforma vídeos do YouTube em questionários interativos através de transcrição e geração de perguntas assistida por IA.'
      ),
      learning: localized(
        'Orchestrating a media-to-quiz pipeline while keeping authentication and generated learning content manageable.',
        'Orchestrierung einer Media-to-Quiz-Pipeline bei gleichzeitig überschaubarer Authentifizierung und Verwaltung generierter Lerninhalte.',
        'Orchestrazione di una pipeline dai media al quiz, mantenendo gestibili l’autenticazione e i contenuti didattici generati.',
        'Orchestration d’un pipeline média-vers-quiz tout en gardant l’authentification et le contenu pédagogique généré faciles à gérer.',
        'Orquestación de un flujo de medios a cuestionarios, manteniendo manejables la autenticación y el contenido educativo generado.',
        'Orkestrimi i një procesi nga media te kuizi, duke mbajtur të menaxhueshëm autentikimin dhe përmbajtjen mësimore të gjeneruar.',
        'Orchestrierig vonere Media-to-Quiz-Pipeline, wo Login und automatisch generierti Lerninhalt übersichtlich und wartbar blibed.',
        'Orquestração de um pipeline de multimédia para questionário, mantendo geríveis a autenticação e os conteúdos de aprendizagem gerados.'
      ),
      technologies: ['JavaScript', 'Django', 'DRF', 'Whisper', 'Gemini', 'FFmpeg', 'JWT'],
      repositories: [{ label: 'Frontend', url: 'https://github.com/leo-rullani/quizly-frontend' }, { label: 'Backend', url: 'https://github.com/leo-rullani/quizly-backend' }],
      liveUrl: '/assets/demos/quizly/index.html', safeDemo: true
    },
    {
      number: '04', name: 'BBM Kanban', mark: 'BK',
      category: localized('Broadcast workflow board', 'Kanban-Board für Broadcast-Workflows', 'Bacheca per workflow broadcast', 'Tableau de workflow broadcast', 'Tablero para flujos de broadcast', 'Bord për procese broadcast', 'Kanban-Board für Broadcast-Workflows', 'Quadro de workflows de broadcast'),
      description: localized(
        'A role-aware Kanban workspace for boards, tasks, comments and production-oriented collaboration.',
        'Ein rollenbasiertes Kanban-System für Boards, Aufgaben, Kommentare und produktionsorientierte Zusammenarbeit.',
        'Uno spazio Kanban basato sui ruoli per board, attività, commenti e collaborazione orientata alla produzione.',
        'Un espace Kanban basé sur les rôles pour les tableaux, tâches, commentaires et la collaboration orientée production.',
        'Un espacio Kanban basado en roles para tableros, tareas, comentarios y colaboración orientada a la producción.',
        'Hapësirë Kanban me role për borde, detyra, komente dhe bashkëpunim të orientuar drejt prodhimit.',
        'En rollenbasierte Kanban-Arbeitsruum für Boards, Ufgabe, Kommentar und produktionsorientierti Zämearbeit.',
        'Um espaço Kanban baseado em funções para quadros, tarefas, comentários e colaboração orientada para a produção.'
      ),
      learning: localized(
        'RESTful CRUD design, object permissions and a modular vanilla JavaScript client connected to Django REST Framework.',
        'RESTful CRUD-Design, Objektberechtigungen und ein modularer Vanilla-JavaScript-Client mit Django REST Framework.',
        'Design CRUD RESTful, permessi a livello di oggetto e client JavaScript vanilla modulare collegato a Django REST Framework.',
        'Conception CRUD RESTful, autorisations au niveau des objets et client JavaScript vanilla modulaire connecté à Django REST Framework.',
        'Diseño CRUD RESTful, permisos por objeto y cliente JavaScript vanilla modular conectado a Django REST Framework.',
        'Dizajn CRUD RESTful, leje në nivel objekti dhe klient modular vanilla JavaScript i lidhur me Django REST Framework.',
        'RESTful CRUD-Design, Objektberechtigunge und en modulare Vanilla-JavaScript-Client mit Django REST Framework.',
        'Design CRUD RESTful, permissões por objeto e um cliente JavaScript vanilla modular ligado ao Django REST Framework.'
      ),
      technologies: ['JavaScript', 'Django', 'DRF', 'Token Auth', 'REST API'],
      repositories: [{ label: 'Frontend', url: 'https://github.com/leo-rullani/bbm_kanban-frontend' }, { label: 'Backend', url: 'https://github.com/leo-rullani/bbm-kanban-backend' }],
      liveUrl: '/assets/demos/bbm/index.html', safeDemo: true
    },
    {
      number: '05', name: 'Join', mark: 'JN',
      category: localized('Collaborative task manager', 'Kollaborativer Task-Manager', 'Task manager collaborativo', 'Gestionnaire de tâches collaboratif', 'Gestor de tareas colaborativo', 'Menaxher bashkëpunues detyrash', 'Task-Manager für Zämearbeit', 'Gestor de tarefas colaborativo'),
      description: localized(
        'A Kanban-inspired task manager with drag and drop, contacts and category-based organisation.',
        'Ein Kanban-inspirierter Task-Manager mit Drag & Drop, Kontakten und kategoriebasierter Organisation.',
        'Un task manager ispirato a Kanban con drag and drop, contatti e organizzazione per categorie.',
        'Un gestionnaire de tâches inspiré de Kanban avec glisser-déposer, contacts et organisation par catégories.',
        'Un gestor de tareas inspirado en Kanban con arrastrar y soltar, contactos y organización por categorías.',
        'Menaxher detyrash i frymëzuar nga Kanban me drag and drop, kontakte dhe organizim sipas kategorive.',
        'En vo Kanban inspirierte Task-Manager mit Drag & Drop, Kontakt und ere Organisation nach Kategorie.',
        'Um gestor de tarefas inspirado em Kanban com arrastar e largar, contactos e organização por categorias.'
      ),
      learning: localized(
        'Team collaboration, maintainable JavaScript and accessible interaction patterns.',
        'Teamarbeit, wartbares JavaScript und zugängliche Interaktionsmuster.',
        'Collaborazione in team, JavaScript manutenibile e modelli di interazione accessibili.',
        'Collaboration en équipe, JavaScript maintenable et modèles d’interaction accessibles.',
        'Colaboración en equipo, JavaScript mantenible y patrones de interacción accesibles.',
        'Bashkëpunim në ekip, JavaScript i mirëmbajtshëm dhe modele ndërveprimi të qasshme.',
        'Zämearbeit im Team, wartbare JavaScript und zugängliche Interaktionsmuster.',
        'Colaboração em equipa, JavaScript fácil de manter e padrões de interação acessíveis.'
      ),
      technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      repositories: [{ label: 'Source code', url: 'https://github.com/leo-rullani/join' }],
      liveUrl: 'https://leorullani.com/join/html/login.html'
    },
    {
      number: '06', name: 'El Pollo Loco', mark: 'PL',
      category: localized('2D browser game', '2D-Browsergame', 'Gioco 2D per browser', 'Jeu 2D dans le navigateur', 'Juego 2D para navegador', 'Lojë 2D në shfletues', '2D-Browsergame', 'Jogo 2D para navegador'),
      description: localized(
        'A lively jump-and-run game with animated characters, enemies, collectibles and collision logic.',
        'Ein lebendiges Jump-and-Run mit animierten Figuren, Gegnern, Sammelobjekten und Kollisionslogik.',
        'Un vivace gioco jump-and-run con personaggi animati, nemici, oggetti collezionabili e logica delle collisioni.',
        'Un jeu de plateforme dynamique avec personnages animés, ennemis, objets à collecter et gestion des collisions.',
        'Un dinámico juego de plataformas con personajes animados, enemigos, coleccionables y lógica de colisiones.',
        'Lojë dinamike jump-and-run me personazhe të animuara, armiq, objekte për t’u mbledhur dhe logjikë përplasjesh.',
        'Es lebendigs Jump-and-Run mit animierte Figure, Gegner, Sammelobjekt und Kollisionslogik.',
        'Um jogo de plataformas dinâmico com personagens animadas, inimigos, objetos colecionáveis e lógica de colisões.'
      ),
      learning: localized(
        'Object-oriented JavaScript, canvas rendering, game loops and responsive controls.',
        'Objektorientiertes JavaScript, Canvas-Rendering, Game-Loops und responsive Steuerung.',
        'JavaScript orientato agli oggetti, rendering Canvas, game loop e controlli responsive.',
        'JavaScript orienté objet, rendu Canvas, boucles de jeu et commandes responsives.',
        'JavaScript orientado a objetos, renderizado Canvas, bucles de juego y controles responsive.',
        'JavaScript i orientuar në objekte, renderim Canvas, cikle loje dhe kontrolle responsive.',
        'Objektorientierts JavaScript, Canvas-Rendering, Game-Loops und responsive Steuerig.',
        'JavaScript orientado a objetos, renderização Canvas, ciclos de jogo e controlos responsivos.'
      ),
      technologies: ['JavaScript', 'OOP', 'Canvas', 'HTML', 'CSS'],
      repositories: [{ label: 'Source code', url: 'https://github.com/leo-rullani/el_pollo_loco' }],
      liveUrl: 'https://leorullani.com/el_pollo_loco/'
    }
  ];

  previewUrl(mark: string): string {
    const extension = mark === 'VF' || mark === 'BK' ? 'svg' : 'webp';
    return `assets/img/projects/${mark.toLowerCase()}.${extension}`;
  }
  isPrivateRepository(projectName: string): boolean {
    return projectName === 'Collectrra' || projectName === 'BBM Kanban';
  }
  repositoryLabel(label: string, isPrivate = false): string {
    const translatedLabel = label === 'Source code'
      ? this.copy[this.activeLang].sourceCodeLabel
      : label;
    return isPrivate
      ? `${translatedLabel} · ${this.copy[this.activeLang].privateLabel}`
      : translatedLabel;
  }

  toggleDetailsLabel(projectName: string): string {
    return this.copy[this.activeLang].toggleDetails(projectName);
  }

  previewAlt(projectName: string): string {
    return this.copy[this.activeLang].previewAlt(projectName);
  }

  repositoryAriaLabel(projectName: string, repositoryLabel: string, isPrivate = false): string {
    return this.copy[this.activeLang].openRepository(
      projectName,
      this.repositoryLabel(repositoryLabel, isPrivate)
    );
  }

  liveDemoAriaLabel(projectName: string): string {
    return this.copy[this.activeLang].openLiveDemo(projectName);
  }

  rememberHorizontalPosition(): void {
    if (window.innerWidth <= 800) return;
    const container = this.scrollEl?.nativeElement;
    if (container) this.horizontalScrollPosition = container.scrollLeft;
  }

  keepHorizontalPosition(): void {
    const container = this.scrollEl?.nativeElement;
    const scrollLeft = this.horizontalScrollPosition ?? container?.scrollLeft;
    this.horizontalScrollPosition = null;
    if (!container || scrollLeft === undefined || window.innerWidth <= 800) return;

    const previousScrollBehavior = container.style.scrollBehavior;
    container.style.scrollBehavior = 'auto';
    container.scrollLeft = scrollLeft;
    requestAnimationFrame(() => {
      container.scrollLeft = scrollLeft;
      container.style.scrollBehavior = previousScrollBehavior;
    });
  }

  scrollNext(): void {
    const container = this.scrollEl?.nativeElement;
    container?.scrollTo({ left: container.scrollLeft + window.innerWidth, top: 0, behavior: 'smooth' });
  }
}
