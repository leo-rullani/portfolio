import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language, NAVIGATION_LABELS } from '../i18n/language';

interface ReferencesCopy {
  desktopHeadline: string;
  mobileHeadline: string;
  mobileSubtitle: string;
  swipeHint: string;
  ref1Quote: string;
  ref1Name: string;
  ref1Project: string;
  ref2Quote: string;
  ref2Name: string;
  ref2Project: string;
  ref3Quote: string;
  ref3Name: string;
  ref3Project: string;
  ref4Quote: string;
  ref4Name: string;
  ref4Project: string;
  ref5Quote: string;
  ref5Name: string;
  ref5Project: string;
  ref6Quote: string;
  ref6Name: string;
  ref6Project: string;
}

@Component({
  selector: 'references-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references-me.component.html',
  styleUrls: ['./references-me.component.scss']
})
export class ReferencesMeComponent {

  readonly navigationLabels = NAVIGATION_LABELS;

  @Input() activeLang: Language = 'EN';

  @Input() scrollEl?: ElementRef<HTMLDivElement>;

  @ViewChild('localScrollEl', { static: true })
  localScrollEl!: ElementRef<HTMLDivElement>;

  @ViewChild('carouselEl', { static: false })
  carouselEl?: ElementRef<HTMLDivElement>;
  private currentIndexMobile = 0;

  readonly text: Record<Language, ReferencesCopy> = {
    EN: {
      desktopHeadline: 'References',
      mobileHeadline: 'Need a teamplayer?',
      mobileSubtitle: 'Here’s what my colleagues say about me',
      swipeHint: 'Swipe to explore more references',

      ref1Quote: `“Leo is a reliable and friendly person. He works in a structured way
                  and writes clear code. I recommend him as a colleague.”`,
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Project Join',

      ref2Quote: `“He is a trustworthy teamplayer and can cope with the stress of deadlines.”`,
      ref2Name: 'Marco Meister',
      ref2Project: 'Project SFL',

      ref3Quote: `“Leo integrated data-driven statistics into the graphics workflow
                  for SFL live TV broadcasts.”`,
      ref3Name: 'BBM Productions',
      ref3Project: 'SFL Live-TV Broadcast',

      ref4Quote: `“He demonstrated good problem-solving skills and
                  delivered features on time. Great code clarity!”`,
      ref4Name: 'Marcel Göhn',
      ref4Project: 'Kochwelt',

      ref5Quote: `“We worked together on multiple sprints.
                  His friendly approach and structured manner helped the team a lot.”`,
      ref5Name: 'NEP Switzerland AG',
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
      swipeHint: 'Wischen Sie für weitere Referenzen',

      ref1Quote: `„Leo ist zuverlässig und freundlich. Arbeitet strukturiert
                  und schreibt sauberen Code. Ich empfehle ihn als Kollegen.“`,
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Projekt Join',

      ref2Quote: `„Er ist ein vertrauenswürdiger Teamplayer und kann
                  dem Stress von Deadlines standhalten.“`,
      ref2Name: 'Marco Meister',
      ref2Project: 'Projekt SFL',

      ref3Quote: `„Leo integrierte datengetriebene Statistiken in den Grafik-Workflow
                  für SFL-Live-TV-Broadcasts.“`,
      ref3Name: 'BBM Productions',
      ref3Project: 'SFL Live-TV-Broadcast',

      ref4Quote: `„Er zeigte gute Problemlösungskompetenz und
                  lieferte Features termingerecht. Toller, übersichtlicher Code!“`,
      ref4Name: 'Marcel Göhn',
      ref4Project: 'Kochwelt',

      ref5Quote: `„Wir haben in mehreren Sprints zusammengearbeitet.
                  Sein freundlicher Umgang und strukturierte Art halfen dem Team sehr.“`,
      ref5Name: 'NEP Switzerland AG',
      ref5Project: 'Projekt SFL',

      ref6Quote: `„Er ist ein zuverlässiger und freundlicher Mensch,
                  stets hilfsbereit und verfeinert den Code für beste Ergebnisse.“`,
      ref6Name: 'Federica Emulo',
      ref6Project: 'Projekt SPEAT'
    },

    IT: {
      desktopHeadline: 'Referenze',
      mobileHeadline: 'Cerchi un team player?',
      mobileSubtitle: 'Ecco cosa dicono di me i miei colleghi',
      swipeHint: 'Scorri per vedere altre referenze',
      ref1Quote: '“Leo è una persona affidabile e cordiale. Lavora in modo strutturato e scrive codice chiaro. Lo consiglio come collega.”',
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Progetto Join',
      ref2Quote: '“È un team player affidabile e sa gestire bene la pressione delle scadenze.”',
      ref2Name: 'Marco Meister',
      ref2Project: 'Progetto SFL',
      ref3Quote: '“Leo ha integrato statistiche data-driven nel workflow grafico delle dirette televisive SFL.”',
      ref3Name: 'BBM Productions',
      ref3Project: 'Diretta TV SFL',
      ref4Quote: '“Ha dimostrato ottime capacità di problem solving e ha consegnato le funzionalità nei tempi previsti. Codice molto chiaro!”',
      ref4Name: 'Marcel Göhn',
      ref4Project: 'Kochwelt',
      ref5Quote: '“Abbiamo lavorato insieme in diversi sprint. Il suo approccio cordiale e il metodo strutturato sono stati di grande aiuto per il team.”',
      ref5Name: 'NEP Switzerland AG',
      ref5Project: 'Progetto SFL',
      ref6Quote: '“È una persona affidabile e cordiale, sempre pronta ad aiutare e a migliorare il codice per ottenere il risultato migliore.”',
      ref6Name: 'Federica Emulo',
      ref6Project: 'Progetto SPEAT'
    },

    FR: {
      desktopHeadline: 'Références',
      mobileHeadline: 'Vous cherchez un esprit d’équipe ?',
      mobileSubtitle: 'Voici ce que mes collègues disent de moi',
      swipeHint: 'Balayez pour découvrir d’autres références',
      ref1Quote: '« Leo est une personne fiable et sympathique. Il travaille de façon structurée et écrit un code clair. Je le recommande comme collègue. »',
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Projet Join',
      ref2Quote: '« C’est un coéquipier digne de confiance qui sait gérer la pression des délais. »',
      ref2Name: 'Marco Meister',
      ref2Project: 'Projet SFL',
      ref3Quote: '« Leo a intégré des statistiques pilotées par les données dans le workflow graphique des retransmissions TV en direct de la SFL. »',
      ref3Name: 'BBM Productions',
      ref3Project: 'Retransmission TV SFL',
      ref4Quote: '« Il a fait preuve de solides capacités de résolution de problèmes et a livré les fonctionnalités dans les délais. Un code très clair ! »',
      ref4Name: 'Marcel Göhn',
      ref4Project: 'Kochwelt',
      ref5Quote: '« Nous avons travaillé ensemble sur plusieurs sprints. Son approche amicale et sa méthode structurée ont beaucoup aidé l’équipe. »',
      ref5Name: 'NEP Switzerland AG',
      ref5Project: 'Projet SFL',
      ref6Quote: '« C’est une personne fiable et sympathique, toujours prête à aider et à affiner le code pour obtenir les meilleurs résultats. »',
      ref6Name: 'Federica Emulo',
      ref6Project: 'Projet SPEAT'
    },

    ES: {
      desktopHeadline: 'Referencias',
      mobileHeadline: '¿Buscas a alguien que sepa trabajar en equipo?',
      mobileSubtitle: 'Esto es lo que mis compañeros dicen de mí',
      swipeHint: 'Desliza para ver más referencias',
      ref1Quote: '«Leo es una persona fiable y amable. Trabaja de forma estructurada y escribe código claro. Lo recomiendo como compañero.»',
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Proyecto Join',
      ref2Quote: '«Es un compañero de equipo de confianza y sabe manejar la presión de los plazos.»',
      ref2Name: 'Marco Meister',
      ref2Project: 'Proyecto SFL',
      ref3Quote: '«Leo integró estadísticas basadas en datos en el flujo gráfico de las retransmisiones televisivas en directo de la SFL.»',
      ref3Name: 'BBM Productions',
      ref3Project: 'Emisión en directo SFL',
      ref4Quote: '«Demostró una gran capacidad para resolver problemas y entregó las funcionalidades a tiempo. ¡Código muy claro!»',
      ref4Name: 'Marcel Göhn',
      ref4Project: 'Kochwelt',
      ref5Quote: '«Trabajamos juntos en varios sprints. Su trato amable y su forma estructurada de trabajar ayudaron mucho al equipo.»',
      ref5Name: 'NEP Switzerland AG',
      ref5Project: 'Proyecto SFL',
      ref6Quote: '«Es una persona fiable y amable, siempre dispuesta a ayudar y a perfeccionar el código para lograr los mejores resultados.»',
      ref6Name: 'Federica Emulo',
      ref6Project: 'Proyecto SPEAT'
    },

    SQ: {
      desktopHeadline: 'Referenca',
      mobileHeadline: 'Po kërkoni një bashkëpunëtor që punon mirë në ekip?',
      mobileSubtitle: 'Ja çfarë thonë kolegët e mi për mua',
      swipeHint: 'Rrëshqit për të parë më shumë referenca',
      ref1Quote: '“Leo është person i besueshëm dhe miqësor. Punon në mënyrë të strukturuar dhe shkruan kod të qartë. E rekomandoj si koleg.”',
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Projekti Join',
      ref2Quote: '“Është një anëtar i besueshëm i ekipit dhe e përballon mirë presionin e afateve.”',
      ref2Name: 'Marco Meister',
      ref2Project: 'Projekti SFL',
      ref3Quote: '“Leo integroi statistika të bazuara në të dhëna në procesin grafik për transmetimet televizive live të SFL-së.”',
      ref3Name: 'BBM Productions',
      ref3Project: 'Transmetim Live-TV SFL',
      ref4Quote: '“Tregoi aftësi të mira në zgjidhjen e problemeve dhe i dorëzoi veçoritë në kohë. Kod shumë i qartë!”',
      ref4Name: 'Marcel Göhn',
      ref4Project: 'Kochwelt',
      ref5Quote: '“Kemi punuar bashkë në disa sprinte. Qasja e tij miqësore dhe mënyra e strukturuar e ndihmuan shumë ekipin.”',
      ref5Name: 'NEP Switzerland AG',
      ref5Project: 'Projekti SFL',
      ref6Quote: '“Është person i besueshëm dhe miqësor, gjithmonë i gatshëm të ndihmojë dhe ta përmirësojë kodin për rezultatet më të mira.”',
      ref6Name: 'Federica Emulo',
      ref6Project: 'Projekti SPEAT'
    },

    GSW: {
      desktopHeadline: 'Referenze',
      mobileHeadline: 'Suchsch en Teamplayer?',
      mobileSubtitle: 'Das säged mini Kolleginne und Kollege über mich',
      swipeHint: 'Wisch wiiter für meh Referenze',
      ref1Quote: '«De Leo isch zuverlässig und sympathisch. Er schafft strukturiert und schribt klare Code. Ich empfehle ihn gern als Kollege.»',
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Projekt Join',
      ref2Quote: '«Er isch en verlässliche Teamplayer und chunnt au mit em Druck vo Deadlines guet z Schlag.»',
      ref2Name: 'Marco Meister',
      ref2Project: 'Projekt SFL',
      ref3Quote: '«De Leo het datebasierte Statistike in de Grafik-Workflow für d SFL-Live-TV-Übertragige integriert.»',
      ref3Name: 'BBM Productions',
      ref3Project: 'SFL Live-TV-Broadcast',
      ref4Quote: '«Er het gueti Problemlösigs-Skills zeigt und d Features pünktlich glieferet. Sehr klare Code!»',
      ref4Name: 'Marcel Göhn',
      ref4Project: 'Kochwelt',
      ref5Quote: '«Mir hend über mehri Sprints zämegschafft. Mit sinere sympathische und strukturierte Art het er em Team sehr ghulfe.»',
      ref5Name: 'NEP Switzerland AG',
      ref5Project: 'Projekt SFL',
      ref6Quote: '«Er isch zuverlässig und sympathisch, hilft immer gern und verbessert de Code, bis s Resultat stimmt.»',
      ref6Name: 'Federica Emulo',
      ref6Project: 'Projekt SPEAT'
    },

    PT: {
      desktopHeadline: 'Referências',
      mobileHeadline: 'Procura alguém que saiba trabalhar em equipa?',
      mobileSubtitle: 'O que os meus colegas dizem sobre mim',
      swipeHint: 'Deslize para ver mais referências',
      ref1Quote: '«O Leo é uma pessoa fiável e simpática. Trabalha de forma estruturada e escreve código claro. Recomendo-o como colega.»',
      ref1Name: 'Yannis Meyer',
      ref1Project: 'Projeto Join',
      ref2Quote: '«É um colega de equipa de confiança e sabe lidar bem com a pressão dos prazos.»',
      ref2Name: 'Marco Meister',
      ref2Project: 'Projeto SFL',
      ref3Quote: '«O Leo integrou estatísticas orientadas por dados no workflow gráfico das transmissões televisivas em direto da SFL.»',
      ref3Name: 'BBM Productions',
      ref3Project: 'Transmissão TV em direto SFL',
      ref4Quote: '«Demonstrou boas capacidades de resolução de problemas e entregou as funcionalidades dentro do prazo. Código muito claro!»',
      ref4Name: 'Marcel Göhn',
      ref4Project: 'Kochwelt',
      ref5Quote: '«Trabalhámos juntos em vários sprints. A sua abordagem simpática e forma estruturada de trabalhar ajudaram muito a equipa.»',
      ref5Name: 'NEP Switzerland AG',
      ref5Project: 'Projeto SFL',
      ref6Quote: '«É uma pessoa fiável e simpática, sempre pronta a ajudar e a aperfeiçoar o código para obter os melhores resultados.»',
      ref6Name: 'Federica Emulo',
      ref6Project: 'Projeto SPEAT'
    }
  };

  scrollNext(): void {
    const distance = window.innerWidth;
    if (this.scrollEl?.nativeElement) {
      this.scrollEl.nativeElement.scrollBy({
        left: distance,
        behavior: 'smooth'
      });
    } else {
      if (this.localScrollEl?.nativeElement) {
        this.localScrollEl.nativeElement.scrollBy({
          left: distance,
          behavior: 'smooth'
        });
      } else {
      }
    }
}

  scrollToNextBox(): void {
    if (!this.carouselEl) {
      return;
    }
    this.currentIndexMobile++;
    if (this.currentIndexMobile >= 6) {
      this.currentIndexMobile = 0;
    }
    const boxWidth = 0.85 * window.innerWidth;
    const gapPx = 16;
    const scrollLeft = (boxWidth + gapPx) * this.currentIndexMobile;

    this.carouselEl.nativeElement.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }
}
