import Image from "next/image";
import Link from "next/link";

import ThemeSwitcher from "@/app/_components/theme-switcher";

import HeaderLogo from "../../../public/fc-logo-cropped.jpeg";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-light shadow-md dark:bg-dark">
      <section className="container flex h-[76px] items-center justify-between">
        <Link href="/">
          <Image
            width={150}
            height={"29.3"}
            src={HeaderLogo}
            alt={"fresclean header logo"}
          />
        </Link>
        <ThemeSwitcher />
      </section>
    </header>
  );
}
