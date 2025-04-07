import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss' // <--- Falls dein Build "styleUrls" nicht unterstützt
})
export class MenuComponent {

  /**
   * 1) Why me -> about-me (Index 1)
   */
  scrollToAboutMe(): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;
    // Scroll auf Slide 1 (about-me)
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
    // Slide 2 (skill-set)
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
    // Slide 3 (my-work)
    container.scrollTo({
      left: 3 * window.innerWidth,
      behavior: 'smooth'
    });
  }

  /**
   * 4) Contact -> contact-me (Index 5, da 4 evtl. references?)
   */
  scrollToContact(): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;
    // Slide 5 (contact-me). Falls du references (Index 4) hast,
    // und contact-me ist 5.
    container.scrollTo({
      left: 5 * window.innerWidth,
      behavior: 'smooth'
    });
  }
}
