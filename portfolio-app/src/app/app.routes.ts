import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

// Du stellst nur privacy, legal etc. als "Extra"-Seiten bereit
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // optional: { path: 'home', component: ??? } => oder du bleibst bei '', je nach Bedarf
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'legal', component: LegalNoticeComponent }
];
