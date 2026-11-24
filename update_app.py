with open(r"F:\2026\Websites\english-quiz-system\app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

# 1. Update init() to include renderMidtermCards()
old_init_call = "renderLectureCards();"
new_init_call = "renderLectureCards();\n    renderMidtermCards();"
if "renderMidtermCards();" not in app_js:
    app_js = app_js.replace(old_init_call, new_init_call, 1)

# 2. Update navigateTo('home') to include renderMidtermCards()
old_nav_home = "renderHomeStats();\n      renderLectureCards();"
new_nav_home = "renderHomeStats();\n      renderLectureCards();\n      renderMidtermCards();"
if "renderMidtermCards();" not in app_js[app_js.find("if (viewName === 'home')"):]:
    app_js = app_js.replace(old_nav_home, new_nav_home, 1)

# 3. Add renderMidtermCards, startPracticeMidterm, scrollToMidterms
midterm_functions = """
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
"""

if "function renderMidtermCards()" not in app_js:
    # insert before PRACTICE MODE LOGIC
    prac_idx = app_js.find("// ==========================================\n  // PRACTICE MODE LOGIC")
    if prac_idx != -1:
        app_js = app_js[:prac_idx] + midterm_functions + "\n" + app_js[prac_idx:]

# 4. Update initPracticeQuestions to handle midterm-all
old_init_prac = """  function initPracticeQuestions(lectureId) {
    if (lectureId === 'all') {
      state.practiceQuestions = [...QUESTIONS_DATA];
    } else {
      state.practiceQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lectureId);
    }"""

new_init_prac = """  function initPracticeQuestions(lectureId) {
    if (lectureId === 'all') {
      state.practiceQuestions = QUESTIONS_DATA.filter(q => !q.lectureId.startsWith('midterm-exam-'));
    } else if (lectureId === 'midterm-all') {
      state.practiceQuestions = QUESTIONS_DATA.filter(q => q.lectureId.startsWith('midterm-exam-'));
    } else {
      state.practiceQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lectureId);
    }"""

app_js = app_js.replace(old_init_prac, new_init_prac, 1)

# 5. Update startExam() to handle midterm-all
old_start_exam = """    if (state.examScope === 'all') {
      state.examQuestions = [...QUESTIONS_DATA];
    } else {
      state.examQuestions = QUESTIONS_DATA.filter(q => q.lectureId === state.examScope);
    }"""

new_start_exam = """    if (state.examScope === 'all') {
      state.examQuestions = QUESTIONS_DATA.filter(q => !q.lectureId.startsWith('midterm-exam-'));
    } else if (state.examScope === 'midterm-all') {
      state.examQuestions = QUESTIONS_DATA.filter(q => q.lectureId.startsWith('midterm-exam-'));
    } else {
      state.examQuestions = QUESTIONS_DATA.filter(q => q.lectureId === state.examScope);
    }"""

app_js = app_js.replace(old_start_exam, new_start_exam, 1)

# 6. Update initFlashcardQuestions
old_flash = """    if (lectureId === 'all') {
      state.flashcardQuestions = [...QUESTIONS_DATA];
    } else {
      state.flashcardQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lectureId);
    }"""

new_flash = """    if (lectureId === 'all') {
      state.flashcardQuestions = QUESTIONS_DATA.filter(q => !q.lectureId.startsWith('midterm-exam-'));
    } else if (lectureId === 'midterm-all') {
      state.flashcardQuestions = QUESTIONS_DATA.filter(q => q.lectureId.startsWith('midterm-exam-'));
    } else {
      state.flashcardQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lectureId);
    }"""

app_js = app_js.replace(old_flash, new_flash, 1)

# 7. Update renderQuickReview filter
old_review_filt = """    if (state.reviewLectureFilter !== 'all') {
      filtered = filtered.filter(q => q.lectureId === state.reviewLectureFilter);
    }"""

new_review_filt = """    if (state.reviewLectureFilter !== 'all') {
      if (state.reviewLectureFilter === 'midterm-all') {
        filtered = filtered.filter(q => q.lectureId.startsWith('midterm-exam-'));
      } else {
        filtered = filtered.filter(q => q.lectureId === state.reviewLectureFilter);
      }
    }"""

app_js = app_js.replace(old_review_filt, new_review_filt, 1)

# 8. Expose new functions in public API
old_api = """    startPracticeAll,
    startPracticeLecture,"""

new_api = """    startPracticeAll,
    startPracticeLecture,
    startPracticeMidterm,
    scrollToMidterms,"""

app_js = app_js.replace(old_api, new_api, 1)

with open(r"F:\2026\Websites\english-quiz-system\app.js", "w", encoding="utf-8") as f:
    f.write(app_js)

print("app.js updated successfully with full Mid-Term functionality!")
