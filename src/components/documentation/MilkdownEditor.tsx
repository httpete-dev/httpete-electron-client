"use client"

import React, { useEffect, useRef, useState } from "react"
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core"
import { nord } from "@milkdown/theme-nord"
import { commonmark } from "@milkdown/preset-commonmark"
import { listener, listenerCtx } from "@milkdown/plugin-listener"
import { indent } from "@milkdown/plugin-indent"
import { upload, uploadPlugin } from "@milkdown/plugin-upload"
import { emoji } from "@milkdown/plugin-emoji"
import { diagram } from "@milkdown/plugin-diagram"
import { history } from "@milkdown/plugin-history"
import { clipboard } from "@milkdown/plugin-clipboard"
import { cursor } from "@milkdown/plugin-cursor"
import { prism } from "@milkdown/plugin-prism"
import { gfm } from "@milkdown/preset-gfm"
import "@/styles/milkdown.css"
import { uploadMedia } from "@/server/mediaUpload"
import { EditorToolbar } from "./Toolbar"

interface MilkdownEditorProps {
  defaultValue?: string
  onChange?: (markdown: string) => void
}

export function MilkdownEditor({ defaultValue = "", onChange }: MilkdownEditorProps) {
  const editorRef = useRef<Editor | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const initEditor = async () => {
      try {
        const editor = await Editor.make()
          .config((ctx) => {
            ctx.set(rootCtx, containerRef.current)
            ctx.set(defaultValueCtx, defaultValue)
            ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
              onChange?.(markdown)
            })
          })
          .use(nord)
          .use(commonmark)
          .use(gfm)
          .use(listener)
          .use(diagram)
          .use(
            upload,
          )
          .use(indent)
          .use(history)
          .use(clipboard)
          .use(emoji)
          .use(cursor)
          .use(prism)
          .create()

        editorRef.current = editor
        console.log('done loading')
        setLoading(false)
      } catch (e) {
        console.error("Failed to initialize editor:", e)
        setError("Failed to initialize editor. Please try again.")
        setLoading(false)
      }
    }

    initEditor()

    return () => {
      editorRef.current?.destroy()
    }
  }, [onChange, defaultValue])

  if (error) {
    return <div className="w-full p-4 text-red-500">{error}</div>
  }

  return (
    <div className="w-full">
      <div className="rounded-lg border shadow-sm">
        <div className="flex min-h-[500px] flex-col">
          {loading ? (
            <div className="flex h-[500px] items-center justify-center">
              <div className="text-sm text-muted-foreground">Loading editor...</div>
            </div>
          ) : (
            <>
              <EditorToolbar editor={editorRef.current} />
              <div
                ref={containerRef}
                className="prose prose-sm dark:prose-invert max-w-none p-4"
                suppressHydrationWarning
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

