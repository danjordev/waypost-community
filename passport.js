/* ══════════════════════════════════════════════════
   WAYPOST — passport.js
   Skills Passport: profile view, document generators,
   job matching, sidebar, save/sync. Mirrors guide.js
   patterns for the Career pillar.
══════════════════════════════════════════════════ */

// ── State ──────────────────────────────────────────
let passport         = {};
let passportSaved    = [];
let activeTab        = 'toc';
let pendingSaveId    = null;
let toastTimer       = null;
let authMode         = 'signin';
let currentDocType   = null;

// ── Display Maps ───────────────────────────────────
const YEAR_LABEL = { 'less-than-1':'less than 1 year','1-2':'1–2 years','3-5':'3–5 years','5-10':'5–10 years','10+':'10+ years' };
const YEAR_NUM   = { 'less-than-1':0.5,'1-2':1.5,'3-5':4,'5-10':7,'10+':12 };
const EDU_LABEL  = { 'high-school':'High School Diploma / GED','some-college':'Some College (no degree)','associates':"Associate's Degree",'bachelors':"Bachelor's Degree",'masters':"Master's Degree",'doctoral':'Doctoral Degree','certification':'Professional Certification / Trade / Bootcamp' };

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  passport      = JSON.parse(localStorage.getItem('wp_passport')       || 'null');
  passportSaved = JSON.parse(localStorage.getItem('wp_passport_saved') || '[]');

  if (!passport || !passport.name) {
    document.getElementById('passport-content').innerHTML = `
      <div class="guide-no-answers">
        <p class="guide-no-answers-title">No passport yet.</p>
        <p>Complete the Skills Passport questionnaire to generate your profile.</p>
        <a href="passport-questionnaire.html" class="btn-primary" style="display:inline-block;margin-top:1.25rem;text-decoration:none;">
          Start the questionnaire →
        </a>
      </div>`;
    return;
  }

  document.getElementById('passport-content').innerHTML = buildPassportProfile(passport);
  buildPassportTOC();
  renderJobsPanel();
  renderPassportSavedPanel();
  updateBadges();
  setupTabs();
  initAuth();
});

// ── Tabs ───────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.sidebar-tab, .bottom-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) document.getElementById('sidebar').classList.remove('mobile-visible');
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

function switchToPassportTab() { switchTab('toc'); }

// ── TOC ────────────────────────────────────────────
function buildPassportTOC() {
  const sections = document.querySelectorAll('.passport-section[id], .passport-hero[id]');
  const tocEl    = document.getElementById('toc-list');
  if (!sections.length) { tocEl.innerHTML = '<p class="panel-empty">Sections will appear here.</p>'; return; }
  tocEl.innerHTML = [...sections].map(s => {
    const title = s.querySelector('.section-title') ? s.querySelector('.section-title').textContent : (s.querySelector('h1') ? 'Profile' : s.id);
    return `<a class="toc-item" href="#${s.id}" onclick="switchToPassportTab()"><span>${title}</span></a>`;
  }).join('');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) document.querySelectorAll('.toc-item').forEach(a =>
        a.classList.toggle('toc-active', a.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => observer.observe(s));
}

// ── Jobs Panel ─────────────────────────────────────
function renderJobsPanel() {
  const el = document.getElementById('jobs-list');
  const cats = passport.skillCategories || [];
  const matched = matchJobs(cats);
  if (!matched.length) {
    el.innerHTML = `<div class="panel-empty-state"><i class="bi bi-search panel-empty-icon"></i><p>No matches yet.</p><p class="panel-empty-sub">Add skill categories in your questionnaire to see matched local jobs.</p></div>`;
    return;
  }
  el.innerHTML = matched.map(job => `
  <div class="job-card">
    <div class="job-card-header">
      <div>
        <div class="job-title">${esc(job.title)}</div>
        <div class="job-employer">${esc(job.employer)}</div>
      </div>
      ${job.matchCount >= 2 ? `<span class="job-match-badge">Strong match</span>` : `<span class="job-match-badge job-match-light">Match</span>`}
    </div>
    <div class="job-meta">${esc(job.type)} · ${esc(job.pay)}</div>
    <p class="job-desc">${esc(job.description.substring(0, 130))}…</p>
    ${job.tags.map(t => `<span class="tag tag-sand" style="margin-top:.5rem;margin-right:.3rem;">${esc(t)}</span>`).join('')}
    <div class="job-contact">${esc(job.contact)}</div>
  </div>`).join('');
}

// ── Passport Saved Panel ───────────────────────────
function renderPassportSavedPanel() {
  const el = document.getElementById('saved-list');
  if (!passportSaved.length) {
    el.innerHTML = `<div class="panel-empty-state"><i class="bi bi-bookmark panel-empty-icon"></i><p>Nothing saved yet.</p><p class="panel-empty-sub">Click <strong>Save</strong> on any section of your passport.</p></div>`;
    return;
  }
  el.innerHTML = passportSaved.map(item => `
  <div class="saved-item">
    <div class="saved-item-top">
      <div class="saved-item-name">${esc(item.sectionName)}</div>
      <button class="panel-remove-btn" onclick="removePassportSaved('${item.id}')">&times;</button>
    </div>
    <div class="saved-item-section">Skills Passport</div>
    ${item.note ? `<div class="saved-item-note">"${esc(item.note)}"</div>` : ''}
    <button class="saved-edit-btn" onclick="openPassportSaveModal('${item.sectionId}','${esc(item.sectionName)}')">${item.note ? 'Edit note' : '+ Add note'}</button>
  </div>`).join('');
}

function openPassportSaveModal(sectionId, sectionName) {
  pendingSaveId = sectionId;
  document.getElementById('modal-card-name').textContent = sectionName;
  const existing = passportSaved.find(s => s.sectionId === sectionId);
  document.getElementById('save-note-input').value = existing ? existing.note : '';
  document.getElementById('save-modal-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('save-note-input').focus(), 80);
}

function closeSaveModal() { document.getElementById('save-modal-overlay').classList.add('hidden'); pendingSaveId = null; }

function confirmPassportSave() {
  if (!pendingSaveId) return;
  const note = document.getElementById('save-note-input').value.trim();
  const sectionEl = document.getElementById(pendingSaveId);
  const sectionName = sectionEl?.querySelector('.section-title')?.textContent || pendingSaveId;
  const idx = passportSaved.findIndex(s => s.sectionId === pendingSaveId);
  if (idx >= 0) { passportSaved[idx].note = note; }
  else { passportSaved.push({ id: uid('psa'), sectionId: pendingSaveId, sectionName, note, savedAt: Date.now() }); }
  persistPassportSaved();
  renderPassportSavedPanel();
  updateBadges();
  closeSaveModal();
  showToast('Saved ✓');
}

function removePassportSaved(id) {
  passportSaved = passportSaved.filter(s => s.id !== id);
  persistPassportSaved();
  renderPassportSavedPanel();
  updateBadges();
}

function persistPassportSaved() {
  localStorage.setItem('wp_passport_saved', JSON.stringify(passportSaved));
  if (typeof syncToCloud === 'function' && currentUser) syncToCloud();
}

function updateBadges() {
  const sBadge = document.getElementById('saved-badge');
  if (sBadge) { sBadge.textContent = passportSaved.length; sBadge.classList.toggle('hidden', !passportSaved.length); }
}

// ── Auth UI (mirrors guide.js) ─────────────────────
function updateAccountUI(user) {
  const guestEl = document.getElementById('account-guest');
  const userEl  = document.getElementById('account-user');
  const emailEl = document.getElementById('account-email-display');
  if (!guestEl || !userEl) return;
  if (user) { guestEl.classList.add('hidden'); userEl.classList.remove('hidden'); if (emailEl) emailEl.textContent = user.email; }
  else       { guestEl.classList.remove('hidden'); userEl.classList.add('hidden'); }
}

function openAuthModal(mode = 'signin') {
  authMode = mode;
  document.getElementById('auth-email').value    = '';
  document.getElementById('auth-password').value = '';
  clearAuthError(); setAuthLoading(false); switchAuthTab(mode);
  document.getElementById('auth-modal-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('auth-email').focus(), 80);
}

function closeAuthModal() { document.getElementById('auth-modal-overlay').classList.add('hidden'); }

function switchAuthTab(mode) {
  authMode = mode;
  document.getElementById('auth-tab-signin').classList.toggle('active', mode === 'signin');
  document.getElementById('auth-tab-signup').classList.toggle('active', mode === 'signup');
  const btn = document.getElementById('auth-submit-btn');
  if (btn) btn.textContent = mode === 'signin' ? 'Sign In' : 'Create Account';
  clearAuthError();
}

function submitAuthForm() {
  const email = document.getElementById('auth-email').value.trim();
  const pw    = document.getElementById('auth-password').value;
  if (!email || !pw) { showAuthError('Please enter your email and password.'); return; }
  if (authMode === 'signin') doSignIn(email, pw); else doSignUp(email, pw);
}

function showAuthError(msg) { const el = document.getElementById('auth-error'); if (el) { el.textContent = msg; el.classList.remove('hidden'); } }
function clearAuthError()   { const el = document.getElementById('auth-error'); if (el) { el.textContent = ''; el.classList.add('hidden'); } }
function setAuthLoading(loading) {
  const btn = document.getElementById('auth-submit-btn');
  if (!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? 'Please wait…' : (authMode === 'signin' ? 'Sign In' : 'Create Account');
}

// ── PDF Download ───────────────────────────────────
function downloadPassportPDF() {
  const el = document.getElementById('passport-content');
  if (!el || typeof html2pdf === 'undefined') { showToast('PDF not available — try refreshing'); return; }
  const hidden = el.querySelectorAll('.section-save-btn');
  hidden.forEach(e => e.style.display = 'none');
  showToast('Preparing PDF…');
  html2pdf().set({
    margin: [12,12,12,12], filename: 'Waypost-Skills-Passport.pdf',
    image: { type:'jpeg', quality:0.95 }, html2canvas: { scale:2, useCORS:true, logging:false },
    jsPDF: { unit:'mm', format:'a4', orientation:'portrait' }
  }).from(el).save().then(() => { hidden.forEach(e => e.style.display = ''); showToast('PDF downloaded ✓'); });
}

// ── Document Modal ─────────────────────────────────
function openDocModal(type) {
  currentDocType = type;
  const titles = { 'resume': 'Resume', 'cover-letter': 'Cover Letter', 'interview-prep': 'Interview Prep' };
  document.getElementById('doc-modal-title').textContent = titles[type] || 'Document';
  document.getElementById('copy-confirm').classList.add('hidden');
  let content = '';
  if (type === 'resume')         content = generateResume(passport);
  if (type === 'cover-letter')   content = generateCoverLetter(passport);
  if (type === 'interview-prep') content = generateInterviewPrep(passport);
  const pre = document.createElement('pre');
  pre.textContent = content;
  const out = document.getElementById('doc-output');
  out.innerHTML = '';
  out.appendChild(pre);
  document.getElementById('doc-modal-overlay').classList.remove('hidden');
}

function closeDocModal() { document.getElementById('doc-modal-overlay').classList.add('hidden'); currentDocType = null; }

function copyDocContent() {
  const text = document.getElementById('doc-output')?.innerText || '';
  navigator.clipboard.writeText(text).then(() => {
    document.getElementById('copy-confirm').classList.remove('hidden');
    setTimeout(() => document.getElementById('copy-confirm').classList.add('hidden'), 2000);
  });
}

// ── Helpers ────────────────────────────────────────
function uid(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 2500);
}
function saveBtn(sectionId, sectionName) {
  return `<button class="section-save-btn" onclick="openPassportSaveModal('${sectionId}','${sectionName.replace(/'/g,"\\'")}')"><i class="bi bi-bookmark"></i> Save</button>`;
}


// ══════════════════════════════════════════════════
// PROFILE BUILDER
// ══════════════════════════════════════════════════

function buildPassportProfile(p) {
  const name       = p.name || 'Friend';
  const categories = p.skillCategories || [];
  const gaps       = p.gaps || [];
  const work       = (p.workHistory || []).filter(w => w.title);
  const volunteers = p.volunteerRoles || [];
  const edu        = p.education || {};
  const hasGap     = p.hasGap && gaps.length > 0;

  let html = passportHero(p, name, categories, gaps);
  html += summarySection(p, name, categories, gaps, work);
  if (work.length)      html += workHistorySection(work);
  if (hasGap)           html += employmentJourneySection(gaps);
  html                       += skillsSection(categories, volunteers);
  if (edu.level)        html += educationSection(edu);
  if (volunteers.length)html += volunteerSection(volunteers);

  return html;
}

// ── Hero ───────────────────────────────────────────
function passportHero(p, name, categories, gaps) {
  const catLabel = categories.slice(0,2).map(id => SKILL_CATEGORIES.find(c=>c.id===id)?.label || id).join(' · ');
  return `
  <div class="passport-hero guide-hero" id="section-header">
    <span class="guide-pill">Skills Passport · Fallbrook, CA</span>
    <h1>${esc(name)}'s Skills Passport</h1>
    ${catLabel ? `<p style="opacity:.8;font-size:.9rem;margin-top:.5rem;">${esc(catLabel)}</p>` : ''}
    <p style="margin-top:1rem;opacity:.88;font-size:.95rem;line-height:1.65;">
      This is your professional profile — built from your work history, skills, and experience as a military spouse. Use the <strong>Documents</strong> tab to generate your resume, cover letter, and interview prep.
    </p>
  </div>`;
}

// ── Professional Summary ───────────────────────────
function summarySection(p, name, categories, gaps, work) {
  const summary = generateSummaryParagraph(p, name, categories, gaps, work);
  return `
  <div class="passport-section guide-section" id="section-summary">
    <div class="section-header">
      <i class="bi bi-person-badge section-icon"></i>
      <h2 class="section-title">Professional Summary</h2>
      ${saveBtn('section-summary','Professional Summary')}
    </div>
    <div class="card" style="padding:1.25rem 1.4rem;">
      <p style="font-size:.93rem;color:var(--text-mid);line-height:1.7;">${esc(summary)}</p>
    </div>
  </div>`;
}

function generateSummaryParagraph(p, name, cats, gaps, work) {
  const totalYears = Math.round(work.reduce((sum,w) => sum + (YEAR_NUM[w.years]||0), 0));
  const catLabels  = cats.slice(0,3).map(id => SKILL_CATEGORIES.find(c=>c.id===id)?.label || id);
  const hasGap     = p.hasGap && gaps.length > 0;
  const primaryGap = hasGap ? gaps[0].type : null;
  const gapTrans   = primaryGap ? DISRUPTION_TRANSLATIONS[primaryGap] : null;
  const workPref   = p.workPreference || 'either';
  const locPref    = p.locationPreference || 'flexible';

  let line1 = catLabels.length
    ? `Professional with${totalYears > 1 ? ` approximately ${totalYears} years of combined` : ''} experience in ${catLabels.join(', ')}`
    : `Experienced professional with a background in multiple disciplines`;

  let line2 = gapTrans
    ? `— bringing ${gapTrans.skills[0].toLowerCase()} developed through the demands of military family life.`
    : `— with a consistent professional track record across multiple locations and environments.`;

  const prefStr = workPref !== 'either' ? `${workPref} ` : '';
  const locStr  = locPref  !== 'flexible' ? `${locPref} ` : '';
  let line3 = `Seeking a ${prefStr}${locStr}role where adaptability, dedication, and the ability to contribute from day one are genuinely valued.`;

  if (p.additionalContext) line3 = p.additionalContext;

  return `${line1} ${line2} ${line3}`;
}

// ── Work History ───────────────────────────────────
function workHistorySection(work) {
  const entries = work.map(w => {
    const cat     = SKILL_CATEGORIES.find(c => c.id === w.industry);
    const bullets = w.industry ? (INDUSTRY_BULLETS[w.industry] || []).slice(0,2) : [];
    return `
    <div class="work-history-entry">
      <div class="work-entry-title">${esc(w.title)}</div>
      ${w.employer ? `<div class="work-entry-employer">${esc(w.employer)}</div>` : ''}
      <div class="work-entry-meta">
        ${w.years ? `<span>${esc(YEAR_LABEL[w.years] || w.years)}</span>` : ''}
        ${cat ? `<span class="tag tag-sand" style="margin-left:.5rem;">${esc(cat.label)}</span>` : ''}
      </div>
      ${bullets.length ? `<ul class="work-bullets">${bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>` : ''}
    </div>`;
  }).join('');
  return `
  <div class="passport-section guide-section" id="section-work">
    <div class="section-header">
      <i class="bi bi-briefcase section-icon"></i>
      <h2 class="section-title">Work History</h2>
      ${saveBtn('section-work','Work History')}
    </div>
    <div class="passport-entry-list">${entries}</div>
  </div>`;
}

// ── Employment Journey ─────────────────────────────
function employmentJourneySection(gaps) {
  const entries = gaps.filter(g => g.type).map(g => {
    const trans   = DISRUPTION_TRANSLATIONS[g.type] || DISRUPTION_TRANSLATIONS['other'];
    const gapType = GAP_TYPES.find(t => t.id === g.type);
    return `
    <div class="gap-entry-card">
      <div class="gap-entry-header">
        <i class="bi ${gapType?.iconClass || 'bi-three-dots'} gap-entry-icon"></i>
        <div>
          <div class="gap-entry-type">${esc(gapType?.label || 'Employment Gap')}</div>
          ${g.duration ? `<div class="gap-entry-duration">${esc(g.duration.replace('mo',' months').replace('yr',' year').replace('+',' +'))}</div>` : ''}
        </div>
      </div>
      <p class="gap-translation">${esc(trans.gapExplanation)}</p>
      <div class="gap-skills">
        ${trans.skills.slice(0,3).map(s=>`<span class="tag tag-olive">${esc(s)}</span>`).join('')}
      </div>
    </div>`;
  }).join('');
  return `
  <div class="passport-section guide-section" id="section-journey">
    <div class="section-header">
      <i class="bi bi-map section-icon"></i>
      <h2 class="section-title">Employment Journey</h2>
      ${saveBtn('section-journey','Employment Journey')}
    </div>
    <p class="section-intro">Your career path reflects the demands of military family life. Here's how your experience is framed — professionally and accurately.</p>
    <div class="callout"><strong>On your resume and in interviews,</strong> these gaps are not something to hide. They're something to explain well — which is exactly what the language below does.</div>
    ${entries}
  </div>`;
}

// ── Skills & Strengths ─────────────────────────────
function skillsSection(categories, volunteers) {
  const catItems   = categories.map(id => { const c = SKILL_CATEGORIES.find(s=>s.id===id); return c ? `<div class="skill-chip">${c.icon} ${c.label}</div>` : ''; }).join('');
  const gapSkills  = []; // collected from all gap translations if present
  if (passport.hasGap && passport.gaps) {
    passport.gaps.filter(g=>g.type).forEach(g => {
      const t = DISRUPTION_TRANSLATIONS[g.type];
      if (t) t.skills.forEach(s => { if (!gapSkills.includes(s)) gapSkills.push(s); });
    });
  }
  const universalItems = UNIVERSAL_SKILLS.map(s=>`<div class="skill-chip skill-chip-sand">${esc(s)}</div>`).join('');
  const transferItems  = gapSkills.slice(0,5).map(s=>`<div class="skill-chip skill-chip-terra">${esc(s)}</div>`).join('');
  return `
  <div class="passport-section guide-section" id="section-skills">
    <div class="section-header">
      <i class="bi bi-star section-icon"></i>
      <h2 class="section-title">Skills &amp; Strengths</h2>
      ${saveBtn('section-skills','Skills & Strengths')}
    </div>
    ${catItems ? `<div class="skill-chips-label">Professional expertise</div><div class="skill-chips">${catItems}</div>` : ''}
    ${transferItems ? `<div class="skill-chips-label" style="margin-top:1rem;">Transferable strengths (from your experience)</div><div class="skill-chips">${transferItems}</div>` : ''}
    <div class="skill-chips-label" style="margin-top:1rem;">Universal military spouse strengths</div>
    <div class="skill-chips">${universalItems}</div>
  </div>`;
}

// ── Education ──────────────────────────────────────
function educationSection(edu) {
  return `
  <div class="passport-section guide-section" id="section-education">
    <div class="section-header">
      <i class="bi bi-mortarboard section-icon"></i>
      <h2 class="section-title">Education</h2>
    </div>
    <div class="card">
      <div class="card-name">${esc(EDU_LABEL[edu.level] || edu.level)}</div>
      ${edu.degree ? `<div class="card-body" style="margin-top:.25rem;">${esc(edu.degree)}</div>` : ''}
    </div>
  </div>`;
}

// ── Volunteer & Community Leadership ──────────────
function volunteerSection(roles) {
  const entries = roles.map(id => {
    const v = VOLUNTEER_TRANSLATIONS[id];
    if (!v) return '';
    return `
    <div class="work-history-entry">
      <div class="work-entry-title">${esc(v.title)}</div>
      <div class="work-entry-meta"><span class="tag tag-blue">Community Leadership</span></div>
      <ul class="work-bullets">${v.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>
    </div>`;
  }).join('');
  return `
  <div class="passport-section guide-section" id="section-volunteer">
    <div class="section-header">
      <i class="bi bi-people section-icon"></i>
      <h2 class="section-title">Community &amp; Volunteer Leadership</h2>
      ${saveBtn('section-volunteer','Community & Volunteer Leadership')}
    </div>
    <p class="section-intro">These roles belong on your resume. They demonstrate real organizational, communication, and leadership skills.</p>
    <div class="passport-entry-list">${entries}</div>
  </div>`;
}


// ══════════════════════════════════════════════════
// DOCUMENT GENERATORS
// ══════════════════════════════════════════════════

const DIV = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

function generateResume(p) {
  const name    = p.name || 'Your Name';
  const work    = (p.workHistory || []).filter(w => w.title);
  const vols    = p.volunteerRoles || [];
  const cats    = p.skillCategories || [];
  const edu     = p.education || {};
  const gaps    = (p.hasGap && p.gaps) ? p.gaps.filter(g=>g.type) : [];
  const summary = generateSummaryParagraph(p, name, cats, gaps, work);
  const catLabels = cats.map(id => SKILL_CATEGORIES.find(c=>c.id===id)?.label || id);

  let doc = `${name.toUpperCase()}\nFallbrook, CA  |  [your email]  |  [your phone]\n\n${DIV}\n\nPROFESSIONAL SUMMARY\n\n${summary}\n\n${DIV}\n`;

  if (work.length) {
    doc += `\nWORK EXPERIENCE\n`;
    work.forEach(w => {
      doc += `\n${w.title.toUpperCase()}`;
      if (w.employer) doc += `  |  ${w.employer}`;
      if (w.years)    doc += `  |  ${YEAR_LABEL[w.years] || w.years}`;
      doc += '\n';
      const bullets = w.industry ? (INDUSTRY_BULLETS[w.industry] || []).slice(0,3) : [];
      bullets.forEach(b => doc += `• ${b}\n`);
    });
    doc += `\n${DIV}\n`;
  }

  if (vols.length) {
    doc += `\nCOMMUNITY & VOLUNTEER LEADERSHIP\n`;
    vols.forEach(id => {
      const v = VOLUNTEER_TRANSLATIONS[id];
      if (!v) return;
      doc += `\n${v.title.toUpperCase()}\n`;
      v.bullets.slice(0,2).forEach(b => doc += `• ${b}\n`);
    });
    doc += `\n${DIV}\n`;
  }

  if (catLabels.length) {
    doc += `\nSKILLS\n\n${catLabels.join('  ·  ')}\n\n${DIV}\n`;
  }

  if (edu.level) {
    doc += `\nEDUCATION\n\n${EDU_LABEL[edu.level] || edu.level}`;
    if (edu.degree) doc += ` — ${edu.degree}`;
    doc += `\n\n${DIV}\n`;
  }

  if (gaps.length) {
    doc += `\nNOTE ON EMPLOYMENT TIMELINE\n\n`;
    const primary = gaps[0];
    const trans = DISRUPTION_TRANSLATIONS[primary.type] || DISRUPTION_TRANSLATIONS['other'];
    doc += trans.gapExplanation + '\n\n' + DIV + '\n';
  }

  doc += `\nGenerated by Waypost — skillspassport.waypost.com\nCustomize this document in any word processor before sending.`;
  return doc;
}

function generateCoverLetter(p) {
  const name    = p.name || 'Your Name';
  const work    = (p.workHistory || []).filter(w => w.title);
  const cats    = p.skillCategories || [];
  const gaps    = (p.hasGap && p.gaps) ? p.gaps.filter(g=>g.type) : [];
  const hasGap  = gaps.length > 0;
  const cat1    = cats[0] ? SKILL_CATEGORIES.find(c=>c.id===cats[0])?.label : 'your industry';
  const workPref = p.workPreference !== 'either' ? p.workPreference : '';
  const summary  = generateSummaryParagraph(p, name, cats, gaps, work);
  const primaryTrans = hasGap ? (DISRUPTION_TRANSLATIONS[gaps[0].type] || DISRUPTION_TRANSLATIONS['other']) : null;

  let doc = `[Today's Date]\n\nDear Hiring Manager,\n\n`;

  doc += `I am writing to express my strong interest in the [Position Title] role at [Company Name]. ${summary}\n\n`;

  if (work.length) {
    const topRole = work[0];
    doc += `My background includes${topRole.years ? ` ${YEAR_LABEL[topRole.years] || topRole.years} as a` : ' experience as a'} ${topRole.title}${topRole.employer ? ` at ${topRole.employer}` : ''}. `;
    doc += `Throughout my career in ${cat1}, I have developed the [specific skills] required for this role, and I am confident in my ability to contribute meaningfully from my first day on the team.\n\n`;
  }

  if (hasGap && primaryTrans) {
    doc += primaryTrans.coverLetterBridge + ' I am proud of the choices I made during that period, and I am equally proud of the professional skills I bring forward from them.\n\n';
  }

  doc += `Fallbrook and the surrounding community are particularly meaningful to me${p.additionalContext ? ` — ${p.additionalContext}` : ', and I am committed to building a long-term professional presence here'}. I would welcome the opportunity to discuss how my background aligns with what you are looking for.\n\n`;

  doc += `Thank you for your time and consideration.\n\nSincerely,\n${name}\n[Your email]  |  [Your phone]\n\n${DIV}\n`;
  doc += `Generated by Waypost — customize before sending.`;
  return doc;
}

function generateInterviewPrep(p) {
  const name   = p.name || 'Friend';
  const cats   = p.skillCategories || [];
  const gaps   = (p.hasGap && p.gaps) ? p.gaps.filter(g=>g.type) : [];
  const work   = (p.workHistory || []).filter(w => w.title);
  const hasGap = gaps.length > 0;
  const primaryTrans = hasGap ? (DISRUPTION_TRANSLATIONS[gaps[0].type] || DISRUPTION_TRANSLATIONS['other']) : null;
  const catLabels = cats.slice(0,3).map(id => SKILL_CATEGORIES.find(c=>c.id===id)?.label || id);
  const summary   = generateSummaryParagraph(p, name, cats, gaps, work);

  let doc = `INTERVIEW PREP — ${name.toUpperCase()}\nGenerated by Waypost\n\n${DIV}\n\n`;

  doc += `Q1: "Tell me about yourself."\n\nA: ${summary}\n\n`;

  if (hasGap && primaryTrans) {
    doc += `${DIV}\n\nQ2: "Why is there a gap in your resume?" / "What were you doing during [period]?"\n\nA: ${primaryTrans.interviewAnswer}\n\n`;
  } else {
    doc += `${DIV}\n\nQ2: "Walk me through your work history."\n\nA: My career has been consistent in direction, even when the geography changed. I've worked in ${catLabels.join(', ')}, and each role has built on the one before it. I'm looking forward to continuing that progression here.\n\n`;
  }

  doc += `${DIV}\n\nQ3: "What are your greatest strengths?"\n\nA: Three things come to mind. First, I adapt quickly — I've had to build professional credibility in new environments multiple times, and I've gotten genuinely good at it. Second, ${cats[1] ? `I have solid, practical experience in ${catLabels[1] || 'my field'} and I can hit the ground running in that area.` : 'I bring strong organizational skills and a track record of delivering results without needing close supervision.'} Third, I don't fold under pressure. That's not just something I say — it's been tested in ways most professionals haven't experienced.\n\n`;

  doc += `${DIV}\n\nQ4: "Why are you interested in this role / this company?"\n\nA: [Customize for the specific role.] Generally: I'm interested in building something lasting here in Fallbrook. ${p.additionalContext || "I'm at a point in my career where I want to invest in a team and a community rather than keep moving. This role aligns with that goal."}\n\n`;

  doc += `${DIV}\n\nQ5: "Tell me about a challenge you've faced and how you overcame it."\n\nA: ${hasGap && primaryTrans ? `One of the most meaningful challenges I've faced is navigating my career through ${GAP_TYPES.find(t=>t.id===gaps[0].type)?.label || 'significant life disruptions'}. ${primaryTrans.interviewAnswer.split('.')[0]}. What that experience taught me is that I can handle more than I thought I could — and that's the kind of resilience I'd bring to any challenge this role puts in front of me.` : `I once had to [adapt to a major change / lead a project without clear direction / rebuild in a new environment]. The way I handled it was: stay calm, prioritize the most critical outcomes, communicate clearly, and execute. I'd bring that same approach here.`}\n\n`;

  doc += `${DIV}\n\nRemember:\n• Pause before answering — it signals confidence, not uncertainty.\n• "I don't know, but I'd find out" is a strong answer when it's true.\n• Ask one good question at the end: "What does success look like in this role in the first 90 days?"\n\nGenerated by Waypost.`;
  return doc;
}
