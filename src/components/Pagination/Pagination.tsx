import classnames from 'classnames'
import { DOTS, SiblingCount } from '../../constants'
import { usePagination } from '../../hooks/usePagination'
import './pagination.scss'

interface PaginationProps {
  onPageChange: (page: number) => void
  totalCount: number
  siblingCount: number
  currentPage: number
  pageSize: number
  className: string
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = SiblingCount,
  currentPage,
  pageSize,
  className
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <ul className={classnames('pagination-container', { [className]: className })}>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className='arrow left' />
      </li>
      {paginationRange.map((pageNumber: string | number, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber + index} className='pagination-item dots'>
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(typeof pageNumber === 'string' ? parseInt(pageNumber) : pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className='arrow right' />
      </li>
    </ul>
  )
}
