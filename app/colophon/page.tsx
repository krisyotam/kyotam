import { promises as fs } from "fs"
import path from "path"

interface ColophonData {
  site: {
    description: string
  }
  type: {
    title: string
    value: string
  }
  design: {
    description: string
    principles: Array<{
      label: string
      value: string
    }>
  }
  stack: {
    description: string
    tools: Array<{
      name: string
      description: string
    }>
  }
}

async function getColophonData() {
  const jsonDirectory = path.join(process.cwd(), "app/data")
  const fileContents = await fs.readFile(jsonDirectory + "/colophon.json", "utf8")
  return JSON.parse(fileContents) as ColophonData
}

export const metadata = {
  title: "Colophon - Kris Yotam",
  description: "Details about this website",
}

export default async function Colophon() {
  const data = await getColophonData()

  return (
    <main className="max-w-2xl mx-auto px-4">
      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">Site</h2>
        <p className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">{data.site.description}</p>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">{data.type.title}</h2>
        <p className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">{data.type.value}</p>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">Design</h2>
        <p className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text mb-6">{data.design.description}</p>
        <div className="space-y-4">
          {data.design.principles.map((principle, index) => (
            <div key={index} className="grid grid-cols-[120px,1fr] gap-4">
              <div className="font-mono text-[13px] text-gray-500 dark:text-dark-muted">{principle.label}</div>
              <div className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">{principle.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-[13px] mb-3">Stack</h2>
        <p className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text mb-6">{data.stack.description}</p>
        <div className="space-y-4">
          {data.stack.tools.map((tool, index) => (
            <div key={index} className="grid grid-cols-[120px,1fr] gap-4">
              <div className="font-mono text-[13px] text-gray-500 dark:text-dark-muted">{tool.name}</div>
              <div className="text-[14px] leading-relaxed text-gray-600 dark:text-dark-text">{tool.description}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 mb-8 font-mono text-[13px] text-gray-400 dark:text-dark-muted">© 2024 Kris Yotam</footer>
    </main>
  )
}

