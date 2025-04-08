import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Dieses Objekt wird in main.ts importiert und an
 * bootstrapApplication(AppComponent, appConfig) übergeben.
 *
 * Hier konfigurierst du z. B. Routing-Provider,
 * ggf. weitere Provider für HTTP, etc.
 */
export const appConfig = {
  providers: [
    provideRouter(routes)
    // z. B. provideHttpClient() etc.
  ]
};
