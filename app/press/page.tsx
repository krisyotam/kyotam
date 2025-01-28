import { promises as fs } from "fs"
import path from "path"
import Link from "next/link"

export const metadata = {
  title: "Press - Kris Yotam",
  description: "Press coverage and media mentions",
}

interface PressItem {
  title: string
  url: string
}

async function getPressItems() {
  const jsonDirectory = path.join(process.cwd(), "app/data")
  const fileContents = await fs.readFile(jsonDirectory + "/press.json", "utf8")
  return JSON.parse(fileContents) as PressItem[]
}

export default async function Press() {
  const pressItems = await getPressItems()

  return (
    <main className="space-y-4">
      {pressItems.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          className="block text-gray-800 dark:text-dark-text hover:text-gray-600 dark:hover:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title} ↗
        </Link>
      ))}
    </main>
  )
}

