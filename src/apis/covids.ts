
import { CountryDetail, Covid } from "../types/covid.type";
import { http, httpCountry } from "../utils/http";

export const getCovidSummary = () => http.get<Covid>('summary')
export const getCountryDetail = (countryCode: string) => httpCountry.get<CountryDetail[]>(`alpha/${countryCode}`)