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

  private wheelTimeout: any = null;
  private accumulatedDelta = 0;
  private debounceTime = 40;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(n => {
        this.showContainer = true;
        if (n.urlAfterRedirects === '/privacy' || n.urlAfterRedirects === '/legal') {
          this.showContainer = false;
        }
        if (!this.showContainer && this.scrollEl !== this.dummyRef) {
          this.scrollEl.nativeElement.removeEventListener('scroll', this.handleScroll);
          this.scrollEl.nativeElement.removeEventListener('wheel', this.onWheel);
          this.scrollEl = this.dummyRef;
        } else if (this.showContainer) {
          setTimeout(() => {
            if (this.scrollContainerRef) {
              this.scrollEl = this.scrollContainerRef;
              this.scrollEl.nativeElement.addEventListener('scroll', this.handleScroll);
              this.scrollEl.nativeElement.addEventListener('wheel', this.onWheel, { passive: false });
            }
          });
        }
      });
  }

  ngOnInit(): void {
    const s = localStorage.getItem('preferredLanguage');
    if (s === 'DE' || s === 'EN') {
      this.activeLang = s;
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      if (this.showContainer && this.scrollContainerRef) {
        this.scrollEl = this.scrollContainerRef;
        this.scrollEl.nativeElement.addEventListener('scroll', this.handleScroll);
        this.scrollEl.nativeElement.addEventListener('wheel', this.onWheel, { passive: false });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.scrollEl !== this.dummyRef) {
      this.scrollEl.nativeElement.removeEventListener('scroll', this.handleScroll);
      this.scrollEl.nativeElement.removeEventListener('wheel', this.onWheel);
    }
  }

  handleScroll = (): void => {
    if (this.scrollEl === this.dummyRef) return;
    const w = this.scrollEl.nativeElement.clientWidth;
    const c = this.scrollEl.nativeElement.scrollLeft;
    this.showSocialMedia = !(c >= w * this.thresholdFactor);
  };

  onWheel = (e: WheelEvent): void => {
    if (window.innerWidth<800) return;
    e.preventDefault();
    this.accumulatedDelta+=e.deltaX+e.deltaY;
    if(this.wheelTimeout)clearTimeout(this.wheelTimeout);
    this.wheelTimeout=setTimeout(()=>{
      let d=this.accumulatedDelta;this.accumulatedDelta=0;this.wheelTimeout=null;
      if(d>0)this.scrollEl.nativeElement.scrollTo({left:this.scrollEl.nativeElement.scrollLeft+window.innerWidth,behavior:'smooth'});
      else if(d<0)this.scrollEl.nativeElement.scrollTo({left:this.scrollEl.nativeElement.scrollLeft-window.innerWidth,behavior:'smooth'});
    },this.debounceTime);
  };

  changeLang(lang: 'DE' | 'EN'): void {
    this.activeLang = lang;
    localStorage.setItem('preferredLanguage', lang);
  }
}
