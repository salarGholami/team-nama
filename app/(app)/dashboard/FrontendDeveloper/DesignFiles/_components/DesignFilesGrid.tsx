"use client";

import DesignFileCard from "./DesignFileCard";

type DesignFile = {
  id: number;
  name: string;
  preview: string;
  tool: "Figma";
  version: string;
  updatedAt: string;
  status: "ready" | "review" | "draft" | "archived";
  comments: number;
  designer: { name: string; avatar: string };
  project: { id: number; title: string; status: string };
};

type Props = {
  files: DesignFile[];
  selectedFileId: number | null;
  onSelect: (id: number) => void;
  onView: (id: number) => void;
};

export default function DesignFilesGrid({
  files,
  selectedFileId,
  onSelect,
  onView,
}: Props) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {files.map((file) => (
        <DesignFileCard
          key={file.id}
          file={file}
          active={selectedFileId === file.id}
          onClick={() => onSelect(file.id)}
          onView={() => onView(file.id)}
        />
      ))}
    </section>
  );
}
