document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const mainMenu = document.getElementById('main-menu');

  // Botón hamburguesa
  if (navToggle && mainMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      mainMenu.classList.toggle('open');
    });
  }

  // Submenús desplegables (acordeón en móvil, hover en escritorio)
  const submenuButtons = document.querySelectorAll('.submenu-toggle');

  submenuButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const menuItem = button.closest('.menu-item');
      const isOpen = menuItem.classList.contains('open');

      // Cierra todos los demás submenús
      document.querySelectorAll('.menu-item.has-submenu').forEach(item => {
        if (item !== menuItem) {
          item.classList.remove('open');
          item.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
          item.querySelector('.submenu')?.setAttribute('aria-hidden', 'true');
        }
      });

      // Alternar submenú actual
      menuItem.classList.toggle('open');
      button.setAttribute('aria-expanded', String(!isOpen));
      const submenu = menuItem.querySelector('.submenu');
      submenu?.setAttribute('aria-hidden', String(isOpen));
    });
  });

  // Botón "explorar" (opcional)
  const exploreBtn = document.getElementById('explore-btn');
  const unidades = document.getElementById('unidades');

  if (exploreBtn && unidades) {
    exploreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      unidades.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Mostrar/ocultar semanas (opcional)
  const showWeeksBtns = document.querySelectorAll('.show-weeks');
  showWeeksBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.unit-card');
      const weeks = parent?.querySelector('.weeks-list');
      if (!weeks) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      weeks.setAttribute('aria-hidden', String(isExpanded));
      isExpanded ? weeks.setAttribute('hidden', '') : weeks.removeAttribute('hidden');
    });
  });
});