"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CoolStuffItem {
  title: string;
  link: string;
  date: string;
}

interface CoolStuffModalProps {
  items: CoolStuffItem[];
}

export function CoolStuffModal({ items }: CoolStuffModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="font-mono text-[13px] hover:opacity-70">
        Cool stuff from 2025 ({items.length})
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-md rounded-lg p-6 shadow-lg 
          bg-white dark:bg-[#121212] dark:text-gray-300" // Light mode and dark mode styles
        >
          <DialogHeader>
            <DialogTitle className="font-mono text-[13px] text-gray-300">Cool stuff from 2025</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="block hover:opacity-70"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-[14px] text-gray-300">{item.title}</div>
                <div className="text-[13px] text-gray-500">{item.date}</div>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
