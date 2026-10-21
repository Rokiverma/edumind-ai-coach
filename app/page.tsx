import { StudyDashboard } from '@/components/study/study-dashboard'
import { sampleFlashcards } from '@/lib/sample-flashcards'

export default function Page() {
  return <StudyDashboard name="Alex" cards={sampleFlashcards} />
}
