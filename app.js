/**
 * ENGLISH STUDY WEBSITE — MAIN APPLICATION LOGIC
 * High-performance, offline-first Vanilla JavaScript Quiz & Study Engine
 */

const App = (function() {
  // Storage Keys
  const STORAGE_KEY_PROGRESS = 'english_quiz_progress_v1';
  const STORAGE_KEY_LAST_LECTURE = 'english_quiz_last_lecture_v1';
  const STORAGE_KEY_EXAM_HISTORY = 'english_quiz_exam_history_v1';
  const STORAGE_KEY_THEME = 'english_quiz_theme_v1';

  // State
  let state = {
    theme: 'dark',
    currentView: 'home',
    practiceLectureId: 'all',
    practiceQuestions: [],
    practiceCurrentIndex: 0,
    practiceSelectedAnswer: null,
    practiceMatchingPairs: {}, // { leftText: rightText }
    practiceSelectedLeftMatch: null,
    practiceIsChecked: false,

    // Exam State
    examScope: 'all',
    examQuestions: [],
    examCurrentIndex: 0,
    examUserAnswers: {}, // { qId: answer }
    examMatchingPairs: {}, // { qId: { left: right } }
    examSubmitted: false,

    // Flashcard State
    flashcardLectureId: 'all',
    flashcardQuestions: [],
    flashcardIndex: 0,
    flashcardFlipped: false,

    // Quick Review State
    reviewSearchQuery: '',
    reviewLectureFilter: 'all',

    // Local Storage Loaded Data
    progress: {} // { qId: { answered: true, correct: true, selectedAnswer: any } }
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    initTheme();
    loadProgress();
    bindKeyboardEvents();
    renderHomeStats();
    renderLectureCards();
    renderMidtermCards();
    initPracticeQuestions('all');
    initFlashcardQuestions('all');
    renderQuickReview();
  }

  // ==========================================
  // THEME SWITCHER (LIGHT / DARK MODE)
  // ==========================================
  function initTheme() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      if (savedTheme) {
        state.theme = savedTheme;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        state.theme = 'light';
      }
    } catch (e) {
      state.theme = 'dark';
    }
    applyThemeUI();
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY_THEME, state.theme);
    } catch (e) {}
    applyThemeUI();
  }

  function applyThemeUI() {
    const isLight = state.theme === 'light';
    document.body.classList.toggle('light-theme', isLight);

    const btn = document.getElementById('themeToggleBtn');
    const icon = document.getElementById('themeToggleIcon');
    const label = document.getElementById('themeToggleLabel');

    if (btn) {
      btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }

    if (label) {
      label.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }

    if (icon) {
      if (isLight) {
        // Moon icon for switching back to Dark Mode
        icon.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      } else {
        // Sun icon for switching to Light Mode
        icon.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      }
    }
  }

  // ==========================================
  // LOCAL STORAGE & PROGRESS HELPERS
  // ==========================================
  function loadProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (data) {
        state.progress = JSON.parse(data);
      }
    } catch (e) {
      console.warn('Could not load progress from localStorage', e);
      state.progress = {};
    }
    updateGlobalProgressUI();
  }

  function saveQuestionProgress(qId, isCorrect, answer) {
    state.progress[qId] = {
      answered: true,
      correct: isCorrect,
      userAnswer: answer,
      timestamp: Date.now()
    };
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(state.progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage', e);
    }
    updateGlobalProgressUI();
    renderHomeStats();
    renderLectureCards();
  }

  function updateGlobalProgressUI() {
    const total = QUESTIONS_DATA.length;
    const answeredCount = Object.keys(state.progress).filter(id => state.progress[id].answered).length;
    const pct = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    const elPct = document.getElementById('headerProgressPct');
    const elBar = document.getElementById('headerProgressBar');
    const elCount = document.getElementById('headerProgressCount');

    if (elPct) elPct.textContent = pct + '%';
    if (elBar) elBar.style.width = pct + '%';
    if (elCount) elCount.textContent = `${answeredCount}/${total}`;

    // Home view stats
    const homeCount = document.getElementById('homeCompletedCount');
    const homePct = document.getElementById('homeProgressPct');
    if (homeCount) homeCount.textContent = answeredCount;
    if (homePct) homePct.textContent = pct + '%';
  }

  // ==========================================
  // NAVIGATION ROUTING
  // ==========================================
  function navigateTo(viewName) {
    state.currentView = viewName;

    // Toggle active nav buttons
    document.querySelectorAll('.nav-item button').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });

    // Toggle view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSec = document.getElementById(`view-${viewName}`);
    if (targetSec) {
      targetSec.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // View specific activations
    if (viewName === 'home') {
      renderHomeStats();
      renderLectureCards();
      renderMidtermCards();
    } else if (viewName === 'practice') {
      renderPracticeQuestion();
    } else if (viewName === 'flashcards') {
      renderFlashcard();
    } else if (viewName === 'review') {
      renderQuickReview();
    }
  }

  // ==========================================
  // HOME VIEW LOGIC
  // ==========================================
  function renderHomeStats() {
    const totalEl = document.getElementById('homeTotalQuestions');
    if (totalEl) totalEl.textContent = QUESTIONS_DATA.length;
  }

  function renderLectureCards() {
    const container = document.getElementById('lectureCardsContainer');
    if (!container) return;

    container.innerHTML = '';

    LECTURES_DATA.forEach(lecture => {
      const lectureQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lecture.id);
      const totalQ = lectureQuestions.length;
      const completedQ = lectureQuestions.filter(q => state.progress[q.id] && state.progress[q.id].answered).length;
      const pct = totalQ > 0 ? Math.round((completedQ / totalQ) * 100) : 0;
      const isComplete = pct === 100;

      const card = document.createElement('div');
      card.className = 'lecture-card';
      card.innerHTML = `
        <div class="lecture-card-top">
          <span class="lecture-badge">Lecture ${lecture.badge}</span>
          <span class="lecture-q-count">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${totalQ} Questions
          </span>
        </div>
        <h3 class="lecture-card-title">${lecture.title}</h3>
        <p class="lecture-card-desc">${lecture.shortDesc}</p>
        <div class="lecture-card-progress">
          <div class="progress-label-row">
            <span>Progress: ${completedQ}/${totalQ}</span>
            <span>${pct}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill ${isComplete ? 'complete' : ''}" style="width: ${pct}%"></div>
          </div>
        </div>
        <div class="lecture-card-actions">
          <button class="btn-card-practice" onclick="App.startPracticeLecture('${lecture.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Start Practice
          </button>
          <button class="btn-card-sub" onclick="App.startExamScope('${lecture.id}')" title="Test this lecture in Exam Mode">
            Exam
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function startPracticeAll() {
    startPracticeLecture('all');
  }

  function startPracticeLecture(lectureId) {
    state.practiceLectureId = lectureId;
    const select = document.getElementById('practiceLectureSelect');
    if (select) select.value = lectureId;

    initPracticeQuestions(lectureId);
    navigateTo('practice');
  }

  
  // ==========================================
  // MID-TERM EXAMS SECTION LOGIC (NEW)
  // ==========================================
  function renderMidtermCards() {
    const container = document.getElementById('midtermCardsContainer');
    if (!container || typeof MIDTERM_EXAMS_DATA === 'undefined') return;

    container.innerHTML = '';

    MIDTERM_EXAMS_DATA.forEach(exam => {
      const examQuestions = QUESTIONS_DATA.filter(q => q.lectureId === exam.id);
      const totalQ = examQuestions.length;
      const completedQ = examQuestions.filter(q => state.progress[q.id] && state.progress[q.id].answered).length;
      const pct = totalQ > 0 ? Math.round((completedQ / totalQ) * 100) : 0;
      const isComplete = pct === 100;

      const card = document.createElement('div');
      card.className = 'midterm-exam-card';
      card.innerHTML = `
        <div class="lecture-card-top">
          <span class="midterm-badge-tag">${exam.badge}</span>
          <span class="lecture-q-count" style="color: var(--amber-light);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${totalQ} Questions (10 T/F + 10 MCQ)
          </span>
        </div>
        <h3 class="lecture-card-title">${exam.title}</h3>
        <p class="lecture-card-desc">${exam.shortDesc}</p>
        <div class="lecture-card-progress">
          <div class="progress-label-row">
            <span>Solved: ${completedQ}/${totalQ}</span>
            <span style="color: var(--amber-light); font-weight: 600;">${pct}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill ${isComplete ? 'complete' : ''}" style="width: ${pct}%; background: linear-gradient(90deg, #F59E0B, #10B981);"></div>
          </div>
        </div>
        <div class="lecture-card-actions">
          <button class="btn-card-practice" onclick="App.startPracticeMidterm('${exam.id}')" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: var(--amber-light);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Start Practice
          </button>
          <button class="btn-card-sub" onclick="App.startExamScope('${exam.id}')" title="Take under Exam conditions">
            Exam Mode
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function startPracticeMidterm(examId) {
    state.practiceLectureId = examId;
    const select = document.getElementById('practiceLectureSelect');
    if (select) select.value = examId;

    initPracticeQuestions(examId);
    navigateTo('practice');
  }

  function scrollToMidterms() {
    navigateTo('home');
    setTimeout(() => {
      const el = document.getElementById('midtermSection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.style.boxShadow = '0 0 35px rgba(245, 158, 11, 0.4)';
        setTimeout(() => { el.style.boxShadow = ''; }, 1800);
      }
    }, 120);
  }

// ==========================================
  // PRACTICE MODE LOGIC
  // ==========================================
  function initPracticeQuestions(lectureId) {
    if (lectureId === 'all') {
      state.practiceQuestions = QUESTIONS_DATA.filter(q => !q.lectureId.startsWith('midterm-exam-'));
    } else if (lectureId === 'midterm-all') {
      state.practiceQuestions = QUESTIONS_DATA.filter(q => q.lectureId.startsWith('midterm-exam-'));
    } else {
      state.practiceQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lectureId);
    }
    state.practiceCurrentIndex = 0;
    state.practiceSelectedAnswer = null;
    state.practiceMatchingPairs = {};
    state.practiceSelectedLeftMatch = null;
    state.practiceIsChecked = false;
  }

  function changePracticeLecture(lectureId) {
    initPracticeQuestions(lectureId);
    renderPracticeQuestion();
  }

  function resetCurrentLecturePractice() {
    const lectureId = state.practiceLectureId;
    const questionsToReset = lectureId === 'all' 
      ? QUESTIONS_DATA 
      : QUESTIONS_DATA.filter(q => q.lectureId === lectureId);

    questionsToReset.forEach(q => {
      delete state.progress[q.id];
    });

    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(state.progress));
    } catch (e) {}

    updateGlobalProgressUI();
    renderPracticeQuestion();
  }

  function renderPracticeQuestion() {
    const q = state.practiceQuestions[state.practiceCurrentIndex];
    if (!q) return;

    // Reset temporary states for current question
    state.practiceSelectedAnswer = null;
    state.practiceMatchingPairs = {};
    state.practiceSelectedLeftMatch = null;
    state.practiceIsChecked = false;

    // Check if previously answered
    const prevAnswer = state.progress[q.id];

    // Meta Pills
    const lectureBreadcrumb = document.getElementById('practiceCurrentLectureBreadcrumb');
    const pillLecture = document.getElementById('practicePillLecture');
    const pillSlide = document.getElementById('practicePillSlide');
    const pillType = document.getElementById('practicePillType');
    const counter = document.getElementById('practiceQCounter');

    if (lectureBreadcrumb) lectureBreadcrumb.textContent = q.lectureTitle;
    if (pillLecture) pillLecture.textContent = q.lectureTitle;
    if (pillSlide) pillSlide.textContent = q.slide;
    if (pillType) pillType.textContent = formatQuestionType(q.type);
    if (counter) counter.textContent = `Question ${state.practiceCurrentIndex + 1} of ${state.practiceQuestions.length}`;

    // Prompt Text
    const qText = document.getElementById('practiceQuestionText');
    if (qText) qText.textContent = q.question;

    // Buttons
    const btnPrev = document.getElementById('practiceBtnPrev');
    const btnNext = document.getElementById('practiceBtnNext');
    if (btnPrev) btnPrev.disabled = state.practiceCurrentIndex === 0;
    if (btnNext) btnNext.disabled = state.practiceCurrentIndex === state.practiceQuestions.length - 1;

    // Feedback Banner Reset
    const feedbackBanner = document.getElementById('practiceFeedbackBanner');
    if (feedbackBanner) feedbackBanner.className = 'feedback-banner';

    // Interactive Area
    const container = document.getElementById('practiceInteractiveArea');
    if (!container) return;
    container.innerHTML = '';

    // Render by type
    if (q.type === 'multiple-choice' || q.type === 'choose' || q.type === 'true-false') {
      renderOptionsInput(container, q, prevAnswer);
    } else if (q.type === 'text-correction') {
      renderTextCorrectionInput(container, q, prevAnswer);
    } else if (q.type === 'matching') {
      renderMatchingInput(container, q, prevAnswer);
    } else if (q.type === 'open-response') {
      renderOpenResponseInput(container, q, prevAnswer);
    }

    // Check Answer Button Status
    const btnCheck = document.getElementById('practiceBtnCheck');
    if (btnCheck) {
      btnCheck.disabled = false;
      btnCheck.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Check Answer
      `;
    }

    // If already answered previously, reveal state
    if (prevAnswer && prevAnswer.answered) {
      showPracticeFeedback(prevAnswer.correct, q, prevAnswer.userAnswer);
    }
  }

  function formatQuestionType(type) {
    switch(type) {
      case 'multiple-choice': return 'Multiple Choice';
      case 'choose': return 'Choose the Correct Answer';
      case 'true-false': return 'True / False';
      case 'text-correction': return 'Sentence Correction / Fill-in';
      case 'matching': return 'Matching Collocations / Sections';
      case 'open-response': return 'Open Question / Reflection';
      default: return 'Question';
    }
  }

  // --- Render Options (MCQ, Choose, T/F) ---
  function renderOptionsInput(container, q, prevAnswer) {
    const list = document.createElement('div');
    list.className = (q.type === 'true-false' || (q.options && q.options.length === 2)) 
      ? 'dual-choice-grid' 
      : 'options-list';

    const keys = ['1', '2', '3', '4', '5', '6', '7', '8'];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('data-option', opt);

      const isPrevSelected = prevAnswer && prevAnswer.userAnswer === opt;
      if (isPrevSelected) {
        btn.classList.add('selected');
        state.practiceSelectedAnswer = opt;
      }

      btn.innerHTML = `
        <span class="option-key-badge">${keys[idx] || (idx + 1)}</span>
        <span>${escapeHtml(opt)}</span>
      `;

      btn.onclick = () => {
        if (state.practiceIsChecked) return;
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.practiceSelectedAnswer = opt;
      };

      list.appendChild(btn);
    });

    container.appendChild(list);
  }

  // --- Render Text Correction / Fill-in ---
  function renderTextCorrectionInput(container, q, prevAnswer) {
    const wrap = document.createElement('div');
    wrap.className = 'text-input-wrap';
    
    const val = prevAnswer ? prevAnswer.userAnswer : '';
    wrap.innerHTML = `
      <label class="text-input-label">Type the corrected phrase or missing part below:</label>
      <input type="text" id="practiceTextInput" class="text-answer-input" placeholder="Enter your correction here..." value="${escapeHtml(val || '')}" autocomplete="off">
    `;

    container.appendChild(wrap);

    const input = wrap.querySelector('#practiceTextInput');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        practiceCheckAnswer();
      }
    });

    // Auto focus
    setTimeout(() => input.focus(), 100);
  }

  // --- Render Matching Input ---
  function renderMatchingInput(container, q, prevAnswer) {
    const matchingWrap = document.createElement('div');
    matchingWrap.innerHTML = `
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
        Click an item from the <strong>left column</strong>, then click its corresponding match on the <strong>right column</strong>.
      </p>
      <div class="matching-container">
        <div class="matching-column">
          <h4>Items / Left Part</h4>
          <div class="matching-list" id="matchLeftList"></div>
        </div>
        <div class="matching-column">
          <h4>Matches / Right Part</h4>
          <div class="matching-list" id="matchRightList"></div>
        </div>
      </div>
      <div class="paired-list-summary">
        <h5>Current Paired Matches:</h5>
        <div class="pair-chips" id="matchPairChips">
          <span style="font-size: 0.8rem; color: var(--text-muted);">No pairs made yet. Click items above to connect.</span>
        </div>
      </div>
    `;

    container.appendChild(matchingWrap);

    const leftList = matchingWrap.querySelector('#matchLeftList');
    const rightList = matchingWrap.querySelector('#matchRightList');

    // Extract pairs
    const pairs = q.pairs || [];
    const leftItems = pairs.map(p => p.left);
    // Shuffle right items to create genuine matching challenge
    const rightItems = [...pairs.map(p => p.right)].sort(() => 0.5 - Math.random());

    // Restore previous pairs if answered
    if (prevAnswer && prevAnswer.userAnswer && typeof prevAnswer.userAnswer === 'object') {
      state.practiceMatchingPairs = { ...prevAnswer.userAnswer };
    }

    // Render Left Column
    leftItems.forEach(leftText => {
      const item = document.createElement('div');
      item.className = 'match-item';
      item.setAttribute('data-left', leftText);
      item.innerHTML = `<span>${escapeHtml(leftText)}</span>`;

      item.onclick = () => {
        if (state.practiceIsChecked) return;
        document.querySelectorAll('#matchLeftList .match-item').forEach(el => el.classList.remove('active-left'));
        item.classList.add('active-left');
        state.practiceSelectedLeftMatch = leftText;
      };

      leftList.appendChild(item);
    });

    // Render Right Column
    rightItems.forEach(rightText => {
      const item = document.createElement('div');
      item.className = 'match-item';
      item.setAttribute('data-right', rightText);
      item.innerHTML = `<span>${escapeHtml(rightText)}</span>`;

      item.onclick = () => {
        if (state.practiceIsChecked) return;
        if (!state.practiceSelectedLeftMatch) {
          alert('Please click an item on the left first!');
          return;
        }

        // Pair left and right
        state.practiceMatchingPairs[state.practiceSelectedLeftMatch] = rightText;
        state.practiceSelectedLeftMatch = null;
        document.querySelectorAll('#matchLeftList .match-item').forEach(el => el.classList.remove('active-left'));
        
        updateMatchingDisplay(q);
      };

      rightList.appendChild(item);
    });

    updateMatchingDisplay(q);
  }

  function updateMatchingDisplay(q) {
    const chipsContainer = document.getElementById('matchPairChips');
    if (!chipsContainer) return;

    chipsContainer.innerHTML = '';
    const keys = Object.keys(state.practiceMatchingPairs);

    if (keys.length === 0) {
      chipsContainer.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-muted);">No pairs made yet. Click items above to connect.</span>';
    } else {
      keys.forEach(left => {
        const right = state.practiceMatchingPairs[left];
        const chip = document.createElement('span');
        chip.className = 'pair-chip';
        chip.innerHTML = `
          <strong>${escapeHtml(left)}</strong> ➔ ${escapeHtml(right)}
          <button type="button" onclick="App.removeMatchPair('${escapeAttr(left)}')">&times;</button>
        `;
        chipsContainer.appendChild(chip);
      });
    }

    // Highlight paired items in columns
    document.querySelectorAll('#matchLeftList .match-item').forEach(el => {
      const val = el.getAttribute('data-left');
      el.classList.toggle('paired', !!state.practiceMatchingPairs[val]);
    });
  }

  function removeMatchPair(left) {
    if (state.practiceIsChecked) return;
    delete state.practiceMatchingPairs[left];
    const q = state.practiceQuestions[state.practiceCurrentIndex];
    updateMatchingDisplay(q);
  }

  // --- Render Open Response (Self Review) ---
  function renderOpenResponseInput(container, q, prevAnswer) {
    const box = document.createElement('div');
    box.className = 'open-response-box';
    const val = prevAnswer ? prevAnswer.userAnswer : '';
    box.innerHTML = `
      <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 0.6rem;">
        Type your response or reflections below:
      </label>
      <textarea id="practiceOpenInput" placeholder="Write your thoughts or interpretation here...">${escapeHtml(val || '')}</textarea>
    `;
    container.appendChild(box);
  }

  // --- Check Practice Answer ---
  function practiceCheckAnswer() {
    const q = state.practiceQuestions[state.practiceCurrentIndex];
    if (!q) return;

    let userAnswer = null;
    let isCorrect = false;

    if (q.type === 'multiple-choice' || q.type === 'choose' || q.type === 'true-false') {
      userAnswer = state.practiceSelectedAnswer;
      if (!userAnswer) {
        alert('Please select an option before checking.');
        return;
      }

      // Check against correctAnswer
      isCorrect = (userAnswer === q.correctAnswer);
      if (!isCorrect && q.acceptedAnswers) {
        isCorrect = q.acceptedAnswers.includes(userAnswer);
      }
    } 
    else if (q.type === 'text-correction') {
      const input = document.getElementById('practiceTextInput');
      userAnswer = input ? input.value.trim() : '';
      if (!userAnswer) {
        alert('Please type an answer first.');
        return;
      }

      // Exact case-insensitive comparison
      const normalizedUser = userAnswer.toLowerCase().trim();
      const normalizedCorrect = (q.correctAnswer || '').toLowerCase().trim();
      const normalizedAccepted = (q.acceptedAnswers || []).map(a => a.toLowerCase().trim());

      isCorrect = (normalizedUser === normalizedCorrect) || normalizedAccepted.includes(normalizedUser);
    } 
    else if (q.type === 'matching') {
      userAnswer = { ...state.practiceMatchingPairs };
      const pairs = q.pairs || [];
      if (Object.keys(userAnswer).length === 0) {
        alert('Please make at least one match connection before checking.');
        return;
      }

      // Compare pair by pair
      let correctMatches = 0;
      pairs.forEach(p => {
        if (userAnswer[p.left] === p.right) {
          correctMatches++;
        }
      });

      isCorrect = (correctMatches === pairs.length);
    } 
    else if (q.type === 'open-response') {
      const textarea = document.getElementById('practiceOpenInput');
      userAnswer = textarea ? textarea.value.trim() : '';
      // Self review: if slide has answer, marked correct upon checking, otherwise marked info
      isCorrect = q.hasVerifiedAnswer;
    }

    state.practiceIsChecked = true;
    saveQuestionProgress(q.id, isCorrect, userAnswer);
    showPracticeFeedback(isCorrect, q, userAnswer);
  }

  function showPracticeFeedback(isCorrect, q, userAnswer) {
    const banner = document.getElementById('practiceFeedbackBanner');
    const title = document.getElementById('practiceFeedbackTitle');
    const body = document.getElementById('practiceFeedbackBody');
    const explanation = document.getElementById('practiceFeedbackExplanation');

    if (!banner || !title || !body) return;

    banner.classList.remove('correct', 'incorrect', 'info', 'show');

    if (q.type === 'open-response') {
      if (!q.hasVerifiedAnswer) {
        banner.classList.add('info', 'show');
        title.innerHTML = 'ℹ️ Note from Lecture Slides';
        body.innerHTML = `<strong>${escapeHtml(q.explanation || 'The slide poses the question but does not provide an answer.')}</strong>`;
        if (explanation) explanation.innerHTML = 'This question is preserved for self-study and class discussion.';
      } else {
        banner.classList.add('correct', 'show');
        title.innerHTML = '✓ Slide Interpretation / Answer Key';
        body.innerHTML = `<strong>Official Slide Answer:</strong>\n${escapeHtml(q.correctAnswer)}`;
        if (explanation) explanation.innerHTML = q.explanation ? escapeHtml(q.explanation) : '';
      }
    } 
    else if (isCorrect) {
      banner.classList.add('correct', 'show');
      title.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Correct!
      `;
      body.innerHTML = `Verified Answer: <strong>${escapeHtml(q.correctAnswer)}</strong>`;
      if (explanation) {
        explanation.innerHTML = q.explanation ? `<strong>Slide Note:</strong> ${escapeHtml(q.explanation)}` : '';
      }
    } 
    else {
      banner.classList.add('incorrect', 'show');
      title.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        Not quite
      `;
      body.innerHTML = `Correct Answer: <strong>${escapeHtml(q.correctAnswer)}</strong>`;
      if (explanation) {
        explanation.innerHTML = q.explanation ? `<strong>Slide Note:</strong> ${escapeHtml(q.explanation)}` : '';
      }
    }

    // Highlight options visually for MCQs
    if (q.options) {
      document.querySelectorAll('.option-btn').forEach(btn => {
        const opt = btn.getAttribute('data-option');
        if (opt === q.correctAnswer) {
          btn.classList.add('correct-highlight');
        } else if (opt === userAnswer && !isCorrect) {
          btn.classList.add('incorrect-highlight');
        }
      });
    }
  }

  function practiceNext() {
    if (state.practiceCurrentIndex < state.practiceQuestions.length - 1) {
      state.practiceCurrentIndex++;
      renderPracticeQuestion();
    }
  }

  function practicePrev() {
    if (state.practiceCurrentIndex > 0) {
      state.practiceCurrentIndex--;
      renderPracticeQuestion();
    }
  }

  // ==========================================
  // EXAM MODE LOGIC
  // ==========================================
  function selectExamScope(scope, cardElement) {
    state.examScope = scope;
    document.querySelectorAll('.exam-option-card').forEach(c => c.classList.remove('selected'));
    if (cardElement) cardElement.classList.add('selected');
  }

  function startExamScope(scope) {
    state.examScope = scope;
    navigateTo('exam');
    startExam();
  }

  function startExam() {
    if (state.examScope === 'all') {
      state.examQuestions = QUESTIONS_DATA.filter(q => !q.lectureId.startsWith('midterm-exam-'));
    } else if (state.examScope === 'midterm-all') {
      state.examQuestions = QUESTIONS_DATA.filter(q => q.lectureId.startsWith('midterm-exam-'));
    } else {
      state.examQuestions = QUESTIONS_DATA.filter(q => q.lectureId === state.examScope);
    }

    state.examCurrentIndex = 0;
    state.examUserAnswers = {};
    state.examMatchingPairs = {};
    state.examSubmitted = false;

    document.getElementById('examSetupView').style.display = 'none';
    document.getElementById('examResultsView').style.display = 'none';
    document.getElementById('examActiveView').style.display = 'block';

    renderExamPalette();
    renderExamQuestion();
  }

  function renderExamPalette() {
    const grid = document.getElementById('examPaletteGrid');
    if (!grid) return;
    grid.innerHTML = '';

    state.examQuestions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = 'palette-btn';
      btn.textContent = idx + 1;
      btn.id = `palette-btn-${idx}`;

      if (state.examUserAnswers[q.id]) {
        btn.classList.add('answered');
      }

      btn.onclick = () => {
        state.examCurrentIndex = idx;
        renderExamQuestion();
      };

      grid.appendChild(btn);
    });

    updateExamPaletteStatus();
  }

  function updateExamPaletteStatus() {
    const answeredCount = Object.keys(state.examUserAnswers).length;
    const progressText = document.getElementById('examPaletteProgress');
    if (progressText) {
      progressText.textContent = `${answeredCount} of ${state.examQuestions.length} Answered`;
    }
  }

  function renderExamQuestion() {
    const q = state.examQuestions[state.examCurrentIndex];
    if (!q) return;

    // Palette active state
    document.querySelectorAll('.palette-btn').forEach((b, idx) => {
      b.classList.toggle('active', idx === state.examCurrentIndex);
      const isAns = !!state.examUserAnswers[state.examQuestions[idx].id];
      b.classList.toggle('answered', isAns);
    });

    // Meta
    document.getElementById('examPillLecture').textContent = q.lectureTitle;
    document.getElementById('examPillSlide').textContent = q.slide;
    document.getElementById('examQCounter').textContent = `Question ${state.examCurrentIndex + 1} of ${state.examQuestions.length}`;
    document.getElementById('examQuestionText').textContent = q.question;

    const btnPrev = document.getElementById('examBtnPrev');
    const btnNext = document.getElementById('examBtnNext');
    if (btnPrev) btnPrev.disabled = state.examCurrentIndex === 0;
    if (btnNext) btnNext.disabled = state.examCurrentIndex === state.examQuestions.length - 1;

    // Render interactive input
    const container = document.getElementById('examInteractiveArea');
    container.innerHTML = '';

    const currentAnswer = state.examUserAnswers[q.id];

    if (q.type === 'multiple-choice' || q.type === 'choose' || q.type === 'true-false') {
      const list = document.createElement('div');
      list.className = (q.type === 'true-false' || (q.options && q.options.length === 2)) 
        ? 'dual-choice-grid' 
        : 'options-list';

      const keys = ['1', '2', '3', '4', '5', '6', '7', '8'];

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (currentAnswer === opt) btn.classList.add('selected');

        btn.innerHTML = `
          <span class="option-key-badge">${keys[idx] || (idx + 1)}</span>
          <span>${escapeHtml(opt)}</span>
        `;

        btn.onclick = () => {
          document.querySelectorAll('#examInteractiveArea .option-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          state.examUserAnswers[q.id] = opt;
          updateExamPaletteStatus();
          const pBtn = document.getElementById(`palette-btn-${state.examCurrentIndex}`);
          if (pBtn) pBtn.classList.add('answered');
        };

        list.appendChild(btn);
      });
      container.appendChild(list);
    } 
    else if (q.type === 'text-correction') {
      const wrap = document.createElement('div');
      wrap.className = 'text-input-wrap';
      wrap.innerHTML = `
        <label class="text-input-label">Type your correction / missing phrase:</label>
        <input type="text" id="examTextInput" class="text-answer-input" placeholder="Type answer here..." value="${escapeHtml(currentAnswer || '')}">
      `;
      container.appendChild(wrap);

      const input = wrap.querySelector('#examTextInput');
      input.addEventListener('input', (e) => {
        state.examUserAnswers[q.id] = e.target.value.trim();
        updateExamPaletteStatus();
        const pBtn = document.getElementById(`palette-btn-${state.examCurrentIndex}`);
        if (pBtn) pBtn.classList.toggle('answered', !!e.target.value.trim());
      });
    }
    else if (q.type === 'matching') {
      const pairs = q.pairs || [];
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Select the matching pair for each item:
        </p>
      `;

      const rightOptions = pairs.map(p => p.right);
      const matchGrid = document.createElement('div');
      matchGrid.style.display = 'flex';
      matchGrid.style.flexDirection = 'column';
      matchGrid.style.gap = '0.75rem';

      const userPairs = state.examMatchingPairs[q.id] || {};

      pairs.forEach(p => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';
        row.style.padding = '0.75rem 1rem';
        row.style.background = 'rgba(18, 27, 46, 0.65)';
        row.style.borderRadius = '8px';
        row.style.border = '1px solid var(--border-subtle)';
        row.style.gap = '1rem';

        const leftSpan = document.createElement('span');
        leftSpan.style.fontWeight = '600';
        leftSpan.textContent = p.left;

        const select = document.createElement('select');
        select.className = 'select-custom';
        select.style.flex = '1';
        select.innerHTML = `<option value="">-- Select match --</option>` + 
          rightOptions.map(r => `<option value="${escapeAttr(r)}" ${userPairs[p.left] === r ? 'selected' : ''}>${escapeHtml(r)}</option>`).join('');

        select.onchange = (e) => {
          userPairs[p.left] = e.target.value;
          state.examMatchingPairs[q.id] = userPairs;
          state.examUserAnswers[q.id] = userPairs;
          updateExamPaletteStatus();
          const pBtn = document.getElementById(`palette-btn-${state.examCurrentIndex}`);
          if (pBtn) pBtn.classList.add('answered');
        };

        row.appendChild(leftSpan);
        row.appendChild(select);
        matchGrid.appendChild(row);
      });

      wrap.appendChild(matchGrid);
      container.appendChild(wrap);
    }
    else if (q.type === 'open-response') {
      const box = document.createElement('div');
      box.className = 'open-response-box';
      box.innerHTML = `
        <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 0.6rem;">
          Open response / notes:
        </label>
        <textarea id="examOpenInput" placeholder="Enter your response...">${escapeHtml(currentAnswer || '')}</textarea>
      `;
      container.appendChild(box);

      const textarea = box.querySelector('#examOpenInput');
      textarea.addEventListener('input', (e) => {
        state.examUserAnswers[q.id] = e.target.value.trim();
        updateExamPaletteStatus();
        const pBtn = document.getElementById(`palette-btn-${state.examCurrentIndex}`);
        if (pBtn) pBtn.classList.toggle('answered', !!e.target.value.trim());
      });
    }
  }

  function examNext() {
    if (state.examCurrentIndex < state.examQuestions.length - 1) {
      state.examCurrentIndex++;
      renderExamQuestion();
    }
  }

  function examPrev() {
    if (state.examCurrentIndex > 0) {
      state.examCurrentIndex--;
      renderExamQuestion();
    }
  }

  function exitExamEarly() {
    if (confirm('Are you sure you want to exit the exam? Your current progress will be lost.')) {
      document.getElementById('examActiveView').style.display = 'none';
      document.getElementById('examSetupView').style.display = 'block';
    }
  }

  function confirmSubmitExam() {
    const total = state.examQuestions.length;
    const answeredCount = Object.keys(state.examUserAnswers).length;
    const unanswered = total - answeredCount;

    let msg = `Ready to submit your exam?\n\nQuestions Answered: ${answeredCount} / ${total}`;
    if (unanswered > 0) {
      msg += `\nWarning: You have ${unanswered} unanswered question(s)!`;
    }

    if (confirm(msg)) {
      processExamResults();
    }
  }

  function processExamResults() {
    state.examSubmitted = true;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const reviewItems = [];

    state.examQuestions.forEach(q => {
      const userAns = state.examUserAnswers[q.id];
      let isCorrect = false;

      if (!userAns) {
        unansweredCount++;
      } else if (q.type === 'multiple-choice' || q.type === 'choose' || q.type === 'true-false') {
        isCorrect = (userAns === q.correctAnswer);
        if (!isCorrect && q.acceptedAnswers) {
          isCorrect = q.acceptedAnswers.includes(userAns);
        }
        if (isCorrect) correctCount++; else incorrectCount++;
      } else if (q.type === 'text-correction') {
        const normUser = (userAns || '').toLowerCase().trim();
        const normCorrect = (q.correctAnswer || '').toLowerCase().trim();
        const normAccepted = (q.acceptedAnswers || []).map(a => a.toLowerCase().trim());
        isCorrect = (normUser === normCorrect) || normAccepted.includes(normUser);
        if (isCorrect) correctCount++; else incorrectCount++;
      } else if (q.type === 'matching') {
        const pairs = q.pairs || [];
        let matchMatches = 0;
        pairs.forEach(p => {
          if (userAns[p.left] === p.right) matchMatches++;
        });
        isCorrect = (matchMatches === pairs.length);
        if (isCorrect) correctCount++; else incorrectCount++;
      } else if (q.type === 'open-response') {
        // Open question self-review
        isCorrect = q.hasVerifiedAnswer;
        if (isCorrect) correctCount++; else unansweredCount++;
      }

      // Also persist to general progress so study history is enriched!
      saveQuestionProgress(q.id, isCorrect, userAns);

      reviewItems.push({
        question: q,
        userAnswer: userAns,
        isCorrect: isCorrect
      });
    });

    const totalGraded = correctCount + incorrectCount;
    const pct = totalGraded > 0 ? Math.round((correctCount / totalGraded) * 100) : 0;
    const passed = pct >= 60;

    // Display results screen
    document.getElementById('examActiveView').style.display = 'none';
    document.getElementById('examResultsView').style.display = 'block';

    document.getElementById('examScorePct').textContent = `${pct}%`;
    document.getElementById('examScoreGrade').textContent = passed ? 'PASSED' : 'NEEDS PRACTICE';
    document.getElementById('examScoreGrade').style.color = passed ? 'var(--emerald-primary)' : 'var(--rose-primary)';

    document.getElementById('examCountCorrect').textContent = correctCount;
    document.getElementById('examCountIncorrect').textContent = incorrectCount;
    document.getElementById('examCountUnanswered').textContent = unansweredCount;

    // Render review list
    const reviewContainer = document.getElementById('examReviewListContainer');
    reviewContainer.innerHTML = '';

    reviewItems.forEach((item, idx) => {
      const q = item.question;
      const card = document.createElement('div');
      card.className = 'review-card-item';
      
      let badgeHtml = '';
      if (item.isCorrect) {
        badgeHtml = '<span class="pill-slide" style="background: var(--emerald-bg); color: var(--emerald-primary); border-color: var(--emerald-border);">✓ Correct</span>';
      } else if (!item.userAnswer) {
        badgeHtml = '<span class="pill-type">Unanswered</span>';
      } else {
        badgeHtml = '<span class="pill-slide" style="background: var(--rose-bg); color: var(--rose-primary); border-color: var(--rose-border);">✗ Incorrect</span>';
      }

      let userAnsDisplay = '';
      if (!item.userAnswer) {
        userAnsDisplay = '<em style="color: var(--text-muted);">No answer provided</em>';
      } else if (typeof item.userAnswer === 'object') {
        userAnsDisplay = Object.entries(item.userAnswer).map(([k, v]) => `${k} ➔ ${v}`).join(', ');
      } else {
        userAnsDisplay = escapeHtml(item.userAnswer);
      }

      card.innerHTML = `
        <div class="review-card-top">
          <div style="display:flex; gap: 0.5rem; align-items:center;">
            <span class="pill-lecture">${q.lectureTitle}</span>
            <span class="pill-slide">${q.slide}</span>
          </div>
          ${badgeHtml}
        </div>
        <div class="review-card-question">Q${idx + 1}: ${escapeHtml(q.question)}</div>
        <div style="font-size: 0.88rem; margin-bottom: 0.5rem; color: var(--text-secondary);">
          Your Answer: <strong>${userAnsDisplay}</strong>
        </div>
        <div class="review-card-answer-box ${!q.hasVerifiedAnswer ? 'unverified' : ''}">
          <strong>Slide Key:</strong> ${escapeHtml(q.correctAnswer || q.explanation || 'No verified answer in slide')}
          ${q.explanation && q.explanation !== q.correctAnswer ? `<div style="font-size: 0.82rem; margin-top: 0.35rem; color: var(--text-secondary);">${escapeHtml(q.explanation)}</div>` : ''}
        </div>
      `;
      reviewContainer.appendChild(card);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // FLASHCARD MODE LOGIC
  // ==========================================
  function initFlashcardQuestions(lectureId) {
    state.flashcardLectureId = lectureId;
    if (lectureId === 'all') {
      state.flashcardQuestions = QUESTIONS_DATA.filter(q => !q.lectureId.startsWith('midterm-exam-'));
    } else if (lectureId === 'midterm-all') {
      state.flashcardQuestions = QUESTIONS_DATA.filter(q => q.lectureId.startsWith('midterm-exam-'));
    } else {
      state.flashcardQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lectureId);
    }
    state.flashcardIndex = 0;
    state.flashcardFlipped = false;
  }

  function changeFlashcardLecture(lectureId) {
    initFlashcardQuestions(lectureId);
    renderFlashcard();
  }

  function renderFlashcard() {
    const q = state.flashcardQuestions[state.flashcardIndex];
    if (!q) return;

    state.flashcardFlipped = false;
    const card = document.getElementById('flashcardElement');
    if (card) card.classList.remove('flipped');

    document.getElementById('flashcardPillLecture').textContent = q.lectureTitle;
    document.getElementById('flashcardPillSlide').textContent = q.slide;
    document.getElementById('flashcardCounter').textContent = `Card ${state.flashcardIndex + 1} of ${state.flashcardQuestions.length}`;
    document.getElementById('flashcardFrontText').textContent = q.question;

    const backText = q.correctAnswer || q.explanation || 'Unanswered in slides';
    document.getElementById('flashcardBackText').textContent = backText;

    const explEl = document.getElementById('flashcardBackExplanation');
    if (explEl) {
      if (q.explanation && q.explanation !== q.correctAnswer) {
        explEl.textContent = `Slide note: ${q.explanation}`;
      } else {
        explEl.textContent = '';
      }
    }
  }

  function flipFlashcard() {
    state.flashcardFlipped = !state.flashcardFlipped;
    const card = document.getElementById('flashcardElement');
    if (card) {
      card.classList.toggle('flipped', state.flashcardFlipped);
    }
  }

  function flashcardNext() {
    if (state.flashcardIndex < state.flashcardQuestions.length - 1) {
      state.flashcardIndex++;
    } else {
      state.flashcardIndex = 0; // wrap around
    }
    renderFlashcard();
  }

  function flashcardPrev() {
    if (state.flashcardIndex > 0) {
      state.flashcardIndex--;
    } else {
      state.flashcardIndex = state.flashcardQuestions.length - 1; // wrap around
    }
    renderFlashcard();
  }

  // ==========================================
  // QUICK REVIEW VIEW LOGIC
  // ==========================================
  function onReviewSearch(query) {
    state.reviewSearchQuery = query.toLowerCase().trim();
    renderQuickReview();
  }

  function setReviewLectureFilter(filter, btn) {
    state.reviewLectureFilter = filter;
    document.querySelectorAll('#reviewLectureFilters .chip-btn').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderQuickReview();
  }

  function renderQuickReview() {
    const container = document.getElementById('reviewQuestionsList');
    if (!container) return;

    let filtered = QUESTIONS_DATA;

    // Filter by lecture
    if (state.reviewLectureFilter !== 'all') {
      if (state.reviewLectureFilter === 'midterm-all') {
        filtered = filtered.filter(q => q.lectureId.startsWith('midterm-exam-'));
      } else {
        filtered = filtered.filter(q => q.lectureId === state.reviewLectureFilter);
      }
    }

    // Filter by search query
    if (state.reviewSearchQuery) {
      filtered = filtered.filter(q => {
        const matchQ = q.question.toLowerCase().includes(state.reviewSearchQuery);
        const matchAns = (q.correctAnswer || '').toLowerCase().includes(state.reviewSearchQuery);
        const matchExpl = (q.explanation || '').toLowerCase().includes(state.reviewSearchQuery);
        const matchSlide = (q.slide || '').toLowerCase().includes(state.reviewSearchQuery);
        return matchQ || matchAns || matchExpl || matchSlide;
      });
    }

    const countStatus = document.getElementById('reviewCountStatus');
    if (countStatus) {
      countStatus.textContent = `Showing ${filtered.length} of ${QUESTIONS_DATA.length} questions`;
    }

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No matching questions found.</p>
          <p style="font-size: 0.85rem;">Try adjusting your keyword or switching the lecture filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'review-card-item';

      const hasAnswer = q.hasVerifiedAnswer;
      const displayAnswer = q.correctAnswer || q.explanation || 'Unanswered in slides';

      card.innerHTML = `
        <div class="review-card-top">
          <div style="display:flex; gap: 0.5rem; align-items:center; flex-wrap: wrap;">
            <span class="pill-lecture">${q.lectureTitle}</span>
            <span class="pill-slide">${q.slide}</span>
            <span class="pill-type">${formatQuestionType(q.type)}</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">ID: ${q.id}</span>
        </div>
        <div class="review-card-question">${escapeHtml(q.question)}</div>
        <div class="review-card-answer-box ${!hasAnswer ? 'unverified' : ''}">
          <strong>${hasAnswer ? 'Verified Answer:' : 'Slide Status:'}</strong>
          <div>${escapeHtml(displayAnswer)}</div>
          ${q.explanation && q.explanation !== q.correctAnswer ? `<div style="font-size: 0.82rem; margin-top: 0.4rem; color: var(--text-secondary);">${escapeHtml(q.explanation)}</div>` : ''}
        </div>
      `;

      container.appendChild(card);
    });
  }

  // ==========================================
  // RESET MODAL LOGIC
  // ==========================================
  function showResetModal() {
    const modal = document.getElementById('resetModal');
    if (modal) modal.classList.add('show');
  }

  function closeResetModal() {
    const modal = document.getElementById('resetModal');
    if (modal) modal.classList.remove('show');
  }

  function confirmResetAll() {
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    state.progress = {};
    closeResetModal();
    updateGlobalProgressUI();
    renderHomeStats();
    renderLectureCards();
    if (state.currentView === 'practice') {
      renderPracticeQuestion();
    }
  }

  // ==========================================
  // KEYBOARD SHORTCUTS
  // ==========================================
  function bindKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in an input or textarea
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea') {
        return;
      }

      // Close modal on Escape
      if (e.key === 'Escape') {
        closeResetModal();
        return;
      }

      // Practice Mode Shortcuts
      if (state.currentView === 'practice') {
        if (e.key === 'ArrowRight') {
          practiceNext();
        } else if (e.key === 'ArrowLeft') {
          practicePrev();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          practiceCheckAnswer();
        } else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          const options = document.querySelectorAll('#practiceInteractiveArea .option-btn');
          if (options && options[idx]) {
            options[idx].click();
          }
        }
      } 
      // Flashcard Mode Shortcuts
      else if (state.currentView === 'flashcards') {
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          flipFlashcard();
        } else if (e.key === 'ArrowRight') {
          flashcardNext();
        } else if (e.key === 'ArrowLeft') {
          flashcardPrev();
        }
      }
      // Exam Mode Shortcuts
      else if (state.currentView === 'exam' && document.getElementById('examActiveView').style.display !== 'none') {
        if (e.key === 'ArrowRight') {
          examNext();
        } else if (e.key === 'ArrowLeft') {
          examPrev();
        } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          const options = document.querySelectorAll('#examInteractiveArea .option-btn');
          if (options && options[idx]) {
            options[idx].click();
          }
        }
      }
    });
  }

  // ==========================================
  // UTILITY HELPERS
  // ==========================================
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str) {
    if (!str) return '';
    return String(str).replace(/"/g, '&quot;');
  }

  // Public API
  return {
    init,
    toggleTheme,
    navigateTo,
    startPracticeAll,
    startPracticeLecture,
    startPracticeMidterm,
    scrollToMidterms,
    changePracticeLecture,
    resetCurrentLecturePractice,
    practiceNext,
    practicePrev,
    practiceCheckAnswer,
    removeMatchPair,

    // Exam
    selectExamScope,
    startExamScope,
    startExam,
    examNext,
    examPrev,
    confirmSubmitExam,
    exitExamEarly,

    // Flashcards
    changeFlashcardLecture,
    flipFlashcard,
    flashcardNext,
    flashcardPrev,

    // Quick Review
    onReviewSearch,
    setReviewLectureFilter,

    // Modal
    showResetModal,
    closeResetModal,
    confirmResetAll
  };
})();

// Bootstrap on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
