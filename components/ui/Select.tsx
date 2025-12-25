// components/ui/Select.tsx
type Option = { label: string; value: string };

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
};

export default function Select({ label, value, onChange, options }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-primary-700 rounded-md py-2 px-4"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
