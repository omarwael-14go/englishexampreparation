# Interactive English Study Website — Source-Based Quiz System

A modern, offline-first study web application built strictly from the original lecture PowerPoint files and answer keys.

## Features

- **100% Slide-Verified Content**: All 73 questions, options, exercises, and answer explanations extracted directly from the two source PDFs:
  1. Ambiguity (16 questions)
  2. Collocations (12 questions)
  3. Presentations (22 questions)
  4. Working Life (11 questions)
  5. Writing a CV (12 questions)
- **Zero AI / Zero External Dependencies**: Runs entirely offline using vanilla HTML5, CSS3, and modern JavaScript.
- **Multiple Study Modes**:
  - **Practice Mode**: Step-by-step interactive quiz with instant deterministic answer checks and slide explanations.
  - **Exam Mode**: Realistic simulation with no immediate answers, an interactive question palette, score percentage, pass/fail grading, and comprehensive post-exam review.
  - **Flashcard Mode**: 3D animated flip cards for active recall and self-testing.
  - **Quick Review**: Instant searchable repository with real-time text query and lecture filtering.
- **Support for All Question Formats**:
  - Multiple Choice (MCQs with option keys `1`-`4`)
  - Binary Choices & True/False
  - Text Correction & Fill-in (exact normalized matching)
  - Interactive Matching (pair-by-pair connector with visual badge chips)
  - Open Questions / Self-Review (with official slide interpretations and notes for unanswered slides)
- **Persistent Progress**: Saved automatically via `localStorage` with a confirmation modal for resetting.
- **Keyboard Navigation**:
  - `1`-`4` to select options
  - `Enter` to check answers
  - `←` / `→` for previous and next question
  - `Space` to flip flashcards

## How to Run

Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari). No installation, servers, or build tools required.
