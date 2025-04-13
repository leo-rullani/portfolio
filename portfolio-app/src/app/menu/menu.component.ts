import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,

  // Wichtig: CommonModule importieren, damit [ngClass] etc. funktionieren!
  imports: [CommonModule],

  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  // Steuert das Overlay im Mobile
  isOverlayOpen = false;

  // Burger klick => Overlay an/aus
  toggleMenu(): void {
    this.isOverlayOpen = !this.isOverlayOpen;
  }

  /**
   * 1) Why me -> about-me (Index 1)
   */
  scrollToAboutMe(): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;
    container.scrollTo({
      left: 1 * window.innerWidth,
      behavior: 'smooth'
    });
  }

  /**
   * 2) Skills -> skill-set (Index 2)
   */
  scrollToSkills(): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;
    container.scrollTo({
      left: 2 * window.innerWidth,
      behavior: 'smooth'
    });
  }

  /**
   * 3) My Work -> my-work (Index 3)
   */
  scrollToMyWork(): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;
    container.scrollTo({
      left: 3 * window.innerWidth,
      behavior: 'smooth'
    });
  }

  /**
   * 4) Contact -> contact-me (Index 5)
   */
  scrollToContact(): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;
    container.scrollTo({
      left: 5 * window.innerWidth,
      behavior: 'smooth'
    });
  }

  // =========================================================
  // Die Klick-Handler im Overlay, damit sich das Overlay
  // nach dem Scroll wieder schließt
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
