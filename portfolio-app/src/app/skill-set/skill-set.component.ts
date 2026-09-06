import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { Language, NAVIGATION_LABELS } from '../i18n/language';

interface Skill { name: string; icon?: string; symbol?: string; }
interface SkillGroup { title: Record<Language, string>; skills: Skill[]; }
interface SkillCopy { eyebrow: string; title: string; intro: string; talk: string; }

@Component({ selector: 'skill-set', standalone: true, imports: [CommonModule], templateUrl: './skill-set.component.html', styleUrls: ['./skill-set.component.scss'] })
export class SkillSetComponent {
  readonly navigationLabels = NAVIGATION_LABELS;
  @Input() activeLang: Language = 'EN';
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  readonly copy: Record<Language, SkillCopy> = {
    EN: { eyebrow: 'Technology stack', title: 'My Skill Set', intro: 'I build complete web experiences — from accessible, responsive interfaces to secure REST APIs and data-driven backend services. My toolkit combines frontend craft with a growing focus on Python, Django and reliable infrastructure.', talk: `Let's talk` },
    DE: { eyebrow: 'Technologie-Stack', title: 'Meine Fähigkeiten', intro: 'Ich entwickle vollständige Web-Erlebnisse — von zugänglichen, responsiven Interfaces bis zu sicheren REST-APIs und datengetriebenen Backend-Services. Mein Werkzeugkasten verbindet Frontend-Handwerk mit einem wachsenden Fokus auf Python, Django und zuverlässige Infrastruktur.', talk: 'Lass uns reden' },
    IT: { eyebrow: 'Stack tecnologico', title: 'Le mie competenze', intro: 'Sviluppo esperienze web complete — da interfacce accessibili e responsive ad API REST sicure e servizi backend basati sui dati. Il mio toolkit unisce la cura del frontend a una solida attenzione per Python, Django e infrastrutture affidabili.', talk: 'Parliamone' },
    FR: { eyebrow: 'Stack technique', title: 'Mes compétences', intro: 'Je développe des expériences web complètes — des interfaces accessibles et responsives aux API REST sécurisées et aux services backend pilotés par les données. Ma boîte à outils associe le soin apporté au frontend à un intérêt croissant pour Python, Django et les infrastructures fiables.', talk: 'Échangeons' },
    ES: { eyebrow: 'Stack tecnológico', title: 'Mis competencias', intro: 'Desarrollo experiencias web completas — desde interfaces accesibles y responsive hasta API REST seguras y servicios backend basados en datos. Mi conjunto de herramientas combina el cuidado del frontend con una sólida atención a Python, Django y las infraestructuras fiables.', talk: 'Hablemos' },
    SQ: { eyebrow: 'Stacku teknologjik', title: 'Aftësitë e mia', intro: 'Ndërtoj përvoja të plota web — nga ndërfaqet e qasshme dhe responsive te API-të REST të sigurta dhe shërbimet backend të bazuara në të dhëna. Mjetet e mia ndërthurin kujdesin për frontend-in me fokus të fortë në Python, Django dhe infrastrukturë të besueshme.', talk: 'Të bisedojmë' },
    GSW: { eyebrow: 'Technologie-Stack', title: 'Mini Skills', intro: 'Ich entwickle kompletti Web-Erlebnis — vo zugängliche, responsive Interfaces bis zu sichere REST-APIs und datebasierte Backend-Services. Mis Toolkit verbindet saubers Frontend-Handwerk mit eme starke Fokus uf Python, Django und zuverlässigi Infrastruktur.', talk: 'Lömmer rede' },
    PT: { eyebrow: 'Stack tecnológico', title: 'As minhas competências', intro: 'Desenvolvo experiências web completas — desde interfaces acessíveis e responsivas a APIs REST seguras e serviços backend orientados por dados. O meu conjunto de ferramentas combina o cuidado no frontend com um foco crescente em Python, Django e infraestruturas fiáveis.', talk: 'Vamos conversar' }
  };

  readonly groups: SkillGroup[] = [
    { title: { EN: 'Frontend', DE: 'Frontend', IT: 'Frontend', FR: 'Frontend', ES: 'Frontend', SQ: 'Frontend', GSW: 'Frontend', PT: 'Frontend' }, skills: [
      { name: 'Angular', icon: 'angular' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML', icon: 'html5' }, { name: 'CSS / SCSS', icon: 'css' }, { name: 'Material Design', symbol: 'M' }
    ]},
    { title: { EN: 'Backend & Data', DE: 'Backend & Daten', IT: 'Backend e dati', FR: 'Backend et données', ES: 'Backend y datos', SQ: 'Backend dhe të dhëna', GSW: 'Backend & Date', PT: 'Backend e dados' }, skills: [
      { name: 'Python', icon: 'python' }, { name: 'Django', icon: 'django' }, { name: 'REST API', symbol: 'API' },
      { name: 'SQL', symbol: 'DB' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Redis', icon: 'redis' }
    ]},
    { title: { EN: 'Tools & Infrastructure', DE: 'Tools & Infrastruktur', IT: 'Strumenti e infrastruttura', FR: 'Outils et infrastructure', ES: 'Herramientas e infraestructura', SQ: 'Mjete dhe infrastrukturë', GSW: 'Tools & Infrastruktur', PT: 'Ferramentas e infraestrutura' }, skills: [
      { name: 'Docker', icon: 'docker' }, { name: 'Linux', icon: 'linux' }, { name: 'Git', icon: 'git' },
      { name: 'Firebase', icon: 'firebase' }, { name: 'Cloud Fundamentals', symbol: '☁' }, { name: 'Scrum', symbol: '↻' }
    ]}
  ];

  scrollNext(): void {
    const container = this.scrollEl?.nativeElement;
    container?.scrollTo({ left: container.scrollLeft + window.innerWidth, top: 0, behavior: 'smooth' });
  }
  scrollToContact(): void {
    const container = this.scrollEl?.nativeElement;
    const contactSlide = document.getElementById('contact-me-slide');
    if (!contactSlide) return;

    if (window.innerWidth <= 800 || !container) {
      contactSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = contactSlide.getBoundingClientRect();
    container.scrollTo({
      left: container.scrollLeft + targetRect.left - containerRect.left,
      top: 0,
      behavior: 'smooth'
    });
  }
}
