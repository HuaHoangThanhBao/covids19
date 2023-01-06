import { Covid } from '../../types/covid.type'
import { CardItem } from '../CardItem'
import './card.scss'

interface CardGroupProps {
  data?: Covid
}

export const Card = ({ data }: CardGroupProps) => {
  return (
    <div className='card'>
      <CardItem smallTitle={'new'} title={'Confirmed'} content={data?.Global.NewConfirmed} className={'blue-light'} />
      <CardItem smallTitle={'new'} title={'Deaths'} content={data?.Global.NewDeaths} className={'red'} />
      <CardItem smallTitle={'new'} title={'Recovered'} content={data?.Global.NewRecovered} className={'yellow'} />
      <CardItem smallTitle={'total'} title={'Confirmed'} content={data?.Global.TotalConfirmed} className={'green'} />
      <CardItem smallTitle={'total'} title={'Deaths'} content={data?.Global.TotalDeaths} className={'blue-dark'} />
      <CardItem
        smallTitle={'total'}
        title={'Recovered'}
        content={data?.Global.TotalRecovered}
        className={'yellow-dark'}
      />
    </div>
  )
}
