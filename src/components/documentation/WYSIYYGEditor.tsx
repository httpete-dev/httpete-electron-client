"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import { Youtube } from "@tiptap/extension-youtube"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import "@/styles/documentation.scss"
import { formatMarkdown } from "@/lib/markdown"
import { uploadMedia } from "@/server/mediaUpload"
import { WysiwygEditorProps, ToolbarButtonProps } from "@/types/markdown"

export default function WysiwygEditor({ endpoint }: WysiwygEditorProps) {
  const [title, setTitle] = useState("Untitled Document")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isViewingSource, setIsViewingSource] = useState(false)
  const [originalContent, setOriginalContent] = useState("")
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTitle(endpoint?.documentation?.title ?? "Untitled Document")
  }, [endpoint?.documentation?.title])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Highlight,
      Typography,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Youtube.configure({
        controls: true,
      }),
    ],
    content: endpoint?.documentation?.text,
    editorProps: {
      attributes: {
        class: "prose max-w-none p-4 focus:outline-none",
      },
      parseOptions: {
        preserveWhitespace: "full",
      },
      handlePaste: async (view, event) => {
        const items = Array.from(event.clipboardData?.items || [])
        for (const item of items) {
          if (item.type.indexOf("image") === 0) {
            event.preventDefault()
            const file = item.getAsFile()
            if (file) {
              const loadingPlaceholder = `<div class="loading-placeholder">Uploading image...</div>`
              const { tr } = view.state
              const node = view.state.schema.nodes.paragraph.create(null, [view.state.schema.text(loadingPlaceholder)])
              const transaction = tr.insert(view.state.selection.from, node)
              view.dispatch(transaction)

              try {
                const url = await uploadMedia(file)
                editor?.chain().focus().setImage({ src: url }).run()
              } catch (error) {
                console.error("Failed to upload image:", error)
                editor?.chain().focus().setTextSelection(view.state.selection.from).run()
                editor?.commands.insertContent(`<p class="text-red-500">Failed to upload image: ${error.message}</p>`)
              } finally {
                // Remove the loading placeholder
                editor
                  ?.chain()
                  .focus()
                  .deleteRange({
                    from: view.state.selection.from - loadingPlaceholder.length,
                    to: view.state.selection.from,
                  })
                  .run()
              }
            }
          } else if (item.type === "text/plain") {
            item.getAsString((string) => {
              if (string.startsWith("https://www.youtube.com") || string.startsWith("https://youtu.be")) {
                event.preventDefault()
                editor?.commands.setYoutubeVideo({
                  src: string,
                  width: 640,
                  height: 480,
                })
              }
            })
          }
        }
      },
      handleDrop: async (view, event, slice, moved) => {
        if (!moved && event.dataTransfer) {
          const files = Array.from(event.dataTransfer.files)
          for (const file of files) {
            if (file.type.startsWith("image/")) {
              event.preventDefault()
              const loadingPlaceholder = `<div class="loading-placeholder">Uploading image...</div>`
              const { tr } = view.state
              const node = view.state.schema.nodes.paragraph.create(null, [view.state.schema.text(loadingPlaceholder)])
              const transaction = tr.insert(view.state.selection.from, node)
              view.dispatch(transaction)

              try {
                const url = await uploadMedia(file)
                editor?.chain().focus().setImage({ src: url }).run()
              } catch (error) {
                console.error("Failed to upload image:", error)
                editor?.chain().focus().setTextSelection(view.state.selection.from).run()
                editor?.commands.insertContent(`<p class="text-red-500">Failed to upload image: ${error.message}</p>`)
              } finally {
                // Remove the loading placeholder
                editor
                  ?.chain()
                  .focus()
                  .deleteRange({
                    from: view.state.selection.from - loadingPlaceholder.length,
                    to: view.state.selection.from,
                  })
                  .run()
              }
            }
          }
        }
        return false
      },
    },
    onUpdate: ({ editor }) => {
      if (!isViewingSource) {
        setOriginalContent(editor.getHTML())
      }
    },
  })

  useEffect(() => {
    if (editor && endpoint?.documentation?.text) {
      const content = endpoint.documentation.text
      setOriginalContent(content)
      editor.commands.setContent(content, false, { preserveWhitespace: "full" })
    }
  }, [editor, endpoint?.documentation?.text])

  const handleTitleClick = () => {
    setIsEditingTitle(true)
    setTimeout(() => titleInputRef.current?.focus(), 0)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false)
    }
  }

  const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, active, icon: Icon, label }) => (
    <Button
      onClick={onClick}
      variant={active ? "secondary" : "ghost"}
      size="icon"
      className="h-8 w-8"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )

  const toggleSource = () => {
    if (editor) {
      if (isViewingSource) {
        // Switch to formatted view
        editor.commands.setContent(originalContent, false, { preserveWhitespace: "full" })
      } else {
        // Switch to source view
        setOriginalContent(editor.getHTML())
        const markdown = formatMarkdown(editor.getHTML())
        editor.commands.setContent(markdown, false, { preserveWhitespace: "full" })
      }
      setIsViewingSource(!isViewingSource)
    }
  }

  return (
    <div className="pt-12"> 

    
    <div className="max-w-4xl overflow-hidden mx-auto p-6 space-y-4 focus:ring-none overflow-y-auto" style={{maxHeight:'70vh'}}>
      <div className="mb-4">
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="text-3xl font-bold w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:bg-red-950 focus:border-red-500"
          />
        ) : (
          <h1 onClick={handleTitleClick} className="text-3xl font-bold cursor-pointer hover:bg-gray-800 hover:ring-2 hover:ring-red-400 p-2 rounded">
            {title}
          </h1>
        )}
      </div>
      <div className="border border-0 bg-transparent rounded-md">
        <div className="flex flex-wrap gap-1 p-1 border-b border-input">
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBold().run()}
            active={editor?.isActive("bold") ?? false}
            icon={Bold}
            label="Toggle bold"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            active={editor?.isActive("italic") ?? false}
            icon={Italic}
            label="Toggle italic"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            active={editor?.isActive("underline") ?? false}
            icon={Underline}
            label="Toggle underline"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            active={editor?.isActive("strike") ?? false}
            icon={Strikethrough}
            label="Toggle strikethrough"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleCode().run()}
            active={editor?.isActive("code") ?? false}
            icon={Code}
            label="Toggle code"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            active={editor?.isActive("bulletList") ?? false}
            icon={List}
            label="Toggle bullet list"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            active={editor?.isActive("orderedList") ?? false}
            icon={ListOrdered}
            label="Toggle ordered list"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            active={editor?.isActive("blockquote") ?? false}
            icon={Quote}
            label="Toggle blockquote"
          />
          <ToolbarButton
            onClick={() => {
              const url = window.prompt("Enter the URL")
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run()
              }
            }}
            active={editor?.isActive("link") ?? false}
            icon={LinkIcon}
            label="Add link"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor?.isActive("heading", { level: 1 }) ?? false}
            icon={Heading1}
            label="Toggle H1"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor?.isActive("heading", { level: 2 }) ?? false}
            icon={Heading2}
            label="Toggle H2"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor?.isActive("heading", { level: 3 }) ?? false}
            icon={Heading3}
            label="Toggle H3"
          />
          <ToolbarButton
            onClick={() => {
              const url = window.prompt("Enter the image URL")
              if (url) {
                editor?.chain().focus().setImage({ src: url }).run()
              }
            }}
            active={false}
            icon={ImageIcon}
            label="Add image"
          />
          <ToolbarButton
            onClick={() => {
              const url = window.prompt("Enter the YouTube video URL")
              if (url) {
                editor?.commands.setYoutubeVideo({
                  src: url,
                  width: 640,
                  height: 480,
                })
              }
            }}
            active={false}
            icon={Video}
            label="Add YouTube video"
          />
          <Button
            onClick={toggleSource}
            variant={isViewingSource ? "secondary" : "ghost"}
            size="sm"
            className="ml-auto"
          >
            {isViewingSource ? "View Formatted" : "View Source"}
          </Button>
        </div>
        <EditorContent editor={editor} className="prose max-w-none p-4 whitespace-pre-wrap" />
      </div>
      <style jsx global>{`
        .ProseMirror-focused {
          outline: none !important;
          border-color: transparent !important;
        }
        .ProseMirror p {
          margin-bottom: 1em;
        }
        .loading-placeholder {
          background-color: #f0f0f0;
          color: #888;
          padding: 1em;
          text-align: center;
          border-radius: 4px;
          margin-bottom: 1em;
        }
        .ProseMirror {
          white-space: pre-wrap;
        }
      `}</style>
    </div>
    </div>
  )
}

