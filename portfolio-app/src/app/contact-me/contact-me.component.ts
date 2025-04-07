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
    // Prüfen, ob wir tatsächlich den Container haben
    if (!this.scrollEl?.nativeElement) {
      console.warn('No nativeElement on scrollEl');
      return;
    }

    // Dann scrollen wir den Container um eine Bildschirmbreite NACH LINKS weiter
    this.scrollEl.nativeElement.scrollBy({
      left: -window.innerWidth,
      behavior: 'smooth'
    });
  }
}
