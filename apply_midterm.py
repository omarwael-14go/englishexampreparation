import json

# Read generated midterm data
with open(r"F:\2026\Websites\english-quiz-system\midterm_generated.json", "r", encoding="utf-8") as f:
    midterm_data = json.load(f)

# Read current questions-data.js
with open(r"F:\2026\Websites\english-quiz-system\questions-data.js", "r", encoding="utf-8") as f:
    orig_content = f.read()

# Check if already added
if "MIDTERM_EXAMS_DATA" in orig_content:
    print("Already added to questions-data.js")
    exit(0)

# Format JS for MIDTERM_EXAMS_DATA
exams_js = "const MIDTERM_EXAMS_DATA = " + json.dumps(midterm_data["exams"], indent=2, ensure_ascii=False) + ";\n\n"

# Format JS for MIDTERM_QUESTIONS_DATA
questions_js = "const MIDTERM_QUESTIONS_DATA = " + json.dumps(midterm_data["questions"], indent=2, ensure_ascii=False) + ";\n\n"

# Find insertion before module.exports
insert_idx = orig_content.rfind("if (typeof module !== 'undefined'")
if insert_idx == -1:
    insert_idx = len(orig_content)

# We can also append MIDTERM_QUESTIONS_DATA to QUESTIONS_DATA so all questions are registered
combine_js = """
// Append Mid-Term Questions to the master question bank
MIDTERM_QUESTIONS_DATA.forEach(q => QUESTIONS_DATA.push(q));
"""

new_content = orig_content[:insert_idx] + "\n// ==========================================\n// NEW: MID-TERM EXAMS DATA (60 QUESTIONS)\n// ==========================================\n" + exams_js + questions_js + combine_js + "\n" + orig_content[insert_idx:]

with open(r"F:\2026\Websites\english-quiz-system\questions-data.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully updated questions-data.js with all 60 Mid-Term questions!")
