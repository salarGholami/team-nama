"use client";

import { useState } from "react";
import {
  GitCommit,
  MessageSquare,
  FileCode2,
  Send,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Commit, CommitComment } from "../page";

type Props = {
  commit: Commit;
  comments: CommitComment[];
  onAddComment: (text: string) => void;
};

const typeColors: Record<string, string> = {
  feat: "bg-emerald-500/20 text-emerald-400",
  fix: "bg-blue-500/20 text-blue-400",
  refactor: "bg-purple-500/20 text-purple-400",
  style: "bg-amber-500/20 text-amber-400",
  chore: "bg-slate-500/20 text-slate-400",
};

export default function CommitDetailPanel({
  commit,
  comments,
  onAddComment,
}: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text);
    setText("");
  };

  return (
    <div className="h-full flex flex-col rounded-2xl border border-primary-600/30 bg-primary-800/40 overflow-hidden">
      {/* هدر جزئیات */}
      <div className="p-5 border-b border-primary-600/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitCommit className="size-4 text-muted-foreground" />
            <code className="text-sm font-mono text-primary-300">
              {commit.hash}
            </code>
          </div>
          <span className="text-xs text-muted-foreground">
            {commit.time} • {commit.date}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-md font-medium ${typeColors[commit.type]}`}
          >
            {commit.type}
          </span>
          <h2 className="font-semibold text-[15px] leading-snug">
            {commit.message.replace(
              /^(feat|fix|refactor|style|chore):\s*/i,
              "",
            )}
          </h2>
        </div>

        {commit.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            {commit.description}
          </p>
        )}

        <div className="flex items-center gap-4 mt-4 text-sm">
          <span className="text-emerald-400 font-medium">
            +{commit.additions}
          </span>
          <span className="text-red-400 font-medium">-{commit.deletions}</span>
          <span className="text-muted-foreground flex items-center gap-1">
            <FileCode2 className="size-3.5" />
            {commit.filesChanged} فایل تغییر کرده
          </span>
        </div>
      </div>

      {/* فایل‌های تغییر کرده */}
      <div className="px-5 py-3 border-b border-primary-600/30">
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
          <FileCode2 className="size-3.5" />
          فایل‌های تغییر کرده
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-primary-700/60 px-2.5 py-1 rounded-lg font-mono">
            auth.tsx <span className="text-emerald-400">+64</span>{" "}
            <span className="text-red-400">-8</span>
          </span>
          <span className="text-xs bg-primary-700/60 px-2.5 py-1 rounded-lg font-mono">
            login.tsx <span className="text-emerald-400">+45</span>{" "}
            <span className="text-red-400">-12</span>
          </span>
          <span className="text-xs bg-primary-700/60 px-2.5 py-1 rounded-lg font-mono">
            +{Math.max(0, commit.filesChanged - 2)} فایل دیگر
          </span>
        </div>
      </div>

      {/* گفتگوها */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-none">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            گفتگوها ({comments.length})
          </span>
        </div>

        <div className="space-y-4 ">
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8 ">
              هنوز نظری ثبت نشده
            </p>
          ) : (
            comments.map((cm) => (
              <div key={cm.id} className="flex gap-3 shadow-xl">
                <img
                  src={cm.user?.avatar}
                  alt={cm.user?.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 bg-primary-900/50 rounded-2xl rounded-tr-sm px-3.5 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{cm.user?.name}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {cm.createdAt}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-primary-100">
                    {cm.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* فرم ثبت نظر */}
      <div className="p-4 border-t border-primary-600/30">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-primary-700/50 text-muted-foreground transition"
          >
            <Paperclip className="size-4" />
          </button>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="flex-1 h-10 text-sm"
          />
          <Button
            type="submit"
            className="rounded-xl h-10 w-10 bg-emerald-600 hover:bg-emerald-500"
          >
            <Send className="size-4" />
          </Button>
        </form>
        <p className="text-[11px] text-muted-foreground mt-2 text-center">
          راهنمای ثبت نظر
        </p>
      </div>
    </div>
  );
}
