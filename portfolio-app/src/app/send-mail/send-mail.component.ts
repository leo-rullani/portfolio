import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-send-mail',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    // WICHTIG: Damit Angular [routerLink] erkennt
    RouterLink
  ],
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent {

  // Globale Sprache vom Parent
  @Input() activeLang: 'DE' | 'EN' = 'EN';

  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  // Formulardaten
  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false
  };

  // E-Mail-Pattern
  emailPattern = '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}';

  // Schalter: Testmodus an/aus
  mailTest = true;

  // Variablen für Erfolg/Fehler-Meldungen
  feedbackMessage = '';
  feedbackError = false;

  // **Mehrsprachige Texte**: placeholders, labels, Fehlermeldungen, Erfolge, etc.
  text = {
    EN: {
      verticalTitle: 'Contact me',
      placeholderName: 'Your name',
      placeholderEmail: 'Your e-mail',
      placeholderMessage: 'Your message',

      errorName: 'Please enter your name.',
      errorEmail: 'Please enter a valid e-mail address.',
      errorMessage: 'Please enter a message.',
      errorPrivacy: 'Please confirm the privacy policy.',

      privacyLabelPart1: `I've read the`,
      privacyLabelPart2: `privacy policy`,
      privacyLabelPart3: `and agree to the processing of my data as outlined.`,

      btnSend: 'Send',

      feedbackFillAll: 'Please fill out all fields correctly.',
      feedbackSent: 'Your message has been sent successfully!',
      feedbackTest: 'Test mode active. No mail was actually sent.',
      feedbackErrorSend: 'Unfortunately, there was a problem sending your message.',

      introTitle: 'Let us work together.',
      introText: `I invite teams to reach out as I'm pursuing a front-end developer role.
                  I trust my strengths, enjoy team-based projects, and eagerly seek to
                  advance my skills for meaningful impact. I remain confident in growth daily.`,

      labelEmail: 'E-mail:',
      labelPhone: 'Tel:'
    },

    DE: {
      verticalTitle: 'Kontaktiere mich',
      placeholderName: 'Ihr Name',
      placeholderEmail: 'Ihre E-Mail',
      placeholderMessage: 'Ihre Nachricht',

      errorName: 'Bitte geben Sie Ihren Namen ein.',
      errorEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      errorMessage: 'Bitte geben Sie eine Nachricht ein.',
      errorPrivacy: 'Bitte bestätigen Sie die Datenschutzbestimmungen.',

      privacyLabelPart1: `Ich habe die`,
      privacyLabelPart2: `Datenschutzerklärung`,
      privacyLabelPart3: `gelesen und stimme der Verarbeitung meiner Daten zu.`,

      btnSend: 'Senden',

      feedbackFillAll: 'Bitte füllen Sie alle Felder korrekt aus.',
      feedbackSent: 'E-Mail wurde erfolgreich versendet!',
      feedbackTest: 'Testmodus aktiv. Es wurde keine Mail verschickt.',
      feedbackErrorSend: 'Leider gab es ein Problem beim Versand.',

      introTitle: 'Lass uns zusammenarbeiten.',
      introText: `Ich lade Teams ein, sich zu melden, da ich eine Frontend-Developer-Rolle anstrebe.
                  Ich vertraue auf meine Stärken, arbeite gern im Team und möchte meine Fähigkeiten
                  weiter ausbauen. Ich bin überzeugt, mich jeden Tag weiterentwickeln zu können.`,

      labelEmail: 'E-Mail:',
      labelPhone: 'Tel:'
    }
  };

  // POST-Konfiguration
  post = {
    endPoint: 'https://www.DEINE-DOMAIN.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  constructor(private http: HttpClient) {}

  /**
   * Wird beim Abschicken des Formulars (ngSubmit) aufgerufen
   */
  onSubmit(myForm: NgForm) {
    // Prüfen, ob Formular abgesendet und gültig
    if (myForm.submitted && myForm.form.valid) {

      if (!this.mailTest) {
        // Echte Mail senden
        this.http.post(
          this.post.endPoint,
          this.post.body(this.contactData),
          this.post.options
        ).subscribe({
          next: (response) => {
            console.log('Mail erfolgreich gesendet:', response);

            // Erfolg in Deutsch oder Englisch:
            this.feedbackMessage = this.text[this.activeLang].feedbackSent;
            this.feedbackError = false;

            // Erfolgsmeldung nach 3s wieder ausblenden
            setTimeout(() => {
              this.feedbackMessage = '';
            }, 3000);

            myForm.resetForm();
          },
          error: (error) => {
            console.error('Fehler beim Senden:', error);
            this.feedbackMessage = this.text[this.activeLang].feedbackErrorSend;
            this.feedbackError = true;
          },
          complete: () => console.info('Mail-Request komplett')
        });

      } else {
        // Testmodus => keine echte Mail
        console.log('mailTest = true => Keine echte Mail', this.contactData);

        this.feedbackMessage = this.text[this.activeLang].feedbackTest;
        this.feedbackError = false;

        // Auch Test-Erfolgsmeldung nach 3s ausblenden
        setTimeout(() => {
          this.feedbackMessage = '';
        }, 3000);

        myForm.resetForm();
      }

    } else {
      // Formular ist ungültig
      this.feedbackMessage = this.text[this.activeLang].feedbackFillAll;
      this.feedbackError = true;
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollPrev() {
    if (!this.scrollEl?.nativeElement) {
      console.warn('No nativeElement on scrollEl');
      return;
    }
    this.scrollEl.nativeElement.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }
}
