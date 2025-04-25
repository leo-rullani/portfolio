import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @Input() activeLang: 'DE' | 'EN' = 'EN';

  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  text = {
    EN: {
      role: 'Software Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    DE: {
      role: 'Software-Entwickler',
      name: 'Leo Rullani',
      location: 'Wohlen'
    }
  };

  scrollNext() {
    if (!this.scrollEl?.nativeElement) {
      return;
    }

    const distance = this.scrollEl.nativeElement.offsetWidth;
    this.scrollEl.nativeElement.scrollBy({
      left: distance,
      behavior: 'smooth'
    });
  }
}
