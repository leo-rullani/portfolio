import { Component, Input, ElementRef } from '@angular/core';
import { Language, NAVIGATION_LABELS } from '../i18n/language';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  readonly navigationLabels = NAVIGATION_LABELS;

  @Input() activeLang: Language = 'EN';

  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  readonly text: Record<Language, { role: string; name: string; location: string }> = {
    EN: {
      role: 'Data Scientist · Full-Stack Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    DE: {
      role: 'Data Scientist · Full-Stack Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    IT: {
      role: 'Data Scientist · Full-Stack Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    FR: {
      role: 'Data Scientist · Full-Stack Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    ES: {
      role: 'Data Scientist · Full-Stack Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    SQ: {
      role: 'Data Scientist · Full-Stack Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    GSW: {
      role: 'Data Scientist · Full-Stack Engineer',
      name: 'Leo Rullani',
      location: 'Wohle AG'
    },
    PT: {
      role: 'Data Scientist · Full-Stack Engineer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    }
  };

  scrollNext() {
    if (!this.scrollEl?.nativeElement) {
      return;
    }

    const distance = this.scrollEl.nativeElement.offsetWidth;
    this.scrollEl.nativeElement.scrollTo({
      left: this.scrollEl.nativeElement.scrollLeft + distance,
      top: 0,
      behavior: 'smooth'
    });
  }
}
