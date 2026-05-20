/* ══════════════════════════════════════════════════
   WAYPOST — app.js
   Questionnaire logic for questionnaire.html
══════════════════════════════════════════════════ */

const answers = { name:'', hasKids:null, kidAges:[], priorities:[], dining:[], extras:[] };
let currentStep = 1;
const TOTAL_STEPS = 5;

// ── Navigation ─────────────────────────────────────
function nextStep(fromStep) {
  if (fromStep === 1) {
    const name  = document.getElementById('name-input').value.trim();
    const errEl = document.getElementById('name-error');
    const inpEl = document.getElementById('name-input');
    if (!name) { inpEl.classList.add('error'); errEl.classList.remove('hidden'); inpEl.focus(); return; }
    inpEl.classList.remove('error'); errEl.classList.add('hidden');
    answers.name = name;
  }
  goToStep(fromStep + 1);
}

function prevStep(fromStep) { goToStep(fromStep - 1); }

function goToStep(step) {
  document.getElementById(`step-${currentStep}`).classList.remove('active');
  currentStep = step;
  document.getElementById(`step-${currentStep}`).classList.add('active');
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  document.getElementById('progress-bar').style.width = (currentStep / TOTAL_STEPS * 100) + '%';
  document.getElementById('progress-label').textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
}

// ── Toggle Buttons ─────────────────────────────────
function toggleSelect(btn) {
  const group = btn.dataset.group;
  document.querySelectorAll(`[data-group="${group}"]`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  if (group === 'hasKids') {
    answers.hasKids = btn.dataset.value === 'yes';
    document.getElementById('kid-ages-group').style.display = answers.hasKids ? 'block' : 'none';
  }
}

// ── Generate: save to localStorage and redirect ────
function generateGuide() {
  answers.kidAges    = checked('kidAge');
  answers.priorities = checked('priority');
  answers.dining     = checked('dining');
  answers.extras     = checked('extra');

  localStorage.setItem('wp_answers', JSON.stringify(answers));
  localStorage.setItem('wp_town', 'fallbrook');

  window.location.href = 'guide.html';
}

function checked(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(el => el.value);
}

// ── Init ───────────────────────────────────────────
updateProgress();
