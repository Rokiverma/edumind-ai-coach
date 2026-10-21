'use client'

import { useId, useRef, useState } from 'react'
import { FileText, Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ACCEPTED_TYPES = '.pdf,.txt,.md,.doc,.docx'

type FileUploadProps = {
  files: File[]
  onFilesChange: (files: File[]) => void
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUpload({ files, onFilesChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const [isDragging, setIsDragging] = useState(false)

  function addFiles(incoming: FileList | null) {
    if (!incoming?.length) return
    const existing = new Set(files.map((f) => `${f.name}-${f.size}`))
    const fresh = Array.from(incoming).filter(
      (f) => !existing.has(`${f.name}-${f.size}`),
    )
    onFilesChange([...files, ...fresh])
  }

  function removeFile(index: number) {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  return (
    <section
      aria-labelledby={`${inputId}-heading`}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex flex-col gap-1">
        <h2 id={`${inputId}-heading`} className="text-base font-semibold">
          Study materials
        </h2>
        <p className="text-sm text-muted-foreground">
          Upload notes or readings to turn them into flashcards.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-4 py-8 text-center transition-colors',
          isDragging && 'border-primary bg-primary/5',
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
          <Upload className="size-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <p className="text-sm text-muted-foreground">
          Drag files here, or
        </p>
        <Button size="lg" onClick={() => inputRef.current?.click()}>
          <Upload data-icon="inline-start" aria-hidden="true" />
          Upload files
        </Button>
        <p className="text-xs text-muted-foreground">PDF, TXT, MD, or DOCX</p>
        <label htmlFor={inputId} className="sr-only">
          Upload study files
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept={ACCEPTED_TYPES}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Uploaded files">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2"
            >
              <FileText
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatSize(file.size)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
              >
                <X aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
