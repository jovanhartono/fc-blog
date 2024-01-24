"use client";

import { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

export default function Search({ className }: { className?: string }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const params = new URLSearchParams(searchParams);
    if (search.value) {
      params.set("search", search.value);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className={cn("relative", className)}
      onSubmit={handleSearch}
      action="."
    >
      <label htmlFor="search" className="sr-only">
        search
      </label>
      <input
        autoComplete="off"
        defaultValue={searchParams.get("search")?.toString()}
        name="article"
        id="search"
        type="search"
        placeholder="Cari Artikel"
        className="w-full rounded-lg bg-transparent pl-9 text-base"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
    </form>
  );
}
