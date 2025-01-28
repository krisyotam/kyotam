import { promises as fs } from "fs"
import path from "path"
import Link from "next/link"
import { format, parseISO } from "date-fns"

interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  introduction: string
}

async function getBlogPosts() {
  const jsonDirectory = path.join(process.cwd(), "app/data")
  const fileContents = await fs.readFile(jsonDirectory + "/blog-posts.json", "utf8")
  return JSON.parse(fileContents) as BlogPost[]
}

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <main className="max-w-2xl mx-auto px-4">
      <h1 className="text-[15px] font-normal mb-8">Field notes ({posts.length})</h1>

      <div className="space-y-8 mb-12">
        {posts.map((post) => (
          <div key={post.slug} className="border-b border-gray-200 dark:border-dark-accent pb-8 last:border-b-0">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="font-mono text-[14px] group-hover:opacity-70 mb-2">{post.title}</h2>
              <p className="text-[14px] text-gray-600 dark:text-dark-text mb-2 line-clamp-2">{post.introduction}</p>
              <div className="flex justify-between items-center text-[13px] text-gray-500 dark:text-dark-muted">
                <span>{post.author}</span>
                <span>{format(parseISO(post.date), "dd-MM-yyyy")}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <footer className="mt-16 mb-8 font-mono text-[13px] text-gray-400 dark:text-dark-muted">© 2024 Kris Yotam</footer>
    </main>
  )
}

