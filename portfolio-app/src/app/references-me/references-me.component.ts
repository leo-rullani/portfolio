import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'references-me',
  standalone: true,
  imports: [],
  templateUrl: './references-me.component.html',
  styleUrls: ['./references-me.component.scss']
})
export class ReferencesMeComponent {

  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  scrollNext() {
    if (!this.scrollEl?.nativeElement) {
      console.warn('No nativeElement on scrollEl');
      return;
    }

    // Passe diesen Wert an die Breite deiner Boxen an,
    // damit jede Pfeil-Klick-Aktion genau eine Box weiter scrollt.
    this.scrollEl.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}
