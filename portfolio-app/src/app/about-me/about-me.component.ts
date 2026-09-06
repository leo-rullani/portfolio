import { Component, Input, ElementRef } from '@angular/core';
import { Language, NAVIGATION_LABELS } from '../i18n/language';

interface AboutCopy {
  verticalTitle: string;
  paragraphs: [string, string, string];
  iAmTitle: string;
  location: string;
  remote: string;
  relocate: string;
  contactButton: string;
  businessEyebrow: string;
  businessTitle: string;
  businessRole: string;
  businessDescription: string;
  businessMeta: string;
  businessLinkLabel: string;
}

@Component({
  selector: 'about-me',
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  readonly navigationLabels = NAVIGATION_LABELS;
  @Input() activeLang: Language = 'EN';
  @Input() scrollEl!: ElementRef<HTMLDivElement>;
  readonly businessUrl = 'https://www.moneyhouse.ch/de/company/rullani-datalab-13037952311';
  readonly text: Record<Language, AboutCopy> = {
    EN: {
      verticalTitle: 'Why me',
      paragraphs: [
        `My passion for development started on the sidelines of football stadiums – not with the ball, but with code. Designing and programming real-time TV graphics for live football broadcasts sparked my fascination for frontend engineering. Today, I combine my experience in graphics, data, and UI to build clean, scalable, and visually striking digital products.`,
        `Armed with a Master’s in Data Science and a Bachelor’s in Business Economics Major Sportmanagement, I thrive at the intersection of creativity and analytics. As the Team Lead Graphics and Software Engineer at BBM Productions, I’m driven by bridging bold ideas with rock-solid code—bringing data-driven visuals to life for audiences around the globe. From advanced 3D animations to interactive dashboards, I believe in shaping solutions that not only perform seamlessly, but also captivate and inspire.`,
        `For me, innovation is more than just adopting the latest technology—it’s about challenging the status quo and pushing boundaries. Every new project is an opportunity to learn, grow, and craft experiences that resonate with users, whether they’re on the pitch or in the boardroom. That relentless curiosity is what keeps me passionate about engineering every single day.`
      ],
      iAmTitle: 'I am',
      location: 'Wohlen, Switzerland',
      remote: 'Open to remote work',
      relocate: 'Open to relocation',
      contactButton: 'Contact me',
      businessEyebrow: 'Independent practice',
      businessTitle: 'Rullani DataLab',
      businessRole: 'Founder & Owner',
      businessDescription: 'Data analysis, digital application development and data-driven graphics for live TV — from robust interfaces to production-ready visual systems.',
      businessMeta: 'Active Swiss sole proprietorship · UID CHE-230.957.470',
      businessLinkLabel: 'View company register entry'
    },
    DE: {
      verticalTitle: 'Warum ich',
      paragraphs: [
        `Meine Leidenschaft für Software begann am Rand von Fußballstadien – nicht mit dem Ball, sondern mit Code. Das Entwickeln von Echtzeit-TV-Grafiken für Live-Fußballübertragungen entfachte meine Begeisterung für Frontend-Engineering. Heute verbinde ich Erfahrung in Grafik, Daten und UI, um schlanke, skalierbare und optisch ansprechende digitale Produkte zu bauen.`,
        `Mit einem Master in Data Science und einem Bachelor in Business Economics (Sportmanagement) liebe ich die Schnittstelle von Kreativität und Analytik. Als Team Lead Graphics und Software Engineer bei BBM Productions setze ich mutige Ideen mit solidem Code um und erwecke datengesteuerte Visuals weltweit zum Leben. Von 3D-Animationen bis zu interaktiven Dashboards – ich glaube an Lösungen, die reibungslos funktionieren und gleichzeitig inspirieren.`,
        `Für mich bedeutet Innovation mehr als nur den Einsatz neuer Technologien – es geht darum, bestehende Grenzen zu hinterfragen und zu verschieben. Jedes neue Projekt bietet die Chance, zu lernen, zu wachsen und Erlebnisse zu schaffen, die bei den Nutzern Anklang finden, ob auf dem Spielfeld oder im Konferenzraum. Diese Neugier treibt mich täglich im Engineering voran.`
      ],
      iAmTitle: 'Ich bin',
      location: 'Wohlen, Schweiz',
      remote: 'offen für Remote-Arbeit',
      relocate: 'umzugsbereit',
      contactButton: 'Kontaktiere mich',
      businessEyebrow: 'Selbstständige Tätigkeit',
      businessTitle: 'Rullani DataLab',
      businessRole: 'Gründer & Inhaber',
      businessDescription: 'Datenanalyse, Entwicklung digitaler Anwendungen und datengetriebene Grafiken für Live-TV — von robusten Schnittstellen bis zu produktionsreifen visuellen Systemen.',
      businessMeta: 'Aktives Schweizer Einzelunternehmen · UID CHE-230.957.470',
      businessLinkLabel: 'Handelsregistereintrag ansehen'
    },
    IT: {
      verticalTitle: 'Perché io',
      paragraphs: [
        `La mia passione per lo sviluppo è nata a bordo campo negli stadi di calcio – non con il pallone, ma con il codice. Progettare e programmare grafiche TV in tempo reale per le dirette calcistiche ha acceso il mio interesse per il frontend engineering. Oggi unisco la mia esperienza in grafica, dati e UI per creare prodotti digitali puliti, scalabili e di forte impatto visivo.`,
        `Con un Master in Data Science e un Bachelor in Business Economics con specializzazione in Sport Management, lavoro con entusiasmo all’incrocio tra creatività e analisi. Come Team Lead Graphics e Software Engineer presso BBM Productions, trasformo idee audaci in codice solido, dando vita a visualizzazioni basate sui dati per un pubblico globale. Dalle animazioni 3D avanzate alle dashboard interattive, credo in soluzioni che non solo funzionano in modo impeccabile, ma sanno anche coinvolgere e ispirare.`,
        `Per me, innovare significa più che adottare le ultime tecnologie: significa mettere in discussione lo status quo e superare i limiti. Ogni nuovo progetto è un’occasione per imparare, crescere e creare esperienze che parlino agli utenti, sul campo come in sala riunioni. È questa curiosità instancabile che alimenta ogni giorno la mia passione per l’ingegneria.`
      ],
      iAmTitle: 'Sono',
      location: 'Wohlen, Svizzera',
      remote: 'Disponibile per il lavoro da remoto',
      relocate: 'Disponibile al trasferimento',
      contactButton: 'Contattami',
      businessEyebrow: 'Attività indipendente',
      businessTitle: 'Rullani DataLab',
      businessRole: 'Fondatore e titolare',
      businessDescription: 'Analisi dei dati, sviluppo di applicazioni digitali e grafiche data-driven per la TV in diretta — dalle interfacce robuste ai sistemi visivi pronti per la produzione.',
      businessMeta: 'Ditta individuale svizzera attiva · IDI CHE-230.957.470',
      businessLinkLabel: 'Visualizza l’iscrizione nel registro'
    },
    FR: {
      verticalTitle: 'Pourquoi moi',
      paragraphs: [
        `Ma passion pour le développement est née au bord des terrains de football – non pas avec le ballon, mais avec le code. La conception et la programmation de graphiques TV en temps réel pour les retransmissions en direct ont éveillé mon intérêt pour l’ingénierie frontend. Aujourd’hui, je combine mon expérience du graphisme, des données et de l’UI pour créer des produits numériques épurés, évolutifs et visuellement marquants.`,
        `Titulaire d’un Master en Data Science et d’un Bachelor en Business Economics, spécialisation Sport Management, je m’épanouis à la croisée de la créativité et de l’analyse. En tant que Team Lead Graphics et Software Engineer chez BBM Productions, je transforme des idées ambitieuses en code robuste et donne vie à des visuels pilotés par les données pour un public international. Des animations 3D avancées aux tableaux de bord interactifs, je conçois des solutions à la fois fluides, captivantes et inspirantes.`,
        `Pour moi, innover ne consiste pas seulement à adopter les dernières technologies : il s’agit de remettre en question le statu quo et de repousser les limites. Chaque projet est une occasion d’apprendre, de progresser et de créer des expériences qui parlent aux utilisateurs, sur le terrain comme en salle de réunion. Cette curiosité constante nourrit chaque jour ma passion pour l’ingénierie.`
      ],
      iAmTitle: 'Je suis',
      location: 'Wohlen, Suisse',
      remote: 'Disponible pour le télétravail',
      relocate: 'Mobile géographiquement',
      contactButton: 'Me contacter',
      businessEyebrow: 'Activité indépendante',
      businessTitle: 'Rullani DataLab',
      businessRole: 'Fondateur et propriétaire',
      businessDescription: 'Analyse de données, développement d’applications numériques et graphiques pilotés par les données pour la télévision en direct — des interfaces robustes aux systèmes visuels prêts pour la production.',
      businessMeta: 'Entreprise individuelle suisse active · IDE CHE-230.957.470',
      businessLinkLabel: 'Voir l’inscription au registre'
    },
    ES: {
      verticalTitle: 'Por qué yo',
      paragraphs: [
        `Mi pasión por el desarrollo nació al borde de los campos de fútbol, no con el balón, sino con el código. Diseñar y programar gráficos de televisión en tiempo real para retransmisiones deportivas despertó mi interés por la ingeniería frontend. Hoy combino mi experiencia en gráficos, datos y UI para crear productos digitales limpios, escalables y visualmente impactantes.`,
        `Con un Máster en Data Science y un Bachelor en Business Economics especializado en Sport Management, disfruto trabajando en la intersección entre creatividad y análisis. Como Team Lead Graphics y Software Engineer en BBM Productions, convierto ideas ambiciosas en código sólido y doy vida a visualizaciones basadas en datos para audiencias de todo el mundo. Desde animaciones 3D avanzadas hasta dashboards interactivos, creo soluciones que funcionan con fluidez y, al mismo tiempo, cautivan e inspiran.`,
        `Para mí, innovar es mucho más que adoptar la última tecnología: significa cuestionar el statu quo y ampliar los límites. Cada proyecto es una oportunidad para aprender, crecer y crear experiencias que conecten con las personas, tanto en el terreno de juego como en la sala de reuniones. Esa curiosidad constante alimenta cada día mi pasión por la ingeniería.`
      ],
      iAmTitle: 'Soy',
      location: 'Wohlen, Suiza',
      remote: 'Disponible para trabajo remoto',
      relocate: 'Disponible para reubicarme',
      contactButton: 'Contáctame',
      businessEyebrow: 'Actividad independiente',
      businessTitle: 'Rullani DataLab',
      businessRole: 'Fundador y propietario',
      businessDescription: 'Análisis de datos, desarrollo de aplicaciones digitales y gráficos basados en datos para televisión en directo — desde interfaces robustas hasta sistemas visuales listos para producción.',
      businessMeta: 'Empresa individual suiza activa · UID CHE-230.957.470',
      businessLinkLabel: 'Ver inscripción en el registro'
    },
    SQ: {
      verticalTitle: 'Pse unë',
      paragraphs: [
        `Pasioni im për zhvillimin nisi në anët e fushave të stadiumeve të futbollit – jo me topin, por me kodin. Projektimi dhe programimi i grafikave televizive në kohë reale për transmetime të drejtpërdrejta të futbollit ndezi interesin tim për inxhinierinë frontend. Sot ndërthur përvojën time në grafikë, të dhëna dhe UI për të ndërtuar produkte digjitale të pastra, të shkallëzueshme dhe vizualisht mbresëlënëse.`,
        `Me një Master në Data Science dhe një Bachelor në Business Economics me fokus në Sport Management, ndihem në elementin tim aty ku takohen krijimtaria dhe analiza. Si Team Lead Graphics dhe Software Engineer në BBM Productions, më motivon të lidh idetë e guximshme me kod të qëndrueshëm — duke sjellë në jetë vizualizime të bazuara në të dhëna për audienca në mbarë botën. Nga animacionet e avancuara 3D deri te dashboard-et interaktive, besoj në zgjidhje që jo vetëm funksionojnë pa probleme, por edhe tërheqin dhe frymëzojnë.`,
        `Për mua, inovacioni është më shumë sesa përdorimi i teknologjive më të fundit — do të thotë të sfidosh status quo-në dhe të shtysh kufijtë. Çdo projekt i ri është një mundësi për të mësuar, për t’u rritur dhe për të krijuar përvoja që lidhen me përdoruesit, qoftë në fushë apo në sallën e mbledhjeve. Kjo kureshtje e pandalshme e ushqen çdo ditë pasionin tim për inxhinierinë.`
      ],
      iAmTitle: 'Unë jam',
      location: 'Wohlen, Zvicër',
      remote: 'I hapur për punë në distancë',
      relocate: 'I gatshëm për t’u zhvendosur',
      contactButton: 'Më kontakto',
      businessEyebrow: 'Veprimtari e pavarur',
      businessTitle: 'Rullani DataLab',
      businessRole: 'Themelues dhe pronar',
      businessDescription: 'Analizë të dhënash, zhvillim aplikacionesh digjitale dhe grafika të bazuara në të dhëna për transmetime televizive live — nga ndërfaqet e qëndrueshme te sistemet vizuale gati për prodhim.',
      businessMeta: 'Ndërmarrje individuale zvicerane aktive · UID CHE-230.957.470',
      businessLinkLabel: 'Shiko regjistrimin e kompanisë'
    },
    GSW: {
      verticalTitle: 'Wieso ich',
      paragraphs: [
        `Mini Liideschaft fürs Entwickle het a de Siitelinie vo Fuessballstadie agfange – nöd mit em Ball, sondern mit Code. S Design und Programmiere vo Echtziit-TV-Grafike für Live-Fuessballübertragige het mini Begeisterig fürs Frontend Engineering gweckt. Hüt verbind ich mini Erfahrig in Grafik, Date und UI, zum sauberi, skalierbari und visuell starchi digitali Produkt z baue.`,
        `Mit eme Master in Data Science und eme Bachelor in Business Economics mit Vertüüfig Sportmanagement fühl ich mich det dehei, wo Kreativität und Analytik zämechömed. Als Team Lead Graphics und Software Engineer bi BBM Productions bring ich muetigi Idee mit stabilem Code zäme und mach datebasierte Visuals für es weltwiits Publikum erlebbar. Vo fortgschrittne 3D-Animatione bis zu interaktive Dashboards entwickle ich Lösige, wo reibungslos funktioniered, fessled und inspiriered.`,
        `Für mich isch Innovation meh als nume die nöischti Technologie iizsetze – es heisst, s Bestehende z hinterfrage und Grenze z verschiebe. Jedes Projekt isch e Chance zum lerne, wachse und Erlebnis z schaffe, wo d Lüüt würkli abholed – uf em Spielfeld genauso wie im Sitzigsruum. Genau die Neugier treibt mich jede Tag im Engineering aa.`
      ],
      iAmTitle: 'Ich bi',
      location: 'Wohle, Schwiiz',
      remote: 'Offe für Remote-Arbeit',
      relocate: 'Bereit zum Zügle',
      contactButton: 'Meld di bi mir',
      businessEyebrow: 'Selbstständigi Tätigkeit',
      businessTitle: 'Rullani DataLab',
      businessRole: 'Gründer & Inhaber',
      businessDescription: 'Dateanalyse, Entwicklig vo digitale Awendige und datebasierte Grafike fürs Live-TV — vo robuste Schnittstelle bis zu produktionsriife visuelle System.',
      businessMeta: 'Aktivs Schwiizer Einzelunternehme · UID CHE-230.957.470',
      businessLinkLabel: 'Firmeneintrag aluege'
    },
    PT: {
      verticalTitle: 'Porquê eu',
      paragraphs: [
        `A minha paixão pelo desenvolvimento nasceu junto às linhas laterais dos estádios de futebol — não com a bola, mas com código. Conceber e programar gráficos televisivos em tempo real para transmissões de futebol despertou o meu fascínio pela engenharia frontend. Hoje, combino experiência em grafismo, dados e UI para criar produtos digitais limpos, escaláveis e visualmente marcantes.`,
        `Com um Mestrado em Data Science e uma licenciatura em Business Economics, com especialização em Sport Management, trabalho na interseção entre criatividade e análise. Como Team Lead Graphics e Software Engineer na BBM Productions, transformo ideias ambiciosas em código robusto e dou vida a visuais orientados por dados para públicos de todo o mundo. De animações 3D avançadas a dashboards interativos, desenvolvo soluções que funcionam de forma fluida, envolvem e inspiram.`,
        `Para mim, inovar é muito mais do que adotar a tecnologia mais recente: é questionar o status quo e ultrapassar limites. Cada projeto é uma oportunidade para aprender, crescer e criar experiências relevantes para as pessoas, dentro do campo ou na sala de reuniões. É esta curiosidade constante que alimenta diariamente a minha paixão pela engenharia.`
      ],
      iAmTitle: 'Sou',
      location: 'Wohlen, Suíça',
      remote: 'Disponível para trabalho remoto',
      relocate: 'Disponível para relocalização',
      contactButton: 'Contacte-me',
      businessEyebrow: 'Atividade independente',
      businessTitle: 'Rullani DataLab',
      businessRole: 'Fundador e proprietário',
      businessDescription: 'Análise de dados, desenvolvimento de aplicações digitais e gráficos orientados por dados para televisão em direto — de interfaces robustas a sistemas visuais prontos para produção.',
      businessMeta: 'Empresa individual suíça ativa · UID CHE-230.957.470',
      businessLinkLabel: 'Ver registo da empresa'
    }
  };

  scrollNext() {
    if (!this.scrollEl?.nativeElement) return;
    this.scrollEl.nativeElement.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  }

  scrollToContact() {
    if (!this.scrollEl?.nativeElement) return;
    const cSlide=document.getElementById('contact-me-slide');
    if(!cSlide){console.warn('No element with ID="contact-me-slide" found.');return;}
    if(window.innerWidth<800){
      cSlide.scrollIntoView({behavior:'smooth',block:'start'});
    }else{
      const cRect=this.scrollEl.nativeElement.getBoundingClientRect();
      const tRect=cSlide.getBoundingClientRect();
      const s=this.scrollEl.nativeElement.scrollLeft;
      this.scrollEl.nativeElement.scrollTo({left:(tRect.left-cRect.left)+s,behavior:'smooth'});
    }
  }
}
