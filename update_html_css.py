import re

# ==========================================
# 1. UPDATE styles.css
# ==========================================
with open(r"F:\2026\Websites\english-quiz-system\styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

midterm_css = """
/* ==========================================================================
   NEW: MID-TERM EXAMS SECTION STYLES
   ========================================================================== */
.new-midterm-section {
  background: linear-gradient(145deg, rgba(17, 26, 46, 0.92), rgba(12, 19, 34, 0.82));
  border: 1.5px solid rgba(245, 158, 11, 0.38);
  border-radius: var(--radius-xl);
  padding: 1.8rem 1.6rem;
  margin-bottom: 2.8rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(245, 158, 11, 0.1);
}

.new-midterm-section::after {
  content: "";
  position: absolute;
  top: -80px;
  right: -80px;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.badge-new-pulse {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F59E0B, #EF4444);
  color: #FFFFFF;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.55);
  animation: pulseNewBadge 2s infinite ease-in-out;
  text-transform: uppercase;
}

@keyframes pulseNewBadge {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
  }
  50% {
    transform: scale(1.08);
    box-shadow: 0 0 22px rgba(245, 158, 11, 0.75);
  }
}

.midterm-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.4rem;
}

.midterm-exam-card {
  background: var(--bg-card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(245, 158, 11, 0.28);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.midterm-exam-card:hover {
  transform: translateY(-4px);
  border-color: var(--amber-light);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 158, 11, 0.2);
}

.midterm-badge-tag {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--amber-dim);
  color: var(--amber-light);
  border: 1px solid var(--amber-border);
}

body.light-theme .new-midterm-section {
  background: linear-gradient(145deg, #FFFBEB, #FFFFFF);
  border-color: rgba(245, 158, 11, 0.45);
  box-shadow: 0 10px 30px rgba(245, 158, 11, 0.08);
}

body.light-theme .midterm-exam-card {
  background: #FFFFFF;
  border-color: rgba(245, 158, 11, 0.3);
}

body.light-theme .midterm-exam-card:hover {
  background: #FFFDF7;
  border-color: var(--amber-primary);
}
"""

if ".new-midterm-section" not in css_content:
    with open(r"F:\2026\Websites\english-quiz-system\styles.css", "a", encoding="utf-8") as f:
        f.write("\n" + midterm_css + "\n")
    print("styles.css updated with midterm styles!")
else:
    print("styles.css already contains midterm styles.")

# ==========================================
# 2. UPDATE index.html
# ==========================================
with open(r"F:\2026\Websites\english-quiz-system\index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Add Mid-Term link to nav if not present
if "App.scrollToMidterms()" not in html_content:
    nav_old = '<li class="nav-item"><button data-view="review" onclick="App.navigateTo(\'review\')">Quick Review</button></li>'
    nav_new = nav_old + '\n          <li class="nav-item"><button onclick="App.scrollToMidterms()" style="color:var(--amber-light);">Mid-Terms <span class="badge-new-pulse" style="font-size:0.6rem; padding:0.1rem 0.4rem; margin-left:0.25rem;">NEW</span></button></li>'
    html_content = html_content.replace(nav_old, nav_new, 1)

# Add Mid-Term Section on Home Page
if 'id="midtermSection"' not in html_content:
    midterm_sec_html = """
      <!-- ==========================================
           NEW: MID-TERM EXAMS SECTION (OFFICIAL 2026)
           ========================================== -->
      <section class="new-midterm-section" id="midtermSection">
        <div class="section-header-row" style="margin-bottom: 1.4rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="display:flex; align-items:center; gap: 0.65rem; margin-bottom: 0.4rem;">
              <span class="badge-new-pulse">NEW</span>
              <h2 style="font-size: 1.6rem; font-weight: 800; color: #FFFFFF; display: inline-flex; align-items: center; gap: 0.5rem;">
                Mid-Term Exam Collection
              </h2>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">
              Three official 1-hour Mid-Term exams (Exam 1, Exam 2, Exam 3) • 60 questions with verified answer keys (True/False &amp; MCQs).
            </p>
          </div>
          <div>
            <button class="btn-primary" onclick="App.startPracticeMidterm('midterm-all')" style="background: linear-gradient(135deg, #F59E0B, #D97706); box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Practice All Mid-Terms (60 Qs)
            </button>
          </div>
        </div>

        <div class="midterm-cards-grid" id="midtermCardsContainer">
          <!-- Rendered dynamically by JS -->
        </div>
      </section>

      <!-- Lectures Grid -->"""
    html_content = html_content.replace('<!-- Lectures Grid -->', midterm_sec_html, 1)

# Update practice select dropdown options
select_old = """          <select id="practiceLectureSelect" class="select-custom" onchange="App.changePracticeLecture(this.value)">
            <option value="all">Practice All Lectures (73 Questions)</option>
            <option value="ambiguity">01. Ambiguity (16 Questions)</option>
            <option value="collocations">02. Collocations (12 Questions)</option>
            <option value="presentations">03. Presentations (22 Questions)</option>
            <option value="working-life">04. Working Life (11 Questions)</option>
            <option value="writing-a-cv">05. Writing a CV (12 Questions)</option>
          </select>"""

select_new = """          <select id="practiceLectureSelect" class="select-custom" onchange="App.changePracticeLecture(this.value)">
            <optgroup label="⭐ Mid-Term Exams (NEW)">
              <option value="midterm-all">All Mid-Term Exams (60 Questions)</option>
              <option value="midterm-exam-1">Mid-Term Exam 1 (20 Questions)</option>
              <option value="midterm-exam-2">Mid-Term Exam 2 (20 Questions)</option>
              <option value="midterm-exam-3">Mid-Term Exam 3 (20 Questions)</option>
            </optgroup>
            <optgroup label="📚 Course Lectures">
              <option value="all">Practice All Lectures (73 Questions)</option>
              <option value="ambiguity">01. Ambiguity (16 Questions)</option>
              <option value="collocations">02. Collocations (12 Questions)</option>
              <option value="presentations">03. Presentations (22 Questions)</option>
              <option value="working-life">04. Working Life (11 Questions)</option>
              <option value="writing-a-cv">05. Writing a CV (12 Questions)</option>
            </optgroup>
          </select>"""

if select_old in html_content:
    html_content = html_content.replace(select_old, select_new, 1)

# Update Exam Mode Scope Options in index.html
exam_opts_old = """          <div class="exam-option-card selected" data-scope="all" onclick="App.selectExamScope('all', this)">
            <h4 style="margin-bottom: 0.3rem;">Full Course Exam</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted);">All 5 lectures & 73 questions</p>
          </div>"""

exam_opts_new = """          <div class="exam-option-card selected" data-scope="all" onclick="App.selectExamScope('all', this)">
            <h4 style="margin-bottom: 0.3rem;">Full Course Exam</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted);">All 5 lectures & 73 questions</p>
          </div>
          <div class="exam-option-card" data-scope="midterm-all" onclick="App.selectExamScope('midterm-all', this)" style="border-color: rgba(245, 158, 11, 0.4);">
            <h4 style="margin-bottom: 0.3rem; color: var(--amber-light);">⭐ All Mid-Terms [NEW]</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted);">All 3 Exams & 60 questions</p>
          </div>
          <div class="exam-option-card" data-scope="midterm-exam-1" onclick="App.selectExamScope('midterm-exam-1', this)">
            <h4 style="margin-bottom: 0.3rem;">Mid-Term Exam 1</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted);">20 questions (10 T/F + 10 MCQ)</p>
          </div>
          <div class="exam-option-card" data-scope="midterm-exam-2" onclick="App.selectExamScope('midterm-exam-2', this)">
            <h4 style="margin-bottom: 0.3rem;">Mid-Term Exam 2</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted);">20 questions (10 T/F + 10 MCQ)</p>
          </div>
          <div class="exam-option-card" data-scope="midterm-exam-3" onclick="App.selectExamScope('midterm-exam-3', this)">
            <h4 style="margin-bottom: 0.3rem;">Mid-Term Exam 3</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted);">20 questions (10 T/F + 10 MCQ)</p>
          </div>"""

if exam_opts_old in html_content and 'data-scope="midterm-all"' not in html_content:
    html_content = html_content.replace(exam_opts_old, exam_opts_new, 1)

# Update Flashcard select options
flash_select_old = """            <select id="flashcardLectureSelect" class="select-custom" onchange="App.changeFlashcardLecture(this.value)">
              <option value="all">All Lectures (73 Cards)</option>"""

flash_select_new = """            <select id="flashcardLectureSelect" class="select-custom" onchange="App.changeFlashcardLecture(this.value)">
              <option value="all">All Course Lectures (73 Cards)</option>
              <option value="midterm-all">⭐ All Mid-Term Exams (60 Cards)</option>
              <option value="midterm-exam-1">Mid-Term Exam 1 (20 Cards)</option>
              <option value="midterm-exam-2">Mid-Term Exam 2 (20 Cards)</option>
              <option value="midterm-exam-3">Mid-Term Exam 3 (20 Cards)</option>"""

if flash_select_old in html_content:
    html_content = html_content.replace(flash_select_old, flash_select_new, 1)

# Update Quick Review chips
chips_old = """          <button class="chip-btn" data-filter="writing-a-cv" onclick="App.setReviewLectureFilter('writing-a-cv', this)">05. Writing a CV</button>
        </div>"""

chips_new = """          <button class="chip-btn" data-filter="writing-a-cv" onclick="App.setReviewLectureFilter('writing-a-cv', this)">05. Writing a CV</button>
          <button class="chip-btn" data-filter="midterm-all" onclick="App.setReviewLectureFilter('midterm-all', this)" style="border-color: rgba(245, 158, 11, 0.4); color: var(--amber-light);">⭐ All Mid-Terms</button>
          <button class="chip-btn" data-filter="midterm-exam-1" onclick="App.setReviewLectureFilter('midterm-exam-1', this)">Mid-Term 1</button>
          <button class="chip-btn" data-filter="midterm-exam-2" onclick="App.setReviewLectureFilter('midterm-exam-2', this)">Mid-Term 2</button>
          <button class="chip-btn" data-filter="midterm-exam-3" onclick="App.setReviewLectureFilter('midterm-exam-3', this)">Mid-Term 3</button>
        </div>"""

if chips_old in html_content and 'data-filter="midterm-all"' not in html_content:
    html_content = html_content.replace(chips_old, chips_new, 1)

with open(r"F:\2026\Websites\english-quiz-system\index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("index.html updated successfully!")
