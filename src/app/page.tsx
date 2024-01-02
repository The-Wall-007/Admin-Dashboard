"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Link href="/Dashboard">Go to drawer menu</Link>
    </main>
  );
}
