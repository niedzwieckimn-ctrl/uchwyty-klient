(function (global) {
  'use strict';

  const CONTENT = Object.freeze({
    pl: Object.freeze({
      title: "Impuls na dziś",
      thoughts: Object.freeze([
        "Jedna dobra rozmowa może zmienić cały dzień. Zacznij ją.",
        "Zrób dziś miejsce na rozmowę, którą odkładasz.",
        "Nie musisz mieć idealnego początku. Wystarczy pierwszy krok.",
        "Pokaż dziś klientowi detal, który sam lubisz.",
        "Dobry kontakt zaczyna się od uważnego słuchania.",
        "Daj sobie dziś szansę na nową współpracę.",
        "Zacznij od jednej osoby, z którą warto porozmawiać.",
        "Zapytaj o projekt. Daj klientowi przestrzeń, żeby o nim opowiedział.",
        "Twoje tempo nie musi być tempem innych. Zrób swój krok.",
        "Wróć do rozmowy, która dobrze się zaczęła.",
        "Mały krok też się liczy. Wybierz jeden na dziś.",
        "Zamiast szukać idealnych słów, zacznij od szczerego pytania.",
        "Dobra rozmowa nie wymaga pośpiechu.",
        "Przypomnij klientom, w czym możesz im pomóc.",
        "Zrób dziś coś, za co jutro sobie podziękujesz.",
        "Poszukaj jednej okazji do pokazania swojej pracy.",
        "Nie każda rozmowa kończy się zamówieniem. Warto zostawić po niej dobry kontakt.",
        "Pokaż swój pomysł. Daj mu szansę spotkać się z potrzebą klienta.",
        "Dziś też możesz zacząć coś dobrego.",
        "Zapytaj, co jest ważne. Od tego łatwiej zacząć.",
        "Nowy dzień, nowa okazja do dobrej rozmowy.",
        "Zauważ drobny postęp. Nie tylko gotowy wynik.",
        "Podziel się inspiracją, która zwróciła Twoją uwagę.",
        "Jedno konkretne działanie na dziś. Od niego zacznij.",
        "Wracaj do klientów z pomysłem, który może im się przydać.",
        "Pozwól sobie na chwilę oddechu i wróć do rozmowy ze świeżą głową.",
        "Daj klientowi powód, żeby zapamiętał rozmowę z Tobą.",
        "Szukaj wspólnego pomysłu, nie idealnego zdania.",
        "Zacznij od ciekawości. Dowiedz się, co klient chce stworzyć.",
        "Życzymy Ci dziś dobrych rozmów i satysfakcji z pracy."
      ])
    }),
    de: Object.freeze({
      title: "Ein Impuls für heute",
      thoughts: Object.freeze([
        "Ein gutes Gespräch kann den Tag verändern. Beginnen Sie eines.",
        "Nehmen Sie sich heute Zeit für ein Gespräch, das Sie aufgeschoben haben.",
        "Der Anfang muss nicht perfekt sein. Ein erster Schritt genügt.",
        "Zeigen Sie heute ein Detail, das Ihnen selbst gefällt.",
        "Ein guter Kontakt beginnt mit aufmerksamem Zuhören.",
        "Geben Sie einer neuen Zusammenarbeit heute eine Chance.",
        "Beginnen Sie mit einer Person, mit der sich ein Gespräch lohnt.",
        "Fragen Sie nach dem Projekt. Lassen Sie Ihrem Kunden Raum zum Erzählen.",
        "Sie müssen nicht das Tempo anderer halten. Gehen Sie Ihren nächsten Schritt.",
        "Knüpfen Sie an ein Gespräch an, das gut begonnen hat.",
        "Auch ein kleiner Schritt zählt. Wählen Sie einen für heute.",
        "Statt nach perfekten Worten zu suchen, beginnen Sie mit einer ehrlichen Frage.",
        "Ein gutes Gespräch braucht keine Eile.",
        "Erinnern Sie Ihre Kunden daran, wobei Sie helfen können.",
        "Tun Sie heute etwas, wofür Sie sich morgen danken werden.",
        "Suchen Sie eine Gelegenheit, Ihre Arbeit zu zeigen.",
        "Nicht jedes Gespräch führt zu einer Bestellung. Ein guter Kontakt ist trotzdem wertvoll.",
        "Zeigen Sie Ihre Idee. Vielleicht passt sie zum Bedarf Ihres Kunden.",
        "Auch heute können Sie etwas Gutes beginnen.",
        "Fragen Sie, was wichtig ist. Dort lässt sich leichter ansetzen.",
        "Ein neuer Tag, eine neue Gelegenheit für ein gutes Gespräch.",
        "Achten Sie auch auf kleine Fortschritte, nicht nur auf das fertige Ergebnis.",
        "Teilen Sie eine Inspiration, die Ihnen aufgefallen ist.",
        "Eine konkrete Aufgabe für heute. Beginnen Sie damit.",
        "Melden Sie sich bei Kunden mit einer Idee, die ihnen helfen könnte.",
        "Atmen Sie kurz durch und gehen Sie mit frischem Kopf ins Gespräch.",
        "Geben Sie Ihrem Kunden einen Grund, sich an Ihr Gespräch zu erinnern.",
        "Suchen Sie eine gemeinsame Idee, nicht den perfekten Satz.",
        "Beginnen Sie mit Neugier. Finden Sie heraus, was Ihr Kunde gestalten möchte.",
        "Wir wünschen Ihnen heute gute Gespräche und Freude an Ihrer Arbeit."
      ])
    }),
    en: Object.freeze({
      title: "A spark for today",
      thoughts: Object.freeze([
        "One good conversation can change the day. Start one.",
        "Make room today for a conversation you have been putting off.",
        "You do not need a perfect start. A first step is enough.",
        "Show a customer a detail you personally like today.",
        "A good connection starts with listening carefully.",
        "Give a new partnership a chance today.",
        "Start with one person worth talking to.",
        "Ask about the project. Give your customer room to tell you about it.",
        "You do not have to match anyone else’s pace. Take your own next step.",
        "Pick up a conversation that started well.",
        "A small step counts too. Choose one for today.",
        "Instead of searching for perfect words, start with an honest question.",
        "A good conversation does not need to be rushed.",
        "Remind your customers how you can help.",
        "Do something today that your future self will thank you for.",
        "Find one opportunity to share your work.",
        "Not every conversation ends in an order. A good connection is still worth keeping.",
        "Share your idea. Give it a chance to meet a customer’s needs.",
        "Today is another chance to start something good.",
        "Ask what matters. It is a good place to begin.",
        "A new day, a new chance for a good conversation.",
        "Notice small progress, not just the finished result.",
        "Share something that inspired you.",
        "One concrete action for today. Start there.",
        "Reconnect with a customer with an idea they might find useful.",
        "Take a breath and return to the conversation with a fresh mind.",
        "Give your customer a reason to remember your conversation.",
        "Look for a shared idea, not the perfect sentence.",
        "Start with curiosity. Find out what your customer wants to create.",
        "Here’s to good conversations and satisfying work today."
      ])
    }),
    es: Object.freeze({
      title: "Un impulso para hoy",
      thoughts: Object.freeze([
        "Una buena conversación puede cambiar el día. Empieza una.",
        "Haz espacio hoy para esa conversación que llevas posponiendo.",
        "No necesitas un comienzo perfecto. Basta con dar el primer paso.",
        "Muestra hoy a un cliente un detalle que a ti te guste.",
        "Una buena relación empieza por escuchar con atención.",
        "Dale hoy una oportunidad a una nueva colaboración.",
        "Empieza por una persona con la que valga la pena hablar.",
        "Pregunta por el proyecto. Dale al cliente espacio para contártelo.",
        "No tienes que seguir el ritmo de los demás. Da tu propio paso.",
        "Retoma una conversación que empezó bien.",
        "Un paso pequeño también cuenta. Elige uno para hoy.",
        "En lugar de buscar palabras perfectas, empieza con una pregunta sincera.",
        "Una buena conversación no necesita prisas.",
        "Recuerda a tus clientes en qué puedes ayudarles.",
        "Haz hoy algo que mañana te agradecerás.",
        "Busca una oportunidad para mostrar tu trabajo.",
        "No todas las conversaciones terminan en un pedido. Mantener un buen contacto también vale la pena.",
        "Comparte tu idea. Dale la oportunidad de responder a una necesidad del cliente.",
        "Hoy también puedes empezar algo bueno.",
        "Pregunta qué es lo importante. Es un buen punto de partida.",
        "Un nuevo día, una nueva oportunidad para conversar.",
        "Reconoce los pequeños avances, no solo el resultado final.",
        "Comparte algo que te haya inspirado.",
        "Una acción concreta para hoy. Empieza por ahí.",
        "Retoma el contacto con una idea que pueda ser útil al cliente.",
        "Tómate un respiro y vuelve a la conversación con la mente despejada.",
        "Dale al cliente un motivo para recordar vuestra conversación.",
        "Busca una idea compartida, no la frase perfecta.",
        "Empieza por la curiosidad. Descubre qué quiere crear tu cliente.",
        "Te deseamos buenas conversaciones y satisfacción en tu trabajo de hoy."
      ])
    }),
    it: Object.freeze({
      title: "Uno slancio per oggi",
      thoughts: Object.freeze([
        "Una buona conversazione può cambiare la giornata. Iniziane una.",
        "Trova oggi lo spazio per una conversazione che stai rimandando.",
        "Non serve un inizio perfetto. Basta un primo passo.",
        "Mostra oggi a un cliente un dettaglio che piace anche a te.",
        "Un buon rapporto comincia dall’ascolto attento.",
        "Dai oggi una possibilità a una nuova collaborazione.",
        "Comincia da una persona con cui vale la pena parlare.",
        "Chiedi del progetto. Lascia al cliente lo spazio per raccontarlo.",
        "Non devi tenere il ritmo degli altri. Fai il tuo prossimo passo.",
        "Riprendi una conversazione iniziata bene.",
        "Anche un piccolo passo conta. Scegline uno per oggi.",
        "Invece di cercare parole perfette, comincia con una domanda sincera.",
        "Una buona conversazione non ha bisogno di fretta.",
        "Ricorda ai tuoi clienti come puoi aiutarli.",
        "Fai oggi qualcosa per cui domani ti ringrazierai.",
        "Cerca un’occasione per mostrare il tuo lavoro.",
        "Non ogni conversazione porta a un ordine. Un buon contatto merita comunque di essere coltivato.",
        "Condividi la tua idea. Dalle la possibilità di incontrare un’esigenza del cliente.",
        "Anche oggi puoi iniziare qualcosa di buono.",
        "Chiedi che cosa conta. È un buon punto da cui partire.",
        "Un nuovo giorno, una nuova occasione per una buona conversazione.",
        "Nota i piccoli progressi, non solo il risultato finale.",
        "Condividi qualcosa che ti ha ispirato.",
        "Un’azione concreta per oggi. Comincia da lì.",
        "Ricontatta un cliente con un’idea che potrebbe essergli utile.",
        "Prenditi un respiro e torna alla conversazione con la mente fresca.",
        "Dai al cliente un motivo per ricordare la vostra conversazione.",
        "Cerca un’idea condivisa, non la frase perfetta.",
        "Comincia dalla curiosità. Scopri che cosa vuole creare il tuo cliente.",
        "Ti auguriamo buone conversazioni e soddisfazione nel lavoro di oggi."
      ])
    })
  });

  function contentFor(language) {
    return CONTENT[String(language || '').toLowerCase()] || CONTENT.pl;
  }

  function warsawDateParts(date) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Warsaw',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date || new Date());
    const values = {};
    parts.forEach(part => {
      if (part.type !== 'literal') values[part.type] = Number(part.value);
    });
    return values;
  }

  function get(language, date) {
    const selected = contentFor(language);
    const parts = warsawDateParts(date);
    const serialDay = Math.floor(Date.UTC(parts.year, parts.month - 1, parts.day) / 86400000);
    const index = ((serialDay % selected.thoughts.length) + selected.thoughts.length) % selected.thoughts.length;
    return Object.freeze({
      title: selected.title,
      text: selected.thoughts[index],
      index,
      dateKey: `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`
    });
  }

  global.DailySalesThoughts = Object.freeze({ get, count: CONTENT.pl.thoughts.length });
})(window);
