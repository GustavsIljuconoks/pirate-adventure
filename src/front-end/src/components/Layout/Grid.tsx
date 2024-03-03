import React from 'react'

import styles from 'styles/Grid.module.css'

export interface Props {
	children?: React.ReactNode
	columns: number
}

export function GridContainer({ children, columns }: Props) {
	return (
		<ul
			className={styles['grid-container']}
			style={
				{
					'--col-count': columns
				} as React.CSSProperties
			}>
			{children}
		</ul>
	)
}
