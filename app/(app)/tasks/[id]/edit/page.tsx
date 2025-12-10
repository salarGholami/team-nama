// app/(app)/tasks/[id]/edit/page.tsx
export default function EditTaskPage({ params }: { params: { id: string } }) {
  return <h1>Edit Task ID: {params.id}</h1>;
}
