/* ══════════════════════════════════════════════════
   WAYPOST — guide.js
   Guide generation · Sidebar · Save · To Do · Contacts
══════════════════════════════════════════════════ */

// ── Card Metadata (contact info + todo items) ──────
const CARD_META = {
  'fuesd': {
    name: 'Fallbrook Union Elementary School District',
    section: 'Schools & Enrollment',
    contact: { phone: '(760) 731-5400', type: 'school' },
    todos: [
      'Gather enrollment documents: birth certificate, immunization records, and proof of Fallbrook address',
      'Call the district office at (760) 731-5400 to confirm enrollment hours and required paperwork',
      'Request official records transfer from your child\'s previous school',
      'Complete enrollment paperwork and confirm your child\'s start date',
      'Download any required school apps and set up your parent portal account'
    ]
  },
  'fuhs': {
    name: 'Fallbrook Union High School District',
    section: 'Schools & Enrollment',
    contact: { phone: '(760) 723-6300', type: 'school' },
    todos: [
      'Gather enrollment docs: birth certificate, immunization records, proof of residency, and recent transcripts',
      'Call the district office at (760) 723-6300 to schedule enrollment',
      'Request official transcript from previous high school for credit transfer',
      'Ask about AP / IB course placement and any placement testing required',
      'Confirm bus routes or arrange transportation'
    ]
  },
  'tk': {
    name: 'Transitional Kindergarten (TK)',
    section: 'Schools & Enrollment',
    contact: { phone: '(760) 731-5400', type: 'school' },
    todos: [
      'Confirm child\'s birthday falls between Sept 2 and Feb 2 for TK eligibility',
      'Call FUESD at (760) 731-5400 to check TK availability at your neighborhood school',
      'Gather documents: birth certificate, immunization records, and proof of address',
      'Complete enrollment at the district office on Stagecoach Lane'
    ]
  },
  'preschool-community': {
    name: 'Fallbrook Community Center Preschool',
    section: 'Schools & Enrollment',
    contact: { phone: '(760) 728-1911', type: 'school' },
    todos: [
      'Call (760) 728-1911 to ask about current waitlist status',
      'Add your name to the waitlist as early as possible',
      'Ask about full-day vs. part-day options and semester openings',
      'Prepare enrollment docs: immunization records and birth certificate'
    ]
  },
  'ayso': {
    name: 'AYSO Region 106 — Soccer',
    section: 'Youth Sports',
    contact: { phone: '(760) 555-0106', type: 'sports' },
    todos: [
      'Visit the AYSO Region 106 website and confirm the current registration window (fall: opens June; spring: opens November)',
      'Check your child\'s age division: U6, U8, U10, U12, U14, or U19',
      'Gather required documents: birth certificate and proof of Fallbrook residency',
      'Complete online registration and pay fees before the deadline',
      'Purchase equipment: cleats, shin guards, and dark shorts'
    ]
  },
  'little-league': {
    name: 'Fallbrook Little League Baseball',
    section: 'Youth Sports',
    contact: { phone: '(760) 555-0204', type: 'sports' },
    todos: [
      'Check the Fallbrook Little League website for registration dates (typically opens December)',
      'Confirm your child\'s league age — calculated from August 31 of the current year',
      'Gather birth certificate and proof of residency',
      'Register online before mid-January — spots fill fast',
      'Budget for fees, uniform, glove, cleats, and batting helmet'
    ]
  },
  'basketball': {
    name: 'Fallbrook Basketball Association',
    section: 'Youth Sports',
    contact: { phone: '(760) 555-0312', type: 'sports' },
    todos: [
      'Contact FBSA to confirm registration timing — typically opens September',
      'Confirm your child\'s age division',
      'Register before the deadline',
      'Arrange weekend transportation for games at the Community Center gym'
    ]
  },
  'wrestling': {
    name: 'Fallbrook Wrestling Club',
    section: 'Youth Sports',
    contact: { phone: '(760) 723-6300', type: 'sports' },
    todos: [
      'Contact Fallbrook High School to confirm youth night schedule and age minimums',
      'Ask about weight classes and what to expect at the first session',
      'Purchase wrestling shoes — they are required to participate'
    ]
  },
  'fumc':         { name: 'Fallbrook United Methodist Church',          section: 'Faith Community',          contact: { phone: '(760) 728-0365', type: 'church' },    todos: null },
  'st-peter':     { name: 'St. Peter the Apostle Catholic Church',      section: 'Faith Community',          contact: { phone: '(760) 728-1248', type: 'church' },    todos: null },
  'fbpc':         { name: 'Fallbrook Community Presbyterian Church',    section: 'Faith Community',          contact: { phone: '(760) 728-6031', type: 'church' },    todos: null },
  'cornerstone':  { name: 'Cornerstone Community Church',               section: 'Faith Community',          contact: { phone: '(760) 731-9986', type: 'church' },    todos: null },
  'downtown-fallbrook': { name: 'Central / Downtown Fallbrook',         section: 'Neighborhoods & Housing',  contact: null, todos: null },
  'east-fallbrook':     { name: 'East Fallbrook — Horse Creek Ridge',   section: 'Neighborhoods & Housing',  contact: null, todos: null },
  'west-fallbrook':     { name: 'West Fallbrook / Pala Mesa Area',      section: 'Neighborhoods & Housing',  contact: null, todos: null },
  'fallbrook-coffee':   { name: 'Fallbrook Coffee Co.',                  section: 'Co-working Spots',         contact: { phone: '(760) 731-0088', type: 'cafe' },      todos: null },
  'library':            { name: 'Fallbrook Branch Library',              section: 'Co-working Spots',         contact: { phone: '(760) 731-4650', type: 'community' }, todos: null },
  'pala-mesa-lobby':    { name: 'Pala Mesa Resort Lobby Bar',            section: 'Co-working Spots',         contact: { phone: '(760) 728-5881', type: 'restaurant' }, todos: null },
  'cafe-on-main':       { name: 'Café on Main',                          section: 'Co-working Spots',         contact: { phone: '(760) 555-0144', type: 'cafe' },      todos: null },
  'mccs': {
    name: 'MCCS Spouse Club — Camp Pendleton',
    section: 'Local Groups & Community',
    contact: { phone: '(760) 725-5762', type: 'military' },
    todos: [
      'Call MCCS at (760) 725-5762 to ask about the New to the Area packet for Fallbrook families',
      'Find out when the next newcomer coffee is scheduled and add it to your calendar',
      'Join the MCCS email list for upcoming events and resources'
    ]
  },
  'newcomers-club': { name: 'Fallbrook Newcomers & Neighbors Club', section: 'Local Groups & Community', contact: { phone: '(760) 555-0199', type: 'community' }, todos: null },
  'fallbrook-mamas': {
    name: '"Fallbrook Mamas" Facebook Group',
    section: 'Local Groups & Community',
    contact: null,
    todos: [
      'Search "Fallbrook Mamas" on Facebook and request to join',
      'Post a brief introduction — members are very welcoming to newcomers',
      'Search the group archives for your specific questions before posting'
    ]
  },
  'ymca': {
    name: 'Fallbrook YMCA',
    section: 'Local Groups & Community',
    contact: { phone: '(760) 728-3270', type: 'community' },
    todos: [
      'Visit the Y on W. Elder St and ask about the military family membership rate',
      'Ask about swim lessons, youth summer camps, and after-school programs',
      'Bring your military ID for the discount'
    ]
  },
  'la-casita':          { name: 'La Casita Mexican Restaurant',   section: 'Family Dining', contact: { phone: '(760) 731-0745', type: 'restaurant' }, todos: null },
  'ends-meat':          { name: 'Ends Meat BBQ',                  section: 'Family Dining', contact: { phone: '(760) 555-0193', type: 'restaurant' }, todos: null },
  'village-grille':     { name: 'Village Grille',                 section: 'Family Dining', contact: { phone: '(760) 728-5888', type: 'restaurant' }, todos: null },
  'pizza-port':         { name: 'Pizza Port (Fallbrook)',          section: 'Family Dining', contact: { phone: '(760) 555-0217', type: 'restaurant' }, todos: null },
  'casual-olive':       { name: 'The Casual Olive',               section: 'Date Night',    contact: { phone: '(760) 728-9900', type: 'restaurant' }, todos: null },
  'pala-mesa-restaurant': { name: 'Pala Mesa Resort Restaurant',  section: 'Date Night',    contact: { phone: '(760) 728-5881', type: 'restaurant' }, todos: null },
  'fallbrook-brewing':  { name: 'Fallbrook Brewing Company',      section: 'Date Night',    contact: { phone: '(760) 728-2739', type: 'restaurant' }, todos: null },
  'avocado-grill':      { name: 'Avocado Grill',                  section: 'Date Night',    contact: { phone: '(760) 555-0176', type: 'restaurant' }, todos: null }
};

// ── App State ──────────────────────────────────────
let answers    = {};
let savedItems = [];
let todoGroups = [];
let contacts   = [];
let activeTab  = 'toc';
let pendingSaveCardId = null;
let toastTimer = null;

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  answers    = JSON.parse(localStorage.getItem('wp_answers')  || 'null');
  savedItems = JSON.parse(localStorage.getItem('wp_saved')    || '[]');
  todoGroups = JSON.parse(localStorage.getItem('wp_todos')    || '[]');
  contacts   = JSON.parse(localStorage.getItem('wp_contacts') || '[]');

  if (!answers || !answers.name) {
    document.getElementById('guide-content').innerHTML = `
      <div class="guide-no-answers">
        <p class="guide-no-answers-title">No guide yet.</p>
        <p>Complete the questionnaire to generate your personalized guide.</p>
        <a href="questionnaire.html" class="btn-primary" style="display:inline-block;margin-top:1.25rem;text-decoration:none;">
          Start the questionnaire →
        </a>
      </div>`;
    buildTOC();
    return;
  }

  document.getElementById('guide-content').innerHTML = buildGuide(answers);
  attachCardActions();
  restoreCardStates();
  buildTOC();
  renderSavedPanel();
  renderTodoPanel();
  renderContactsPanel();
  updateBadges();
  setupTabs();
  initAuth(); // firebase.js — sets up auth state listener
});

// ── Tab Setup ──────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.sidebar-tab, .bottom-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      document.getElementById('sidebar').classList.remove('mobile-visible');
    }
  });
}

function switchTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll('.sidebar-tab, .bottom-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tabName));
  document.querySelectorAll('.sidebar-panel').forEach(p =>
    p.classList.toggle('active', p.id === `panel-${tabName}`));
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth < 768) {
    sidebar.classList.toggle('mobile-visible', tabName !== 'toc');
  }
}

function switchToGuideTab() { switchTab('toc'); }

// ── TOC ────────────────────────────────────────────
function buildTOC() {
  const sections = document.querySelectorAll('.guide-section[id]');
  const tocEl = document.getElementById('toc-list');
  if (!sections.length) {
    tocEl.innerHTML = '<p class="panel-empty">Your guide sections will appear here once you complete the questionnaire.</p>';
    return;
  }
  tocEl.innerHTML = [...sections].map(s => {
    const title = s.querySelector('.section-title') ? s.querySelector('.section-title').textContent : s.id;
    return `<a class="toc-item" href="#${s.id}" onclick="switchToGuideTab()"><span>${title}</span></a>`;
  }).join('');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.toc-item').forEach(a =>
          a.classList.toggle('toc-active', a.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => observer.observe(s));
}

// ── Attach card action buttons (post-render) ───────
function attachCardActions() {
  document.querySelectorAll('.card[data-card-id]').forEach(card => {
    const id   = card.dataset.cardId;
    const meta = CARD_META[id];
    if (!meta) return;
    const div = document.createElement('div');
    div.className = 'card-actions';
    const saveBtn = document.createElement('button');
    saveBtn.className = 'card-btn btn-save';
    saveBtn.dataset.cardId = id;
    saveBtn.innerHTML = '<i class="bi bi-bookmark"></i> Save for Later';
    saveBtn.addEventListener('click', () => openSaveModal(id, meta.name, meta.section));
    div.appendChild(saveBtn);
    if (meta.todos) {
      const todoBtn = document.createElement('button');
      todoBtn.className = 'card-btn btn-todo';
      todoBtn.dataset.cardId = id;
      todoBtn.innerHTML = '<i class="bi bi-plus-square"></i> Add to To Do';
      todoBtn.addEventListener('click', () => addTodoGroup(id, meta.name, meta.section));
      div.appendChild(todoBtn);
    }
    card.appendChild(div);
  });
}

function restoreCardStates() {
  savedItems.forEach(s  => updateCardSaveBtn(s.cardId,  true));
  todoGroups.forEach(g  => updateCardTodoBtn(g.cardId,  true));
}

function updateCardSaveBtn(cardId, saved) {
  const btn = document.querySelector(`.btn-save[data-card-id="${cardId}"]`);
  if (!btn) return;
  btn.innerHTML = saved ? '<i class="bi bi-bookmark-check"></i> Saved' : '<i class="bi bi-bookmark"></i> Save for Later';
  btn.classList.toggle('card-btn-active', saved);
}

function updateCardTodoBtn(cardId, added) {
  const btn = document.querySelector(`.btn-todo[data-card-id="${cardId}"]`);
  if (!btn) return;
  btn.innerHTML = added ? '<i class="bi bi-check2-square"></i> In To Do' : '<i class="bi bi-plus-square"></i> Add to To Do';
  btn.classList.toggle('card-btn-active', added);
}

// ── Save Modal ─────────────────────────────────────
function openSaveModalById(savedId) {
  const item = savedItems.find(s => s.id === savedId);
  if (item) openSaveModal(item.cardId, item.cardName, item.section);
}

function openSaveModal(cardId, cardName, section) {
  pendingSaveCardId = cardId;
  document.getElementById('modal-card-name').textContent = cardName;
  const existing = savedItems.find(s => s.cardId === cardId);
  document.getElementById('save-note-input').value = existing ? existing.note : '';
  document.getElementById('save-modal-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('save-note-input').focus(), 80);
}

function closeSaveModal() {
  document.getElementById('save-modal-overlay').classList.add('hidden');
  pendingSaveCardId = null;
}

function confirmSave() {
  if (!pendingSaveCardId) return;
  const id   = pendingSaveCardId;
  const meta = CARD_META[id];
  const note = document.getElementById('save-note-input').value.trim();
  const idx  = savedItems.findIndex(s => s.cardId === id);
  if (idx >= 0) {
    savedItems[idx].note    = note;
    savedItems[idx].savedAt = Date.now();
  } else {
    savedItems.push({ id: uid('saved'), cardId: id, cardName: meta.name, section: meta.section, note, savedAt: Date.now() });
    if (meta.contact) autoAddContact(id, meta);
  }
  persistAll();
  renderSavedPanel();
  updateBadges();
  updateCardSaveBtn(id, true);
  closeSaveModal();
  showToast('Saved for later ✓');
}

function removeSavedItem(savedId) {
  const item = savedItems.find(s => s.id === savedId);
  if (!item) return;
  savedItems = savedItems.filter(s => s.id !== savedId);
  updateCardSaveBtn(item.cardId, false);
  persistAll();
  renderSavedPanel();
  updateBadges();
}

// ── To Do ──────────────────────────────────────────
function addTodoGroup(cardId, cardName, section) {
  if (todoGroups.find(g => g.cardId === cardId)) {
    switchTab('todo');
    showToast('Already in your To Do list');
    return;
  }
  const meta = CARD_META[cardId];
  todoGroups.push({
    id: uid('todo'), cardId, cardName, section,
    items: meta.todos.map((text, i) => ({ id: `${cardId}-${i}`, text, done: false }))
  });
  if (meta.contact) autoAddContact(cardId, meta);
  persistAll();
  renderTodoPanel();
  updateBadges();
  updateCardTodoBtn(cardId, true);
  switchTab('todo');
  showToast('Added to To Do ✓');
}

function toggleTodoItem(groupId, itemId) {
  const group = todoGroups.find(g => g.id === groupId);
  if (!group) return;
  const item = group.items.find(i => i.id === itemId);
  if (!item) return;
  item.done = !item.done;
  persistAll();
  renderTodoPanel();
  updateBadges();
}

function removeTodoGroup(groupId) {
  const group = todoGroups.find(g => g.id === groupId);
  if (!group) return;
  todoGroups = todoGroups.filter(g => g.id !== groupId);
  updateCardTodoBtn(group.cardId, false);
  persistAll();
  renderTodoPanel();
  updateBadges();
}

// ── Contacts ───────────────────────────────────────
function autoAddContact(cardId, meta) {
  if (!meta.contact || contacts.find(c => c.cardId === cardId)) return;
  contacts.push({ id: uid('contact'), cardId, name: meta.name, phone: meta.contact.phone, type: meta.contact.type, favorited: false, note: '' });
  persistAll();
  renderContactsPanel();
}

function filterContacts(query) { renderContactsPanel(query); }

function toggleContactFavorite(contactId) {
  const c = contacts.find(c => c.id === contactId);
  if (!c) return;
  c.favorited = !c.favorited;
  persistAll();
  renderContactsPanel(document.getElementById('contacts-search').value);
}

function toggleContactNote(contactId) {
  const item = document.querySelector(`.contact-item[data-contact-id="${contactId}"]`);
  if (!item) return;
  item.querySelector('.contact-note-text')?.classList.toggle('hidden');
  const input = item.querySelector('.contact-note-input');
  if (input) { input.classList.toggle('hidden'); if (!input.classList.contains('hidden')) input.focus(); }
}

function saveContactNote(contactId, note) {
  const c = contacts.find(c => c.id === contactId);
  if (!c) return;
  c.note = note.trim();
  persistAll();
  renderContactsPanel(document.getElementById('contacts-search').value);
}

function removeContact(contactId) {
  contacts = contacts.filter(c => c.id !== contactId);
  persistAll();
  renderContactsPanel(document.getElementById('contacts-search').value);
}

function openAddContactModal() {
  document.getElementById('contact-name-input').value  = '';
  document.getElementById('contact-phone-input').value = '';
  document.getElementById('contact-type-input').value  = 'other';
  document.getElementById('contact-modal-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('contact-name-input').focus(), 80);
}

function closeContactModal() {
  document.getElementById('contact-modal-overlay').classList.add('hidden');
}

function confirmAddContact() {
  const name  = document.getElementById('contact-name-input').value.trim();
  const phone = document.getElementById('contact-phone-input').value.trim();
  const type  = document.getElementById('contact-type-input').value;
  if (!name) { document.getElementById('contact-name-input').focus(); return; }
  contacts.push({ id: uid('cmanual'), cardId: null, name, phone: phone || 'No phone listed', type, favorited: false, note: '' });
  persistAll();
  renderContactsPanel();
  closeContactModal();
  switchTab('contacts');
  showToast('Contact added ✓');
}

// ── Panel Renderers ────────────────────────────────
function renderSavedPanel() {
  const el = document.getElementById('saved-list');
  if (!savedItems.length) {
    el.innerHTML = `<div class="panel-empty-state"><i class="bi bi-bookmark panel-empty-icon"></i><p>Nothing saved yet.</p><p class="panel-empty-sub">Click <strong>Save for Later</strong> on any card in your guide.</p></div>`;
    return;
  }
  el.innerHTML = savedItems.map(item => `
  <div class="saved-item" data-saved-id="${item.id}">
    <div class="saved-item-top">
      <div class="saved-item-name">${esc(item.cardName)}</div>
      <button class="panel-remove-btn" onclick="removeSavedItem('${item.id}')" title="Remove">&times;</button>
    </div>
    <div class="saved-item-section">${esc(item.section)}</div>
    ${item.note ? `<div class="saved-item-note">"${esc(item.note)}"</div>` : ''}
    <button class="saved-edit-btn" onclick="openSaveModalById('${item.id}')">
      ${item.note ? 'Edit note' : '+ Add note'}
    </button>
  </div>`).join('');
}

function renderTodoPanel() {
  const el = document.getElementById('todo-list');
  if (!todoGroups.length) {
    el.innerHTML = `<div class="panel-empty-state"><i class="bi bi-check2-square panel-empty-icon"></i><p>No action items yet.</p><p class="panel-empty-sub">Click <strong>Add to To Do</strong> on cards in your guide.</p></div>`;
    return;
  }
  el.innerHTML = todoGroups.map(group => {
    const total = group.items.length;
    const done  = group.items.filter(i => i.done).length;
    const pct   = total ? Math.round((done / total) * 100) : 0;
    return `
    <div class="todo-group">
      <div class="todo-group-header">
        <div class="todo-group-name">${esc(group.cardName)}</div>
        <button class="panel-remove-btn" onclick="removeTodoGroup('${group.id}')" title="Remove">&times;</button>
      </div>
      <div class="todo-progress-wrap"><div class="todo-progress-fill" style="width:${pct}%"></div></div>
      <div class="todo-progress-label">${done} of ${total} done</div>
      <ul class="todo-items">
        ${group.items.map(item => `
        <li class="todo-item${item.done ? ' done' : ''}" onclick="toggleTodoItem('${group.id}','${item.id}')">
          <span class="todo-check">${item.done ? '☑' : '☐'}</span>
          <span class="todo-text">${esc(item.text)}</span>
        </li>`).join('')}
      </ul>
    </div>`;
  }).join('');
}

function renderContactsPanel(filter = '') {
  const el    = document.getElementById('contacts-list');
  const query = filter.toLowerCase();
  let list    = contacts.filter(c => !query || c.name.toLowerCase().includes(query) || c.type.toLowerCase().includes(query));
  list        = [...list.filter(c => c.favorited), ...list.filter(c => !c.favorited)];
  if (!list.length) {
    el.innerHTML = `<div class="panel-empty-state"><span class="panel-empty-icon">📇</span><p>${filter ? 'No matches.' : 'No contacts yet.'}</p>${!filter ? '<p class="panel-empty-sub">Contacts are added automatically when you save items or add To Dos from your guide.</p>' : ''}</div>`;
    return;
  }
  el.innerHTML = list.map(c => `
  <div class="contact-item" data-contact-id="${c.id}">
    <button class="contact-star${c.favorited ? ' starred' : ''}" onclick="toggleContactFavorite('${c.id}')" title="${c.favorited ? 'Unfavorite' : 'Favorite'}">${c.favorited ? '★' : '☆'}</button>
    <div class="contact-body">
      <div class="contact-name">${esc(c.name)}</div>
      <div class="contact-phone">${esc(c.phone)}</div>
      <span class="contact-type-badge type-${c.type}">${c.type}</span>
      ${c.note ? `<div class="contact-note-text">${esc(c.note)}</div>` : `<div class="contact-note-text hidden"></div>`}
      <input class="contact-note-input hidden" type="text" value="${esc(c.note || '')}"
        placeholder="Add a note…"
        onblur="saveContactNote('${c.id}', this.value)"
        onkeydown="if(event.key==='Enter') this.blur()">
      <button class="contact-note-btn" onclick="toggleContactNote('${c.id}')">${c.note ? 'Edit note' : '+ Note'}</button>
    </div>
    <button class="contact-remove" onclick="removeContact('${c.id}')" title="Remove">&times;</button>
  </div>`).join('');
}

// ── Badges ─────────────────────────────────────────
function updateBadges() {
  const sCount = savedItems.length;
  const tCount = todoGroups.reduce((n, g) => n + g.items.filter(i => !i.done).length, 0);
  const sBadge = document.getElementById('saved-badge');
  const tBadge = document.getElementById('todo-badge');
  sBadge.textContent = sCount; sBadge.classList.toggle('hidden', sCount === 0);
  tBadge.textContent = tCount; tBadge.classList.toggle('hidden', tCount === 0);
}

// ── Persist ────────────────────────────────────────
function persistAll() {
  localStorage.setItem('wp_saved',    JSON.stringify(savedItems));
  localStorage.setItem('wp_todos',    JSON.stringify(todoGroups));
  localStorage.setItem('wp_contacts', JSON.stringify(contacts));
  // If signed in, sync to Firestore in the background (firebase.js)
  if (typeof syncToCloud === 'function' && currentUser) syncToCloud();
}

// ── Toast ──────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 2500);
}

// ── Helpers ────────────────────────────────────────
function uid(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`; }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function has(arr, val) { return Array.isArray(arr) && arr.includes(val); }


// ══════════════════════════════════════════════════
// ACCOUNT UI  (auth actions are in firebase.js)
// ══════════════════════════════════════════════════

let authMode = 'signin'; // 'signin' | 'signup'

// Called by firebase.js whenever auth state changes
function updateAccountUI(user) {
  const guestEl = document.getElementById('account-guest');
  const userEl  = document.getElementById('account-user');
  const emailEl = document.getElementById('account-email-display');
  if (!guestEl || !userEl) return;
  if (user) {
    guestEl.classList.add('hidden');
    userEl.classList.remove('hidden');
    if (emailEl) emailEl.textContent = user.email;
  } else {
    guestEl.classList.remove('hidden');
    userEl.classList.add('hidden');
  }
}

function openAuthModal(mode = 'signin') {
  authMode = mode;
  document.getElementById('auth-email').value    = '';
  document.getElementById('auth-password').value = '';
  clearAuthError();
  setAuthLoading(false);
  switchAuthTab(mode);
  document.getElementById('auth-modal-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('auth-email').focus(), 80);
}

function closeAuthModal() {
  document.getElementById('auth-modal-overlay').classList.add('hidden');
}

function switchAuthTab(mode) {
  authMode = mode;
  document.getElementById('auth-tab-signin').classList.toggle('active', mode === 'signin');
  document.getElementById('auth-tab-signup').classList.toggle('active', mode === 'signup');
  const btn = document.getElementById('auth-submit-btn');
  if (btn) btn.textContent = mode === 'signin' ? 'Sign In' : 'Create Account';
  clearAuthError();
}

function submitAuthForm() {
  const email    = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  if (!email || !password) { showAuthError('Please enter your email and password.'); return; }
  // Delegates to firebase.js
  if (authMode === 'signin') doSignIn(email, password);
  else                       doSignUp(email, password);
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
}

function clearAuthError() {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = ''; el.classList.add('hidden'); }
}

function setAuthLoading(loading) {
  const btn = document.getElementById('auth-submit-btn');
  if (!btn) return;
  btn.disabled    = loading;
  btn.textContent = loading ? 'Please wait…' : (authMode === 'signin' ? 'Sign In' : 'Create Account');
}


// ══════════════════════════════════════════════════
// PDF DOWNLOAD
// ══════════════════════════════════════════════════

function downloadPDF() {
  const el = document.getElementById('guide-content');
  if (!el || typeof html2pdf === 'undefined') {
    showToast('PDF library not loaded — try refreshing');
    return;
  }

  // Hide interactive chrome that shouldn't appear in the PDF
  const hidden = el.querySelectorAll('.card-actions, .guide-pill');
  hidden.forEach(e => e.style.display = 'none');

  showToast('Preparing PDF…');

  html2pdf()
    .set({
      margin:      [12, 12, 12, 12],
      filename:    'Waypost-Fallbrook-Guide.pdf',
      image:       { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .from(el)
    .save()
    .then(() => {
      hidden.forEach(e => e.style.display = '');
      showToast('PDF downloaded ✓');
    });
}


// ══════════════════════════════════════════════════
// GUIDE BUILDER
// ══════════════════════════════════════════════════

function buildGuide(ans) {
  const name     = ans.name || 'Friend';
  const hasKids  = ans.hasKids;
  const kidAges  = ans.kidAges  || [];
  const prios    = ans.priorities || [];
  const dining   = ans.dining   || [];
  const extras   = ans.extras   || [];

  const youngKids  = has(kidAges, 'infant') || has(kidAges, 'preschool');
  const schoolKids = has(kidAges, 'elementary') || has(kidAges, 'middle') || has(kidAges, 'high');

  const show = {
    schools:      has(prios, 'schools') || schoolKids,
    sports:       (has(prios, 'sports') || (hasKids && kidAges.length > 0)) && hasKids,
    church:       has(prios, 'church'),
    neighborhoods:has(prios, 'neighborhoods'),
    coworking:    has(prios, 'coworking'),
    groups:       has(prios, 'groups'),
    family:       has(dining, 'family'),
    datenight:    has(dining, 'datenight'),
    military:     has(dining, 'military'),
    events:       has(extras, 'events'),
    checklist:    has(extras, 'checklist')
  };

  const highlights = [
    show.schools && 'school info', show.sports && 'youth sports', show.church && 'local churches',
    show.neighborhoods && 'neighborhood breakdowns', (show.family || show.datenight) && 'places to eat',
    show.military && 'military discounts', show.events && 'upcoming events', show.groups && 'ways to meet people'
  ].filter(Boolean);

  const introTail = highlights.length
    ? `Based on what you shared, we've pulled together ${highlights.join(', ')} — everything you need to start settling in.`
    : `We've put together a little of everything to help you get your bearings.`;

  let html = `
  <div class="guide-hero">
    <span class="guide-pill">Your Personalized Guide · Fallbrook, CA</span>
    <h1>Welcome to Fallbrook,<br>${esc(name)}.</h1>
    <p>Fallbrook is the kind of place that grows on you — avocado groves, main-street charm, and enough military-family history that you'll find your people quickly. ${introTail}</p>
  </div>`;

  if (show.schools)        html += schoolsSection(youngKids, schoolKids, kidAges);
  if (show.sports)         html += sportsSection();
  if (show.church)         html += churchSection();
  if (show.neighborhoods)  html += neighborhoodsSection();
  if (show.coworking)      html += coworkingSection();
  if (show.groups)         html += groupsSection();
  if (show.family)         html += familyDiningSection();
  if (show.datenight)      html += dateNightSection();
  if (show.military)       html += militarySection();
  if (show.events)         html += eventsSection();
  if (show.checklist)      html += checklistSection();
  if (!Object.values(show).some(Boolean)) html += defaultSection();
  // (section icon strings changed from emoji to Bootstrap Icon class names below)

  return html;
}

// ── Section helpers ────────────────────────────────
function section(id, iconClass, title, intro, body) {
  return `
  <div class="guide-section" id="${id}">
    <div class="section-header">
      <i class="bi ${iconClass} section-icon"></i>
      <h2 class="section-title">${title}</h2>
    </div>
    ${intro ? `<p class="section-intro">${intro}</p>` : ''}
    ${body}
  </div>`;
}

function card(id, name, meta, body, tags = []) {
  const tagHtml = tags.length ? `<div class="tag-wrap">${tags.map(([t, c]) => `<span class="tag tag-${c}">${t}</span>`).join('')}</div>` : '';
  return `
  <div class="card" data-card-id="${id}">
    <div class="card-name">${name}</div>
    ${meta ? `<div class="card-meta">${meta}</div>` : ''}
    <div class="card-body">${body}</div>
    ${tagHtml}
  </div>`;
}

function callout(text) {
  return `<div class="callout">${text}</div>`;
}

// ── Section builders ───────────────────────────────

function schoolsSection(youngKids, schoolKids, kidAges) {
  const elem = has(kidAges, 'elementary'), mid = has(kidAges, 'middle'), high = has(kidAges, 'high');
  let cards = '';
  if (elem || mid)    cards += card('fuesd', 'Fallbrook Union Elementary School District', '📍 Grades TK–8 · Public', 'Covers elementary and junior high years. Schools include Live Oak, William H. Frazier, Maie Ellis, and Potter Junior High. Enrollment is at the district office on Stagecoach Lane — walk-ins welcome on weekday mornings.', [['TK – 8th Grade','olive']]);
  if (high)           cards += card('fuhs',  'Fallbrook Union High School District',        '📍 Grades 9–12 · Public', 'Home to Fallbrook High School (Go Warriors). Strong athletics, arts programs, and IB/AP coursework. Enrollment office is on Ammunition Road. Bring transcripts from your previous school to speed things up.', [['9th – 12th Grade','olive']]);
  if (elem || mid)    cards += card('tk',    'Transitional Kindergarten (TK)', '📍 FUESD · Ages 4–5', 'Available for kids turning 5 between September 2 and February 2. Free, full school day, and a great bridge into kindergarten. Confirm your child\'s birthday window with the district.', [['Free · Full Day','sand']]);
  if (youngKids)      cards += card('preschool-community', 'Fallbrook Community Center Preschool', '📍 122 S. Main Ave · Ages 3–5', 'Popular community-run preschool. Waitlist fills quickly — reach out as soon as you have your move-in date confirmed. Part-day and full-day options depending on the semester.', [['Preschool · Community','sand']]);
  return section('section-schools', 'bi-mortarboard', 'Schools &amp; Enrollment',
    null,
    callout('<strong>Heads up on timing:</strong> Fallbrook runs two separate districts — one for TK–8, one for high school. Both require proof of residency to enroll. Plan on a 3–5 business day processing window, and call ahead if you\'re arriving mid-year.') +
    `<div class="cards-grid">${cards}</div>`);
}

function sportsSection() {
  return section('section-sports', 'bi-trophy', 'Youth Sports Leagues',
    'Fallbrook has a surprisingly active youth sports scene. Most leagues are seasonal and fill up fast — sign-up windows are noted so you don\'t miss the boat.',
    `<div class="cards-grid">
      ${card('ayso',         'AYSO Region 106 — Soccer',         '📍 Various fields · Ages 4–19',        'The biggest youth league in town. Fall registration opens in June; spring in November. AYSO never cuts players — every child gets equal time on the field regardless of skill level.', [['Fall &amp; Spring','olive'],['No-Cut Policy','sand']])}
      ${card('little-league','Fallbrook Little League Baseball',  '📍 Ammunition Road fields · Ages 4–16', 'Spring season runs February through June. Registration typically opens in December and fills by mid-January. Check the league website for late-signup slots and sibling discounts.', [['Spring Season','olive']])}
      ${card('basketball',   'Fallbrook Basketball Association',  '📍 Community Center gym · Ages 5–14',   'Recreational winter league with weekend games. Registration opens in September. Good for kids not ready for a competitive club program — emphasis is on fun and fundamentals.', [['Winter Season','sand']])}
      ${card('wrestling',    'Fallbrook Wrestling Club',          '📍 Fallbrook High School · Ages 6+',    'Attached to FHS\'s competitive wrestling program. Youth nights are open to community kids. Builds discipline and confidence — Fallbrook has a real culture around this sport.', [['Year-Round','sand']])}
    </div>`);
}

function churchSection() {
  return section('section-church', 'bi-building', 'Faith Community',
    'Fallbrook has an unusually strong faith community for its size. Several congregations have active military family programs and intentional newcomer outreach.',
    `<div class="cards-grid">
      ${card('fumc',       'Fallbrook United Methodist Church',         '📍 W. Alvarado St · Est. 1888',     'One of Fallbrook\'s oldest churches with deep community roots. Active in local food ministries and hosts a beloved annual Thanksgiving community dinner open to all.', [['Methodist','olive'],['Community Focused','sand']])}
      ${card('st-peter',   'St. Peter the Apostle Catholic Church',     '📍 S. Mission Rd · Multiple masses', 'Large, active parish with children\'s religious education (CRE), a vibrant Spanish-language community, and strong connections to military families from Pendleton.', [['Catholic','olive']])}
      ${card('fbpc',       'Fallbrook Community Presbyterian Church',   '📍 N. Main Ave · Family programs',   'Welcoming congregation with an active youth group, women\'s Bible studies, and newcomer breakfasts specifically for military families new to the area.', [['Presbyterian','sand'],['Military Friendly','blue']])}
      ${card('cornerstone','Cornerstone Community Church',              '📍 Ammunition Rd · Contemporary',    'Contemporary worship with a large young-family congregation. Active kids\' ministry every Sunday and a robust small-group network — a quick way to build community when you\'re new.', [['Non-Denominational','sand']])}
    </div>`);
}

function neighborhoodsSection() {
  return section('section-neighborhoods', 'bi-house', 'Neighborhoods &amp; Housing',
    null,
    callout('<strong>Pendleton commute note:</strong> The main gate is on I-5 near Oceanside. From most parts of Fallbrook, budget 20–35 minutes depending on which gate your service member uses. Early-morning gate backup can add time.') +
    `<div class="cards-grid single-col">
      ${card('downtown-fallbrook', 'Central / Downtown Fallbrook',          '📍 Near Main Ave · Walkable · Older homes',     'The most walkable area of town. Close to local restaurants, the weekly farmer\'s market, the library, and the community center. Best if you want to feel embedded in the community quickly.', [['Most Walkable','olive'],['~28 min to Pendleton','sand']])}
      ${card('east-fallbrook',     'East Fallbrook — Horse Creek Ridge Area','📍 East of I-15 · Newer construction',         'Planned community with newer builds and more square footage per dollar. Popular with military families — it\'s not unusual to end up near someone from your unit. Good schools access and quieter streets.', [['Best for Families','olive'],['Military Community','blue'],['~30 min','sand']])}
      ${card('west-fallbrook',     'West Fallbrook / Pala Mesa Area',        '📍 Near Hwy 76 · Larger properties · Rural',   'Avocado groves, larger lots, and a genuinely rural feel. You\'ll need to drive for most errands. Better fit if you want land over convenience or work from home.', [['Rural Feel · More Land','sand'],['~25 min','sand']])}
    </div>`);
}

function coworkingSection() {
  return section('section-coworking', 'bi-laptop', 'Remote Work &amp; Co-working Spots',
    'Fallbrook doesn\'t have a dedicated co-working space yet, but these spots have solid WiFi, a welcoming vibe, and enough regulars that you\'ll feel at home fast.',
    `<div class="cards-grid">
      ${card('fallbrook-coffee', 'Fallbrook Coffee Co.',       '📍 Main Ave · 7am–4pm daily',   'The de facto remote-work spot for locals. Reliable WiFi, good outlets, and a community board full of town notices. Gets busy after 9am — grab a table early.', [['Most Popular','olive']])}
      ${card('library',          'Fallbrook Branch Library',   '📍 Alvarado St · Free · Quiet',  'San Diego County branch with reliable WiFi and free printing. Study rooms can be reserved online up to 7 days ahead. A solid option when the coffee shop is too loud for calls.', [['Free · Quiet','sand']])}
      ${card('pala-mesa-lobby',  'Pala Mesa Resort Lobby Bar', '📍 Hwy 76 · Golf resort',        'A hidden gem for remote work. The lobby bar area is spacious, quiet on weekdays, and has a "treat yourself" feel. Good for longer focused sessions or video calls.', [['Low-Key Upgrade','sand']])}
      ${card('cafe-on-main',     'Café on Main',               '📍 S. Main Ave · Daytime hours', 'Smaller, cozy spot with a loyal local crowd. Better for short working sessions than marathon days. You\'ll know the regulars by your second visit.', [['Cozy &amp; Local','olive']])}
    </div>`);
}

function groupsSection() {
  return section('section-groups', 'bi-people', 'Local Groups &amp; Community',
    'The fastest way to feel at home is to find your people. These groups are actively welcoming to new military families.',
    `<div class="cards-grid single-col">
      ${card('mccs',            'MCCS Spouse Club — Camp Pendleton',       '📍 On-base · Marine Corps Community Services', 'The official spouse network through MCCS. Hosts newcomer coffees, playgroups, and resource fairs. If you\'re brand new, this is the first call to make — they have a New to the Area packet specifically for Fallbrook families.', [['Military Resource · First Stop','blue']])}
      ${card('newcomers-club',  'Fallbrook Newcomers &amp; Neighbors Club', '📍 Community Center · Monthly gatherings',    'A civilian-run club that has historically welcomed many military spouses. Luncheons, day trips, and interest groups. A good way to build connections outside the base bubble.', [['All Newcomers Welcome','olive']])}
      ${card('fallbrook-mamas', '"Fallbrook Mamas" Facebook Group',         '📱 Facebook · ~3,400 members',                'Active, friendly community for parents in and around Fallbrook. Great for "where do I find X?" questions — people respond fast and helpfully.', [['Online Community','sand']])}
      ${card('ymca',            'Fallbrook YMCA',                           '📍 W. Elder St · Full facility',              'Beyond fitness — the Y runs swim lessons, youth sports, summer camps, and after-school programs. Military discounts on family memberships.', [['Military Discount Available','blue']])}
    </div>`);
}

function familyDiningSection() {
  return section('section-family-dining', 'bi-cup-hot', 'Family-Friendly Restaurants',
    'These spots are genuinely welcoming to kids — not just tolerant of them.',
    `<div class="cards-grid">
      ${card('la-casita',   'La Casita Mexican Restaurant', '📍 S. Main Ave · Fallbrook staple',             'A Fallbrook institution. Massive portions, friendly staff, and booth seating that works for families with little ones. Military discount available.', [['Local Favorite','terra'],['Military Discount','blue']])}
      ${card('ends-meat',   'Ends Meat BBQ',                '📍 Main Ave · Counter service · Outdoor seating','Legitimately good BBQ. Counter service keeps things relaxed with kids. Try the tri-tip and the burnt ends. Outdoor seating is handy when you have a toddler who can\'t sit still.', [['Counter Service','terra'],['Outdoor Seating','sand']])}
      ${card('village-grille','Village Grille',             '📍 Main Ave · Breakfast &amp; Lunch',            'Classic diner vibe with a good kids\' menu. Weekend breakfast rush is real but moves fast. A regular spot for local families — you\'ll see familiar faces quickly.', [['Great Breakfast','olive']])}
      ${card('pizza-port',  'Pizza Port (Fallbrook)',        '📍 E. Mission Rd · Casual pizza',               'Easy, low-stress family dinner. Large tables, a decent craft beer selection for adults, and a laid-back atmosphere where kids can be kids without anyone giving you a look.', [['Casual &amp; Easygoing','olive']])}
    </div>`);
}

function dateNightSection() {
  return section('section-date-night', 'bi-stars', 'Date Night Spots',
    'Fallbrook is wine country-adjacent and punches above its weight for a small town. These are the spots worth saving a sitter for.',
    `<div class="cards-grid">
      ${card('casual-olive',        'The Casual Olive',           '📍 Main Ave · Wine bar &amp; small plates', 'The best date-night spot in town. Excellent wine list skewed toward Southern California labels, thoughtful small plates, and a warm, unhurried atmosphere. Reservations recommended on weekends.', [['Wine Bar','terra'],['Reservations Recommended','olive']])}
      ${card('pala-mesa-restaurant','Pala Mesa Resort Restaurant', '📍 Hwy 76 · Resort dining',                 'Elevated atmosphere without being stuffy. The terrace views over the golf course are beautiful at sunset. Ask for a window or terrace table when you book.', [['Fine-Casual','terra'],['Scenic Views','sand']])}
      ${card('fallbrook-brewing',   'Fallbrook Brewing Company',   '📍 W. Elder St · Craft brewery',            'A lively but not chaotic taproom. Great rotating beer selection and a full food menu. Better for a relaxed date than a formal one. Live music on weekends.', [['Laid-Back Date Night','olive'],['Live Music','sand']])}
      ${card('avocado-grill',       'Avocado Grill',               '📍 Mission Rd · Farm-to-table',             'Seasonal menu leaning into local produce (yes, avocados feature prominently — it works). Cozy interior, attentive service, and a thoughtful cocktail list.', [['Farm-to-Table','olive'],['Creative Menu','terra']])}
    </div>`);
}

function militarySection() {
  return section('section-military', 'bi-shield', 'Military Discounts in Fallbrook',
    'Fallbrook sits right next to Camp Pendleton, and the community knows it. Always bring your ID.',
    `<div class="discount-list">
      ${discount('bi-cup-hot',       'La Casita Mexican Restaurant',  '10% off for active duty and veterans. Mention it when you order.')}
      ${discount('bi-heart-pulse',   'Fallbrook YMCA',                 'Reduced membership rates for active-duty military families. Ask for the military rate at the front desk — it\'s not always posted.')}
      ${discount('bi-scissors',      'Great Clips — Fallbrook',        'Military discount available year-round for active duty and veterans. Walk-ins welcome.')}
      ${discount('bi-tools',         'Ace Hardware — Fallbrook',       '10% military discount on most items. Heavily used during PCS move-in season.')}
      ${discount('bi-heart',         'Fallbrook Veterinary Hospital',  '10% off services for active-duty military pet owners. Mention your service at check-in.')}
      ${discount('bi-film',          'MCCS Movie Theater — On Base',   'Significantly cheaper than off-base options. Open to all with base access. Check the MCCS website for current schedule.')}
    </div>`);
}

function discount(iconClass, name, detail) {
  return `<div class="discount-item"><i class="bi ${iconClass} discount-icon"></i><div><div class="discount-name">${name}</div><div class="discount-detail">${detail}</div></div></div>`;
}

function eventsSection() {
  return section('section-events', 'bi-calendar-event', 'Upcoming Events &amp; Festivals',
    'Fallbrook has an active events calendar for a town its size. These are the recurring staples worth putting on your radar.',
    `<div class="events-list">
      ${event('APR','26','Fallbrook Avocado Festival','The town\'s biggest annual event. Main Ave closes for the day — live music, vendors, avocado food competitions, and a parade. Arrive early; parking fills fast.')}
      ${event('JUN','14','Armed Forces Day Community Celebration','Fallbrook\'s annual tribute to service members at Live Oak Park. Free admission, food trucks, live music, and a ceremony honoring military families.')}
      ${event('SEP','20','Fallbrook Street Faire','Fall edition of the town\'s recurring street fair. Artists, crafters, local food vendors, and live entertainment. Great for meeting neighbors.')}
      ${event('DEC','6', 'Christmas in the Village','Fallbrook\'s beloved holiday tradition on Main Ave. Tree lighting, Santa, carolers, hot cocoa, and local shops open late.')}
    </div>`);
}

function event(month, day, name, desc) {
  return `<div class="event-card"><div class="event-date"><span class="event-month">${month}</span><span class="event-day">${day}</span></div><div class="event-info"><div class="event-name">${name}</div><div class="event-desc">${desc}</div></div></div>`;
}

function checklistSection() {
  const items = [
    ['California Driver\'s License', 'You have 10 days after establishing CA residency to update your license. The Oceanside DMV is closest — make an appointment online to avoid the walk-in line.'],
    ['Vehicle Registration',          'Register your out-of-state vehicle within 20 days. Fees are based on vehicle value and can be significant. Active duty may qualify for a registration fee exemption — ask the DMV.'],
    ['Set Up Utilities',              'Electricity &amp; gas: SDG&amp;E. Water: Fallbrook Public Utility District (FPUD). Internet: Spectrum is the primary provider; some areas have AT&amp;T fiber.'],
    ['Voter Registration',            'Register or update your address at vote.ca.gov. Deadline is 15 days before any election. San Diego County uses all-mail ballots — your ballot comes to you automatically once registered.'],
    ['Healthcare / Tricare',          'Confirm your new coverage area and primary care assignment. Nearest MTF is the Naval Hospital at Camp Pendleton. CHCS and civilian network options are available throughout Fallbrook.'],
    ['Update Mailing Address',        'USPS change of address, plus financial accounts, subscriptions, and your unit\'s admin office for service records.'],
    ['Connect with Your FRG',         'Plug into your unit\'s Family Readiness Group early. They carry the most current, ground-level local resources for military families in your specific situation.']
  ];
  return section('section-checklist', 'bi-list-check', 'New Resident Checklist',
    'The unglamorous stuff — but knocking this out in your first two weeks makes everything else feel more settled.',
    `<ul class="checklist">${items.map(([t, d]) => `<li><i class="bi bi-square checklist-box"></i><div><strong>${t}</strong><br>${d}</div></li>`).join('')}</ul>`);
}

function defaultSection() {
  return section('section-default', 'bi-geo-alt', 'Getting Started in Fallbrook',
    'A few things every newcomer should know, regardless of what brought you here.',
    `<div class="cards-grid single-col">
      <div class="card"><div class="card-name">Main Avenue is your town center</div><div class="card-body">Most local restaurants, shops, and the weekly farmer\'s market are along or just off Main Ave. It\'s walkable, friendly, and the best place to start getting a feel for Fallbrook.</div></div>
      <div class="card"><div class="card-name">Wednesday Farmer\'s Market</div><div class="card-meta">📍 Alvarado St · Wednesdays 9am–1pm · Year-round</div><div class="card-body">Local avocados, citrus, honey, and seasonal produce. Also an informal social gathering — longtime residents love telling newcomers where everything is.</div></div>
      <div class="card"><div class="card-name">The Avocado Festival (April)</div><div class="card-body">Fallbrook takes its "Avocado Capital of the World" title seriously. The annual festival in late April shuts down Main Ave and draws the whole town. It\'s the event that makes new residents feel like they\'ve officially arrived.</div></div>
    </div>`);
}
