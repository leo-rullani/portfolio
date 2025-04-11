import { Component, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-work',
  standalone: true,
  // Hier fügst du CommonModule zu den imports hinzu:
  imports: [
    CommonModule
  ],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})
export class MyWorkComponent {
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  // Booleans für Show/Hide
  isProject1Expanded = false;
  isProject2Expanded = false;

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

  toggleExpandCard1() {
    this.isProject1Expanded = !this.isProject1Expanded;
  }

  toggleExpandCard2() {
    this.isProject2Expanded = !this.isProject2Expanded;
  }
}
