    document.addEventListener('DOMContentLoaded', () => {
      const tabsEl = document.getElementById('product-tabs');
      const underline = document.getElementById('underline');
      const links = tabsEl.querySelectorAll('.nav-link');
      const grids = document.querySelectorAll('.products-grid');

      function updateUnderline() {
        const active = tabsEl.querySelector('.nav-link.active');
        underline.style.left  = active.offsetLeft + 'px';
        underline.style.width = active.offsetWidth + 'px';
      }

      function fadeOut(el, d=300) {
        el.style.transition = `opacity ${d}ms ease, transform ${d}ms ease`;
        el.style.opacity   = 0;
        el.style.transform = 'translateY(-10px)';
        setTimeout(()=> el.classList.add('d-none'), d);
      }
      function fadeIn(el, d=300) {
        el.classList.remove('d-none');
        el.style.opacity   = 0;
        el.style.transform = 'translateY(10px)';
        requestAnimationFrame(()=>{
          el.style.transition = `opacity ${d}ms ease, transform ${d}ms ease`;
          el.style.opacity   = 1;
          el.style.transform = 'translateY(0)';
        });
      }

      links.forEach(link=>{
        link.addEventListener('click', e=>{
          e.preventDefault();
          if(link.classList.contains('active')) return;
          tabsEl.querySelector('.nav-link.active').classList.remove('active');
          link.classList.add('active');
          updateUnderline();
          const tgt = link.dataset.target;
          grids.forEach(g=> g.id===tgt ? fadeIn(g) : fadeOut(g));
        });
      });

      updateUnderline();
    });