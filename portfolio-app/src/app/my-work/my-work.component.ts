import { Component, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-work',
  standalone: true,
  // Hier fügst du CommonModule zu den imports hinzu:
  imports: [
    CommonModule
  ],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss' // Belassen wie im Original
})
export class MyWorkComponent {

  // Parent (AppComponent) übergibt uns die Sprache
  @Input() activeLang: 'DE' | 'EN' = 'EN';

  // Parent übergibt Scroll-Container
  @Input() scrollEl!: ElementRef<HTMLDivElement>;

  // Booleans für Show/Hide
  isProject1Expanded = false;
  isProject2Expanded = false;

  /**
   * Übersetzungs-Objekt
   * - verticalTitle => "My Work"
   * - Projekt 1 / Projekt 2 => "Join", "El Pollo Loco", ...
   * - aboutTheProject, technologies, learned, showMore, showLess, etc.
   */
  text = {
    EN: {
      verticalTitle: 'My Work',

      // PROJECT 1: JOIN
      project1Title: 'Join',
      project1About: 'About the project',
      project1AboutText:
        `Task manager inspired by the Kanban System.
         Create and organize tasks using drag & drop, assign categories.`,
      project1Tech: 'Technologies I have used',
      project1TechList: 'JavaScript, HTML, CSS, Firebase',
      project1Learned: 'What I have learned',
      project1LearnedText:
        `I improved my knowledge of JSDoc, wrote cleaner code,
         and successfully collaborated with a small team
         on a shared codebase.`,
      project1ShowMore: 'Show me more',
      project1ShowLess: 'Show me less',
      github: 'GitHub',
      liveTest: 'Live Test',

      // PROJECT 2: EL POLLO LOCO
      project2Title: 'El Pollo Loco',
      project2About: 'About the project',
      project2AboutText:
        `A 2D jump-and-run game with fun animations, tricky levels,
         and interactive enemies. Built with JavaScript and canvas.`,
      project2Tech: 'Technologies I have used',
      project2TechList: 'JavaScript, OOP, HTML, CSS',
      project2Learned: 'What I have learned',
      project2LearnedText:
        `I deepened my skills in OOP and game loops while
         adding features like player movement, enemy logic,
         collisions and more.`,
      project2ShowMore: 'Show me more',
      project2ShowLess: 'Show me less',

      // Arrow Right => unchanged, just the label if needed
    },

    DE: {
      verticalTitle: 'Meine Arbeiten',

      // PROJECT 1: JOIN
      project1Title: 'Join',
      project1About: 'Über das Projekt',
      project1AboutText:
        `Ein Aufgabenmanager inspiriert vom Kanban-System.
         Aufgaben anlegen und per Drag & Drop organisieren, Kategorien zuweisen.`,
      project1Tech: 'Verwendete Technologien',
      project1TechList: 'JavaScript, HTML, CSS, Firebase',
      project1Learned: 'Was ich gelernt habe',
      project1LearnedText:
        `Ich habe meine JSDoc-Kenntnisse vertieft, saubereren Code geschrieben
         und erfolgreich in einem kleinen Team mit gemeinsamem Code gearbeitet.`,
      project1ShowMore: 'Mehr anzeigen',
      project1ShowLess: 'Weniger anzeigen',
      github: 'GitHub',
      liveTest: 'Live-Demo',

      // PROJECT 2: EL POLLO LOCO
      project2Title: 'El Pollo Loco',
      project2About: 'Über das Projekt',
      project2AboutText:
        `Ein 2D-Jump’n’Run-Spiel mit lustigen Animationen, kniffligen Leveln
         und interaktiven Gegnern. Erstellt mit JavaScript und Canvas.`,
      project2Tech: 'Verwendete Technologien',
      project2TechList: 'JavaScript, OOP, HTML, CSS',
      project2Learned: 'Was ich gelernt habe',
      project2LearnedText:
        `Ich habe meine OOP- und Game-Loop-Fähigkeiten vertieft und
         Features wie Spielerbewegung, Gegner-Logik, Kollisionen u.v.m. hinzugefügt.`,
      project2ShowMore: 'Mehr anzeigen',
      project2ShowLess: 'Weniger anzeigen',
    }
  };

  scrollNext() {
    if (!this.scrollEl?.nativeElement) {
      console.warn('No nativeElement on scrollEl');
      return;
    }
    this.scrollEl.nativeElement.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth'
    });
  }

  toggleExpandCard1() {
    this.isProject1Expanded = !this.isProject1Expanded;
  }

  toggleExpandCard2() {
    this.isProject2Expanded = !this.isProject2Expanded;
  }
}
