import { Country } from '../../types/covid.type'
import { Spinner } from '../Spinner'
import './table.scss'

interface TableProps {
  sortList?: Country[]
  isLoading: boolean
  onShowDetail: (country: Country) => void
}

export const Table = ({ sortList, isLoading, onShowDetail }: TableProps) => {
  return (
    <div className='table-wrapper'>
      {!isLoading && (
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {sortList?.map((country) => (
                <tr key={country.ID} onClick={() => onShowDetail(country)}>
                  <td>{country.Country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isLoading && <Spinner />}
    </div>
  )
}
