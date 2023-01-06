import { Spinner } from '../Spinner'
import './cardItem.scss'

interface CardItemProps {
  smallTitle: string
  title: string
  content?: string | number
  className?: string
}

export const CardItem = ({ smallTitle, title, content, className }: CardItemProps) => {
  return (
    <div className={`card-item ${className}`}>
      <h2 className='card-title'>
        <span className='card-desc'>{smallTitle}</span>
        {title}
      </h2>
      <h3 className='card-content'>{content}</h3>
      {/* {isLoading && <Spinner />} */}
    </div>
  )
}
