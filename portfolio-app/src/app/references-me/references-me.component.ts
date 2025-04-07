import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'references-me',
  standalone: true,
  imports: [],
  templateUrl: './references-me.component.html',
  styleUrl: './references-me.component.scss'
})
export class ReferencesMeComponent {

  // 3) Wir erwarten, dass der Parent (AppComponent)
  // uns einen ElementRef<HTMLDivElement> übergibt
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  scrollNext() {
    // Prüfen, ob wir tatsächlich den Container haben
    if (!this.scrollEl?.nativeElement) {
      console.warn('No nativeElement on scrollEl');
      return;
    }

    // Dann scrollen wir den Container um eine Bildschirmbreite weiter
    this.scrollEl.nativeElement.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth'
    });
  }
}
