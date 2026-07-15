import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantes: Record<BadgeVariant, string> = {
  default:
    "border-slate-700 bg-slate-800 text-slate-300",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-400",
  danger:
    "border-red-500/30 bg-red-500/10 text-red-400",
  info:
    "border-sky-500/30 bg-sky-500/10 text-sky-400",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: Props) {
  return (
    <span
      className={`
        inline-flex items-center gap-1
        rounded-full border
        px-3 py-1
        text-xs font-semibold
        ${variantes[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}