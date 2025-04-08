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
    RouterOutlet, // Für <router-outlet> in app.component.html
    MenuComponent,
    SocialMediaComponent,
    ProfileComponent,
    AboutMeComponent,
    SkillSetComponent,
    MyWorkComponent,
    ReferencesMeComponent,
    ContactMeComponent,

    // Optional, falls du Privacy/Legal direkt einbinden willst
    PrivacyPolicyComponent,
    LegalNoticeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  title = 'portfolio-app';
  showSocialMedia = true; // Steuert Sichtbarkeit der Social-Media-Leiste
  private readonly thresholdFactor = 0.1;

  @ViewChild('scrollRef', { static: true })
  scrollContainerRef!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    // ...
  }

  ngAfterViewInit(): void {
    if (!this.scrollContainerRef) {
      console.warn('No scroll container found.');
    } else {
      // Scroll-Event an den Container binden
      this.scrollContainerRef.nativeElement.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy(): void {
    this.scrollContainerRef.nativeElement.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Scroll-Handler: Ab einer gewissen Scroll-Position -> showSocialMedia = false
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
}
