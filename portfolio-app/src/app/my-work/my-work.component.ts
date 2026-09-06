import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';

type Language = 'DE' | 'EN';
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

@Component({ selector: 'my-work', standalone: true, imports: [CommonModule], templateUrl: './my-work.component.html', styleUrl: './my-work.component.scss' })
export class MyWorkComponent {
  @Input() activeLang: Language = 'EN';
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  private horizontalScrollPosition: number | null = null;

  readonly copy = {
    EN: { verticalTitle: 'My Work', eyebrow: 'Selected projects', intro: 'From focused browser experiences to complete REST platforms — built with attention to clean interfaces, reliable APIs and thoughtful data handling.', about: 'About the project', learned: 'Focus & learning', live: 'Live demo', staticNote: 'Portfolio preview without live user data', safeDemoNote: 'Interactive browser demo · synthetic data stays on your device' },
    DE: { verticalTitle: 'Meine Arbeiten', eyebrow: 'Ausgewählte Projekte', intro: 'Von fokussierten Browser-Erlebnissen bis zu vollständigen REST-Plattformen — mit Blick auf klare Interfaces, zuverlässige APIs und einen bewussten Umgang mit Daten.', about: 'Über das Projekt', learned: 'Fokus & Erkenntnisse', live: 'Live-Demo', staticNote: 'Portfolio-Vorschau ohne echte Nutzerdaten', safeDemoNote: 'Interaktive Browser-Demo · synthetische Daten bleiben auf Ihrem Gerät' }
  };

  readonly projects: Project[] = [
    { number: '01', name: 'Collectrra', mark: 'CR', category: { EN: 'Full-stack collecting platform', DE: 'Full-Stack-Sammelplattform' }, description: { EN: 'A social platform for trading-card collectors with collections, albums, trades, marketplace, messaging and privacy-aware location discovery.', DE: 'Eine soziale Plattform für Trading-Card-Sammler mit Kollektionen, Alben, Tauschgeschäften, Marktplatz, Nachrichten und datenschutzbewusster Umgebungssuche.' }, learning: { EN: 'A large, domain-driven API with secure account flows, resilient demo providers, localisation and a dependency-free frontend.', DE: 'Eine umfangreiche, domänenorientierte API mit sicheren Account-Flows, robusten Demo-Providern, Lokalisierung und einem Frontend ohne Framework-Abhängigkeiten.' }, technologies: ['JavaScript', 'Django', 'DRF', 'JWT', 'PostgreSQL', 'Redis', 'Docker'], repositories: [{ label: 'Frontend', url: 'https://github.com/leo-rullani/collectrra_frontend' }, { label: 'Backend', url: 'https://github.com/leo-rullani/collectrra_backend' }], liveUrl: '/assets/demos/collectrra/index.html', safeDemo: true },
    { number: '02', name: 'VideoFlix', mark: 'VF', category: { EN: 'Video streaming platform', DE: 'Video-Streaming-Plattform' }, description: { EN: 'A Netflix-inspired application with account activation, secure cookie authentication and adaptive HLS video delivery.', DE: 'Eine von Netflix inspirierte Anwendung mit Account-Aktivierung, sicherer Cookie-Authentifizierung und adaptivem HLS-Videostreaming.' }, learning: { EN: 'Media processing with FFmpeg, background jobs, HLS delivery and secure authentication across a decoupled frontend and backend.', DE: 'Medienverarbeitung mit FFmpeg, Background-Jobs, HLS-Auslieferung und sichere Authentifizierung über getrenntes Frontend und Backend.' }, technologies: ['JavaScript', 'Django', 'DRF', 'JWT', 'Redis', 'PostgreSQL', 'FFmpeg'], repositories: [{ label: 'Frontend', url: 'https://github.com/leo-rullani/frontend_video-flix' }, { label: 'Backend', url: 'https://github.com/leo-rullani/backend_video-flix' }], liveUrl: '/assets/demos/videoflix/index.html', safeDemo: true },
    { number: '03', name: 'Quizly', mark: 'QZ', category: { EN: 'AI-assisted learning platform', DE: 'KI-gestützte Lernplattform' }, description: { EN: 'Turns YouTube videos into interactive quizzes through transcription and AI-assisted question generation.', DE: 'Verwandelt YouTube-Videos mithilfe von Transkription und KI-gestützter Fragengenerierung in interaktive Quizze.' }, learning: { EN: 'Orchestrating a media-to-quiz pipeline while keeping authentication and generated learning content manageable.', DE: 'Orchestrierung einer Media-to-Quiz-Pipeline bei gleichzeitig überschaubarer Authentifizierung und Verwaltung generierter Lerninhalte.' }, technologies: ['JavaScript', 'Django', 'DRF', 'Whisper', 'Gemini', 'FFmpeg', 'JWT'], repositories: [{ label: 'Frontend', url: 'https://github.com/leo-rullani/quizly-frontend' }, { label: 'Backend', url: 'https://github.com/leo-rullani/quizly-backend' }], liveUrl: '/assets/demos/quizly/index.html', safeDemo: true },
    { number: '04', name: 'BBM Kanban', mark: 'BK', category: { EN: 'Broadcast workflow board', DE: 'Kanban-Board für Broadcast-Workflows' }, description: { EN: 'A role-aware Kanban workspace for boards, tasks, comments and production-oriented collaboration.', DE: 'Ein rollenbasiertes Kanban-System für Boards, Aufgaben, Kommentare und produktionsorientierte Zusammenarbeit.' }, learning: { EN: 'RESTful CRUD design, object permissions and a modular vanilla JavaScript client connected to Django REST Framework.', DE: 'RESTful CRUD-Design, Objektberechtigungen und ein modularer Vanilla-JavaScript-Client mit Django REST Framework.' }, technologies: ['JavaScript', 'Django', 'DRF', 'Token Auth', 'REST API'], repositories: [{ label: 'Frontend', url: 'https://github.com/leo-rullani/bbm_kanban-frontend' }, { label: 'Backend', url: 'https://github.com/leo-rullani/bbm-kanban-backend' }], liveUrl: '/assets/demos/bbm/index.html', safeDemo: true },
    { number: '05', name: 'Join', mark: 'JN', category: { EN: 'Collaborative task manager', DE: 'Kollaborativer Task-Manager' }, description: { EN: 'A Kanban-inspired task manager with drag and drop, contacts and category-based organisation.', DE: 'Ein Kanban-inspirierter Task-Manager mit Drag & Drop, Kontakten und kategoriebasierter Organisation.' }, learning: { EN: 'Team collaboration, maintainable JavaScript and accessible interaction patterns.', DE: 'Teamarbeit, wartbares JavaScript und zugängliche Interaktionsmuster.' }, technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase'], repositories: [{ label: 'Source code', url: 'https://github.com/leo-rullani/join' }], liveUrl: 'https://leorullani.com/join/html/login.html' },
    { number: '06', name: 'El Pollo Loco', mark: 'PL', category: { EN: '2D browser game', DE: '2D-Browsergame' }, description: { EN: 'A lively jump-and-run game with animated characters, enemies, collectibles and collision logic.', DE: 'Ein lebendiges Jump-and-Run mit animierten Figuren, Gegnern, Sammelobjekten und Kollisionslogik.' }, learning: { EN: 'Object-oriented JavaScript, canvas rendering, game loops and responsive controls.', DE: 'Objektorientiertes JavaScript, Canvas-Rendering, Game-Loops und responsive Steuerung.' }, technologies: ['JavaScript', 'OOP', 'Canvas', 'HTML', 'CSS'], repositories: [{ label: 'Source code', url: 'https://github.com/leo-rullani/el_pollo_loco' }], liveUrl: 'https://leorullani.com/el_pollo_loco/' }
  ];

  previewUrl(mark: string): string {
    const extension = mark === 'VF' || mark === 'BK' ? 'svg' : 'webp';
    return `assets/img/projects/${mark.toLowerCase()}.${extension}`;
  }
  isPrivateRepository(projectName: string): boolean {
    return projectName === 'Collectrra' || projectName === 'BBM Kanban';
  }
  repositoryLabel(label: string, isPrivate = false): string {
    if (!isPrivate) return label;
    return this.activeLang === 'DE' ? `${label} · Privat` : `${label} · Private`;
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

  scrollNext(): void { this.scrollEl?.nativeElement?.scrollBy({ left: window.innerWidth, behavior: 'smooth' }); }
}
