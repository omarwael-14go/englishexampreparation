import re
import json

with open(r'C:\Users\Omar\.gemini\antigravity\scratch\english-quiz-system\questions-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Verify no duplicate IDs
ids = re.findall(r'id:\s*"([^"]+)"', text)
# Exclude lecture IDs: ambiguity, collocations, presentations, working-life, writing-a-cv
q_ids = [i for i in ids if i not in ['ambiguity', 'collocations', 'presentations', 'working-life', 'writing-a-cv']]
print(f"Total Question IDs: {len(q_ids)}")
assert len(q_ids) == len(set(q_ids)), f"Duplicate question IDs found! {len(q_ids)} vs {len(set(q_ids))}"

# Check question types distribution
types = re.findall(r'type:\s*"([^"]+)"', text)
print(f"Question Types distribution:")
for t in set(types):
    print(f"  {t}: {types.count(t)}")

# Check hasVerifiedAnswer distribution
verified = re.findall(r'hasVerifiedAnswer:\s*(true|false)', text)
print(f"hasVerifiedAnswer distribution: True={verified.count('true')}, False={verified.count('false')}")

print("\n--- All checks passed successfully! ---")
