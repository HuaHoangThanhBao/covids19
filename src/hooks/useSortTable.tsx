import { updateCountryList } from '../app/country.slice'
import { useAppDispatch } from '../app/store'
import { Country } from '../types/covid.type'

interface useSortTableProps {
  data: Country[]
}

export const useSortTable = ({ data }: useSortTableProps) => {
  const dispatch = useAppDispatch()

  const handleSorting = (sortField: string, sortOrder: string) => {
    if (!sortField) return
    const sorted = [...data].sort((a, b) => {
      if (a[sortField as keyof Country] === null) return 1
      if (b[sortField as keyof Country] === null) return -1
      if (a[sortField as keyof Country] === null && b[sortField as keyof Country] === null) return 0
      return (
        a[sortField as keyof Country].toString().localeCompare(b[sortField as keyof Country].toString(), 'en', {
          numeric: true
        }) * (sortOrder === 'asc' ? 1 : -1)
      )
    })
    dispatch(updateCountryList(sorted))
  }

  return { handleSorting }
}
