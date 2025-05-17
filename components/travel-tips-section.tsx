"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Tip = {
  id: number
  text: string
  emoji: string
}

const travelTips: Tip[] = [
  { id: 1, text: "Roll your clothes to save space!", emoji: "👕" },
  { id: 2, text: "Keep a digital and physical copy of your passport.", emoji: "🛂" },
  { id: 3, text: "Always pack an extra pair of socks.", emoji: "🧦" },
  { id: 4, text: "Use packing cubes to organize your suitcase.", emoji: "🧳" },
  { id: 5, text: "Pack a portable charger for your devices.", emoji: "🔋" },
  { id: 6, text: "Bring a reusable water bottle to stay hydrated.", emoji: "💧" },
  { id: 7, text: "Take photos of important documents as backups.", emoji: "📷" },
  { id: 8, text: "Pack a small first-aid kit for emergencies.", emoji: "🩹" },
  { id: 9, text: "Wear your bulkiest items during travel to save space.", emoji: "👟" },
  { id: 10, text: "Use shower caps to cover the bottoms of shoes.", emoji: "👞" },
]

export default function TravelTipsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleTips, setVisibleTips] = useState(3)

  // Update visible tips based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleTips(1)
      } else if (window.innerWidth < 1024) {
        setVisibleTips(2)
      } else {
        setVisibleTips(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextTip = () => {
    setActiveIndex((prev) => (prev + 1) % (travelTips.length - visibleTips + 1))
  }

  const prevTip = () => {
    setActiveIndex((prev) => (prev === 0 ? travelTips.length - visibleTips : prev - 1))
  }

  return (
    <section id="tips" className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-baloo">
            💡 Travel Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pro tips to make your travel experience smoother and more enjoyable.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={prevTip}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Previous tip"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTip}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Next tip"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleTips)}%)` }}
            >
              {travelTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  className={`w-full flex-shrink-0 px-2`}
                  style={{ width: `${100 / visibleTips}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg h-full border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="text-4xl mb-4">{tip.emoji}</div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{tip.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: travelTips.length - visibleTips + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-pink-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-pink-300 dark:hover:bg-pink-800"
                }`}
                aria-label={`Go to tip ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
