import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  getLanguageOption,
  isLanguage,
  Language,
  LANGUAGE_OPTIONS
} from '../i18n/language';

@Component({
  selector: 'app-social-media',
  standalone: true,
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  imports: []
})
export class SocialMediaComponent {
  readonly languageOptions = LANGUAGE_OPTIONS;

  readonly languageSelectorLabels: Record<Language, string> = {
    EN: 'Choose language',
    DE: 'Sprache auswählen',
    IT: 'Seleziona la lingua',
    FR: 'Choisir la langue',
    ES: 'Elegir idioma',
    SQ: 'Zgjidh gjuhën',
    GSW: 'Sproch uswähle',
    PT: 'Escolher idioma'
  };

  @Input() activeLang: Language = 'EN';

  @Output() langChange = new EventEmitter<Language>();

  get activeLanguageShortCode(): string {
    return getLanguageOption(this.activeLang).shortCode;
  }

  changeLang(lang: Language): void {
    this.activeLang = lang;
    this.langChange.emit(lang);
  }

  onLanguageSelection(event: Event): void {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement) || !isLanguage(select.value)) return;

    this.changeLang(select.value);
  }
}
