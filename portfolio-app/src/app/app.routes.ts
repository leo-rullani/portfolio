import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
  // Beispiel: Falls du für "/" noch etwas Spezielles willst (optional):
  // { path: '', pathMatch: 'full', redirectTo: '/home' },

  // WICHTIG: Hier definieren wir, dass diese Pfade im NAMED OUTLET "overlay" gerendert werden:
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    outlet: 'overlay' // <-- Named Outlet
  },
  {
    path: 'legal',
    component: LegalNoticeComponent,
    outlet: 'overlay' // <-- Named Outlet
  },

  // Du kannst natürlich weitere Routen ergänzen, z. B. { path: 'home', ... }
];
