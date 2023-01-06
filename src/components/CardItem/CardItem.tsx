import { numberWithCommas } from '../../utils/format'
import { Spinner } from '../Spinner'
import './cardItem.scss'

interface CardItemProps {
  smallTitle: string
  title: string
  content: number
  className?: string
  isLoading: boolean
}

export const CardItem = ({ smallTitle, title, content, className, isLoading }: CardItemProps) => {
  return (
    <div className={`card-item ${className}`}>
      <h2 className='card-title'>
        <span className='card-desc'>{smallTitle}</span>
        {title}
      </h2>
      {!isLoading && <h3 className='card-content'>{numberWithCommas(content)}</h3>}
      {isLoading && <Spinner />}
    </div>
  )
}
