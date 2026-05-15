import { useRef, useCallback, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link2,
  Undo,
  Redo,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Restore focus and selection before executing a command
  const exec = useCallback(
    (command: string, value?: string) => {
      const editor = editorRef.current;
      if (!editor) return;

      // Ensure editor has focus (restore previous selection if any)
      editor.focus();

      document.execCommand(command, false, value);

      // Trigger onChange after command
      onChange(editor.innerHTML);
    },
    [onChange]
  );

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInsertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url && editorRef.current) {
      editorRef.current.focus();
      document.execCommand("createLink", false, url);
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  return (
    <div
      className="overflow-hidden rounded-md border border-border transition-colors"
      style={{ borderColor: isFocused ? "var(--ring)" : undefined }}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/50 p-1.5">
        <ToolbarButton onMouseDown={() => exec("bold")} title="Bold">
          <Bold className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton onMouseDown={() => exec("italic")} title="Italic">
          <Italic className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton onMouseDown={() => exec("formatBlock", "<h1>")} title="Heading 1">
          <Heading1 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton onMouseDown={() => exec("formatBlock", "<h2>")} title="Heading 2">
          <Heading2 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton onMouseDown={() => exec("insertUnorderedList")} title="Bullet list">
          <List className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton onMouseDown={() => exec("insertOrderedList")} title="Numbered list">
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton onMouseDown={handleInsertLink} title="Insert link">
          <Link2 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="mx-auto" />
        <ToolbarButton onMouseDown={() => exec("undo")} title="Undo">
          <Undo className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton onMouseDown={() => exec("redo")} title="Redo">
          <Redo className="h-3.5 w-3.5" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[200px] p-4 text-foreground outline-none [&:empty:before]:text-muted-foreground [&:empty:before]:content-[attr(data-placeholder)]"
        data-placeholder={placeholder || "Write your case study..."}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: value || "" }}
      />
    </div>
  );
}

function ToolbarButton({
  children,
  onMouseDown,
  title,
}: {
  children: React.ReactNode;
  onMouseDown: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent button from stealing focus
        onMouseDown();
      }}
      className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
    >
      {children}
    </button>
  );
}