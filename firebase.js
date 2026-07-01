/* ══════════════════════════════════════════════════
   WAYPOST — firebase.js
   Firebase Auth + Firestore cloud sync
   Loaded before guide.js. All functions here are
   called by guide.js after the DOM is ready.
══════════════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyCEkefJKb3o1bMi_P-kK5jWkI04iWFf_MY",
  authDomain:        "waypost-community.firebaseapp.com",
  projectId:         "waypost-community",
  storageBucket:     "waypost-community.firebasestorage.app",
  messagingSenderId: "346101701382",
  appId:             "1:346101701382:web:062639564b662e1fef5c87"
};

firebase.initializeApp(FIREBASE_CONFIG);
const _auth = firebase.auth();
const _db   = firebase.firestore();

let currentUser = null;

// ── Init (called from guide.js DOMContentLoaded) ──
//    Sets up the auth state listener. By the time
//    the async callback fires, all guide.js functions
//    are guaranteed to be defined.
function initAuth() {
  _auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    updateAccountUI(user);      // defined in guide.js
    if (user) {
      try {
        await loadFromCloud();
      } catch (e) {
        console.error('Cloud load failed:', e);
        showToast('Could not reach your account — showing local data');
      }
    }
  });
}

// ── Load from Firestore ──────────────────────────
async function loadFromCloud() {
  if (!currentUser) return;

  const snap = await _db.collection('users').doc(currentUser.uid).get();
  if (!snap.exists) return; // brand-new account, nothing stored yet

  const data = snap.data();

  // Merge cloud arrays with any local-only items (dedup by id, cloud wins on conflict)
  function merge(cloud = [], local = []) {
    const cloudIds = new Set((cloud).map(i => i.id));
    return [...cloud, ...local.filter(i => !cloudIds.has(i.id))];
  }

  // Update the in-memory arrays (defined in guide.js)
  savedItems = merge(data.savedItems || [], savedItems);
  todoGroups = merge(data.todoGroups || [], todoGroups);
  contacts   = merge(data.contacts   || [], contacts);

  // Keep localStorage in sync as a local cache
  localStorage.setItem('wp_saved',    JSON.stringify(savedItems));
  localStorage.setItem('wp_todos',    JSON.stringify(todoGroups));
  localStorage.setItem('wp_contacts', JSON.stringify(contacts));

  // Keep passport data in sync (used by passport.js)
  if (data.passport)      localStorage.setItem('wp_passport',       JSON.stringify(data.passport));
  if (data.passportSaved) localStorage.setItem('wp_passport_saved', JSON.stringify(data.passportSaved));

  // Re-render all panels with the merged data (functions may not exist on passport.html — guard each)
  if (typeof renderSavedPanel    === 'function') renderSavedPanel();
  if (typeof renderTodoPanel     === 'function') renderTodoPanel();
  if (typeof renderContactsPanel === 'function') renderContactsPanel();
  if (typeof restoreCardStates   === 'function') restoreCardStates();
  if (typeof updateBadges        === 'function') updateBadges();
  // On passport.html, re-render its saved panel
  if (typeof renderPassportSavedPanel === 'function') renderPassportSavedPanel();
}

// ── Save to Firestore ────────────────────────────
//    Called from persistAll() in guide.js whenever
//    data changes and a user is signed in.
async function syncToCloud() {
  if (!currentUser) return;
  try {
    // Include passport data if it exists
    const passportData  = JSON.parse(localStorage.getItem('wp_passport')       || 'null');
    const passportSaved = JSON.parse(localStorage.getItem('wp_passport_saved') || '[]');
    await _db.collection('users').doc(currentUser.uid).set({
      savedItems,
      todoGroups,
      contacts,
      ...(passportData                 ? { passport: passportData }         : {}),
      ...(passportSaved && passportSaved.length ? { passportSaved }         : {}),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (e) {
    console.error('Sync to cloud failed:', e);
    // Fail silently — local data is safe in localStorage
  }
}

// ── Sign In ──────────────────────────────────────
async function doSignIn(email, password) {
  try {
    clearAuthError();
    setAuthLoading(true);
    await _auth.signInWithEmailAndPassword(email, password);
    // onAuthStateChanged handles the rest (loadFromCloud + updateAccountUI)
    closeAuthModal();
    showToast('Signed in ✓');
  } catch (e) {
    setAuthLoading(false);
    showAuthError(friendlyError(e.code));
  }
}

// ── Sign Up ──────────────────────────────────────
async function doSignUp(email, password) {
  try {
    clearAuthError();
    setAuthLoading(true);
    await _auth.createUserWithEmailAndPassword(email, password);
    // Upload any local data the guest had already saved
    if (savedItems.length || todoGroups.length || contacts.length) {
      await syncToCloud();
    }
    closeAuthModal();
    showToast('Account created ✓ Your data is synced.');
  } catch (e) {
    setAuthLoading(false);
    showAuthError(friendlyError(e.code));
  }
}

// ── Sign Out ─────────────────────────────────────
async function doSignOut() {
  await _auth.signOut();
  showToast('Signed out');
}

// ── Error messages ───────────────────────────────
function friendlyError(code) {
  const map = {
    'auth/invalid-email':          "That doesn't look like a valid email address.",
    'auth/user-not-found':         'No account found with that email.',
    'auth/wrong-password':         'Incorrect password — try again.',
    'auth/invalid-credential':     'Incorrect email or password — try again.',
    'auth/email-already-in-use':   'An account with that email already exists. Try signing in instead.',
    'auth/weak-password':          'Password must be at least 6 characters.',
    'auth/too-many-requests':      'Too many attempts. Wait a moment and try again.',
    'auth/network-request-failed': 'Network error — check your connection and try again.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}
