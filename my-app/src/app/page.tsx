import LinePlot from "@/components/LinePlot";
import Box from "@/components/Box";
import ML_ALGOS from "@/data";

export default function Home() {
  return (
    <div>
      <h1 className=" mt-5 text-4xl text-left sm:text-center font-bold">
        Algorithm Visualizer
      </h1>

      <ol className="mb-5 mt-5 list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Get Started By Clicking on any of the Box Below
        </li>
        <li>Modify and see your changes instantly.</li>
      </ol>
      <div className="flex justify-center flex-wrap gap-8 mb-4 mt-5">
        {ML_ALGOS.map((algo) => (
          <Box
            key={algo.id}
            id={algo.id}
            name={algo.name}
            description={algo.description}
            href={algo.href}
          />
        ))}
      </div>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://parajulisudip.com.np"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created With Love ❤️ by @sudipnext
        </a>
      </footer>
    </div>
  );
}
