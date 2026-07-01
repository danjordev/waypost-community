/* ══════════════════════════════════════════════════
   WAYPOST — passport-app.js
   Skills Passport questionnaire logic.
   Mirrors app.js patterns for the Career pillar.
══════════════════════════════════════════════════ */

let currentPassportStep = 1;
const PASSPORT_TOTAL_STEPS = 6;

// Toggle selections (group = workPref, locationPref, hasGap)
const passportToggles = {};

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updatePassportProgress();
  populateSkillCategoryCheckboxes();
  populateVolunteerCheckboxes();
  populateGapTypeDropdowns();
  populateWorkIndustryDropdowns();
  setupEducationLevelToggle();
  setupUploadArea();
});

// ── Progress ───────────────────────────────────────
function updatePassportProgress() {
  const pct = (currentPassportStep / PASSPORT_TOTAL_STEPS * 100);
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `Step ${currentPassportStep} of ${PASSPORT_TOTAL_STEPS}`;
}

// ── Navigation ─────────────────────────────────────
function nextPassportStep(fromStep) {
  if (fromStep === 1) {
    const name = document.getElementById('passport-name').value.trim();
    if (!name) {
      document.getElementById('passport-name').classList.add('error');
      document.getElementById('name-error').classList.remove('hidden');
      document.getElementById('passport-name').focus();
      return;
    }
    document.getElementById('passport-name').classList.remove('error');
    document.getElementById('name-error').classList.add('hidden');
  }
  goToPassportStep(fromStep + 1);
}

function prevPassportStep(fromStep) { goToPassportStep(fromStep - 1); }

function goToPassportStep(step) {
  document.getElementById(`step-${currentPassportStep}`).classList.remove('active');
  currentPassportStep = step;
  document.getElementById(`step-${currentPassportStep}`).classList.add('active');
  updatePassportProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Toggle Buttons (workPref, locationPref, hasGap) ─
function togglePassportSelect(btn) {
  const group = btn.dataset.group;
  document.querySelectorAll(`[data-group="${group}"]`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  passportToggles[group] = btn.dataset.value;

  if (group === 'hasGap') {
    document.getElementById('gap-entries-section').style.display =
      btn.dataset.value === 'yes' ? 'block' : 'none';
  }
}

// ── Populate Skill Category Checkboxes ─────────────
function populateSkillCategoryCheckboxes() {
  const container = document.getElementById('skill-category-checkboxes');
  container.innerHTML = SKILL_CATEGORIES.map(cat => `
    <label class="checkbox-card">
      <input type="checkbox" name="skillCategory" value="${cat.id}">
      <span class="checkbox-label">
        <span class="checkbox-emoji">${cat.icon}</span>
        <span class="checkbox-text">${cat.label}</span>
      </span>
    </label>`).join('');
}

// ── Populate Volunteer Checkboxes ──────────────────
function populateVolunteerCheckboxes() {
  const container = document.getElementById('volunteer-checkboxes');
  container.innerHTML = Object.entries(VOLUNTEER_TRANSLATIONS).map(([id, v]) => `
    <label class="checkbox-card">
      <input type="checkbox" name="volunteerRole" value="${id}">
      <span class="checkbox-label">
        <span class="checkbox-emoji">🤝</span>
        <span class="checkbox-text">${v.label}</span>
      </span>
    </label>`).join('');
}

// ── Populate Gap Type Dropdowns ────────────────────
function populateGapTypeDropdowns() {
  const selects = document.querySelectorAll('.gap-type');
  const options = GAP_TYPES.map(t => `<option value="${t.id}">${t.icon} ${t.label}</option>`).join('');
  selects.forEach(sel => sel.innerHTML = `<option value="">Select…</option>` + options);
}

// ── Populate Work Industry Dropdowns ───────────────
function populateWorkIndustryDropdowns() {
  const selects = document.querySelectorAll('.work-industry');
  const options = SKILL_CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
  selects.forEach(sel => sel.innerHTML = `<option value="">Select closest match…</option>` + options);
}

// ── Education Level — show degree name field ───────
function setupEducationLevelToggle() {
  const sel = document.getElementById('education-level');
  sel.addEventListener('change', () => {
    const showName = sel.value && sel.value !== 'high-school';
    document.getElementById('degree-name-group').style.display = showName ? 'block' : 'none';
  });
}

// ── Dynamic Work Entries ───────────────────────────
let workEntryCount = 1;
function addWorkEntry() {
  if (workEntryCount >= 4) {
    document.getElementById('add-work-btn').style.display = 'none';
    return;
  }
  const container = document.getElementById('work-entries');
  const idx = workEntryCount;
  const div = document.createElement('div');
  div.className = 'work-entry';
  div.id = `work-entry-${idx}`;
  div.innerHTML = `
    <div class="work-entry-header">
      <span class="work-entry-label">Role ${idx + 1}</span>
      <button class="work-entry-remove" onclick="removeWorkEntry(${idx})">&times; Remove</button>
    </div>
    <div class="work-entry-fields">
      <div class="field-group">
        <label class="field-label">Job title</label>
        <input type="text" class="text-input work-title" placeholder="e.g. Office Manager, RN, Teacher">
      </div>
      <div class="work-entry-row">
        <div class="field-group">
          <label class="field-label">Employer <span class="field-hint">(optional)</span></label>
          <input type="text" class="text-input work-employer" placeholder="e.g. Medical Associates">
        </div>
        <div class="field-group">
          <label class="field-label">Approximate years</label>
          <select class="text-input work-years">
            <option value="">Select…</option>
            <option value="less-than-1">Less than 1 year</option>
            <option value="1-2">1–2 years</option>
            <option value="3-5">3–5 years</option>
            <option value="5-10">5–10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">Industry / field</label>
        <select class="text-input work-industry">
          <option value="">Select closest match…</option>
          ${SKILL_CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join('')}
        </select>
      </div>
    </div>`;
  container.appendChild(div);
  workEntryCount++;
  if (workEntryCount >= 4) document.getElementById('add-work-btn').style.display = 'none';
}

function removeWorkEntry(idx) {
  document.getElementById(`work-entry-${idx}`)?.remove();
  document.getElementById('add-work-btn').style.display = 'inline-flex';
  workEntryCount = Math.max(1, workEntryCount - 1);
}

// ── Dynamic Gap Entries ────────────────────────────
let gapEntryCount = 1;
function addGapEntry() {
  if (gapEntryCount >= 2) {
    document.getElementById('add-gap-btn').style.display = 'none';
    return;
  }
  const container = document.getElementById('gap-entries');
  const idx = gapEntryCount;
  const div = document.createElement('div');
  div.className = 'gap-entry';
  div.id = `gap-entry-${idx}`;
  const options = GAP_TYPES.map(t => `<option value="${t.id}">${t.icon} ${t.label}</option>`).join('');
  div.innerHTML = `
    <div class="work-entry-header">
      <span class="work-entry-label">Gap ${idx + 1}</span>
      <button class="work-entry-remove" onclick="removeGapEntry(${idx})">&times; Remove</button>
    </div>
    <div class="work-entry-fields">
      <div class="work-entry-row">
        <div class="field-group">
          <label class="field-label">What caused this gap?</label>
          <select class="text-input gap-type">
            <option value="">Select…</option>${options}
          </select>
        </div>
        <div class="field-group">
          <label class="field-label">How long?</label>
          <select class="text-input gap-duration">
            <option value="">Select…</option>
            <option value="3-6mo">3–6 months</option>
            <option value="6-12mo">6–12 months</option>
            <option value="1-2yr">1–2 years</option>
            <option value="2-5yr">2–5 years</option>
            <option value="5yr+">5+ years</option>
          </select>
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">Anything to add? <span class="field-hint">(optional)</span></label>
        <textarea class="text-input gap-description" rows="2" placeholder="Any context you'd like included…"></textarea>
      </div>
    </div>`;
  container.appendChild(div);
  gapEntryCount++;
  if (gapEntryCount >= 2) document.getElementById('add-gap-btn').style.display = 'none';
}

function removeGapEntry(idx) {
  document.getElementById(`gap-entry-${idx}`)?.remove();
  document.getElementById('add-gap-btn').style.display = 'inline-flex';
  gapEntryCount = Math.max(1, gapEntryCount - 1);
}

// ── Resume Upload ──────────────────────────────────
function setupUploadArea() {
  const area = document.getElementById('resume-upload-area');
  area.addEventListener('click', () => document.getElementById('resume-file-input').click());
  area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('drag-over'); });
  area.addEventListener('dragleave', () => area.classList.remove('drag-over'));
  area.addEventListener('drop', e => {
    e.preventDefault();
    area.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) processResumeFile(file);
  });
}

function handleResumeUpload(input) {
  const file = input.files[0];
  if (file) processResumeFile(file);
}

async function processResumeFile(file) {
  const statusEl = document.getElementById('resume-status');
  const textGroup = document.getElementById('resume-text-group');
  const textarea  = document.getElementById('resume-text-area');

  statusEl.textContent = 'Extracting text…';
  statusEl.className = 'resume-status';

  try {
    let text = '';
    if (file.name.endsWith('.pdf')) {
      text = await extractPdfText(file);
    } else if (file.name.endsWith('.docx')) {
      text = await extractDocxText(file);
    } else {
      statusEl.textContent = 'Please upload a PDF or .docx file.';
      statusEl.className = 'resume-status resume-status-error';
      return;
    }
    textarea.value = text.trim();
    textGroup.style.display = 'block';
    statusEl.textContent = `✓ Text extracted from ${file.name} — review and edit below.`;
    statusEl.className = 'resume-status resume-status-ok';
    document.getElementById('resume-upload-area').querySelector('.resume-upload-prompt').textContent = file.name;
  } catch (e) {
    statusEl.textContent = 'Could not extract text automatically. Paste your resume text in the box below instead.';
    statusEl.className = 'resume-status resume-status-error';
    textGroup.style.display = 'block';
  }
}

async function extractPdfText(file) {
  if (typeof pdfjsLib === 'undefined') throw new Error('PDF.js not loaded');
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ') + '\n';
  }
  return text;
}

async function extractDocxText(file) {
  if (typeof mammoth === 'undefined') throw new Error('Mammoth not loaded');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

// ── Collect Answers & Redirect ─────────────────────
function buildPassport() {
  const passport = {
    name: document.getElementById('passport-name').value.trim() || 'Friend',
    resumeText: document.getElementById('resume-text-area').value.trim(),

    workHistory: [...document.querySelectorAll('.work-entry')].map(entry => ({
      title:    entry.querySelector('.work-title')?.value.trim()    || '',
      employer: entry.querySelector('.work-employer')?.value.trim() || '',
      years:    entry.querySelector('.work-years')?.value           || '',
      industry: entry.querySelector('.work-industry')?.value        || ''
    })).filter(w => w.title || w.employer),

    volunteerRoles: [...document.querySelectorAll('input[name="volunteerRole"]:checked')].map(el => el.value),

    hasGap: passportToggles['hasGap'] === 'yes',
    gaps: passportToggles['hasGap'] === 'yes'
      ? [...document.querySelectorAll('.gap-entry')].map(entry => ({
          type:        entry.querySelector('.gap-type')?.value        || '',
          duration:    entry.querySelector('.gap-duration')?.value    || '',
          description: entry.querySelector('.gap-description')?.value.trim() || ''
        })).filter(g => g.type)
      : [],

    skillCategories: [...document.querySelectorAll('input[name="skillCategory"]:checked')].map(el => el.value),

    education: {
      level:  document.getElementById('education-level').value  || '',
      degree: document.getElementById('degree-name').value.trim() || ''
    },

    workPreference:     passportToggles['workPref']      || 'either',
    locationPreference: passportToggles['locationPref']  || 'flexible',
    additionalContext:  document.getElementById('goals-context').value.trim(),
    createdAt: Date.now()
  };

  localStorage.setItem('wp_passport', JSON.stringify(passport));
  window.location.href = 'passport.html';
}
