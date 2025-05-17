import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Poppins, Baloo_2 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { SpeedInsights } from "@/components/speed-insights"
import { SoundProvider } from "@/components/sound-provider"
import { BackgroundCanvas } from "@/components/background-canvas"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
})

export const metadata: Metadata = {
  title: "PackPal 🚀 | Turn Packing into Play",
  description: "Turn packing into play. Forget nothing, stress less, smile more.",
  keywords: ["travel", "packing", "checklist", "trip planning", "travel app"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased overflow-x-hidden",
          spaceGrotesk.variable,
          poppins.variable,
          baloo.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <SoundProvider>
            <BackgroundCanvas />
            <Suspense>{children}</Suspense>
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
