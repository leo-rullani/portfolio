import { Component, ElementRef, Input, ViewChild } from '@angular/core';
// ACHTUNG: CommonModule ist wichtig für ngClass, ngIf etc.
import { CommonModule } from '@angular/common';

@Component({
  selector: 'references-me',
  standalone: true,
  // CommonModule importieren => kein Fehler mehr bei [ngClass] & Co
  imports: [CommonModule],
  templateUrl: './references-me.component.html',
  styleUrls: ['./references-me.component.scss']
})
export class ReferencesMeComponent {

  /**
   * Erlaubt dem Parent, ein ElementRef<HTMLDivElement> zu übergeben
   * Beispiel:
   * <references-me [scrollEl]="scrollContainerRef"></references-me>
   *
   * Falls du das nicht brauchst, kannst du @Input() gerne entfernen.
   */
  @Input() scrollEl?: ElementRef<HTMLDivElement>;

  /**
   * Lokaler ViewChild für <div class="references-container" #localScrollEl>
   * Im Template-HTML:
   * <div class="references-container" #localScrollEl> ... </div>
   */
  @ViewChild('localScrollEl', { static: true })
  localScrollEl!: ElementRef<HTMLDivElement>;

  /**
   * Pfeil (click)="scrollNext()"
   * -> Scrollt wahlweise den per [scrollEl] übergebenen Container
   *    oder den lokalen Container.
   */
  scrollNext(): void {
    // 1) Falls du den vom Eltern übergebenen Container scrollen willst:
    if (this.scrollEl?.nativeElement) {
      this.scrollEl.nativeElement.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
    else {
      // 2) Ansonsten versuche den lokalen Container zu scrollen:
      if (this.localScrollEl?.nativeElement) {
        this.localScrollEl.nativeElement.scrollBy({
          left: 300,
          behavior: 'smooth'
        });
      } else {
        console.warn('No localScrollEl or scrollEl found!');
      }
    }
  }
}
