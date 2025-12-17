export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative h-screen w-full">{children}</div>;
}
