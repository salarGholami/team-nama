// components/ui/Select.tsx

import { ChevronDown, type LucideIcon } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  icon?: LucideIcon;
};

export default function Select({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute start-5 top-1/2 -translate-y-1/2">
            <Icon size={20} className="text-muted-foreground" />
          </span>
        )}

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-md border border-primary-700 bg-primary-700/50 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            Icon ? "ps-16 pe-16" : "ps-4 pe-8"
          }`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-primary-700"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={20}
          className="pointer-events-none absolute end-5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}
