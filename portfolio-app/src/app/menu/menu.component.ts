import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  getLanguageOption,
  isLanguage,
  Language,
  LANGUAGE_OPTIONS
} from '../i18n/language';

interface MenuText {
  navWhyMe: string;
  navSkills: string;
  navMyWork: string;
  navContact: string;
  mobileSkillSet: string;
  mobileMyWork: string;
  mobileContact: string;
  primaryNavigation: string;
  home: string;
  openMenu: string;
  closeMenu: string;
  mobileNavigation: string;
  chooseLanguage: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() activeLang: Language = 'EN';
  @Output() activeLangChange = new EventEmitter<Language>();

  isOverlayOpen = false;
  activeLink = '';
  readonly languageOptions = LANGUAGE_OPTIONS;

  readonly text: Record<Language, MenuText> = {
    EN: {
      navWhyMe: 'Why me',
      navSkills: 'Skills',
      navMyWork: 'My Work',
      navContact: 'Contact',
      mobileSkillSet: 'My Skill Set',
      mobileMyWork: 'My Work',
      mobileContact: 'Contact me',
      primaryNavigation: 'Primary navigation',
      home: 'Go to home section',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      mobileNavigation: 'Mobile navigation',
      chooseLanguage: 'Choose language'
    },
    DE: {
      navWhyMe: 'Warum ich',
      navSkills: 'Skills',
      navMyWork: 'Projekte',
      navContact: 'Kontakt',
      mobileSkillSet: 'Meine Skills',
      mobileMyWork: 'Meine Projekte',
      mobileContact: 'Kontaktiere mich',
      primaryNavigation: 'Hauptnavigation',
      home: 'Zur Startseite',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      mobileNavigation: 'Mobile Navigation',
      chooseLanguage: 'Sprache auswählen'
    },
    IT: {
      navWhyMe: 'Perché io',
      navSkills: 'Competenze',
      navMyWork: 'Progetti',
      navContact: 'Contatti',
      mobileSkillSet: 'Le mie competenze',
      mobileMyWork: 'I miei progetti',
      mobileContact: 'Contattami',
      primaryNavigation: 'Navigazione principale',
      home: 'Vai alla sezione iniziale',
      openMenu: 'Apri il menu',
      closeMenu: 'Chiudi il menu',
      mobileNavigation: 'Navigazione mobile',
      chooseLanguage: 'Seleziona la lingua'
    },
    FR: {
      navWhyMe: 'Pourquoi moi',
      navSkills: 'Compétences',
      navMyWork: 'Projets',
      navContact: 'Contact',
      mobileSkillSet: 'Mes compétences',
      mobileMyWork: 'Mes projets',
      mobileContact: 'Me contacter',
      primaryNavigation: 'Navigation principale',
      home: "Aller à la section d’accueil",
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      mobileNavigation: 'Navigation mobile',
      chooseLanguage: 'Choisir la langue'
    },
    ES: {
      navWhyMe: 'Por qué yo',
      navSkills: 'Habilidades',
      navMyWork: 'Proyectos',
      navContact: 'Contacto',
      mobileSkillSet: 'Mis habilidades',
      mobileMyWork: 'Mis proyectos',
      mobileContact: 'Contáctame',
      primaryNavigation: 'Navegación principal',
      home: 'Ir a la sección de inicio',
      openMenu: 'Abrir el menú',
      closeMenu: 'Cerrar el menú',
      mobileNavigation: 'Navegación móvil',
      chooseLanguage: 'Elegir idioma'
    },
    SQ: {
      navWhyMe: 'Pse unë',
      navSkills: 'Aftësitë',
      navMyWork: 'Projektet',
      navContact: 'Kontakt',
      mobileSkillSet: 'Aftësitë e mia',
      mobileMyWork: 'Projektet e mia',
      mobileContact: 'Më kontakto',
      primaryNavigation: 'Navigimi kryesor',
      home: 'Shko te seksioni kryesor',
      openMenu: 'Hap menunë',
      closeMenu: 'Mbyll menunë',
      mobileNavigation: 'Navigimi për celular',
      chooseLanguage: 'Zgjidh gjuhën'
    },
    GSW: {
      navWhyMe: 'Wieso ich',
      navSkills: 'Mini Skills',
      navMyWork: 'Projäkt',
      navContact: 'Kontakt',
      mobileSkillSet: 'Mini Skills',
      mobileMyWork: 'Mini Projäkt',
      mobileContact: 'Meld di',
      primaryNavigation: 'Hauptnavigation',
      home: 'Zum Start',
      openMenu: 'Menü ufmache',
      closeMenu: 'Menü zuemache',
      mobileNavigation: 'Mobile Navigation',
      chooseLanguage: 'Sproch uswähle'
    },
    PT: {
      navWhyMe: 'Porquê eu',
      navSkills: 'Competências',
      navMyWork: 'Projetos',
      navContact: 'Contacto',
      mobileSkillSet: 'As minhas competências',
      mobileMyWork: 'Os meus projetos',
      mobileContact: 'Contacte-me',
      primaryNavigation: 'Navegação principal',
      home: 'Ir para a secção inicial',
      openMenu: 'Abrir o menu',
      closeMenu: 'Fechar o menu',
      mobileNavigation: 'Navegação móvel',
      chooseLanguage: 'Escolher idioma'
    }
  };

  constructor(private router: Router) {}

  get activeLanguageName(): string {
    return getLanguageOption(this.activeLang).name;
  }

  get activeLanguageShortCode(): string {
    return getLanguageOption(this.activeLang).shortCode;
  }

  hideLinks(): boolean {
    const currentUrl = this.router.url;
    return currentUrl === '/legal' || currentUrl === '/privacy';
  }

  toggleMenu(): void {
    this.isOverlayOpen = !this.isOverlayOpen;
  }

  changeLang(lang: Language): void {
    this.activeLang = lang;
    this.activeLangChange.emit(lang);
  }

  onLanguageSelection(event: Event): void {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement) || !isLanguage(select.value)) return;

    this.changeLang(select.value);
  }

  scrollToProfile(): void {
    this.activeLink = '';

    if (this.hideLinks()) {
      this.router.navigate(['']).then(() => {
        this.handleScroll(0, 'profile-slide');
      });
    } else {
      this.handleScroll(0, 'profile-slide');
    }
  }

  private scrollDesktop(index: number): void {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (!container) return;
    container.scrollTo({
      left: index * window.innerWidth,
      behavior: 'smooth'
    });
  }

  private scrollMobile(slideId: string): void {
    const el = document.getElementById(slideId);
    if (!el) return;
    const offsetY = -50;
    const elementTop = el.getBoundingClientRect().top + window.scrollY + offsetY;
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  }

  private handleScroll(index: number, slideId: string): void {
    if (window.innerWidth > 800) {
      this.scrollDesktop(index);
    } else {
      this.scrollMobile(slideId);
    }
  }

  scrollToAboutMe(): void {
    this.activeLink = 'aboutMe';
    this.handleScroll(1, 'about-me-slide');
  }

  scrollToSkills(): void {
    this.activeLink = 'skills';
    this.handleScroll(2, 'skill-set-slide');
  }

  scrollToMyWork(): void {
    this.activeLink = 'myWork';
    this.handleScroll(3, 'my-work-slide');
  }

  scrollToContact(): void {
    this.activeLink = 'contact';
    this.handleScroll(6, 'contact-me-slide');
  }

  onWhyMe(): void {
    this.scrollToAboutMe();
    this.isOverlayOpen = false;
  }

  onSkillSet(): void {
    this.scrollToSkills();
    this.isOverlayOpen = false;
  }

  onMyWork(): void {
    this.scrollToMyWork();
    this.isOverlayOpen = false;
  }

  onContact(): void {
    this.scrollToContact();
    this.isOverlayOpen = false;
  }
}
