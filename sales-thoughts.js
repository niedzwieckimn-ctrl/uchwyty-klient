(function (global) {
  'use strict';

  const CONTENT = Object.freeze({
    pl: Object.freeze({
      title: "Impuls na dziś",
      thoughts: Object.freeze([
        "Jeden uchwyt potrafi zmienić charakter całych mebli.",
        "Kolor przyciąga wzrok, a ciężar uchwytu najlepiej czuć w dłoni.",
        "Przyłóż uchwyt do frontu — proporcje od razu widać lepiej.",
        "Dwa wykończenia obok siebie ułatwiają wybór koloru.",
        "Dobry detal sprawia, że projekt wygląda na dopracowany.",
        "W dłoni najłatwiej ocenić ciężar i wygodę uchwytu.",
        "Ten sam model w innym kolorze może dać zupełnie inny efekt.",
        "Wybór uchwytu warto zacząć od frontu, na którym będzie zamontowany.",
        "Mat i połysk najlepiej porównać na żywo.",
        "Rozstaw uchwytu warto sprawdzić przed złożeniem zamówienia.",
        "Na tle frontu łatwiej ocenić kształt i kolor uchwytu.",
        "Jedna dobra rozmowa może być początkiem długiej współpracy.",
        "Zapytaj, jaki efekt klient chce osiągnąć w swoim projekcie.",
        "Uchwytu używa się każdego dnia — liczy się także wygoda.",
        "Wygląd ma znaczenie. To, jak uchwyt leży w dłoni, również.",
        "Jedna trafna propozycja może pomóc bardziej niż dziesięć przypadkowych modeli.",
        "Kolor uchwytu może dopełnić front albo stworzyć kontrast.",
        "Styl wnętrza podpowiada, które wykończenie warto pokazać.",
        "Pokaż fakturę z bliska — na zdjęciu nie widać wszystkiego.",
        "Dwa kształty w dłoni łatwiej porównać niż w katalogu.",
        "Przy dużej zabudowie nawet drobna zmiana uchwytu jest widoczna.",
        "Gdy detal pasuje do całości, decyzję podejmuje się łatwiej.",
        "Model, kolor i rozstaw — te trzy rzeczy warto sprawdzić razem.",
        "Najpierw projekt klienta, potem propozycje modeli.",
        "Pytanie o kolor frontu pomaga szybko zawęzić wybór.",
        "Ciężar, kolor i kształt można porównać na jednej ekspozycji.",
        "Próbka w dłoni pomaga ocenić wykończenie bez zgadywania.",
        "Dwie propozycje dopasowane do projektu często wystarczą, by zacząć rozmowę.",
        "O jakości najlepiej rozmawia się przy samym produkcie.",
        "Daj klientowi chwilę na obejrzenie i dotknięcie uchwytu."
      ])
    }),
    de: Object.freeze({
      title: "Ein Impuls für heute",
      thoughts: Object.freeze([
        "Ein einzelner Griff kann den Charakter eines ganzen Möbelstücks verändern.",
        "Die Farbe fällt ins Auge, das Gewicht des Griffs spürt man am besten in der Hand.",
        "Halten Sie den Griff an die Möbelfront – die Proportionen lassen sich sofort besser beurteilen.",
        "Zwei Oberflächen nebeneinander erleichtern die Farbwahl.",
        "Ein gut gewähltes Detail lässt ein Projekt durchdacht wirken.",
        "Gewicht und Handhabung eines Griffs lassen sich am besten in der Hand beurteilen.",
        "Dasselbe Modell kann in einer anderen Farbe ganz anders wirken.",
        "Bei der Griffwahl lohnt es sich, mit der Möbelfront zu beginnen, an der er montiert wird.",
        "Matt und glänzend vergleicht man am besten direkt.",
        "Prüfen Sie den Lochabstand des Griffs, bevor Sie bestellen.",
        "Vor der Möbelfront lassen sich Form und Farbe des Griffs leichter beurteilen.",
        "Ein gutes Gespräch kann der Anfang einer langen Zusammenarbeit sein.",
        "Fragen Sie, welche Wirkung der Kunde mit seinem Projekt erzielen möchte.",
        "Einen Griff benutzt man jeden Tag – auch der Komfort zählt.",
        "Die Optik zählt. Ebenso wichtig ist, wie der Griff in der Hand liegt.",
        "Ein passender Vorschlag hilft oft mehr als zehn beliebige Modelle.",
        "Die Farbe des Griffs kann die Front ergänzen oder einen Kontrast setzen.",
        "Der Stil des Raums gibt Hinweise darauf, welche Oberfläche sich lohnt zu zeigen.",
        "Zeigen Sie die Struktur aus der Nähe – ein Foto zeigt nicht alles.",
        "Zwei Griffformen lassen sich in der Hand leichter vergleichen als im Katalog.",
        "Bei einer großen Möbelfront fällt selbst eine kleine Änderung am Griff auf.",
        "Wenn das Detail zum Ganzen passt, fällt die Entscheidung leichter.",
        "Modell, Farbe und Lochabstand – diese drei Punkte gehören zusammen.",
        "Zuerst das Projekt des Kunden, dann passende Griffmodelle.",
        "Die Frage nach der Frontfarbe grenzt die Auswahl schnell ein.",
        "Gewicht, Farbe und Form lassen sich an einem Musterständer vergleichen.",
        "Ein Muster in der Hand hilft, die Oberfläche ohne Rätselraten zu beurteilen.",
        "Zwei zum Projekt passende Vorschläge reichen oft für einen guten Gesprächseinstieg.",
        "Über Qualität spricht man am besten direkt am Produkt.",
        "Geben Sie dem Kunden einen Moment, den Griff anzusehen und anzufassen."
      ])
    }),
    en: Object.freeze({
      title: "A spark for today",
      thoughts: Object.freeze([
        "One handle can change the character of an entire piece of furniture.",
        "Colour catches the eye; the weight of a handle is best felt in the hand.",
        "Hold the handle against the cabinet front — its proportions become easier to judge.",
        "Two finishes side by side make the colour choice easier.",
        "A well chosen detail makes a project feel considered.",
        "The weight and comfort of a handle are easiest to judge in the hand.",
        "The same model can look entirely different in another colour.",
        "When choosing a handle, start with the cabinet front it will be fitted to.",
        "Matte and glossy finishes are best compared in person.",
        "Check the handle's hole spacing before placing an order.",
        "Against the cabinet front, a handle's shape and colour are easier to judge.",
        "One good conversation can be the start of a lasting partnership.",
        "Ask what effect the customer wants their project to create.",
        "A handle is used every day — comfort matters too.",
        "Appearance matters. So does the way a handle feels in the hand.",
        "One well matched suggestion can help more than ten random models.",
        "The handle's colour can complement the front or create contrast.",
        "The room's style can guide which finish to show first.",
        "Show the texture up close — a photo cannot show everything.",
        "Two handle shapes are easier to compare in hand than in a catalogue.",
        "On a large bank of cabinets, even a small change of handle is noticeable.",
        "When a detail fits the whole design, the decision becomes easier.",
        "Model, colour and hole spacing — check all three together.",
        "Start with the customer's project, then suggest suitable models.",
        "Asking about the cabinet colour quickly narrows the options.",
        "Weight, colour and shape can all be compared on one display.",
        "Holding a sample helps assess the finish without guesswork.",
        "Two suggestions suited to the project are often enough to start a conversation.",
        "Quality is easiest to discuss with the product in hand.",
        "Give the customer a moment to look at and touch the handle."
      ])
    }),
    es: Object.freeze({
      title: "Un impulso para hoy",
      thoughts: Object.freeze([
        "Un tirador puede cambiar el carácter de todo un mueble.",
        "El color atrae la mirada; el peso del tirador se aprecia mejor en la mano.",
        "Acerca el tirador al frente del mueble: así es más fácil valorar sus proporciones.",
        "Dos acabados uno junto al otro facilitan la elección del color.",
        "Un detalle bien elegido hace que el proyecto se vea cuidado.",
        "El peso y la comodidad de un tirador se aprecian mejor al sostenerlo.",
        "El mismo modelo puede dar un resultado muy distinto en otro color.",
        "Para elegir un tirador, empieza por el frente donde se instalará.",
        "Los acabados mate y brillante se comparan mejor en persona.",
        "Comprueba la distancia entre tornillos del tirador antes de hacer el pedido.",
        "Sobre el frente del mueble es más fácil valorar la forma y el color del tirador.",
        "Una buena conversación puede ser el comienzo de una larga colaboración.",
        "Pregunta qué efecto quiere lograr el cliente con su proyecto.",
        "Un tirador se usa cada día: la comodidad también importa.",
        "La apariencia importa. También cómo se siente el tirador en la mano.",
        "Una propuesta acertada puede ayudar más que diez modelos elegidos al azar.",
        "El color del tirador puede complementar el frente o crear contraste.",
        "El estilo del espacio ayuda a decidir qué acabado mostrar primero.",
        "Muestra la textura de cerca: una foto no lo enseña todo.",
        "Es más fácil comparar dos formas de tirador en la mano que en un catálogo.",
        "En un conjunto grande de muebles, incluso un pequeño cambio de tirador se nota.",
        "Cuando el detalle encaja con el conjunto, resulta más fácil decidir.",
        "Modelo, color y distancia entre tornillos: conviene revisar los tres.",
        "Primero el proyecto del cliente; después, los modelos que encajan.",
        "Preguntar por el color del frente ayuda a reducir las opciones.",
        "Peso, color y forma se pueden comparar en un mismo expositor.",
        "Tener una muestra en la mano ayuda a valorar el acabado sin adivinar.",
        "Dos propuestas adaptadas al proyecto suelen bastar para iniciar una conversación.",
        "Es más fácil hablar de calidad con el producto delante.",
        "Deja al cliente un momento para mirar y tocar el tirador."
      ])
    }),
    it: Object.freeze({
      title: "Uno slancio per oggi",
      thoughts: Object.freeze([
        "Una maniglia può cambiare il carattere di un intero mobile.",
        "Il colore attira lo sguardo; il peso della maniglia si sente meglio in mano.",
        "Accosta la maniglia all'anta: le proporzioni diventano più facili da valutare.",
        "Due finiture affiancate rendono più semplice scegliere il colore.",
        "Un dettaglio scelto bene fa apparire il progetto più curato.",
        "Peso e comodità di una maniglia si valutano meglio tenendola in mano.",
        "Lo stesso modello può dare un effetto del tutto diverso in un altro colore.",
        "Per scegliere una maniglia, parti dall'anta su cui verrà montata.",
        "Le finiture opache e lucide si confrontano meglio dal vivo.",
        "Controlla l'interasse della maniglia prima di ordinare.",
        "Accanto all'anta è più facile valutare forma e colore della maniglia.",
        "Una buona conversazione può essere l'inizio di una lunga collaborazione.",
        "Chiedi quale effetto il cliente vuole ottenere con il suo progetto.",
        "Una maniglia si usa ogni giorno: conta anche la comodità.",
        "L'aspetto conta. Conta anche come la maniglia sta in mano.",
        "Una proposta azzeccata può aiutare più di dieci modelli scelti a caso.",
        "Il colore della maniglia può completare l'anta o creare contrasto.",
        "Lo stile dell'ambiente suggerisce quale finitura mostrare per prima.",
        "Mostra la texture da vicino: una foto non racconta tutto.",
        "Due forme di maniglia si confrontano meglio in mano che su un catalogo.",
        "Su una grande composizione, anche un piccolo cambio di maniglia si nota.",
        "Quando il dettaglio si armonizza con l'insieme, scegliere è più facile.",
        "Modello, colore e interasse: vale la pena controllarli insieme.",
        "Prima il progetto del cliente, poi i modelli adatti.",
        "Chiedere il colore dell'anta aiuta a restringere la scelta.",
        "Peso, colore e forma si possono confrontare sullo stesso espositore.",
        "Tenere un campione in mano aiuta a valutare la finitura senza tirare a indovinare.",
        "Due proposte adatte al progetto spesso bastano per iniziare una conversazione.",
        "È più facile parlare di qualità con il prodotto davanti.",
        "Lascia al cliente un momento per osservare e toccare la maniglia."
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
