import { useRef } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import './modal.scss'

interface ModalProps {
  isShow?: boolean
  onClose: () => void
  children?: React.ReactNode
}

export const Modal = ({ isShow, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, onClose)
  if (isShow)
    return (
      <div className='modal'>
        <div className='modal-content' ref={ref}>
          {children}
          <button className='modal-button' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  return null
}
