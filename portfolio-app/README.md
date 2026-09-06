# Leo Rullani — Portfolio

Angular portfolio for [leorullani.com](https://leorullani.com), including full-stack project cases, responsive navigation and a PHP contact endpoint for shared hosting.

## Highlights

- Eight language variants: English, German, Italian, French, Spanish, Albanian, Aargauer Swiss German and European Portuguese.
- Full-stack case studies with privacy-safe, client-side demos for Collectrra, VideoFlix, Quizly and BBM Kanban.
- Dedicated CV section with accessible work, projects, education and certificates tabs, plus Rullani DataLab and a privacy-redacted public application dossier.
- Unified slide navigation, responsive layouts, keyboard-friendly controls and accessible contact fields.

## Local development

Requirements: Node.js 20.19–24 and npm.

```bash
npm ci
npm start
```

The development server is available at `http://localhost:4200/`.

## Production build

```bash
npm ci
npm run build
```

Upload the **contents** of `dist/portfolio-app/browser/` to the domain's document root. The build copies both `.htaccess` and `sendMail.php` into that folder so Angular routes and the contact form remain functional after a clean deployment.

The portfolio is configured for the domain root (`/`). Do not deploy it into a subdirectory without changing the Angular base path and the contact endpoint first.

## All-Inkl deployment checklist

1. Build with the supported Node.js version.
2. Upload the complete contents of `dist/portfolio-app/browser/` via SFTP/FTP.
   Do **not** use a blind remote-delete or mirror option: the separately hosted
   `/join/` and `/el_pollo_loco/` directories must remain untouched.
3. Confirm `/`, `/privacy`, `/legal` and `/sendMail.php` are reachable over HTTPS.
4. Submit one contact-form test and confirm delivery to `coding@leorullani.com`.
5. Purge any host-side cache after replacing an existing build.

Automatic deployment can be added once the All-Inkl SFTP/FTP host, username and webroot path are known. Store credentials only as GitHub Actions secrets; never commit them to this repository.
