import Link from "next/link"

export default function Home() {
  return (
    <main className="space-y-6">
      <div className="space-y-4">
        <p>
          I run{" "}
          <Link href="https://claritydev.co" className="underline">
            Clarity
          </Link>
          , a modern SaaS. These days I'm thinking a lot about
          AI agents.
        </p>

        <p>
          In my spare time I enjoy studying technology more broadly — history, market currents, emerging research, see more on my{" "}
          <Link href="/investing" className="underline">
            Investing
          </Link>{" "}
          page.
        </p>

        <p>
          I'm a self-taught engineer, IU Student, OSSU supporter, & IAS friend. I grew up in Illinois and currently
          reside in Greece.
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-dark-accent" />

      <div className="space-y-2 pt-6">
        <Link
          href="https://linkedin.com/in/krisyotam"
          className="block text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-gray-300"
        >
          LinkedIn (/krisyotam)
        </Link>
        <Link
          href="https://twitter.com/krisyotam"
          className="block text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-gray-300"
        >
          Twitter (@krisyotam)
        </Link>
        <Link
          href="https://mastodon.social/@krisyotam"
          className="block text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-gray-300"
        >
          Mastodon (@krisyotam)
        </Link>
        <Link
          href="https://substack.com"
          className="block text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-gray-300"
        >
          Substack
        </Link>
      </div>
    </main>
  )
}

