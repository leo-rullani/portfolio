import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-social-media',
  standalone: true,
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  imports: []
})
export class SocialMediaComponent {

  @Input() activeLang: 'DE' | 'EN' = 'EN';

  @Output() langChange = new EventEmitter<'DE'|'EN'>();

  changeLang(lang: 'DE' | 'EN'): void {
    this.activeLang = lang;
    this.langChange.emit(lang);

    console.log(`Sprache gewechselt zu: ${lang}`);
  }
}
