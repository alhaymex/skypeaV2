"use client";

import { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Toolbar } from "./Toolbar";

// Import specific languages
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import java from "highlight.js/lib/languages/java";
import rust from "highlight.js/lib/languages/rust";
import go from "highlight.js/lib/languages/go";
import json from "highlight.js/lib/languages/json";

import "highlight.js/styles/github-dark.css";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const lowlight = createLowlight(common);
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("css", css);
lowlight.register("python", python);
lowlight.register("c", c);
lowlight.register("cpp", cpp);
lowlight.register("csharp", csharp);
lowlight.register("java", java);
lowlight.register("rust", rust);
lowlight.register("go", go);
lowlight.register("json", json);

export function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "cursor-pointer",
        },
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLanguage = useCallback(
    (language: string) => {
      if (editor) {
        editor.chain().focus().setCodeBlock({ language }).run();
      }
    },
    [editor]
  );

  return (
    <div className="border rounded-md">
      <Toolbar editor={editor} setLanguage={setLanguage} />
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .ProseMirror {
          padding: 1rem;
        }
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #ccc;
          margin-left: 0;
          padding-left: 1em;
          font-style: italic;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .ProseMirror a:hover {
          color: #2563eb;
        }
        .ProseMirror pre {
          background-color: #1f2937;
          color: #e5e7eb;
          font-family: "Courier New", Courier, monospace;
          padding: 0.75em 1em;
          border-radius: 0.375rem;
          overflow-x: auto;
        }
        .ProseMirror code {
          background-color: #374151;
          color: #e5e7eb;
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        .ProseMirror pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
          font-size: 1em;
        }
      `}</style>
    </div>
  );
}
