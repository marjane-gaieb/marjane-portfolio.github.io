/* =========================================================
   CARROUSEL (accueil) : flèche droite → suivante, gauche → précédente
   Ordre : slide 0 (présentation + croquis), puis page1 … page9, en boucle.
   Sur la page Travaux il n'y a pas de carrousel : rien ne se passe.
   ========================================================= */
const slides = document.querySelectorAll('.slide');
const homeText = document.querySelector('.home__text');
const homeFrame = document.querySelector('.home__frame');
let current = 0;

function showSlide(index) {
  if (slides.length < 2) return;
  slides[current].classList.remove('is-current');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('is-current');

  homeText?.classList.toggle('is-hidden', current !== 0);
  homeFrame?.classList.toggle('is-page', current !== 0);
}

document.querySelector('.arrow--next')
  ?.addEventListener('click', () => showSlide(current + 1));

document.querySelector('.arrow--prev')
  ?.addEventListener('click', () => showSlide(current - 1));

/* =========================================================
   CALQUES : "Marjane Gaieb" → CV, "Contact" → Contact
   Un second clic sur le même onglet referme le calque.
   ========================================================= */
const toggles  = document.querySelectorAll('[data-overlay]');
const overlays = document.querySelectorAll('.overlay');

function closeAll() {
  overlays.forEach(o => o.hidden = true);
  toggles.forEach(t => t.classList.remove('is-active'));
}

toggles.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target  = document.getElementById('overlay-' + link.dataset.overlay);
    const wasOpen = !target.hidden;
    closeAll();
    if (!wasOpen) {
      target.hidden = false;
      link.classList.add('is-active');
    }
  });
});

/* Clavier : Échap ferme les calques,
   flèches ← → changent d'image (si aucun calque n'est ouvert) */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeAll(); return; }
  if (document.querySelector('.overlay:not([hidden])')) return;
  if (e.key === 'ArrowRight') showSlide(current + 1);
  if (e.key === 'ArrowLeft')  showSlide(current - 1);
});

