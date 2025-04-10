import { Component, Input, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router'; // <== NEU

@Component({
  selector: 'contact-me',
  standalone: true,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],

  // Wichtig: RouterLink in "imports"
  imports: [
    RouterLink
  ]
})
export class ContactMeComponent {

  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  scrollPrev() {
    if (!this.scrollEl?.nativeElement) {
      console.warn('No nativeElement on scrollEl');
      return;
    }
    /* Horizontales Scrollen: eine Viewportbreite nach links */
    this.scrollEl.nativeElement.scrollBy({
      left: -window.innerWidth,
      behavior: 'smooth'
    });
  }
}
