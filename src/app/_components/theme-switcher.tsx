"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <button
      aria-label="theme-switcher"
      className="text-black dark:text-white"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <MoonIcon className="h-4 w-4" />
      ) : (
        <SunIcon className="h-4 w-4" />
      )}
    </button>
  );
}
