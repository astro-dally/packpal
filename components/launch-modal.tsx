"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Rocket, Loader2 } from "lucide-react"
import confetti from "canvas-confetti"

interface LaunchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LaunchModal({ isOpen, onClose }: LaunchModalProps) {
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setStage(0)
      setProgress(0)

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            setTimeout(() => {
              setStage(1)
              launchConfetti()
            }, 500)
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(timer)
    }
  }, [isOpen])

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#9333ea", "#db2777", "#fbbf24"],
    })
  }

  const handleClose = () => {
    setStage(0)
    onClose()
  }

  const stageContent = [
    {
      title: "Preparing for Launch",
      description: "Initializing your packing adventure...",
      icon: <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />,
    },
    {
      title: "Ready for Takeoff!",
      description: "Your packing mode is now activated. Let's get started!",
      icon: <Rocket className="h-12 w-12 text-purple-600" />,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl border-0 shadow-xl p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-500">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
              style={{ width: `${progress}%`, transition: "width 0.2s ease-in-out" }}
            />
          </div>

          <div className="pt-8 pb-6 px-6 flex flex-col items-center justify-center text-center">
            <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">{stageContent[stage].icon}</div>

            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {stageContent[stage].title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4">{stageContent[stage].description}</p>

            {stage === 0 ? (
              <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-500 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : (
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Let's Pack!
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
