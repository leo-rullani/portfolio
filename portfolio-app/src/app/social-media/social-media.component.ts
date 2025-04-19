import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-social-media',
  standalone: true,
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  imports: []
})
export class SocialMediaComponent {

  // Aktuelle Sprache kommt vom Parent
  @Input() activeLang: 'DE' | 'EN' = 'EN';

  // Wenn sich die Sprache ändert, geben wir ein Event raus
  @Output() langChange = new EventEmitter<'DE'|'EN'>();

  changeLang(lang: 'DE' | 'EN'): void {
    // Optional: local anpassen, damit Buttons / CSS sich anpassen
    this.activeLang = lang;

    // Jetzt sagt SocialMedia dem Parent Bescheid:
    this.langChange.emit(lang);

    console.log(`Sprache gewechselt zu: ${lang}`);
  }
}
