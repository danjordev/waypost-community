/* ══════════════════════════════════════════════════
   WAYPOST — app.js
   Questionnaire logic + personalized guide builder
══════════════════════════════════════════════════ */

// ── State ──────────────────────────────────────────
const answers = {
  name:          '',
  hasKids:       null,
  kidAges:       [],
  priorities:    [],
  dining:        [],
  extras:        []
};

let currentStep = 1;
const TOTAL_STEPS = 5;

// ── Navigation ─────────────────────────────────────

function nextStep(fromStep) {
  if (fromStep === 1) {
    const name = document.getElementById('name-input').value.trim();
    const errorEl = document.getElementById('name-error');
    const inputEl = document.getElementById('name-input');
    if (!name) {
      inputEl.classList.add('error');
      errorEl.classList.remove('hidden');
      inputEl.focus();
      return;
    }
    inputEl.classList.remove('error');
    errorEl.classList.add('hidden');
    answers.name = name;
  }
  goToStep(fromStep + 1);
}

function prevStep(fromStep) {
  goToStep(fromStep - 1);
}

function goToStep(step) {
  document.getElementById(`step-${currentStep}`).classList.remove('active');
  currentStep = step;
  document.getElementById(`step-${currentStep}`).classList.add('active');
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  const pct = (currentStep / TOTAL_STEPS) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
}

// ── Toggle Buttons ─────────────────────────────────

function toggleSelect(btn) {
  const group = btn.dataset.group;
  document.querySelectorAll(`[data-group="${group}"]`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  if (group === 'hasKids') {
    answers.hasKids = (btn.dataset.value === 'yes');
    document.getElementById('kid-ages-group').style.display = answers.hasKids ? 'block' : 'none';
  }
}

// ── Collect All Checkbox Answers ───────────────────

function collectAnswers() {
  answers.kidAges    = checked('kidAge');
  answers.priorities = checked('priority');
  answers.dining     = checked('dining');
  answers.extras     = checked('extra');
}

function checked(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(el => el.value);
}

// ── Convenience Flags ──────────────────────────────

function has(arr, val) { return arr.includes(val); }

// ── Guide Generation ───────────────────────────────

function generateGuide() {
  collectAnswers();

  const { name, hasKids, kidAges, priorities, dining, extras } = answers;

  const youngKids   = has(kidAges, 'infant') || has(kidAges, 'preschool');
  const schoolKids  = has(kidAges, 'elementary') || has(kidAges, 'middle') || has(kidAges, 'high');

  const show = {
    schools:      has(priorities, 'schools') || schoolKids,
    sports:       (has(priorities, 'sports') || (hasKids && kidAges.length > 0)) && hasKids,
    church:       has(priorities, 'church'),
    neighborhoods:has(priorities, 'neighborhoods'),
    coworking:    has(priorities, 'coworking'),
    groups:       has(priorities, 'groups'),
    family:       has(dining, 'family'),
    datenight:    has(dining, 'datenight'),
    military:     has(dining, 'military'),
    events:       has(extras, 'events'),
    checklist:    has(extras, 'checklist'),
  };

  const displayName = name || 'Friend';

  // Build a context-aware intro
  const highlights = [];
  if (show.schools)       highlights.push('school info');
  if (show.sports)        highlights.push('youth sports');
  if (show.church)        highlights.push('local churches');
  if (show.neighborhoods) highlights.push('neighborhood breakdowns');
  if (show.family || show.datenight) highlights.push('places to eat');
  if (show.military)      highlights.push('military discounts');
  if (show.events)        highlights.push('upcoming events');
  if (show.groups)        highlights.push('ways to meet people');

  const introTail = highlights.length > 0
    ? `Based on what you shared, we've curated ${highlights.join(', ')} — everything you need to start settling in.`
    : `We've put together a little bit of everything to help you get your bearings around town.`;

  const intro = `Fallbrook is the kind of place that grows on you. Avocado groves, a walkable main street, and enough military-family history that you'll find your people quickly. ${introTail}`;

  // ── Assemble HTML ──────────────────────────────
  let html = heroSection(displayName, intro);

  if (show.schools)        html += schoolsSection(youngKids, schoolKids, kidAges);
  if (show.sports)         html += sportsSection();
  if (show.church)         html += churchSection();
  if (show.neighborhoods)  html += neighborhoodsSection();
  if (show.coworking)      html += coworkingSection();
  if (show.groups)         html += groupsSection();
  if (show.family)         html += familyDiningSection();
  if (show.datenight)      html += dateNightSection();
  if (show.military)       html += militaryDiscountsSection();
  if (show.events)         html += eventsSection();
  if (show.checklist)      html += checklistSection();

  const nothingSelected = Object.values(show).every(v => !v);
  if (nothingSelected) html += defaultSection();

  // Swap sections
  document.getElementById('questionnaire-section').classList.add('hidden');
  document.getElementById('guide-section').classList.remove('hidden');
  document.getElementById('guide-content').innerHTML = html;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Restart ────────────────────────────────────────

function restartQuiz() {
  answers.name = ''; answers.hasKids = null;
  answers.kidAges = []; answers.priorities = [];
  answers.dining = []; answers.extras = [];

  document.getElementById('name-input').value = '';
  document.getElementById('name-input').classList.remove('error');
  document.getElementById('name-error').classList.add('hidden');
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.getElementById('kid-ages-group').style.display = 'none';

  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  currentStep = 1;
  document.getElementById('step-1').classList.add('active');
  updateProgress();

  document.getElementById('guide-section').classList.add('hidden');
  document.getElementById('questionnaire-section').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ══════════════════════════════════════════════════
// GUIDE SECTION BUILDERS
// ══════════════════════════════════════════════════

function heroSection(name, intro) {
  return `
  <div class="guide-hero">
    <span class="guide-pill">Your Personalized Guide · Fallbrook, CA</span>
    <h1>Welcome to Fallbrook,<br>${name}.</h1>
    <p>${intro}</p>
  </div>`;
}

// ── Schools ────────────────────────────────────────

function schoolsSection(youngKids, schoolKids, kidAges) {
  const elem  = has(kidAges, 'elementary');
  const mid   = has(kidAges, 'middle');
  const high  = has(kidAges, 'high');

  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">🏫</span>
      <h2 class="section-title">Schools &amp; Enrollment</h2>
    </div>
    <div class="callout">
      <strong>Heads up on timing:</strong> Fallbrook runs two separate school districts — one for TK–8 and one for high school. Both require proof of residency (lease or mortgage docs) to enroll. Plan on a 3–5 business day processing window, and call ahead if you're arriving mid-year.
    </div>
    <div class="cards-grid">
      ${elem || mid ? `
      <div class="card">
        <div class="card-name">Fallbrook Union Elementary School District</div>
        <div class="card-meta">📍 Grades TK–8 · Public</div>
        <div class="card-body">Covers elementary and junior high years. Schools include Live Oak, William H. Frazier, Maie Ellis, and Potter Junior High. Enrollment is handled at the district office on Stagecoach Lane — walk-ins welcome on weekday mornings.</div>
        <div class="tag-wrap"><span class="tag tag-olive">TK – 8th Grade</span></div>
      </div>` : ''}
      ${high ? `
      <div class="card">
        <div class="card-name">Fallbrook Union High School District</div>
        <div class="card-meta">📍 Grades 9–12 · Public</div>
        <div class="card-body">Home to Fallbrook High School (Go Warriors). Strong athletics, arts programs, and IB/AP course offerings. Enrollment is at the district office on Ammunition Road. Transcripts from your previous school speed things up considerably.</div>
        <div class="tag-wrap"><span class="tag tag-olive">9th – 12th Grade</span></div>
      </div>` : ''}
      ${elem || mid ? `
      <div class="card">
        <div class="card-name">Transitional Kindergarten (TK)</div>
        <div class="card-meta">📍 FUESD · Ages 4–5</div>
        <div class="card-body">Available for kids turning 5 between September 2 and February 2. Full school day, at no cost, and a great bridge into kindergarten. The TK cutoff is worth double-checking with the district if your child's birthday is in that window.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Free · Full Day</span></div>
      </div>` : ''}
      ${youngKids ? `
      <div class="card">
        <div class="card-name">Fallbrook Community Center Preschool</div>
        <div class="card-meta">📍 122 S. Main Ave · Ages 3–5</div>
        <div class="card-body">Popular community-run preschool in the heart of town. Waitlist fills quickly — reach out as soon as you know your move-in date. Part-day and full-day options available depending on the semester.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Preschool · Community</span></div>
      </div>` : ''}
    </div>
  </div>`;
}

// ── Youth Sports ───────────────────────────────────

function sportsSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">⚽</span>
      <h2 class="section-title">Youth Sports Leagues</h2>
    </div>
    <p class="section-intro">Fallbrook has a surprisingly active youth sports scene. Most leagues are seasonal and fill up fast — sign-up windows are noted below so you don't miss the boat.</p>
    <div class="cards-grid">
      <div class="card">
        <div class="card-name">AYSO Region 106 — Soccer</div>
        <div class="card-meta">📍 Various Fallbrook fields · Ages 4–19</div>
        <div class="card-body">The biggest youth league in town. Fall registration opens in June; spring in November. AYSO never cuts players — every child gets equal time on the field regardless of skill level.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Fall &amp; Spring</span><span class="tag tag-sand">No-Cut Policy</span></div>
      </div>
      <div class="card">
        <div class="card-name">Fallbrook Little League Baseball</div>
        <div class="card-meta">📍 Ammunition Road fields · Ages 4–16</div>
        <div class="card-body">Spring season runs February through June. Registration opens in December and typically fills by mid-January. Check the league website for late-signup slots and sibling discounts for multiple kids.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Spring Season</span></div>
      </div>
      <div class="card">
        <div class="card-name">Fallbrook Basketball Association</div>
        <div class="card-meta">📍 Community Center gym · Ages 5–14</div>
        <div class="card-body">Recreational winter league with games on weekends. Registration opens in September. Good for kids who aren't ready to commit to a more competitive club program — emphasis is on fun and fundamentals.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Winter Season</span></div>
      </div>
      <div class="card">
        <div class="card-name">Fallbrook Wrestling Club</div>
        <div class="card-meta">📍 Fallbrook High School · Ages 6+</div>
        <div class="card-body">Attached to FHS's competitive wrestling program. Youth nights are open to community kids not enrolled at the high school. Builds discipline and confidence — and Fallbrook has a real culture around this sport.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Year-Round</span></div>
      </div>
    </div>
  </div>`;
}

// ── Faith Community ────────────────────────────────

function churchSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">⛪</span>
      <h2 class="section-title">Faith Community</h2>
    </div>
    <p class="section-intro">Fallbrook has an unusually strong faith community for its size. Several congregations have active military family programs and intentional newcomer outreach.</p>
    <div class="cards-grid">
      <div class="card">
        <div class="card-name">Fallbrook United Methodist Church</div>
        <div class="card-meta">📍 W. Alvarado St · Est. 1888</div>
        <div class="card-body">One of the oldest churches in Fallbrook with deep community roots. Active in local food ministries and hosts one of the town's most beloved Thanksgiving community dinners, open to all.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Methodist</span><span class="tag tag-sand">Community Focused</span></div>
      </div>
      <div class="card">
        <div class="card-name">St. Peter the Apostle Catholic Church</div>
        <div class="card-meta">📍 S. Mission Rd · Multiple Sunday masses</div>
        <div class="card-body">Large, active parish with children's religious education (CRE), a vibrant Spanish-language community, and a strong presence of military families from Pendleton. RCIA program available for those exploring the faith.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Catholic</span></div>
      </div>
      <div class="card">
        <div class="card-name">Fallbrook Community Presbyterian Church</div>
        <div class="card-meta">📍 N. Main Ave · Family programs</div>
        <div class="card-body">Welcoming congregation with an active youth group, regular women's Bible studies, and newcomer breakfasts hosted specifically for military families new to the area.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Presbyterian</span><span class="tag tag-blue">Military Friendly</span></div>
      </div>
      <div class="card">
        <div class="card-name">Cornerstone Community Church</div>
        <div class="card-meta">📍 Ammunition Rd · Contemporary worship</div>
        <div class="card-body">Contemporary style with a large young-family congregation. Active kids' ministry every Sunday and a robust small-group network throughout the week — a quick way to build community when you're new.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Non-Denominational</span></div>
      </div>
    </div>
  </div>`;
}

// ── Neighborhoods ──────────────────────────────────

function neighborhoodsSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">🏡</span>
      <h2 class="section-title">Neighborhoods &amp; Housing</h2>
    </div>
    <div class="callout">
      <strong>Pendleton commute note:</strong> The main gate is on I-5 near Oceanside. From most parts of Fallbrook, budget 20–35 minutes — longer during early-morning gate backup. Confirm which gate your service member uses, since it meaningfully changes the route.
    </div>
    <div class="cards-grid single-col">
      <div class="card">
        <div class="card-name">Central / Downtown Fallbrook</div>
        <div class="card-meta">📍 Near Main Ave · Walkable · Older homes</div>
        <div class="card-body">The most walkable area of town. Close to local restaurants, the weekly farmer's market, the library, and the community center. Mix of older ranch homes and some newer construction. Best choice if you want to feel embedded in the community quickly rather than tucked away in a neighborhood.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Most Walkable</span><span class="tag tag-sand">~28 min to Pendleton</span></div>
      </div>
      <div class="card">
        <div class="card-name">East Fallbrook — Horse Creek Ridge Area</div>
        <div class="card-meta">📍 East of I-15 · Newer construction · Larger lots</div>
        <div class="card-body">Planned community with newer builds and more square footage per dollar than central Fallbrook. Popular with military families — it's not unusual to end up near someone from your unit. Good schools access, quieter streets, and a strong neighborhood feel.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Best for Families</span><span class="tag tag-blue">Military Community</span><span class="tag tag-sand">~30 min to Pendleton</span></div>
      </div>
      <div class="card">
        <div class="card-name">West Fallbrook / Pala Mesa Area</div>
        <div class="card-meta">📍 Near Hwy 76 · Larger properties · More rural</div>
        <div class="card-body">Quieter and more spread out — avocado groves, citrus trees, and a genuinely rural feel. You'll need to drive for most errands, but the space and views are hard to beat. Better fit for families who want land over convenience, or who work from home.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Rural Feel · More Land</span><span class="tag tag-sand">~25 min to Pendleton</span></div>
      </div>
    </div>
  </div>`;
}

// ── Co-working ─────────────────────────────────────

function coworkingSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">💻</span>
      <h2 class="section-title">Remote Work &amp; Co-working Spots</h2>
    </div>
    <p class="section-intro">Fallbrook doesn't have a dedicated co-working space yet, but these spots have solid WiFi, a welcoming vibe, and enough regulars that you'll feel at home fast.</p>
    <div class="cards-grid">
      <div class="card">
        <div class="card-name">Fallbrook Coffee Co.</div>
        <div class="card-meta">📍 Main Ave · 7am–4pm daily</div>
        <div class="card-body">The de facto remote-work spot for locals. Reliable WiFi, good outlets, and a community board full of town notices. Gets busy after 9am — grab your table early. Regulars start recognizing you by week two.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Most Popular</span></div>
      </div>
      <div class="card">
        <div class="card-name">Fallbrook Branch Library</div>
        <div class="card-meta">📍 Alvarado St · Free · Quiet</div>
        <div class="card-body">San Diego County branch with reliable WiFi and free printing. Study rooms can be reserved online up to 7 days ahead. A solid option when the coffee shop is too noisy for calls or focused work.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Free · Quiet</span></div>
      </div>
      <div class="card">
        <div class="card-name">Pala Mesa Resort Lobby Bar</div>
        <div class="card-meta">📍 Hwy 76 · Golf resort</div>
        <div class="card-body">A bit of a hidden gem. The lobby bar area is spacious, quiet on weekdays, and has a "treat yourself" feel without being too expensive. Good for longer stretches of focused work or video calls away from the house.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Low-Key Upgrade</span></div>
      </div>
      <div class="card">
        <div class="card-name">Café on Main</div>
        <div class="card-meta">📍 S. Main Ave · Daytime hours</div>
        <div class="card-body">Smaller, cozy spot with a loyal local crowd. Better for shorter working sessions than marathon days. You'll know the regulars by your second visit — which is the whole point sometimes.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Cozy &amp; Local</span></div>
      </div>
    </div>
  </div>`;
}

// ── Local Groups ───────────────────────────────────

function groupsSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">👋</span>
      <h2 class="section-title">Local Groups &amp; Community</h2>
    </div>
    <p class="section-intro">The fastest way to feel at home is to find your people. These groups are actively welcoming to new military families.</p>
    <div class="cards-grid single-col">
      <div class="card">
        <div class="card-name">MCCS Spouse Club — Camp Pendleton</div>
        <div class="card-meta">📍 On-base · Marine Corps Community Services</div>
        <div class="card-body">The official spouse network through Marine Corps Community Services. Hosts newcomer coffees, playgroups, and resource fairs on a regular basis. If you're brand new to the area, this is the first call to make — they have a New to the Area packet specifically for Fallbrook families.</div>
        <div class="tag-wrap"><span class="tag tag-blue">Military Resource · First Stop</span></div>
      </div>
      <div class="card">
        <div class="card-name">Fallbrook Newcomers &amp; Neighbors Club</div>
        <div class="card-meta">📍 Community Center · Monthly gatherings</div>
        <div class="card-body">A civilian-run club that has historically welcomed many military spouses. Luncheons, day trips, and interest-based small groups. A good way to build connections outside the base bubble and meet long-time Fallbrook residents.</div>
        <div class="tag-wrap"><span class="tag tag-olive">All Newcomers Welcome</span></div>
      </div>
      <div class="card">
        <div class="card-name">"Fallbrook Mamas" Facebook Group</div>
        <div class="card-meta">📱 Facebook · ~3,400 members</div>
        <div class="card-body">Active, friendly community group for parents in and around Fallbrook. Great for the "where do I find X?" questions — people respond fast and generously. There's also a broader "Fallbrook Community" group for general town discussion.</div>
        <div class="tag-wrap"><span class="tag tag-sand">Online Community</span></div>
      </div>
      <div class="card">
        <div class="card-name">Fallbrook YMCA</div>
        <div class="card-meta">📍 W. Elder St · Full facility</div>
        <div class="card-body">Beyond fitness — the Y runs swim lessons, youth sports, summer camps, and after-school programs. Military discounts are available on family memberships. Many spouses treat early-morning group classes as both exercise and built-in social time.</div>
        <div class="tag-wrap"><span class="tag tag-blue">Military Discount Available</span></div>
      </div>
    </div>
  </div>`;
}

// ── Family Dining ──────────────────────────────────

function familyDiningSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">🍕</span>
      <h2 class="section-title">Family-Friendly Restaurants</h2>
    </div>
    <p class="section-intro">These spots are genuinely welcoming to kids — not just tolerant of them. The kind of places where a spilled drink doesn't ruin the evening.</p>
    <div class="cards-grid">
      <div class="card">
        <div class="card-name">La Casita Mexican Restaurant</div>
        <div class="card-meta">📍 S. Main Ave · Fallbrook staple</div>
        <div class="card-body">A Fallbrook institution — huge portions, friendly staff, and booth seating that's perfect for families with little ones. The kids' menu is actually good (real food, not just nuggets). Military discount available.</div>
        <div class="tag-wrap"><span class="tag tag-terra">Local Favorite</span><span class="tag tag-blue">Military Discount</span></div>
      </div>
      <div class="card">
        <div class="card-name">Ends Meat BBQ</div>
        <div class="card-meta">📍 Main Ave · Wood-smoked BBQ · Counter service</div>
        <div class="card-body">Legitimately good BBQ for a small town. Counter service keeps things relaxed with kids. Outdoor seating is handy when you have a toddler who can't sit still. Try the tri-tip. Don't skip the burnt ends.</div>
        <div class="tag-wrap"><span class="tag tag-terra">Counter Service</span><span class="tag tag-sand">Outdoor Seating</span></div>
      </div>
      <div class="card">
        <div class="card-name">Village Grille</div>
        <div class="card-meta">📍 Main Ave · American diner · Breakfast &amp; lunch</div>
        <div class="card-body">Classic diner vibe with friendly service and a good kids' menu. The weekend breakfast rush is real but moves quickly. A regular spot for local families — you'll see familiar faces fast.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Great Breakfast</span><span class="tag tag-sand">Weekend Favorite</span></div>
      </div>
      <div class="card">
        <div class="card-name">Pizza Port (Fallbrook)</div>
        <div class="card-meta">📍 E. Mission Rd · Casual pizza</div>
        <div class="card-body">Easy, low-stress family dinner option. Large tables that work for groups, a decent craft beer selection for the adults, and a laid-back atmosphere where kids can be kids without anyone giving you a look.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Casual &amp; Easygoing</span></div>
      </div>
    </div>
  </div>`;
}

// ── Date Night ─────────────────────────────────────

function dateNightSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">🍷</span>
      <h2 class="section-title">Date Night Spots</h2>
    </div>
    <p class="section-intro">Fallbrook is wine country-adjacent and punches above its weight for a small town. These are the spots worth saving a sitter for.</p>
    <div class="cards-grid">
      <div class="card">
        <div class="card-name">The Casual Olive</div>
        <div class="card-meta">📍 Main Ave · Wine bar &amp; small plates</div>
        <div class="card-body">Easily the best date-night spot in town. An excellent wine list skewed toward Southern California labels, thoughtful small plates, and a warm, unhurried atmosphere. Locals treat this as their go-to for anniversaries and special occasions. Reservations recommended on weekends.</div>
        <div class="tag-wrap"><span class="tag tag-terra">Wine Bar</span><span class="tag tag-olive">Reservations Recommended</span></div>
      </div>
      <div class="card">
        <div class="card-name">Pala Mesa Resort Restaurant</div>
        <div class="card-meta">📍 Hwy 76 · Resort dining · Terrace views</div>
        <div class="card-body">Elevated atmosphere without being stuffy. The terrace views over the golf course are genuinely beautiful at sunset. Worth it for a slower, more formal evening. Ask for a window or terrace table when you book.</div>
        <div class="tag-wrap"><span class="tag tag-terra">Fine-Casual</span><span class="tag tag-sand">Scenic Views</span></div>
      </div>
      <div class="card">
        <div class="card-name">Fallbrook Brewing Company</div>
        <div class="card-meta">📍 W. Elder St · Craft brewery · Full kitchen</div>
        <div class="card-body">A lively but not chaotic taproom. Great rotating beer selection and a full food menu. Better for a relaxed date than a formal one. Live music on weekends adds to the atmosphere — check their schedule online.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Laid-Back Date Night</span><span class="tag tag-sand">Live Music</span></div>
      </div>
      <div class="card">
        <div class="card-name">Avocado Grill</div>
        <div class="card-meta">📍 Mission Rd · Farm-to-table · Seasonal menu</div>
        <div class="card-body">Seasonal menu leaning into local produce (yes, avocados feature prominently — it works). Cozy interior, attentive service, and a thoughtful cocktail list. One of the more creative kitchens in Fallbrook.</div>
        <div class="tag-wrap"><span class="tag tag-olive">Farm-to-Table</span><span class="tag tag-terra">Creative Menu</span></div>
      </div>
    </div>
  </div>`;
}

// ── Military Discounts ─────────────────────────────

function militaryDiscountsSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">🎖️</span>
      <h2 class="section-title">Military Discounts in Fallbrook</h2>
    </div>
    <p class="section-intro">Fallbrook sits right next to Camp Pendleton, and the community knows it. These businesses actively honor military families — always bring your ID card.</p>
    <div class="discount-list">
      <div class="discount-item">
        <span class="discount-emoji">🍽️</span>
        <div>
          <div class="discount-name">La Casita Mexican Restaurant</div>
          <div class="discount-detail">10% off for active duty and veterans. Mention it when you order — the staff all know.</div>
        </div>
      </div>
      <div class="discount-item">
        <span class="discount-emoji">💪</span>
        <div>
          <div class="discount-name">Fallbrook YMCA</div>
          <div class="discount-detail">Reduced membership rates for active-duty military and their families. Ask for the military rate at the front desk — it's not always posted publicly.</div>
        </div>
      </div>
      <div class="discount-item">
        <span class="discount-emoji">✂️</span>
        <div>
          <div class="discount-name">Great Clips — Fallbrook</div>
          <div class="discount-detail">Military discount available year-round for active duty and veterans. Walk-ins welcome, or book online.</div>
        </div>
      </div>
      <div class="discount-item">
        <span class="discount-emoji">🔨</span>
        <div>
          <div class="discount-name">Ace Hardware — Fallbrook</div>
          <div class="discount-detail">10% military discount on most items. A local business that actively supports the Pendleton community, especially during PCS move-in season.</div>
        </div>
      </div>
      <div class="discount-item">
        <span class="discount-emoji">🐾</span>
        <div>
          <div class="discount-name">Fallbrook Veterinary Hospital</div>
          <div class="discount-detail">10% off services for active-duty military pet owners. Mention your service when checking in for the first visit.</div>
        </div>
      </div>
      <div class="discount-item">
        <span class="discount-emoji">🎬</span>
        <div>
          <div class="discount-name">MCCS Movie Theater — On Base</div>
          <div class="discount-detail">Don't overlook the on-base movie theater — significantly cheaper than off-base options and open to all with base access. Current schedule at the MCCS website.</div>
        </div>
      </div>
    </div>
  </div>`;
}

// ── Events ─────────────────────────────────────────

function eventsSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">🎉</span>
      <h2 class="section-title">Upcoming Events &amp; Festivals</h2>
    </div>
    <p class="section-intro">Fallbrook has an active events calendar for a town its size. These are the recurring staples worth putting on your radar.</p>
    <div class="events-list">
      <div class="event-card">
        <div class="event-date"><span class="event-month">APR</span><span class="event-day">26</span></div>
        <div class="event-info">
          <div class="event-name">Fallbrook Avocado Festival</div>
          <div class="event-desc">The town's biggest annual celebration. Main Avenue closes for the day — live music, local vendors, avocado-themed food competitions, and a parade. A genuine community gathering. Arrive early; parking fills up fast. Bring cash for the vendors.</div>
        </div>
      </div>
      <div class="event-card">
        <div class="event-date"><span class="event-month">JUN</span><span class="event-day">14</span></div>
        <div class="event-info">
          <div class="event-name">Armed Forces Day Community Celebration</div>
          <div class="event-desc">Fallbrook's annual tribute to service members, held at Live Oak Park. Free admission. Food trucks, live music, and a ceremony honoring military families in the community. A reminder that this town sees you.</div>
        </div>
      </div>
      <div class="event-card">
        <div class="event-date"><span class="event-month">SEP</span><span class="event-day">20</span></div>
        <div class="event-info">
          <div class="event-name">Fallbrook Street Faire</div>
          <div class="event-desc">Fall edition of the town's recurring street fair. Artists, craftspeople, local food vendors, and live entertainment. Great for meeting neighbors and discovering the local makers who give Fallbrook its character.</div>
        </div>
      </div>
      <div class="event-card">
        <div class="event-date"><span class="event-month">DEC</span><span class="event-day">6</span></div>
        <div class="event-info">
          <div class="event-name">Christmas in the Village</div>
          <div class="event-desc">Fallbrook's beloved holiday tradition on Main Ave. Tree lighting ceremony, Santa, carolers, hot cocoa, and local shops open late. Military families consistently name this as one of their favorite Fallbrook memories.</div>
        </div>
      </div>
    </div>
  </div>`;
}

// ── Checklist ──────────────────────────────────────

function checklistSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">📋</span>
      <h2 class="section-title">New Resident Checklist</h2>
    </div>
    <p class="section-intro">The unglamorous stuff — but knocking this out in your first two weeks makes everything else feel more settled.</p>
    <ul class="checklist">
      <li>
        <span class="checklist-box">☐</span>
        <div><strong>California Driver's License</strong><br>You have 10 days after establishing CA residency to get a CA license. The Oceanside DMV is the closest — make an appointment online to skip the walk-in line.</div>
      </li>
      <li>
        <span class="checklist-box">☐</span>
        <div><strong>Vehicle Registration</strong><br>Register your out-of-state vehicle within 20 days. Fees are based on vehicle value and can be significant — budget for it. Active duty members may qualify for a registration fee exemption; ask the DMV directly.</div>
      </li>
      <li>
        <span class="checklist-box">☐</span>
        <div><strong>Set Up Utilities</strong><br>Electricity &amp; gas: SDG&amp;E. Water: Fallbrook Public Utility District (FPUD). Internet: Spectrum is the primary provider in most of Fallbrook; some areas have AT&amp;T fiber access.</div>
      </li>
      <li>
        <span class="checklist-box">☐</span>
        <div><strong>Voter Registration</strong><br>Register or update your address at vote.ca.gov. Deadline is 15 days before any election. San Diego County uses all-mail ballots — your ballot comes to you automatically once registered.</div>
      </li>
      <li>
        <span class="checklist-box">☐</span>
        <div><strong>Healthcare / Tricare</strong><br>Confirm your new coverage area and primary care assignment. Nearest Military Treatment Facility is the Naval Hospital at Camp Pendleton. CHCS and civilian network options are available throughout Fallbrook.</div>
      </li>
      <li>
        <span class="checklist-box">☐</span>
        <div><strong>Update Your Mailing Address</strong><br>USPS change of address, plus financial accounts, subscriptions, and your unit's admin office for service records. The sooner the better — mail forwarding has a delay.</div>
      </li>
      <li>
        <span class="checklist-box">☐</span>
        <div><strong>Connect with Your FRG</strong><br>Plug into your unit's Family Readiness Group early. They carry the most current, ground-level local resources for military families in your specific situation — and they've done this many times before.</div>
      </li>
    </ul>
  </div>`;
}

// ── Default (nothing selected) ─────────────────────

function defaultSection() {
  return `
  <div class="guide-section">
    <div class="section-header">
      <span class="section-icon">🌿</span>
      <h2 class="section-title">Getting Started in Fallbrook</h2>
    </div>
    <p class="section-intro">A few things every newcomer should know about Fallbrook, regardless of what brought you here.</p>
    <div class="cards-grid single-col">
      <div class="card">
        <div class="card-name">Main Avenue is your town center</div>
        <div class="card-body">Most local restaurants, shops, and the weekly farmer's market are along or just off Main Ave. It's walkable, friendly, and the best place to start getting a feel for the town. Walk it on a weekday morning when it's quiet, and again on a Saturday to see it at full life.</div>
      </div>
      <div class="card">
        <div class="card-name">Wednesday Farmer's Market</div>
        <div class="card-meta">📍 Alvarado St · Wednesdays 9am–1pm · Year-round</div>
        <div class="card-body">Local avocados, citrus, honey, and seasonal produce. Reliably good. Also an informal social gathering — longtime residents love telling newcomers where everything is, and this is where you'll meet them.</div>
      </div>
      <div class="card">
        <div class="card-name">The Avocado Festival (April)</div>
        <div class="card-body">Fallbrook takes its title as the Avocado Capital of the World seriously. The annual festival in late April shuts down Main Ave and draws the whole town. It's the event that makes new residents feel like they've officially arrived.</div>
      </div>
    </div>
  </div>`;
}

// ── Initialize ─────────────────────────────────────
updateProgress();
