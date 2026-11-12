const birthday = new Date('2026-11-14T20:00:00-03:00');

const whatsappMessage = 'Oi, Vini! Confirmo presença na comemoração do dia 14! 🎉';

document.querySelectorAll('#confirmar-presenca, #confirmar-final').forEach((link) => {
  link.href = `https://wa.me/5581988881223?text=${encodeURIComponent(whatsappMessage)}`;
});

function updateCountdown() {
  const diff = birthday.getTime() - Date.now();
  const note = document.querySelector('#countdown-note');

  if (diff <= 0) {
    document.querySelector('#days').textContent = '00';
    document.querySelector('#hours').textContent = '00';
    document.querySelector('#minutes').textContent = '00';
    note.textContent = 'É hoje. Te espero por lá!';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  document.querySelector('#days').textContent = String(days).padStart(2, '0');
  document.querySelector('#hours').textContent = String(hours).padStart(2, '0');
  document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 30000);

document.querySelector('#add-calendar').addEventListener('click', () => {
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vini//Aniversario 2026//PT-BR',
    'BEGIN:VEVENT',
    'UID:aniversario-vini-2026@vgls',
    'DTSTAMP:20261111T120000Z',
    'DTSTART:20261114T230000Z',
    'DTEND:20261115T030000Z',
    'SUMMARY:Comemoração do aniversário do Vini',
    'DESCRIPTION:Comemoração do aniversário do Vini no Bar do Amparo.',
    'LOCATION:Bar do Amparo\, Rua do Amparo\, 3\, Olinda - PE',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'aniversario-vini-14-11-2026.ics';
  anchor.click();
  URL.revokeObjectURL(url);
});

