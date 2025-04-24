import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'about-me',
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  @Input() activeLang: 'DE' | 'EN' = 'EN';
  @Input() scrollEl!: ElementRef<HTMLDivElement>;
  text = {
    EN: {
      verticalTitle: 'Why me',
      paragraphs: [
        `My passion for development started on the sidelines of football stadiums – not with the ball, but with code. Designing and programming real-time TV graphics for live football broadcasts sparked my fascination for frontend engineering. Today, I combine my experience in graphics, data, and UI to build clean, scalable, and visually striking digital products.`,
        `Armed with a Master’s in Data Science and a Bachelor’s in Business Economics Major Sportmanagement, I thrive at the intersection of creativity and analytics. As the Team Lead Graphics and Software Engineer at BBM Productions, I’m driven by bridging bold ideas with rock-solid code—bringing data-driven visuals to life for audiences around the globe. From advanced 3D animations to interactive dashboards, I believe in shaping solutions that not only perform seamlessly, but also captivate and inspire.`,
        `For me, innovation is more than just adopting the latest technology—it’s about challenging the status quo and pushing boundaries. Every new project is an opportunity to learn, grow, and craft experiences that resonate with users, whether they’re on the pitch or in the boardroom. That relentless curiosity is what keeps me passionate about engineering every single day.`
      ],
      iAmTitle: 'I am',
      location: 'Wohlen, Switzerland',
      remote: 'open to work remote',
      relocate: 'open to relocate',
      contactButton: 'Contact me'
    },
    DE: {
      verticalTitle: 'Warum ich',
      paragraphs: [
        `Meine Leidenschaft für Software begann am Rand von Fußballstadien – nicht mit dem Ball, sondern mit Code. Das Entwickeln von Echtzeit-TV-Grafiken für Live-Fußballübertragungen entfachte meine Begeisterung für Frontend-Engineering. Heute verbinde ich Erfahrung in Grafik, Daten und UI, um schlanke, skalierbare und optisch ansprechende digitale Produkte zu bauen.`,
        `Mit einem Master in Data Science und einem Bachelor in Business Economics (Sportmanagement) liebe ich die Schnittstelle von Kreativität und Analytik. Als Team Lead Graphics und Software Engineer bei BBM Productions setze ich mutige Ideen mit solidem Code um und erwecke datengesteuerte Visuals weltweit zum Leben. Von 3D-Animationen bis zu interaktiven Dashboards – ich glaube an Lösungen, die reibungslos funktionieren und gleichzeitig inspirieren.`,
        `Für mich bedeutet Innovation mehr als nur den Einsatz neuer Technologien – es geht darum, bestehende Grenzen zu hinterfragen und zu verschieben. Jedes neue Projekt bietet die Chance, zu lernen, zu wachsen und Erlebnisse zu schaffen, die bei den Nutzern Anklang finden, ob auf dem Spielfeld oder im Konferenzraum. Diese Neugier treibt mich täglich im Engineering voran.`
      ],
      iAmTitle: 'Ich bin',
      location: 'Wohlen, Schweiz',
      remote: 'offen für Remote-Arbeit',
      relocate: 'umzugsbereit',
      contactButton: 'Kontaktiere mich'
    }
  };

  scrollNext() {
    if (!this.scrollEl?.nativeElement) return;
    this.scrollEl.nativeElement.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  }

  scrollToContact() {
    if (!this.scrollEl?.nativeElement) return;
    const cSlide=document.getElementById('contact-me-slide');
    if(!cSlide){console.warn('No element with ID="contact-me-slide" found.');return;}
    if(window.innerWidth<800){
      cSlide.scrollIntoView({behavior:'smooth',block:'start'});
    }else{
      const cRect=this.scrollEl.nativeElement.getBoundingClientRect();
      const tRect=cSlide.getBoundingClientRect();
      const s=this.scrollEl.nativeElement.scrollLeft;
      this.scrollEl.nativeElement.scrollTo({left:(tRect.left-cRect.left)+s,behavior:'smooth'});
    }
  }
}
