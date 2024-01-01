"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return (
    <main>
      <p onClick={() => router.push("/Dashboard")}>Sign In</p>
    </main>
  );
}
