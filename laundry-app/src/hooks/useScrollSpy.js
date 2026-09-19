import { useEffect, useState } from 'react'

/** Returns the id of the section currently filling the viewport. */
export default function useScrollSpy(ids, offset = 120) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      // Pick the last section whose top has passed the offset line.
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      // Guard the very bottom of the page, where short sections never win.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = ids[ids.length - 1]
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return activeId
}
