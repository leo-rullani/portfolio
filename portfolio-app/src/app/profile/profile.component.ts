import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  // Vom Parent (z. B. app.component) übergebene Sprache
  @Input() activeLang: 'DE' | 'EN' = 'EN';

  // 3) Wir erwarten, dass der Parent (AppComponent)
  // uns einen ElementRef<HTMLDivElement> übergibt
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  /**
   * Einfaches Übersetzungs-Objekt
   * role, name, location => auf Deutsch und Englisch.
   */
  text = {
    EN: {
      role: 'Software Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    DE: {
      role: 'Software-Ingenieur',
      name: 'Leo Rullani',
      location: 'Wohlen'
    }
  };

  scrollNext() {
    // Prüfen, ob wir tatsächlich den Container haben
    if (!this.scrollEl?.nativeElement) {
      console.warn('No nativeElement on scrollEl');
      return;
    }

    // Dann scrollen wir den Container um eine Bildschirmbreite weiter
    this.scrollEl.nativeElement.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth'
    });
  }
}
