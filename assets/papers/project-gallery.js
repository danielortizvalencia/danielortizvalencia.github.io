// Lifted from the engineering portfolio so the data-media galleries
// render identically here.
document.querySelectorAll('.sub-photos').forEach((grid) => {
  // Hand-authored media is already complete; only populate data-driven slots.
  if (grid.querySelector('.media-slot')) return;
  const label = grid.dataset.label || 'Photo';
  let media = [];
  if (grid.dataset.media) {
    try { media = JSON.parse(grid.dataset.media); } catch (e) { media = []; }
  }

  if (media.length) {
    if (media.length === 2) grid.classList.add('two');
    media.forEach((m) => {
      const fig = document.createElement('figure');
      fig.className = 'media-slot';
      let el;
      if (m.type === 'video') {
        el = document.createElement('video');
        el.src = m.src; el.muted = true; el.loop = true; el.playsInline = true;
        el.preload = 'metadata'; el.controls = true;
        fig.classList.add('is-video');
      } else {
        el = document.createElement('img');
        el.src = m.src; el.loading = 'lazy'; el.alt = m.caption || label;
      }
      el.className = 'media-el';
      // On load error, show a small placeholder instead of a broken icon.
      el.addEventListener('error', () => {
        fig.classList.add('media-missing');
        fig.innerHTML = '<div class="photo-slot">' + label + '</div>';
      });
      fig.appendChild(el);
      if (m.caption) {
        const cap = document.createElement('figcaption');
        cap.textContent = m.caption;
        fig.appendChild(cap);
      }
      grid.appendChild(fig);
    });
  } else if (grid.dataset.note) {
    // Intentional documentation card (used when no image exists for a subsystem).
    const card = document.createElement('div');
    card.className = 'doc-note';
    card.innerHTML =
      '<span class="doc-note-icon" aria-hidden="true">▤</span>' +
      '<span class="doc-note-title">' + label + '</span>' +
      '<span class="doc-note-body">' + grid.dataset.note + '</span>';
    grid.appendChild(card);
  } else {
    const n = parseInt(grid.dataset.photos || '2', 10);
    if (n === 2) grid.classList.add('two');
    for (let i = 1; i <= n; i++) {
      const slot = document.createElement('div');
      slot.className = 'photo-slot';
      slot.innerHTML = label + '<br><small>photo ' + i + '</small>';
      grid.appendChild(slot);
    }
  }
});
