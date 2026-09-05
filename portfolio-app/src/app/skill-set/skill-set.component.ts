import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';

type Language = 'DE' | 'EN';
interface Skill { name: string; icon?: string; symbol?: string; }
interface SkillGroup { title: Record<Language, string>; skills: Skill[]; }

@Component({ selector: 'skill-set', standalone: true, imports: [CommonModule], templateUrl: './skill-set.component.html', styleUrls: ['./skill-set.component.scss'] })
export class SkillSetComponent {
  @Input() activeLang: Language = 'EN';
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  readonly copy = {
    EN: { eyebrow: 'Technology stack', title: 'My Skill Set', intro: 'I build complete web experiences — from accessible, responsive interfaces to secure REST APIs and data-driven backend services. My toolkit combines frontend craft with a growing focus on Python, Django and reliable infrastructure.', talk: `Let's talk` },
    DE: { eyebrow: 'Technologie-Stack', title: 'Meine Fähigkeiten', intro: 'Ich entwickle vollständige Web-Erlebnisse — von zugänglichen, responsiven Interfaces bis zu sicheren REST-APIs und datengetriebenen Backend-Services. Mein Werkzeugkasten verbindet Frontend-Handwerk mit einem wachsenden Fokus auf Python, Django und zuverlässige Infrastruktur.', talk: 'Lass uns reden' }
  };

  readonly groups: SkillGroup[] = [
    { title: { EN: 'Frontend', DE: 'Frontend' }, skills: [
      { name: 'Angular', icon: 'angular' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML', icon: 'html5' }, { name: 'CSS / SCSS', icon: 'css' }, { name: 'Material Design', symbol: 'M' }
    ]},
    { title: { EN: 'Backend & Data', DE: 'Backend & Daten' }, skills: [
      { name: 'Python', icon: 'python' }, { name: 'Django', icon: 'django' }, { name: 'REST API', symbol: 'API' },
      { name: 'SQL', symbol: 'DB' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Redis', icon: 'redis' }
    ]},
    { title: { EN: 'Tools & Infrastructure', DE: 'Tools & Infrastruktur' }, skills: [
      { name: 'Docker', icon: 'docker' }, { name: 'Linux', icon: 'linux' }, { name: 'Git', icon: 'git' },
      { name: 'Firebase', icon: 'firebase' }, { name: 'Cloud Fundamentals', symbol: '☁' }, { name: 'Scrum', symbol: '↻' }
    ]}
  ];

  scrollNext(): void { this.scrollEl?.nativeElement?.scrollBy({ left: window.innerWidth, behavior: 'smooth' }); }
  scrollToContact(): void { document.getElementById('contact-me-slide')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
