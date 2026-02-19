import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass group relative overflow-hidden rounded-2xl border border-transparent p-6 transition-[color,border-color,box-shadow] duration-300",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
