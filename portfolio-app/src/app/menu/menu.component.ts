import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  // Wichtig: CommonModule importieren, damit [ngClass], *ngIf usw. funktionieren
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  /**
   * Globale Sprache vom Parent (z. B. AppComponent)
   *
   * @example
   *   <app-menu [activeLang]="activeLang" (activeLangChange)="activeLang=$event"></app-menu>
   */
  @Input() activeLang: 'DE' | 'EN' = 'EN';

  /**
   * Emitter, damit wir im Menu die Sprache umschalten können,
   * welche dann im Parent ankommt.
   */
  @Output() activeLangChange = new EventEmitter<'DE' | 'EN'>();

  // Steuert das Overlay (Mobile Burger-Menü)
  isOverlayOpen = false;

  // Mehrsprachige Texte
  text = {
    EN: {
      navWhyMe: 'Why me',
      navSkills: 'Skills',
      navMyWork: 'My Work',
      navContact: 'Contact',
      mobileSkillSet: 'My Skill Set',
      mobileContact: 'Contact me'
    },
    DE: {
      navWhyMe: 'Warum ich',
      navSkills: 'Skills',
      navMyWork: 'Projekte',
      navContact: 'Kontakt',
      mobileSkillSet: 'Meine Skills',
      mobileContact: 'Kontaktiere mich'
    }
  };

  /**
   * Burger klick => Overlay an/aus
   */
  toggleMenu(): void {
    this.isOverlayOpen = !this.isOverlayOpen;
  }

  /**
   * Sprache umschalten => Emitter
   */
  changeLang(lang: 'DE' | 'EN'): void {
    this.activeLang = lang;
    this.activeLangChange.emit(lang);
  }

  /**
   * Scroll im Desktop (horizontales Layout)
   */
  private scrollDesktop(index: number): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;

    container.scrollTo({
      left: index * window.innerWidth,
      behavior: 'smooth'
    });
  }

  /**
   * Scroll im Mobile (vertikales Layout) => per ID direkt hin
   */
  private scrollMobile(slideId: string): void {
    const el = document.getElementById(slideId);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /**
   * Helfer => wähle Desktop vs. Mobile
   */
  private handleScroll(index: number, slideId: string): void {
    if (window.innerWidth >= 800) {
      // Desktop => horizontale Slides
      this.scrollDesktop(index);
    } else {
      // Mobile => vertikal per ID
      this.scrollMobile(slideId);
    }
  }

  // =========== Menü-Klick-Methoden (Desktop) ===========

  // 1) Why me -> about-me => Desktop(Index=1), Mobile(ID="about-me-slide")
  scrollToAboutMe(): void {
    this.handleScroll(1, 'about-me-slide');
  }

  // 2) Skills => skill-set => Desktop(Index=2), Mobile(ID="skill-set-slide")
  scrollToSkills(): void {
    this.handleScroll(2, 'skill-set-slide');
  }

  // 3) My Work => my-work => Desktop(Index=3), Mobile(ID="my-work-slide")
  scrollToMyWork(): void {
    this.handleScroll(3, 'my-work-slide');
  }

  // 4) Contact => send-mail => Desktop(Index=5), Mobile(ID="send-mail-slide")
  scrollToContact(): void {
    this.handleScroll(5, 'send-mail-slide');
  }

  // =========================================================
  // Mobile-Overlay-Methoden => Schließt Overlay nach Klick
  // =========================================================

  onWhyMe(): void {
    this.scrollToAboutMe();
    this.isOverlayOpen = false;
  }

  onSkillSet(): void {
    this.scrollToSkills();
    this.isOverlayOpen = false;
  }

  onMyWork(): void {
    this.scrollToMyWork();
    this.isOverlayOpen = false;
  }

  onContact(): void {
    this.scrollToContact();
    this.isOverlayOpen = false;
  }
}
