import { Ships } from 'types/Ship'

export const createShips = (): Ships => {
  return {
    1: {
      id: 1,
      name: 'Skipper',
      size: 1,
      headLocation: {
        row: -1,
        column: -1
      },
      orientation: 1,
      hitCount: 0,
      isDestroyed: false
    },
    2: {
      id: 2,
      name: 'Brother',
      size: 2,
      headLocation: {
        row: -1,
        column: -1
      },
      orientation: 1,
      hitCount: 0,
      isDestroyed: false
    },

    3: {
      id: 3,
      name: 'Hurricane',
      size: 3,
      headLocation: {
        row: -1,
        column: -1
      },
      orientation: 1,
      hitCount: 0,
      isDestroyed: false
    },
    4: {
      id: 4,
      name: 'Vice',
      size: 4,
      headLocation: {
        row: -1,
        column: -1
      },
      orientation: 1,
      hitCount: 0,
      isDestroyed: false
    },
    5: {
      id: 5,
      name: 'Mother',
      size: 5,
      headLocation: {
        row: -1,
        column: -1
      },
      orientation: 1,
      hitCount: 0,
      isDestroyed: false
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
