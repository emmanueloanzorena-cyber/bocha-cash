import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: Props) {
  const inputId =
    id || props.name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={inputId}
      className="block w-full"
    >
      {label && (
        <span className="mb-2 block text-sm font-medium text-slate-300">
          {label}
        </span>
      )}

      <input
        id={inputId}
        className={`
          w-full rounded-2xl border bg-slate-800 px-4 py-3
          text-white outline-none transition
          placeholder:text-slate-500
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/40"
              : "border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <span className="mt-2 block text-sm text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}