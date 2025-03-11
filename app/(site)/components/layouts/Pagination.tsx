"use client";
import { usePathname } from "next/navigation";
import { PaginationLink } from "../types/CategoryRes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Pagination({
  links,
  className,
}: {
  links: PaginationLink[];
  className?: string;
}) {
  const pathname = usePathname();

  if (!links || links.length <= 10) return null;

  return (
    <div className={`flex justify-center gap-1 mt-8 ${className || ""}`}>
      {links.map((link, index) => {
        // Lấy query page=... từ URL API nếu có
        const url = link.url
          ? `${pathname}${
              link.url.includes("?")
                ? link.url.slice(link.url.indexOf("?"))
                : ""
            }`
          : null;

        const label = link.label.replace(/&laquo;|&raquo;/g, (match) =>
          match.includes("laquo") ? "«" : "»"
        );

        return (
          <Link href={url || "#"} key={index} passHref legacyBehavior>
            <Button
              variant={link.active ? "default" : "outline"}
              size="sm"
              disabled={!url}
              className="min-w-[32px] px-2"
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
