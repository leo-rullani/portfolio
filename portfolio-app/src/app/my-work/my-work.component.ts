import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'my-work',
  standalone: true,
  imports: [],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss' // Falls dein Setup nicht styleUrls akzeptiert
})
export class MyWorkComponent {

  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  scrollNext() {
    if (!this.scrollEl?.nativeElement) {
      console.warn('No nativeElement on scrollEl');
      return;
    }
    this.scrollEl.nativeElement.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth'
    });
  }
}
