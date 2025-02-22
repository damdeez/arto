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
    <main className="flex flex-col items-center height-full mt-8 sm:items-center sm:gap-6 sm:py-4">
      Arto, a dog.
      <Summary summary={summary} />
      <Image
        src={ArtoPic}
        alt="arto"
        className="w-100 shadow-xl rounded-lg absolute -bottom-5"
      />
    </main>
  );
}

export default Main;
