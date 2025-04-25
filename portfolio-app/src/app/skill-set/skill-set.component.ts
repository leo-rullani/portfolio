import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'skill-set',
  standalone: true,
  imports: [],
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss']
})
export class SkillSetComponent {
  @Input() activeLang: 'DE' | 'EN' = 'EN';
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  text = {
    EN: {
      verticalTitle: 'My Skill Set',
      intro:
        `Over the years, I’ve leveraged a broad spectrum of front-end frameworks and libraries, consistently seeking out new methods to refine both design and functionality. By working on a range of projects—from real-time dashboards to interactive single-page applications—I’ve cultivated a mindset that values adaptability, performance, and visual polish. My ability to quickly absorb emerging tools and seamlessly integrate them into evolving codebases not only demonstrates my technical proficiency but also highlights my commitment to delivering modern, user-focused solutions.`,
      iconAngular: 'Angular',
      iconTypeScript: 'TypeScript',
      iconJavaScript: 'JavaScript',
      iconHtml: 'HTML',
      iconCss: 'CSS',
      iconRestApi: 'Rest-Api',
      iconFirebase: 'Firebase',
      iconGit: 'GIT',
      iconScrum: 'Scrum',
      iconMaterial: 'Material\nDesign',
      iconChallengeMe: 'Challenge\nMe',
      challengeText:
        `Lately, I’ve immersed myself in more specialized areas, such as fine-tuning large-scale component systems and orchestrating advanced state management for complex web applications.`,
      letsTalk: `Let's talk`
    },
    DE: {
      verticalTitle: 'Meine Fähigkeiten',
      intro:
        `Im Laufe der Jahre habe ich ein breites Spektrum an Frontend-Frameworks und Bibliotheken genutzt, stets auf der Suche nach neuen Methoden, um Design und Funktionalität zu verfeinern. Von Echtzeit-Dashboards bis hin zu interaktiven Single-Page-Anwendungen habe ich eine Denkweise entwickelt, die Anpassungsfähigkeit, Performance und optischen Feinschliff schätzt. Meine Fähigkeit, neue Tools schnell zu verinnerlichen und nahtlos in bestehende Codebasen zu integrieren, demonstriert nicht nur mein technisches Können, sondern auch mein Engagement, moderne, nutzerzentrierte Lösungen zu liefern.`,
      iconAngular: 'Angular',
      iconTypeScript: 'TypeScript',
      iconJavaScript: 'JavaScript',
      iconHtml: 'HTML',
      iconCss: 'CSS',
      iconRestApi: 'REST-API',
      iconFirebase: 'Firebase',
      iconGit: 'GIT',
      iconScrum: 'Scrum',
      iconMaterial: 'Material\nDesign',
      iconChallengeMe: 'Challenge\nMe',
      challengeText:
        `In letzter Zeit habe ich mich auf spezialisierte Bereiche konzentriert, z. B. die Feinabstimmung groß angelegter Komponenten-Systeme und das Orchestrieren anspruchsvoller State-Management-Lösungen für komplexe Webanwendungen.`,
      letsTalk: `Lass uns reden`
    }
  };

  scrollNext() {
    if (!this.scrollEl?.nativeElement)
      return;

    this.scrollEl.nativeElement.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth'
    });
  }

  scrollToContact() {
    if (!this.scrollEl?.nativeElement)
      return;
    const contactSlide = document.getElementById('contact-me-slide');
    if (!contactSlide) {
      return;
    }
    if (window.innerWidth < 800) {
      contactSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
