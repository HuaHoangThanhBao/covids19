import React, { useState, Suspense } from 'react'
import { Card } from './components/Card'
import { Spinner } from './components/Spinner'
import { Modal } from './components/Modal'
import { Country } from './types/covid.type'
import { SortColumn } from './types/sort.type'
import { useSortTable } from './hooks/useSortTable'
import { useFetchData } from './hooks/useFetchData'
import { RootState, useAppDispatch } from './app/store'
import { getCountryDetail } from './app/country.slice'
import { useSelector } from 'react-redux'
import './App.scss'

const Table = React.lazy(() => import('./components/Table'))

const columns: SortColumn[] = [
  { label: 'Country', accessor: 'Country', sortable: true },
  { label: 'Confirmed Cases', accessor: 'TotalConfirmed', sortable: true },
  { label: 'Deaths', accessor: 'TotalDeaths', sortable: true },
  { label: 'Recovered Cases', accessor: 'TotalRecovered', sortable: true }
]

function App() {
  const [isShowDetail, setIsShowDetail] = useState(false)
  const { data } = useFetchData()
  const { handleSorting } = useSortTable({ data: data.Countries })
  const dispatch = useAppDispatch()
  const countryDetail = useSelector((state: RootState) => state.covid.countryDetail)

  const onShowDetail = (country: Country) => {
    dispatch(getCountryDetail({ countryCode: country.CountryCode }))
    handleShowModal()
  }

  const handleShowModal = () => {
    setIsShowDetail((prev) => !prev)
  }

  return (
    <div className='app'>
      <h1>Covid-19 Coronavirus Tracker</h1>
      <Card data={data} />
      <Suspense fallback={<Spinner style={{ margin: '2rem auto' }} />}>
        <Table onShowDetail={onShowDetail} columns={columns} handleSorting={handleSorting} />
      </Suspense>
      <Modal isShow={isShowDetail} onClose={handleShowModal}>
        {!countryDetail.flag && <Spinner />}
        {countryDetail.flag && (
          <>
            <img
              className='country-img'
              src={Object.keys(countryDetail.flags).length !== 0 ? countryDetail.flags.png : ''}
              alt=''
            />
            <p className='country-name'>
              {Object.keys(countryDetail.name).length !== 0 ? countryDetail.name.common : ''}
            </p>
            <p>
              Population:
              <span className='country-info'>{countryDetail.population}</span>
            </p>
            <p>
              Capital:
              {Object.keys(countryDetail.capital).length !== 0 &&
                countryDetail.capital.map((cap, index) => (
                  <span key={cap} className='country-info'>
                    {cap}
                    {`${index !== countryDetail.capital.length - 1 ? ' - ' : ''}`}
                  </span>
                ))}
            </p>
            <p>
              Region:<span className='country-info'>{countryDetail.region}</span>
            </p>
            <p>
              Subregion:<span className='country-info'>{countryDetail.subregion}</span>
            </p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default App
