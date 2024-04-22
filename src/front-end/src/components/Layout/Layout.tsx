/* eslint-disable react/function-component-definition */
import layoutCss from '@styles/layout.module.css'
import type React from 'react'
import type { ReactElement, ReactNode } from 'react'

interface Properties {
  children: ReactNode
}

const Layout: React.FC<Properties> = ({ children }): ReactElement => (
  <main>
    <div className={layoutCss.siteWrapper}>{children}</div>
  </main>
)

export default Layout
