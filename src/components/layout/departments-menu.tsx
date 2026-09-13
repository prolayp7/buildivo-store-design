"use client";

import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { departments } from "@/data/categories";

export function DepartmentsMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg bg-graphite-800 px-space-md py-2.5 text-text-inverse transition-colors hover:bg-graphite-700 lg:flex"
        >
          <span aria-hidden className="material-symbols-outlined text-[20px]">
            roofing
          </span>
          <span className="text-label-lg font-label-lg font-semibold">Departments</span>
          <span aria-hidden className="material-symbols-outlined text-[18px]">
            expand_more
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(90vw,640px)] p-4">
        <p className="mb-3 px-1 text-label-sm font-label-sm font-semibold uppercase tracking-wide text-text-disabled">Shop by Department</p>
        <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {departments.map((dept) => (
            <li key={dept.slug}>
              <Link
                href={`/c/${dept.slug}`}
                className="flex items-center gap-2.5 rounded-lg p-2.5 text-body-sm font-body-sm text-text-primary transition-colors hover:bg-surface-container-low"
              >
                <span aria-hidden className="material-symbols-outlined text-[20px] text-orange-600">
                  {dept.icon}
                </span>
                <span className="flex flex-col">
                  {dept.name}
                  <span className="text-label-sm font-label-sm text-text-disabled">{dept.productCount.toLocaleString()}+ lines</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
