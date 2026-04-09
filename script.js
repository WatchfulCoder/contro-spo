// Navigation active
document.addEventListener('DOMContentLoaded', function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Navigation intra-page (boutons de section)
  document.querySelectorAll('.page-nav-btn[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = document.getElementById(btn.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('.page-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });

  // Mise en évidence de la section active au scroll
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.page-nav-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.section === id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // Timeline : expand/collapse
  document.querySelectorAll('.timeline-item').forEach(function (item) {
    const texte = item.querySelector('.timeline-texte');
    const source = item.querySelector('.timeline-source');
    if (texte) {
      texte.style.display = 'none';
      if (source) source.style.display = 'none';
      item.querySelector('.timeline-titre').style.cursor = 'pointer';
      item.querySelector('.timeline-titre').addEventListener('click', function () {
        const open = texte.style.display !== 'none';
        texte.style.display = open ? 'none' : 'block';
        if (source) source.style.display = open ? 'none' : 'block';
      });
    }
  });

  // Notes de bas de page : tooltip au survol
  document.querySelectorAll('sup[data-note]').forEach(function (sup) {
    const note = sup.dataset.note;
    sup.setAttribute('title', note);
  });
});
