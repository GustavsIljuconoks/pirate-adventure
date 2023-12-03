import type { ReactElement } from 'react'

import type { SqaureProperties } from 'types/Square'
import createGrid from 'utils/createGrid'
import Sqaure from './Sqaure'

import style from 'styles/field/GameBoard.module.css'

export default function GameBoard(): ReactElement {
	const grid: SqaureProperties[] = createGrid()

	return (
		<div className={style['game-board']}>
			{Object.keys(grid).map((sqaure) => (
				<Sqaure key={grid[sqaure].id} {...grid[sqaure]} />
			))}
		</div>
	)
}
