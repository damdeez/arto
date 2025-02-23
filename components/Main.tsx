import ArtoPic from "../assets/arto-on-porch.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Summary from "./Summary";

function Main() {
  const [summary, setSummary] = useState<string | null>("");

  useEffect(() => {
    // Get analysis from Local Storage
    const savedSummary = localStorage.getItem("artoAnalysis");
    setSummary(savedSummary);
  }, []);

  return (
    <main className="flex flex-col items-center height-full mt-4 sm:items-center sm:gap-6 sm:py-4">
      Arto, a dog.
      <Image
        src={ArtoPic}
        alt="arto"
        className="w-90 mt-4 shadow-xl rounded-lg"
      />
      <Summary summary={summary} />
    </main>
  );
}

export default Main;
