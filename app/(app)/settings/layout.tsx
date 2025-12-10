// app/(app)/settings/layout.tsx
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Settings Tabs</h1>
      {children}
    </div>
  );
}
