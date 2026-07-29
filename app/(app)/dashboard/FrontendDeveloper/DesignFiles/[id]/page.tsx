"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  Clock,
  FolderKanban,
  ExternalLink,
} from "lucide-react";

import db from "@/data/db.json";
import DesignStatusBadge from "../_components/DesignStatusBadge";

export default function DesignFileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const fileId = Number(params.id);

  const file = useMemo(() => {
    const raw = db.designFiles.find((f) => f.id === fileId);
    if (!raw) return null;

    const owner = db.users.find((u) => u.id === raw.ownerId);
    const project = db.projects.find((p) => p.id === raw.projectId);

    return {
      ...raw,
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
  }, [fileId]);

  const comments = useMemo(() => {
    return (db.designFileComments || [])
      .filter((c) => c.designFileId === fileId)
      .map((c) => {
        const user = db.users.find((u) => u.id === c.userId);
        return {
          id: c.id,
          user: user?.name ?? "کاربر",
          avatar: user?.avatar ?? "/images/avatars/employees/default.png",
          text: c.text,
          date: c.createdAt,
        };
      });
  }, [fileId]);

  if (!file) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-xl text-zinc-300">فایل طراحی پیدا نشد</p>
        <button
          onClick={() => router.back()}
          className="rounded-2xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm text-white hover:bg-cyan-500/10"
        >
          بازگشت
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-cyan-500/30 hover:text-white"
        >
          <ArrowRight className="size-4" />
          بازگشت به فایل‌های طراحی
        </button>

        <div className="flex items-center gap-2 text-sm text-cyan-400">
          <FolderKanban className="size-4" />
          <span>{file.project.title}</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* تصویر اصلی */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70">
            <div className="relative aspect-[16/10]">
              <Image
                src={file.preview}
                alt={file.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-xl border-2 border-cyan-500/50">
              <Image
                src={file.preview}
                alt="preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* اطلاعات و نظرات */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold text-white">{file.name}</h1>
              <DesignStatusBadge status={file.status as any} />
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between text-zinc-400">
                <span>نسخه</span>
                <span className="font-medium text-white">{file.version}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>ابزار</span>
                <span className="font-medium text-cyan-300">{file.tool}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>آخرین به‌روزرسانی</span>
                <span className="flex items-center gap-1.5 font-medium text-white">
                  <Clock className="size-3.5" />
                  {file.updatedAt}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>تعداد نظرات</span>
                <span className="flex items-center gap-1.5 font-medium text-white">
                  <MessageCircle className="size-3.5" />
                  {file.comments}
                </span>
              </div>
            </div>

            {/* طراح */}
            <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
                <Image
                  src={file.designer.avatar}
                  alt={file.designer.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-medium text-white">{file.designer.name}</p>
                <p className="text-xs text-zinc-500">طراح رابط کاربری</p>
              </div>
            </div>

            <a
              href="#"
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              <ExternalLink className="size-4" />
              باز کردن در Figma
            </a>
          </div>

          {/* نظرات */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
              <MessageCircle className="size-5 text-cyan-400" />
              نظرات ({comments.length})
            </h2>

            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-white/5 bg-white/5 p-4"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src={c.avatar}
                          alt={c.user}
                          fill
                          className="object-cover object-top"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {c.user}
                        </p>
                        <p className="text-xs text-zinc-500">{c.date}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-zinc-300">{c.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500">هنوز نظری ثبت نشده است.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
