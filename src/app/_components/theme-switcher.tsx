"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, theme, systemTheme } = useTheme();

  console.log(theme, systemTheme);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  if (theme === "system") {
    return (
      <button
        aria-label="theme-switcher"
        className="text-black dark:text-white"
        onClick={() => setTheme(systemTheme === "dark" ? "light" : "dark")}
      >
        {systemTheme === "dark" ? (
          <MoonIcon className="h-4 w-4" />
        ) : (
          <SunIcon className="h-4 w-4" />
        )}
      </button>
    );
  }

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
