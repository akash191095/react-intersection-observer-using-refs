import { nanoid } from 'nanoid'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import CardObserver from '../../components/card/CardObserver'

type Cards = {
  id: string
}[]

function CardContainer() {
  const cardContainer: RefObject<HTMLDivElement> = useRef(null)

  const [cards, setCards] = useState<Cards>(() => {
    // initial cards
    return Array.from({ length: 50 }).map(() => ({
      id: nanoid(),
    }))
  })

  const addNewCards = useCallback(() => {
    const newCards = Array.from({ length: 10 }).map(() => ({
      id: nanoid(),
    }))
    setCards([...cards, ...newCards])
  }, [cards])

  useEffect(() => {
    if (!cardContainer?.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        // if there are already 150 cards, don't add new ones
        if (cards.length >= 150) {
          return
        }
        const entry = entries[0]
        // if the last card is intersecting, add new cards
        if (entry.isIntersecting) {
          addNewCards()
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '100px',
      },
    )
    if (cardContainer.current.lastChild) {
      observer.observe(cardContainer.current.lastChild as Element)
    }

    return () => observer.disconnect()
  }, [addNewCards, cards.length])

  return (
    <div className="card-container" ref={cardContainer}>
      {cards.map((card, index) => (
        <div key={card.id}>
          <CardObserver
            isLast={index === cards.length - 1}
            isFirst={index === 0}
          />
        </div>
      ))}
    </div>
  )
}

export default CardContainer
