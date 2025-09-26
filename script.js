document.addEventListener('DOMContentLoaded', function () {
  // NAV toggle (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const mainMenu = document.getElementById('main-menu');

  if (navToggle && mainMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mainMenu.classList.toggle('open');
    });
  }

  // Submenu toggles
  const submenuButtons = document.querySelectorAll('.submenu-toggle');
  submenuButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const menuItem = button.closest('.menu-item');
      const isOpen = menuItem.classList.contains('open');

      // Cerrar otros abiertos (opcional)
      const openSiblings = menuItem.parentElement.querySelectorAll('.menu-item.open');
      openSiblings.forEach(sib => {
        if (sib !== menuItem) {
          sib.classList.remove('open');
          sib.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });

      menuItem.classList.toggle('open');
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Smooth scroll para botón explorar
  const exploreBtn = document.getElementById('explore-btn');
  const unidades = document.getElementById('unidades');

  if (exploreBtn && unidades) {
    exploreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      unidades.scrollIntoView({ behavior: 'smooth' });
    });
  }

   // Expandir semanas por unidad mejorado
  const showWeeksBtns = document.querySelectorAll('.show-weeks');
  showWeeksBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.unit-card');
      const weeks = parent?.querySelector('.weeks-list');
      if (!weeks) return;

      const expanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', String(!expanded));
      weeks.setAttribute('aria-hidden', String(expanded)); // true si colapsado, false si abierto

      // Para compatibilidad: ocultar o mostrar atributo hidden
      if (expanded) {
        weeks.setAttribute('hidden', '');
      } else {
        weeks.removeAttribute('hidden');
      }
    });
  });
});