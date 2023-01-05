import { Selection } from '../../types/selection.type'
import './select.scss'

interface SelectProps {
  onSelectChange: (e: React.FormEvent) => void
  selections: Selection[]
}

export const Select = ({ onSelectChange, selections }: SelectProps) => {
  return (
    <div className='select' onChange={onSelectChange}>
      <select>
        {selections.map((selection) => (
          <option key={selection.value} value={selection.value}>
            {selection.option}
          </option>
        ))}
      </select>
    </div>
  )
}
