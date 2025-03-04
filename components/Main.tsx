"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import ArtoPic from "@/assets/arto-on-porch.jpg";
import Summary from "./Summary";

function Main() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>("");

  useEffect(() => {
    setLoading(true);
    async function fetchStatus() {
      const res = await fetch("/api/get-latest-status", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setSummary(data.latestStatus);
        setLoading(false);
      }
    }

    fetchStatus();
  }, []);

  return (
    <main className="flex flex-col items-center height-full mt-4 sm:items-center sm:gap-6 sm:py-4">
      Arto, a dog.
      <Image
        src={ArtoPic}
        alt="arto"
        className="w-90 mt-4 shadow-xl rounded-lg"
      />
      <Summary loading={loading} summary={summary ? summary : ''} />
    </main>
  );
}

export default Main;
