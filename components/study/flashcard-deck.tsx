'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Layers, RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Flashcard } from '@/lib/sample-flashcards'
import { cn } from '@/lib/utils'

type FlashcardDeckProps = {
  cards: Flashcard[]
}

export function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const total = cards.length
  const card = cards[index]

  function goTo(next: number) {
    setIsFlipped(false)
    setIndex((next + total) % total)
  }

  if (total === 0) {
    return (
      <section className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card p-6 text-center">
        <Layers className="size-6 text-muted-foreground" aria-hidden="true" />
        <h2 className="text-base font-semibold">No flashcards yet</h2>
        <p className="max-w-xs text-sm text-muted-foreground">
          Upload study materials to generate your first deck.
        </p>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="flashcards-heading"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') goTo(index + 1)
        if (e.key === 'ArrowLeft') goTo(index - 1)
      }}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="flashcards-heading" className="text-base font-semibold">
            Flashcards
          </h2>
          <p className="text-sm text-muted-foreground">
            Click a card to reveal the answer.
          </p>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium tabular-nums text-muted-foreground">
          {index + 1} / {total}
        </span>
      </div>

      <div className="perspective-[1200px]">
        <button
          type="button"
          onClick={() => setIsFlipped((f) => !f)}
          aria-pressed={isFlipped}
          className={cn(
            'relative grid min-h-72 w-full rounded-xl text-left transition-transform duration-500 transform-3d outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none',
            isFlipped && 'rotate-y-180',
          )}
        >
          <div
            className="col-start-1 row-start-1 flex flex-col justify-between gap-6 rounded-xl border border-border bg-background p-6 backface-hidden"
            aria-hidden={isFlipped}
          >
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              {card.topic}
            </span>
            <p className="text-xl font-medium leading-relaxed text-pretty md:text-2xl">
              {card.question}
            </p>
            <span className="text-xs text-muted-foreground">Question</span>
          </div>
          <div
            className="col-start-1 row-start-1 flex rotate-y-180 flex-col justify-between gap-6 rounded-xl bg-primary p-6 text-primary-foreground backface-hidden"
            aria-hidden={!isFlipped}
          >
            <span className="text-xs font-medium uppercase tracking-wider opacity-80">
              {card.topic}
            </span>
            <p className="text-lg leading-relaxed text-pretty md:text-xl">
              {card.answer}
            </p>
            <span className="text-xs opacity-80">Answer</span>
          </div>
        </button>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => goTo(index - 1)}
          aria-label="Previous card"
        >
          <ChevronLeft data-icon="inline-start" aria-hidden="true" />
          Prev
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setIsFlipped((f) => !f)}
        >
          <RotateCcw data-icon="inline-start" aria-hidden="true" />
          Flip
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => goTo(index + 1)}
          aria-label="Next card"
        >
          Next
          <ChevronRight data-icon="inline-end" aria-hidden="true" />
        </Button>
      </div>
    </section>
  )
}
