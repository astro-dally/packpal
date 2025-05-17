"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const floatingItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const floatingItems = floatingItemsRef.current?.querySelectorAll(".floating-item")
    if (!floatingItems) return

    floatingItems.forEach((item) => {
      const delay = Math.random() * 2
      const duration = 3 + Math.random() * 2
      const htmlItem = item as HTMLElement

      htmlItem.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`

      // Random initial position
      htmlItem.style.top = `${20 + Math.random() * 60}%`
      htmlItem.style.left = `${Math.random() * 80}%`
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center py-16 overflow-hidden bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-yellow-300 opacity-20 -top-20 -left-20 blur-3xl"></div>
        <div className="absolute w-96 h-96 rounded-full bg-pink-300 opacity-20 top-1/3 -right-20 blur-3xl"></div>
        <div className="absolute w-64 h-64 rounded-full bg-purple-300 opacity-20 -bottom-20 left-1/3 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-baloo text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Let's Get Packin' <span className="inline-block animate-bounce">🧳</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ditch the stress. Pack like a pro. Forget nothing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#checklist"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
              >
                Start Packing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/6 bg-purple-600 rounded-lg"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-1/3 h-1/4 bg-pink-400 rounded-lg"></div>
              </motion.div>

              {/* Floating items */}
              <div ref={floatingItemsRef} className="absolute inset-0">
                <div className="floating-item absolute text-3xl">👕</div>
                <div className="floating-item absolute text-3xl">🧦</div>
                <div className="floating-item absolute text-3xl">🪥</div>
                <div className="floating-item absolute text-3xl">📱</div>
                <div className="floating-item absolute text-3xl">💳</div>
                <div className="floating-item absolute text-3xl">📷</div>
                <div className="floating-item absolute text-3xl">🔌</div>
                <div className="floating-item absolute text-3xl">📚</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
