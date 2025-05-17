"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rocket, Plus, Sparkles, ShoppingBag, Smartphone, Droplet } from "lucide-react"
import AddItemModal from "./add-item-modal"
import confetti from "canvas-confetti"

// Dummy data for packing items
const initialItems = {
  clothing: [
    { id: "c1", name: "T-Shirts", emoji: "👕", packed: false },
    { id: "c2", name: "Pants", emoji: "👖", packed: false },
    { id: "c3", name: "Underwear", emoji: "🩲", packed: false },
    { id: "c4", name: "Socks", emoji: "🧦", packed: false },
    { id: "c5", name: "Jacket", emoji: "🧥", packed: false },
    { id: "c6", name: "Swimwear", emoji: "🩳", packed: false },
    { id: "c7", name: "Pajamas", emoji: "🛌", packed: false },
  ],
  gadgets: [
    { id: "g1", name: "Phone Charger", emoji: "🔌", packed: false },
    { id: "g2", name: "Camera", emoji: "📷", packed: false },
    { id: "g3", name: "Headphones", emoji: "🎧", packed: false },
    { id: "g4", name: "Power Bank", emoji: "🔋", packed: false },
    { id: "g5", name: "Laptop", emoji: "💻", packed: false },
    { id: "g6", name: "Tablet", emoji: "📱", packed: false },
  ],
  toiletries: [
    { id: "t1", name: "Toothbrush", emoji: "🪥", packed: false },
    { id: "t2", name: "Toothpaste", emoji: "🧴", packed: false },
    { id: "t3", name: "Shampoo", emoji: "🧴", packed: false },
    { id: "t4", name: "Soap", emoji: "🧼", packed: false },
    { id: "t5", name: "Deodorant", emoji: "🧪", packed: false },
    { id: "t6", name: "Sunscreen", emoji: "🧴", packed: false },
  ],
}

type Item = {
  id: string
  name: string
  emoji: string
  packed: boolean
}

type ItemsByCategory = {
  [key: string]: Item[]
}

export default function PackingChecklist() {
  const [items, setItems] = useState<ItemsByCategory>(initialItems)
  const [progress, setProgress] = useState(0)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [packingStatus, setPackingStatus] = useState("")
  const [showBadge, setShowBadge] = useState(false)
  const [activeTab, setActiveTab] = useState("clothing")
  const sectionRef = useRef<HTMLDivElement>(null)

  // Calculate progress
  useEffect(() => {
    const totalItems = Object.values(items).flat().length
    const packedItems = Object.values(items)
      .flat()
      .filter((item) => item.packed).length
    const newProgress = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0
    setProgress(newProgress)

    // Set packing status based on progress
    if (newProgress === 0) {
      setPackingStatus("Not Started")
    } else if (newProgress < 50) {
      setPackingStatus("😅 Half-packed")
    } else if (newProgress < 100) {
      setPackingStatus("🚀 Almost Ready!")
    } else if (newProgress === 100) {
      setPackingStatus("😎 Travel Ready!")
      launchConfetti()
    }

    // Show badge when progress changes significantly
    if (newProgress > 0 && newProgress % 25 === 0) {
      setShowBadge(true)
      setTimeout(() => setShowBadge(false), 3000)
    }
  }, [items])

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#9333ea", "#db2777", "#fbbf24"],
    })
  }

  const toggleItem = (category: string, id: string) => {
    setItems((prevItems) => ({
      ...prevItems,
      [category]: prevItems[category].map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)),
    }))

    // Play sound effect
    const audio = new Audio("/pop.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const addItem = (category: string, name: string, emoji: string) => {
    const newItem = {
      id: `${category[0]}${Date.now()}`,
      name,
      emoji,
      packed: false,
    }

    setItems((prevItems) => ({
      ...prevItems,
      [category]: [...prevItems[category], newItem],
    }))
  }

  const getRandomItem = () => {
    const categories = Object.keys(items)
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const categoryItems = items[randomCategory]
    const unpackedItems = categoryItems.filter((item) => !item.packed)

    if (unpackedItems.length > 0) {
      const randomItem = unpackedItems[Math.floor(Math.random() * unpackedItems.length)]
      toggleItem(randomCategory, randomItem.id)
      setActiveTab(randomCategory)

      // Highlight the item briefly
      const itemElement = document.getElementById(`item-${randomItem.id}`)
      if (itemElement) {
        itemElement.classList.add("highlight-item")
        setTimeout(() => {
          itemElement.classList.remove("highlight-item")
        }, 2000)
      }
    }
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5, x: 100 },
    visible: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.5, x: 100 },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section id="checklist" ref={sectionRef} className="relative py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Your Packing Adventure
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Select items to pack and watch your trip preparation take off!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-medium mb-2">Packing Progress</h3>
              <div className="relative">
                <Progress value={progress} className="h-4 bg-gray-200 dark:bg-gray-700" />
                <div
                  className="absolute top-0 left-0 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%`, opacity: 0.7 }}
                ></div>
                {progress >= 100 && (
                  <Rocket className="absolute -right-2 -top-2 h-8 w-8 text-yellow-500 animate-pulse" />
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setIsAddModalOpen(true)}
                variant="outline"
                className="rounded-full border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900 transition-all duration-300"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Item
              </Button>

              <Button
                onClick={getRandomItem}
                variant="outline"
                className="rounded-full border-pink-300 dark:border-pink-700 hover:bg-pink-100 dark:hover:bg-pink-900 transition-all duration-300"
              >
                <Sparkles className="mr-1 h-4 w-4 text-yellow-500" />
                Random Item
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showBadge && (
              <motion.div
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg"
              >
                {packingStatus} 🎉
              </motion.div>
            )}
          </AnimatePresence>

          <Tabs defaultValue="clothing" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger
                value="clothing"
                className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Clothing
              </TabsTrigger>
              <TabsTrigger
                value="gadgets"
                className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Gadgets
              </TabsTrigger>
              <TabsTrigger
                value="toiletries"
                className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
              >
                <Droplet className="mr-2 h-4 w-4" />
                Toiletries
              </TabsTrigger>
            </TabsList>

            {Object.entries(items).map(([category, categoryItems]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categoryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      id={`item-${item.id}`}
                      onClick={() => toggleItem(category, item.id)}
                      className={`relative cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center border-2 transition-all duration-300 hover:shadow-md ${
                        item.packed
                          ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <p className="font-medium text-sm">{item.name}</p>

                      {item.packed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddItem={addItem} />

      <style jsx global>{`
        @keyframes highlight {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(147, 51, 234, 0); }
          50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
          100% { transform: scale(1); box-shadow: 0 0 0 rgba(147, 51, 234, 0); }
        }
        
        .highlight-item {
          animation: highlight 1s ease-in-out;
        }
      `}</style>
    </section>
  )
}
