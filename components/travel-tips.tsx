"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"

const tips = [
  {
    id: 1,
    title: "Roll, Don't Fold",
    content: "Roll your clothes instead of folding them to save space and reduce wrinkles.",
    icon: "🧣",
  },
  {
    id: 2,
    title: "Packing Cubes",
    content: "Use packing cubes to organize your suitcase and compress your clothes.",
    icon: "📦",
  },
  {
    id: 3,
    title: "Heavy Items at the Bottom",
    content: "Pack heavier items at the bottom of your suitcase for better balance.",
    icon: "⚖️",
  },
  {
    id: 4,
    title: "Essentials in Carry-on",
    content: "Keep medications, valuables, and a change of clothes in your carry-on.",
    icon: "💊",
  },
  {
    id: 5,
    title: "Digital Copies",
    content: "Keep digital copies of important documents in your email or cloud storage.",
    icon: "📱",
  },
  {
    id: 6,
    title: "Dryer Sheets",
    content: "Pack a dryer sheet in your suitcase to keep clothes smelling fresh.",
    icon: "👃",
  },
]

export default function TravelTips() {
  const [currentTip, setCurrentTip] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [tipOfTheDay, setTipOfTheDay] = useState(0)

  useEffect(() => {
    // Set a random tip of the day
    setTipOfTheDay(Math.floor(Math.random() * tips.length))
  }, [])

  const nextTip = () => {
    setFlipped(false)
    setTimeout(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 300)
  }

  const prevTip = () => {
    setFlipped(false)
    setTimeout(() => {
      setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)
    }, 300)
  }

  const toggleFlip = () => {
    setFlipped(!flipped)
  }

  return (
    <section id="tips" className="py-20 bg-purple-50 dark:bg-purple-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Travel Tips
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Smart packing hacks to make your journey smoother.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                <h3 className="text-xl font-bold">Tip of the Day</h3>
                <Badge className="bg-yellow-500 hover:bg-yellow-600 ml-2 animate-pulse">New</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{tips[tipOfTheDay].icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{tips[tipOfTheDay].title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{tips[tipOfTheDay].content}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.button
              onClick={prevTip}
              className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </motion.button>

            <motion.div
              className="perspective w-full max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div
                className={`relative transition-all duration-500 preserve-3d cursor-pointer ${
                  flipped ? "my-rotate-y-180" : ""
                }`}
                onClick={toggleFlip}
                style={{ height: "250px" }}
              >
                <Card className="absolute w-full h-full backface-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4">{tips[currentTip].icon}</div>
                  <h3 className="text-xl font-bold mb-2">{tips[currentTip].title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">(Click to see details)</p>
                </Card>

                <Card className="absolute w-full h-full my-rotate-y-180 backface-hidden rounded-2xl shadow-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-6 flex flex-col items-center justify-center">
                  <p className="text-lg text-gray-800 dark:text-gray-200">{tips[currentTip].content}</p>
                </Card>
              </div>
            </motion.div>

            <motion.button
              onClick={nextTip}
              className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .my-rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
