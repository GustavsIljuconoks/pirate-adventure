import { Ships } from 'types/Ship'

export const createShips = (): Ships => {
	return {
		1: {
			id: 'Skipper',
			positions: [],
			length: 1,
			isDestroyed: false,
			label: 'Skipper'
		},
		2: {
			id: 'Brother',
			positions: [],
			length: 2,
			isDestroyed: false,
			label: 'Brother'
		},
		3: {
			id: 'Hurricane',
			positions: [],
			length: 3,
			isDestroyed: false,
			label: 'Hurricane'
		},
		4: {
			id: 'Vice',
			positions: [],
			length: 4,
			isDestroyed: false,
			label: 'Vice'
		},
		5: {
			id: 'Mother',
			positions: [],
			length: 5,
			isDestroyed: false,
			label: 'Mother'
		}
	}
}

export const createShipPositions = (
	start: number,
	length: number,
	axis: string
) => {
	let positions: number[] = []

	for (let i = 0; i < length; i++) {
		if (axis === 'x') {
			positions.push(start + i)
		} else {
			positions.push(start + i * 10)
		}
	}
	return positions
}
