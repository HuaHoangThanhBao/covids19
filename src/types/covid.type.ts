export type Covid = {
  ID: string,
  Message: string
  Global : Global,
  Countries: Country[],
  Date: string
}

export interface Global {
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: string
}

export interface Country extends Global {
  ID: string,
  Country: string,
  CountryCode: string,
  Slug: string,
  Date: string,
  // Premium: {}
}

export type CountryDetail = {
  name: {
    common: string
    official: string
  }
  coatOfArms: {
    png: string
    svg: string
  },
  flag: string
  region: string
  startOfWeek: string
  status: string
  subregion: string
  capital: [],
  population: number
}