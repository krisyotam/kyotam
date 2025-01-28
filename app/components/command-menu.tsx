"use client"

import { useState, useEffect } from "react"
import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { Home, User, BookOpen, FileText, Info, Clock, Sun, Moon } from "lucide-react"
import { SnowEffect } from "./snow-effect"
import { useTheme } from "next-themes"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState(new Date())
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40" />
          <SnowEffect />
        </>
      )}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-[#FCFCFC] dark:bg-gray-800 w-[42px] h-[42px] rounded-[4px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] hover:bg-[#F5F5F5] dark:hover:bg-gray-700 focus:outline-none text-[13px] font-mono border border-[#EBEBEB] dark:border-gray-700 flex items-center justify-center"
      >
        ⌘K
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[440px] bg-white dark:bg-dark-bg rounded-xl shadow-2xl border border-gray-200 dark:border-dark-accent z-50"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-dark-accent text-sm text-gray-500 dark:text-dark-muted">
          <span>Chicago, US {time.toLocaleTimeString("en-US", { hour12: false })}</span>
          <button
            onClick={toggleTheme}
            className="text-gray-500 dark:text-dark-muted hover:text-gray-700 dark:hover:text-gray-200"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <Command.Input
          placeholder="Type a command or search..."
          className="w-full px-4 py-3 text-gray-600 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 border-b border-gray-100 dark:border-dark-accent focus:outline-none text-sm bg-transparent"
        />

        <Command.List className="py-2 px-2">
          <Command.Group heading="Pages" className="px-2 py-1 text-xs text-gray-400 dark:text-dark-muted uppercase">
            <Command.Item
              onSelect={() => runCommand(() => router.push("/"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-accent cursor-pointer"
            >
              <Home size={16} /> Home
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/about"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-accent cursor-pointer"
            >
              <User size={16} /> About
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/blog"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-accent cursor-pointer"
            >
              <BookOpen size={16} /> Blog
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Info" className="mt-2 px-2 py-1 text-xs text-gray-400 dark:text-dark-muted uppercase">
            <Command.Item
              onSelect={() => runCommand(() => router.push("/notes"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-accent cursor-pointer"
            >
              <FileText size={16} /> Notes
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/colophon"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-accent cursor-pointer"
            >
              <Info size={16} /> Colophon
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/now"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-accent cursor-pointer"
            >
              <Clock size={16} /> Now
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 dark:border-dark-accent">
          <span className="text-sm text-gray-500 dark:text-dark-muted">krisyotam@protonmail.com</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-dark-muted">Close</span>
            <span className="text-xs text-gray-400 dark:text-dark-muted px-1 py-0.5 border border-gray-200 dark:border-dark-accent rounded">
              ESC
            </span>
          </div>
        </div>
      </Command.Dialog>
    </>
  )
}

