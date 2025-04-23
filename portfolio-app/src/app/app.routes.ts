import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

/**
 * Nur privacy und legal =>
 * container *ngIf => false => privacy direkt
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // optional: { path: 'home', component: ??? },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'legal', component: LegalNoticeComponent },
  // => KEIN { path: 'contact-me', component: ... }
];
