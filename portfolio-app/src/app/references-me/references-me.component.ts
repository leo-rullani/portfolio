import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'references-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references-me.component.html',
  styleUrls: ['./references-me.component.scss']
})
export class ReferencesMeComponent {


  @Input() activeLang: 'DE' | 'EN' = 'EN';


  @Input() scrollEl?: ElementRef<HTMLDivElement>;

  @ViewChild('localScrollEl', { static: true })
  localScrollEl!: ElementRef<HTMLDivElement>;


  text = {
    EN: {
      desktopHeadline: 'References',
      mobileHeadline: 'Need a teamplayer?',
      mobileSubtitle: 'Here what my colleagues said about me',

      ref1Quote: `“Leo is a reliable and friendly person. Work in a structured way
                  and write a clear code. I recommend him as a colleague.”`,
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Project Join',

      ref2Quote: `“He is a trustworthy teamplayer and can cope with the stress of deadlines.
                  Structured work and clear code.”`,
      ref2Name: 'Marco Meister',
      ref2Project: 'Project SFL',

      ref3Quote: `“Leo had to develop, format and deliver content
                  in collaboration with the team members.”`,
      ref3Name: 'Abbas M.',
      ref3Project: 'Project Join',

      ref4Quote: `“He demonstrated good problem-solving skills and
                  delivered features on time. Great code clarity!”`,
      ref4Name: 'Kevin Wissmer',
      ref4Project: 'Project Pollo Loco',

      ref5Quote: `“We worked together on multiple sprints.
                  His friendly approach and structured manner helped the team a lot.”`,
      ref5Name: 'Moritz Röhrig',
      ref5Project: 'Project SFL',

      ref6Quote: `“He is a reliable and friendly person,
                  always ready to help and refine the code for best results.”`,
      ref6Name: 'Federica Emulo',
      ref6Project: 'Project SPEAT'
    },

    DE: {
      desktopHeadline: 'Referenzen',
      mobileHeadline: 'Teamplayer gesucht?',
      mobileSubtitle: 'Das sagen meine Kollegen über mich',

      ref1Quote: `„Leo ist zuverlässig und freundlich. Arbeitet strukturiert
                  und schreibt sauberen Code. Ich empfehle ihn als Kollegen.“`,
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Projekt Join',

      ref2Quote: `„Er ist ein vertrauenswürdiger Teamplayer und kann
                  dem Stress von Deadlines standhalten. Strukturiertes Arbeiten und klarer Code.“`,
      ref2Name: 'Marco Meister',
      ref2Project: 'Projekt SFL',

      ref3Quote: `„Leo musste Inhalte entwickeln, formatieren und im
                  Team abliefern.“`,
      ref3Name: 'Abbas M.',
      ref3Project: 'Projekt Join',

      ref4Quote: `„Er zeigte gute Problemlösungskompetenz und
                  lieferte Features termingerecht. Toller, übersichtlicher Code!“`,
      ref4Name: 'Kevin Wissmer',
      ref4Project: 'Projekt Pollo Loco',

      ref5Quote: `„Wir haben in mehreren Sprints zusammengearbeitet.
                  Sein freundlicher Umgang und strukturierte Art halfen dem Team sehr.“`,
      ref5Name: 'Moritz Röhrig',
      ref5Project: 'Projekt SFL',

      ref6Quote: `„Er ist ein zuverlässiger und freundlicher Mensch,
                  stets hilfsbereit und verfeinert den Code für beste Ergebnisse.“`,
      ref6Name: 'Federica Emulo',
      ref6Project: 'Projekt SPEAT'
    }
  };

  scrollNext(): void {
    const distance = window.innerWidth;
    if (this.scrollEl?.nativeElement) {
      this.scrollEl.nativeElement.scrollBy({
        left: distance,
        behavior: 'smooth'
      });
    }
    else {
      if (this.localScrollEl?.nativeElement) {
        this.localScrollEl.nativeElement.scrollBy({
          left: distance,
          behavior: 'smooth'
        });
      } else {
        console.warn('No localScrollEl or scrollEl found!');
      }
    }
  }
}
