import json

exams_config = [
    {
        "id": "midterm-exam-1",
        "title": "Mid-Term Exam 1",
        "badge": "Exam 1",
        "shortDesc": "Official Mid-Term Exam 1 (Time: 1 hour) • 10 True/False & 10 MCQs with verified answer key.",
        "icon": "file-check",
        "questions_a": [
            ("1. The collocation \"Catch up\" means to get back to the original schedule.", "True"),
            ("2. Syntactic ambiguity occurs when one word has multiple meanings.", "False"),
            ("3. The adjective \"Worthwhile\" means a good thing to do.", "True"),
            ("4. The cultural expectations of the audience are of no particular interest to the speaker.", "False"),
            ("5. Machine learning includes many techniques such as user interaction and context analysis.", "True"),
            ("6. The word \"Actually\" is used as a polite way to contradict someone, and it means at the moment or right now.", "False"),
            ("7. It is advisable to answer the questions of the audience in a presentation.", "True"),
            ("8. Covering letter is used in the UK, while cover letter is used in the USA.", "True"),
            ("9. If you learn many collocations, your English will sound more unusual and unnatural.", "False"),
            ("10. A company may recruit employees directly by using the services of recruitment agencies.", "True"),
        ],
        "questions_b": [
            ("1. He had to ........... the lesson the hard way.", ["a. do", "b. teach", "c. learn", "d. study"], "c. learn"),
            ("2. Concerning your voice in a presentation, you should speak in ...........", ["a. the same tone", "b. a monotone", "c. formal tone", "d. natural tone"], "d. natural tone"),
            ("3. I think that ........... everything ........... our mid-range model.", ["a. covers – on", "b. covers up – up", "c. covers on – up", "d. covers – to"], "a. covers – on"),
            ("4. Humans use ........... and context to understand ambiguous sentences.", ["a. AI", "b. Common sense", "c. Machine learning", "d. None"], "b. Common sense"),
            ("5. When \"She\" has more than one reference, it is ........... ambiguity.", ["a. Syntactic", "b. Lexical", "c. Referential", "d. Both a & b"], "c. Referential"),
            ("6. An astronaut's job is highly ..........., it needs all his effort and attention.", ["a. Challenging", "b. Demanding", "c. Stressful", "d. All"], "b. Demanding"),
            ("7. \"I need the mouse urgently.\" By human common sense, the word mouse in this sentence means ...........", ["a. the opening in the face", "b. electronic device", "c. rat", "d. Both a & b"], "b. electronic device"),
            ("8. Our team is working overtime to ........... the project's deadline.", ["a. meet", "b. miss", "c. extend", "d. make"], "a. meet"),
            ("9. .......... means makes us feel worried and anxious.", ["a. Routine", "b. Depressing", "c. Stressful", "d. Demanding"], "c. Stressful"),
            ("10. When preparing for a presentation you should not ...........", ["a. Wait for latecomers", "b. Labor", "c. Digress", "d. All"], "d. All"),
        ]
    },
    {
        "id": "midterm-exam-2",
        "title": "Mid-Term Exam 2",
        "badge": "Exam 2",
        "shortDesc": "Official Mid-Term Exam 2 (Time: 1 hour) • 10 True/False & 10 MCQs with verified answer key.",
        "icon": "file-check",
        "questions_a": [
            ("1. Ambiguity means that a word, phrase, or sentence has more than one meaning.", "True"),
            ("2. \"Bank\" (financial institution / side of a river) is an example of lexical ambiguity.", "True"),
            ("3. \"Visiting relatives can be annoying\" is an example of referential ambiguity.", "False"),
            ("4. AI can learn the intended meaning by asking the user for clarification.", "True"),
            ("5. Collocations follow strict grammar rules that explain why certain words go together.", "False"),
            ("6. Collocations are still understood even when they are used in a wrong combination.", "True"),
            ("7. In a presentation, you should always wait for latecomers before you start.", "False"),
            ("8. Telling an anecdote or mentioning a surprising statistic can gain the audience's attention.", "True"),
            ("9. In the UK, it is necessary to include a photograph in your CV.", "False"),
            ("10. In a CV, the most recent job or qualification should come first.", "True"),
        ],
        "questions_b": [
            ("1. \"Mary told Alice that she won the prize.\" This sentence has ........... ambiguity.", ["a. Lexical", "b. Syntactic", "c. Referential", "d. None"], "c. Referential"),
            ("2. Which is a very common collocation?", ["a. fast food", "b. quick food", "c. rapid food", "d. swift food"], "a. fast food"),
            ("3. Finish ........... schedule = finish before the planned date.", ["a. behind", "b. ahead of", "c. on with", "d. within"], "b. ahead of"),
            ("4. Fall ........... schedule = make slow progress.", ["a. within", "b. ahead of", "c. on", "d. behind"], "d. behind"),
            ("5. Egyptians like ........... tea with sugar.", ["a. strong", "b. heavy", "c. big", "d. hard"], "a. strong"),
            ("6. If a speaker talks in a monotone, the audience will most likely ...........", ["a. enjoy the talk", "b. be bored", "c. gain more energy", "d. ask more questions"], "b. be bored"),
            ("7. \"I'm digressing\" means that the speaker is ...........", ["a. ending the presentation", "b. repeating the same point", "c. talking about things unrelated to the subject", "d. asking a question"], "c. talking about things unrelated to the subject"),
            ("8. \"Available upon request\" usually appears in the ........... section of a CV.", ["a. Objective", "b. Education", "c. Personal information", "d. References"], "d. References"),
            ("9. Stay ........... budget = spend the right amount of money.", ["a. behind", "b. up", "c. within", "d. on with"], "c. within"),
            ("10. \"Of course, related ........... product specifications is the issue of performance.\"", ["a. with", "b. to", "c. for", "d. of"], "b. to"),
        ]
    },
    {
        "id": "midterm-exam-3",
        "title": "Mid-Term Exam 3",
        "badge": "Exam 3",
        "shortDesc": "Official Mid-Term Exam 3 (Time: 1 hour) • 10 True/False & 10 MCQs with verified answer key.",
        "icon": "file-check",
        "questions_a": [
            ("1. Referential ambiguity occurs when a pronoun has an unclear reference.", "True"),
            ("2. Machine learning can decode ambiguity without any context or user interaction.", "False"),
            ("3. \"Strictly forbidden\" is a correct collocation.", "True"),
            ("4. \"Quick\" and \"fast\" can always replace each other in any collocation.", "False"),
            ("5. It is a good idea to have different CVs for different types of jobs.", "True"),
            ("6. Running over time looks good because it shows you have a lot to say.", "False"),
            ("7. When using a microphone, you should not hold it too close to your mouth.", "True"),
            ("8. A CV should include every summer or part-time job, even if it is irrelevant.", "False"),
            ("9. The word \"light\" can mean both the opposite of heavy and the opposite of dark.", "True"),
            ("10. \"Pitch black\" is a collocation that means very dark.", "True"),
        ],
        "questions_b": [
            ("1. \"Old men and women are happy.\" This sentence has ........... ambiguity.", ["a. Referential", "b. Lexical", "c. Syntactic", "d. None"], "c. Syntactic"),
            ("2. AI examines the surrounding text to understand the meaning of \"bank\". This technique is called ...........", ["a. user interaction", "b. cyber security", "c. plagiarism detecting", "d. context analysis"], "d. context analysis"),
            ("3. User: \"Where can I buy a bat?\" AI: \"Do you mean the animal or the sports tool?\" This is an example of ...........", ["a. user interaction", "b. context analysis", "c. common sense", "d. None"], "a. user interaction"),
            ("4. ........... tasks = give people different responsibilities.", ["a. meet", "b. get", "c. catch", "d. delegate"], "d. delegate"),
            ("5. ........... the deadline = finish on time.", ["a. meet", "b. fall", "c. stay", "d. get"], "a. meet"),
            ("6. Don't ........... a particular point, i.e. don't spend too long on it.", ["a. project", "b. vary", "c. labor", "d. check"], "c. labor"),
            ("7. \"Project your voice\" means ...........", ["a. shout", "b. speak loudly enough to be heard at the back without shouting", "c. whisper", "d. speak on the same level all the time"], "b. speak loudly enough to be heard at the back without shouting"),
            ("8. \"Time is moving on, so let's ........... the third area.\"", ["a. turn up", "b. turn to", "c. turning", "d. turn on"], "b. turn to"),
            ("9. Languages spoken, computer skills, and a driving licence belong in the ........... section of a CV.", ["a. Objective", "b. References", "c. Additional personal skills", "d. Education"], "c. Additional personal skills"),
            ("10. \"Experienced and ambitious business professional seeking a challenging new role\" is the ........... of a CV.", ["a. References", "b. Education", "c. Work experience", "d. Objective"], "d. Objective"),
        ]
    }
]

generated_questions = []

for ex_idx, ex in enumerate(exams_config, 1):
    ex_id = ex["id"]
    ex_title = ex["title"]
    
    # Section A
    for q_idx, (q_text, ans) in enumerate(ex["questions_a"], 1):
        q_obj = {
            "id": f"mte{ex_idx}-a-{q_idx:02d}",
            "lectureId": ex_id,
            "lectureTitle": ex_title,
            "slide": f"{ex_title} — Part A: True/False",
            "type": "true-false",
            "question": q_text,
            "options": ["True", "False"],
            "correctAnswer": ans,
            "explanation": f"Verified Answer Key: {ans}",
            "hasVerifiedAnswer": True
        }
        generated_questions.append(q_obj)
        
    # Section B
    for q_idx, (q_text, opts, ans) in enumerate(ex["questions_b"], 1):
        q_obj = {
            "id": f"mte{ex_idx}-b-{q_idx:02d}",
            "lectureId": ex_id,
            "lectureTitle": ex_title,
            "slide": f"{ex_title} — Part B: MCQ",
            "type": "multiple-choice",
            "question": q_text,
            "options": opts,
            "correctAnswer": ans,
            "explanation": f"Verified Answer Key: {ans}",
            "hasVerifiedAnswer": True
        }
        generated_questions.append(q_obj)

print(f"Generated {len(generated_questions)} midterm questions.")

with open(r"F:\2026\Websites\english-quiz-system\midterm_generated.json", "w", encoding="utf-8") as f:
    json.dump({
        "exams": [
            {
                "id": ex["id"],
                "title": ex["title"],
                "badge": ex["badge"],
                "shortDesc": ex["shortDesc"],
                "icon": ex["icon"],
                "questionCount": 20
            }
            for ex in exams_config
        ],
        "questions": generated_questions
    }, f, indent=2, ensure_ascii=False)

print("Saved to midterm_generated.json")
