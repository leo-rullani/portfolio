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
    ContactMeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  title = 'portfolio-app';
  showSocialMedia = true;           // Steuert Sichtbarkeit der Social-Media-Leiste
  private readonly thresholdFactor = 0.1;

  // Wir greifen die Container-Div mit #scrollRef ab (siehe app.component.html)
  @ViewChild('scrollRef') scrollContainerRef!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    // Entfernt: window-Scroll-Event, da wir jetzt den Container scrollen.
    // window.addEventListener('scroll', this.handleScroll);
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
    // Entfernen des Container-Scroll-Events
    this.scrollContainerRef.nativeElement.removeEventListener('scroll', this.handleScroll);

    // Entfernt: window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Wird jetzt bei jedem Scroll im Container aufgerufen.
   * Ab einer gewissen Scroll-Position -> showSocialMedia = false.
   */
  handleScroll = (): void => {
    // Wir bestimmen den "threshold" relativ zur Containerbreite.
    const threshold = this.scrollContainerRef.nativeElement.clientWidth * this.thresholdFactor;
    const currentScroll = this.scrollContainerRef.nativeElement.scrollLeft;

    if (currentScroll >= threshold) {
      this.showSocialMedia = false;
    } else {
      this.showSocialMedia = true;
    }
  };
}
