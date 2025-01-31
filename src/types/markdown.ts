import type { Endpoint } from "@/model"
import type { ReactNode } from "react"

export interface WysiwygEditorProps {
  endpoint: Endpoint
}

export interface ToolbarButtonProps {
  onClick: () => void
  active: boolean
  icon: React.ComponentType<{ className?: string }>
  label: string
}

export interface ToolbarProps {
  children: ReactNode
  className?: string
}

