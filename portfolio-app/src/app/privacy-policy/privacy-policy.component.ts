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

  // Schließt das Overlay, wenn man "hinter" das Modal klickt
  closeOverlay(event: MouseEvent) {
    // Check: Klick nur auslösen, wenn man wirklich auf div.overlay geklickt hat,
    // nicht auf ein Kind-Element:
    if (event.target === event.currentTarget) {
      // Zur Startseite oder gewünschten Route navigieren:
      this.router.navigate(['/']);
    }
  }

  // Schließt per X-Button
  closeOnX(event: MouseEvent) {
    event.preventDefault();
    this.router.navigate(['/']);
  }
}
