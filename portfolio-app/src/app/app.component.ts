import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Import deiner Child-Components
import { MenuComponent } from './menu/menu.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { ReferencesMeComponent } from './references-me/references-me.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,        // Für <router-outlet> in app.component.html
    MenuComponent,
    SocialMediaComponent,
    ProfileComponent,
    AboutMeComponent,
    SkillSetComponent,
    MyWorkComponent,
    ReferencesMeComponent,
    ContactMeComponent,

    // Optional, falls du Privacy/Legal direkt einbinden willst:
    PrivacyPolicyComponent,
    LegalNoticeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  title = 'portfolio-app';

  // Steuert Sichtbarkeit der Social-Media-Leiste beim Scrollen
  showSocialMedia = true;

  // Threshold-Faktor, ab wann Social-Media verborgen wird
  private readonly thresholdFactor = 0.1;

  // Sprachverwaltung (einfacher Ansatz)
  activeLang: 'DE' | 'EN' = 'EN';

  /**
   * Unser "Globaler" Scrollcontainer in der HTML:
   * <div class="container" #scrollRef> ... </div>
   *
   * => Ggf. an Child-Komponenten via [scrollEl]="scrollContainerRef" weitergeben.
   */
  @ViewChild('scrollRef', { static: true })
  scrollContainerRef!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    // ...
  }

  ngAfterViewInit(): void {
    // Hier hängen wir unser Scroll-Event dran
    if (!this.scrollContainerRef) {
      console.warn('No scroll container found.');
    } else {
      this.scrollContainerRef.nativeElement.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy(): void {
    // Beim Zerstören => Eventlistener entfernen
    this.scrollContainerRef.nativeElement.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Reagiert auf horizontales Scrollen:
   * Ab einer bestimmten Scroll-Distanz (thresholdFactor)
   * verstecken wir die Social-Media-Leiste.
   */
  handleScroll = (): void => {
    const threshold = this.scrollContainerRef.nativeElement.clientWidth * this.thresholdFactor;
    const currentScroll = this.scrollContainerRef.nativeElement.scrollLeft;

    if (currentScroll >= threshold) {
      this.showSocialMedia = false;
    } else {
      this.showSocialMedia = true;
    }
  };

  /**
   * Globale Sprachumschaltung
   */
  changeLang(lang: 'DE' | 'EN') {
    this.activeLang = lang;
    console.log(`Sprache gewechselt zu: ${lang}`);
    // Hier könntest du ggf. einen I18n-Service aufrufen oder andere globale Aktionen
  }
}
