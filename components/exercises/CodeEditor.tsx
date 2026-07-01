// components/exercises/CodeEditor.tsx
"use client"

import Editor, { OnMount, loader } from "@monaco-editor/react"
import { useRef } from "react"
import { useTheme } from "@/app/providers"

loader.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.48.0/min/vs",
  },
});

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: "javascript" | "typescript" | "html" | "css"
  height?: string
}

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  height = "300px",
}: CodeEditorProps) {
  const { theme } = useTheme()
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null)

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor

    editor.updateOptions({
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on",
      minimap: { enabled: false }, // minimap is unnecessary clutter for small exercise snippets
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      scrollBeyondLastLine: false,
      automaticLayout: true, // resizes correctly inside flex/grid containers
    })
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(val) => onChange(val ?? "")}
        onMount={handleMount}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  )
}
