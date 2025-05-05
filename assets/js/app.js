document.addEventListener('DOMContentLoaded', () => {
  // Tabs & underline
  const tabs      = document.querySelectorAll('#product-tabs .nav-link');
  const underline = document.getElementById('underline');
  const grids     = document.querySelectorAll('.products-grid');
  function updateUnderline() {
    const a = document.querySelector('#product-tabs .nav-link.active');
    underline.style.left  = a.offsetLeft + 'px';
    underline.style.width = a.offsetWidth + 'px';
  }
  updateUnderline();
  tabs.forEach(t => t.addEventListener('click', e => {
    e.preventDefault();
    if (t.classList.contains('active')) return;
    document.querySelector('.nav-link.active').classList.remove('active');
    t.classList.add('active');
    updateUnderline();
    grids.forEach(g => g.id === t.dataset.target
      ? g.classList.remove('d-none')
      : g.classList.add('d-none')
    );
  }));

  // Modal logic
  const modalEl  = document.getElementById('productModal');
  const modalImg = document.getElementById('modalImage');
  const bsModal  = new bootstrap.Modal(modalEl);

  // Prevent modal when clicking add-to-cart
  document.querySelectorAll('.shopee-btn').forEach(btn =>
    btn.addEventListener('click', e => e.stopPropagation())
  );

  // Open modal on card click
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const bg = card.style.backgroundImage;
      const urlMatch = bg.match(/url\(["']?(.*?)["']?\)/);
      if (!urlMatch) return;
      modalImg.src = urlMatch[1];
      bsModal.show();
    });
  });
});