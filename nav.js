/* ══════════════════════════════════════════════════
   WAYPOST — nav.js
   Injects the persistent global nav bar and loads
   Bootstrap Icons (the icon font used site-wide).
   Each page sets data-pillar="community"|"career"
   on <body> to highlight the active section.
══════════════════════════════════════════════════ */

(function () {
  // Load Bootstrap Icons once, for every page
  const iconCSS = document.createElement('link');
  iconCSS.rel  = 'stylesheet';
  iconCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
  document.head.appendChild(iconCSS);

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
        <i class="bi bi-compass"></i> Community
      </a>
      <a href="${careerHref}" class="gnav-link ${active === 'career' ? 'gnav-active' : ''}">
        <i class="bi bi-briefcase"></i> Career
      </a>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);
})();
