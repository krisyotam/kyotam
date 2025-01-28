import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import { LiveTimer } from "../components/live-timer";

interface AboutData {
  name: string;
  title: string;
  whatIDo: string;
  whatImLookingFor: string;
  favorites: {
    title: string;
    items: Array<{ label: string; value: string }>;
  };
  everyday: {
    title: string;
    items: Array<{ label: string; value: string }>;
  };
  elsewhere: {
    title: string;
    items: Array<{ label: string; value: string }>;
  };
}

async function getAboutData() {
  const jsonDirectory = path.join(process.cwd(), "app/data");
  const fileContents = await fs.readFile(jsonDirectory + "/about.json", "utf8");
  return JSON.parse(fileContents) as AboutData;
}

export const metadata = {
  title: "About - Kris Yotam",
  description: "Learn more about Kris Yotam",
};

export default async function About() {
  const data = await getAboutData();

  return (
    <main className="max-w-2xl mx-auto px-4">
      <div className="flex items-start gap-4 mb-8">
        <Image
          src="/ProfilePicturePhoto.jpg"
          alt={data.name}
          width={48}
          height={48}
          className="rounded-full"
          unoptimized
        />
        <div>
          <h1 className="text-[15px] font-normal">{data.name}</h1>
          <p className="text-[14px] text-gray-600 dark:text-dark-text">{data.title}</p>
        </div>
      </div>

      <LiveTimer />

      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">What I do now</h2>
        <p className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">{data.whatIDo}</p>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">What am I looking for</h2>
        <p className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">{data.whatImLookingFor}</p>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">Favourites</h2>
        <p className="text-[14px] text-gray-600 dark:text-dark-text mb-4">{data.favorites.title}</p>
        <div className="space-y-2">
          {data.favorites.items.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="font-mono text-[13px] text-gray-500 dark:text-dark-muted">{item.label}</div>
              <div className="font-mono text-[13px]">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">Everyday</h2>
        <p className="text-[14px] text-gray-600 dark:text-dark-text mb-4">{data.everyday.title}</p>
        <div className="space-y-2">
          {data.everyday.items.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="font-mono text-[13px] text-gray-500 dark:text-dark-muted">{item.label}</div>
              <div className="font-mono text-[13px]">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">Elsewhere</h2>
        <p className="text-[14px] text-gray-600 dark:text-dark-text mb-4">{data.elsewhere.title}</p>
        <div className="space-y-2">
          {data.elsewhere.items.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="font-mono text-[13px] text-gray-500 dark:text-dark-muted">{item.label}</div>
              <div className="font-mono text-[13px]">
                {item.label.toLowerCase() === "mail" ? (
                  <span>{item.value}</span>
                ) : (
                  <a
                    href={`https://${item.label.toLowerCase()}.com/${item.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70"
                  >
                    {item.value}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 mb-8 font-mono text-[13px] text-gray-400 dark:text-dark-muted">
        © 2024 Kris Yotam
      </footer>
    </main>
  );
}
