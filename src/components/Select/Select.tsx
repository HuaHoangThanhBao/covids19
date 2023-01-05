import './select.scss'

interface SelectProps {
  onSelectChange: (e: React.FormEvent) => void
}

export const Select = ({ onSelectChange }: SelectProps) => {
  return (
    <div className='select' onChange={onSelectChange}>
      <span>Sort by: </span>
      <select>
        <option value={0}>The most total confirmed cases</option>
        <option value={1}>The highest number of deaths</option>
        <option value={2}>The least number of recovered cases</option>
      </select>
    </div>
  )
}
