import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    RouterOutlet,
    MenuComponent,
    SocialMediaComponent,
    ProfileComponent,
    AboutMeComponent,
    SkillSetComponent,
    MyWorkComponent,
    ReferencesMeComponent,
    ContactMeComponent,
    PrivacyPolicyComponent,
    LegalNoticeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'portfolio-app';

  showSocialMedia = true;
  private readonly thresholdFactor = 0.1;
  activeLang: 'DE' | 'EN' = 'EN';
  showContainer = true;

  @ViewChild('scrollRef', { static: false })
  scrollContainerRef?: ElementRef<HTMLDivElement>;

  private dummyEl = document.createElement('div');
  private dummyRef = new ElementRef<HTMLDivElement>(this.dummyEl);

  scrollEl: ElementRef<HTMLDivElement> = this.dummyRef;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(nav => {
        this.showContainer = true;
        if (nav.urlAfterRedirects === '/privacy' || nav.urlAfterRedirects === '/legal') {
          this.showContainer = false;
        }

        // Sobald der Container ausgeblendet wird, entfernen wir den Listener.
        if (!this.showContainer && this.scrollEl !== this.dummyRef) {
          this.scrollEl.nativeElement.removeEventListener('scroll', this.handleScroll);
          this.scrollEl = this.dummyRef;
        }
        // Wenn der Container wieder eingeblendet wird, hängen wir den Event-Listener neu an.
        else if (this.showContainer) {
          setTimeout(() => {
            if (this.scrollContainerRef) {
              this.scrollEl = this.scrollContainerRef;
              this.scrollEl.nativeElement.addEventListener('scroll', this.handleScroll);
            }
          });
        }
      });
  }

  ngOnInit(): void {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang === 'DE' || storedLang === 'EN') {
      this.activeLang = storedLang;
    }
  }

  ngAfterViewInit(): void {
    // Erster Initial-Load: Wenn der Container sichtbar ist,
    // binden wir den scroll-Listener an
    Promise.resolve().then(() => {
      if (this.showContainer && this.scrollContainerRef) {
        this.scrollEl = this.scrollContainerRef;
        this.scrollContainerRef.nativeElement.addEventListener('scroll', this.handleScroll);
      }
    });
  }

  ngOnDestroy(): void {
    // remove event listener
    if (this.scrollEl !== this.dummyRef) {
      this.scrollEl.nativeElement.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = (): void => {
    if (this.scrollEl === this.dummyRef) return;
    const w = this.scrollEl.nativeElement.clientWidth;
    const currentScroll = this.scrollEl.nativeElement.scrollLeft;
    this.showSocialMedia = !(currentScroll >= w * this.thresholdFactor);
  };

  changeLang(lang: 'DE' | 'EN'): void {
    this.activeLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    console.log(`Sprache gewechselt zu: ${lang}`);
  }
}
