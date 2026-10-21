'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

import { FileUpload } from '@/components/study/file-upload'
import { FlashcardDeck } from '@/components/study/flashcard-deck'
import type { Flashcard } from '@/lib/sample-flashcards'

type StudyDashboardProps = {
  name?: string
  cards: Flashcard[]
}

export function StudyDashboard({ name = 'there', cards }: StudyDashboardProps) {
  const [files, setFiles] = useState<File[]>([])

  return (
    <main className="min-h-screen bg-muted/40">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 md:py-16">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            AI Study
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Welcome back, {name}
          </h1>
          <p className="text-muted-foreground">
            {files.length > 0
              ? `${files.length} file${files.length === 1 ? '' : 's'} ready · ${cards.length} cards in your deck`
              : `${cards.length} cards in your deck`}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-2">
            <FileUpload files={files} onFilesChange={setFiles} />
          </div>
          <div className="md:col-span-3">
            <FlashcardDeck cards={cards} />
          </div>
        </div>
      </div>
    </main>
  )
}
