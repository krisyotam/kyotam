"use client" // Mark this file as a client-side component

import { useState } from "react"
import { InvestmentCard } from "../components/investment-card"
import { CategoryNav } from "../components/category-nav"
import investments from "../data/investments.json"

// Get unique categories from investments
const categories = Array.from(new Set(investments.map((inv) => inv.category))).sort()

export default function Investing() {
  const [activeCategory, setActiveCategory] = useState("All") // State to track the active category

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category) // Update the active category state
  }

  // Filter investments based on the selected category
  const filteredInvestments =
    activeCategory === "All"
      ? investments
      : investments.filter((investment) => investment.category === activeCategory)

  return (
    <main>
      <div className="mb-8">
        <p className="text-gray-600 dark:text-dark-text">
          I invest in all sorts of software and hardware startups. I like to learn vicariously. Below are just a few investments from my 100+ portfolio.
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-dark-accent mb-8" />

      {/* Pass the state and handler to CategoryNav */}
      <CategoryNav categories={categories} activeCategory={activeCategory} onChange={handleCategoryChange} />

      <div className="space-y-8">
        {filteredInvestments.map((investment, index) => (
          <InvestmentCard
            key={index}
            name={investment.name}
            description={investment.description}
            link={investment.link}
            category={investment.category}
            // Ensure status is either "active", "sold", or undefined
            status={investment.status === "active" || investment.status === "sold" ? investment.status : undefined}
          />
        ))}
      </div>
    </main>
  )
}
