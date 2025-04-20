import { Component, Input, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'contact-me',
  standalone: true,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
  imports: [
    RouterLink,
    FormsModule
  ]
})
export class ContactMeComponent {

  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false
  };

  // E-Mail-Pattern wie gehabt
  emailPattern = '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}';

  // Testmodus
  mailTest = false;

  post = {
    // Deine Domain + Pfad
    endPoint: 'https://leorullani.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      // Angepasst: 'application/json'
      headers: {
        'Content-Type': 'application/json'
      },
      // responseType gehört direkt hierhin, nicht in headers:
      responseType: 'text' as const
    },
  };

  constructor(private http: HttpClient) {}

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      // Echte Mail wird gesendet
      this.http.post(
        this.post.endPoint,
        this.post.body(this.contactData),
        this.post.options  // <-- Jetzt wird header + responseType wirklich verwendet
      ).subscribe({
          next: (response) => {
            console.log('Mail sent', response);
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      // Nur Test: Keine echte Mail
      console.log('mailTest active => no real post');
      ngForm.resetForm();
    }
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

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
