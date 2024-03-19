import { Columns, FieldType, Rows } from 'types/Square'

export const createField = (): FieldType[] => {
  return Array(100)
    .fill(null)
    .map((_, i) => {
      const column = Columns[i % 10]
      const row = Rows[Math.floor(i / 10)]
      return {
        isHit: false,
        column,
        row
      }
    })
}
