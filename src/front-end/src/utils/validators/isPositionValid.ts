import { Field } from 'types/Square'

export const isPositionValid = (
	field: Field,
	startPosition: number,
	shipLength: number,
	axis: string
) => {
	// Check if the starting position is out of bounds
	if (startPosition < 0 || startPosition > 99) {
		return false
	}

	// Check if the ship would go out of bounds horizontally
	if (axis === 'x' && (startPosition % 10) + shipLength > 10) {
		return false
	}

	// Check if the ship would go out of bounds vertically
	if (axis === 'y' && startPosition + (shipLength - 1) * 10 > 99) {
		return false
	}

	// Check if the cells are occupied by a ship
	for (let i = 0; i < shipLength; i++) {
		if (
			(axis === 'x' && field[startPosition + i].shipId) ||
			(axis === 'y' && field[startPosition + i * 10].shipId)
		) {
			return false
		}
	}

	// Otherwise, the position is valid
	return true
}
