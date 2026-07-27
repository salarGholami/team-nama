"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import db from "@/data/db.json";
import CommitHeader from "./_components/CommitHeader";
import CommitFilters from "./_components/CommitFilters";
import CommitDetailPanel from "./_components/CommitDetailPanel";
import CommitList from "./_components/CommitList";
import CommitTimeline from "./_components/CommitTimeline";

export type Commit = {
  id: number;
  hash: string;
  message: string;
  branch: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  date: string;
  time: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  status: "merged" | "open" | "closed";
  type: "feat" | "fix" | "refactor" | "style" | "chore";
  project: string;
  description?: string;
};

export type CommitComment = {
  id: number;
  commitId: number;
  userId: number;
  text: string;
  createdAt: string;
  user?: {
    name: string;
    avatar: string;
  };
};

export default function CommitsPage() {
  const currentUserId = 3;

  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [commits, setCommits] = useState<Commit[]>([]);
  const [comments, setComments] = useState<CommitComment[]>([]);
  const [selectedCommitId, setSelectedCommitId] = useState<number | null>(null);
  const [activeCommitId, setActiveCommitId] = useState<number | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  // بارگذاری داده‌ها
  useEffect(() => {
    const mapped: Commit[] = (db.commits || []).map((c: any) => {
      const author = db.users.find((u) => u.id === c.authorId);
      const project = db.projects.find((p) => p.id === c.projectId);

      let type: Commit["type"] = "chore";
      if (c.message.startsWith("feat")) type = "feat";
      else if (c.message.startsWith("fix")) type = "fix";
      else if (c.message.startsWith("refactor")) type = "refactor";
      else if (c.message.startsWith("style")) type = "style";

      return {
        id: c.id,
        hash: c.hash,
        message: c.message,
        branch: c.branch,
        author: {
          id: c.authorId,
          name: author?.name || "نامشخص",
          avatar:
            author?.avatar ||
            "/images/avatar/workers/FrontendDevelopers/ali.jpg",
        },
        date: c.date?.split(" - ")[0] || c.date,
        time: c.date?.split(" - ")[1] || "",
        filesChanged: c.filesChanged,
        additions: c.additions,
        deletions: c.deletions,
        status: c.status,
        type,
        project: project?.title || "پروژه نامشخص",
        description: c.description || "",
      };
    });

    setCommits(mapped);
    if (mapped.length > 0) {
      setSelectedCommitId(mapped[0].id);
      setActiveCommitId(mapped[0].id);
    }

    const mappedComments: CommitComment[] = (db.commitComments || []).map(
      (cm: any) => {
        const user = db.users.find((u) => u.id === cm.userId);
        return {
          ...cm,
          user: {
            name: user?.name || "کاربر",
            avatar:
              user?.avatar ||
              "/images/avatar/workers/FrontendDevelopers/ali.jpg",
          },
        };
      },
    );
    setComments(mappedComments);
  }, []);

  // فیلتر
  const filteredCommits = useMemo(() => {
    let result = [...commits];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.message.toLowerCase().includes(q) ||
          c.hash.toLowerCase().includes(q) ||
          c.branch.toLowerCase().includes(q),
      );
    }

    if (branchFilter !== "all") {
      result = result.filter((c) => c.branch === branchFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    if (authorFilter !== "all") {
      result = result.filter((c) => c.author.id === Number(authorFilter));
    }

    if (typeFilter !== "all") {
      result = result.filter((c) => c.type === typeFilter);
    }

    return result;
  }, [commits, search, branchFilter, statusFilter, authorFilter, typeFilter]);

  // همگام‌سازی تایم‌لاین با اسکرول
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleScroll = () => {
      const items = container.querySelectorAll("[data-commit-id]");
      let closestId: number | null = null;
      let minDistance = Infinity;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerRect.top - 50);

        if (distance < minDistance) {
          minDistance = distance;
          closestId = Number(item.getAttribute("data-commit-id"));
        }
      });

      if (closestId) setActiveCommitId(closestId);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [filteredCommits]);

  const selectedCommit = commits.find((c) => c.id === selectedCommitId) || null;

  const handleAddComment = async (text: string) => {
    if (!text.trim() || !selectedCommitId) return;

    try {
      const res = await fetch(`/api/commits/${selectedCommitId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId,
          text: text.trim(),
          createdAt: new Date().toLocaleString("fa-IR"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا");

      setComments((prev) => [
        {
          ...data,
          user: {
            name: "علی رضایی",
            avatar: "/images/avatar/workers/FrontendDevelopers/ali.jpg",
          },
        },
        ...prev,
      ]);
    } catch (error: any) {
      alert("خطا در ثبت نظر: " + error.message);
    }
  };

const scrollToCommit = (id: number) => {
  setSelectedCommitId(id);
  setActiveCommitId(id);

  // کمی تأخیر برای اطمینان از رندر شدن
  requestAnimationFrame(() => {
    const container = listRef.current;
    if (!container) return;

    const element = container.querySelector(
      `[data-commit-id="${id}"]`,
    ) as HTMLElement;

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  });
};

  return (
    <div dir="rtl" className="flex flex-col h-[calc(100vh-80px)] gap-4">
      <div className="px-4 pt-2">
        <CommitHeader total={commits.length} />
        <CommitFilters
          search={search}
          setSearch={setSearch}
          branch={branchFilter}
          setBranch={setBranchFilter}
          status={statusFilter}
          setStatus={setStatusFilter}
          author={authorFilter}
          setAuthor={setAuthorFilter}
          type={typeFilter}
          setType={setTypeFilter}
          branches={Array.from(new Set(commits.map((c) => c.branch)))}
        />
      </div>

      <div className="flex flex-1 gap-4 px-4 pb-4 overflow-hidden">
        {/* تایم‌لاین */}
        <div className="w-[120px] shrink-0">
          <CommitTimeline
            commits={filteredCommits}
            activeId={activeCommitId}
            onSelect={scrollToCommit}
          />
        </div>

        {/* لیست */}
        <div className="flex-1 min-w-0" ref={listRef}>
          <CommitList
            commits={filteredCommits}
            selectedId={selectedCommitId}
            activeId={activeCommitId}
            onSelect={scrollToCommit}
          />
        </div>

        {/* جزئیات */}
        <div className="w-[380px] shrink-0">
          {selectedCommit ? (
            <CommitDetailPanel
              commit={selectedCommit}
              comments={comments.filter(
                (c) => c.commitId === selectedCommit.id,
              )}
              onAddComment={handleAddComment}
            />
          ) : (
            <div className="h-full rounded-2xl border border-primary-600/30 bg-primary-800/40 flex items-center justify-center text-muted-foreground">
              یک کامیت را انتخاب کنید
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
