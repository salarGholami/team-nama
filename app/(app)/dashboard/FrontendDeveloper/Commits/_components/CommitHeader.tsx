// _components/CommitHeader.tsx
type Props = {
  total: number;
};

export default function CommitHeader({ total }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg lg:text-2xl">کامیت‌ها</h1>
        <p className="text-primary-300 text-xs lg:text-sm">
          تاریخچه تغییرات و گفتگوها
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm bg-primary-700/50 px-3 py-1.5 rounded-xl border border-primary-600/40">
        <span className="text-muted-foreground">کل کامیت‌ها:</span>
        <span className="font-bold text-emerald-400">{total}</span>
      </div>
    </div>
  );
}
