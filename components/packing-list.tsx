"use client"

import { useState } from "react"
import { Plus, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

// Define categories with their emojis and colors
const categories = [
  { id: "clothes", name: "Clothes", emoji: "👕", color: "bg-blue-100 dark:bg-blue-900" },
  { id: "toiletries", name: "Toiletries", emoji: "🧴", color: "bg-green-100 dark:bg-green-900" },
  { id: "tech", name: "Tech", emoji: "📱", color: "bg-purple-100 dark:bg-purple-900" },
  { id: "documents", name: "Documents", emoji: "📄", color: "bg-yellow-100 dark:bg-yellow-900" },
  { id: "essentials", name: "Essentials", emoji: "🔑", color: "bg-red-100 dark:bg-red-900" },
]

// Define item type
type PackingItem = {
  id: string
  name: string
  category: string
  packed: boolean
}

// Sample initial items
const initialItems: PackingItem[] = [
  { id: "1", name: "T-shirts (5)", category: "clothes", packed: false },
  { id: "2", name: "Jeans", category: "clothes", packed: true },
  { id: "3", name: "Toothbrush", category: "toiletries", packed: false },
  { id: "4", name: "Shampoo", category: "toiletries", packed: false },
  { id: "5", name: "Phone charger", category: "tech", packed: true },
  { id: "6", name: "Laptop", category: "tech", packed: false },
  { id: "7", name: "Passport", category: "documents", packed: false },
  { id: "8", name: "Wallet", category: "essentials", packed: false },
]

export default function PackingList() {
  const [items, setItems] = useState<PackingItem[]>(initialItems)
  const [newItemName, setNewItemName] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("essentials")

  // Add a new item
  const addItem = () => {
    if (newItemName.trim() === "") return

    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: newItemCategory,
      packed: false,
    }

    setItems([...items, newItem])
    setNewItemName("")
  }

  // Toggle item packed status
  const togglePacked = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)))
  }

  // Delete an item
  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  // Group items by category
  const itemsByCategory = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, PackingItem[]>,
  )

  // Calculate progress
  const totalItems = items.length
  const packedItems = items.filter((item) => item.packed).length
  const progress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your progress</h2>
          <span className="text-sm font-medium">
            {packedItems}/{totalItems} packed
          </span>
        </div>
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Add new item form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          Add New Item
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="What do you need to pack?"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-grow rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem()
            }}
          />
          <Select value={newItemCategory} onValueChange={setNewItemCategory}>
            <SelectTrigger className="w-full sm:w-[180px] rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <span>{category.emoji}</span>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={addItem}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="mr-1 h-5 w-5" />
            Add
          </Button>
        </div>
      </div>

      {/* Packing list by category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryItems = itemsByCategory[category.id] || []
          if (categoryItems.length === 0) return null

          return (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{category.emoji}</span>
                <h2 className="text-xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  {category.name}
                </h2>
              </div>

              <ul className="space-y-2">
                <AnimatePresence>
                  {categoryItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-3 p-3 rounded-lg ${category.color} transition-all duration-300`}
                    >
                      <button
                        onClick={() => togglePacked(item.id)}
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                          item.packed ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
                        } border-2 border-blue-500 dark:border-blue-400`}
                      >
                        {item.packed && <Check className="h-4 w-4" />}
                      </button>
                      <span
                        className={`flex-grow ${item.packed ? "line-through text-gray-500 dark:text-gray-400" : ""}`}
                      >
                        {item.name}
                      </span>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
