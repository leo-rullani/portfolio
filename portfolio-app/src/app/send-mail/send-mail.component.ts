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

            this.feedbackMessage = 'E-Mail wurde erfolgreich versendet!';
            this.feedbackError = false;

            // Erfolgsmeldung nach 3s wieder ausblenden
            setTimeout(() => {
              this.feedbackMessage = '';
            }, 3000);

            myForm.resetForm();
          },
          error: (error) => {
            console.error('Fehler beim Senden:', error);
            this.feedbackMessage = 'Leider gab es ein Problem beim Versand.';
            this.feedbackError = true;
          },
          complete: () => console.info('Mail-Request komplett')
        });

      } else {
        // Testmodus => keine echte Mail
        console.log('mailTest = true => Keine echte Mail', this.contactData);

        this.feedbackMessage = 'Testmodus aktiv. Es wurde keine Mail verschickt.';
        this.feedbackError = false;

        // Auch Test-Erfolgsmeldung nach 3s ausblenden
        setTimeout(() => {
          this.feedbackMessage = '';
        }, 3000);

        myForm.resetForm();
      }

    } else {
      // Formular ist ungültig
      this.feedbackMessage = 'Bitte füllen Sie alle Felder korrekt aus.';
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
