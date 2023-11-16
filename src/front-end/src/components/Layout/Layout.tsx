/* eslint-disable react/function-component-definition */
import type React from 'react'
import type { ReactElement, ReactNode } from 'react'
import layoutCss from '../../styles/layout.module.css'

interface Properties {
	children: ReactNode
}

const Layout: React.FC<Properties> = ({ children }): ReactElement => (
	<main>
		<div className={layoutCss.siteWrapper}>{children}</div>
	</main>
)

export default Layout
