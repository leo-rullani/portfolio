import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    outlet: 'overlay'
  },
  {
    path: 'legal',
    component: LegalNoticeComponent,
    outlet: 'overlay'
  },
];
