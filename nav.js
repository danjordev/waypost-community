/* ══════════════════════════════════════════════════
   WAYPOST — nav.js
   Injects the persistent global nav bar into every
   page. Each page sets data-pillar="community" or
   data-pillar="career" on <body> to highlight the
   active section. Home page leaves it unset.

   If the user already has a generated guide or
   passport in localStorage, the nav links return
   them directly to that page rather than the hub.
══════════════════════════════════════════════════ */

(function () {
  const active = document.body.dataset.pillar || '';

  // Return users to their in-progress guide or passport if one exists,
  // otherwise send them to the pillar hub page.
  const communityHref = localStorage.getItem('wp_answers')  ? 'guide.html'    : 'community.html';
  const careerHref    = localStorage.getItem('wp_passport') ? 'passport.html' : 'career.html';

  const nav = document.createElement('nav');
  nav.id = 'global-nav';
  nav.className = 'global-nav';
  nav.innerHTML = `
    <a href="index.html" class="gnav-logo" aria-label="Waypost home">
      <span class="logo-mark">⊕</span>
      <span class="logo-text">Waypost</span>
    </a>
    <div class="gnav-links">
      <a href="${communityHref}" class="gnav-link ${active === 'community' ? 'gnav-active' : ''}">
        🏘 Community
      </a>
      <a href="${careerHref}" class="gnav-link ${active === 'career' ? 'gnav-active' : ''}">
        💼 Career
      </a>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);
})();
