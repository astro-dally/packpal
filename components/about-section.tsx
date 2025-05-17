"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Rocket, Heart, Globe, Shield } from "lucide-react"

export default function AboutSection() {
  const features = [
    {
      icon: <Rocket className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
      title: "Stress-Free Packing",
      description:
        "Turn the tedious task of packing into a fun, interactive experience that ensures you never forget essential items.",
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400" />,
      title: "Travel with Joy",
      description:
        "We believe travel should be joyful from start to finish. PackPal makes preparation as exciting as the journey itself.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Community Driven",
      description: "Join a community of travelers sharing packing tips and celebrating adventures around the world.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Peace of Mind",
      description:
        "Rest easy knowing you've packed everything you need for your trip, with personalized checklists for every journey.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 bg-purple-50 dark:bg-purple-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            About PackPal
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            We're on a mission to make travel preparation as fun as the journey itself.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border-0">
                <div className="flex flex-col h-full">
                  <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-purple-600 to-pink-600 opacity-70"></div>
            <h3 className="relative text-2xl md:text-3xl font-bold bg-white dark:bg-gray-800 px-6 py-3 rounded-full">
              Ready to revolutionize how you pack?
            </h3>
          </div>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            Join thousands of happy travelers who have transformed their pre-trip preparation with PackPal's interactive
            packing experience.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
