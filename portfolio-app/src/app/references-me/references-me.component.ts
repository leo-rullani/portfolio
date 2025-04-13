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

  // Erlaubt dem Parent, ein ElementRef zu übergeben
  // => <references-me [scrollEl]="scrollContainerRef"></references-me>
  @Input() scrollEl?: ElementRef<HTMLDivElement>;

  // Falls du zusätzlich einen lokalen ViewChild nutzen willst:
  @ViewChild('localScrollEl', { static: true })
  localScrollEl!: ElementRef<HTMLDivElement>;

  scrollNext(): void {
    // Wenn du den vom Eltern übergebenen Container scrollen willst:
    if (this.scrollEl?.nativeElement) {
      this.scrollEl.nativeElement.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    } else {
      console.warn('No scrollEl or no nativeElement found!');
    }

    // ODER falls du lieber den lokalen Container scrolst:
    // if (this.localScrollEl?.nativeElement) {
    //   this.localScrollEl.nativeElement.scrollBy({
    //     left: 300,
    //     behavior: 'smooth'
    //   });
    // }
  }
}
