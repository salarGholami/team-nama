"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import db from "@/data/db.json";
import Pagination from "@/components/ui/Pagination";

import DesignFilesHeader from "./_components/DesignFilesHeader";
import DesignFilesToolbar from "./_components/DesignFilesToolbar";
import DesignFilesGrid from "./_components/DesignFilesGrid";

type FileStatus = "ready" | "review" | "draft" | "archived";
type DesignTool = "Figma";

type DesignFile = {
  id: number;
  projectId: number;
  ownerId: number;
  name: string;
  tool: DesignTool;
  preview: string;
  version: string;
  updatedAt: string;
  status: FileStatus;
  comments: number;
  designer: {
    name: string;
    avatar: string;
  };
  project: {
    id: number;
    title: string;
    status: string;
  };
};

const PAGE_SIZE = 4;

export default function FrontendDeveloperDesignFilesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | FileStatus>("all");
  const [sort, setSort] = useState<"latest" | "oldest" | "name" | "comments">(
    "latest",
  );
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const files = useMemo<DesignFile[]>(() => {
    return db.designFiles.map((file) => {
      const owner = db.users.find((user) => user.id === file.ownerId);
      const project = db.projects.find((p) => p.id === file.projectId);

      return {
        id: file.id,
        projectId: file.projectId,
        ownerId: file.ownerId,
        name: file.name,
        tool: file.tool as DesignTool,
        preview: file.preview,
        version: file.version,
        updatedAt: file.updatedAt,
        status: file.status as FileStatus,
        comments: file.comments,
        designer: {
          name: owner?.name ?? "نامشخص",
          avatar: owner?.avatar ?? "/images/avatars/employees/default.png",
        },
        project: {
          id: project?.id ?? 0,
          title: project?.title ?? "پروژه نامشخص",
          status: project?.status ?? "unknown",
        },
      };
    });
  }, []);

  const filteredAndSortedFiles = useMemo(() => {
    let result = [...files];

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter(
        (file) =>
          file.name.toLowerCase().includes(query) ||
          file.designer.name.toLowerCase().includes(query) ||
          file.version.toLowerCase().includes(query) ||
          file.project.title.toLowerCase().includes(query),
      );
    }

    if (status !== "all") {
      result = result.filter((file) => file.status === status);
    }

    switch (sort) {
      case "oldest":
        result = [...result].reverse();
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
      case "comments":
        result = [...result].sort((a, b) => b.comments - a.comments);
        break;
      default:
        result = [...result].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
    }

    return result;
  }, [files, search, status, sort]);

  useEffect(() => {
    setPage(1);
  }, [search, status, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedFiles.length / PAGE_SIZE),
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedFiles = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAndSortedFiles.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedFiles, page]);

  const handleViewFile = (fileId: number) => {
    router.push(`/dashboard/FrontendDeveloper/DesignFiles/${fileId}`);
  };

  const from =
    filteredAndSortedFiles.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filteredAndSortedFiles.length);

  return (
    <div className="space-y-8 p-6 md:p-8">
      <DesignFilesHeader />

      <DesignFilesToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={(value) => setStatus(value as "all" | FileStatus)}
        sort={sort}
        onSortChange={(value) =>
          setSort(value as "latest" | "oldest" | "name" | "comments")
        }
      />

      {filteredAndSortedFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-primary-300/10 bg-primary-700/80 py-20 text-center">
          <p className="text-lg font-medium text-primary-300">
            فایلی با این فیلترها پیدا نشد
          </p>
          <p className="mt-2 text-sm text-primary-500">
            جستجو یا وضعیت را تغییر دهید
          </p>
        </div>
      ) : (
        <>
          <DesignFilesGrid
            files={paginatedFiles}
            selectedFileId={selectedFileId}
            onSelect={setSelectedFileId}
            onView={handleViewFile}
          />

          <div className="flex flex-col items-center justify-between gap-4 border-t border-primary-600/20 pt-6 sm:flex-row">
            <p className="text-sm text-primary-400">
              نمایش{" "}
              <span className="font-medium text-primary-300">
                {from}–{to}
              </span>{" "}
              از{" "}
              <span className="font-medium text-primary-300">
                {filteredAndSortedFiles.length}
              </span>{" "}
              فایل
            </p>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
