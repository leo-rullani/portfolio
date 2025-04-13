import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'references-me',
  standalone: true,
  imports: [],
  templateUrl: './references-me.component.html',
  styleUrls: ['./references-me.component.scss']
})
export class ReferencesMeComponent {

  // Dient nur dazu, dass das [scrollEl] in app.component.html
  // keinen Angular-Compiler-Fehler wirft. Wir nutzen es hier
  // im Beispielcode NICHT aktiv, aber du könntest es verwenden.
  @Input() scrollEl: ElementRef<HTMLDivElement> | undefined;

  // Lokales Scroll-Element für die Referenzen (unverändert, nur umbenannt)
  @ViewChild('localScrollEl', { static: true })
  localScrollEl!: ElementRef<HTMLDivElement>;

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
