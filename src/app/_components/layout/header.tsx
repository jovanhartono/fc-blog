import Image from "next/image";
import Link from "next/link";

import ThemeSwitcher from "@/app/_components/theme-switcher";

import HeaderLogo from "../../../../public/fc-logo-cropped.jpeg";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-b-gray-200 bg-light dark:bg-dark">
      <section className="container flex h-[76px] items-center justify-between">
        <Link href="/">
          <Image
            width={150}
            height={"29.3"}
            src={HeaderLogo}
            alt={"fresclean header logo"}
          />
        </Link>
        <div className="flex items-center gap-3 lg:gap-6">
          <a
            target="_blank noopener noreferer"
            href="https://link.fresclean.id"
            className="relative flex h-7 items-center gap-3 rounded-xl bg-blue-500 px-3 dark:bg-blue-600"
          >
            <div className="absolute right-0 top-0 h-2 w-2 animate-ping rounded-full bg-blue-700 duration-500" />
            <span className="text-light">Konsultasi</span>
          </a>
          <ThemeSwitcher />
        </div>
      </section>
    </header>
  );
}
