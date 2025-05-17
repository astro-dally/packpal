"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"

type SoundType =
  | "click"
  | "check"
  | "uncheck"
  | "swipe"
  | "flip"
  | "add"
  | "random"
  | "launch"
  | "beep"
  | "complete"
  | "hover"
  | "switch"

interface SoundContextType {
  isSoundEnabled: boolean
  toggleSound: () => void
  playSound: (type: SoundType) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false) // Start with sound disabled
  const [isInitialized, setIsInitialized] = useState(false)
  const soundsRef = useRef<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    check: null,
    uncheck: null,
    swipe: null,
    flip: null,
    add: null,
    random: null,
    launch: null,
    beep: null,
    complete: null,
    hover: null,
    switch: null,
  })

  // Track if user has interacted with the page
  const [userInteracted, setUserInteracted] = useState(false)

  // Initialize sounds
  useEffect(() => {
    if (typeof window === "undefined") return

    // For demo purposes, we're creating audio elements but not actually loading real sound files
    // In a real app, you would load actual sound files
    const soundTypes: SoundType[] = [
      "click",
      "check",
      "uncheck",
      "swipe",
      "flip",
      "add",
      "random",
      "launch",
      "beep",
      "complete",
      "hover",
      "switch",
    ]

    soundTypes.forEach((type) => {
      // Create audio elements but don't set src to avoid network requests for non-existent files
      const audio = new Audio()
      audio.volume = 0.5
      soundsRef.current[type] = audio
    })

    setIsInitialized(true)

    // Add user interaction listener
    const handleInteraction = () => {
      setUserInteracted(true)
      // Remove listeners after first interaction
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }

    window.addEventListener("click", handleInteraction)
    window.addEventListener("keydown", handleInteraction)
    window.addEventListener("touchstart", handleInteraction)

    // Clean up
    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)

      Object.values(soundsRef.current).forEach((audio) => {
        if (audio) {
          audio.pause()
          audio.src = ""
        }
      })
    }
  }, [])

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev)
  }, [])

  // Debounce map to prevent rapid successive plays of the same sound
  const lastPlayedRef = useRef<Record<SoundType, number>>({} as Record<SoundType, number>)

  const playSound = useCallback(
    (type: SoundType) => {
      // Don't play sounds if disabled, not initialized, or user hasn't interacted
      if (!isSoundEnabled || !isInitialized || !userInteracted) return

      const now = Date.now()
      const lastPlayed = lastPlayedRef.current[type] || 0

      // Debounce sound playback (100ms)
      if (now - lastPlayed < 100) return

      lastPlayedRef.current[type] = now

      try {
        const sound = soundsRef.current[type]
        if (sound) {
          // Create a new audio element for each play to avoid interruption
          const clonedSound = sound.cloneNode() as HTMLAudioElement

          // Add error handling
          clonedSound.onerror = (e) => {
            console.log("Sound error:", e)
          }

          // Play with error handling
          const playPromise = clonedSound.play()

          if (playPromise !== undefined) {
            playPromise.catch((e) => {
              // Suppress the error in console to avoid noise
              if (e.name !== "AbortError" && e.name !== "NotAllowedError") {
                console.log("Playback error:", e.name)
              }
            })
          }
        }
      } catch (error) {
        // Suppress errors in production
        if (process.env.NODE_ENV !== "production") {
          console.log("Error playing sound:", error)
        }
      }
    },
    [isSoundEnabled, isInitialized, userInteracted],
  )

  return <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playSound }}>{children}</SoundContext.Provider>
}

export function useSoundEffect() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error("useSoundEffect must be used within a SoundProvider")
  }
  return context
}
