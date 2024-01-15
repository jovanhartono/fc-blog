"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      aria-label="theme-switcher"
      className="text-black dark:text-white"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <MoonIcon className="h-4 w-4" /> : null}
      {theme === "light" ? <SunIcon className="h-4 w-4" /> : null}
    </button>
  );
}
