(function (global) {
  'use strict';

  const COPY = {
    pl: {
      title: 'Gotowe! Zamówienie {number} zapisane.',
      saved: 'Zamówienie {number} jest już zapisane.',
      thanks: 'Dziękujemy za zaufanie. Powodzenia przy realizacji!',
      returning: 'Dobrze Cię znów widzieć. Dziękujemy za kolejne zamówienie!',
      emailSent: 'Potwierdzenie e-mail zostało wysłane.',
      emailUnknown: 'Nie mamy jeszcze potwierdzenia wysłania e-maila.',
      view: 'Zobacz zamówienie'
    },
    de: {
      title: 'Geschafft! Bestellung {number} ist gespeichert.',
      saved: 'Bestellung {number} ist bereits gespeichert.',
      thanks: 'Vielen Dank für Ihr Vertrauen. Viel Erfolg bei der Umsetzung!',
      returning: 'Schön, dass Sie wieder da sind. Vielen Dank für Ihre erneute Bestellung!',
      emailSent: 'Die Bestätigung wurde per E-Mail versendet.',
      emailUnknown: 'Der Versand der Bestätigungs-E-Mail ist noch nicht bestätigt.',
      view: 'Bestellung ansehen'
    },
    en: {
      title: 'All set! Order {number} is saved.',
      saved: 'Order {number} is already saved.',
      thanks: 'Thank you for your trust. Best wishes for your project!',
      returning: 'Good to see you again. Thank you for ordering with us again!',
      emailSent: 'The confirmation email has been sent.',
      emailUnknown: 'We do not yet have confirmation that the email was sent.',
      view: 'View order'
    },
    es: {
      title: '¡Listo! El pedido {number} está guardado.',
      saved: 'El pedido {number} ya está guardado.',
      thanks: 'Gracias por tu confianza. ¡Mucho éxito con tu proyecto!',
      returning: 'Nos alegra verte de nuevo. ¡Gracias por volver a hacer un pedido!',
      emailSent: 'Se ha enviado el correo de confirmación.',
      emailUnknown: 'Aún no tenemos confirmación del envío del correo.',
      view: 'Ver pedido'
    },
    it: {
      title: 'Fatto! L’ordine {number} è salvato.',
      saved: 'L’ordine {number} è già salvato.',
      thanks: 'Grazie per la fiducia. Buon lavoro con il tuo progetto!',
      returning: 'È bello rivederti. Grazie per aver ordinato di nuovo!',
      emailSent: 'L’e-mail di conferma è stata inviata.',
      emailUnknown: 'Non abbiamo ancora conferma dell’invio dell’e-mail.',
      view: 'Vedi ordine'
    }
  };

  const ACTIVE_STATUSES = new Set([
    'new', 'pending', 'unconfirmed', 'confirmed', 'packed', 'packed_partial',
    'in_delivery', 'shipped', 'partially_shipped', 'issued', 'completed'
  ]);
  const emailKey = value => String(value || '').trim().toLowerCase();

  // Only a successful save response is evidence of this order. The limited
  // history can prove a previous order, never a first order, count or record.
  // This helper performs no requests, including when history is unavailable.
  function fromSavedResponse(response, history, customerEmail) {
    const id = Number(response?.order?.id);
    if (response?.ok !== true || !Number.isSafeInteger(id) || id <= 0) return null;
    const email = emailKey(customerEmail);
    const returning = !response.duplicate && Boolean(email) && Array.isArray(history) && history.some(order => {
      const previousId = Number(order?.id);
      return Number.isSafeInteger(previousId) && previousId > 0 && previousId < id &&
        emailKey(order.customer_email) === email &&
        ACTIVE_STATUSES.has(String(order.status || '').toLowerCase());
    });
    return Object.freeze({
      id,
      number: String(response.order.order_no || id),
      duplicate: Boolean(response.duplicate),
      returning,
      emailSent: response.email?.ok === true
    });
  }

  function text(saved, language) {
    if (!saved) return null;
    const copy = COPY[language] || COPY.pl;
    return {
      title: (saved.duplicate ? copy.saved : copy.title).replace('{number}', () => saved.number),
      body: saved.returning ? copy.returning : copy.thanks,
      email: saved.emailSent ? copy.emailSent : copy.emailUnknown,
      view: copy.view
    };
  }

  function render(container, saved, language, onView) {
    const copy = text(saved, language);
    if (!container || !copy) return;
    const doc = container.ownerDocument;
    const heading = doc.createElement('strong');
    heading.className = 'order-success-title';
    heading.textContent = copy.title;
    const body = doc.createElement('p');
    body.textContent = copy.body;
    const email = doc.createElement('p');
    email.className = 'order-success-email';
    email.textContent = copy.email;
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = 'btn';
    button.textContent = copy.view;
    button.addEventListener('click', () => onView(saved));
    container.replaceChildren(heading, body, email, button);
    container.classList.add('order-success');
    container.style.color = '';
    container.style.fontWeight = '';
  }

  global.OrderSuccess = Object.freeze({ fromSavedResponse, text, render });
})(window);
