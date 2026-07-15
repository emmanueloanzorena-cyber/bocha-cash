import type { ReactNode } from "react";

type Props = {
  icon?: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({
  icon = "📭",
  title,
  description,
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-slate-400">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}