import { Component, Input, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'contact-me',
  standalone: true,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
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

    // ❗ Geändert: Statt nur um 1 Viewportbreite scrollen → Ganz nach links
    this.scrollEl.nativeElement.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
