import { useState } from 'react'
import { getCountryList, initialState } from '../app/country.slice'
import { useAppDispatch } from '../app/store'
import { Covid } from '../types/covid.type'
import { useEffectOnce } from './useEffectOnce'

export const useFetchData = () => {
  const [data, setData] = useState<Covid>(initialState.summary)
  const dispatch = useAppDispatch()

  useEffectOnce(() => {
    const promise = dispatch(getCountryList())
    promise.unwrap().then((result) => setData(result))
    return () => {
      promise.abort()
    }
  })

  return { data }
}
