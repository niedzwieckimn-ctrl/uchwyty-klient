(function (global) {
  'use strict';

  const CONTENT = Object.freeze({
    pl: Object.freeze({
      title: 'Myśl na dziś',
      thoughts: Object.freeze([
        'Jeden uchwyt potrafi zmienić charakter całego mebla. Proszę przyłożyć go do frontu.',
        'Nie wybierajmy tylko ze zdjęcia. Proszę wziąć uchwyt do ręki i ocenić go na żywo.',
        'Zdjęcie pokazuje formę. Dopiero kontakt z uchwytem daje pełny obraz.',
        'Proszę porównać oba modele w dłoni — różnicę łatwiej poczuć niż opisać.',
        'Ten detal pojawi się na każdym froncie. Warto zobaczyć, jaki efekt tworzy jako całość.',
        'Nie oglądajmy uchwytu obok mebla. Zobaczmy, co zmienia na samym froncie.',
        'To nie jest wybór jednej sztuki. To decyzja o wyglądzie całej zabudowy.',
        'Jeżeli ten model od razu przyciąga wzrok, sprawdźmy, czy właśnie takiego efektu Pan szuka.',
        'Jeśli uchwyt ma być dyskretny, pokażę model, który dopełni front zamiast z nim konkurować.',
        'Proszę zamknąć oczy i otworzyć szufladę. Tak będzie Pan odczuwał ten wybór każdego dnia.',
        'Rozumiem, że cena ma znaczenie. Najpierw sprawdźmy, czy porównujemy naprawdę takie same produkty.',
        'Podobny wygląd nie oznacza tego samego materiału, wykonania ani gwarancji.',
        'Tu nie wybiera Pan tylko mosiężnego koloru. To uchwyt wykonany z litego mosiądzu.',
        'Proszę wziąć go do ręki. Wtedy łatwiej ocenić, za co się płaci.',
        'Różnicę w cenie płaci się raz, a z wybranego uchwytu korzysta się codziennie.',
        'Za tym wyborem stoi sprawdzona jakość i jasno określona gwarancja.',
        'Nie proszę, żeby wierzył mi Pan na słowo. Proszę samemu ocenić uchwyt na żywo.',
        'Jeżeli coś budzi wątpliwość, nazwijmy to teraz: wygląd, użytkowanie czy cena?',
        'Oczywiście, może się Pan zastanowić. Co dokładnie chciałby Pan jeszcze rozstrzygnąć?',
        'Zamiast dokładać kolejny model, ustalmy, co przemawia za każdym z tych dwóch.',
        'Odłóżmy na chwilę cenę. Który model daje meblowi efekt, którego Pan szuka?',
        'Proszę zrobić zdjęcie uchwytu na froncie. Łatwiej ocenić rzeczywisty efekt niż sam produkt.',
        'Jeśli decyzję podejmujecie wspólnie, pokażmy uchwyt na froncie, a nie osobno na ladzie.',
        'Skoro podoba się na froncie, proszę jeszcze sprawdzić go w dłoni.',
        'Jeżeli wygląd i użytkowanie się zgadzają, policzmy komplet do całego mebla.',
        'Najpierw wybierzmy właściwy model, a następnie podam pełny koszt kompletu.',
        'Nie obiecam terminu bez potwierdzenia. Najpierw sprawdzę rzeczywistą dostępność.',
        'Tego modelu nie ma teraz na stanie. Termin podam dopiero po jego potwierdzeniu.',
        'Mogę pokazać dostępny model, ale tylko jeśli zachowa efekt, którego Pan szuka.',
        'Dobry wybór nie potrzebuje presji. Powinien przekonać Pana zarówno na froncie, jak i w dłoni.'
      ])
    }),
    de: Object.freeze({
      title: 'Verkaufsimpuls des Tages',
      thoughts: Object.freeze([
        'Ein einziger Griff kann den Charakter eines ganzen Möbelstücks verändern. Halten Sie ihn bitte an die Front.',
        'Treffen wir die Wahl nicht nur anhand eines Fotos. Nehmen Sie den Griff bitte in die Hand und beurteilen Sie ihn live.',
        'Ein Foto zeigt die Form. Erst der direkte Kontakt mit dem Griff vermittelt den ganzen Eindruck.',
        'Vergleichen Sie bitte beide Modelle in der Hand — der Unterschied ist leichter zu fühlen als zu beschreiben.',
        'Dieses Detail erscheint an jeder Front. Es lohnt sich zu sehen, welche Gesamtwirkung dadurch entsteht.',
        'Betrachten wir den Griff nicht neben dem Möbelstück. Sehen wir, was er direkt an der Front verändert.',
        'Es geht nicht um die Wahl eines einzelnen Stücks. Es geht um das Erscheinungsbild der gesamten Einrichtung.',
        'Wenn dieses Modell sofort ins Auge fällt, prüfen wir, ob Sie genau diese Wirkung suchen.',
        'Wenn der Griff dezent bleiben soll, zeige ich Ihnen ein Modell, das die Front ergänzt, statt mit ihr zu konkurrieren.',
        'Schließen Sie bitte die Augen und öffnen Sie die Schublade. So werden Sie diese Wahl jeden Tag erleben.',
        'Ich verstehe, dass der Preis wichtig ist. Prüfen wir zuerst, ob wir wirklich vergleichbare Produkte betrachten.',
        'Ein ähnliches Aussehen bedeutet nicht dasselbe Material, dieselbe Verarbeitung oder dieselbe Garantie.',
        'Sie wählen hier nicht nur eine Messingfarbe. Dieser Griff ist aus massivem Messing gefertigt.',
        'Nehmen Sie ihn bitte in die Hand. Dann lässt sich leichter beurteilen, wofür man bezahlt.',
        'Den Preisunterschied zahlt man einmal, den gewählten Griff benutzt man jeden Tag.',
        'Hinter dieser Wahl stehen geprüfte Qualität und klar definierte Garantiebedingungen.',
        'Sie müssen mir nicht einfach glauben. Beurteilen Sie den Griff bitte selbst live.',
        'Wenn etwas Zweifel weckt, benennen wir es jetzt: Optik, Nutzung oder Preis?',
        'Natürlich können Sie darüber nachdenken. Was genau möchten Sie noch klären?',
        'Statt ein weiteres Modell hinzuzunehmen, klären wir, was jeweils für diese beiden spricht.',
        'Lassen wir den Preis kurz beiseite. Welches Modell gibt dem Möbelstück die von Ihnen gewünschte Wirkung?',
        'Machen Sie bitte ein Foto des Griffs an der Front. Die tatsächliche Wirkung lässt sich so leichter beurteilen als das Produkt allein.',
        'Wenn Sie gemeinsam entscheiden, zeigen wir den Griff an der Front und nicht einzeln auf dem Verkaufstisch.',
        'Wenn er Ihnen an der Front gefällt, prüfen Sie ihn bitte noch in der Hand.',
        'Wenn Optik und Nutzung stimmen, zählen wir den vollständigen Satz für das ganze Möbelstück.',
        'Wählen wir zuerst das richtige Modell. Danach nenne ich Ihnen den Gesamtpreis für den vollständigen Satz.',
        'Ich verspreche keinen Termin ohne Bestätigung. Zuerst prüfe ich die tatsächliche Verfügbarkeit.',
        'Dieses Modell ist derzeit nicht auf Lager. Einen Termin nenne ich erst nach der Bestätigung.',
        'Ich kann Ihnen ein verfügbares Modell zeigen, aber nur, wenn es die von Ihnen gewünschte Wirkung beibehält.',
        'Eine gute Wahl braucht keinen Druck. Sie sollte an der Front und in der Hand überzeugen.'
      ])
    }),
    en: Object.freeze({
      title: 'Sales thought of the day',
      thoughts: Object.freeze([
        'One handle can change the character of an entire piece of furniture. Please hold it against the front.',
        'Let us not choose from a photo alone. Please hold the handle and assess it in person.',
        'A photo shows the form. Direct contact with the handle gives you the full picture.',
        'Please compare both models in your hand — the difference is easier to feel than to describe.',
        'This detail will appear on every front. It is worth seeing the effect it creates as a whole.',
        'Let us not view the handle beside the furniture. Let us see what it changes on the front itself.',
        'This is not a choice of one item. It is a decision about the appearance of the entire installation.',
        'If this model catches your eye immediately, let us check whether that is the effect you want.',
        'If the handle should remain discreet, I will show you a model that complements the front instead of competing with it.',
        'Please close your eyes and open the drawer. That is how you will experience this choice every day.',
        'I understand that price matters. First, let us check whether we are truly comparing equivalent products.',
        'A similar appearance does not mean the same material, workmanship or warranty.',
        'You are not choosing a brass colour alone. This handle is made of solid brass.',
        'Please hold it in your hand. It will be easier to judge what you are paying for.',
        'You pay the price difference once, but you use the chosen handle every day.',
        'This choice is backed by proven quality and clearly defined warranty terms.',
        'You do not have to take my word for it. Please assess the handle in person.',
        'If something causes doubt, let us name it now: appearance, use or price?',
        'Of course, you can think about it. What exactly would you still like to resolve?',
        'Instead of adding another model, let us identify what speaks for each of these two.',
        'Let us set the price aside for a moment. Which model gives the furniture the effect you want?',
        'Please take a photo of the handle on the front. It is easier to assess the real effect than the product alone.',
        'If you are deciding together, let us show the handle on the front rather than by itself on the counter.',
        'Since you like it on the front, please check how it feels in your hand as well.',
        'If the appearance and use both feel right, let us count a complete set for the furniture.',
        'First, let us choose the right model. Then I will give you the full price for the complete set.',
        'I will not promise a date without confirmation. First, I will check the actual availability.',
        'This model is not currently in stock. I will give you a date only after it has been confirmed.',
        'I can show you an available model, but only if it preserves the effect you are looking for.',
        'A good choice does not need pressure. It should convince you both on the front and in your hand.'
      ])
    }),
    es: Object.freeze({
      title: 'Idea de venta del día',
      thoughts: Object.freeze([
        'Un solo tirador puede cambiar el carácter de todo un mueble. Póngalo junto al frente, por favor.',
        'No elijamos solo por una foto. Tome el tirador en la mano y valórelo en persona.',
        'La foto muestra la forma. El contacto directo con el tirador ofrece la imagen completa.',
        'Compare ambos modelos en la mano: la diferencia es más fácil de sentir que de describir.',
        'Este detalle aparecerá en cada frente. Conviene ver el efecto que crea en todo el conjunto.',
        'No miremos el tirador al lado del mueble. Veamos qué cambia en el propio frente.',
        'No estamos eligiendo una sola pieza. Estamos decidiendo el aspecto de todo el mobiliario.',
        'Si este modelo llama su atención de inmediato, comprobemos si ese es el efecto que busca.',
        'Si el tirador debe ser discreto, le mostraré un modelo que complemente el frente en lugar de competir con él.',
        'Cierre los ojos y abra el cajón. Así sentirá esta elección cada día.',
        'Entiendo que el precio importa. Primero comprobemos si realmente estamos comparando productos equivalentes.',
        'Un aspecto parecido no significa el mismo material, la misma fabricación ni la misma garantía.',
        'Aquí no elige solo un color latón. Este tirador está fabricado en latón macizo.',
        'Tómelo en la mano. Así será más fácil valorar por qué se paga.',
        'La diferencia de precio se paga una vez; el tirador elegido se utiliza cada día.',
        'Esta elección está respaldada por una calidad comprobada y unas condiciones de garantía claras.',
        'No tiene que creerme sin más. Valore usted mismo el tirador en persona.',
        'Si algo genera dudas, digámoslo ahora: ¿el aspecto, el uso o el precio?',
        'Por supuesto, puede pensarlo. ¿Qué cuestión concreta le gustaría aclarar todavía?',
        'En lugar de añadir otro modelo, veamos qué ventaja aporta cada uno de estos dos.',
        'Dejemos el precio a un lado por un momento. ¿Qué modelo da al mueble el efecto que busca?',
        'Haga una foto del tirador sobre el frente. Resulta más fácil valorar el efecto real que el producto aislado.',
        'Si la decisión es conjunta, mostremos el tirador sobre el frente y no solo sobre el mostrador.',
        'Ya que le gusta sobre el frente, compruebe también cómo se siente en la mano.',
        'Si el aspecto y el uso encajan, calculemos el juego completo para todo el mueble.',
        'Primero elijamos el modelo adecuado. Después le daré el precio total del juego completo.',
        'No prometeré una fecha sin confirmación. Primero comprobaré la disponibilidad real.',
        'Este modelo no está disponible ahora mismo. Le daré una fecha solo cuando esté confirmada.',
        'Puedo mostrarle un modelo disponible, pero solo si mantiene el efecto que está buscando.',
        'Una buena elección no necesita presión. Debe convencerle tanto sobre el frente como en la mano.'
      ])
    }),
    it: Object.freeze({
      title: 'Spunto di vendita del giorno',
      thoughts: Object.freeze([
        'Una sola maniglia può cambiare il carattere di un intero mobile. La accosti all’anta, per favore.',
        'Non scegliamo soltanto da una foto. Prenda la maniglia in mano e la valuti dal vivo.',
        'La foto mostra la forma. Il contatto diretto con la maniglia offre il quadro completo.',
        'Confronti entrambi i modelli in mano: la differenza è più facile da sentire che da descrivere.',
        'Questo dettaglio comparirà su ogni anta. Vale la pena vedere l’effetto che crea nell’insieme.',
        'Non guardiamo la maniglia accanto al mobile. Vediamo cosa cambia direttamente sull’anta.',
        'Non stiamo scegliendo un singolo pezzo. Stiamo decidendo l’aspetto dell’intero arredo.',
        'Se questo modello attira subito l’attenzione, verifichiamo se è proprio l’effetto che cerca.',
        'Se la maniglia deve restare discreta, le mostrerò un modello che completa l’anta senza competere con essa.',
        'Chiuda gli occhi e apra il cassetto. È così che percepirà questa scelta ogni giorno.',
        'Capisco che il prezzo sia importante. Prima verifichiamo se stiamo davvero confrontando prodotti equivalenti.',
        'Un aspetto simile non significa lo stesso materiale, la stessa lavorazione o la stessa garanzia.',
        'Qui non sceglie soltanto un colore ottone. Questa maniglia è realizzata in ottone massiccio.',
        'La prenda in mano. Sarà più facile capire per che cosa si paga.',
        'La differenza di prezzo si paga una volta, mentre la maniglia scelta si usa ogni giorno.',
        'Questa scelta è sostenuta da qualità verificata e da condizioni di garanzia chiare.',
        'Non deve fidarsi soltanto delle mie parole. Valuti personalmente la maniglia dal vivo.',
        'Se qualcosa suscita dubbi, definiamolo ora: aspetto, utilizzo o prezzo?',
        'Certo, può pensarci. Che cosa vorrebbe ancora chiarire con precisione?',
        'Invece di aggiungere un altro modello, vediamo che cosa distingue questi due.',
        'Mettiamo da parte il prezzo per un momento. Quale modello dà al mobile l’effetto che cerca?',
        'Faccia una foto della maniglia sull’anta. È più facile valutare l’effetto reale che il prodotto isolato.',
        'Se decidete insieme, mostriamo la maniglia sull’anta invece che da sola sul bancone.',
        'Visto che le piace sull’anta, verifichi anche come si sente in mano.',
        'Se aspetto e utilizzo sono convincenti, calcoliamo il set completo per tutto il mobile.',
        'Prima scegliamo il modello giusto. Poi le indicherò il prezzo totale del set completo.',
        'Non prometterò una data senza conferma. Prima verificherò la disponibilità effettiva.',
        'Questo modello non è attualmente disponibile. Le indicherò una data solo dopo la conferma.',
        'Posso mostrarle un modello disponibile, ma solo se mantiene l’effetto che sta cercando.',
        'Una buona scelta non ha bisogno di pressione. Deve convincerla sia sull’anta sia in mano.'
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
