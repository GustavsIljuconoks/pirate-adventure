export type CellType = {
  shipId?: number
  isHit: boolean
  column: string
  row: number
}

export const Columns = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9
}

export const Rows = Array.from({ length: 10 }, (_, i) => i + 1)

export type FieldType = CellType[]
