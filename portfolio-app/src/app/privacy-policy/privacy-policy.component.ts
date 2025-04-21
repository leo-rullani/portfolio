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

  closeOverlay(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.router.navigate(['/']);
    }
  }

  closeOnX(event: MouseEvent) {
    event.preventDefault();
    this.router.navigate(['/']);
  }
}
