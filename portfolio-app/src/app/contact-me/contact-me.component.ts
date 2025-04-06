import { Component } from '@angular/core';

@Component({
  selector: 'contact-me',
  standalone: true,
  imports: [],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent {

  onArrowLeftClick() {
    window.scrollBy({ top: 0, left: -window.innerWidth, behavior: 'smooth' });
  }
}
