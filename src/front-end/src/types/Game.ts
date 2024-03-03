export interface IGameState {
  currentGame: {
    player1: string | null
    id: string | null
  } | null
}

export enum GameActionTypes {
  SET_CURRENT_GAME = 'SET_CURRENT_GAME'
}

export interface ISetCurrentGameAction {
  type: GameActionTypes.SET_CURRENT_GAME
  payload: {
    player1: string | null
    id: string | null
  }
}
