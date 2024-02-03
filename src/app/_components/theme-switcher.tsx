"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  /* the server will pre-render a skeleton,
     which will be displayed to the user as they await the resolution of React hydration.
  */
  if (!mounted)
    return (
      <div className="size-4 animate-pulse rounded-lg bg-gray-100 lg:basis-1/2" />
    );

  return (
    <button
      aria-label="theme-switcher"
      className="size-4 text-black *:size-4 dark:text-white"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
