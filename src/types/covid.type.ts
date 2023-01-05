export type Covid = {
  ID: string,
  Message: string
  Global : Global,
  Countries: Country[],
  Date: Date
}

export type Global = {
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: Date
}

export type Country = {
  ID: string,
  Country: string,
  CountryCode: string,
  Slug: string,
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: Date,
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