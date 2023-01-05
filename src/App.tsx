import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCountryDetail, getCovidSummary } from './apis/covids'
import { CardGroup } from './components/CardGroup'
import { Select } from './components/Select'
import { Spinner } from './components/Spinner'
import { Modal } from './components/Modal'
import { Country } from './types/covid.type'
import { Table } from './components/Table'
import './App.scss'

function App() {
  const [sortValue, setSortValue] = useState(0)
  const [countryCode, setCountryCode] = useState('')
  const [isShowDetail, setIsShowDetail] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey: ['covid', sortValue],
    queryFn: () => getCovidSummary(),
    staleTime: 1000 * 2 //2 seconds
  })
  const { data: counTryDetail, isLoading: isLoadingContry } = useQuery({
    queryKey: ['country', countryCode],
    queryFn: () => getCountryDetail(countryCode),
    enabled: !!countryCode
  })

  const onSelectChange = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement
    const val = parseInt(target.value)
    if (val === sortValue) return
    setSortValue(val)
  }

  const onShowDetail = (country: Country) => {
    setCountryCode(country.CountryCode)
    handleShowModal()
  }

  const handleShowModal = () => {
    setIsShowDetail((prev) => !prev)
  }

  const sortList = useMemo(() => {
    switch (sortValue) {
      case 0:
      default:
        return data?.data?.Countries?.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
      case 1:
        return data?.data?.Countries?.sort((a, b) => b.TotalDeaths - a.TotalDeaths)
      case 2:
        return data?.data?.Countries?.sort((a, b) => a.TotalRecovered - b.TotalRecovered)
    }
  }, [data, sortValue])

  return (
    <div className='app'>
      <h1>Covid-19 Coronavirus Tracker</h1>
      <CardGroup data={data?.data} isLoading={isLoading} />
      <Select onSelectChange={onSelectChange} />
      <Table sortList={sortList} onShowDetail={onShowDetail} isLoading={isLoading} />
      <Modal isShow={isShowDetail} onClose={handleShowModal}>
        {isLoadingContry && <Spinner />}
        {!isLoadingContry && counTryDetail?.data && (
          <>
            <h4>Country Info</h4>
            <img className='country-img' src={counTryDetail.data[0]?.coatOfArms?.png} alt='' />
            <p>
              Name: <span>{counTryDetail.data[0]?.name?.common}</span>
            </p>
            <p>
              Flag: <span>{counTryDetail.data[0]?.flag}</span>
            </p>
            <p>
              Population: <span>{counTryDetail?.data[0]?.population}</span>
            </p>
            <p>
              Capital:{' '}
              {counTryDetail.data[0]?.capital?.map((cap, index) => (
                <span key={cap}>
                  {cap}
                  {`${index !== counTryDetail.data[0].capital.length - 1 ? ' - ' : ''}`}
                </span>
              ))}
            </p>
            <p>
              Region: <span>{counTryDetail.data[0]?.region}</span>
            </p>
            <p>
              Subregion: <span>{counTryDetail.data[0]?.subregion}</span>
            </p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default App