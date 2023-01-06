import './spinner.scss'

interface SpinnerProps {
  style?: React.CSSProperties
}

export const Spinner = ({ style }: SpinnerProps) => {
  return (
    <div className='spinner-container'>
      <div className='spinner' style={style}></div>
    </div>
  )
}
