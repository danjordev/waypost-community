/* ══════════════════════════════════════════════════
   WAYPOST — towns.js
   Town card data for the home page selector
══════════════════════════════════════════════════ */

const TOWNS = [
  {
    id: 'fallbrook',
    city: 'Fallbrook',
    state: 'CA',
    base: 'Camp Pendleton',
    branch: 'USMC · USN',
    tagline: 'Avocado groves, main-street charm, and a strong military community 10 miles from the gate.',
    status: 'available',
    href: 'questionnaire.html?town=fallbrook'
  },
  {
    id: 'miramar',
    city: 'San Diego',
    state: 'CA',
    base: 'MCAS Miramar',
    branch: 'USMC',
    tagline: 'Urban amenities with quick base access — Mira Mesa, Scripps Ranch, and Santee are popular landing spots.',
    status: 'coming-soon'
  },
  {
    id: 'bremerton',
    city: 'Bremerton',
    state: 'WA',
    base: 'Naval Base Kitsap',
    branch: 'USN',
    tagline: 'Puget Sound waterfront living with ferry access to Seattle and deep Pacific Northwest roots.',
    status: 'coming-soon'
  },
  {
    id: 'silverdale',
    city: 'Silverdale',
    state: 'WA',
    base: 'Naval Base Bangor',
    branch: 'USN',
    tagline: 'A quiet, family-oriented town on the Kitsap Peninsula — excellent schools and outdoor access.',
    status: 'coming-soon'
  },
  {
    id: 'oak-harbor',
    city: 'Oak Harbor',
    state: 'WA',
    base: 'NAS Whidbey Island',
    branch: 'USN',
    tagline: 'Island life in the Pacific Northwest — stunning scenery, a tight-knit military community, and a slower pace.',
    status: 'coming-soon'
  },
  {
    id: 'lemoore',
    city: 'Lemoore',
    state: 'CA',
    base: 'NAS Lemoore',
    branch: 'USN',
    tagline: 'Central Valley agricultural community — affordable, close-knit, and a short drive from Fresno.',
    status: 'coming-soon'
  },
  {
    id: 'monterey',
    city: 'Monterey',
    state: 'CA',
    base: 'NPS · DLI',
    branch: 'Multi-branch',
    tagline: 'One of California\'s most sought-after postings — coastal beauty, world-class dining, and NPS culture.',
    status: 'coming-soon'
  },
  {
    id: 'port-hueneme',
    city: 'Port Hueneme',
    state: 'CA',
    base: 'NBVC Point Mugu',
    branch: 'USN',
    tagline: 'Ventura County coast — beach-town living with easy access to Ventura, Oxnard, and Santa Barbara.',
    status: 'coming-soon'
  },
  {
    id: 'twentynine-palms',
    city: 'Twentynine Palms',
    state: 'CA',
    base: 'MCAGCC',
    branch: 'USMC',
    tagline: 'High desert living, Joshua Tree National Park at your door, and a tight-knit Marine Corps community.',
    status: 'coming-soon'
  },
  {
    id: 'yuma',
    city: 'Yuma',
    state: 'AZ',
    base: 'MCAS Yuma',
    branch: 'USMC',
    tagline: '350+ sunny days a year, a low cost of living, and a proud Marine Corps community close to the border.',
    status: 'coming-soon'
  }
];

function renderTownCards(filterText = '') {
  const container = document.getElementById('town-grid');
  const query = filterText.toLowerCase().trim();

  const filtered = TOWNS.filter(t =>
    !query ||
    t.city.toLowerCase().includes(query) ||
    t.state.toLowerCase().includes(query) ||
    t.base.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p class="no-results">No towns match "<strong>${filterText}</strong>". More locations coming soon.</p>`;
    return;
  }

  container.innerHTML = filtered.map(town => {
    const available = town.status === 'available';
    return `
    <div class="town-card ${available ? 'town-card--available' : 'town-card--soon'}"
         ${available ? `onclick="window.location.href='${town.href}'" role="button" tabindex="0"` : ''}>
      <div class="town-card-accent"></div>
      <div class="town-card-body">
        <div class="town-card-header">
          <div>
            <div class="town-city">${town.city}<span class="town-state">, ${town.state}</span></div>
            <div class="town-base">${town.base}</div>
          </div>
          <span class="town-status ${available ? 'status-available' : 'status-soon'}">
            ${available ? 'Available Now' : 'Coming Soon'}
          </span>
        </div>
        <p class="town-tagline">${town.tagline}</p>
        <div class="town-branch">${town.branch}</div>
        ${available ? `<div class="town-cta">Explore Fallbrook →</div>` : ''}
      </div>
    </div>`;
  }).join('');
}
