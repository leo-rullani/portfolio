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
      role: 'Data Scientist · Software Engineer · Certified Full-Stack Developer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    DE: {
      role: 'Data Scientist · Softwareentwickler · Zertifizierter Full-Stack Developer',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    IT: {
      role: 'Data Scientist · Software Engineer · Full-Stack Developer certificato',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    FR: {
      role: 'Data Scientist · Ingénieur logiciel · Développeur Full-Stack certifié',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    ES: {
      role: 'Data Scientist · Ingeniero de software · Desarrollador Full-Stack certificado',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    SQ: {
      role: 'Data Scientist · Inxhinier softueri · Full-Stack Developer i certifikuar',
      name: 'Leo Rullani',
      location: 'Wohlen'
    },
    GSW: {
      role: 'Data Scientist · Software Engineer · Zertifizierte Full-Stack Developer',
      name: 'Leo Rullani',
      location: 'Wohle AG'
    },
    PT: {
      role: 'Data Scientist · Engenheiro de software · Full-Stack Developer certificado',
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
