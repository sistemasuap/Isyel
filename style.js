
/* ── Cursor personalizado ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 4 + 'px';
  cursor.style.top  = my - 4 + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx - 16 + 'px';
  cursorRing.style.top  = ry - 16 + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* ── Barra de progreso de scroll ── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
});

/* ── Estrellas generadas dinámicamente ── */
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2 + 0.5;
  star.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    --dur: ${2 + Math.random() * 4}s;
    --delay: ${Math.random() * 4}s;
  `;
  starsContainer.appendChild(star);
}

/* ── Pétalos cayendo ── */
const petalsContainer = document.getElementById('petals');
const petalSymbols    = ['❀', '✿', '❁', '✾', '🌸'];

for (let i = 0; i < 18; i++) {
  const petal = document.createElement('div');
  petal.className  = 'petal';
  petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
  petal.style.cssText = `
    left: ${Math.random() * 100}%;
    animation-duration: ${8 + Math.random() * 10}s;
    animation-delay: ${Math.random() * 12}s;
    font-size: ${10 + Math.random() * 10}px;
  `;
  petalsContainer.appendChild(petal);
}

/* ── Scroll reveal con IntersectionObserver ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 120);
    }
  });
}, { threshold: 0.15 });

document
  .querySelectorAll('.event, .stat-item, .memory-card, .quote-text, .quote-author')
  .forEach(el => revealObserver.observe(el));

/* ── Contadores animados (números que suben) ── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(el => {
        const target  = +el.dataset.target;
        let current   = 0;

        const step = () => {
          current++;
          el.textContent = current;
          if (current < target) setTimeout(step, 180);
        };
        step();
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

counterObserver.observe(document.querySelector('.stats'));

/* ── Contador en vivo desde la boda ── */
function updateLiveCounter() {
  const weddingDate = new Date('2021-01-01T00:00:00');
  const now         = new Date();
  const diff        = now - weddingDate;

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000)  / 60000);
  const seconds = Math.floor((diff % 60000)    / 1000);

  document.getElementById('liveCounter').innerHTML =
    `<span>${days}</span> días &middot; ` +
    `<span>${hours}</span> horas &middot; ` +
    `<span>${minutes}</span> minutos &middot; ` +
    `<span>${seconds}</span> segundos`;
}

setInterval(updateLiveCounter, 1000);
updateLiveCounter();
