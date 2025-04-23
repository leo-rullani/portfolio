import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() activeLang: 'DE' | 'EN' = 'EN';
  @Output() activeLangChange = new EventEmitter<'DE' | 'EN'>();

  isOverlayOpen = false;
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

  toggleMenu(): void {
    this.isOverlayOpen = !this.isOverlayOpen;
  }

  changeLang(lang: 'DE' | 'EN'): void {
    this.activeLang = lang;
    this.activeLangChange.emit(lang);
  }

  /**
   * Desktop: Scroll X => index * window.innerWidth
   * Mobile: Scroll Y => #elementID
   */
  private scrollDesktop(index: number): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;

    container.scrollTo({
      left: index * window.innerWidth,
      behavior: 'smooth'
    });
  }

  private scrollMobile(slideId: string): void {
    const el = document.getElementById(slideId);
    if (!el) return;

    // offsetY => um z.B. 50px nach oben
    const offsetY = -50;
    const elementTop = el.getBoundingClientRect().top + window.scrollY + offsetY;
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  }

  private handleScroll(index: number, slideId: string): void {
    if (window.innerWidth >= 800) {
      this.scrollDesktop(index);
    } else {
      this.scrollMobile(slideId);
    }
  }

  scrollToAboutMe(): void {
    // Slide #1 => about-me-slide
    this.handleScroll(1, 'about-me-slide');
  }

  scrollToSkills(): void {
    // Slide #2 => skill-set-slide
    this.handleScroll(2, 'skill-set-slide');
  }

  scrollToMyWork(): void {
    // Slide #3 => my-work-slide
    this.handleScroll(3, 'my-work-slide');
  }

  scrollToContact(): void {
    // Slide #5 => send-mail-slide or contact-me?
    // Du hattest #send-mail-slide in code?
    // => we keep #5
    this.handleScroll(5, 'contact-me-slide');
  }

  // Mobile-Overlay version
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
