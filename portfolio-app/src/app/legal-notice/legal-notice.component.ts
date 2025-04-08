import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent {

  constructor(private router: Router) {}

  /**
   * Klick auf den dunklen Overlay-Hintergrund -> Schließen
   */
  closeOverlay(event: MouseEvent) {
    // Nur wenn man wirklich die overlay-Box selbst anklickt,
    // nicht overlay-content => navigate("/")
    if (event.target === event.currentTarget) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Klick auf den X-Button
   * -> Schließt Overlay => navigate to "/"
   */
  closeOnX(event: MouseEvent) {
    // optional, falls du den RouterLink komplett via TS steuern willst
    event.preventDefault();
    this.router.navigate(['/']);
  }
}
