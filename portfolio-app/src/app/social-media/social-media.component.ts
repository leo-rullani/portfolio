import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent {
  activeLang: 'DE' | 'EN' = 'EN';

  changeLang(lang: 'DE' | 'EN'): void {
    this.activeLang = lang;
    // Hier kannst du zusätzlich deinen i18n-Service aufrufen,
    // z.B. this.translateService.use(lang);
    // oder weitere Aktionen durchführen
    console.log(`Sprache gewechselt zu: ${lang}`);
  }
}
