"use client";

import { FC, useEffect, useRef } from "react";
import Quill from "quill";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import "./style.css";

interface QuillEditorProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

const QuillEditor: FC<QuillEditorProps> = ({
  placeholder = "내용을 입력해주세요",
  defaultValue = "",
  value,
  onChange,
  disabled,
}) => {
  const quillEditorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ];

    if (quillEditorRef.current && !quillRef.current) {
      quillRef.current = new Quill(quillEditorRef.current, {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
        readOnly: !!disabled,
        placeholder,
      });

      if (defaultValue || value) {
        const initialValue = value || defaultValue;
        quillRef.current.clipboard.dangerouslyPasteHTML(initialValue);
      }

      quillRef.current.on("text-change", () => {
        if (!isUpdatingRef.current && onChange) {
          const html = quillRef.current?.root.innerHTML || "";
          onChange(html);
        }
      });
    }

    return () => {};
  }, [placeholder, defaultValue, value, onChange, disabled]);

  useEffect(() => {
    if (quillRef.current && value !== undefined) {
      const currentContent = quillRef.current.root.innerHTML;

      if (currentContent !== value) {
        isUpdatingRef.current = true;
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
        isUpdatingRef.current = false;
      }
    }
  }, [value]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!disabled);
    }
  }, [disabled]);

  return (
    <div>
      <div ref={quillEditorRef} className="h-full" />
      <label htmlFor="content" className="sr-only">
        텍스트 에디터
      </label>
      <input
        type="hidden"
        id="content"
        name="content"
        value={value ?? ""}
        disabled={disabled}
        readOnly
      />
    </div>
  );
};

export default QuillEditor;
