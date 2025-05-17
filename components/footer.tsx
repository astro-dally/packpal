"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Instagram, Twitter, Facebook, Rocket } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

export default function Footer() {
  const [windowWidth, setWindowWidth] = useState(1000)

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  ]

  const footerLinks = [
    { name: "Home", href: "#" },
    { name: "Checklist", href: "#checklist" },
    { name: "Tips", href: "#tips" },
    { name: "Leaderboard", href: "#leaderboard" },
    { name: "About", href: "#about" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ]

  return (
    <footer className="relative bg-white dark:bg-gray-900 pt-16 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4"
            >
              <span>PackPal</span>
              <Rocket className="h-5 w-5" />
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Making packing fun, interactive, and stress-free for travelers around the world.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2">
                {footerLinks.slice(0, 3).map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.slice(3, 5).map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.slice(5).map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} PackPal. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Made with <span className="text-pink-500">♥</span> for travelers
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 right-0">
        <motion.div
          animate={{
            x: [-100, windowWidth],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="flex items-center"
        >
          <div className="h-1 w-20 bg-gradient-to-r from-transparent to-purple-600"></div>
          <Rocket className="h-4 w-4 text-purple-600 dark:text-purple-400 transform -rotate-45" />
        </motion.div>
      </div>
    </footer>
  )
}
