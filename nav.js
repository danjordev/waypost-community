/* ══════════════════════════════════════════════════
   WAYPOST — nav.js
   Injects the persistent global nav bar into every
   page. Each page sets data-pillar="community" or
   data-pillar="career" on <body> to highlight the
   active section. Home page leaves it unset.
══════════════════════════════════════════════════ */

(function () {
  const active = document.body.dataset.pillar || '';

  const nav = document.createElement('nav');
  nav.id = 'global-nav';
  nav.className = 'global-nav';
  nav.innerHTML = `
    <a href="index.html" class="gnav-logo" aria-label="Waypost home">
      <span class="logo-mark">⊕</span>
      <span class="logo-text">Waypost</span>
    </a>
    <div class="gnav-links">
      <a href="community.html" class="gnav-link ${active === 'community' ? 'gnav-active' : ''}">
        🏘 Community
      </a>
      <a href="career.html" class="gnav-link ${active === 'career' ? 'gnav-active' : ''}">
        💼 Career
      </a>
    </div>
  `;

  // Insert as the very first element in <body>
  document.body.insertBefore(nav, document.body.firstChild);
})();
