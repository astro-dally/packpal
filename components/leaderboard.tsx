"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award } from "lucide-react"

// Dummy data for leaderboard
const leaderboardData = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    trips: 12,
    badge: "🦄 Ultra Packer",
  },
  {
    id: 2,
    name: "Sam Rivera",
    avatar: "/placeholder.svg?height=40&width=40",
    trips: 10,
    badge: "🧳 Speedy Suitcaser",
  },
  {
    id: 3,
    name: "Taylor Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    trips: 8,
    badge: "✈️ Frequent Flyer",
  },
  {
    id: 4,
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    trips: 7,
    badge: "🌍 Globe Trotter",
  },
  {
    id: 5,
    name: "Casey Morgan",
    avatar: "/placeholder.svg?height=40&width=40",
    trips: 6,
    badge: "🏝️ Beach Hopper",
  },
]

export default function Leaderboard() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("leaderboard")
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="leaderboard" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Packing Champions
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Meet our most active packers this week!
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <span>Most Trips Packed</span>
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">This Week</div>
            </div>

            <div className="space-y-6">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.id}
                  variants={itemVariants}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {index < 3 && (
                        <div
                          className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-white ${
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-700"
                          }`}
                        >
                          {index === 0 ? (
                            <Trophy className="h-3 w-3" />
                          ) : index === 1 ? (
                            <Medal className="h-3 w-3" />
                          ) : (
                            <Award className="h-3 w-3" />
                          )}
                        </div>
                      )}
                      <Avatar className="h-12 w-12 border-2 border-purple-200 dark:border-purple-800">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.badge}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{user.trips}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">trips</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
