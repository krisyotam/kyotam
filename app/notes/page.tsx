import { promises as fs } from "fs"
import path from "path"

interface Note {
  date: string
  quote: string
  quoteAuthor: string
  note: string
}

async function getNotes() {
  const jsonDirectory = path.join(process.cwd(), "app/data")
  const fileContents = await fs.readFile(jsonDirectory + "/notes.json", "utf8")
  return JSON.parse(fileContents) as Note[]
}

export const metadata = {
  title: "Notes - Kris Yotam",
  description: "A collection of quotes and thoughts",
}

export default async function Notes() {
  const notes = await getNotes()

  return (
    <main className="max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-xl font-normal mb-4">Notes ({notes.length})</h1>
        <p className="text-gray-600 dark:text-dark-text">
          This page is just a collection of quotes that I liked, along with some of my thoughts around them.
        </p>
      </div>

      <div className="space-y-4">
        {notes.map((note, index) => (
          <div key={index} className="bg-[#F7F7F7] dark:bg-dark-accent p-6 rounded-lg">
            <div className="mb-6 text-sm text-gray-500 dark:text-dark-muted">{note.date}</div>
            <div className="space-y-4">
              <div className="font-mono text-[15px] leading-relaxed dark:text-dark-text">{note.quote}</div>
              <div className="font-mono text-[15px] text-gray-500 dark:text-dark-muted">- {note.quoteAuthor}</div>
              <div className="text-[15px] leading-relaxed text-gray-600 dark:text-dark-text">{note.note}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

