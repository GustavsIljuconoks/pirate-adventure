import { Ships } from 'types/Ship'

export const createShips = (): Ships => {
  return {
    1: {
      id: 1,
      name: 'Skipper',
      positions: [],
      length: 1,
      isDestroyed: false
    },
    2: {
      id: 2,
      name: 'Brother',
      positions: [],
      length: 2,
      isDestroyed: false
    },
    3: {
      id: 3,
      name: 'Hurricane',
      positions: [],
      length: 3,
      isDestroyed: false
    },
    4: {
      id: 4,
      name: 'Vice',
      positions: [],
      length: 4,
      isDestroyed: false
    },
    5: {
      id: 5,
      name: 'Mother',
      positions: [],
      length: 5,
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
