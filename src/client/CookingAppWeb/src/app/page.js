import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-customOrange">
      <h1 className="text-4xl font-bold text-black">Welcome</h1>
      <p className="mt-4 text-lg text-black">Next.js with Tailwind CSS.</p>
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
        className="mt-8"
      />
    </main>
  );
}
