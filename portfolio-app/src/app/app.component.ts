import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutMeComponent } from './about-me/about-me.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    SocialMediaComponent,
    ProfileComponent,
    AboutMeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'portfolio-app';
  showSocialMedia = true;

  private readonly thresholdFactor = 0.1;

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (): void => {
    const threshold = window.innerWidth * this.thresholdFactor;

    if (window.scrollX >= threshold) {
      this.showSocialMedia = false;
    } else {
      this.showSocialMedia = true;
    }
  };
}
