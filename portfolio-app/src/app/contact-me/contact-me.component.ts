import { Component, Input, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Language, NAVIGATION_LABELS } from '../i18n/language';

interface ContactCopy {
  verticalTitle: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderMessage: string;
  errorName: string;
  errorEmail: string;
  errorMessage: string;
  errorPrivacy: string;
  privacyLabelPart1: string;
  privacyLabelPart2: string;
  privacyLabelPart3: string;
  btnSend: string;
  feedbackFillAll: string;
  feedbackSent: string;
  feedbackTest: string;
  feedbackErrorSend: string;
  introTitle: string;
  introText: string;
  labelEmail: string;
  labelPhone: string;
  legalNotice: string;
  privacyPolicy: string;
}

@Component({
  selector: 'contact-me',
  standalone: true,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class ContactMeComponent {
  readonly navigationLabels = NAVIGATION_LABELS;
  @Input() scrollEl!: ElementRef<HTMLDivElement>;
  @Input() activeLang: Language = 'EN';
  contactData={name:'',email:'',message:'',privacy:false,website:''};
  emailPattern='[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}';
  mailTest=false;feedbackMessage='';feedbackError=false;
  readonly text: Record<Language, ContactCopy> = {
    EN: {
      verticalTitle: 'Contact me', placeholderName: 'Your name', placeholderEmail: 'Your e-mail', placeholderMessage: 'Your message', errorName: 'Please enter your name.', errorEmail: 'Please enter a valid e-mail address.', errorMessage: 'Please enter a message.', errorPrivacy: 'Please confirm the privacy policy.', privacyLabelPart1: `I've read the`, privacyLabelPart2: 'privacy policy', privacyLabelPart3: 'and agree to the processing of my data as outlined.', btnSend: 'Send', feedbackFillAll: 'Please fill out all fields correctly.', feedbackSent: 'Your message has been sent successfully!', feedbackTest: 'Test mode active. No mail was actually sent.', feedbackErrorSend: 'Unfortunately, there was a problem sending your message.', introTitle: 'Let us build something meaningful.', introText: 'I’m open to software engineering opportunities where frontend craft, backend thinking and data come together. If you are building a thoughtful digital product, I would be glad to hear about it.', labelEmail: 'E-mail:', labelPhone: 'Tel:', legalNotice: 'Legal notice', privacyPolicy: 'Privacy policy'
    },
    DE: {
      verticalTitle: 'Kontakt', placeholderName: 'Ihr Name', placeholderEmail: 'Ihre E-Mail', placeholderMessage: 'Ihre Nachricht', errorName: 'Bitte geben Sie Ihren Namen ein.', errorEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', errorMessage: 'Bitte geben Sie eine Nachricht ein.', errorPrivacy: 'Bitte bestätigen Sie die Datenschutzbestimmungen.', privacyLabelPart1: 'Ich habe die', privacyLabelPart2: 'Datenschutzerklärung', privacyLabelPart3: 'gelesen und stimme der Verarbeitung meiner Daten zu.', btnSend: 'Senden', feedbackFillAll: 'Bitte füllen Sie alle Felder korrekt aus.', feedbackSent: 'Ihre Nachricht wurde erfolgreich versendet!', feedbackTest: 'Testmodus aktiv. Es wurde keine Nachricht verschickt.', feedbackErrorSend: 'Leider gab es ein Problem beim Versand.', introTitle: 'Lass uns etwas Sinnvolles entwickeln.', introText: 'Ich bin offen für Software-Engineering-Aufgaben, bei denen Frontend-Handwerk, Backend-Denken und Daten zusammenkommen. Wenn Sie ein durchdachtes digitales Produkt entwickeln, freue ich mich auf Ihre Nachricht.', labelEmail: 'E-Mail:', labelPhone: 'Tel:', legalNotice: 'Impressum', privacyPolicy: 'Datenschutzerklärung'
    },
    IT: {
      verticalTitle: 'Contatti', placeholderName: 'Il tuo nome', placeholderEmail: 'La tua e-mail', placeholderMessage: 'Il tuo messaggio', errorName: 'Inserisci il tuo nome.', errorEmail: 'Inserisci un indirizzo e-mail valido.', errorMessage: 'Inserisci un messaggio.', errorPrivacy: 'Conferma l’informativa sulla privacy.', privacyLabelPart1: 'Ho letto la', privacyLabelPart2: 'informativa sulla privacy', privacyLabelPart3: 'e acconsento al trattamento dei miei dati come descritto.', btnSend: 'Invia', feedbackFillAll: 'Compila correttamente tutti i campi.', feedbackSent: 'Il tuo messaggio è stato inviato con successo!', feedbackTest: 'Modalità test attiva. Non è stato inviato alcun messaggio.', feedbackErrorSend: 'Si è verificato un problema durante l’invio del messaggio.', introTitle: 'Costruiamo qualcosa di significativo.', introText: 'Sono disponibile per opportunità di software engineering in cui la cura del frontend, il pensiero backend e i dati si incontrano. Se stai creando un prodotto digitale ben progettato, sarò felice di parlarne.', labelEmail: 'E-mail:', labelPhone: 'Tel:', legalNotice: 'Note legali', privacyPolicy: 'Informativa sulla privacy'
    },
    FR: {
      verticalTitle: 'Contact', placeholderName: 'Votre nom', placeholderEmail: 'Votre e-mail', placeholderMessage: 'Votre message', errorName: 'Veuillez saisir votre nom.', errorEmail: 'Veuillez saisir une adresse e-mail valide.', errorMessage: 'Veuillez saisir un message.', errorPrivacy: 'Veuillez accepter la politique de confidentialité.', privacyLabelPart1: 'J’ai lu la', privacyLabelPart2: 'politique de confidentialité', privacyLabelPart3: 'et j’accepte le traitement de mes données tel qu’il y est décrit.', btnSend: 'Envoyer', feedbackFillAll: 'Veuillez remplir correctement tous les champs.', feedbackSent: 'Votre message a bien été envoyé !', feedbackTest: 'Mode test actif. Aucun message n’a été envoyé.', feedbackErrorSend: 'Un problème est survenu lors de l’envoi de votre message.', introTitle: 'Construisons quelque chose d’utile.', introText: 'Je suis ouvert aux opportunités en ingénierie logicielle qui réunissent le soin du frontend, la réflexion backend et les données. Si vous développez un produit numérique bien pensé, je serai ravi d’en discuter.', labelEmail: 'E-mail :', labelPhone: 'Tél. :', legalNotice: 'Mentions légales', privacyPolicy: 'Politique de confidentialité'
    },
    ES: {
      verticalTitle: 'Contacto', placeholderName: 'Tu nombre', placeholderEmail: 'Tu e-mail', placeholderMessage: 'Tu mensaje', errorName: 'Introduce tu nombre.', errorEmail: 'Introduce una dirección de e-mail válida.', errorMessage: 'Escribe un mensaje.', errorPrivacy: 'Confirma la política de privacidad.', privacyLabelPart1: 'He leído la', privacyLabelPart2: 'política de privacidad', privacyLabelPart3: 'y acepto el tratamiento de mis datos según lo descrito.', btnSend: 'Enviar', feedbackFillAll: 'Completa correctamente todos los campos.', feedbackSent: '¡Tu mensaje se ha enviado correctamente!', feedbackTest: 'Modo de prueba activo. No se ha enviado ningún mensaje.', feedbackErrorSend: 'Ha ocurrido un problema al enviar tu mensaje.', introTitle: 'Construyamos algo con sentido.', introText: 'Estoy abierto a oportunidades de ingeniería de software donde confluyan el cuidado del frontend, el pensamiento backend y los datos. Si estás creando un producto digital bien planteado, estaré encantado de hablar contigo.', labelEmail: 'E-mail:', labelPhone: 'Tel.:', legalNotice: 'Aviso legal', privacyPolicy: 'Política de privacidad'
    },
    SQ: {
      verticalTitle: 'Kontakt', placeholderName: 'Emri juaj', placeholderEmail: 'E-maili juaj', placeholderMessage: 'Mesazhi juaj', errorName: 'Ju lutem shkruani emrin tuaj.', errorEmail: 'Ju lutem shkruani një adresë e-maili të vlefshme.', errorMessage: 'Ju lutem shkruani një mesazh.', errorPrivacy: 'Ju lutem konfirmoni politikën e privatësisë.', privacyLabelPart1: 'E kam lexuar', privacyLabelPart2: 'politikën e privatësisë', privacyLabelPart3: 'dhe pranoj përpunimin e të dhënave të mia siç përshkruhet.', btnSend: 'Dërgo', feedbackFillAll: 'Ju lutem plotësoni saktë të gjitha fushat.', feedbackSent: 'Mesazhi juaj u dërgua me sukses!', feedbackTest: 'Modaliteti test është aktiv. Nuk u dërgua asnjë mesazh.', feedbackErrorSend: 'Ndodhi një problem gjatë dërgimit të mesazhit.', introTitle: 'Le të ndërtojmë diçka me vlerë.', introText: 'Jam i hapur për mundësi në inxhinierinë e softuerit ku bashkohen mjeshtëria në frontend, mendimi backend dhe të dhënat. Nëse po ndërtoni një produkt digjital të menduar mirë, do të kem kënaqësi të bisedojmë.', labelEmail: 'E-mail:', labelPhone: 'Tel.:', legalNotice: 'Njoftim ligjor', privacyPolicy: 'Politika e privatësisë'
    },
    GSW: {
      verticalTitle: 'Kontakt', placeholderName: 'Din Name', placeholderEmail: 'Dini E-Mail', placeholderMessage: 'Dini Nachricht', errorName: 'Bitte gib din Name ii.', errorEmail: 'Bitte gib e gültigi E-Mail-Adrässe ii.', errorMessage: 'Bitte schriib e Nachricht.', errorPrivacy: 'Bitte bestätig d Datenschutzerklärig.', privacyLabelPart1: 'Ich ha d', privacyLabelPart2: 'Datenschutzerklärig', privacyLabelPart3: 'glese und bi mit de beschriebene Verarbeitig vo mine Date iiverstande.', btnSend: 'Abschicke', feedbackFillAll: 'Bitte füll alli Fälder richtig us.', feedbackSent: 'Dini Nachricht isch erfolgriich verschickt worde!', feedbackTest: 'Testmodus isch aktiv. Es isch kei Nachricht verschickt worde.', feedbackErrorSend: 'Leider het s bim Verschicke vo dinere Nachricht es Problem geh.', introTitle: 'Lömmer öppis Sinnvolls baue.', introText: 'Ich bi offe für Software-Engineering-Ufgabe, wo Frontend-Handwerk, Backend-Denke und Date zämechömed. Wenn du es durchdachts digitales Produkt entwicklisch, freu ich mich uf dini Nachricht.', labelEmail: 'E-Mail:', labelPhone: 'Tel.:', legalNotice: 'Impressum', privacyPolicy: 'Datenschutz'
    },
    PT: {
      verticalTitle: 'Contacto', placeholderName: 'O seu nome', placeholderEmail: 'O seu e-mail', placeholderMessage: 'A sua mensagem', errorName: 'Introduza o seu nome.', errorEmail: 'Introduza um endereço de e-mail válido.', errorMessage: 'Escreva uma mensagem.', errorPrivacy: 'Confirme a política de privacidade.', privacyLabelPart1: 'Li a', privacyLabelPart2: 'política de privacidade', privacyLabelPart3: 'e aceito o tratamento dos meus dados conforme descrito.', btnSend: 'Enviar', feedbackFillAll: 'Preencha corretamente todos os campos.', feedbackSent: 'A sua mensagem foi enviada com sucesso!', feedbackTest: 'Modo de teste ativo. Não foi enviada qualquer mensagem.', feedbackErrorSend: 'Ocorreu um problema ao enviar a sua mensagem.', introTitle: 'Vamos construir algo com significado.', introText: 'Estou disponível para oportunidades de engenharia de software que juntem o cuidado no frontend, o pensamento backend e os dados. Se está a desenvolver um produto digital bem pensado, terei todo o gosto em conversar.', labelEmail: 'E-mail:', labelPhone: 'Tel.:', legalNotice: 'Aviso legal', privacyPolicy: 'Política de privacidade'
    }
  };
  post={
    endPoint:'/sendMail.php',
    body:(p:any)=>JSON.stringify(p),
    options:{headers:{'Content-Type':'application/json'},responseType:'text' as const}
  };
  constructor(private http: HttpClient){}

  onSubmit(f:NgForm){
    if(!f.submitted||!f.form.valid){this.handleInvalidForm();return;}
    if(!this.mailTest)this.handleRealMail(f);else this.handleTestMail(f);
  }

  onFormChange(f:NgForm){
    const n=f.controls['name'],e=f.controls['email'],m=f.controls['message'],p=f.controls['privacy'];
    if(n?.dirty&&n.invalid){this.feedbackMessage=this.text[this.activeLang].errorName;this.feedbackError=true;return;}
    if(e?.dirty&&e.invalid){this.feedbackMessage=this.text[this.activeLang].errorEmail;this.feedbackError=true;return;}
    if(m?.dirty&&m.invalid){this.feedbackMessage=this.text[this.activeLang].errorMessage;this.feedbackError=true;return;}
    if(p?.dirty&&p.invalid){this.feedbackMessage=this.text[this.activeLang].errorPrivacy;this.feedbackError=true;return;}
    this.feedbackMessage='';this.feedbackError=false;
  }

  private handleInvalidForm(){
    this.feedbackMessage=this.text[this.activeLang].feedbackFillAll;
    this.feedbackError=true;
  }

  private handleRealMail(f:NgForm){
    this.http.post(this.post.endPoint,this.post.body(this.contactData),this.post.options).subscribe({
      next:(r)=>this.onMailSuccess(r,f),
      error:(e)=>this.onMailError(e)
    });
  }

  private onMailSuccess(r:any,f:NgForm){
    this.feedbackMessage=this.text[this.activeLang].feedbackSent;
    this.feedbackError=false;setTimeout(()=>{this.feedbackMessage='';},3000);f.resetForm();
  }

  private onMailError(e:any){
    this.feedbackMessage=this.text[this.activeLang].feedbackErrorSend;
    this.feedbackError=true;
  }

  private handleTestMail(f:NgForm){
    this.feedbackMessage=this.text[this.activeLang].feedbackTest;
    this.feedbackError=false;setTimeout(()=>{this.feedbackMessage='';},3000);f.resetForm();
  }

  scrollToTop(){window.scrollTo({top:0,behavior:'smooth'});}
  scrollToStart(){
    if(!this.scrollEl?.nativeElement)return;
    this.scrollEl.nativeElement.scrollTo({
      left:0,
      top:0,
      behavior:'smooth'
    });
  }
}
