import Hero from "@/app/(home)/_components/hero";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <h1 className="font-heading text-5xl">
        An example app built using Next.js 13 server components.
      </h1>
      <p className="text-base text-black">Geist</p>
    </main>
  );
}
