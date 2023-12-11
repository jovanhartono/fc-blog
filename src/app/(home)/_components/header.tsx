import Image from "next/image";
import Link from "next/link";

import HeaderLogo from "../../../../public/fc-logo-cropped.jpeg";

export default function Header() {
  return (
    <header className="container flex items-center justify-between py-6">
      <Link href="/">
        <Image
          width={150}
          height={100}
          src={HeaderLogo}
          alt={"fresclean header logo"}
        />
      </Link>
      <h1>some heading title</h1>
    </header>
  );
}
