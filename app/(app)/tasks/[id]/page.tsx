// app/(app)/tasks/[id]/page.tsx
export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return <h1>Task ID: {params.id}</h1>;
}
