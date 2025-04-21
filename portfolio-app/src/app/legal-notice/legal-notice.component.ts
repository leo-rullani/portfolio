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
