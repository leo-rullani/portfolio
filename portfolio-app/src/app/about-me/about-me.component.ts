import { Component } from '@angular/core';

@Component({
  selector: 'about-me',
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  scrollNext() {
    window.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth'
    });
  }
}
