import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {

  constructor(private router: Router) {}

  /**
   * Klick auf den dunklen Overlay-Hintergrund -> Schließen
   */
  closeOverlay(event: MouseEvent) {
    // Nur wenn man wirklich die overlay-Box selbst anklickt,
    // NICHT overlay-content => navigate("/")
    if (event.target === event.currentTarget) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Klick auf den X-Button
   * -> Da wir außerdem "routerLink='/'" nutzen,
   *    navigiert Angular in jedem Fall zur Startseite.
   * Falls du manuell per TS navigieren willst,
   *    setze e.preventDefault() + this.router.navigate(['/']);
   */
  closeOnX(event: MouseEvent) {
    // Optional, falls du das Routing komplett im TS-Logik steuern willst:
    event.preventDefault();
    this.router.navigate(['/']);
  }
}
