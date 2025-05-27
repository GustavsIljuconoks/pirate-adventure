import { GameFieldDto } from './webapi'

export interface Player {
  username: string
  wins: number
}

export type GamePlayers = {
  me: {
    id: number
    name: string
    field?: GameFieldDto
  }
  enemy: {
    id: number
    name: string
    field?: GameFieldDto
  }
}

export interface ChatMessages {
  user: string
  message: string
  timestamp: string
}
