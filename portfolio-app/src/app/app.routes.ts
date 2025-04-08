import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

/* Evtl. brauchst du dein Home.
   Aber im Beispiel hier:
   Wenn du "" -> AppComponent willst,
   importiere AppComponent hier NICHT,
   um keine Zyklische Abhängigkeit zu erzeugen.
   -> Siehe "app.config.ts" und "main.ts" für die Bootstrapping-Logik
*/

export const routes: Routes = [
  // { path: '', component: AppComponent }, // optional, falls du / -> AppComponent willst
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'legal', component: LegalNoticeComponent }
];
