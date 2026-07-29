"use client";

import Image from "next/image";
import { Eye, MessageCircle, Clock, FolderKanban } from "lucide-react";
import DesignStatusBadge from "./DesignStatusBadge";
import { Button } from "@/components/ui/button";

type DesignFile = {
  id: number;
  name: string;
  preview: string;
  tool: "Figma";
  version: string;
  updatedAt: string;
  designer: { name: string; avatar: string };
  status: "ready" | "review" | "draft" | "archived";
  comments: number;
  project: { id: number; title: string; status: string };
};

type Props = {
  file: DesignFile;
  active?: boolean;
  onClick?: () => void;
  onView?: () => void;
};

export default function DesignFileCard({
  file,
  active = false,
  onClick,
  onView,
}: Props) {
  return (
    <article
      onClick={onClick}
      className={`group cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300 shadow-xl
      ${
        active
          ? "border-emerald-500/50 bg-primary-800/30 shadow-[0_0_60px_rgba(52,211,153,.15)]"
          : "border-primary-600/30 bg-primary-700/30 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_50px_rgba(52,211,153,.12)]"
      }`}
    >
      {/* Preview */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={file.preview}
          alt={file.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          unoptimized // ← این خط رو اضافه کن
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-400/70 via-primary-200/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur">
          {file.tool}
        </span>
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-primary-300/40 px-3 py-1 text-xs text-primary-800 backdrop-blur">
          {file.version}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-5 p-5">
        {/* Project badge */}
        <div className="flex items-center justify-end gap-2 text-xs text-emerald-400/90">
          <span className="truncate font-medium">{file.project.title}</span>
          <FolderKanban className="size-3.5" />
        </div>

        <div>
          <h3 className="line-clamp-1 text-lg font-bold text-primary-300">
            {file.name}
          </h3>
        </div>

        {/* Designer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
              <Image
                src={file.designer.avatar}
                alt={file.designer.name}
                fill
                className="object-cover object-top"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-300">
                {file.designer.name}
              </p>
              <p className="text-xs text-primary-500">طراح رابط کاربری</p>
            </div>
          </div>
          <DesignStatusBadge status={file.status} />
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between border-y border-primary-300/5 py-4">
          <div className="flex items-center gap-2 text-sm text-primary-400">
            <Clock className="size-4" />
            <span>{file.updatedAt}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-400">
            <MessageCircle className="size-4" />
            <span>{file.comments}</span>
          </div>
        </div>

        {/* دکمه مشاهده */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
          className="flex h-11 w-full rounded-2xl border border-primary-300/10 bg-primary-300/5 text-sm font-medium transition hover:border-emerald-500/40 hover:bg-emerald-500/10 shadow"
        >
          <Eye className="size-4 ml-1" />
          مشاهده فایل
        </Button>
      </div>
    </article>
  );
}
