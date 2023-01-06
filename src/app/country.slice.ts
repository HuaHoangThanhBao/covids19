import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Country, CountryDetail, Covid } from '../types/covid.type'
import { http, httpCountry } from '../utils/http'

interface CovidState {
  summary: Covid
  countryDetail: CountryDetail
}

const countryDetailInitialState: CountryDetail = {
    name: {
      common: '',
      official: ''
    },
    coatOfArms: {
      png: '',
      svg: ''
    },
    flag: '',
    flags: {
      png: '',
      svg: ''
    },
    region: '',
    startOfWeek: '',
    status: '',
    subregion: '',
    capital: [],
    population: 0
}

const summaryInitialState: Covid = {
  ID: '',
  Message: '',
  Global : {
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
    Date: ''
  },
  Countries: [],
  Date: ''
}

export const initialState: CovidState = {
  summary: summaryInitialState,
  countryDetail: countryDetailInitialState
}

export const getCountryList = createAsyncThunk(
  'covid/getCountryList',
  async (_, thunkAPI) => {
    const response = await http.get<Covid>(`summary`, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

export const getCountryDetail = createAsyncThunk(
  'covid/getCountryDetail',
  async ({ countryCode }: { countryCode: string }, thunkAPI) => {
    const response = await httpCountry.get<CountryDetail[]>(`alpha/${countryCode}`, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

const covidSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    updateCountryList: (state, action: PayloadAction<Country[]>) => {
      state.summary.Countries = action.payload
    }
  },
  extraReducers(builder) {
    builder
    .addCase(getCountryList.pending, (state, action) => {
      state.summary = summaryInitialState
    })
      .addCase(getCountryList.fulfilled, (state, action) => {
        state.summary.ID = action.payload.ID;
        state.summary.Message = action.payload.Message;
        state.summary.Global = action.payload.Global;
        state.summary.Countries = action.payload.Countries;
        state.summary.Date = action.payload.Date
      })
      builder
        .addCase(getCountryDetail.pending, (state, action) => {
          state.countryDetail = countryDetailInitialState
        })
      builder
        .addCase(getCountryDetail.fulfilled, (state, action) => {
          state.countryDetail = action.payload[0]
        })
  }
})

export const { updateCountryList } = covidSlice.actions
const covidReducer = covidSlice.reducer

export default covidReducer
