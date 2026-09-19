import { useId } from 'react'

/**
 * Hand-drawn SVG garment illustrations.
 * Original artwork — no stock licensing, ~1KB each, scales to any size and
 * recolours per card so the pricing grid reads as one coordinated set.
 *
 * To swap in photography later, replace <GarmentArt name="agbada" /> with an
 * <img> — the surrounding card layout needs no changes.
 */

const VB = '0 0 200 240'

/* ── Traditional menswear ─────────────────────────────────── */

function Agbada({ c }) {
  return (
    <>
      {/* under-tunic, visible at neck and hem */}
      <path d="M72 62h56v170a3 3 0 0 1-3 3H75a3 3 0 0 1-3-3z" fill={c.shade} />
      {/* the outer robe — the huge draping sleeves are the whole point */}
      <path
        d="M100 48c-16 0-28 4-36 9L12 92c-4 3-5 8-3 12l17 48c2 5 8 7 12 4l28-22v88c0 3 2 5 5 5h58c3 0 5-2 5-5v-88l28 22c4 3 10 1 12-4l17-48c2-4 1-9-3-12L136 57c-8-5-20-9-36-9z"
        fill={c.fabric}
      />
      {/* drape folds falling through the sleeves */}
      <path d="M58 70 30 140M142 70l28 70" stroke={c.shade} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".5" />
      <path d="M46 80 24 134M154 80l22 54" stroke={c.shade} strokeWidth="2" fill="none" strokeLinecap="round" opacity=".35" />
      {/* neckline */}
      <path d="M84 52c5 13 11 20 16 20s11-7 16-20" fill={c.shade} />
      <path d="M84 52c5 13 11 20 16 20s11-7 16-20" stroke={c.detail} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* chest embroidery panel */}
      <path d="M80 82h40v54H80z" fill={c.accent} opacity=".15" />
      <path d="M80 82h40v54H80z" stroke={c.accent} strokeWidth="2" fill="none" />
      <path d="M88 92v34M100 88v42M112 92v34" stroke={c.accent} strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="109" r="8" fill="none" stroke={c.accent} strokeWidth="2" />
      <circle cx="100" cy="109" r="2.8" fill={c.accent} />
      <path d="M84 146h32M88 156h24M92 166h16" stroke={c.accent} strokeWidth="2" strokeLinecap="round" opacity=".8" />
      {/* hem band */}
      <path d="M68 214h64" stroke={c.accent} strokeWidth="2.5" strokeLinecap="round" opacity=".7" />
    </>
  )
}

function Senator({ c }) {
  return (
    <>
      <path
        d="M100 48c-10 0-17 3-22 5l-34 15c-5 2-7 7-5 12l10 26c2 5 8 7 12 4l5-4v106a4 4 0 0 0 4 4h60a4 4 0 0 0 4-4V106l5 4c4 3 10 1 12-4l10-26c2-5 0-10-5-12l-34-15c-5-2-12-5-22-5z"
        fill={c.fabric}
      />
      {/* mandarin collar */}
      <path d="M86 50h28v12a3 3 0 0 1-3 3H89a3 3 0 0 1-3-3z" fill={c.shade} />
      <path d="M86 50h28v12a3 3 0 0 1-3 3H89a3 3 0 0 1-3-3z" stroke={c.detail} strokeWidth="2" fill="none" />
      {/* centre placket */}
      <path d="M94 64h12v148H94z" fill={c.shade} opacity=".7" />
      <path d="M94 64v148M106 64v148" stroke={c.detail} strokeWidth="1.8" opacity=".9" />
      {[86, 112, 138, 164, 190].map((y) => (
        <circle key={y} cx="100" cy={y} r="3.2" fill={c.accent} />
      ))}
      {/* chest pocket */}
      <path d="M124 96h22v24h-22z" fill="none" stroke={c.detail} strokeWidth="2" opacity=".7" />
      {/* cuffs */}
      <path d="M52 96l16 6M148 96l-16 6" stroke={c.shade} strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </>
  )
}

function Dashiki({ c }) {
  const id = useId()
  return (
    <>
      <defs>
        <pattern id={`dk-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M8 1l3 6 6 1-5 4 2 6-6-3-6 3 2-6-5-4 6-1z" fill={c.accent} opacity=".5" />
        </pattern>
      </defs>
      <path
        d="M100 50c-12 0-20 3-26 6L30 78c-5 3-6 8-4 12l12 22c2 5 8 6 12 3l8-6v90a5 5 0 0 0 5 5h74a5 5 0 0 0 5-5v-90l8 6c4 3 10 2 12-3l12-22c2-4 1-9-4-12l-44-22c-6-3-14-6-26-6z"
        fill={c.fabric}
      />
      {/* wide V neckline */}
      <path d="M80 54l20 34 20-34z" fill={c.shade} />
      {/* embroidered yoke — the signature dashiki panel */}
      <path d="M62 62c12 34 24 50 38 50s26-16 38-50l-14-6-24 40-24-40z" fill={`url(#dk-${id})`} />
      <path d="M62 62c12 34 24 50 38 50s26-16 38-50" stroke={c.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M70 76c10 26 20 38 30 38s20-12 30-38" stroke={c.detail} strokeWidth="2" fill="none" opacity=".85" />
      {/* hem band */}
      <path d="M63 182h74v16H63z" fill={`url(#dk-${id})`} />
      <path d="M63 182h74M63 198h74" stroke={c.accent} strokeWidth="2.2" />
      {/* sleeve bands */}
      <path d="M38 104l14 8M162 104l-14 8" stroke={c.accent} strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </>
  )
}

function Kaftan({ c }) {
  return (
    <>
      {/* long robe that flares gently toward the hem */}
      <path
        d="M100 48c-12 0-20 3-26 6L36 72c-5 2-7 8-5 12l12 28c2 5 8 6 12 3l7-6-8 116a4 4 0 0 0 4 4h84a4 4 0 0 0 4-4l-8-116 7 6c4 3 10 2 12-3l12-28c2-4 0-10-5-12l-38-18c-6-3-14-6-26-6z"
        fill={c.fabric}
      />
      <path d="M84 50c4 12 10 18 16 18s12-6 16-18" fill={c.shade} />
      <path d="M84 50c4 12 10 18 16 18s12-6 16-18" stroke={c.detail} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* placket slit with embroidery */}
      <path d="M100 68v46" stroke={c.detail} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M92 76h16M92 92h16M94 108h12" stroke={c.accent} strokeWidth="1.8" strokeLinecap="round" opacity=".75" />
      <circle cx="100" cy="76" r="3" fill={c.accent} />
      <circle cx="100" cy="94" r="3" fill={c.accent} />
      {/* side drape */}
      <path d="M72 124l-4 96M128 124l4 96" stroke={c.shade} strokeWidth="2" fill="none" opacity=".45" />
      {/* cuffs */}
      <path d="M44 108l14 6M156 108l-14 6" stroke={c.shade} strokeWidth="3" strokeLinecap="round" opacity=".55" />
    </>
  )
}

/* ── Traditional womenswear ───────────────────────────────── */

function IroBuba({ c }) {
  return (
    <>
      {/* iro — the wrapper */}
      <path d="M68 132h64l8 92a4 4 0 0 1-4 4H64a4 4 0 0 1-4-4z" fill={c.fabric} />
      <path d="M68 132h64l2 22H66z" fill={c.shade} />
      <path d="M78 158l-4 66M100 158v66M122 158l4 66" stroke={c.shade} strokeWidth="2" opacity=".5" />
      {/* buba — the blouse, with its wide elbow-length sleeves */}
      <path
        d="M100 50c-10 0-17 3-22 5L44 70c-6 3-8 9-5 14l12 20c3 4 9 5 13 2l4-4v36a4 4 0 0 0 4 4h56a4 4 0 0 0 4-4v-36l4 4c4 3 10 2 13-2l12-20c3-5 1-11-5-14l-34-15c-5-2-12-5-22-5z"
        fill={c.accent}
      />
      <path d="M84 52c4 11 10 16 16 16s12-5 16-16" fill={c.shade} opacity=".5" />
      <path d="M84 52c4 11 10 16 16 16s12-5 16-16" stroke={c.detail} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M52 100l14 6M148 100l-14 6" stroke={c.detail} strokeWidth="2.8" strokeLinecap="round" opacity=".6" />
      {/* sash at the waist */}
      <path d="M66 126h68v10H66z" fill={c.detail} opacity=".85" />
    </>
  )
}

function AnkaraGown({ c }) {
  const id = useId()
  return (
    <>
      <defs>
        <pattern id={`ak-${id}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="22" height="22" fill={c.fabric} />
          <circle cx="11" cy="11" r="6" fill="none" stroke={c.accent} strokeWidth="2" />
          <circle cx="11" cy="11" r="2" fill={c.detail} />
          <path d="M0 0l22 22M22 0L0 22" stroke={c.accent} strokeWidth="1" opacity=".3" />
        </pattern>
      </defs>
      {/* flared skirt */}
      <path d="M78 118h44l24 108a4 4 0 0 1-4 5H58a4 4 0 0 1-4-5z" fill={`url(#ak-${id})`} />
      {/* fitted bodice */}
      <path d="M100 52c-8 0-14 2-18 4l-24 11c-5 2-7 7-5 12l9 20c2 5 8 6 12 3l3-3 1 23h44l1-23 3 3c4 3 10 2 12-3l9-20c2-5 0-10-5-12l-24-11c-4-2-10-4-18-4z" fill={`url(#ak-${id})`} />
      {/* sweetheart neckline */}
      <path d="M84 54c5 9 10 13 16 13s11-4 16-13" fill={c.detail} opacity=".55" />
      <path d="M84 54c5 9 10 13 16 13s11-4 16-13" stroke={c.detail} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* waist belt */}
      <path d="M77 112h46v10H77z" fill={c.detail} />
      <circle cx="100" cy="117" r="4" fill={c.accent} />
      {/* hem */}
      <path d="M56 214h88" stroke={c.detail} strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </>
  )
}

function Gele({ c }) {
  return (
    <>
      {/* wrapped base band sitting on the head */}
      <path d="M58 162c0-14 19-24 42-24s42 10 42 24v14c0 14-19 24-42 24s-42-10-42-24z" fill={c.detail} />
      <path d="M58 172c12 9 26 13 42 13s30-4 42-13" stroke={c.shade} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".6" />

      {/* second wrap layer */}
      <path d="M62 146c0-13 17-22 38-22s38 9 38 22-17 22-38 22-38-9-38-22z" fill={c.fabric} />
      <path d="M64 150c11 8 23 12 36 12s25-4 36-12" stroke={c.shade} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".55" />

      {/* the fan — pleated fabric sweeping up and out to one side */}
      <path d="M96 138C82 122 74 96 84 72c8-20 28-30 50-26 22 4 34 22 30 40-4 20-24 34-46 44-8 4-16 2-22-2z" fill={c.accent} />
      {/* pleat lines radiating from the knot */}
      <path d="M98 136C92 114 96 86 112 70" stroke={c.detail} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".75" />
      <path d="M104 140c-2-24 6-50 24-62" stroke={c.detail} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".75" />
      <path d="M112 142c4-24 16-46 34-52" stroke={c.detail} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".75" />
      <path d="M120 142c10-20 24-36 40-36" stroke={c.detail} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".6" />

      {/* smaller counter-fan on the opposite side */}
      <path d="M96 140C80 132 66 114 68 96c2-14 14-22 26-18 12 4 16 18 14 34-1 10-4 20-6 26-1 4-4 4-6 2z" fill={c.fabric} />
      <path d="M92 138c-6-14-10-30-6-42" stroke={c.shade} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".6" />
      <path d="M84 132c-6-12-8-26-4-34" stroke={c.shade} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".5" />

      {/* the knot that gathers every pleat */}
      <ellipse cx="100" cy="141" rx="17" ry="10" fill={c.detail} />
      <ellipse cx="100" cy="140" rx="8" ry="4.5" fill={c.accent} opacity=".9" />
    </>
  )
}

function LaceGown({ c }) {
  const id = useId()
  return (
    <>
      <defs>
        <pattern id={`lc-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={c.fabric} />
          <circle cx="7" cy="7" r="3.2" fill="none" stroke={c.accent} strokeWidth="1.3" opacity=".9" />
          <circle cx="0" cy="0" r="1.6" fill={c.accent} opacity=".6" />
          <circle cx="14" cy="14" r="1.6" fill={c.accent} opacity=".6" />
        </pattern>
      </defs>
      {/* trumpet silhouette */}
      <path d="M82 120h36l12 46c8 30 12 50 12 60a4 4 0 0 1-4 4H62a4 4 0 0 1-4-4c0-10 4-30 12-60z" fill={`url(#lc-${id})`} />
      <path
        d="M100 50c-9 0-15 2-19 4l-22 10c-5 2-7 7-5 11l8 18c2 5 8 6 11 3l3-3 2 29h44l2-29 3 3c3 3 9 2 11-3l8-18c2-4 0-9-5-11l-22-10c-4-2-10-4-19-4z"
        fill={`url(#lc-${id})`}
      />
      <path d="M82 52c5 10 11 15 18 15s13-5 18-15" fill={c.shade} opacity=".5" />
      <path d="M82 52c5 10 11 15 18 15s13-5 18-15" stroke={c.detail} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M80 116h40v8H80z" fill={c.detail} opacity=".9" />
      {/* scalloped lace hem */}
      <path d="M58 220q7 10 14 0t14 0 14 0 14 0 14 0 14 0" stroke={c.accent} strokeWidth="2.5" fill="none" />
    </>
  )
}

/* ── Everyday & household ─────────────────────────────────── */

function Shirt({ c }) {
  return (
    <>
      <path
        d="M100 52c-9 0-15 2-20 4l-32 14c-5 2-7 7-5 11l11 24c2 5 8 6 12 3l4-4v94a4 4 0 0 0 4 4h52a4 4 0 0 0 4-4v-94l4 4c4 3 10 2 12-3l11-24c2-4 0-9-5-11l-32-14c-5-2-11-4-20-4z"
        fill={c.fabric}
      />
      {/* collar */}
      <path d="M100 74L84 52l16-4 16 4z" fill={c.shade} />
      <path d="M84 52l16 22 16-22" stroke={c.detail} strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      <path d="M100 74v124" stroke={c.detail} strokeWidth="1.8" opacity=".8" />
      {[92, 116, 140, 164].map((y) => <circle key={y} cx="100" cy={y} r="2.8" fill={c.accent} />)}
      <path d="M118 92h20v22h-20z" fill="none" stroke={c.detail} strokeWidth="1.8" opacity=".55" />
    </>
  )
}

function Trousers({ c }) {
  return (
    <>
      <path d="M68 52h64v24H68z" fill={c.shade} />
      <path d="M68 76h64l-4 140a4 4 0 0 1-4 4h-18a4 4 0 0 1-4-4l-6-84-6 84a4 4 0 0 1-4 4H88a4 4 0 0 1-4-4z" fill={c.fabric} />
      <path d="M68 52h64v10H68z" fill={c.detail} opacity=".8" />
      <path d="M86 92l-4 122M114 92l4 122" stroke={c.shade} strokeWidth="2" opacity=".55" />
      <circle cx="100" cy="57" r="3" fill={c.accent} />
    </>
  )
}

function Suit({ c }) {
  return (
    <>
      <path d="M78 58h44v154H78z" fill={c.shade} />
      <path
        d="M100 50l-22 8-30 14c-5 2-7 7-5 11l11 24c2 5 8 6 12 3l4-4v100a4 4 0 0 0 4 4h20V50z"
        fill={c.fabric}
      />
      <path
        d="M100 50l22 8 30 14c5 2 7 7 5 11l-11 24c-2 5-8 6-12 3l-4-4v100a4 4 0 0 1-4 4h-20V50z"
        fill={c.fabric}
      />
      {/* lapels */}
      <path d="M100 50L76 60l14 54 10-30z" fill={c.shade} />
      <path d="M100 50l24 10-14 54-10-30z" fill={c.shade} />
      <path d="M100 50L76 60l14 54M100 50l24 10-14 54" stroke={c.detail} strokeWidth="2" fill="none" />
      <circle cx="100" cy="128" r="3.2" fill={c.accent} />
      <circle cx="100" cy="148" r="3.2" fill={c.accent} />
      {/* pocket square */}
      <path d="M122 86l10-4 2 8z" fill={c.accent} />
    </>
  )
}

function Duvet({ c }) {
  return (
    <>
      <path d="M40 92h120a10 10 0 0 1 10 10v88a10 10 0 0 1-10 10H40a10 10 0 0 1-10-10v-88a10 10 0 0 1 10-10z" fill={c.fabric} />
      <path d="M40 92h120a10 10 0 0 1 10 10v22H30v-22a10 10 0 0 1 10-10z" fill={c.accent} opacity=".85" />
      <path d="M30 124h140" stroke={c.detail} strokeWidth="2.5" />
      <path d="M70 124v76M100 124v76M130 124v76" stroke={c.shade} strokeWidth="2" opacity=".5" />
      <path d="M30 160h140" stroke={c.shade} strokeWidth="2" opacity=".5" />
      {/* pillow */}
      <path d="M56 56h88a12 12 0 0 1 12 12v12a12 12 0 0 1-12 12H56a12 12 0 0 1-12-12V68a12 12 0 0 1 12-12z" fill={c.shade} />
    </>
  )
}

function Curtains({ c }) {
  return (
    <>
      <path d="M28 50h144v10H28z" fill={c.detail} />
      <path d="M40 60h46c0 60-8 100-8 160H32c0-60 8-100 8-160z" fill={c.fabric} />
      <path d="M114 60h46c0 60 8 100 8 160h-46c0-60-8-100-8-160z" fill={c.fabric} />
      <path d="M52 62c-2 58-8 98-8 158M66 62c-2 58-6 98-6 158M148 62c2 58 8 98 8 158M134 62c2 58 6 98 6 158" stroke={c.shade} strokeWidth="2.5" fill="none" opacity=".55" />
      {/* tiebacks */}
      <path d="M36 140q22 12 44 0" stroke={c.accent} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M164 140q-22 12-44 0" stroke={c.accent} strokeWidth="5" fill="none" strokeLinecap="round" />
      {[40, 64, 88, 112, 136, 160].map((x) => <circle key={x} cx={x} cy="55" r="4" fill={c.fabric} />)}
    </>
  )
}

const REGISTRY = {
  agbada: Agbada,
  senator: Senator,
  dashiki: Dashiki,
  kaftan: Kaftan,
  'iro-buba': IroBuba,
  'ankara-gown': AnkaraGown,
  gele: Gele,
  'lace-gown': LaceGown,
  shirt: Shirt,
  trousers: Trousers,
  suit: Suit,
  duvet: Duvet,
  curtains: Curtains,
}

export default function GarmentArt({ name, colors, className = '' }) {
  const Art = REGISTRY[name]
  if (!Art) return null
  return (
    <svg viewBox={VB} className={className} role="img" aria-hidden="true" focusable="false">
      <Art c={colors} />
    </svg>
  )
}
