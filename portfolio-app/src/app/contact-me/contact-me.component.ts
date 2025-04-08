import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'contact-me',
  standalone: true,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
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
