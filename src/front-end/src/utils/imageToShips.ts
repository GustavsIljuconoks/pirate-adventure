import { Ship } from 'types/Ship'
import { ShipDto } from './webapi'

export const assignImagesToShips = (ships: ShipDto[]): Ship[] => {
  return ships.map((ship) => {
    let image: string
    switch (ship.id) {
      case 1:
        image = 'patrol_boat.png'
        break
      case 2:
        image = 'destroyer.png'
        break
      case 3:
        image = 'battleship.png'
        break
      case 4:
        image = 'carrier.png'
        break
      case 5:
        image = 'carrier.png'
        break
      default:
        image = 'default.png'
    }

    return {
      ...ship,
      image
    }
  })
}
