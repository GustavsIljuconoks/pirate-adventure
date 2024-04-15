import { CellState } from './webapi'

export type CellType = {
  shipId?: number
  isHit: boolean
  column?: string
  row?: number
  state: CellState
}

export const Rows = Array.from({ length: 10 }, (_, i) => i)

export type FieldType = CellType[]
