import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  scrollNext() {
    window.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth'
    });
  }
}
