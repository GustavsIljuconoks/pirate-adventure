import { ShipDto } from './webapi'

export interface Ship extends ShipDto {
  image: string
}

export type Ships = Record<number, Ship>
