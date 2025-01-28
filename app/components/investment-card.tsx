interface InvestmentCardProps {
  name: string
  description: string
  link?: string
  category: string
  status?: "active" | "sold"
}

export function InvestmentCard({ name, description, link, category, status }: InvestmentCardProps) {
  const Content = () => (
    <div className="space-y-1 group">
      <div className="flex items-center justify-between">
        <h3 className="font-medium group-hover:opacity-75">
          {name} {link && "↗"}
        </h3>
        {category === "BCA" && status && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
          >
            {status}
          </span>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-300 group-hover:opacity-75">{description}</p>
    </div>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
        <Content />
      </a>
    )
  }

  return (
    <div className="group">
      <Content />
    </div>
  )
}

