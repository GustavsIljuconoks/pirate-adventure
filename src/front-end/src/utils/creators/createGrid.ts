import { Columns, FieldType, Rows } from 'types/Square'
import { COLUMNS_COUNT, ROWS_COUNT } from '../../constants'

export const createField = (): FieldType[] => {
  return Array(COLUMNS_COUNT * ROWS_COUNT)
    .fill(null)
    .map((_, i) => {
      const column = Columns[i % COLUMNS_COUNT]
      const row = Rows[Math.floor(i / ROWS_COUNT)]
      return {
        isHit: false,
        column,
        row
      }
    })
}
