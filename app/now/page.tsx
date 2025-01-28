import { promises as fs } from "fs"
import path from "path"
import { format } from "date-fns"
import { CoolStuffModal } from "../components/cool-stuff-modal"
import { Check } from "lucide-react"

interface NowData {
  lastUpdated: string
  sideProjects: string[]
  newChallenges: string[]
  newFinds: string[]
  todo: {
    text: string
    completed: boolean
  }[]
}

interface CoolStuff {
  items: {
    title: string
    link: string
    date: string
  }[]
}

async function getData() {
  const jsonDirectory = path.join(process.cwd(), "app/data")
  const nowData = await fs.readFile(jsonDirectory + "/now.json", "utf8")
  const coolStuffData = await fs.readFile(jsonDirectory + "/cool-stuff.json", "utf8")

  return {
    now: JSON.parse(nowData) as NowData,
    coolStuff: JSON.parse(coolStuffData) as CoolStuff,
  }
}

export const metadata = {
  title: "Now - Kris Yotam",
  description: "What I'm currently up to",
}

export default async function Now() {
  const { now, coolStuff } = await getData()
  const lastUpdated = format(new Date(now.lastUpdated), "dd-MM-yyyy")

  return (
    <main className="max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-[15px] font-normal mb-1 flex items-baseline gap-1">
          <span>Now</span>
          <span className="text-gray-500 dark:text-dark-muted font-mono text-[13px]">
            (Last updated {lastUpdated} from Chicago)
          </span>
        </h1>

        <p className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">
          This now page was inspired by a concept from Derek Sivers, which is a living document on what I am currently
          doing, right now in my life.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="font-mono text-[13px] mb-3">Side projects</h2>
          <ul className="list-disc pl-4 space-y-1">
            {now.sideProjects.map((project, index) => (
              <li key={index} className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">
                {project}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-[13px] mb-3">New challenges</h2>
          <ul className="list-disc pl-4 space-y-1">
            {now.newChallenges.map((challenge, index) => (
              <li key={index} className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">
                {challenge}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-[13px] mb-3">New finds</h2>
          <ul className="list-disc pl-4 space-y-1">
            {now.newFinds.map((find, index) => (
              <li key={index} className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">
                {find}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-[13px] mb-3">To-do</h2>
          <div className="space-y-2">
            {now.todo.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div
                  className={`w-[18px] h-[18px] mt-[2px] border rounded flex items-center justify-center ${
                    item.completed ? "bg-gray-100 dark:bg-dark-accent" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {item.completed && <Check className="w-3 h-3 text-gray-500 dark:text-dark-muted" />}
                </div>
                <span
                  className={`text-[14px] leading-relaxed text-gray-600 dark:text-dark-text ${item.completed ? "line-through" : ""}`}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F7F7F7] dark:bg-dark-accent p-4 rounded-lg">
          <CoolStuffModal items={coolStuff.items} />
          <div className="mt-2 font-mono text-[13px] text-gray-600 dark:text-dark-text">
            {coolStuff.items[0].title} / {coolStuff.items[1].title}
          </div>
        </section>
      </div>

      <footer className="mt-16 mb-8 font-mono text-[13px] text-gray-400 dark:text-dark-muted">© 2024 Kris Yotam</footer>
    </main>
  )
}

