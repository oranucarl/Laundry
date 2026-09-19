import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Truck, Building2, Store, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Truck,
    title: 'Door to Door',
    description: 'Convenient pickup and delivery service right at your doorstep. We handle everything so you can focus on what matters.',
    image: `${import.meta.env.BASE_URL}images/service1.jpg`,
    features: ['Free Pickup', 'Same Day Service', 'Real-time Tracking'],
  },
  {
    icon: Building2,
    title: 'Contract Services',
    description: 'Tailored laundry solutions for businesses, hotels, and institutions. Consistent quality at scale.',
    image: `${import.meta.env.BASE_URL}images/service2.jpg`,
    features: ['Bulk Pricing', 'Scheduled Pickups', 'Dedicated Support'],
  },
  {
    icon: Store,
    title: 'Retail',
    description: 'Visit our locations for drop-off service. Quick turnaround with professional care for all fabrics.',
    image: `${import.meta.env.BASE_URL}images/service3.jpg`,
    features: ['Walk-in Welcome', 'Express Options', 'Special Care Items'],
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From personal laundry to large-scale commercial solutions,
            we provide comprehensive laundry services tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-primary-500 p-3 rounded-xl">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={scrollToContact}
                  className="flex items-center gap-2 text-primary-600 font-semibold group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Not sure which service is right for you?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-colors"
          >
            Contact Us for a Custom Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
