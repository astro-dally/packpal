"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Luggage, StampIcon as Passport, Camera, Shirt, Smile } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const scrollToChecklist = () => {
    const element = document.getElementById("checklist")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  const itemVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-yellow-300 dark:bg-yellow-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Ready to Launch Your Trip?
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Turn packing into play. Forget nothing, stress less, smile more.
          </p>
        </motion.div>

        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-12">
          <motion.div
            variants={orbitVariants}
            animate="animate"
            className="absolute inset-0 rounded-full border-2 border-dashed border-purple-300 dark:border-purple-700"
          ></motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all duration-300">
              <Luggage className="w-16 h-16 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                ✨
              </div>
            </div>
          </motion.div>

          {[
            { icon: <Passport className="w-full h-full text-white" />, angle: 45, distance: 120 },
            { icon: <Camera className="w-full h-full text-white" />, angle: 135, distance: 120 },
            { icon: <Shirt className="w-full h-full text-white" />, angle: 225, distance: 120 },
            { icon: <Smile className="w-full h-full text-white" />, angle: 315, distance: 120 },
          ].map((item, i) => {
            const x = Math.cos((item.angle * Math.PI) / 180) * item.distance
            const y = Math.sin((item.angle * Math.PI) / 180) * item.distance

            return (
              <motion.div
                key={i}
                custom={i}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                className="absolute left-1/2 top-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center p-2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                whileHover={{ scale: 1.2 }}
              >
                {item.icon}
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button
            onClick={scrollToChecklist}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-medium rounded-full px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300 dark:hover:shadow-purple-900"
          >
            Start Packing →
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="flex flex-col items-center"
          >
            <ArrowDown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <div className="w-1 h-10 bg-gradient-to-b from-purple-600 to-transparent mt-1"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
