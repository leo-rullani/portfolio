import { Component, Input, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'contact-me',
  standalone: true,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class ContactMeComponent {

  @Input() scrollEl!: ElementRef<HTMLDivElement>;
  @Input() activeLang: 'DE' | 'EN' = 'EN';

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false
  };

  emailPattern = '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}';
  mailTest = false;
  feedbackMessage = '';
  feedbackError = false;

  text = {
    EN: {
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

  post = {
    endPoint: 'https://leorullani.com/sendMail.php',
    body: (p: any) => JSON.stringify(p),
    options: {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as const
    }
  };

  constructor(private http: HttpClient) {}

  onSubmit(myForm: NgForm) {
    if (!myForm.submitted || !myForm.form.valid) {
      this.handleInvalidForm();
      return;
    }
    if (!this.mailTest) {
      this.handleRealMail(myForm);
    } else {
      this.handleTestMail(myForm);
    }
  }

  onFormChange(myForm: NgForm) {
    const n = myForm.controls['name'];
    if (n?.dirty && n.invalid) {
      this.feedbackMessage = this.text[this.activeLang].errorName;
      this.feedbackError = true;
      return;
    }
    const e = myForm.controls['email'];
    if (e?.dirty && e.invalid) {
      this.feedbackMessage = this.text[this.activeLang].errorEmail;
      this.feedbackError = true;
      return;
    }
    const m = myForm.controls['message'];
    if (m?.dirty && m.invalid) {
      this.feedbackMessage = this.text[this.activeLang].errorMessage;
      this.feedbackError = true;
      return;
    }
    const p = myForm.controls['privacy'];
    if (p?.dirty && p.invalid) {
      this.feedbackMessage = this.text[this.activeLang].errorPrivacy;
      this.feedbackError = true;
      return;
    }
    this.feedbackMessage = '';
    this.feedbackError = false;
  }

  private handleInvalidForm() {
    this.feedbackMessage = this.text[this.activeLang].feedbackFillAll;
    this.feedbackError = true;
  }

  private handleRealMail(myForm: NgForm) {
    this.http.post(
      this.post.endPoint,
      this.post.body(this.contactData),
      this.post.options
    ).subscribe({
      next: (r) => this.onMailSuccess(r, myForm),
      error: (e) => this.onMailError(e),
      complete: () => console.info('Mail-Request komplett')
    });
  }

  private onMailSuccess(r: any, myForm: NgForm) {
    console.log('Mail erfolgreich gesendet:', r);
    this.feedbackMessage = this.text[this.activeLang].feedbackSent;
    this.feedbackError = false;
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 3000);
    myForm.resetForm();
  }

  private onMailError(e: any) {
    console.error('Fehler beim Senden:', e);
    this.feedbackMessage = this.text[this.activeLang].feedbackErrorSend;
    this.feedbackError = true;
  }

  private handleTestMail(myForm: NgForm) {
    console.log('mailTest = true => Keine echte Mail', this.contactData);
    this.feedbackMessage = this.text[this.activeLang].feedbackTest;
    this.feedbackError = false;
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 3000);
    myForm.resetForm();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
