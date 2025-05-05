document.addEventListener('DOMContentLoaded', () => {
  const tabs       = document.querySelectorAll('#product-tabs .nav-link');
  const underline  = document.getElementById('underline');
  const grids      = document.querySelectorAll('.products-grid');

  function activate(tab) {
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    grids.forEach(g =>
      g.id === tab.dataset.target
        ? g.classList.remove('d-none')
        : g.classList.add('d-none')
    );
    updateUnderline();
  }

  function updateUnderline() {
    const active = document.querySelector('#product-tabs .nav-link.active');
    underline.style.left  = active.offsetLeft + 'px';
    underline.style.width = active.offsetWidth + 'px';
  }

  // Wire up the tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      if (!tab.classList.contains('active')) activate(tab);
    });
  });

  // Initial tab
  const start = document.querySelector('#product-tabs .nav-link.active') || tabs[0];
  activate(start);

  // ——— Modal logic ———
  const modalEl  = document.getElementById('productModal');
  const modalImg = document.getElementById('modalImage');
  const bsModal  = new bootstrap.Modal(modalEl);

  // ——— Add-to-cart logic ———
  document.querySelectorAll('.product-card .shopee-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const badge = document.getElementById('cart-count');
      const current = parseInt(badge.textContent, 10) || 0;
      badge.textContent = current + 1;
    });
  });

  // ——— Open modal on card click ———
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      // grab computed background-image (works whether in CSS or inline)
      const bg = window.getComputedStyle(card).backgroundImage;
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      if (match) {
        modalImg.src = match[1];
        bsModal.show();
      }
    });
  });

  const nav = document.querySelector('.hero-bg nav');
  nav.addEventListener('click', e => {
    // clicking the pseudo-icon toggles .open
    if (e.offsetX > nav.clientWidth - 50 && e.offsetY < 50) {
      nav.classList.toggle('open');
    }
  });

});
