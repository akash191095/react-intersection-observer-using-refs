import classNames from 'classnames'
import { ForwardedRef, forwardRef } from 'react'

type CardProps = {
  isFirst?: boolean
  isLast?: boolean
  visible: boolean
}

const getCardContent = ({
  isFirst,
  isLast,
}: Pick<CardProps, 'isFirst' | 'isLast'>) => {
  if (isFirst) {
    return 'This is the first card'
  } else if (isLast) {
    return 'This is the last card'
  } else {
    return 'This is a card'
  }
}

const Card = forwardRef(function Card(
  { isFirst, isLast, visible }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div className={classNames('card', { show: visible })} ref={ref}>
      {getCardContent({ isFirst, isLast })}
    </div>
  )
})

export default Card
