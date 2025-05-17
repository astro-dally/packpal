import HeroSection from "@/components/hero-section"
import PackingChecklist from "@/components/packing-checklist"
import TravelTips from "@/components/travel-tips"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Leaderboard from "@/components/leaderboard"
import { ScrollProgress } from "@/components/scroll-progress"
import { BackgroundCanvas } from "@/components/background-canvas"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <BackgroundCanvas />
      <Navbar />
      <ScrollProgress />
      <main>
        <HeroSection />
        <PackingChecklist />
        <TravelTips />
        <Leaderboard />
        <AboutSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
