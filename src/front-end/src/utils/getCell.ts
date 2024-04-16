import { CellType } from 'types/Square'
import { GameFieldDto } from 'types/webapi'

export function getCell(
  data: GameFieldDto,
  cellRow: number,
  cellColumn: number
): CellType | undefined {
  const rowCells = data.cells[cellRow]

  if (rowCells) {
    const cell = rowCells[cellColumn]

    if (cell) {
      return cell
    }
  }

  return undefined
}
