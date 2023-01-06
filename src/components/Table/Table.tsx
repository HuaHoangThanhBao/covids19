import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { PageSize, SiblingCount } from '../../constants'
import { Country } from '../../types/covid.type'
import { SortColumn, SortOrder } from '../../types/sort.type'
import { numberWithCommas } from '../../utils/format'
import { Pagination } from '../Pagination'
import { Spinner } from '../Spinner'
import './table.scss'

interface TableProps {
  columns: SortColumn[]
  onShowDetail: (country: Country) => void
  handleSorting: (accessor: string, sortOrder: string) => void
}

const Table = ({ columns, onShowDetail, handleSorting }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState('')
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc)
  const data = useSelector((state: RootState) => state.covid.summary.Countries)

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === SortOrder.asc ? SortOrder.desc : SortOrder.asc
    setSortField(accessor)
    setOrder(sortOrder)
    handleSorting(accessor, sortOrder)
  }

  const currentTableData = useMemo(() => {
    if (!data) return []
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, data])

  return (
    <>
      <div className='table-wrapper'>
        {(!currentTableData || currentTableData.length === 0) && <Spinner />}
        {currentTableData && currentTableData.length !== 0 && (
          <div className='table-container'>
            <table className='table'>
              <thead>
                <tr>
                  {columns.map(({ label, accessor, sortable }) => {
                    const cl = sortable
                      ? sortField === accessor && order === SortOrder.asc
                        ? 'up'
                        : sortField === accessor && order === SortOrder.desc
                        ? 'down'
                        : 'default'
                      : ''
                    return (
                      <th
                        key={accessor}
                        onClick={sortable ? () => handleSortingChange(accessor) : () => {}}
                        className={cl}
                      >
                        {label}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {currentTableData &&
                  currentTableData.map((country) => (
                    <tr key={country.ID} onClick={() => onShowDetail(country)}>
                      <td>{country.Country}</td>
                      <td>{numberWithCommas(country.TotalConfirmed)}</td>
                      <td>{numberWithCommas(country.TotalDeaths)}</td>
                      <td>{numberWithCommas(country.TotalRecovered)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {currentTableData && currentTableData.length !== 0 && (
        <Pagination
          className='pagination-bar'
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
          siblingCount={SiblingCount}
        />
      )}
    </>
  )
}

export default Table
