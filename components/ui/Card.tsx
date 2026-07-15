import type { HTMLAttributes, ReactNode } from "react";

type CardVariant =
  | "default"
  | "soft"
  | "success"
  | "warning"
  | "danger";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
};

const variantes: Record<CardVariant, string> = {
  default: "border-slate-800 bg-slate-900",
  soft: "border-slate-700 bg-slate-800",
  success: "border-emerald-500/30 bg-emerald-500/10",
  warning: "border-amber-500/30 bg-amber-500/10",
  danger: "border-red-500/30 bg-red-500/10",
};

export default function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: Props) {
  return (
    <div
      className={`rounded-3xl border p-6 shadow-sm ${variantes[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}