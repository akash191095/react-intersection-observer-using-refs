import { RefObject, useEffect, useRef, useState } from 'react'
import Card from './Card'

type CardObserverProps = {
  isFirst: boolean
  isLast: boolean
}

function CardObserver({ isFirst, isLast }: CardObserverProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef: RefObject<HTMLDivElement> = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return
    const cardObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
          cardObserver.unobserve(entry.target)
        }
      },
      { threshold: 1 },
    )

    cardObserver.observe(cardRef.current)

    return () => cardObserver.disconnect()
  }, [])

  return (
    <Card isLast={isLast} isFirst={isFirst} visible={isVisible} ref={cardRef} />
  )
}

export default CardObserver
