"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Rocket } from "lucide-react"

export function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      {isVisible && (
        <div className="h-40 w-2 bg-gray-200 dark:bg-gray-800 rounded-full relative">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-pink-500 rounded-full origin-bottom"
            style={{ scaleY: scaleX, height: "100%" }}
          />
          <motion.div
            className="absolute -left-3 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md"
            style={{ bottom: `calc(${scrollYProgress.get() * 100}% - 16px)` }}
          >
            <Rocket className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </motion.div>
        </div>
      )}
    </div>
  )
}
