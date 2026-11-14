import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visually hidden label (the design shows only the placeholder). */
  label: string;
  /** Extra row inside the field, under the text (e.g. «Add a photo»). */
  footer?: ReactNode;
}

/** White field, radius 12, 16/300 text, ink-muted placeholder. */
export function TextArea({ label, footer, className, rows = 3, ...rest }: TextAreaProps) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-2 rounded-md bg-white px-4 py-3.5 focus-within:ring-2 focus-within:ring-ink", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="w-full flex-1 resize-none bg-transparent text-body text-ink outline-none placeholder:text-ink-muted"
        {...rest}
      />
      {footer}
    </div>
  );
}
