import type { SqaureProperties } from 'types/Square'

const createGrid = (): SqaureProperties[] => {
	const rowNames = 'ABCDEFGHIJ'
	return [...rowNames].flatMap((row, rowIndex) =>
		Array.from({ length: 10 })
			.fill('')
			.map((_, index) => ({
				id: row + (index + 1),
				column: index + 1,
				row: rowIndex + 1,
				initialValue: 0,
				isHighlighted: false
			}))
	)
}

export default createGrid
