import Card from "./Card";

type Props = {
  icon: string;
  title: string;
  value: string;
  subtitle?: string;
};

export default function StatCard({
  icon,
  title,
  value,
  subtitle,
}: Props) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="text-3xl">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-400">
          {title}
        </p>

        <p className="mt-2 text-2xl font-bold text-white">
          {value}
        </p>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
}