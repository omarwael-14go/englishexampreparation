import re

with open(r'C:\Users\Omar\.gemini\antigravity\scratch\english-quiz-system\questions-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

lectures = re.findall(r'id:\s*"([^"]+)",\s*order:', content)
questions = re.findall(r'id:\s*"([^"]+)",\s*lectureId:\s*"([^"]+)"', content)

print(f"Total lectures: {len(lectures)}")
for l in lectures:
    count = sum(1 for q in questions if q[1] == l)
    print(f"  Lecture '{l}': {count} questions")

print(f"Total questions: {len(questions)}")
ids = [q[0] for q in questions]
assert len(ids) == len(set(ids)), f"Duplicate question IDs: {len(ids)} vs {len(set(ids))}"
print("All question IDs are strictly unique!")
