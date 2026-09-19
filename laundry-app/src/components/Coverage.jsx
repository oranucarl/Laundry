import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Navigation, Clock, Star, Truck } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { locations, deliveryZones, business } from '../data/business'
import { fadeUp, stagger, inView, spring } from '../lib/motion'

const LAGOS_CENTER = [6.5, 3.39]

/**
 * Live, pannable map of service hubs.
 * Leaflet + CARTO basemap tiles: fully interactive, no API key, no billing.
 * Markers are divIcons, so there are no image assets to break under the
 * GitHub Pages sub-path.
 */
export default function Coverage() {
  const reduce = useReducedMotion()
  const mapEl = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const [activeId, setActiveId] = useState(locations[0].id)

  useEffect(() => {
    if (mapRef.current || !mapEl.current) return

    const map = L.map(mapEl.current, {
      center: LAGOS_CENTER,
      zoom: 11,
      scrollWheelZoom: false, // don't hijack page scroll; click to enable
      zoomControl: true,
      attributionControl: true,
    })
    mapRef.current = map

    // Click the map to enable wheel zoom, leave to disable again.
    map.on('click', () => map.scrollWheelZoom.enable())
    map.on('mouseout', () => map.scrollWheelZoom.disable())

    // Esri World Street Map: keyless, and carries the street detail and place
    // names a "find us" map actually needs.
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Tiles &copy; Esri', maxZoom: 18 }
    ).addTo(map)

    locations.forEach((loc) => {
      // Delivery radius halo
      L.circle(loc.coords, {
        radius: loc.flagship ? 4000 : 2800,
        color: '#0891b2',
        weight: 1,
        opacity: 0.35,
        fillColor: '#06b6d4',
        fillOpacity: 0.08,
      }).addTo(map)

      const icon = L.divIcon({
        className: 'cl-marker',
        html: `
          <span class="cl-marker__pulse"></span>
          <span class="cl-marker__pin${loc.flagship ? ' cl-marker__pin--flagship' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 6l9-3 9 3v6c0 5-4 8-9 10-5-2-9-5-9-10z"/>
            </svg>
          </span>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -18],
      })

      const marker = L.marker(loc.coords, { icon, title: loc.name })
        .addTo(map)
        .bindPopup(
          `<div class="cl-popup">
             <strong>${loc.name}</strong>
             <span>${loc.address}</span>
             <span class="cl-popup__hours">${loc.hours}</span>
           </div>`
        )

      marker.on('click', () => setActiveId(loc.id))
      markersRef.current[loc.id] = marker
    })

    // Frame every hub on first paint.
    map.fitBounds(L.latLngBounds(locations.map((l) => l.coords)).pad(0.25))

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, [])

  const focusLocation = (loc) => {
    setActiveId(loc.id)
    const map = mapRef.current
    if (!map) return
    map.flyTo(loc.coords, 14, { duration: reduce ? 0 : 1.1 })
    markersRef.current[loc.id]?.openPopup()
  }

  return (
    <section id="coverage" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="text-center mb-14"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Find Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mt-2 mb-4">
            Hubs Across Lagos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Drop off at any branch, or let us come to you. Tap a location to see
            it on the map. The shaded rings show our free pickup radius.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ── Location list ── */}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="lg:col-span-2 space-y-3"
          >
            {locations.map((loc) => {
              const active = loc.id === activeId
              return (
                <motion.button
                  key={loc.id}
                  variants={fadeUp}
                  onClick={() => focusLocation(loc)}
                  whileHover={reduce ? undefined : { x: 5 }}
                  transition={spring}
                  aria-pressed={active}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-colors focus-ring ${
                    active
                      ? 'bg-white border-primary-500 shadow-xl shadow-primary-500/10'
                      : 'bg-white/60 border-transparent hover:border-primary-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                        active ? 'bg-primary-600' : 'bg-primary-100'
                      }`}
                    >
                      <MapPin
                        className={`w-5 h-5 ${active ? 'text-white' : 'text-primary-600'}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-secondary-900">{loc.name}</h3>
                        {loc.flagship && (
                          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3 fill-current" /> Flagship
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{loc.address}</p>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {loc.hours}
                      </p>
                    </div>
                  </div>

                  {active && (
                    <motion.a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coords[0]},${loc.coords[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                    >
                      <Navigation className="w-4 h-4" />
                      Get directions
                    </motion.a>
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          {/* ── Map ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="lg:col-span-3 lg:sticky lg:top-28"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200">
              <div
                ref={mapEl}
                className="h-[460px] lg:h-[560px] w-full bg-gray-200"
                role="application"
                aria-label={`Map of ${business.name} locations across Lagos`}
              />
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Click the map to zoom with your scroll wheel.
            </p>
          </motion.div>
        </div>

        {/* ── Delivery zones ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-accent-green/10 rounded-xl">
              <Truck className="w-5 h-5 text-accent-green" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900">
              Free pickup &amp; delivery zones
            </h3>
          </div>
          <motion.div variants={stagger(0.03)} className="flex flex-wrap gap-2.5">
            {deliveryZones.map((zone) => (
              <motion.span
                key={zone}
                variants={fadeUp}
                className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 border border-gray-200 rounded-full text-sm font-medium text-secondary-700 transition-colors cursor-default"
              >
                {zone}
              </motion.span>
            ))}
          </motion.div>
          <p className="text-sm text-gray-500 mt-5">
            Outside these areas?{' '}
            <a href="#contact" className="text-primary-600 font-semibold hover:underline">
              Contact us
            </a>. We still deliver nationwide by courier.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
