/**
 * ENGLISH STUDY WEBSITE — QUESTION & ANSWER DATABASE
 * Extracted exclusively from:
 * 1. Questions PDF: "STUDY QUESTION COLLECTION - Collected questions from the lecture PowerPoint files"
 * 2. Answers PDF: "STUDY QUESTION COLLECTION - Answer key extracted from the original PowerPoint slides"
 *
 * Preserves original wording, order, options, and slide explanations without external inventions.
 */

const LECTURES_DATA = [
  {
    id: "ambiguity",
    order: 1,
    title: "Ambiguity",
    shortDesc: "Sentence and word ambiguity, referential ambiguity, and AI natural language processing.",
    badge: "01",
    icon: "layers"
  },
  {
    id: "collocations",
    order: 2,
    title: "Collocations",
    shortDesc: "Natural word combinations, common pairs, verb collocations, and matching exercises.",
    badge: "02",
    icon: "link-2"
  },
  {
    id: "presentations",
    order: 3,
    title: "Presentations",
    shortDesc: "Audience engagement, vocal delivery, slide transitions, timing, and error correction.",
    badge: "03",
    icon: "mic"
  },
  {
    id: "working-life",
    order: 4,
    title: "Working Life",
    shortDesc: "Vocabulary for job descriptions, workplace emotions, and matching definitions.",
    badge: "04",
    icon: "briefcase"
  },
  {
    id: "writing-a-cv",
    order: 5,
    title: "Writing a CV",
    shortDesc: "Curriculum Vitae structure, section ordering, dos and don'ts, and professional advice.",
    badge: "05",
    icon: "file-text"
  }
];

const QUESTIONS_DATA = [
  // ==========================================
  // LECTURE 01: AMBIGUITY
  // ==========================================
  {
    id: "ambiguity-01",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 8 — Choose",
    type: "multiple-choice",
    question: "1. ………… sentences have multiple meanings.",
    options: [
      "a. ambiguous",
      "b. ambivalent",
      "c. strong",
      "d. long"
    ],
    correctAnswer: "a. ambiguous",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-02",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 8 — Choose",
    type: "multiple-choice",
    question: "2. When a sentence, a word or a phrase have more than one meaning, this is called ….",
    options: [
      "a. interpretation",
      "b. ambiguity",
      "c. interaction",
      "d. understanding"
    ],
    correctAnswer: "b. ambiguity",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-03",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 8 — Choose",
    type: "multiple-choice",
    question: "3. Ambiguity occurs with …..",
    options: [
      "a. words",
      "b. sentences",
      "c. phrases",
      "d. All of the previous"
    ],
    correctAnswer: "d. All of the previous",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-04",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 9 — Choose (continued)",
    type: "multiple-choice",
    question: "4. Humans can understand the meaning of ambiguous sentences through …..",
    options: [
      "a. AI",
      "b. the sounds of letters",
      "c. the codes",
      "d. common sense"
    ],
    correctAnswer: "d. common sense",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-05",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 9 — Choose (continued)",
    type: "multiple-choice",
    question: "5. …….. and common sense help human beings to understand the intended meaning.",
    options: [
      "a. context",
      "b. contract",
      "c. reference",
      "d. All of the previous"
    ],
    correctAnswer: "a. context",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-06",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 15",
    type: "open-response",
    question: "What are the different meanings of “book” and “light”?",
    options: null,
    correctAnswer: null,
    explanation: "The slide poses the question but does not provide the answer.",
    hasVerifiedAnswer: false
  },
  {
    id: "ambiguity-07",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 16",
    type: "open-response",
    question: "e.g. “Visiting relatives can be annoying” has two different meanings. Can you guess them?",
    options: null,
    correctAnswer: "1. Relatives who visit us can be annoying.\n2. Going to relatives can be annoying.",
    explanation: "Slide answer:\n1. Relatives who visit us can be annoying.\n2. Going to relatives can be annoying.",
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-08",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 17",
    type: "open-response",
    question: "Take another example…\nOld men and women are happy",
    options: null,
    correctAnswer: null,
    explanation: "The slide shows the example without explaining its two interpretations.",
    hasVerifiedAnswer: false
  },
  {
    id: "ambiguity-09",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 18 — Referential ambiguity",
    type: "open-response",
    question: "e.g. “Mary told Alice that she won the prize.”\nWhere is the ambiguity in this sentence? i.e. Who does “she” refer to?",
    options: null,
    correctAnswer: "1. Mary won the prize.\n2. Alice won the prize.",
    explanation: "Slide answer:\n1. Mary won the prize.\n2. Alice won the prize.",
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-10",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 19",
    type: "open-response",
    question: "Take another example…\nWhen I banged my arm into the glass door, I broke it.\nWhere is the ambiguity here?",
    options: null,
    correctAnswer: null,
    explanation: "The slide asks the question but does not provide an answer.",
    hasVerifiedAnswer: false
  },
  {
    id: "ambiguity-11",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 20",
    type: "multiple-choice",
    question: "6. The different meanings “light” include the all of the following except…",
    options: [
      "a. opposite of heavy",
      "b. opposite of dark",
      "c. a device used to produce flames",
      "d. a carpet on the floor"
    ],
    correctAnswer: "d. a carpet on the floor",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-12",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 26",
    type: "multiple-choice",
    question: "1. Machine learning takes place through the interaction with …..",
    options: [
      "a. context",
      "b. human beings",
      "c. deep meanings"
    ],
    correctAnswer: "b. human beings",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-13",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 26",
    type: "multiple-choice",
    question: "2. Language ambiguity is handled by AI by ….",
    options: [
      "a. decoding the different parts of sentences.",
      "b. understanding how human brains function.",
      "c. refusing to look for the meaning."
    ],
    correctAnswer: "a. decoding the different parts of sentences.",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-14",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 27",
    type: "multiple-choice",
    question: "3. …….. and ……are among the processes which AI uses to “learn” information about an ambiguous meaning.",
    options: [
      "Plagiarism detecting and Cyber security",
      "AI and artificial intelligence",
      "Context analysis and user interaction"
    ],
    correctAnswer: "Context analysis and user interaction",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-15",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 27",
    type: "multiple-choice",
    question: "4. To understand the meaning of “bank” in “I met my friend at the bank.”, the AI examines the ……….text.",
    options: [
      "a. surrounding",
      "b. ambiguous",
      "c. clear"
    ],
    correctAnswer: "a. surrounding",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "ambiguity-16",
    lectureId: "ambiguity",
    lectureTitle: "Ambiguity",
    slide: "Slide 27",
    type: "multiple-choice",
    question: "5. The AI provides accurate results based on its …….",
    options: [
      "a. academic status",
      "b. user’s responses",
      "c. understanding"
    ],
    correctAnswer: "b. user’s responses",
    explanation: null,
    hasVerifiedAnswer: true
  },

  // ==========================================
  // LECTURE 02: COLLOCATIONS
  // ==========================================
  {
    id: "collocations-01",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 7–8 — Choose",
    type: "multiple-choice",
    question: "1. Collocations sound \"right\" to native English speakers because they………",
    options: [
      "a. sound unnatural",
      "b. are rarely used",
      "c. are often used"
    ],
    correctAnswer: "c. are often used",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-02",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 7–8 — Choose",
    type: "multiple-choice",
    question: "2. If you learn and use many collocations, your English will sound……………",
    options: [
      "a. more unusual",
      "b. more grammatical",
      "c. more natural"
    ],
    correctAnswer: "c. more natural",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-03",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 8 — Choose",
    type: "multiple-choice",
    question: "3. Which is a very common collocation?",
    options: [
      "a. quick food",
      "b. fast food",
      "c. rapid food"
    ],
    correctAnswer: "b. fast food",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-04",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 8 — Choose",
    type: "multiple-choice",
    question: "4. Complete the collocation: \"I was running late so I only had time for a _____ shower.\"",
    options: [
      "a. short",
      "b. quick",
      "c. fast"
    ],
    correctAnswer: "b. quick",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-05",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 9–10 — Choose the most appropriate answer",
    type: "choose",
    question: "1. We need to (take a break – have a break).",
    options: [
      "take a break",
      "have a break"
    ],
    correctAnswer: "take a break",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-06",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 9–10 — Choose the most appropriate answer",
    type: "choose",
    question: "2. Tell students not to (make a mess – do a mess).",
    options: [
      "make a mess",
      "do a mess"
    ],
    correctAnswer: "make a mess",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-07",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 9–10 — Choose the most appropriate answer",
    type: "choose",
    question: "3. Let’s (do an exercise – make an exercise ) on collocation.",
    options: [
      "do an exercise",
      "make an exercise"
    ],
    correctAnswer: "do an exercise",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-08",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 10 — Continued",
    type: "choose",
    question: "4. Egyptians like (heavy tea – strong tea) with sugar.",
    options: [
      "heavy tea",
      "strong tea"
    ],
    correctAnswer: "strong tea",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-09",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 10 — Continued",
    type: "choose",
    question: "5. Please leave the class (quietly- silently). Students are having an exam.",
    options: [
      "leave quietly",
      "leave silently"
    ],
    correctAnswer: "leave quietly",
    acceptedAnswers: ["leave quietly", "quietly"],
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-10",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 10 — Continued",
    type: "choose",
    question: "6. Israelis are told to (cease – stop) fire on Gaza.",
    options: [
      "cease fire",
      "stop fire"
    ],
    correctAnswer: "cease fire",
    acceptedAnswers: ["cease fire", "cease"],
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-11",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 11 — Match",
    type: "matching",
    question: "Match the words/phrases to make correct collocations.",
    pairs: [
      { left: "do", right: "the work" },
      { left: "ease", right: "the pain" },
      { left: "pitch", right: "black" },
      { left: "have", right: "access" },
      { left: "fast", right: "car" },
      { left: "strictly", right: "forbidden" },
      { left: "get", right: "in one’s way" },
      { left: "learn", right: "the hard way" }
    ],
    correctAnswer: "do the work, ease the pain, pitch black, have access, fast car, strictly forbidden, get in one’s way, learn the hard way",
    explanation: "Correct pairings from slide:\n• do the work\n• ease the pain\n• pitch black\n• have access\n• fast car\n• strictly forbidden\n• get in one’s way\n• learn the hard way",
    hasVerifiedAnswer: true
  },
  {
    id: "collocations-12",
    lectureId: "collocations",
    lectureTitle: "Collocations",
    slide: "Slide 14 — Class Activity",
    type: "open-response",
    question: "Each collocation has its definition in front of it. Use the given words to complete the missing part in each collocation:\nallocate / delegate / on with / get / within / meet / ahead of / on / up / behind",
    options: null,
    correctAnswer: null,
    explanation: "The answer key is not shown in the PowerPoint slides; this is left unanswered.",
    hasVerifiedAnswer: false
  },

  // ==========================================
  // LECTURE 03: PRESENTATIONS
  // ==========================================
  {
    id: "presentations-01",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 4–5 — Exercise A",
    type: "multiple-choice",
    question: "Exercise A - Match Melanie's thought (1) to the presenter advice:\n1-Why is he yelling like that? The room's not that big!",
    options: [
      "A — Start on time. Don't wait for latecomers",
      "C — Don't labor a particular point.",
      "D — Don't digress, unless you have a particular purpose in mind",
      "E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
      "F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
      "G — Use a microphone if you need one. Don't hold it too close to your mouth.",
      "H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice."
    ],
    correctAnswer: "F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
    explanation: "Answer: F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-02",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 4–5 — Exercise A",
    type: "multiple-choice",
    question: "Exercise A - Match Melanie's thought (2) to the presenter advice:\n2-He's already said that three times",
    options: [
      "A — Start on time. Don't wait for latecomers",
      "C — Don't labor a particular point.",
      "D — Don't digress, unless you have a particular purpose in mind",
      "E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
      "F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
      "G — Use a microphone if you need one. Don't hold it too close to your mouth.",
      "H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice."
    ],
    correctAnswer: "C — Don't labor a particular point.",
    explanation: "Answer: C — Don't labor a particular point.",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-03",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 4–5 — Exercise A",
    type: "multiple-choice",
    question: "Exercise A - Match Melanie's thought (3) to the presenter advice:\n3-I know there are people who want to ask questions, and there won't be time",
    options: [
      "A — Start on time. Don't wait for latecomers",
      "C — Don't labor a particular point.",
      "D — Don't digress, unless you have a particular purpose in mind",
      "E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
      "F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
      "G — Use a microphone if you need one. Don't hold it too close to your mouth.",
      "H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice."
    ],
    correctAnswer: "E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
    explanation: "Answer: E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-04",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 4–5 — Exercise A",
    type: "multiple-choice",
    question: "Exercise A - Match Melanie's thought (4) to the presenter advice:\n4-He's really droning on: there's no life in his voice and everyone's asleep",
    options: [
      "A — Start on time. Don't wait for latecomers",
      "C — Don't labor a particular point.",
      "D — Don't digress, unless you have a particular purpose in mind",
      "E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
      "F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
      "G — Use a microphone if you need one. Don't hold it too close to your mouth.",
      "H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice."
    ],
    correctAnswer: "H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice.",
    explanation: "Answer: H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice.",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-05",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 4–5 — Exercise A",
    type: "multiple-choice",
    question: "Exercise A - Match Melanie's thought (5) to the presenter advice:\n5-The sound of his breath in the microphone is really annoying",
    options: [
      "A — Start on time. Don't wait for latecomers",
      "C — Don't labor a particular point.",
      "D — Don't digress, unless you have a particular purpose in mind",
      "E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
      "F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
      "G — Use a microphone if you need one. Don't hold it too close to your mouth.",
      "H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice."
    ],
    correctAnswer: "G — Use a microphone if you need one. Don't hold it too close to your mouth.",
    explanation: "Answer: G — Use a microphone if you need one. Don't hold it too close to your mouth.",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-06",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 4–5 — Exercise A",
    type: "multiple-choice",
    question: "Exercise A - Match Melanie's thought (6) to the presenter advice:\n6-I don't see what this has got to do with what he's trying to say",
    options: [
      "A — Start on time. Don't wait for latecomers",
      "C — Don't labor a particular point.",
      "D — Don't digress, unless you have a particular purpose in mind",
      "E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
      "F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
      "G — Use a microphone if you need one. Don't hold it too close to your mouth.",
      "H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice."
    ],
    correctAnswer: "D — Don't digress, unless you have a particular purpose in mind",
    explanation: "Answer: D — Don't digress, unless you have a particular purpose in mind",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-07",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 4–5 — Exercise A",
    type: "multiple-choice",
    question: "Exercise A - Match Melanie's thought (7) to the presenter advice:\n7-Get on with it! If people turn up late, that's their problem",
    options: [
      "A — Start on time. Don't wait for latecomers",
      "C — Don't labor a particular point.",
      "D — Don't digress, unless you have a particular purpose in mind",
      "E — Finish on time. Don't run over. It looks bad if you don't have time to finish all your points and answer questions.",
      "F — Project your voice to the back of the room, but don't shout. Don't ask if people at the back can hear. Check the volume of your voice beforehand.",
      "G — Use a microphone if you need one. Don't hold it too close to your mouth.",
      "H — Speak in a natural tone of voice. Don't speak in a monotone. Vary the pitch of your voice."
    ],
    correctAnswer: "A — Start on time. Don't wait for latecomers",
    explanation: "Answer: A — Start on time. Don't wait for latecomers",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-08",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 8–9 — Exercise B",
    type: "text-correction",
    question: "Exercise B - Correct the mistake in this sentence:\n1-Ok. For begin, let we look for the most basic product in our range.",
    options: null,
    correctAnswer: "Ok to begin, let's look at",
    acceptedAnswers: [
      "Ok to begin, let's look at",
      "Ok to begin let's look at",
      "to begin, let's look at",
      "to begin let's look at"
    ],
    explanation: "Answer from slide: Ok to begin, let's look at",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-09",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 8–9 — Exercise B",
    type: "text-correction",
    question: "Exercise B - Correct the mistake in this sentence:\n2-Of course, related with product specifications of our basic model is the issue of product performance.",
    options: null,
    correctAnswer: "related to",
    acceptedAnswers: [
      "related to"
    ],
    explanation: "Answer from slide: related to",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-10",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 8–9 — Exercise B",
    type: "text-correction",
    question: "Exercise B - Correct the mistake in this sentence:\n3-But I'm a digression : let's get back on the product specifications themselves.",
    options: null,
    correctAnswer: "I am digressing; let's get back to",
    acceptedAnswers: [
      "I am digressing; let's get back to",
      "I am digressing, let's get back to",
      "I'm digressing; let's get back to",
      "I'm digressing, let's get back to"
    ],
    explanation: "Answer from slide: I am digressing; let's get back to",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-11",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 8–9 — Exercise B",
    type: "text-correction",
    question: "Exercise B - Correct the mistake in this sentence:\n4-That's all I'm having time for on product specifications. Let's moving on to our mid-range model.",
    options: null,
    correctAnswer: "That's all I have time for, so let's move on",
    acceptedAnswers: [
      "That's all I have time for, so let's move on",
      "That's all I have time for so let's move on",
      "have time for, so let's move on"
    ],
    explanation: "Answer from slide: That's all I have time for, so let's move on",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-12",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 8–9 — Exercise B",
    type: "text-correction",
    question: "Exercise B - Correct the mistake in this sentence:\n5- As you can be seeing on this transparency, there are two features I want to talk about in relative to our mid-range model.",
    options: null,
    correctAnswer: "As you can see — in relation to",
    acceptedAnswers: [
      "As you can see — in relation to",
      "As you can see - in relation to",
      "As you can see, in relation to",
      "As you can see in relation to"
    ],
    explanation: "Answer from slide: As you can see — in relation to",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-13",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 8–9 — Exercise B",
    type: "text-correction",
    question: "Exercise B - Correct the mistake in this sentence:\n6-I think that covers up everything on our mid-range model.",
    options: null,
    correctAnswer: "covers everything on",
    acceptedAnswers: [
      "covers everything on",
      "covers everything"
    ],
    explanation: "Answer from slide: covers everything on",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-14",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 8–9 — Exercise B",
    type: "text-correction",
    question: "Exercise B - Correct the mistake in this sentence:\n7- Time is moved on, so let's turn up to our top-of-the-range product.",
    options: null,
    correctAnswer: "Time is moving on, so let's turn to",
    acceptedAnswers: [
      "Time is moving on, so let's turn to",
      "Time is moving on so let's turn to",
      "moving on, so let's turn to"
    ],
    explanation: "Answer from slide: Time is moving on, so let's turn to",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-15",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 10–11 — Exercise C",
    type: "choose",
    question: "1. Waiting for latecomers (shows respect to the audience – wastes the time of your presentation)",
    options: [
      "shows respect to the audience",
      "wastes the time of your presentation"
    ],
    correctAnswer: "wastes the time of your presentation",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-16",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 10–11 — Exercise C",
    type: "choose",
    question: "2. Timing your presentation is (not important – in favor of your presentation)",
    options: [
      "not important",
      "in favor of your presentation"
    ],
    correctAnswer: "in favor of your presentation",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-17",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 10–11 — Exercise C",
    type: "choose",
    question: "3. Don't labor or digress in your presentation; otherwise, you'll (lose the audience's attention – need to explain some ideas)",
    options: [
      "lose the audience's attention",
      "need to explain some ideas"
    ],
    correctAnswer: "lose the audience's attention",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-18",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 10–11 — Exercise C",
    type: "choose",
    question: "4. If you don't have time to finish all your points and answer questions, (your topic must be serious – this means you ran over.)",
    options: [
      "your topic must be serious",
      "this means you ran over"
    ],
    correctAnswer: "this means you ran over",
    explanation: null,
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-19",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 11 — Exercise C (continued)",
    type: "true-false",
    question: "5. If you can shout, don't use a microphone. This statement is (true – false)",
    options: [
      "True",
      "False"
    ],
    correctAnswer: "False",
    explanation: "Answer: False",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-20",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 11 — Exercise C (continued)",
    type: "multiple-choice",
    question: "6. “Being monotonous helps the audience follow your presentation.” This statement is…",
    options: [
      "False, because monotone makes the audience bored",
      "True, because varying the pitch of your voice will distract the audience"
    ],
    correctAnswer: "False, because monotone makes the audience bored",
    explanation: "Answer: False, because monotone makes the audience bored",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-21",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 11 — Exercise C (continued)",
    type: "true-false",
    question: "7. Rapport with the audience is as important as the topic. (true – false)",
    options: [
      "True",
      "False"
    ],
    correctAnswer: "True",
    explanation: "Answer: True",
    hasVerifiedAnswer: true
  },
  {
    id: "presentations-22",
    lectureId: "presentations",
    lectureTitle: "Presentations",
    slide: "Slide 6 (Question PDF) / Slide 10–11 — Exercise C",
    type: "choose",
    question: "8. If you start your presentation with an anecdote, you'll (forget the theme of the presentation – gain the audience's attention)",
    options: [
      "forget the theme of the presentation",
      "gain the audience's attention"
    ],
    correctAnswer: "gain the audience's attention",
    explanation: null,
    hasVerifiedAnswer: true
  },

  // ==========================================
  // LECTURE 04: WORKING LIFE
  // ==========================================
  {
    id: "working-life-01",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n1- a good thing to do:……..",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "worthwhile",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-02",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n2-boring:",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "dull",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-03",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n3- needing all our effort and attention:…",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "demanding",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-04",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n4- difficult in satisfying way:…",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "challenging",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-05",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n5-lively and enjoyable:….",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "Fun",
    acceptedAnswers: ["Fun", "fun"],
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-06",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n6-looks attractive from the outside:….",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "glamorous",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-07",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n7- predictable, the same every day:…..",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "routine",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-08",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n8-makes us feel unhappy:…..",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "depressing",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-09",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n9-Different not always the same:…..",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "varied",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-10",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n10-makes us feel worried and anxious:…..",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "stressful",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },
  {
    id: "working-life-11",
    lectureId: "working-life",
    lectureTitle: "Working Life",
    slide: "Slide 3–5 — Match the words to definitions",
    type: "multiple-choice",
    question: "Match the definition to the word from the list:\n11-makes us feel good:…..",
    options: ["worthwhile", "dull", "demanding", "challenging", "Fun", "glamorous", "routine", "depressing", "varied", "stressful", "rewarding"],
    correctAnswer: "rewarding",
    explanation: "Word list: Fun – varied – challenging – routine – depressing – stressful – glamorous – worthwhile – rewarding – dull – demanding",
    hasVerifiedAnswer: true
  },

  // ==========================================
  // LECTURE 05: WRITING A CV
  // ==========================================
  {
    id: "cv-01",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 2 / 3 — Question 3",
    type: "matching",
    question: "3] Read the CV. Match section headings a-f to sections 1-6 in the CV.\nHeadings: Education | Additional personal skills | Personal information | Objective | References | Work Experience",
    pairs: [
      { left: "Section 1", right: "d (Objective)" },
      { left: "Section 2", right: "c (Personal information)" },
      { left: "Section 3", right: "a (Education)" },
      { left: "Section 4", right: "f (Work Experience)" },
      { left: "Section 5", right: "b (Additional personal skills)" },
      { left: "Section 6", right: "e (References)" }
    ],
    correctAnswer: "1/d • 2/c • 3/a • 4/f • 5/b • 6/e",
    explanation: "Slide answer: 1/d • 2/c • 3/a • 4/f • 5/b • 6/e",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-02",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 4 — Question 4",
    type: "open-response",
    question: "4] 1. Do you think the sections are in the correct order? Why/Why not?",
    options: null,
    correctAnswer: "Some people might prefer to put their work experience before their education — this would also be acceptable and would most likely depend on what is more relevant for the job the person is applying for — the more relevant information should come first.",
    explanation: "Answer from slide:\nSome people might prefer to put their work experience before their education — this would also be acceptable and would most likely depend on what is more relevant for the job the person is applying for — the more relevant information should come first.",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-03",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 4 — Question 4",
    type: "open-response",
    question: "4] 2. What else might you include?",
    options: null,
    correctAnswer: "You could include interests and hobbies as well.",
    explanation: "Answer from slide:\nYou could include interests and hobbies as well.",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-04",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 1: Include all of your employment history, even summer jobs or part-time jobs. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree"
    ],
    correctAnswer: "Disagree",
    explanation: "Answer: Disagree. To help save space, part-time and temporary jobs are probably the first thing that can be left out, unless they are particularly relevant.",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-05",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 2: List all of your qualifications. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree"
    ],
    correctAnswer: "Disagree",
    explanation: "Answer: Disagree. If a qualification supersedes another, then the less important could be left out. e.g. Scoring in an IELTS test supersedes attending its preparation course.",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-06",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 3: Don't be afraid to exaggerate your achievements. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree"
    ],
    correctAnswer: "Disagree",
    explanation: "Answer: Disagree. It is recommended not to do so.",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-07",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 4: Keep it short, easy to read, and attractive. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree"
    ],
    correctAnswer: "Agree",
    explanation: "Answer: Agree. Remember that the employer will probably receive hundreds if not thousands of CVs. They will not have time to read through page after page, so it's a good idea to keep it short, clear and easy to follow",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-08",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 5: Keep everything in chronological order. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree (Use reversed chronological order)"
    ],
    correctAnswer: "Disagree (Use reversed chronological order)",
    acceptedAnswers: ["Disagree (Use reversed chronological order)", "Disagree", "reversed chronological order"],
    explanation: "Answer: Yes; keep it in a reversed chronological order: the most recent comes first",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-09",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 6: Try to keep it all on one sheet of paper. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree"
    ],
    correctAnswer: "Disagree",
    explanation: "Answer: Disagree. No specific number of pages",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-10",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 7: Make sure you put the heading CV or Curriculum Vitae at the top. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree"
    ],
    correctAnswer: "Disagree",
    explanation: "Answer: Disagree. There's no need to do this",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-11",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 8: Have different CVs for different types of jobs. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree"
    ],
    correctAnswer: "Agree",
    explanation: "Answer: Agree. This is a very good idea if you are applying for varied jobs",
    hasVerifiedAnswer: true
  },
  {
    id: "cv-12",
    lectureId: "writing-a-cv",
    lectureTitle: "Writing a CV",
    slide: "Slide 5–7 — Question 5 (CV advice)",
    type: "choose",
    question: "CV Advice 9: Include a photograph. Do you agree with this statement?",
    options: [
      "Agree",
      "Disagree"
    ],
    correctAnswer: "Disagree",
    explanation: "Answer: Disagree. In the UK this is generally not necessary, unless the job you are applying for specifically asks for it",
    hasVerifiedAnswer: true
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LECTURES_DATA, QUESTIONS_DATA };
}
