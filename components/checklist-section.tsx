"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Plus, Check, RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"

// Define the item type
type Item = {
  id: string
  name: string
  emoji: string
  packed: boolean
}

// Define the category type
type Category = {
  id: string
  name: string
  emoji: string
  items: Item[]
  isOpen: boolean
}

// Trip type
type TripType = "solo" | "family"

export default function ChecklistSection() {
  const [tripType, setTripType] = useState<TripType>("solo")
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("clothing")
  const [newItemEmoji, setNewItemEmoji] = useState("👕")
  const progressRef = useRef<HTMLDivElement>(null)

  // Initial categories and items
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "clothing",
      name: "Clothing",
      emoji: "👕",
      isOpen: true,
      items: [
        { id: "c1", name: "T-Shirts", emoji: "👕", packed: false },
        { id: "c2", name: "Pants/Shorts", emoji: "👖", packed: false },
        { id: "c3", name: "Underwear", emoji: "🩲", packed: false },
        { id: "c4", name: "Socks", emoji: "🧦", packed: false },
        { id: "c5", name: "Jacket", emoji: "🧥", packed: false },
      ],
    },
    {
      id: "toiletries",
      name: "Toiletries",
      emoji: "🧼",
      isOpen: false,
      items: [
        { id: "t1", name: "Toothbrush", emoji: "🪥", packed: false },
        { id: "t2", name: "Toothpaste", emoji: "🧴", packed: false },
        { id: "t3", name: "Shampoo", emoji: "🧴", packed: false },
        { id: "t4", name: "Soap", emoji: "🧼", packed: false },
        { id: "t5", name: "Deodorant", emoji: "🧴", packed: false },
      ],
    },
    {
      id: "gadgets",
      name: "Gadgets",
      emoji: "🔌",
      isOpen: false,
      items: [
        { id: "g1", name: "Phone Charger", emoji: "🔌", packed: false },
        { id: "g2", name: "Laptop", emoji: "💻", packed: false },
        { id: "g3", name: "Headphones", emoji: "🎧", packed: false },
        { id: "g4", name: "Camera", emoji: "📷", packed: false },
        { id: "g5", name: "Power Bank", emoji: "🔋", packed: false },
      ],
    },
    {
      id: "documents",
      name: "Documents",
      emoji: "📑",
      isOpen: false,
      items: [
        { id: "d1", name: "Passport", emoji: "🛂", packed: false },
        { id: "d2", name: "ID Card", emoji: "💳", packed: false },
        { id: "d3", name: "Boarding Pass", emoji: "🎫", packed: false },
        { id: "d4", name: "Hotel Reservation", emoji: "🏨", packed: false },
        { id: "d5", name: "Travel Insurance", emoji: "📄", packed: false },
      ],
    },
    {
      id: "essentials",
      name: "Essentials",
      emoji: "✈️",
      isOpen: false,
      items: [
        { id: "e1", name: "Wallet", emoji: "👛", packed: false },
        { id: "e2", name: "Sunglasses", emoji: "🕶️", packed: false },
        { id: "e3", name: "Medications", emoji: "💊", packed: false },
        { id: "e4", name: "Water Bottle", emoji: "🧴", packed: false },
        { id: "e5", name: "Snacks", emoji: "🍫", packed: false },
      ],
    },
  ])

  // Family trip specific items
  const familyItems: Item[] = [
    { id: "f1", name: "Kids' Clothes", emoji: "👶", packed: false },
    { id: "f2", name: "Toys", emoji: "🧸", packed: false },
    { id: "f3", name: "Baby Wipes", emoji: "🧻", packed: false },
    { id: "f4", name: "Diapers", emoji: "🧷", packed: false },
    { id: "f5", name: "Stroller", emoji: "👶", packed: false },
  ]

  // Update categories when trip type changes
  useEffect(() => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories]

      // Find family category or create it
      let familyCategory = newCategories.find((cat) => cat.id === "family")

      if (tripType === "family") {
        if (!familyCategory) {
          // Add family category
          familyCategory = {
            id: "family",
            name: "Family",
            emoji: "👨‍👩‍👧‍👦",
            isOpen: true,
            items: [...familyItems],
          }
          newCategories.push(familyCategory)
        }
      } else {
        // Remove family category for solo trip
        const familyCategoryIndex = newCategories.findIndex((cat) => cat.id === "family")
        if (familyCategoryIndex !== -1) {
          newCategories.splice(familyCategoryIndex, 1)
        }
      }

      return newCategories
    })
  }, [tripType])

  // Toggle category open/close
  const toggleCategory = (categoryId: string) => {
    setCategories(
      categories.map((category) => (category.id === categoryId ? { ...category, isOpen: !category.isOpen } : category)),
    )
  }

  // Toggle item packed status
  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => (item.id === itemId ? { ...item, packed: !item.packed } : item)),
            }
          : category,
      ),
    )
  }

  // Check all items in a category
  const checkAllItems = (categoryId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => ({ ...item, packed: true })),
            }
          : category,
      ),
    )
  }

  // Reset all items in a category
  const resetAllItems = (categoryId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => ({ ...item, packed: false })),
            }
          : category,
      ),
    )
  }

  // Add custom item
  const addCustomItem = () => {
    if (!newItemName.trim()) return

    const newItem: Item = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      emoji: newItemEmoji,
      packed: false,
    }

    setCategories(
      categories.map((category) =>
        category.id === newItemCategory
          ? {
              ...category,
              items: [...category.items, newItem],
              isOpen: true, // Open the category when adding an item
            }
          : category,
      ),
    )

    setNewItemName("")
    setShowAddItem(false)
  }

  // Calculate total items and packed items
  const totalItems = categories.reduce((acc, category) => acc + category.items.length, 0)
  const packedItems = categories.reduce((acc, category) => acc + category.items.filter((item) => item.packed).length, 0)
  const progressPercentage = totalItems > 0 ? (packedItems / totalItems) * 100 : 0

  // Trigger confetti when all items are packed
  useEffect(() => {
    if (totalItems > 0 && packedItems === totalItems) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [packedItems, totalItems])

  return (
    <section id="checklist" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-baloo">
            📝 Your Packing Checklist
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Keep track of everything you need for your trip. Check off items as you pack them.
          </p>
        </div>

        {/* Trip Type Toggle */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-xl flex justify-center">
            <div className="inline-flex rounded-full bg-white dark:bg-gray-700 p-1 shadow-md">
              <button
                onClick={() => setTripType("solo")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  tripType === "solo"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                Solo Trip 🧳
              </button>
              <button
                onClick={() => setTripType("family")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  tripType === "family"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                Family Trip 👨‍👩‍👧‍👦
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Packing Progress</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {packedItems} of {totalItems} items packed
            </span>
          </div>
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <motion.div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Checklist */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  className="border border-purple-100 dark:border-purple-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{category.emoji}</div>
                      <h3 className="font-bold text-gray-900 dark:text-white font-baloo">{category.name}</h3>
                      <span className="text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {category.items.filter((item) => item.packed).length}/{category.items.length}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {category.isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {category.isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 border-t border-purple-100 dark:border-purple-900 bg-white dark:bg-gray-900">
                          <div className="flex justify-between mb-4">
                            <button
                              onClick={() => checkAllItems(category.id)}
                              className="text-sm text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium flex items-center gap-1"
                            >
                              <Check className="h-4 w-4" />
                              Check All
                            </button>
                            <button
                              onClick={() => resetAllItems(category.id)}
                              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium flex items-center gap-1"
                            >
                              <RefreshCw className="h-4 w-4" />
                              Reset
                            </button>
                          </div>
                          <ul className="space-y-3">
                            {category.items.map((item) => (
                              <motion.li
                                key={item.id}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <button
                                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                                    item.packed
                                      ? "bg-gradient-to-r from-pink-500 to-purple-600 border-transparent"
                                      : "border-gray-300 dark:border-gray-600 hover:border-pink-500 dark:hover:border-pink-400 bg-white dark:bg-gray-800"
                                  } cursor-pointer transition-all duration-300 hover:scale-110`}
                                  onClick={() => toggleItem(category.id, item.id)}
                                >
                                  {item.packed && <Check className="h-3 w-3 text-white" />}
                                </button>
                                <span className="text-lg mr-2">{item.emoji}</span>
                                <span
                                  className={`${
                                    item.packed
                                      ? "line-through text-gray-400 dark:text-gray-600"
                                      : "text-gray-800 dark:text-gray-200"
                                  } transition-colors duration-300`}
                                >
                                  {item.name}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <motion.div
                className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-purple-900 rounded-xl p-6 shadow-lg border border-purple-200 dark:border-purple-800"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl">✈️</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-baloo">Packing Summary</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-purple-200 dark:border-purple-800">
                    <span className="text-gray-700 dark:text-gray-300">Total Items</span>
                    <span className="font-bold text-gray-900 dark:text-white">{totalItems}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-purple-200 dark:border-purple-800">
                    <span className="text-gray-700 dark:text-gray-300">Packed Items</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{packedItems}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3">
                    <span className="text-gray-700 dark:text-gray-300">Remaining Items</span>
                    <span className="font-bold text-pink-600 dark:text-pink-400">{totalItems - packedItems}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                    <div className="text-2xl">
                      {progressPercentage === 100 ? "😎" : progressPercentage > 50 ? "😊" : "😬"}
                    </div>
                    <span>
                      {progressPercentage === 100
                        ? "All packed! You're ready to go!"
                        : progressPercentage > 50
                          ? "You're making great progress!"
                          : "Still got some packing to do!"}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Add Custom Item Button */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAddItem(!showAddItem)}
                  className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-pink-200 dark:border-pink-800"
                >
                  <Plus className="h-5 w-5" />
                  Add Custom Item
                </button>
              </div>

              {/* Add Custom Item Form */}
              <AnimatePresence>
                {showAddItem && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-purple-100 dark:border-purple-900"
                  >
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Add Custom Item</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Item Name
                        </label>
                        <input
                          type="text"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          placeholder="What do you need to pack?"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Category
                        </label>
                        <select
                          value={newItemCategory}
                          onChange={(e) => setNewItemCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.emoji} {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emoji</label>
                        <input
                          type="text"
                          value={newItemEmoji}
                          onChange={(e) => setNewItemEmoji(e.target.value)}
                          placeholder="Choose an emoji"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={() => setShowAddItem(false)}
                          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addCustomItem}
                          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-300"
                        >
                          Add Item
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
