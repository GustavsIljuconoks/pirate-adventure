import { ShipDto } from './webapi'

export type Ship = {
  id: number
  name: string
  positions: number[]
  length: number
  isDestroyed: boolean
  axis?: 'x' | 'y'
  label?: string
  dragOverlay?: boolean
  dragging?: boolean
  style?: React.CSSProperties
}

export type Ships = Record<number, ShipDto>
