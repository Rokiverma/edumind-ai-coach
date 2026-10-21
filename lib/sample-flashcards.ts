export type Flashcard = {
  id: string
  question: string
  answer: string
  topic: string
}

export const sampleFlashcards: Flashcard[] = [
  {
    id: 'mitochondria',
    topic: 'Biology',
    question: 'What is the primary function of the mitochondria?',
    answer:
      'To produce ATP through cellular respiration, supplying most of the chemical energy a cell needs.',
  },
  {
    id: 'photosynthesis',
    topic: 'Biology',
    question: 'What are the two main stages of photosynthesis?',
    answer:
      'The light-dependent reactions, which capture energy, and the Calvin cycle, which uses that energy to fix carbon into sugar.',
  },
  {
    id: 'newton-second',
    topic: 'Physics',
    question: "State Newton's second law of motion.",
    answer:
      'The net force on an object equals its mass multiplied by its acceleration (F = ma).',
  },
  {
    id: 'big-o',
    topic: 'Computer Science',
    question: 'What does O(log n) time complexity describe?',
    answer:
      'An algorithm whose work grows logarithmically with input size, such as binary search halving the search space each step.',
  },
]
