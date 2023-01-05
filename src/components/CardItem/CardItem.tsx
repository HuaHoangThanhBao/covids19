import { Spinner } from '../Spinner'

interface CardItemProps {
  smallTitle: string
  title: string
  content?: string | number
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
      {!isLoading && <h3 className='card-content'>{content}</h3>}
      {isLoading && <Spinner />}
    </div>
  )
}
