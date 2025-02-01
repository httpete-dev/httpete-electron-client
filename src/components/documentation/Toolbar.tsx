import type React from "react"
import { type Editor, commandsCtx } from "@milkdown/core"
import { Bold, Italic, Underline, Code, ListOrdered, List } from "lucide-react"

interface ToolbarProps {
  editor: Editor | null
}

export const EditorToolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const runCommand = (command: string) => {
    editor?.action((ctx) => {
      ctx.get(commandsCtx).call(command)
    })
  }

  return (
    <div className="flex items-center space-x-2 p-2 border-b">
      <button onClick={() => runCommand("ToggleBold")} className="p-1 hover:bg-gray-200 rounded">
        <Bold size={16} />
      </button>
      <button onClick={() => runCommand("ToggleItalic")} className="p-1 hover:bg-gray-200 rounded">
        <Italic size={16} />
      </button>
      <button onClick={() => runCommand("ToggleUnderline")} className="p-1 hover:bg-gray-200 rounded">
        <Underline size={16} />
      </button>
      <button onClick={() => runCommand("ToggleInlineCode")} className="p-1 hover:bg-gray-200 rounded">
        <Code size={16} />
      </button>
      <button onClick={() => runCommand("WrapInOrderedList")} className="p-1 hover:bg-gray-200 rounded">
        <ListOrdered size={16} />
      </button>
      <button onClick={() => runCommand("WrapInBulletList")} className="p-1 hover:bg-gray-200 rounded">
        <List size={16} />
      </button>
    </div>
  )
}

