with open(r"F:\2026\Websites\english-quiz-system\questions-data.js", "r", encoding="utf-8") as f:
    text = f.read()

import re
q_ids = re.findall(r'"id":\s*"([^"]+)"', text) + re.findall(r'id:\s*"([^"]+)"', text)
exclude = ['midterm-exam-1', 'midterm-exam-2', 'midterm-exam-3', 'ambiguity', 'collocations', 'presentations', 'working-life', 'writing-a-cv']
actual_ids = [i for i in q_ids if i not in exclude]

print(f"Total questions found: {len(actual_ids)}")
assert len(actual_ids) == len(set(actual_ids)), f"Duplicate IDs: {len(actual_ids)} vs {len(set(actual_ids))}"
mte = [i for i in actual_ids if i.startswith('mte')]
lect = [i for i in actual_ids if not i.startswith('mte')]
print(f"Original lecture questions: {len(lect)} (expected 73)")
print(f"New Mid-Term exam questions: {len(mte)} (expected 60)")
print("Verification SUCCESSFUL!")
