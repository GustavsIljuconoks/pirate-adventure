import type { ReactElement } from 'react'
import { LeaderboardResponseDto } from 'types/webapi'

interface IProps {
  player: LeaderboardResponseDto
  ranking: number
}

export default function Slot({ player, ranking }: IProps): ReactElement {
  return (
    <div className="flex items-center justify-between text-2xl border-2 border-white rounded-lg py-2 px-4 text-white">
      <h1 data-testid="PlayerName">
        <span>#{ranking} </span>
        {player.name}
      </h1>
      <h1 data-testid="PlayerWins">{player.wins}</h1>
    </div>
  )
}
