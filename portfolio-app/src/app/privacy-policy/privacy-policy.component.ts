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
   * Wird aufgerufen, wenn man auf den dunklen Overlay-Hintergrund klickt.
   * Falls man NICHT auf den Inhalt klickt, navigieren wir zurück zur Startseite ("/").
   */
  closeOverlay(event: MouseEvent) {
    // Wenn genau das Overlay (event.currentTarget) angeklickt wurde
    // und nicht das Kind-Element (.overlay-content), dann navigate nach "/"
    if (event.target === event.currentTarget) {
      this.router.navigate(['/']);
    }
  }
}
