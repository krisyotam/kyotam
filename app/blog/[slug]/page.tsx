import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  introduction?: string;
  bodyParagraph1?: string;
  bodyParagraph2?: string;
  bodyParagraph3?: string;
  bodyParagraph4?: string;
  bodyParagraph5?: string;
  bodyParagraph6?: string;
  bodyParagraph7?: string;
  bodyParagraph8?: string;
  bodyParagraph9?: string;
  conclusion?: string;
  tags?: string[];
}

async function getBlogPosts() {
  const jsonDirectory = path.join(process.cwd(), "app/data");
  const fileContents = await fs.readFile(jsonDirectory + "/blog-posts.json", "utf8");
  return JSON.parse(fileContents) as BlogPost[];
}

async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  const post = posts.find((post) => post.slug === slug);
  if (!post) notFound();
  return post;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  return {
    title: `${post.title} - Kris Yotam`,
    description: post.introduction,
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <main className="max-w-2xl mx-auto px-4">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <header className="mb-8 not-prose">
          <h1 className="text-[15px] font-normal mb-1">{post.title}</h1>
          <div className="flex justify-between items-center text-[13px] text-gray-500 dark:text-dark-muted">
            <span>{post.author}</span>
            <time>{format(parseISO(post.date), "dd-MM-yyyy")}</time>
          </div>
        </header>

        <div className="text-[14px] leading-relaxed space-y-4 text-gray-800 dark:text-dark-text">
          {post.introduction && <p>{post.introduction}</p>}
          {post.bodyParagraph1 && <p>{post.bodyParagraph1}</p>}
          {post.bodyParagraph2 && <p>{post.bodyParagraph2}</p>}
          {post.bodyParagraph3 && <p>{post.bodyParagraph3}</p>}
          {post.bodyParagraph4 && <p>{post.bodyParagraph3}</p>}
          {post.bodyParagraph5 && <p>{post.bodyParagraph3}</p>}
          {post.bodyParagraph6 && <p>{post.bodyParagraph3}</p>}
          {post.bodyParagraph7 && <p>{post.bodyParagraph3}</p>}
          {post.bodyParagraph8 && <p>{post.bodyParagraph3}</p>}
          {post.bodyParagraph9 && <p>{post.bodyParagraph3}</p>}
          {post.conclusion && <p>{post.conclusion}</p>}
        </div>

        {post.tags && (
          <div className="mt-8">
            <h2 className="text-[13px] font-mono mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[12px] bg-gray-100 dark:bg-dark-accent px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      <footer className="mt-16 mb-8 font-mono text-[13px] text-gray-400 dark:text-dark-muted">© 2024 Kris Yotam</footer>
    </main>
  );
}
