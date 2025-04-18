import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Neu importieren:
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Dieses Objekt wird in main.ts importiert und an
 * bootstrapApplication(AppComponent, appConfig) übergeben.
 *
 * Hier konfigurierst du z. B. Routing-Provider,
 * ggf. weitere Provider für HTTP, etc.
 */
export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // Anstelle von provideForms() => importProvidersFrom(FormsModule)
    importProvidersFrom(FormsModule)
  ]
};
