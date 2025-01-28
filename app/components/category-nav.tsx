"use client"

import { cn } from "@/lib/utils"

interface CategoryNavProps {
  categories: string[]
  activeCategory: string
  onChange: (category: string) => void
}

export function CategoryNav({ categories, activeCategory, onChange }: CategoryNavProps) {
  return (
    <nav className="flex items-center gap-1 pb-6 overflow-x-auto scrollbar-hide">
      <button
        onClick={() => onChange("All")} // Trigger the onChange function passed as a prop
        className={cn(
          "px-4 py-2 text-sm rounded-full transition-colors whitespace-nowrap",
          activeCategory === "All" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)} // Trigger onChange for each category
          className={cn(
            "px-4 py-2 text-sm rounded-full transition-colors whitespace-nowrap",
            activeCategory === category
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          {category}
        </button>
      ))}
    </nav>
  )
}
