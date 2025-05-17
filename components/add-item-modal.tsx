"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onAddItem: (category: string, name: string, emoji: string) => void
}

const emojis = {
  clothing: ["👕", "👖", "🧥", "🧦", "👔", "👗", "🧣", "🧤", "👒", "🩳"],
  gadgets: ["📱", "💻", "🎧", "📷", "🔌", "🔋", "⌚", "🖱️", "💾", "🎮"],
  toiletries: ["🧴", "🧼", "🪥", "💊", "🧻", "🪒", "🧪", "🧹", "🧷", "🩹"],
}

export default function AddItemModal({ isOpen, onClose, onAddItem }: AddItemModalProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("clothing")
  const [selectedEmoji, setSelectedEmoji] = useState(emojis.clothing[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAddItem(category, name, selectedEmoji)
      setName("")
      setCategory("clothing")
      setSelectedEmoji(emojis.clothing[0])
      onClose()
    }
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setSelectedEmoji(emojis[value as keyof typeof emojis][0])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Add New Item
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              className="rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <RadioGroup value={category} onValueChange={handleCategoryChange} className="grid grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clothing" id="clothing" />
                <Label htmlFor="clothing" className="cursor-pointer">
                  Clothing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gadgets" id="gadgets" />
                <Label htmlFor="gadgets" className="cursor-pointer">
                  Gadgets
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="toiletries" id="toiletries" />
                <Label htmlFor="toiletries" className="cursor-pointer">
                  Toiletries
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Choose an Emoji</Label>
            <div className="grid grid-cols-5 gap-2">
              {emojis[category as keyof typeof emojis].map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-2xl p-2 rounded-lg ${
                    selectedEmoji === emoji
                      ? "bg-purple-100 dark:bg-purple-900 border-2 border-purple-500"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
