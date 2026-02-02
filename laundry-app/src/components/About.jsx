import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Clock, Users, Shield, CheckCircle } from 'lucide-react'

const stats = [
  { icon: Clock, label: 'Since', value: '2008', description: 'Years of Excellence' },
  { icon: Users, label: 'Customers', value: '10,000+', description: 'Happy Clients' },
  { icon: Award, label: 'Delivery', value: '24hr', description: 'Fast Turnaround' },
  { icon: Shield, label: 'Coverage', value: 'Nationwide', description: 'Full Service' },
]

const features = [
  'Premium fabric care',
  'Eco-friendly detergents',
  'Professional pressing',
  'Stain removal experts',
  'Delicate handling',
  'Quality guaranteed',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mt-2 mb-6">
              Your Trusted Laundry Partner
            </h2>

            {/* Tagline */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-l-4 border-primary-500 pl-6 py-2 my-8"
            >
              <p className="text-2xl font-semibold text-secondary-800 italic">
                "Customer satisfaction is our number one priority"
              </p>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 text-lg leading-relaxed mb-8"
            >
              Carlson's Laundry is a trusted and reliable nationwide laundry service
              established since 2008. We offer comprehensive services including
              door-to-door pickup, contract services for businesses, and convenient
              retail locations. Our commitment to quality ensures your garments
              receive the care they deserve.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span className="text-secondary-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent-green/20 rounded-full blur-3xl" />

            {/* Stats Grid */}
            <div className="relative grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-lg"
                >
                  <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <stat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-secondary-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-4 -right-4 bg-accent-green text-white px-6 py-3 rounded-full shadow-lg"
            >
              <span className="font-semibold">100% Satisfaction</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
