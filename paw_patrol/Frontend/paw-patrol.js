const toggleMenu = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('small-screen-menu');
const iconChange = toggleMenu.querySelector('i');

toggleMenu.addEventListener('click', () => {
    sideMenu.classList.toggle('active');

    // change icon bet. bars and x in small screen view
    if (sideMenu.classList.contains('active')) {
        iconChange.classList.replace('fa-bars', 'fa-xmark');
    }
    else {
        iconChange.classList.replace('fa-xmark', 'fa-bars');
    }
});

document.querySelectorAll('.footer-info-container article aside h4').forEach(infoHeader => {
    infoHeader.addEventListener('click', () => {
        const parentAside = infoHeader.parentElement;
        parentAside.classList.toggle('active');
    });
});

// --- existing menu/footer code stays above this ---

// Parallax scroll (hero-relative)
(function() {
  const hero = document.querySelector('.hero');
  const sky   = document.querySelector('.hero .sky');
  const tower   = document.querySelector('.hero .tower');
  const back  = document.querySelector('.hero .back');
  const mid   = document.querySelector('.hero .mid');
  const front = document.querySelector('.hero .front');

  // safe-guard if layers missing
  if (!hero) return;

  function updateParallax() {
    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    // how far the hero has scrolled into view (0..1)
    // when rect.top == viewportHeight => factor = 0 (hero below fold)
    // when rect.bottom == 0 => factor = 1 (hero scrolled past)
    const total = rect.height + viewportHeight;
    const progress = 1 - Math.max(0, Math.min(1, (rect.top + rect.height) / total));

    // convert progress to a pixel offset based on hero height:
    const maxOffset = rect.height; // max px layers can move
    const base = progress * maxOffset;

    // different multipliers give depth (adjust to taste)
    if (back)  back.style.transform  = `translateY(${base * 0.2}px)`;

    if (mid)   mid.style.transform   = `translateY(${base * 0.3}px)`;
    if (tower) tower.style.transform = `translateY(${base * 0.25}px)`;

    if (front) front.style.transform = `translateY(${base * 0.3}px)`;
    // sky usually very subtle
    if (sky)   sky.style.transform   = `translateY(${base * 0.06}px)`;
  }

  // run on load and scroll and resize
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax);
  document.addEventListener('DOMContentLoaded', updateParallax);
  updateParallax();
})();
