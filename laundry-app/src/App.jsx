import { lazy, Suspense } from 'react'
import { OrderProvider } from './context/OrderContext'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import About from './components/About'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileCTA from './components/MobileCTA'

// Leaflet is ~45KB gzipped, so keep it out of the first paint.
const Coverage = lazy(() => import('./components/Coverage'))

function App() {
  return (
    <OrderProvider>
      <Preloader />
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70]
                   focus:bg-secondary-900 focus:text-white focus:px-5 focus:py-3 focus:rounded-xl"
      >
        Skip to content
      </a>

      <div className="min-h-screen bg-white">
        <Navbar />
        <main id="main">
          <Hero />
          <Services />
          <HowItWorks />
          <Pricing />
          <About />
          <Suspense
            fallback={
              <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 h-[560px] rounded-3xl bg-gray-200 animate-pulse" />
              </div>
            }
          >
            <Coverage />
          </Suspense>
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <MobileCTA />
      </div>
    </OrderProvider>
  )
}

export default App
