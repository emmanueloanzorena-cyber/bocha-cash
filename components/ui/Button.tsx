import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantes: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
  secondary:
    "bg-slate-800 text-slate-200 hover:bg-slate-700",
  danger:
    "bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300",
  ghost:
    "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white",
};

const tamanios: Record<ButtonSize, string> = {
  sm: "rounded-xl px-3 py-2 text-sm",
  md: "rounded-2xl px-5 py-3",
  lg: "rounded-2xl px-6 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  disabled,
  ...props
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-bold transition
        disabled:cursor-not-allowed disabled:opacity-50
        ${variantes[variant]}
        ${tamanios[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}